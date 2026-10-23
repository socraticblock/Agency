> **Status:** HISTORICAL INPUT — the independent audit of V3.2 that produced the patch set. Kept unedited for provenance; its verdicts describe V3.2 and the pre-correction candidate, not rc1.

# Independent Audit — Pragmatic Engineering V3.2

**Audit date:** 2026-10-07  
**Candidate audited:** shipped `pragmatic-engineering-v3.2` bundle  
**Patched successor produced by this audit:** `pragmatic-engineering-v3.3-audit-candidate`  
**Auditor stance:** independent skill auditor, senior software engineer, adversarial evaluator, and agent-safety reviewer.

## Executive verdict

V3.2 is a **strong engineering doctrine**, not a production-grade demonstrated agent behavior system.

It already does unusually well on the fundamentals that matter most: smallest-sound-change discipline, anti-overengineering, debugging from evidence, behavior-focused tests, explicit authority boundaries, generated/source-of-truth discipline, partial-failure semantics, numeric/text/config/cache boundaries, proportionality, and stopping behavior.

The audit nevertheless found material weaknesses that a real autonomous coding agent could exploit accidentally:

1. the structural validator could return `VALID` for a broken routed reference in `SKILL.md`;
2. workspace-safety routing was circular: the reference said to load for every version-controlled edit, while the root routed it only after the agent already knew the workspace was dirty/concurrent/unfamiliar;
3. the evidence ladder could be misread as an ordinal confidence score, allowing a high-environment but non-discriminating check to inflate confidence;
4. testing doctrine did not explicitly verify that a green command actually ran the intended checks, nor protect strongly enough against self-consistent but wrong test oracles;
5. distributed-system semantics were weaker than the rest of the reliability layer: replica visibility, ACK-vs-durability, lease fencing, ambiguous commits, and idempotency-key scope were under-specified;
6. cross-platform OS/filesystem/runtime differences were not an explicit boundary class;
7. existing templates were packaged but unreachable through progressive-disclosure routes;
8. deep doctrine contained two scope/completion tensions (`Refactor continuously`; `A broken test means unfinished work`) that could conflict with the root's more precise scope and pre-existing-failure policy;
9. a second post-patch holdout exposed four more general gaps: transaction isolation/write-skew, weak property-test generators, inherited host capabilities/handles, and migration lock/rewrite availability cost.

The proposed V3.3 candidate patches those defects without turning the root into a handbook. `SKILL.md` remains 97 lines and grows only from 825 to 873 words; the detailed additions stay in routed references.

**Classification:**

- **Original V3.2:** **Strong**.
- **Patched V3.3 audit candidate:** **Production candidate**.
- **Not yet production grade or exceptional**, because this audit could not run a truly independent coding model across repository tasks and traces. Written doctrine coverage is not the same thing as independently demonstrated behavior.

## What was actually tested

### Complete package inspection

Read and reviewed:

- `SKILL.md`;
- every mode under `references/modes/`;
- authority, workspace, reliability, boundary, repository-truth, testing, decision, self-review, and pragmatic-principles doctrine;
- all four templates;
- validator source;
- the existing 1–80 behavioral/regression eval set;
- research and historical V3/V3.1/V3.2 test reports.

### Structural/runtime-routing checks

- front matter and description inspected;
- every root routed reference resolved;
- recursive reachability graph built from `SKILL.md`;
- original V3.2 runtime graph reached 17/21 reference/template documents; the four templates were unreachable;
- patched candidate reaches 21/21 runtime documents;
- original and patched validators executed;
- validator was adversarially probed with an intentionally broken backticked route.

### Hidden suite

A 30-case suite was created only after reading the shipped evals. It deliberately targeted gaps not explicitly enumerated in the existing 1–80 suite.

- **V3.2 before patch:** **38/60** explicit decision-path coverage.
- **Final candidate on same regression suite:** **60/60**.

The 60/60 is not treated as independent behavior proof; it means every discovered case now has an explicit, correctly routed decision path.

### Second post-patch holdout

A new 12-case holdout was created after the first patch set to check for overfitting.

- **First patch set:** **19/24**.
- **Final candidate:** **24/24**.

The holdout newly exposed transaction-isolation/write-skew, property-generator quality, privileged local execution, inherited open handles, and migration availability/locking concerns. These became regressions 16–19.

## Structural audit

### Passes

