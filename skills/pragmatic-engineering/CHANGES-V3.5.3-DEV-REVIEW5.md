**Status:** EXPERIMENTAL — NO-GO for stable or 9/10–10/10 general skill claim.

# v3.5.3-dev-review.5 — Git checkout identity binding

**Predecessor:** exact v3.5.3-dev-review.4 source ZIP.
**Trigger:** Hermes independent adversarial report `PE353_DEV_REVIEW4_HERMES_EVIDENCE.zip`.

## Confirmed defect

Repo-local `git config core.worktree /path/to/clean` redirected the entire Git audit to an unrelated clean clone. `check` returned PASS with a clean diff even though an unauthorized file had been modified in the invocation directory. Environment-level redirection could produce the same mismatch.

## Fix

- Resolve the nearest physical `.git` marker independently of Git's configured worktree.
- Require Git's reported worktree root and actual git-dir to match that marker.
- Validate ordinary `.git/` directories and `gitdir:` pointers used by linked worktrees/submodules.
- Refuse mismatches with `gate.workspace-identity` before touching evidence or running verifier commands. Revalidate after each live verifier and after `check` reruns because the verifier may change Git configuration during execution.
- Route the `state_dir` Git metadata lookup through argv-only internal Git execution.

## Positive and negative cases

Eleven new `tests_dev_review5.py` tests cover a configured alternate worktree, post-evidence changes, a parent-directory redirect, `GIT_WORK_TREE`, `GIT_DIR`, no-marker injection, ordinary subdirectory invocation, a real linked worktree, an explicit no-VCS claim, a verifier redirecting Git while `check` is executing, and a verifier redirecting Git during phase recording (which must not publish that phase). The predecessor is preserved separately as a negative control.

## Limits

This is a cooperative Linux checkout audit, not a malicious-host defense. Ignored untracked paths, hostile filters, external verification side effects, and unbounded stdout/stderr memory remain outside the gate's mechanical guarantee. Blind model-outcome evaluation has not been conducted.
