# v3.5.3-dev-review.9 — raw working-tree audit experiment

**2026-10-16. Experimental candidate, not a stable release or 9/10 attestation.**

## Engineering change

The predecessor used Git status/diff as the sole authority for detecting scope and candidate changes. Git filters and line-ending canonicalization can make unauthorized raw working-tree modifications disappear, including after `git add`. Blanket refusal of `text=auto` and filters repaired the false PASS but made common repositories incompatible.

This candidate records an independent **raw tracked worktree inventory at baseline**. Each tracked filename is represented by its exact filesystem-name bytes encoded as hex; its digest includes file type, executable identity, symlink spelling and raw byte contents. During falsification and check, the gate rescans tracked files and treats any byte difference from the baseline as a change even if Git reports the file clean. Existing Git audit and untracked-file checks remain in place. Checks before and after live verifier execution catch a verifier changing a tracked file outside scope. The candidate fingerprint also includes raw changes that Git diff misses. The published file count includes those raw changes; a hidden normalized change cannot be presented as zero diff.

If Git normalization hides a raw change from Git numstat, the exact added-line count is **unknown**. The gate refuses without a recorded `--budget-note`, rather than pretending the unknown is zero. The Git-visible added-line count remains explicitly labeled as partial. A correctly declared in-scope task with normalization can proceed with an explicit budget explanation.

New baselines support ordinary `text=auto`, `core.autocrlf` and Git clean/smudge filter configurations where the raw inventory remains complete. They do **not** certify that the baseline contained no pre-existing canonicalization-hidden raw edits. A baseline is an observed reference state, not independent authorization or a reconstruction of the Git object's pre-smudge working-tree bytes.

Legacy baseline files **without** `raw_tracked` retain the predecessor's restrictive filter audit; they are not silently migrated. To adopt raw auditing, begin a new baseline and repeat falsifier evidence. There is no authenticated baseline or sandbox; a hostile actor with write access to the state folder or executable Git configurations is outside this assurance boundary.

## Checks added or changed

- Eight `tests_dev_review9.py` cases: staged CRLF invisibility, staged custom clean-filter invisibility, untouched filtered repository, passing legitimate `text=auto` refactor, corrupted raw manifest refusal, mode change, an authorized CRLF-only candidate with a budget note, and a verifier hiding an unauthorized normalized change during `check`.
- Early refusal of any preexisting out-of-scope raw/porcelain changes before `falsify` launches a verifier.
- Corrupted raw manifest returns a state-validation diagnostic before a Git visibility diagnostic.
- Three obsolete v3.5.3-dev-review.7 expectations rewritten as distinct compatibility/scope tests; the historical original is preserved in the evidence package for comparison.
- Accurate file-count reporting and explicit unknown-line labeling for normalization-hidden raw changes.

## Boundaries and observed overhead

The current implementation performs full content hashing of tracked files at baseline, during evidence recording and during check. This creates O(tracked worktree bytes) I/O overhead and can make very large repositories expensive. No performance gain or large-monorepo scalability claim is made. Git-ignored untracked files are not a general-purpose filesystem inventory; declare verification inputs explicitly. Git filters and commands may themselves have side effects; the gate is not a sandbox. Host/CI-enforced authority remains necessary.

## Promotion

GO for an independent Hermes challenge of this *mechanical candidate*. **NO-GO for stable or a 9/10 entire-skill rating.** The preregistered paired agent-outcome benchmark has not been run; source correctness alone does not show improved coding outcomes. See `evals/NINE_OF_TEN_PROMOTION_PROTOCOL.md`.

- The duplicate-phase and parent-crash control tests retain their lock semantics: their control markers are placed under Git metadata so unrelated out-of-scope effects cannot mask the specific finding. Duplicate and in-flight preflight diagnostics precede general scope diagnostics; both refuse before launch.

- The historical root-level oracle-mutation test now asserts refusal at the `after` phase preflight, rather than expecting an unauthorized checker edit to be recorded and diagnosed later. Its security property is preserved.
