**Status:** CURRENT EXPERIMENTAL — NO-GO stable / not a measured 9/10 or 10/10

# v3.5.3-dev-review.3 — post-Hermes verification hardening

**Base:** exact source archive `pragmatic-engineering-v3.5.3-dev-review.2-source.zip` (SHA-256 `ffb1239ad15d5fcc4d2e0c241a50c060f7cd2ccdbd9aa4eac634595e75511ce2`). The change manifest in the accompanying handoff contains a self-contained patch against this exact ZIP.

## Repairs and independent negative controls

1. **V2-1 (Hermes):** take the existing per-label execution lease before the live rerun inside `check`; concurrent checks and simultaneous falsify/check no longer both launch a command. Tests cover three simultaneous checks and check/falsify contention.
2. **V2-2 (Hermes):** refuse symbolic links and non-regular lock paths using `O_NOFOLLOW` + `fstat`; the cooperative Linux filesystem lock cannot be silently redirected through a symlink.
3. **NEW crash race:** a killed `check` parent released its lease while the live verifier was still running. The next check could execute the same command and PASS concurrently. Pass the lease descriptor to the verifier process, as `falsify` already does. Independent reproduction had two executions before the repair, one after; targeted process-crash test added.
4. **NEW false PASS:** `git update-index --assume-unchanged` concealed a tracked unauthorized edit from `git status`, `git diff`, and the candidate fingerprint. The scope audit returned PASS. A `skip-worktree` flag has the same problem. At `check` preflight and again after live verification, inspect `git ls-files -v -z` and refuse if any tracked path is not a normal visible `H` entry. This intentionally refuses sparse-checkout repositories pending a distinct audit model. Positive normal-index tests remain green.
5. **NEW check-time flag mutation:** a verifier can itself enable assume-unchanged and change an unauthorized tracked file between the initial index audit and the final Git scope check. A second audit after reruns now refuses this, rather than certifying hidden edits.
6. **Audit failure handling:** a failed NUL-delimited Git status must never silently become an empty changed-file set; report a controlled `gate.audit-failed` instead of treating it as zero modifications. A failed `diff_stats` likewise refuses rather than throwing an unexpected traceback.

## Scope / boundaries

This is a cooperative **local Linux** mechanical gate, not a semantic oracle, sandbox, protected CI, or authenticated human authorization. It does not protect against a process with arbitrary access to Git metadata or `.git/pe-gate` that intentionally bypasses these routines. Ignored files are not currently included in the scope inventory. Verifiers may have external side effects; serialize what can be serialized but favor side-effect-free check commands.

A local green suite and Hermes's independent verification do **not** establish real coding-outcome improvement. Stable promotion and any 9/10 or 10/10 rating remain blocked on adversarial reproduction and the preregistered behavioral benchmark with independent grading.
