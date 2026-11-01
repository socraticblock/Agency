**Status:** CURRENT for 3.4.0-rc.1 — this audit is an input to the revision in this directory, not a score of it.

# Ambiguity audit — five reference files

The same audit over `references/testing.md`, `reliability.md`, `workspace-safety.md`, `boundary-correctness.md` and `self-review.md`.

Produced 2026-10-15 by a subagent working from a frozen copy of the package; the rule quotes are verbatim from that copy and the verdicts are judgmental, not measured. `CHANGES-V3.4-RC1.md` records which of these findings this revision acted on and which stay open.

## Scope

Audit of rhetorical satisfy-ability (rules an agent could meet in wording without behaviour change) for five reference files: `references/testing.md`, `references/reliability.md`, `references/workspace-safety.md`, `references/boundary-correctness.md`, `references/self-review.md`, under frozen base `/home/socraticblock/hermes-workspace/pragmatic-engineering/v3.4/base/`. Live skill tree treated read-only; no edits made there.

## Rules that can be satisfied rhetorically

### `references/self-review.md`

1. Rule: "Did I accidentally solve a larger or different problem?"
   Why: "accidentally" is post-hoc introspection no transcript can verify.
   Operational: show a diff stat and scope statement; any file outside the declared task scope requires a justification line.
   Verdict: REPLACE

2. Rule: "Is this the smallest sound design?"
   Why: "smallest" is self-measured from the author's scope bias.
   Operational: a list of the deleted/unchanged alternatives considered, each with the reason it is insufficient.
   Verdict: REPLACE

3. Rule: "Did I duplicate knowledge or introduce accidental coupling?"
   Why: "accidental coupling" is judgmental; ignored duplication passes by assertion.
   Operational: grep/dependency search output showing the duplicated symbol or cross-module edge, or "none found" with the search command recorded.
   Verdict: REPLACE

4. Rule: "Would my final wording imply stronger verification than I performed?"
   Why: a self-graded wording check; an over-strong claim can still be rated safe by the author.
   Operational: attach evidence-level labels E0-E5 to each reported result, matching `SKILL.md` definitions, and compare against the claim wording in the handoff.
   Verdict: REPLACE

5. Rule: "Are tests deterministic and readable?"
   Why: "readable" is a subjective aesthetic verdict.
   Operational: a repeated run shows identical results; a named reviewer or checklist confirms readability; otherwise KEEP as subjective and delete.
   Verdict: DELETE (cost: subjective aesthetics cannot be operationalized; retaining it invites tick-box review)

6. Rule: "Is failure bounded and diagnosable?"
   Why: "bounded" and "diagnosable" assessed by the author.
   Operational: a fault-injection showing the failure stops within a timeout and emits a defined error code/context; otherwise delete.
   Verdict: REPLACE

7. Rule: "Are names and comments truthful?"
   Why: "truthful" is self-judged; stale comments routinely survive.
   Operational: a comment-audit check showing each comment still matches its code after the change, or DELETE the subjective rule.
   Verdict: REPLACE (weakly; prefer automated rename/comment lint)

8. Rule: "Is any complexity justified by a real requirement?"
   Why: "real requirement" is self-claimed; speculative generality is hard to catch.
   Operational: link each non-trivial abstraction to an issue/requirement, or remove the abstraction and show behaviour equivalence.
   Verdict: REPLACE

9. Rule: "If the requested outcome is met and further work mainly improves aesthetic purity, speculative flexibility, or unrelated debt, stop."
   Why: "aesthetic purity"/"speculative flexibility" are motive judgments untestable from output.
   Operational: a stop-check line citing the concrete next item and why it is out of scope; otherwise the rule is advisory only.
   Verdict: REPLACE (or delete: advisory rules without brakes become checklist bloat)


### `references/boundary-correctness.md`

1. Rule: "For important values define, as applicable: unit and scale; valid range; ..."
   Why: "important" and "as applicable" let the author skip any or all dimensions silently.
   Operational: an explicit per-value checklist table with each dimension marked applicable/inapplicable and its enforcement location or "n/a: <reason>".
   Verdict: REPLACE

2. Rule: "Do not rely on a variable name such as `timeout`, `amount`, or `size` to communicate these contracts."
   Why: "rely on" is an internal judgment; the same named variable can ship with no type or documented unit.
   Operational: each such variable has a unit-typed wrapper/validated field/comment at declaration AND a test exercising a wrong-unit caller.
   Verdict: REPLACE