The package has a clean top-level skill structure. The YAML front matter is concise and the description is strong enough to communicate both task class and value: repository-level build/debug/refactor/review/design work where correctness, changeability, verification, and maintainability matter.

Progressive disclosure is conceptually sound. The root contains the core behavioral constitution and routes specialized doctrine rather than embedding every security, database, concurrency, or testing rule in the always-loaded prompt. This matches current OpenAI guidance that a multi-workflow skill root should act as a minimal router so irrelevant guidance does not consume context.

The original root is compact for the breadth of the skill: 97 lines, 825 words. The candidate remains 97 lines, 873 words.

Modes are generally well separated and correctly scoped. Build, debug, review, refactor, architecture, security, performance, and automation do not duplicate the full root policy.

### Structural failure: validator did not validate the routing syntax actually used

`SKILL.md` routes references as inline backticked paths, for example `references/testing.md`. The original validator checked Markdown links plus a hard-coded required-file list. Therefore a typo in the actual route could survive validation if the expected file still existed at its old name.

This was reproduced mechanically:

1. copy V3.2;
2. change the route from `references/testing.md` to `references/testing-NOT-THERE.md`;
3. leave the real `references/testing.md` file present;
4. run the original validator.

**Observed result: `VALID`, exit 0.**

The patched validator traverses and checks the live progressive-disclosure graph from `SKILL.md`, so reports/evals may safely quote invalid examples. The same injected defect in the live root route now produces:

`INVALID - broken routed reference in SKILL.md: references/testing-NOT-THERE.md`

with nonzero exit status.

### Structural failure: unreachable templates

All four templates were valid and useful but unreachable from the runtime instruction graph:

- architecture decision;
- debug record;
- engineering handoff;
- change review.

A model following progressive disclosure is specifically told not to scan the entire package, so unreferenced assets are effectively dead. The candidate routes each template only from its relevant mode or self-review document; none were added to the root.

### Conceptual contradiction: workspace-safety routing

`references/workspace-safety.md` begins: “Use whenever an agent edits a version-controlled workspace.” But original `SKILL.md` routed it only for dirty worktrees, concurrent edits/agents, local processes, or unfamiliar commands.

That is circular: status inspection and safe handling are how the agent discovers some of those conditions. The candidate routes workspace safety for **any version-controlled workspace edit**, while retaining the more detailed triggers as examples.

### Conceptual contradiction: completion and scope in deep doctrine

Two deep principles were too absolute relative to the root:

- `Refactor continuously` could encourage nearby cleanup after the requested outcome is complete.
- `A broken test means unfinished work` conflicted with the root's correct policy of separating caused, pre-existing, and unknown failures without silently expanding scope.

The candidate narrows both statements to the actual change and relevant verification.

## Adversarial behavioral findings

### Evidence model

This was the most important conceptual defect.

E0–E5 are useful labels for **execution proximity**: unverified → static → focused → integrated → target environment → operational. But the original prose could imply that E4 is inherently stronger evidence than E2 for any claim.

That is false. A target-environment `/health` check may be nearly irrelevant to “all migrated rows satisfy invariant X,” while a focused deterministic query or regression can directly falsify that claim.

The candidate therefore keeps E0–E5 but explicitly states that evidence level is not confidence by itself. Evidence must also be judged on:

- relevance to the claim;
- freshness;
- completeness;
- ability to falsify the claim.

This is a material improvement because it prevents **evidence inflation without discarding the useful ladder**.

### Green command is not proof

The original testing doctrine strongly rejected weakened assertions and unexplained flakiness, but did not explicitly force the agent to validate the verifier itself.

Fresh attacks included:

- exit 0 with zero relevant tests collected;
- relevant subsystem tests silently skipped;
- cached result whose key omitted a changed input;
- per-item failures hidden under overall success;
- artifact/runtime not corresponding to the final source;
- automatic retries turning instability into a green result.

The candidate adds a compact `Validate the verifier` section. It does not mandate exhaustive testing; it checks whether the selected evidence is real.

### Self-consistent but wrong tests

Round-trip/property/snapshot/generated-expected tests can be internally consistent while violating an external contract. Example: encoder and decoder share the same milliseconds/seconds bug, so round-trip passes.

The candidate now asks for at least one independent anchor where the contract matters: spec vector, known answer, legacy fixture, cross-implementation result, or separately derived invariant.

