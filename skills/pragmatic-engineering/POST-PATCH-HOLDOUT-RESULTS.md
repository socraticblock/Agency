> **Status:** HISTORICAL INPUT — the 12-case holdout scored against the pre-correction candidate. Not re-scored for rc1.

# Post-Patch Holdout — V3.3 Audit Candidate

This second holdout was created only after the first V3.2 patch set and its 30-case regression suite were complete. It exists to reduce the chance that the candidate merely overfit the first hidden suite.

Scoring again measures explicit written decision-path coverage, not independent-model behavior.

**After first patch set:** 19/24.  
**After second narrow patch set:** 24/24.

| # | New holdout case | First patch | Final candidate | Finding |
|---:|---|---:|---:|---|
| 1 | Two DB transactions commit a write-skew invariant violation under non-serializable isolation | 1/2 | 2/2 | “Use a transaction” was insufficient; final reliability doctrine requires isolation/locking/conflict semantics. |
| 2 | Property test runs thousands of cases but generator cannot produce the failing Unicode/domain class | 1/2 | 2/2 | Final testing doctrine treats generator reach/distribution as part of the evidence. |
| 3 | Local test runner mounts the host container-daemon socket and therefore has host-level control | 1/2 | 2/2 | Final workspace doctrine recognizes privileged host capabilities as consequential side effects. |
| 4 | Child test process inherits an already-open secret file descriptor/handle even after env vars are scrubbed | 1/2 | 2/2 | Final workspace doctrine covers inherited handles/sockets as ambient authority. |
| 5 | API returns HTTP 202 Accepted but asynchronous job later fails | 2/2 | 2/2 | Existing protocol completeness/terminal-state rules already prevent treating acceptance as completion. |
| 6 | Pagination silently processes only the first page while HTTP status remains successful | 2/2 | 2/2 | Existing protocol completeness rules cover incomplete results. |
| 7 | Correct schema migration takes a long blocking table lock at production data volume | 1/2 | 2/2 | Final architecture mode requires lock/rewrite/backfill/availability analysis. |
| 8 | CI from an untrusted PR has a write-capable production token | 2/2 | 2/2 | Existing trust-boundary/least-privilege/CI authority rules cover it. |
| 9 | Canary looks healthy but samples only one low-volume shard while other shards corrupt data | 2/2 | 2/2 | Final evidence rule requires completeness/relevance; environment level alone is insufficient. |
| 10 | Request cancellation returns to caller while background task continues mutating state | 2/2 | 2/2 | Existing cancellation/resource-lifetime doctrine covers it. |
| 11 | Build plugin is fetched from a mutable/untrusted source despite reproducible source code | 2/2 | 2/2 | Dependency trust/pinning and generated-artifact provenance cover it. |
| 12 | Network timeout after commit makes outcome ambiguous; blind retry could duplicate the effect | 2/2 | 2/2 | Final distributed reliability doctrine explicitly preserves ambiguous commit state and requires a recovery rule. |

## Interpretation

The second wave found four genuinely general gaps plus one migration-operability gap after the first patch. Those were patched at the narrow routed layers and converted into regression evals 16–19. This improves confidence that the final candidate is not merely a textual response to the first hidden suite, but it still does not substitute for an independent model/repository benchmark.