3. Rule: "Make unit conversions explicit and test boundary values."
   Why: "explicit" and "boundary values" are self-assessed; hidden implicit conversions pass.
   Operational: the diff shows conversion calls at every boundary and tests asserting min/max/overflow/underflow behavior.
   Verdict: REPLACE

4. Rule: "When identity or security depends on text: define encoding and normalization; ..."
   Why: "depends on" is classed by the author, so normalization can be skipped as "not security-relevant".
   Operational: code path plus test proving canonicalization and rejecting a non-normalized variant.
   Verdict: REPLACE

5. Rule: "Do not assume visually similar strings are semantically identical."
   Why: "assume" is a mental state; homoglyph-laden code can still treat strings as equal.
   Operational: an explicit confusable-string rejection test (e.g., non-ASCII homoglyphs, case variants) with expected unequal outcome.
   Verdict: REPLACE

6. Rule: "make the relevant portability assumptions explicit."
   Why: "explicit" is satisfied by prose; no required target run.
   Operational: either a CI run on the target OS/runtime/filesystem or a recorded "portability gap: <scenario, symptom, mitigation>".
   Verdict: REPLACE (the rule currently permits pure prose)

7. Rule: "Local success on one environment is not evidence that these semantics hold on another. Exercise the relevant target or state the portability gap..."
   Why: "relevant target" and "portability gap" are self-defined escape hatches.
   Operational: name the exact target exercised (version matrix) or the concrete gap message with trigger and consequence.
   Verdict: REPLACE

8. Rule: "Make dangerous or environment-selecting defaults explicit; do not silently fall into production-like behavior."
   Why: "dangerous" and "production-like" are self-assessed; the default can still silently select prod.
   Operational: a test instantiating config with no env var set asserts the selected environment name and that it is non-production.
   Verdict: REPLACE

9. Rule: "Prefer one authoritative source for each configuration fact."
   Why: "prefer" makes duplication admissible by assertion.
   Operational: grep showing exactly one read site for each configuration fact, or a documented second source with a stated synchronization mechanism.
   Verdict: REPLACE

10. Rule: "A cache is not the source of truth unless the architecture explicitly says otherwise."
    Why: "explicitly says otherwise" is satisfied by a sentence in prose with no code evidence.
    Operational: an architecture declaration (repo doc + code comment) plus a cache-flush test showing stale cache does not drive behaviour.
    Verdict: REPLACE (the hedge invites rhetorical confirmation)

11. Rule: "Never treat stale cached success as proof that the underlying write/read path is correct."
    Why: "treat as proof" is a claim about reasoning no transcript can audit.
    Operational: an invalidation test with the cache bypassed/bug added, verifying a fresh failure surfaces.
    Verdict: REPLACE

12. Rule: "Prefer streaming, batching, backpressure, or bounded concurrency when unbounded work can exhaust resources."
    Why: "prefer" plus "can exhaust" lets unbounded work ship with a post-hoc justification.
    Operational: a stress test with oversized input showing a limit enforced (rejected, bounded memory, or bounded time) before exhaustion.
    Verdict: REPLACE

13. Rule: "Do not equate 'received some data' with 'received a complete valid result.'"
    Why: "valid result" is judged by the author; truncated responses can still be consumed.
    Operational: a partial/truncated payload test asserting rejection or partial-failure propagation, not apparent success.
    Verdict: REPLACE

14. Rule: "When a protocol supplies retry guidance ..., honor those semantics where appropriate instead of applying a generic retry loop."
    Why: "where appropriate" lets a generic loop stand.
    Operational: a protocol-fixture test showing retry-after/idempotency/backpressure values are read and applied, or recorded reason for ignoring.
    Verdict: REPLACE

15. Rule: "Tests should be safe under reordering and parallel execution unless the suite explicitly serializes them."
    Why: "unless the suite explicitly serializes them" is a blanket self-exemption.
    Operational: an explicit serializer marker/config line, or a shuffle/parallel run showing green.
    Verdict: REPLACE

16. Rule: "Preserve or chain enough error context to explain..."
    Why: "enough error context" is self-assessed.
    Operational: an assertion that the reported error contains both operation name and cause chain text; a test injecting cleanup failure verifies this.
    Verdict: REPLACE