A second holdout caught another issue: a property test can run thousands of cases while its generator never produces the failure class. The candidate now treats generator reach/distribution as part of the evidence.

### Workspace and authority

V3.2 was already strong against destructive Git cleanup, unknown process killing, live-service test commands, install hooks, force-push/merge/deploy, and destructive migrations.

Fresh failures were more subtle:

- an unrelated human change is already staged and the agent commits it accidentally;
- a path inside the repo is a symlink to an external file;
- a commit/build/test hook crosses a deployment/spend boundary;
- repository code inherits broad production credentials merely because the parent shell has them;
- a “local” test container mounts a host container-daemon socket or broad host filesystem;
- a child inherits already-open secret handles/sockets even if environment variables are scrubbed.

The candidate adds narrow safeguards for staging/index preservation, resolved write targets, hidden hooks/plugins, privileged host capabilities, and ambient inherited authority.

### Distributed reliability

The original reliability reference covered retries, timeouts, cancellation, idempotency, concurrency, resource lifetime, and partial writes well. It was weaker on distributed visibility/ownership semantics.

Fresh cases included:

- primary write accepted, replica read stale, caller retries a non-idempotent side effect;
- message ACK occurs before durable work, then process crashes;
- lease expires and stale worker can still write because there is no fencing token/version check;
- idempotency key collides across tenants/resources;
- timeout after commit leaves an ambiguous outcome and blind retry duplicates work.

The candidate now distinguishes durable acceptance from visibility, defines ACK relative to durable completion, scopes deduplication keys, requires stale-owner rejection where necessary, and preserves ambiguous commit state rather than inventing success/failure.

The second holdout also found a database-specific but general reliability gap: **a transaction is not equivalent to serializability**. The candidate now requires isolation/locking/conflict semantics when concurrent transactions can violate a business invariant through write skew or lost updates.

### Migration correctness vs migration operability

V3.2 already required migration/rollback, mixed-version operation, and old/new paths. A new holdout asked a different question: what if the migration is logically correct but locks or rewrites a large production table long enough to cause an outage?

The candidate adds lock duration, rewrite/backfill load, real data volume, and online/chunked/staged migration technique to architecture mode.

### Cross-platform behavior

V3.2's boundary doctrine was excellent on units, precision, Unicode, config, caches, protocol completeness, and resource limits, but it did not name operating-system/runtime/filesystem semantics.

Fresh failures included:

- case-only rename behaving differently on case-insensitive filesystems;
- executable bit/permissions masked by the development platform;
- path separators and shell quoting differing across targets;
- architecture/runtime/toolchain differences.

The candidate adds a routed environment/OS boundary section and explicitly says local success on one platform is not evidence for another when the distinction matters.

## Principle-conflict audit

| Conflict | Verdict | Why |
|---|---|---|
| DRY vs decoupling | Pass | Decision policy explicitly distinguishes duplicated text from duplicated knowledge. |
| Abstraction vs clarity | Pass | Requires observed need; repetition can be cheaper than a wrong abstraction. |
| Refactoring vs scope | Pass after patch | Root was already strong; deep principle 65 is now scope-aware. |
| Consistency vs improving a bad local pattern | Pass | Match local conventions unless incorrect/unsafe. |
| Testing depth vs delivery speed | Pass | Cheapest falsifying check first; broaden by risk. |
| Security vs usability | Pass with judgment required | Security outranks convenience, but threat-oriented/least-privilege doctrine avoids blanket hardening. |
| Robustness vs complexity | Pass | Correctness/failure semantics outrank simplicity, while speculative mechanisms are rejected. |
| Performance vs maintainability | Pass | Requires target, baseline, bottleneck, comparable measurement, and evidence for added complexity. |
| Backward compatibility vs cleanup | Pass | Compatibility is treated as a product/operational constraint; cleanup cannot silently override it. |
| Automation vs authority | Strong pass | Capability is explicitly separated from permission; agent loops need bounded action surfaces and human gates. |
| Simplicity vs explicit failure handling | Pass | Failure visibility/data integrity have higher priority than aesthetic minimalism. |

The priority order in `decision-policy.md` is one of the skill's strongest pieces. It resolves real conflicts without turning the skill into rigid rules.

## Proportionality audit

V3.2 passes this area strongly.

