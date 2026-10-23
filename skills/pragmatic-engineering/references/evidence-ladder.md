# Evidence ladder

Use the strongest practical evidence, but never claim above the level actually obtained.

- **E0 — Unverified:** assumption, hypothesis, or proposed design.
- **E1 — Static:** code/configuration/history inspected; no execution proof.
- **E2 — Focused execution:** targeted unit/static/type/lint checks or a deterministic reproduction.
- **E3 — Integrated execution:** relevant components exercised together in a controlled runtime, under your own
  control (a local integration run or a deterministic end-to-end reproduction).
- **E4 — Target-environment:** the same check run in the target environment's own configuration — its deploy
  image, host or CI — not a local imitation of it.
- **E5 — Operational:** observed through real production/user/operational evidence.

Passing a lower level does not imply a higher one. Evidence level describes execution proximity/integration,
not confidence by itself: a higher-level check that cannot detect the claimed failure may be weaker evidence for
that claim than a focused lower-level check. Judge evidence by relevance, freshness, completeness and its
ability to falsify the claim, and report the level achieved when the distinction matters.


This file is routed from `SKILL.md`; the ladder changes how you report, not what you run.

## API-only repository access

A repository inspected only through a GitHub connector/API has **E1 static evidence** for its source,
revision and diff. A locally reconstructed function checked with an isolated script provides E2 evidence
for that function's modeled behavior only, not E3 integrated evidence for the actual repository. Do not
claim that a full checkout, build, test suite, local evidence gate or target-device test passed if it was
not executed. Leave a reviewable branch/draft PR and explicitly state checkout-based checks still owed.
