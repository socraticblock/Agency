# Testing Doctrine

Testing exists to provide useful confidence and enable safe change.

## Test behavior, not implementation trivia

Prefer tests that remain valid when internals are refactored without changing behavior.

Good targets include:

- public contracts;
- domain behavior and invariants;
- error and boundary behavior;
- serialization/protocol/schema compatibility;
- component integration;
- critical user journeys;
- previously observed regressions.

Avoid tests whose main assertion is that private calls happened in a particular order unless that interaction is itself the contract.

## Choose the smallest useful test

Prefer fast, deterministic, isolated tests for most logic. Add broader integration or end-to-end tests where risk lives in the boundary between components or the real runtime.

Do not encode a universal numeric test-pyramid ratio. Let architecture and risk determine the mix.


## Validate the verifier

A green label or zero exit status is not sufficient evidence by itself.

When the result matters, confirm that:

- the intended checks actually ran and selected the changed behavior;
- relevant tests were not silently skipped, filtered out, quarantined, or replaced by a no-op path;
- cached or retried results still describe the final inputs and environment;
- partial-success output, per-item failures, warnings, or missing artifacts are not being collapsed into overall success;
- the produced artifact or exercised runtime corresponds to the final source/configuration being claimed.

Treat cache hits and automatic retries as evidence only when their provenance and semantics are understood. If a stale cache could hide the failure and the risk matters, obtain fresh evidence.

A verifier also needs a trustworthy oracle. Round-trip, snapshot, generated-expected-value, or self-consistency tests can allow paired bugs to agree with each other. For important external contracts, numeric conversions, protocols, migrations, or compatibility behavior, anchor at least one check to an independent source such as a specification example, known-answer vector, representative legacy fixture, cross-implementation result, or separately derived invariant when practical.

## Falsification

For any fix: establish a reproducer or failing behavioural test before the correction, then re-run that exact
check after the change and record both outcomes. For new behaviour: name, in the change record, the specific
observation that would show it wrong. Run the identical command before and after, and record the revision or state of each run. Where the check
cannot be run, name the blocker and the command you attempted, state that explicitly, and treat the result as
unverified — do not call it passing.

### A nonzero exit is not a witness

A command that fails for the wrong reason — a missing file, a typo, an unrelated assertion, a truncated read that
still exits nonzero — looks exactly like a falsifier that worked. So before recording a falsification, name the
failure you expect and confirm the run produced *that* failure: quote the assertion, the error, the mismatched
value, the count. Where the failure produces no error signal at all, check the arithmetic: declared against
delivered, expected against counted.

The gate can check only the mechanical part — which phase ran, against what content, with which exit outcome, in
what order. Its `reverted` phase is the closest a mechanical gate gets to a semantic witness, and it is not one:
it shows the check depends on the defect, not that the check tests the requirement you care about. Judging that
the observed failure is the intended one remains yours. For high-assurance work, prefer a verifier that asserts
the intended condition explicitly and declare every fixture it depends on with `--input`, rather than inferring
correctness from a status.

Never add a `print()` or a decorative log line to satisfy a tool: it changes the record, not the verification.
If an instrument demands that, the instrument is wrong — say so and fix it.

### A verifier must not modify what it verifies

A check that edits the tree as it runs — restoring a fixture in place, writing a cache into the source
directory, "correcting" the file under test — can report success and leave the deliverable in a state nobody
verified. The mutation lands between the fingerprint and the verdict, which is why the gate re-binds the
candidate after its own commands finish and refuses (`gate.post-check-mutation`) when the tree moved. The design
rule comes first: verify a copy, or write only outside the candidate's scope.

### Measurements you report are self-reports

When using this experimental repair, report `spread` as the max-minus-min range of repeated raw
observations expressed in the same unit as the metric, and supply finite nonnegative values on both
phases. `--metric`, `--unit`, `--direction`, `--tolerance`, `--value`, `--repeats` and `--spread`
are mandatory per benchmark phase. The gate checks the measurement metadata and declared improvement,
not the measurements themselves. Mismatched tolerances are not comparable.

`--repeats` and `--spread` are the author's numbers, not independently established ones. An instrument can
require that they are stated, internally consistent and larger than the declared noise; it cannot confirm them.
Say "measurements reported by the author, stability consistent with the stated spread", not "measured stable" —
and where the number carries the decision, keep the raw samples as a declared verification input.


## Regression workflow

When fixing a meaningful defect:

1. reproduce it deterministically if practical;
2. add a failing test or durable reproducer;
3. make the smallest root-cause fix;
4. see the new check pass;
5. run nearby existing checks;
6. broaden only if the blast radius warrants it.


## Never make the evidence fit the implementation

A red test, snapshot, golden file, fixture, or expected output is not an inconvenience to erase.

Before changing expected behavior in verification code:

1. determine whether the product contract intentionally changed;
2. inspect the semantic difference;
3. make the reason visible in the change;
4. ensure the revised check would still catch a real regression.

When fixing a bug, see the new regression check fail on the old behavior when practical. This proves the check is capable of detecting the defect.

Do not delete assertions, broaden tolerances, skip tests, regenerate snapshots, or replace precise checks with weaker ones solely to obtain green output.

## Strong tests

A strong test:

- describes one meaningful behavior;
- has obvious setup and expectations;
- produces actionable failure output;
- avoids unnecessary control flow;
- does not rely on test ordering or shared mutable state;
- is deterministic when possible;
- minimizes unrelated fixtures and infrastructure;
- fails if the behavior is subtly wrong.

## Test doubles

Prefer real values, fakes, or stable boundaries over extensive mocks. Heavy interaction mocking often couples tests to implementation and can produce high maintenance with low bug-finding value.

## Property-based / generative tests

Use when the important requirement is an invariant over a broad input space: parsers, serializers, numerical transformations, state machines, collections, protocol round trips, or algebraic/domain properties.

A property test is only as strong as its generator and oracle. Make the generated domain representative: include meaningful boundaries, invalid/degenerate cases, and distributions that can reach the failure modes you care about. Preserve useful failing seeds/examples, and do not treat a large sample count as proof when important classes of input are unreachable.

## Coverage

Coverage is a diagnostic, not a quality target. A high percentage does not prove meaningful behavior, and a low percentage can reveal untested risk without specifying which test to write.

## Flakiness

Never normalize unexplained flakiness. Determine whether nondeterminism comes from time, ordering, concurrency, shared state, environment, external services, randomness, or the test itself. Quarantine only with explicit visibility and a plan; do not silently retry until green.


## Isolation

Tests that modify environment variables, working directory, locale/timezone, global registries, clocks, random state, temporary ports/files, feature flags, or monkey patches must restore them even on failure.

Prefer scoped fixtures/helpers that make cleanup automatic. A test suite should not depend on execution order or leak state into later tests unless the test contract deliberately exercises shared state.

## Concurrent gate use and duplicate phases

A `falsify` label has exclusive execution semantics on Linux: do **not** start `before`, `after`,
`reverted`, or a `--replace-phase` for the same label while another is running. The second command must
refuse with `gate.phase-in-flight` and must not launch verification. Use distinct labels only when they
are genuinely independent. `--replace-phase` is an explicit, auditable replacement of an already completed
phase; it is **not** a means to interrupt or hijack an ongoing run. After process interruption, inspect the
record, source tree, and external side effects before retrying. `check` refuses records modified while it
reran verification. Neither this mechanism nor the recorded chronological sequence proves that commands
are safe to run concurrently, reversible, or semantically correct.
