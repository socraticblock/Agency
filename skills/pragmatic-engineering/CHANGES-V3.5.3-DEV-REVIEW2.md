**Status:** CURRENT EXPERIMENTAL — independently test before promotion

# Post-Hermes follow-up v3.5.3-dev-review.2

Base: the independently reviewed post-Hermes overlay, not the official v3.5.2 release.

## Implemented

- Replace manually expiring, unlinkable O_EXCL writer locks with kernel-backed Linux `flock`; no stale lock stealing, no split-brain lock inodes.
- Per-label execution lease covers validation, subprocess execution, counterexample recording and JSON update. Concurrent attempts on the same label (including other phases and explicit replacement) refuse **before** command side effects. Different labels remain concurrent.
- Pass lease descriptor to verifier child, preserving lock ownership if the gate parent is killed mid-run, until the verifier finishes or closes its descriptor.
- Run verifiers in process groups and kill the group on timeout; bound pipe draining when detached children keep streams open. Detached subprocesses can still escape; no sandbox or external privilege guarantee.
- Write JSON state through same-directory temporary files, `fsync`, atomic `os.replace`, and directory `fsync` to avoid truncated live files on process interruption.
- Revalidate state and baseline under the evidence write lock after running a command. Refuse if the baseline changed mid-run.
- Refuse `check` PASS when evidence state changes during its verification reruns.
- Add independent concurrency/crash/durability suite with simultaneous writers, SIGKILL, aged and dead locks, atomic replace fault injection, subprocess timeouts, and check-time races.

## Boundaries and release status

Linux local filesystem tested only; advisory locking and state files are agent-controllable. The lock does not serialize edits to actual repository files made outside the gate, and the gate is not a semantic oracle. No independent blind agent-outcome improvement measurements, host isolation attestation, or second-environment reproduction exists. Remains **NO-GO stable / not 10/10** until Hermes independently attacks this exact build and full outcome evaluations are executed.
