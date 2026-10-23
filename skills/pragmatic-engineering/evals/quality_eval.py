#!/usr/bin/env python3
"""Blinded pilot allocation and descriptive paired quality analysis.

No agents or graders are executed. Input values are independently supplied,
not authenticated here. Standard library only; Python 3.11+.
"""
import argparse
import hashlib
import json
import math
import os
import re
import secrets
import statistics
from pathlib import Path

ARMS = ('A', 'B', 'C', 'D')
QUALITY = ('maintainability', 'architecture', 'testing', 'scope_security')
ID_PATTERN = re.compile(r'^[A-Za-z0-9][A-Za-z0-9_.-]{0,79}$')
SHA_PATTERN = re.compile(r'^[0-9a-f]{40}$')


class InvalidEvaluation(ValueError):
    pass


def require(cond, why):
    if not cond:
        raise InvalidEvaluation(why)


def load(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)


def dump_new(path, obj):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('x', encoding='utf-8') as f:  # Do not clobber graded outcomes or private allocation.
        json.dump(obj, f, indent=2, sort_keys=True)
        f.write('\n')


def validate_manifest(m):
    require(type(m) is dict and type(m.get('schema_version')) is int and m['schema_version'] == 1, 'invalid manifest version')
    seeds = m.get('seeds')
    require(type(seeds) is list and seeds and all(type(x) is int and 0 <= x <= 99999 for x in seeds)
            and len(seeds) == len(set(seeds)), 'seeds must be distinct nonnegative integers')
    tasks = m.get('tasks')
    require(type(tasks) is list and tasks, 'tasks required')
    ids = []
    for t in tasks:
        require(type(t) is dict, 'task must be an object')
        tid = t.get('task_id')
        require(type(tid) is str and ID_PATTERN.fullmatch(tid) is not None, 'invalid task ID')
        ids.append(tid)
        require(type(t.get('family')) is str and bool(t['family'].strip()), 'missing task family')
        require(t.get('risk') in ('low', 'medium', 'high'), 'invalid task risk')
        require(type(t.get('starting_revision')) is str and
                SHA_PATTERN.fullmatch(t['starting_revision']) is not None, 'invalid starting revision')
    require(len(ids) == len(set(ids)), 'duplicate task ID')
    return tasks, seeds


def prepare(m):
    tasks, seeds = validate_manifest(m)
    # Frozen manifest fingerprint, but this is NOT authentication or provenance.
    manifest_digest = hashlib.sha256(json.dumps(m, sort_keys=True, separators=(',', ':')).encode()).hexdigest()
    allocations = []
    for t in tasks:
        for seed in seeds:
            for arm in ARMS:
                allocations.append({'case_id': secrets.token_hex(12), 'task_id': t['task_id'],
                                    'seed': seed, 'arm': arm})
    # Randomized running order; the private arm map stays out of the grading environment.
    import random
    secrets.SystemRandom().shuffle(allocations)
    private = {'schema_version': 1, 'manifest_sha256': manifest_digest,
               'allocations': allocations}
    public = {'schema_version': 1, 'manifest_sha256': manifest_digest,
              'cases': [{'case_id': x['case_id'], 'task_id': x['task_id'], 'seed': x['seed']}
                        for x in allocations]}
    return private, public


def validate_allocation(a):
    require(type(a) is dict and type(a.get('schema_version')) is int and a['schema_version'] == 1, 'invalid allocation format')
    require(type(a.get('manifest_sha256')) is str and
            re.fullmatch('[0-9a-f]{64}', a['manifest_sha256']) is not None, 'invalid manifest digest')
    rows = a.get('allocations')
    require(type(rows) is list and rows, 'allocations required')
    ids = set()
    combinations = set()
    groups = {}
    for r in rows:
        require(type(r) is dict and set(r) == {'case_id','task_id','seed','arm'}, 'malformed allocation')
        cid, tid, seed, arm = r['case_id'], r['task_id'], r['seed'], r['arm']
        require(type(cid) is str and re.fullmatch('[0-9a-f]{24}', cid) is not None, 'invalid blind ID')
        require(cid not in ids, 'duplicate blind ID')
        ids.add(cid)
        require(type(tid) is str and ID_PATTERN.fullmatch(tid) is not None, 'invalid allocation task ID')
        require(type(seed) is int and seed >= 0 and arm in ARMS, 'invalid seed/arm')
        key = (tid, seed, arm)
        require(key not in combinations, 'duplicate task/seed/arm')
        combinations.add(key)
        groups.setdefault((tid, seed), set()).add(arm)
    for key, arms in groups.items():
        require(arms == set(ARMS), f'incomplete four-arm allocation for {key}')
    return rows