Tiny tasks do not require architecture review by default. The root says to inspect only what is needed, use the cheapest falsifying check, and stop once the requested outcome is adequately verified. The existing typo scenario and fresh typo/guard-clause cases both score 2/2.

Major changes receive stronger requirements because additional references are routed by the actual risk: schema/API → architecture; concurrency/partial writes → reliability; security-sensitive work → security; numeric/config/protocol → boundary correctness.

The candidate does make one deliberate tradeoff: `workspace-safety.md` is now loaded for all version-controlled edits. That adds roughly 700 words to normal repository-change context, but this is justified because status/index/write-target/command-side-effect safety must be established before the agent can know the workspace is safe. The root itself did not grow materially.

## Authority/autonomy attack results

The skill strongly distinguishes **capability from authority**. It does not treat a tool, credential, or command name as permission.

Explicitly protected consequential actions include push/merge, deploy/publish, production/cloud state, CI/CD/access policy, persistent migrations, destructive data changes, shared-history rewriting, unknown process termination, secrets, broad network access, paid services, external messages, and legal/security risk acceptance.

The candidate strengthens this further by treating hidden hooks/plugins and inherited host authority as part of the action surface.

This is aligned with current coding-agent safety practice: sandbox boundaries, approvals, constrained network access, identity/credential controls, and telemetry are separate technical controls rather than things a prompt alone can guarantee.

## Weighted scorecard

This score measures **skill/doctrine design quality**, not independently observed model success.

| Dimension | Weight | V3.2 | Patched candidate |
|---|---:|---:|---:|
| Pragmatic engineering judgment | 6 | 5.5 | 5.7 |
| Correctness discipline | 6 | 5.3 | 5.6 |
| Simplicity | 4 | 4.0 | 3.9 |
| Changeability | 4 | 3.8 | 3.9 |
| Debugging quality | 5 | 4.8 | 4.8 |
| Testing quality | 6 | 4.8 | 5.6 |
| Architecture judgment | 5 | 4.7 | 4.8 |
| Security | 6 | 5.2 | 5.6 |
| Reliability | 6 | 4.8 | 5.6 |
| Boundary/data correctness | 5 | 4.3 | 4.8 |
| Workspace safety | 6 | 4.0 | 5.6 |
| Authority control | 6 | 5.4 | 5.7 |
| Evidence discipline | 7 | 5.0 | 6.3 |
| Autonomous-agent safety | 6 | 4.5 | 5.5 |
| Proportionality | 5 | 4.8 | 4.8 |
| Clarity | 3 | 2.8 | 2.8 |
| Progressive disclosure | 4 | 3.2 | 3.8 |
| Stopping behavior | 4 | 3.8 | 3.9 |
| Usefulness for real coding work | 6 | 5.4 | 5.7 |
| **Total** | **100** | **86.1** | **94.4** |

The slight simplicity cost after patch is intentional: the candidate adds narrowly routed rules for real failures rather than pretending those failure modes do not exist.

## Exact changes made

The original V3.2 directory was preserved untouched. Changes were made only in the separate V3.3 audit candidate.

### `SKILL.md`

- clarify evidence level vs evidential quality;
- route workspace safety for any version-controlled edit.

### `references/testing.md`

- add verifier validation: selected checks, skips/no-ops, cache/retry provenance, partial success, final artifact/source binding;
- add independent-oracle guidance for round-trip/snapshot/generated expected values;
- add property-generator reach/distribution guidance.

### `references/workspace-safety.md`

- protect external targets reached through symlinks/path indirection;
- preserve staging/index state and inspect staged diff before commit;
- treat hooks/plugins/setup as command action surface;
- avoid leaking ambient production/cloud/host authority to repository code;
- include inherited handles/sockets and privileged host capabilities.

### `references/reliability.md`

- add distributed visibility, delivery, lease/fencing, idempotency-key scope, and ambiguous commit semantics;
- add transaction isolation/write-skew/lost-update guidance.

### `references/boundary-correctness.md`

- add OS/runtime/filesystem/shell/toolchain portability boundary.

### `references/repository-truth.md`

- define how to handle disagreement between docs, generator metadata, build config, artifacts, and observed build behavior.

### `references/modes/architect.md`

- add migration lock/rewrite/backfill/availability analysis;
- route the existing architecture template.

### `references/modes/debug.md`, `review.md`, `self-review.md`

- route the existing debug/review/handoff templates only when those artifacts are useful.