### `references/workspace-safety.md`

1. Rule: "Inspect relevant version-control status when available."
   Why: "relevant" and "when available" permit skipping status inspection with no evidence it was unavailable.
   Operational: transcript shows `git status --short` output captured before the first write, or a note that the directory is not git-controlled.
   Verdict: REPLACE

2. Rule: "Distinguish pre-existing changes from changes made by this task."
   Why: the distinction is internal; nothing records the prior baseline.
   Operational: save the pre-task status output, then a final diff that excludes baseline entries.
   Verdict: REPLACE

3. Rule: "If another change overlaps the same lines or files, understand it before editing around it."
   Why: "understand" is unobservable; an agent can claim understanding after a glance.
   Operational: the transcript shows the overlapping diff lines and an explicit decision (adopted/merged/deferred) recorded before the edit.
   Verdict: REPLACE

4. Rule: "Before writing through a path you did not create, determine where it resolves when links, mounts, generated mirrors, or workspace indirection may be involved."
   Why: "may be involved" is author-asserted, so symlinks are followed unchecked.
   Operational: a `readlink -f`/`realpath` command output showing the resolved target is inside the authorized workspace; out-of-workspace target requires explicit authority.
   Verdict: REPLACE

5. Rule: "If a file may have changed since you read it, re-read or verify its current version before writing."
   Why: "may have changed" is author-judged; stale in-memory copies can still be written.
   Operational: record the file mtime/hash at read and at write, or a fresh `read_file` immediately before `write_file`.
   Verdict: REPLACE

6. Rule: "Prefer task-scoped edits that compose with existing work."
   Why: "prefer" and "compose" are self-claimed quality labels.
   Operational: the diff is confined to task-relevant hunks plus a stated reason for each touched unrelated line.
   Verdict: REPLACE

7. Rule: "When a conflict exists, preserve both intents and resolve semantically."
   Why: "preserve both intents" cannot be audited from the resolution alone.
   Operational: commit message/conflict note names each original intent and the semantic merge outcome.
   Verdict: REPLACE

8. Rule: "Do not use destructive version-control operations merely to make the workspace easier to reason about."
   Why: "merely to" is motive-based and unfalsifiable.
   Operational: each destructive op requires a named authority and a recorded justification; absence reads as violation if seen in transcript.
   Verdict: REPLACE (motive clauses untestable)

9. Rule: "Do not kill, restart, reconfigure, or replace an unknown process merely because it occupies a port or resource."
   Why: "unknown" and "merely because" are self-judged motives.
   Operational: before any kill/restart, command output identifying ownership (pid, cmdline, cwd) is shown; port-blind kills are refused.
   Verdict: REPLACE

10. Rule: "Use the least consequential verification path that still provides the needed evidence."
    Why: "needed evidence" is defined by the agent itself, so expensive paths can be chosen path-of-least-resistance.
    Operational: state the verification goal and the chosen command; if a cheaper or read-only equivalent exists, use it first and show why it was insufficient.
    Verdict: REPLACE

11. Rule: "ensure evidence was gathered against the final code state"
    Why: "final code state" asserted with no hash/mtime binding.
    Operational: record the HEAD/commit hash and file mtimes at verification; if code changes after, mark evidence stale.
    Verdict: REPLACE

12. Rule: "state clearly if workspace concurrency prevented strong verification."
    Why: "clearly" is a prose requirement; a vague aside satisfies it.
    Operational: a explicit line "verification strength: <E0..E5>, limited by <concurrency condition>" in the report.
    Verdict: REPLACE


### `references/reliability.md`

1. Rule: "Prefer language/runtime constructs that make cleanup structural rather than optional."
   Why: "prefer" makes adherence optional and the construct choice self-assessed.
   Operational: the diff uses try/with/finally/scope guard for the resource; deleting it fails a named test that triggers an exception mid-operation.
   Verdict: REPLACE (or delete if no binary pass/fail check is supplied)

2. Rule: "Do not rely on a happy-path cleanup call after code that can throw, return early, cancel, or time out."
   Why: "rely on" is a judgment about control flow the author can assert without evidence.
   Operational: a unit test forcing throw/early-return/cancel/timeout plus a resource leak assertion (handle count returns 0).
   Verdict: REPLACE

