# Hermes repair pass over v3.5.3-dev-review.1 — for review, NOT a release

**Date:** 2026-10-16
**Base:** `pragmatic-engineering-v3.5.3-dev-review.1-source.zip`, SHA-256
`5f08ffa29afaef9b82d2014ffdc8ae2f0905f3e7cdaadb420fcc0da144916380` (the author's package is unchanged by this pass;
this tree is a separate copy).
**Status:** still experimental. **No stable-promotion claim.** The blinded agent-outcome evaluation, transfer
study, protected CI and cross-platform verification named in the handoff remain outstanding, and the semantic
bound recorded by the author (an unrelated in-scope repository edit plus an external flag still satisfies
candidate attribution) is unchanged and independently reproduced.

## Why this pass exists

Hermes independently verified the author's patch: the SHA-256 manifest, the 70-file inventory and the shipped
diff all check out; the five known false-PASS classes reproduced on pristine v3.5.2 and are refused here; every
suite is green; and 51 of 51 executed persisted-state mutations are refused without tracebacks. Two defects in
the gate's OWN evidence store survived that verification, and both fail in the shape this gate exists to prevent:
a success report for evidence that was not kept.

## D1 — a repeated `falsify --phase` erased the earlier record

Observed: recording `before` twice for one label returned `ok` both times, advanced `seq` 1 → 2, and left only
the second record. A phase that had timed out (inconclusive) could therefore be rewritten as a completed run
with the inconclusive record gone.

**Repair.** A second record for an already-recorded label/phase is refused with `gate.phase-already-recorded`
(exit 2), before the command is executed as well as again under the lock. Deliberate re-measurement is an
explicit act: `falsify … --replace-phase` supersedes the old record and keeps it under
`entry["superseded"] = [{"phase", "at", "replaced"}]`, so nothing is ever erased. `check` and every other
obligation read only `runs`, so a superseded record changes no verdict.

## D2 — concurrent writers lost evidence and reported success

Observed: four simultaneous `falsify` processes against one repository all exited 0 printing
`ok … recorded`; one label survived and three were gone. `state_lock` protected `seq.json` only, while
`falsify.json` and `dod.json` were read-modify-written with no lock: last writer wins, every writer reports
success.

**Repair.** New `evidence_lock(root, "evidence.lock")` (same O_EXCL primitive, 60 s wait, stale-lock takeover
inherited from `state_lock`). `cmd_falsify` and `cmd_dod` now load their state file *inside* that lock and write
it inside the same lock; the unchanged pre-run checks stay before the command so nothing is executed for a
recording that will be refused. Lock order is `evidence.lock` → `seq.lock` only (`next_seq` takes its own lock
and never takes the evidence lock), so there is no deadlock cycle.

## Tests added (`scripts/tests_review_hardening.py`, 10 → 13 cases)

- `test_duplicate_phase_is_refused_and_keeps_the_earlier_record` — exit 2, `gate.phase-already-recorded`, and
  the stored record is compared field-by-field against the first one.
- `test_replace_phase_supersedes_instead_of_erasing` — `--replace-phase` succeeds, the new `seq` differs, and
  the replaced record is present and identical under `superseded`.
- `test_concurrent_writers_all_persist` — three simultaneous writers must all exit 0 **and** all three labels
  must be present with distinct sequence numbers.

## Compatibility note (changes to public CLI behaviour)

This pass adds `falsify --replace-phase` and one refusal code (`gate.phase-already-recorded`). It changes no
existing behaviour otherwise. Carried forward from the author's patch, and **not previously documented in the
package**, are these CLI behaviour changes against v3.5.2 — all fail-closed, none affecting stored state:

| Area | v3.5.2 | v3.5.3-dev-review.1 |
|---|---|---|
| `--authorised` blanket aliases (`.`, `./`, `**`, `./**`, `?*`, `*`, `*/*`, `**/*`, absolute, `..`) | only `*`, `/`, `""` refused | all refused (`gate.scope-blanket` / `gate.scope-invalid`) |
| `--budget` malformed value (`files=abc`) | silently ignored, defaults 6/250 used | refused `gate.budget-invalid`, exit 2 |
| benchmark phases without `--metric/--unit/--direction/--value/--tolerance/--repeats/--spread` | accepted; refused later at `check` | refused at record time (`gate.benchmark-invalid`) |
| `bugfix`/`new-behaviour`/`security` certified from external-state-only command flips | PASS | refused `gate.candidate-not-attributable`; no blanket opt-out |
| state file format | — | **unchanged and verified readable**: state written by the v3.5.2 gate still `PASS`es here |

## Verification of this pass

- `scripts/tests_pe_gate.py` **Ran 50 · OK** (no existing case re-records a phase)
- `scripts/tests_review_hardening.py` **Ran 13 · OK**
- `scripts/validate_skill.py` VALID; `regression_suite.py` 14/14; `rc1_holdout.py` 11/11;
  `tests_git_nul_paths.py` 4/4
- `reproduce_v352_blockers.py --expect repaired` — all five bypasses still refused
- Hermes adversarial batteries (scope table, persisted-state mutations, staging shapes, input escapes,
  startup ambiguity, benchmark conventions, candidate binding, residue) — unchanged results
- Concurrency: three simultaneous writers now persist three records

Raw logs and the probes: `evidence_hermes/` and `harness/` in the review workspace.
