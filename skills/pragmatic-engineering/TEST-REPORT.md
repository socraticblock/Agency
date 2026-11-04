> **Status:** HISTORICAL — describes the V2/V3 revision. Retained for provenance; not current for rc1 (see INDEX.md).

# Pragmatic Engineering Skill — Test Report

Test date: 2026-10-07

## What was actually tested

This report separates deterministic package checks from behavioral reasoning.

### Deterministic checks
- package structure;
- required files;
- YAML metadata;
- local Markdown links;
- one top-level skill directory;
- reference presence.

### Behavioral doctrine checks
The skill was mapped against:
- the original 20 scenarios;
- 16 additional adversarial scenarios created after V2 to reduce test-to-spec overfitting.

This is an instruction-coverage/self-evaluation, not an independent model A/B benchmark. It demonstrates that the doctrine contains a sound response path; it does not prove every model will execute that path perfectly.

## V2 result before adversarial patch

- Structural validation: PASS.
- Original 20 scenario coverage: 40/40 by doctrine mapping.
- Important caveat: these scenarios were authored with the skill, so this score alone was not convincing.
- New adversarial audit exposed weak or implicit coverage for:
  - generated/vendor source-of-truth;
  - snapshot/golden-file blessing;
  - resource lifetime;
  - partial writes/atomicity;
  - duplicate delivery/idempotency;
  - bounded retries/timeouts/cancellation;
  - concurrency in new code;
  - dependency/lockfile churn.

Those were treated as genuine design defects in the skill.

## V3 corrections

Added:
- `references/reliability.md`;
- `references/repository-truth.md`;
- global prohibition on weakening verification merely to get green;
- explicit generated/source-of-truth routing;
- stronger regression/snapshot rules;
- resource/partial-failure review in build mode;
- 16 adversarial eval scenarios (36 total).

## V3 doctrine coverage

All 36 scenarios now have an explicit pass path in either the core skill or a routed reference.

Expected doctrine score: 72/72.

This is not presented as an unbiased behavioral score. The meaningful claim is narrower: the discovered failure classes are now explicitly governed and testable.

## Remaining validation needed

For production confidence, run independent agent trials on real repositories:

1. randomize scenario wording so the model cannot pattern-match the eval text;
2. run tasks both with and without the skill;
3. hide the grading rubric from the coding agent;
4. use independent outcome tests;
5. use a separate reviewer/grader when possible;
6. record tool traces, changed files, test behavior, and completion claims;
7. especially measure:
   - unnecessary diff size;
   - false completion claims;
   - verification weakening;
   - speculative abstractions;
   - unrelated cleanup;
   - security/authority boundary violations;
   - regression rate;
   - time/tool cost.

A skill should be revised from repeated observed failures, not from a desire to add more rules.
