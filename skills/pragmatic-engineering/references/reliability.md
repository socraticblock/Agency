# Reliability and Failure Semantics

Use when code manages concurrency, resources, retries, timeouts, cancellation, persistent writes, long-running processes, queues/jobs, or multi-step operations.

Correctness includes behavior during partial failure.

## Resource lifetime

- Make ownership of files, sockets, locks, transactions, streams, processes, subscriptions, handles, temporary artifacts, and other resources explicit.
- Acquire as late as practical and release on every exit path.
- If cleanup itself fails, preserve the primary causal error and report the cleanup failure as additional context rather than masking the original failure.
- Prefer language/runtime constructs that make cleanup structural rather than optional.
- Do not rely on a happy-path cleanup call after code that can throw, return early, cancel, or time out.

## Partial writes and atomicity

For multi-step persistent changes, define what happens if execution stops between steps.

Prefer, as appropriate:

- a transaction;
- an atomic replace/write;
- an idempotent operation;
- an explicit state machine;
- compensating action;
- resumable progress with durable checkpoints.

Never imply "all-or-nothing" behavior unless the storage/runtime mechanism actually provides it.

A transaction does not automatically serialize concurrent business invariants. Know the relevant isolation/locking/conflict semantics; when concurrent transactions can observe and update overlapping facts, verify that the chosen mechanism prevents lost updates, write skew, stale-version writes, or other invariant violations.

## Idempotency

Operations that may be retried, resumed, redelivered, or invoked twice should define duplicate behavior deliberately. A retry should not silently duplicate money movement, messages, records, side effects, or destructive work.

## Retries and timeouts

Retries are a failure policy, not a generic fix.

Before retrying, determine:

- whether the failure is plausibly transient;
- whether the operation is safe to repeat;
- maximum attempts/time budget;
- backoff/jitter where relevant;
- how final failure becomes visible.

Bound timeouts and retries. Avoid retry storms and nested retry multiplication.

## Cancellation

Long-running operations should propagate cancellation where supported, release resources, and avoid publishing partial success as complete.

## Concurrency

When state can be accessed concurrently:

- identify the shared state and ownership model;
- make synchronization explicit;
- minimize critical sections;
- bound concurrency/fan-out when workload or input can grow without a hard upper limit;
- avoid holding locks across unknown or blocking external calls where possible;
- consider deadlock, starvation, lost updates, duplicate work, ordering, and visibility;
- test the invariant or race-prone behavior with deterministic techniques where practical.

Do not solve a race by serializing the entire system unless that tradeoff is intentional and measured.


## Distributed visibility, delivery, and leases

When correctness spans processes, nodes, replicas, queues, or services, make the consistency and ownership assumptions explicit.

- Distinguish durable acceptance from later visibility. A successful write acknowledgement does not necessarily imply immediate read-after-write visibility on replicas or caches.
- Decide which reads require fresh/authoritative state and which may tolerate staleness; do not diagnose replica lag as write failure or retry a side effect merely because a stale read did not observe it yet.
- For message/work delivery, define when acknowledgement occurs relative to the durable side effect. Acknowledging before durable completion can lose work; acknowledging after completion can produce duplicates unless the effect is idempotent.
- Scope idempotency/deduplication keys to the actual operation and authority domain (for example tenant/resource/version) so unrelated requests cannot collide.
- Time-limited leases alone do not prevent an expired worker from acting. When stale owners could corrupt state, use fencing/version checks or another mechanism that rejects obsolete writers.
- Treat network partitions and ambiguous timeouts as uncertainty: do not convert "unknown whether it committed" into either success or a blind replay without a recovery rule.

## Time

Treat wall-clock time, monotonic duration, timezone, clock skew, expiration, and scheduling semantics deliberately. Use monotonic clocks for elapsed-duration measurement when available.

## Observability

Important failure paths should leave enough context to diagnose the problem without leaking secrets or sensitive data. Preserve causal error context. Distinguish expected business failures from system faults.

## Reliability review

Before finishing, ask:

- Can this operation run twice?
- Can it stop halfway?
- Can two copies run at once?
- Can the dependency hang?
- Can the caller cancel?
- Are acquired resources always released?
- Will a final failure be visible and attributable?
