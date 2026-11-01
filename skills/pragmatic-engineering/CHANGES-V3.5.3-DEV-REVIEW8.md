# v3.5.3-dev-review.8 — verifier preflight and post-live scope audit

**Status:** experimental, local mechanical assurance only.

## Demonstrated predecessor defect

In dev-review.7, `check` ran its stored shell verifier even with an unanswered Definition-of-Done or an already out-of-scope file. A test that increments an external counter on each invocation recorded an extra invocation despite a REFUSED verdict. Dev-review.8 skips live execution when static preflight already refuses.

## Changes

- Evaluate static class/state/DoD/scope/budget requirements before any recorded verifier is launched.
- Preflight all labels' candidate and verification-input bindings and phase ordering before any live re-execution.
- Audit scope and budget again after live verifiers: an untracked outside-scope path created by a verifier is not part of the candidate fingerprint.
- Add executable adversarial tests, including legitimate refactor success.
- Migrate the existing concurrent-mid-check test control markers into `.git/`; its previous untracked, out-of-scope marker is correctly refused at the new preflight. The test continues to verify mid-check evidence-state mutation instead of unintentionally testing scope refusal.
- Remove a pre-existing out-of-scope file from the `dev-review5` mid-check worktree-redirection test; otherwise the new preflight correctly refuses the scope breach before the verifier can exercise the intended attack.

## Limits and promotion

Verifiers still execute with user privileges; not a sandbox. Git-ignored untracked content is not exhaustively inventoried. Local checks do not establish semantics or independent authorization. Full frozen-ZIP suites, Linux non-root permissions, independent adversarial review, and controlled coding-outcome evaluation remain required before stable promotion.
