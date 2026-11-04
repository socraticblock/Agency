# Engineering Quality Evaluation v1 — operational pilot

**Status:** executable scaffolding and experimental design, not a completed experiment.

**Research question:** Does the four-commitment Pragmatic Engineering skill (and separately its gate) increase independently verified software correctness *and* preserve repository quality, at an acceptable cost?

## Treatment arms

- **A:** No doctrine, no gate.
- **B:** Doctrine only (same task, budget and model; no gate).
- **C:** Gate only with minimum neutral usage instructions (document any unavoidable workflow instruction contamination).
- **D:** Full doctrine plus gate.

Do not modify the treatment materials, hidden tests or task definitions once the pilot starts. Pilot results debug methodology; do not use them to claim product efficacy or tune and then re-use them as an untouched confirmatory holdout.

## Initial 12-task pilot

Use 12 *real*, independently specified tasks, sampled across bugfixes, small features, refactors, security boundaries, data integrity, truncated input, and documentation/compatibility. Include at least two small low-risk changes so overengineering is visible. Use two seeds per task/arm: 12 × 4 × 2 = **96 agent runs**. The harness does not run agents itself; it creates randomized blinded IDs and summarizes externally generated outcomes.

Freeze per task: ID, family, risk, owner-approved instruction, starting repository SHA, acceptance contract, hidden tests and grader SHA. Capture actual runtime, tool calls, tokens, model version, retries and final candidate SHA. Use separate repository copies per run; do not allow agent workspace access to hidden graders or private allocation.

## Tool commands (Python 3.11+, standard library)

Create a JSON manifest matching `fixtures/pilot_manifest_example.json` and replace illustrative tasks with real task IDs and immutable starting revisions:

```sh
python3 evals/quality_eval.py prepare --manifest private_graders/manifest.json \
  --private-out results/private-allocation --blind-out results/independent-grader
# NEVER expose the private allocation to the coding agents OR graders.
# Share only blind_cases.json and the grading environment with the independent grader.
# Freeze completed objective grader results in scores.json, and instrumented execution
# records (model, tokens, calls, cost and time) in a PRIVATE runtime.json.
python3 evals/quality_eval.py analyze \
  --manifest private_graders/manifest.json \
  --allocation results/private-allocation/private_allocation.json \
  --scores scores.json --runtime runtime.json --out analysis.json
python3 -m unittest discover -s evals -p 'test_quality_eval*.py'

```

Do not run `analyze` before the blinded grading record is frozen. The script cannot enforce organizational separation. Results reflect **grader-supplied inputs**; it does not independently inspect code or execute hidden tests.

## Schema for scorecards

```json
{
  "schema_version": 1,
  "results": [
    {
      "case_id": "a blinded ID provided by prepare",
      "tests_passed": true,
      "critical_escape": false,
      "quality": {"maintainability": 3, "architecture": 3, "testing": 3, "scope_security": 3},
      "unintended_changes": 0,
      "grader_evidence": "independent-grader-log-reference",
      "final_tree_sha256": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      "wall_seconds": 120.0,
      "tokens": 13000,
      "cost_usd": 0.25
    }
  ]
}
```

When providing --runtime, keep `wall_seconds`, `tokens` and `cost_usd` OUT of `scores.json`; they must come from a separate private runner sidecar with fields `case_id`, `wall_seconds`, `tokens`, `cost_usd`, `tool_calls`, `manual_interventions`, `runner_evidence`, and `model_version`. The tool refuses missing/extra runtime records and mismatched manifest IDs. Legacy score-only descriptive analysis remains supported for reproducing older results but is not the controlled pilot workflow.

A scorecard must contain exactly one result per allocated run. Do not include arm identity or copied treatment notes. The tool rejects missing, duplicate, unknown or ill-typed outcomes and refuses to treat missing costs as zero. Quality metrics are **secondary** to independently verified correctness and serious escapes. Summaries are descriptive task-paired comparisons, not confidence intervals or proof of significance.

## Acceptance and next step

Inspect harness failures, task ambiguity, grading disagreement and budget equality after the pilot. Freeze a corrected **new** corpus for the preregistered 60-task primary study and a separate untouched holdout for a second model. The installed skill is not 9/10 merely because the pilot harness runs.

## Calibrated task packs (dev-review.11)

Distribute `PE_ENGINEERING_QUALITY_PILOT_AGENT_TASKS.zip` ONLY to implementers. The separate `PE_ENGINEERING_QUALITY_PILOT_PRIVATE_GRADERS.zip` contains private grader tests and hashes but NO reference solutions. The separate owner-only calibration archive contains known reference solutions and fixture-calibration evidence. NEVER put private tests or references in an agent workspace. The twelve tasks are small single-language calibration probes; the three-stage inventory maintenance sequence is a separate longitudinal exercise. No agent-performance comparison has been executed. This fixture pack must not be treated as a confirmatory holdout after distribution.
