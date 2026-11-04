# Pilot treatment contract — freeze before running agents

**Status:** experiment specification only; zero real agent runs have been executed.

## Shared, equal context

Provide all arms the identical frozen Git task checkout, `TASK.md`, coding-agent model and revision, tool permissions, dependency availability, run budget, deadline and standard *neutral* operating instructions (inspect the repo, implement the requested change, test appropriately, stop). Use no preexisting auto-activated engineering skill in the A and C environments. Do not give any arm hidden tests, reference solutions, grading rubric, private treatment allocations, or scores. Do not tune instruction wordings after observing results.

| Arm | Doctrine visible? | Gate installed/enforced? | Purpose |
|---|---|---|---|
| A | No | No | Default coding-agent control |
| B | Yes, only first-line objective, four commitments, five expectations | No | Instruction effect |
| C | No | Yes, minimal neutral CLI instructions | Gate/workflow effect; imperfect isolation acknowledged |
| D | Yes, full SKILL.md and reachable references | Yes | Combined effect |

Exact B text must be extracted into a frozen standalone file before the first run and SHA-256 recorded. The C arm must receive only enough information to use the required gate commands and solve tool errors; any workflow teaching it necessarily receives is a confound to disclose. D must get the exact frozen installable skill and its hash. A must not accidentally inherit the same standards as an ambient system prompt. Do not let the implementing agent see the scoring rubric.

## Isolation and accounting

- Generate and protect private allocation via `quality_eval.py prepare --private-out ... --blind-out ...`; do not place either file in an agent workspace.
- Every `case_id` executes in its own clean copy of the assigned task's starting Git commit. Never reuse a prior arm's mutable checkout.
- Apply the treatment in a trusted orchestration layer, not by a user-controlled file in the repository.
- Hold task instruction, model version, tools, runtime container, CPU/memory quotas and token limits constant within task. Randomize run order and seeds; collect actual prompt/output tokens, duration, tool calls, retries, interventions and failures, including incomplete runs.
- Independent grader obtains only anonymized final working-tree snapshot and hidden tests; graders must not see agent transcripts, gate PASS or token usage. Expert architectural reviewers grade without knowing arm identity or evidence volume.
- Preserve final candidate snapshot digest and exact commit or working-tree content identity. Grade final state, not the agent's report.
- Prevent test leakage; run code only in a separately isolated execution environment. `grade_candidate.py` is a local convenience runner, **not** a sandbox.

## Scoring hierarchy

1. Primary: independent behavioral contract (including negative cases), at the final code state.
2. Safety: report severe security/integrity/unauthorized-effect escapes separately; never compensate them with rubric points.
3. Maintenance: blind reviewer assesses maintainability, architecture, tests and scope/security using `ENGINEERING_QUALITY_RUBRIC_V1.md` with task-specific evidence and calibration.
4. Efficiency: instrumented verified-success cost, tokens, wall clock, tool calls and overengineering on low-risk tasks.
5. Longitudinal: separate multi-stage inventory trial using per-stage cumulative tests. Never use a stage's reference solution as the next stage's candidate; continue from **that agent's actual prior stage**. Lost context/failed stage remains a failure rather than replacing it with an oracle implementation.

## Valid promotion language

The provided small Python fixtures can validate allocation, grading and core failure-detection sensitivity. They do **not** constitute a representative cross-language benchmark or a preregistered confirmatory holdout. Pilot analysis is descriptive only; do not report a significance test, fabricated confidence interval, or 9/10 effectiveness rating. Freeze a new independent real-repository corpus after using pilot findings to repair the workflow.
