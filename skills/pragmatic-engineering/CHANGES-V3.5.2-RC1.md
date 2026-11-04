> **Status:** CURRENT — describes 3.5.2-rc.1, the artifact in this directory.

# Changes — 3.5.2-rc.1

3.5.2-rc.1 repairs **three false-PASS bypasses** found by an independent adversarial review of 3.5.1-rc.1. Scope
is deliberately small: three local correctness obligations, no architecture, no new dependency, no CLI removal.

| Finding | Defect in 3.5.1 | Repair |
|---|---|---|
| **PE-351-01** | Every class read exits with a default — `.get("before", {}).get("exit", 1) == 0` — so a phase that was **never recorded** inherited a made-up outcome. For a `rejection` label the default (1) read as "the prohibited action was demonstrated": a security change with only an `after` phase was certified **PASS**. | One `required(label, kind, needed)` gate in `class_findings()`: presence is checked first, and a missing phase is `gate.phase-missing`. No branch reads an exit code for a phase it has not confirmed exists. |
| **PE-351-02** | Chronology was enforced for `before < after` only. Recording `reverted` → `before` → `after` was certified **PASS**, so the "reversion" ran before the fix existed and proved nothing about it. | Ordering now walks **every** consecutive pair of recorded phases in canonical order (`before → after → reverted`), reporting `gate.phases-out-of-order` naming the pair, and `gate.phase-order-unverifiable` when the sequence cannot be established. |
| **PE-351-03** | Candidate and input fingerprints were taken **before** the live re-runs and never after. A verifier that rewrote the implementation while `check` ran returned **PASS, exit 0, `diff=0 file(s)`** — certifying a tree it had just broken (time-of-check/time-of-use). | `binding_findings()` re-derives the candidate and verification-input fingerprints **after** all live re-runs and refuses with `gate.post-check-mutation` when either moved. |

Both entity checks now also run in the *post-run* position, so the refusal is idempotent under the tree the run
leaves behind.

## Reporting-honesty change

The `performance` branch accepted a self-reported `--repeats` count with `--spread` optional, which is not
evidence of a stable measurement. `--spread` is now **required** on both phases when repeats are claimed
(`gate.benchmark-stability-unreported`), and `references/testing.md` states plainly that these numbers are the
author's self-report: an instrument can require them to be stated and internally consistent, and cannot confirm
them. No benchmark framework was added to fix a wording problem.

## Finding-id change (one, deliberate)

`gate.reversion-missing` is gone; a missing phase is now reported by the single `gate.phase-missing` mechanism
for every class. One mechanism means the same omission cannot be refused in one class while a default exit code
satisfies it in another — which is exactly how PE-351-01 survived the previous review. The suite case that
asserted the old id was updated to assert the new one; it still asserts a refusal with a named reason.

## Tests

`scripts/tests_pe_gate.py` — **48 cases** (was 42), one of which is a 15-combination invariant matrix
(class × label kind × omitted phase). The three independent reproduction scripts supplied with the audit were
converted into release regression seeds, each with its premise asserted:

- `test_a_security_change_without_a_before_phase_is_refused`
- `test_a_new_behaviour_rejection_without_a_before_phase_is_refused` (the same default, class by class)
- `test_a_reversion_recorded_before_the_fix_is_refused`
- `test_a_verifier_that_mutates_the_candidate_is_refused` (also asserts the run really did break the tree)
- `test_a_benchmark_without_a_reported_spread_is_refused`

**Mutation matrix:** run against the **shipped 3.5.1 gate**, recovered from `pragmatic-engineering-v3.5.1-rc.1.zip`
and verified to hash `c2dba2df9f171f7be85d5d9880d9afbd56e83dd23834bc0ec20ad61722c03365`, `6 of 47` cases fail — the
five above plus the taxonomy case. All 47 pass against 3.5.2-rc.1.

**Independent reproduction:** the audit's own `pe351_security_missing_before.py`, `pe351_reversion_order.py` and
`pe351_check_mutates_candidate.py`, pointed at this build, now return `REFUSED`, exit 2, naming
`gate.phase-missing`, `gate.phases-out-of-order` and `gate.post-check-mutation` respectively. Before the repair,
against 3.5.1-rc.1 as shipped, all three returned `PASS`, exit 0.

## Preserved

Every legitimate flow still passes: honest bugfix with a silent verifier, security regression with a real before,
refactor, docs, performance with measurements and spread, declared verification inputs, hook installation. CLI
surface unchanged; the only new flags are none — `--spread` was already accepted, it is now required when
repeats are claimed.

## Unverified, still

Whether the doctrine improves coding outcomes. Three consecutive adversarial rounds have now found *gate* defects
and none has measured *agent* outcomes; that remains the next milestone, and no further gate work is justified
before it runs.
