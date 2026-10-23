---
name: pragmatic-engineering
description: Use when writing, fixing, testing or reviewing code.
version: 3.5.3-frozen.1
author: Socraticblock, Hermes Agent
license: MIT
platforms: [linux]
metadata:
  hermes:
    tags: [engineering, doctrine, verification, changeability, agent-safety]
    related_skills: [systematic-debugging, fix-playbook, source-driven-development, specification-first-design, review-loop, merge-ready-review]
---

Make an AI coding agent consistently deliver correct, maintainable, secure, well-structured code while preventing unnecessary complexity and long-term codebase deterioration.

# Pragmatic Engineering

The outcome is reliable code **and a healthier repository after each change**. The four commitments guide
execution; the gate audits local evidence, not code quality. A gate PASS never substitutes for a
maintainability review or an independent behavioral test.

**Frozen baseline, 2026-10-16** — content of `v3.5.3-dev-review.13`, frozen after independent adversarial
review (mechanical assurance only; behavioural efficacy is **not** established). Documented divergences from the
reviewed archive, its hashes, and the open items carried into the baseline: `FROZEN-2026-10-16.md`.

Where a specialist workflow conflicts with them, follow its method and still keep the record.

## The four commitments

1. **Identify the invariant** — what must stay true, especially when something fails. State it before the first write.
2. **Challenge it executably** — a test that violates the invariant, or a fault you inject. An injection is evidence
   only if a witness shows the fault was **reached**; a test that passes for an unrelated reason proves nothing.
   **Where the failure produces no error signal, check the arithmetic** — declared against delivered, expected
   against counted. A shortfall that exits 0 is the case you will otherwise report as clean.
3. **Follow the failure to its boundary** — assert the externally observable outcome: the export, the decision, the
   published artefact. Not the internal helper that is convenient to test.
4. **Report only established evidence** — executed / not executed / unverified / inferred, each at the level it
   actually reached: **E0** unverified · **E1** static · **E2** focused execution · **E3** integrated execution ·
   **E4** target environment · **E5** operational (`references/evidence-ladder.md`). A passing suite is evidence
   about the checks that ran, not proof they encode the right requirement.

## Codebase quality: five expectations

Before editing, identify the existing module boundary and the smallest sound change. After editing, verify:
**correctness** (including failure behavior), **maintainability** (readable, cohesive change),
**architecture** (respects ownership and interfaces), **testing** (meaningful positive/negative coverage),
and **scope/security** (no avoidable blast radius, unsafe effects, or new dependencies).
Do not improve a quality score by adding abstraction, tests, or ceremony that the task does not warrant.
For risky or cross-module changes, use `references/engineering-quality.md`; for small changes, apply the
same judgment proportionately. Record material trade-offs and leave an honest maintenance note.
These are engineering decisions, not new gate-certified obligations.

## Select verification proportionately

Use mandatory repository gates. For consequential changes with a checkout, prefer executable
falsification; for low-risk edits use the smallest check that can disprove the claim.
With API-only source access, remote diffs are E1 and isolated reproductions prove only
what they executed (E2), not a full build or gate PASS. Never invent execution evidence.
Details: `references/evidence-ladder.md` and `references/engineering-quality.md`.

## Gate: mechanical evidence, not code quality

A mechanical gate PASS is **not** proof of sound design or independent behavioral correctness. The gate runs in one repository, records what a command did
against a candidate, and refuses while the evidence a change class owes is missing or no longer describes the
tree. It ships with this skill, not with your repository, so invoke it by its installed path — the file is not
executable by default, so run it through an interpreter:

```bash
SKILL_DIR="${HERMES_HOME:-$HOME/.hermes}/skills/shared/pragmatic-engineering"   # this skill's installed directory
GATE="$SKILL_DIR/scripts/pe_gate.py"

# 0. declare the change, before touching anything
python3 "$GATE" baseline --change-class bugfix --authorised src/app.py,tests/test_app.py

# 1. demonstrate the defect — this run must FAIL
python3 "$GATE" falsify --label bug-123 --cmd "python3 -m pytest tests/test_app.py::test_x" --phase before

# 2. fix the defect, leaving the test alone — the same command must now PASS
python3 "$GATE" falsify --label bug-123 --cmd "python3 -m pytest tests/test_app.py::test_x" --phase after

# 3. restore the defect and run the SAME command again — it must FAIL again, or the test detects nothing
python3 "$GATE" falsify --label bug-123 --cmd "python3 -m pytest tests/test_app.py::test_x" --phase reverted

# 4. put the fixed candidate back: what you deliver must be what the `after` phase ran against
python3 "$GATE" dod --item dod.1 --answer "<evidence>"     # ... and each item `check` names
python3 "$GATE" record && python3 "$GATE" check            # check exits 2, naming every unmet obligation
```


