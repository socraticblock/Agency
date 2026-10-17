**Status:** EXPERIMENTAL — NO-GO stable; awaiting independent Hermes retest

# v3.5.3-dev-review.4 — candidate identification, Git audit, state shell-safety

**Predecessor:** exact v3.5.3-dev-review.3 source ZIP (SHA-256 recorded in companion manifest).

## Reproduced failures and repairs

1. **Permission-change false PASS:** `git config core.filemode=false` concealed a tracked out-of-scope executable-bit change. The old gate returned PASS after a legitimate refactor. Every internal Git audit now explicitly forces `core.filemode=true`.
2. **Casefold false PASS:** `core.ignorecase=true` on a case-sensitive Linux filesystem concealed a new out-of-scope `foo` when `Foo` was tracked. Audit Git invocations force `core.ignorecase=false`. Filesystem monitor cache shortcuts are disabled with `core.fsmonitor=false`.
3. **Persisted-state shell injection:** replacing `baseline.json` revision with `HEAD; touch ATTACK_SIDE_EFFECT; #` caused the old `check` to execute `touch` via a shell-interpolated Git diff. Validation now requires a full Git object id (or the declared NO-VCS marker), and comparisons run with literal argv rather than `shell=True`. This prevents the observed side effect even if state validation is accidentally loosened.
4. **Symlink fingerprint collision:** changing tracked symlink spelling from `b` to `./b` when both resolved to identical bytes gave the same candidate hash. The identity now includes literal target spelling, executable bits, type, and file bytes. A broken symlink is reported as a problem rather than misclassified as an absent file.
5. **Unbounded/non-regular input read:** direct `Path.read_bytes()` would block on a FIFO with no writer and allocate memory for an entire regular file. Candidate hashing refuses non-regular inputs and streams in bounded chunks.

## Validation & limits

The accompanying `tests_dev_review4.py` provides passing positive workflows and direct before/after repro cases; the full suite results and exact source manifest live in the evidence package. Do not describe the package as a 9/10 or 10/10 general-purpose coding skill without independent blinded outcome evidence. This implementation remains a cooperative Linux local-filesystem gate, not a security sandbox or an authenticated attestation.
