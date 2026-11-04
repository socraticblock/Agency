> **Status:** CURRENT — describes 3.5.1-rc.1, the artifact in this directory.

# Changes — 3.5.1-rc.1

3.5.1-rc.1 is 3.5.0-rc.1 with the **gate repaired**, plus the documentation and provenance corrections that
repair requires. Nothing else moved: the four commitments, the six change classes, the references, the assets
and the overall design are unchanged. No module split, no schema layer, no new dependency, no CLI removal.

## What was wrong

Every defect below was **reproduced by execution** before it was fixed, on the unmodified v3.5.0-rc.1 gate.
Full commands, exit codes and outputs: `~/hermes-workspace/experiments/pragmatic-engineering/reports/`.

| # | Defect | Reproduction |
|---|---|---|
| 1 | **A bugfix could be certified whose recorded `after` phase never passed.** `class_findings()` checked the `before` and `reverted` outcomes and never the recorded `after` outcome; the green re-run at check time executes the current tree, not the recorded phase. | before=1, after=1, reverted=1 recorded, tree fixed afterwards → `check` printed **PASS**, exit 0 |
| 2 | **`install-hook` produced an inert hook.** It wrote `.githooks/pre-commit` (a path git ignores without `core.hooksPath`) containing `exec python3 scripts/pe_gate.py check` (a path that only resolves if the gate were vendored into the repo). | `check` refused (exit 2); `git commit` **succeeded** (exit 0, commit `f11ca52`); run directly, the hook exited 2 for "file not found" — the same code a refusal uses |
| 3 | **`gate.identical-output` refused honest silent verifiers.** Two phases with byte-identical stdout and different exit codes were refused on the theory that "the change in exit code did not come from anything the run observed". An exit status *is* an observation. | an honest fail/pass/fail with a silent verifier → refused; adding one `print()` to the verifier → PASS |
| 4 | **HEAD-only revision binding.** All three phases of a real fix recorded the same commit, so the revision field distinguished nothing about uncommitted work. | before/after/reverted all `revision=17efa14527cf` with the tree alternating broken/fixed |
| 5 | **The verification-input digest could not see a root-level verifier.** Scope was `tests/test/spec/acceptance` only. | a repo whose entire verification was a root `check.py` recorded `tests_digest=none:0` in every phase |
| 6 | **Unbounded command execution.** `subprocess.run(..., shell=True)` with no timeout, and `check` re-runs recorded commands — so a hanging command hangs a pre-commit hook forever. | code inspection (`run()`), plus the re-run path in `binding_findings()` |
| 7 | **Phase order was established by wall-clock seconds.** Equal stamps are indistinguishable, and a backwards clock step produced a spurious refusal — `gate.phases-out-of-order` on an honest pair. | 2 failures across 22 suite runs, on 2 different tests, reproduced on the **pristine** baseline copy; 0 in 10 repeats |
| 8 | **A `benchmark` label with no measurement satisfied `performance`.** The obligation was `need("benchmark")`. | a performance change with an empty benchmark label passed |
| 9 | Documentation: the module docstring said state lives in `.pe-gate/` at the workspace root (it lives under the git directory); `SKILL.md`'s walkthrough omitted the `reverted` phase it requires, and used an undefined `$GATE` for a file that is not executable. | docstring vs `state_dir()`; `SKILL.md` vs the class table; `$GATE ...` → exit 126 |

Defects 1 and 2 are release-blocking: each let the gate assert an obligation it was not enforcing.

## What changed

**Gate (`scripts/pe_gate.py`)**

- `class_findings()` — `bugfix` now asserts the recorded `after` outcome (`gate.evidence-still-failing`) and
  that an `after` phase exists at all (`gate.evidence-missing`).
- `candidate_fingerprint()` — content hash of tracked modifications, in-scope untracked files and declared
  inputs; recorded per phase and re-checked at `check` (`gate.candidate-changed`). A tree that cannot be
  inspected is an error, never an empty set (`gate.candidate-unreadable`).