The Linux Git audit first binds the workspace to the nearest physical `.git`
checkout marker. If `core.worktree`, `GIT_WORK_TREE`, or `GIT_DIR` instead makes
Git report another root/metadata directory, the gate refuses **before**
recording or re-running verification. Normal subdirectory invocation and linked
worktrees remain supported. This is a cooperative local checkout-identity
check, not a defense against an adversary who can rewrite all on-disk evidence.

New baselines bind raw tracked working-tree bytes independently of Git's filters and line-ending normalization. The gate rechecks these bytes before verification, after verification, and during `check`; it can therefore detect tracked out-of-scope byte changes that Git considers clean. Existing baselines without a raw inventory retain strict Git normalization refusal. For normalization-hidden raw changes, Git added-line counts are unknown and a baseline `--budget-note` is required. Tracked-file hashing is proportional to repository size; ignored, untracked runtime inputs must be declared with `--input`. This is still a *locally observed baseline*, not an authenticated source of authority. See `CHANGES-V3.5.3-DEV-REVIEW9.md`.

`check` preflights static state, scope, budget and candidate bindings *before* rerunning stored commands; known refusal conditions do not trigger verifier side effects. After live verification it re-audits scope and budget. These are cooperative local checks, not a sandbox.

`check` exits 2 naming every unmet obligation, so it serves as a pre-commit hook (`install-hook` — confirm it
actually blocks a commit) or a CI step. It refuses, among others: a required phase that was never recorded
(a missing phase is missing evidence, never a default exit code); a recorded `after` phase that did not pass
(a green re-run at check time executes the *current* tree and is not that phase); phases whose recorded order is
not the canonical before → after → reverted; a tree that no longer matches the candidate the `after` phase
verified, whether it drifted before the check or *while the check's own commands were running*; verification
inputs edited after the evidence was collected; a phase that hit its timeout; and a verification run that left
the tree different from the one it certified. What each change class owes:
`bugfix` — before fails, after passes, and **`reverted` fails again**, so the test demonstrably detects the
defect; `new-behaviour` — a capability label and a rejection label; `refactor` and `docs` — equivalence, green
before *and* after; `performance` — equivalence plus a benchmark that carries measurements, a direction and a
tolerance (a label alone certifies nothing); `security` — the prohibited action succeeds before the change and
is blocked after (`references/testing.md` for falsifier design). With no version control, record that as a
claim: `--no-vcs-claim "<the check that showed there is no repository>"`.

Concurrent local use (Linux on a local filesystem): `falsify` refuses an already-running label **before**
launching a second verification, including a different phase or `--replace-phase`. Evidence writers use OS-owned
locks that are not stolen based on elapsed time; a verifier inherits its label lease so an abrupt parent crash
cannot immediately permit another command while its child remains alive. JSON state is atomically replaced.
`check` takes the same per-label lease before re-running a verifier and passes the lease to
its child, so killing the check parent does not permit overlapping verification while that
child remains alive. It also refuses if its evidence files changed while re-running verifiers.
A local Git index with `assume-unchanged` or `skip-worktree` tracked entries is refused by
`check` both before and after live verification, because those hints can conceal out-of-scope modifications from Git status/diff;
sparse checkouts currently require a separate supported audit path. On case-sensitive Linux filesystems,
the gate also forces Git audit configuration (`core.filemode=true`, `core.ignorecase=false`,
`core.fsmonitor=false`), so user-level Git caching/compatibility settings cannot mask permission-only
or case-only changes. Candidate identity binds symlink target spelling and executable bits as well
as file bytes. Persisted baseline revision values are syntax-validated before Git comparison;
recorded data is never interpolated into a shell. These are cooperative integrity
rules, **not external authorization**: untrusted processes can edit state, escape a command's process group, or
bypass advisory locks; the host must enforce isolation and policy where that matters. In particular, never
interpret a gate PASS as an independently authenticated attestation. See `references/authority-boundaries.md`.