def validate_scores(scores, rows):
    require(type(scores) is dict and type(scores.get('schema_version')) is int and scores['schema_version'] == 1, 'invalid score schema')
    records = scores.get('results')
    require(type(records) is list, 'results list required')
    expected = {x['case_id'] for x in rows}
    seen = set()
    for r in records:
        require(type(r) is dict, 'score must be object')
        fields = {'case_id', 'tests_passed', 'critical_escape', 'quality',
                  'unintended_changes', 'grader_evidence', 'final_tree_sha256'}
        optional = {'wall_seconds', 'tokens', 'cost_usd'}
        require(fields <= r.keys() and r.keys() <= fields | optional,
                'missing/extra score fields (no treatment labels in grader input)')
        cid = r['case_id']
        require(type(cid) is str and cid in expected and cid not in seen, 'unknown/duplicate case ID')
        seen.add(cid)
        require(type(r['tests_passed']) is bool and type(r['critical_escape']) is bool,
                'correctness and critical escape must be Boolean')
        require(type(r['quality']) is dict and set(r['quality']) == set(QUALITY), 'invalid rubric keys')
        require(all(type(v) is int and 0 <= v <= 4 for v in r['quality'].values()),
                'rubric score outside integer 0..4')
        require(type(r['unintended_changes']) is int and r['unintended_changes'] >= 0,
                'invalid unintended change count')
        require(type(r['grader_evidence']) is str and bool(r['grader_evidence'].strip()),
                'grader evidence reference required')
        require(type(r['final_tree_sha256']) is str and
                re.fullmatch('[0-9a-f]{64}', r['final_tree_sha256']) is not None,
                'final tree snapshot digest required')
        for key in optional:
            if key in r:
                val = r[key]
                if key == 'tokens':
                    require(type(val) is int and val >= 0, 'tokens must be nonnegative integer')
                else:
                    require(type(val) in (int, float) and math.isfinite(val) and val >= 0,
                            f'{key} must be nonnegative finite')
    require(seen == expected, f'missing {len(expected - seen)} graded case(s)')
    return {r['case_id']: r for r in records}


def validate_frozen_manifest(alloc, manifest, rows):
    tasks, seeds = validate_manifest(manifest)
    expected_digest = hashlib.sha256(json.dumps(manifest, sort_keys=True, separators=(',', ':')).encode()).hexdigest()
    require(alloc['manifest_sha256'] == expected_digest, 'allocation does not match frozen manifest')
    expected = {(t['task_id'], seed, arm) for t in tasks for seed in seeds for arm in ARMS}
    actual = {(r['task_id'], r['seed'], r['arm']) for r in rows}
    require(actual == expected, 'allocation differs from frozen task/seed/arm combinations')


def validate_runtime(runtime, rows):
    require(type(runtime) is dict and type(runtime.get('schema_version')) is int and runtime['schema_version'] == 1 and
            type(runtime.get('runs')) is list, 'runtime instrumentation file required')
    ids = {r['case_id'] for r in rows}
    found = {}
    for record in runtime['runs']:
        require(type(record) is dict and set(record) == {
            'case_id', 'wall_seconds', 'tokens', 'cost_usd', 'tool_calls',
            'manual_interventions', 'runner_evidence', 'model_version'},
            'runtime record fields invalid')
        cid = record['case_id']
        require(type(cid) is str and cid in ids and cid not in found,
                'unknown or repeated runtime case ID')
        found[cid] = record
        require(all(type(record[k]) is int and record[k] >= 0 for k in
                    ('tokens', 'tool_calls', 'manual_interventions')), 'invalid runtime count')
        require(all(type(record[k]) in (int, float) and math.isfinite(record[k]) and record[k] >= 0
                    for k in ('wall_seconds', 'cost_usd')), 'invalid runtime amount')
        require(all(type(record[k]) is str and record[k].strip()
                    for k in ('runner_evidence', 'model_version')), 'runtime provenance missing')
    require(set(found) == ids, 'runtime missing allocated cases')
    require(len({x['model_version'] for x in found.values()}) == 1,
            'coding-agent model changed inside primary pilot; separate transfer studies')
    return found