- `verification_inputs()` — the digest now adds declared `--input` paths and the oracle-looking files the
  command names (a root-level `check.py` is no longer invisible), and reports missing/unreadable inputs
  (`gate.input-missing`, `gate.input-unreadable`, `gate.verification-input-unreadable`). A verifier edited
  *after* the evidence was collected is now caught too (`gate.verification-inputs-stale`).
- `phase_order()` + persisted `seq` — strictly increasing sequence numbers are the ordering authority,
  allocated under an `O_EXCL` lock; wall-clock `at` is metadata. Records with neither are refused as
  `gate.phase-order-unverifiable` rather than assumed in order.
- `run()` — every command (including git, and including the re-run at check time) is bounded by
  `--timeout` (default 900s, recorded at baseline). Timeout, spawn failure, refusal and success are distinct
  outcomes; a timeout is never a detected defect (`gate.timeout-not-falsification`).
- **Removed** `gate.identical-output` (decision A). No requirement for non-empty or differing output was
  substituted; the exit outcomes and the bindings above carry the weight.
- `install-hook` — writes to the path git actually reads (`core.hooksPath` when configured, else
  `<git-dir>/hooks/pre-commit`), with the resolved interpreter and gate path, refuses to overwrite a hook it
  did not write (`gate.hook-exists`, `--force` to replace), and states that a local hook is bypassable.
- `performance` — a benchmark label now owes measurements: same `--metric`/`--unit` on both phases, a declared
  `--direction`, a positive `--tolerance`, at least two `--repeats`, a spread within tolerance, and an
  improvement larger than the declared tolerance. No universal speedup threshold is imposed — the tolerance is
  the caller's, in the metric's own unit.
- Docstring rewritten to describe the storage actually used and to state what the tool is not (no oracle, no
  sandbox).

**Doctrine**

- `SKILL.md` — a complete bugfix walkthrough (baseline → before → after → reverted → restore → record →
  check), with the gate invoked by its installed path through an interpreter; what `check` refuses; and an
  `## Instruments` section naming all five scripts.
- `references/core-rules.md` — the precedence hierarchy, moved in from the package index that loading the
  skill never reached.
- `references/authority-boundaries.md` — what the gate can and cannot enforce; the local hook is developer
  assistance, CI is the authoritative check.
- `references/testing.md` — "a nonzero exit is not a witness": name the failure you expect and confirm that
  failure occurred; never add a `print()` to satisfy a tool.
- `INDEX.md` — current-release row corrected, this changelog named, related-skill list checked against the
  installed catalogue (`code-simplification` does not exist and was removed).

**Packaging** — generated bytecode (`scripts/__pycache__/`) removed and must not be shipped; it accumulates on
use because the instruments are run under several interpreters.

## Tests

`scripts/tests_pe_gate.py` now has **42 cases** (was 25). A new fixture (`RepoDefectCase`) puts the defect in
the repository, because the old fixture kept its flags outside the repo — so every phase ran against identical
content and no case could observe candidate binding at all.

Each case was run against the **unmodified v3.5.0-rc.1 gate**: **18 of the 42 fail there and pass here** — all
17 new cases plus the hook case rewritten to the new contract — which is the proof that each case detects the
defect it names. They include the historical-after bypass, the silent verifier, candidate modification, both
root-level-verifier cases, the three declared-input cases, the forged record, the timeout, the three benchmark
cases, the three hook cases and the legacy ordering fallback. One of them
(`test_phases_recorded_out_of_order_are_refused`) is *timing-dependent* against the old gate — it passed in one
matrix run and failed in another, which is the flake itself, not the fix.

## Acceptance for this revision

Re-run and recorded in `~/hermes-workspace/experiments/pragmatic-engineering/reports/`:

- gate suite **40/40**, validator `VALID`, regression suite 14/14, holdout 11/11 — all with real exit codes;
- the new suite clean on **10 consecutive runs** (defect 7 was an intermittent failure at roughly 1 run in 11;
  intermittent is not the same as fixed, so the ordering rule was replaced rather than retried);
- **no known bypass** from the release battery remains open.

**Unverified, and not claimed:** whether the doctrine improves coding outcomes. That needs the controlled
no-skill / v3.5 / v3.5.1 comparison, which has not been run. A green gate is not evidence of correct software,
and this revision does not claim otherwise.