### `references/pragmatic-principles.md`

- make continuous refactoring explicitly scope-aware;
- make “broken test means unfinished” apply to relevant verification while still requiring known unrelated failures to be visible.

### `scripts/validate_skill.py`

- validate backticked routed local Markdown paths by traversing the live graph from `SKILL.md`, in addition to Markdown links and hard-coded required files;
- require the new independent regression eval file.

### `evals/independent-v3.3-regressions.md`

- add 20 regressions for the independently discovered weaknesses, including a validator-scope regression discovered during final verification.

## Verification performed after patch

- original V3.2 validator: PASS on untouched V3.2;
- candidate validator: PASS;
- intentionally broken live routed reference: candidate validator correctly FAILS with nonzero exit;
- deliberately broken path quoted only in audit prose: candidate validator correctly remains valid;
- all original root routes resolve;
- recursive runtime reachability: candidate 21/21 references/templates reachable;
- 100-principle invariant remains valid;
- fresh 30-case hidden suite: 60/60 doctrine coverage;
- post-patch 12-case holdout: 24/24 doctrine coverage after the second narrow patch;
- root remains 97 lines and under 900 words;
- original V3.2 is kept separate rather than overwritten.

## What remains unproven

This is the line that matters most.

**I have not independently demonstrated that an arbitrary coding agent will follow this skill reliably in real repositories.**

This environment did not provide a separate coding-model execution harness that could install the skill, run fresh agent instances against repositories, record full traces, and compare outcomes with/without the skill. Using this same auditor/model to reason through scenarios is not independent behavioral validation.

Therefore the following remain unproven:

- skill trigger precision/recall on realistic user prompts;
- whether agents reliably route to the right deep reference rather than ignoring it;
- whether rules survive long multi-step tasks and context pressure;
- whether different model families/versions obey the authority boundary consistently;
- actual command/tool behavior under dirty repositories and concurrent actors;
- net effect on bug-fix success, regressions, command count, token use, and completion time;
- whether the added workspace reference produces any measurable over-caution on ordinary tasks;
- whether rare failure modes still cause instruction drop-off under real execution.

Current OpenAI guidance for skill evaluation explicitly treats an eval as **prompt → captured agent run/trace + artifacts → checks → score**, and recommends checking outcomes, process/tool use, efficiency, trigger behavior, and sandbox/permission regressions. That is the missing evidence needed to advance this from production candidate to production grade.

## Recommended independent behavior benchmark

Before calling the skill production grade, run a true agent benchmark with at least these properties:

1. **Three conditions:** no skill baseline, original V3.2, patched candidate.
2. **Fresh repositories/scenarios:** do not use only the 99 accumulated regression cases.
3. **Positive and negative triggering:** explicit invocation, realistic implicit invocation, and adjacent tasks where the skill should not trigger.
4. **Multiple runs per stochastic scenario:** enough to measure reliability, not one lucky trace.
5. **Trace grading:** commands, files touched, permission escalation, destructive actions, tests actually selected, retries, and stop behavior.
6. **Artifact grading:** final diff, tests, compatibility, generated outputs, documentation, and residual workspace state.
7. **Hard safety gates:** unauthorized deploy/push/production mutation, secret leakage, unrelated-work destruction, evidence inflation.
8. **Efficiency measures:** command count, repeated reads, full-suite abuse, token/context cost, and unnecessary process.
9. **Repository diversity:** legacy code, monorepo, generated client, async service, database migration, frontend, cross-platform package, and dirty shared checkout.
10. **Holdout reserve:** keep a meaningful subset unseen until the candidate is frozen.

Only then should “the skill produces excellent pragmatic engineering behavior” be stated as an empirical result rather than a doctrine claim.

## Final verdict

V3.2 is **not perfect**, and this audit found defects worth fixing. That is a positive sign for the evaluation process: the skill had not exhausted the problem space.

The patched candidate is materially stronger than V3.2 without becoming an always-loaded encyclopedia. Its written doctrine is now exceptionally comprehensive for pragmatic coding-agent work, and the validation/routing story is better aligned with the way the skill actually works.

I would ship the patched artifact to a controlled independent agent eval as a **production candidate**.

I would **not** yet label it production grade or exceptional in the behavioral sense. The remaining missing evidence is not more prose. It is independent, trace-backed coding-agent execution.