3. Rule: "If cleanup itself fails, preserve the primary causal error and report the cleanup failure as additional context rather than masking the original failure."
   Why: "additional context" has no required shape; an agent can append the cleanup error nowhere and claim preserved.
   Operational: a test injecting cleanup failure shows the thrown/reported error equals the original primary error with the cleanup error attached (chained/cause).
   Verdict: REPLACE

4. Rule: "Use monotonic clocks for elapsed-duration measurement when available."
   Why: "when available" permits picking wall clock without recording why monotonic was unavailable.
   Operational: the code uses monotonic time call (`now - earlier` on a monotonic source) OR records the runtime/library constraint that made it unavailable.
   Verdict: REPLACE

5. Rule: "Do not solve a race by serializing the entire system unless that tradeoff is intentional and measured."
   Why: "intentional and measured" are self-attested; serializing everything remains acceptable by assertion.
   Operational: either a concurrency test documenting the tradeoff with before/after throughput, or "single-threaded by design: <ADR link>".
   Verdict: REPLACE

6. Rule: "Minimize critical sections"
   Why: no measure of size; a lock held across a blocking call can still be called minimized.
   Operational: a static review showing lock held only over shared-state mutation lines; a concurrent stress test demonstrates no fairness deadlock.
   Verdict: REPLACE

7. Rule: "Test the invariant or race-prone behavior with deterministic techniques where practical."
   Why: "where practical" lets race-prone code ship with no deterministic coverage.
   Operational: name the deterministic technique (controlled scheduler, thread barriers, model checking) and its test file, or record the concrete blocker.
   Verdict: REPLACE

8. Rule: "Remain bounded and must be safe for the operation." (retries)
   Why: "safe" and "bounded" are self-assessed; an unbounded nested retry can be called bounded.
   Operational: recorded max attempts, backoff schedule, and an idempotency proof (same final state on 1 vs N calls).
   Verdict: REPLACE

9. Rule: "Important failure paths should leave enough context to diagnose the problem without leaking secrets or sensitive data."
   Why: "enough context" and "sensitive data" are self-judged.
   Operational: a failure-injection test showing the logged/returned error contains operation + cause + identifier but no token/PII under a redaction scan.
   Verdict: REPLACE

10. Rule: "Distinguish expected business failures from system faults."
    Why: classification lives in the author's head; no artefact fixes it.
    Operational: a test or metric showing the two categories route to distinct error types/log levels; transcript cites a handled case for each.
    Verdict: REPLACE

11. Rule: "Deal with expiration/scheduling/deadline semantics deliberately."
    Why: "deliberately" is satisfied by any consideration narrative.
    Operational: either a clock-injection test covering expiry, or recorded TTL/clock/lease values and their enforcement point.
    Verdict: REPLACE (the bullet enables qualitative self-justification)

12. Rule: "Correctness includes behavior during partial failure."
    Why: an abstract slogan no check can falsify directly.
    Operational: a fault-injection test where a downstream fails mid-operation and the resulting state matches the documented partial-failure contract.
    Verdict: REPLACE


### `references/testing.md`

1. Rule: "Testing exists to provide useful confidence and enable safe change."
   Why: states a benefit the author can claim without having run or recorded any verification.
   Operational: the transcript shows the checks actually run (command, exit code) and the behavior they covered; absent that, the change is E0.
   Verdict: REPLACE (unverifiable purpose-claim gives no decision rule)

2. Rule: "Prefer tests that remain valid when internals are refactored without changing behavior."
   Why: "prefer" and "valid" are self-assessed, so a coupled suite can still be labelled robust.
   Operational: a pre-refactor and post-refactor run where the same named tests pass with zero test edits, or a listed edited-test justification.
   Verdict: REPLACE

3. Rule: "Prefer fast, deterministic, isolated tests for most logic."
   Why: "fast", "deterministic", "isolated" and "most" are all self-assessed adjectives.
   Operational: recorded wall-clock per suite, a repeated run showing identical results, and no shared-state dependency.
   Verdict: REPLACE

4. Rule: "Add broader integration or end-to-end tests where risk lives in the boundary between components or the real runtime."
   Why: "where risk lives" is author-defined, so missing broader tests are always justifiable.
   Operational: list the named boundary risks (serialization, auth, I/O, concurrency) and the integration/e2e test path added per risk, or "none added: <reason>".
   Verdict: REPLACE