The gate is an evidence-accounting tool, **not** a semantic oracle and **not** a sandbox: it can check that a
command ran, against what content, with what outcome, in what order — it cannot check that the command tests
the right requirement, and its commands run with your privileges. For repository behavior changes the gate
requires an attributable before/after candidate difference (and, for a bugfix, candidate restoration on
reversion). A difference is necessary, not semantic proof: an unrelated edit can still satisfy a file hash
rule, so a separate independent test must establish the relation to the actual requirement. Do not present
configuration/environment-only command flips as a verified repository bugfix. A `performance` PASS means
only that self-reported finite measurements satisfy declared comparison rules: it is not a trusted speed test. Judging that a failure is the *intended*
failure stays with you (`references/testing.md`, `references/authority-boundaries.md`).

## Three rules that change outcomes most often

- Attribute a failure to pre-existing causes only by **demonstrating it on the pre-change revision**, never from
  reading the code path. Otherwise call it unexplained.
- **Never weaken, delete, regenerate or rewrite a verification artefact to make a change look green.** First
  establish whether the expected behaviour legitimately changed, then update it and say so.
- Keep the invariant where you can when a specialist procedure conflicts, and never invent a parallel workflow.

## Routes — load only what the task needs, then say what you loaded and applied

Standing rules `references/core-rules.md` · code health `references/engineering-quality.md` · conflicting principles `references/decision-policy.md`,
`references/pragmatic-principles.md` · falsifier design `references/testing.md` · boundaries, numeric and untrusted
input `references/boundary-correctness.md` · artifact exports, backups and publication `references/artifact-lifecycle.md` · lifetimes, retries, partial writes `references/reliability.md` ·
generated or vendor files, unclear source of truth `references/repository-truth.md` · consequential permissions
`references/authority-boundaries.md` · version-controlled edits, dirty worktrees, concurrent agents
`references/workspace-safety.md` · final review `references/self-review.md` with `assets/handoff-template.md`.

Mode, when the task has one: `references/modes/build.md`, `references/modes/debug.md`, `references/modes/review.md`,
`references/modes/refactor.md`, `references/modes/architect.md`, `references/modes/security.md`,
`references/modes/performance.md`, `references/modes/automation.md`, with `assets/debug-template.md`,
`assets/review-template.md` and `assets/architecture-decision-template.md` for the written forms.

## Definition of done

Every applicable item true, each answered with evidence in the completion record: the requested outcome is satisfied
and any deviation from the plain reading is stated; the diff holds nothing you cannot account for and concurrent work
is intact; verification ran without weakening the verification itself, with failures separated into caused /
demonstrated-pre-existing / unexplained; and the reported evidence level matches the claim.

## Instruments

- `scripts/pe_gate.py` — the gate itself (see above). No third-party imports; run it with any Python 3.11+.
- `scripts/tests_pe_gate.py` — the gate's own suite: 48 cases over two fixtures, one of which puts the defect
  in the repository so candidate binding is observable, plus a 15-combination matrix asserting that no class
  accepts a missing required phase. Most cases assert a *refusal* and the finding it names.
- `scripts/validate_skill.py` — validates the package's live reference graph: routes and Markdown links reachable
  from this file, transitively. Run it after editing any reference.
- `scripts/regression_suite.py` — executable regressions over the validator's own behaviour (routes, anchors,
  version/index agreement).
- `scripts/rc1_holdout.py` — held-out cases written against the validator, including that it does not mutate the
  package it validates.
- `evals/quality_eval.py` — pilot blinded-allocation and descriptive paired-outcome analysis; run its unit tests
  before changing evaluation logic. Never mistake harness self-tests for agent-quality evidence.

Run them from `scripts/` with an interpreter that has PyYAML (the validator imports it): `/usr/bin/python3` on
this host — the default `python3` is a bundled build without it.

## What this doctrine is not

Not a substitute for the gate, not a checklist to satisfy rhetorically, and not a substitute for thinking about the
specific failure in front of you. Independent measurement (four task classes, blind judges, an injected-fault battery)
found that the arm carrying an earlier and much larger version of this doctrine produced a **better record and no
better code**, and on a read truncated with no error signal it missed what an arm with no doctrine at all caught. The
four commitments are what survived that measurement; the surrounding prose is what it cost.
