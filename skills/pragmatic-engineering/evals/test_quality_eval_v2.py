"""Controls for frozen-manifest and separated pilot instrumentation."""
import copy
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

import quality_eval as q


class QualityEvalV2(unittest.TestCase):
    def setUp(self):
        self.manifest = {'schema_version': 1, 'seeds': [7, 9], 'tasks': [
            {'task_id': 'case1', 'family': 'bugfix', 'risk': 'medium', 'starting_revision': 'a' * 40},
            {'task_id': 'case2', 'family': 'security', 'risk': 'high', 'starting_revision': 'b' * 40}]}
        self.allocation, self.blind = q.prepare(self.manifest)
        self.scores = {'schema_version': 1, 'results': [{
            'case_id': r['case_id'], 'tests_passed': r['arm'] == 'D', 'critical_escape': False,
            'quality': {k: 3 for k in q.QUALITY}, 'unintended_changes': 0,
            'grader_evidence': 'synthetic-test-only', 'final_tree_sha256': 'c' * 64
        } for r in self.allocation['allocations']]}
        self.runtime = {'schema_version': 1, 'runs': [{
            'case_id': r['case_id'], 'wall_seconds': 1.5, 'tokens': 150,
            'cost_usd': 0.3, 'tool_calls': 2, 'manual_interventions': 0,
            'runner_evidence': 'synthetic-test-only', 'model_version': 'test-model'
        } for r in self.allocation['allocations']]}

    def test_manifest_binding(self):
        result = q.summarize(self.allocation, self.scores, manifest=self.manifest, runtime=self.runtime)
        self.assertTrue(result['frozen_manifest_checked'])
        self.assertTrue(result['runtime_instrumentation_checked'])
        self.assertAlmostEqual(result['arms']['D']['cost_per_independently_passing_run_usd'], 0.3)
        self.assertIsNone(result['arms']['A']['cost_per_independently_passing_run_usd'])

    def test_changed_manifest_refused(self):
        m = copy.deepcopy(self.manifest)
        m['tasks'][0]['starting_revision'] = 'f' * 40
        with self.assertRaises(q.InvalidEvaluation):
            q.summarize(self.allocation, self.scores, manifest=m)

    def test_balanced_but_forged_allocation_refused(self):
        a = copy.deepcopy(self.allocation)
        for r in a['allocations']:
            if r['task_id'] == 'case1':
                r['task_id'] = 'case3'
        with self.assertRaises(q.InvalidEvaluation):
            q.summarize(a, self.scores, manifest=self.manifest)

    def test_runtime_missing_refused(self):
        runtime = copy.deepcopy(self.runtime)
        runtime['runs'].pop()
        with self.assertRaises(q.InvalidEvaluation):
            q.summarize(self.allocation, self.scores, manifest=self.manifest, runtime=runtime)

    def test_runtime_treatment_label_refused(self):
        runtime = copy.deepcopy(self.runtime)
        runtime['runs'][0]['arm'] = 'A'
        with self.assertRaises(q.InvalidEvaluation):
            q.summarize(self.allocation, self.scores, manifest=self.manifest, runtime=runtime)

    def test_runtime_score_cost_leak_refused(self):
        bad = copy.deepcopy(self.scores)
        bad['results'][0]['tokens'] = 100
        with self.assertRaises(q.InvalidEvaluation):
            q.summarize(self.allocation, bad, manifest=self.manifest, runtime=self.runtime)

    def test_no_mutation_of_blind_scores(self):
        before = copy.deepcopy(self.scores)
        q.summarize(self.allocation, self.scores, manifest=self.manifest, runtime=self.runtime)
        self.assertEqual(before, self.scores)
        q.summarize(self.allocation, self.scores, manifest=self.manifest, runtime=self.runtime)

    def test_model_drift_refused(self):
        runtime = copy.deepcopy(self.runtime)
        runtime['runs'][0]['model_version'] = 'different-model'
        with self.assertRaises(q.InvalidEvaluation):
            q.summarize(self.allocation, self.scores, manifest=self.manifest, runtime=runtime)

    def test_nonfinite_runtime_refused(self):
        runtime = copy.deepcopy(self.runtime)
        runtime['runs'][0]['cost_usd'] = float('nan')
        with self.assertRaises(q.InvalidEvaluation):
            q.summarize(self.allocation, self.scores, manifest=self.manifest, runtime=runtime)

    def test_separate_folders_cli(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            manifest = root / 'manifest.json'
            manifest.write_text(json.dumps(self.manifest))
            good = subprocess.run([sys.executable, str(Path(q.__file__)), 'prepare', '--manifest', str(manifest),
                                   '--private-out', str(root/'private'), '--blind-out', str(root/'blind')],
                                  text=True, capture_output=True)
            self.assertEqual(good.returncode, 0, good.stderr)
            self.assertTrue((root/'private/private_allocation.json').exists())
            self.assertFalse((root/'blind/private_allocation.json').exists())
            self.assertFalse((root/'private/blind_cases.json').exists())
            self.assertTrue((root/'blind/blind_cases.json').exists())

    def test_shared_folder_cli_refused(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            manifest = root/'manifest.json'
            manifest.write_text(json.dumps(self.manifest))
            bad = subprocess.run([sys.executable, str(Path(q.__file__)), 'prepare', '--manifest', str(manifest),
                                  '--private-out', str(root/'same'), '--blind-out', str(root/'same')],
                                 text=True, capture_output=True)
            self.assertEqual(bad.returncode, 2)
            self.assertFalse((root/'same').exists())

if __name__ == '__main__':
    unittest.main()