5. Rule: "anchor at least one check to an independent source such as a specification example, ... when practical."
   Why: the "when practical" hedge lets anchoring be skipped without evidence it was impractical.
   Operational: name the independent source and its repo location, or record the concrete blocker that prevented anchoring.
   Verdict: REPLACE

6. Rule: "reproduce it deterministically if practical;"
   Why: the same "if practical" hedge makes reproduction optional by assertion.
   Operational: record the deterministic reproduction command and observed failure, or a dated blocker with error text.
   Verdict: REPLACE

7. Rule: "make the smallest root-cause fix;"
   Why: "smallest" is self-measured from the author's preferred scope.
   Operational: include the changed-file/hunk summary and a one-line justification per hunk showing why a narrower change fails.
   Verdict: REPLACE

8. Rule: "determine whether the product contract intentionally changed;"
   Why: an internal mental step leaves no artefact showing it happened.
   Operational: the change record states contract-changed: yes/no, with the contract source (issue, PR, changelog) or "no source, so reverted".
   Verdict: REPLACE

9. Rule: "When fixing a bug, see the new regression check fail on the old behavior when practical."
   Why: "when practical" permits skipping the fail-first demonstration while asserting the check detects it.
   Operational: show the test run against the pre-fix commit, its non-zero exit, and failure text, or record the concrete blocker.
   Verdict: REPLACE

10. Rule: "A strong test: describes one meaningful behavior"
    Why: "meaningful" is author-judged, so tautological tests can be called meaningful.
    Operational: the test name is a single behaviour sentence and the body exercises exactly one logical path with one observable outcome.
    Verdict: REPLACE

11. Rule: "Use when the important requirement is an invariant over a broad input space..."
    Why: "important requirement" is self-judged, so property tests are skippable without evidence.
    Operational: list the named invariant and the property-test path, or record why no invariant-based check applies.
    Verdict: REPLACE

12. Rule: "Make the generated domain representative: include meaningful boundaries, invalid/degenerate cases..."
    Why: "representative"/"meaningful" permit hand-waving about generator coverage.
    Operational: list the boundary and degenerate inputs the generator reaches (min/max/empty/null/overflow) plus at least one preserved failing seed.
    Verdict: REPLACE

13. Rule: "Never normalize unexplained flakiness."
    Why: "unexplained" is self-assessed; an agent can supply a plausible story post hoc.
    Operational: every intermittent failure has either a root-cause commit or a dated quarantine ticket with owner and removal plan.
    Verdict: REPLACE

14. Rule: "A test suite should not depend on execution order or leak state into later tests unless the test contract deliberately exercises shared state."
    Why: "unless the test contract deliberately exercises shared state" is a self-claimed exemption.
    Operational: a randomized/reversed-order rerun showing green plus teardown registered via fixture/using/try-finally.
    Verdict: REPLACE


## Already operational (keep verbatim)

These three are already operational because they require a concrete observable artefact; no change needed.

1. `references/testing.md` — "When the result matters, confirm that the intended checks actually ran and selected the changed behavior" (plus its bullet list of skipping/quarantining/caching checks). Operational: verifies specific phenomena (skipped/filtered/quarantined/no-op paths, cache provenance, stale artefacts) against the transcript.

2. `references/workspace-safety.md` — "inspect task-relevant status/diff; ensure unrelated pre-existing work is preserved; ensure no temporary destructive workaround remains; ensure evidence was gathered against the final code state" (Final workspace check). Operational: names concrete actions a reviewer can confirm from command output and diff.

3. `references/boundary-correctness.md` — "Validate required configuration early. ... Test missing, malformed, conflicting, and environment-specific values." (Configuration). Operational: four concrete input classes that must each have a test or a recorded result.


## Notes and INFERRED claims

- INFERRED: flagged rules were identified by reading the five reference files only; I did not run any tests or execute `validate_skill.py`. (The skill validator exists under `base/scripts/` but was not invoked for this audit.) Marked per brief: claims not executed or read first-hand are labelled INFERRED.
- INFERRED: counts below are my manual classification; no automated audit tool was used.
- Flagged count: `references/testing.md` 14, `references/reliability.md` 12, `references/workspace-safety.md` 12, `references/boundary-correctness.md` 16, `references/self-review.md` 9. Total flagged: 63.
- Verdicts in this file are advisory; no change was made to the live tree.