def summarize(alloc, scores, manifest=None, runtime=None):
    rows = validate_allocation(alloc)
    if manifest is not None:
        validate_frozen_manifest(alloc, manifest, rows)
    graded = {cid: dict(record) for cid, record in validate_scores(scores, rows).items()}
    measured = validate_runtime(runtime, rows) if runtime is not None else None
    if measured is not None:
        require(all(not any(k in r for k in ('wall_seconds', 'tokens', 'cost_usd'))
                    for r in scores['results']), 'grader scores must not include runtime costs')
    per_arm = {a: [] for a in ARMS}
    by_task_seed = {}
    for item in rows:
        r = graded[item['case_id']]
        per_arm[item['arm']].append(r)
        by_task_seed.setdefault((item['task_id'], item['seed']), {})[item['arm']] = r

    if measured is not None:
        for r in rows:
            graded[r['case_id']].update({k: measured[r['case_id']][k]
                                         for k in ('wall_seconds', 'tokens', 'cost_usd', 'tool_calls', 'manual_interventions')})

    def desc(records):
        n = len(records)
        result = {'runs': n, 'independent_test_successes': sum(x['tests_passed'] for x in records),
                  'critical_escapes': sum(x['critical_escape'] for x in records),
                  'success_rate': sum(x['tests_passed'] for x in records) / n,
                  'mean_unintended_changes': statistics.mean(x['unintended_changes'] for x in records),
                  'mean_rubric_by_dimension': {k: statistics.mean(x['quality'][k] for x in records)
                                               for k in QUALITY}}
        for metric in ('wall_seconds', 'tokens', 'cost_usd', 'tool_calls', 'manual_interventions'):
            available = [x[metric] for x in records if metric in x]
            result['mean_' + metric] = statistics.mean(available) if len(available) == n else None
        if all('cost_usd' in x for x in records):
            successes = result['independent_test_successes']
            result['cost_per_independently_passing_run_usd'] = (
                sum(x['cost_usd'] for x in records) / successes if successes else None)
        else:
            result['cost_per_independently_passing_run_usd'] = None
        return result

    # Tasks are the independent unit. Seeds for one task are correlated.
    tasks = sorted({tid for tid, _ in by_task_seed})
    task_differences = {}
    for arm in ('B', 'C', 'D'):
        task_differences[arm] = []
        for tid in tasks:
            paired = [arms[arm]['tests_passed'] - arms['A']['tests_passed']
                      for (task, _), arms in by_task_seed.items() if task == tid]
            task_differences[arm].append({'task_id': tid, 'mean_delta': statistics.mean(paired)})
    return {'schema_version': 1, 'manifest_sha256': alloc['manifest_sha256'],
            'status': 'DESCRIPTIVE_ONLY_NOT_INDEPENDENTLY_AUTHENTICATED',
            'note': 'Input grades are externally supplied; no confidence interval or causal claim is generated.',
            'frozen_manifest_checked': manifest is not None,
            'runtime_instrumentation_checked': measured is not None,
            'task_count': len(tasks), 'run_count': len(rows),
            'arms': {a: desc(per_arm[a]) for a in ARMS},
            'paired_correctness_delta_vs_A_by_task': task_differences,
            'mean_task_level_delta_vs_A': {a: statistics.mean(x['mean_delta'] for x in d)
                                            for a, d in task_differences.items()}}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    pr = sub.add_parser('prepare', help='write private allocation and treatment-blind grading cases')
    pr.add_argument('--manifest', required=True)
    pr.add_argument('--private-out', required=True, help='private allocation folder (agent/grader must not read)')
    pr.add_argument('--blind-out', required=True, help='separate grading folder (no treatment map)')
    an = sub.add_parser('analyze', help='summarize complete blinded independent scorecards')
    an.add_argument('--allocation', required=True)
    an.add_argument('--scores', required=True)
    an.add_argument('--out', required=True)
    an.add_argument('--manifest', required=True,
                    help='frozen task/seed manifest; required to reject allocation tampering')
    an.add_argument('--runtime', required=True,
                    help='trusted separate run instrumentation; required for controlled pilot')
    args = parser.parse_args()
    try:
        if args.command == 'prepare':
            private_dir = Path(args.private_out).resolve()
            blind_dir = Path(args.blind_out).resolve()
            require(private_dir != blind_dir and private_dir not in blind_dir.parents
                    and blind_dir not in private_dir.parents,
                    'private and grader output must be disjoint directories')
            require(not private_dir.exists() and not blind_dir.exists(),
                    'prepare destinations already exist; no overwrite')
            private, public = prepare(load(args.manifest))
            private_dir.mkdir(parents=True, mode=0o700)
            os.chmod(private_dir, 0o700)
            blind_dir.mkdir(parents=True)
            dump_new(private_dir / 'private_allocation.json', private)
            dump_new(blind_dir / 'blind_cases.json', public)
            print(f'Prepared {len(private["allocations"])} blinded runs in separate destinations.')
        else:
            report = summarize(load(args.allocation), load(args.scores),
                               manifest=load(args.manifest) if args.manifest else None,
                               runtime=load(args.runtime) if args.runtime else None)
            dump_new(args.out, report)
            print(f'Analyzed {report["run_count"]} runs across {report["task_count"]} tasks (descriptive only).')
    except (InvalidEvaluation, ValueError, OSError, json.JSONDecodeError) as exc:
        parser.exit(2, f'REFUSED: {exc}\n')


if __name__ == '__main__':
    main()
