# v3.5.3-dev-review.11 — Engineering Quality Evaluation v2

**Status:** experimental evaluation readiness, NOT 9/10 validation or a coding-agent outcome study.

## Source changes

- Preserve the exact first-line objective and four engineering commitments; `scripts/pe_gate.py` is byte-identical to dev-review.10.
- Repair a grader-blinding weakness: `prepare` now requires distinct `--private-out` and `--blind-out` folders (the old `--out` option has been intentionally removed; migration documented).
- Bind analysis to the original frozen manifest when supplied, rejecting manipulated but internally balanced task allocations.
- Validate an independent runtime sidecar for instrumented tokens, time, cost, tool calls and human interventions. Keep these treatment-correlated observations away from blind graders.
- Track cost per independently passing run, separately from correctness and critical escapes.
- Add 9 new regression tests for allocation integrity, provenance separation, nonfinite cost and CLI refusal, in addition to 11 existing tests. The controlled-analysis CLI requires both manifest and runtime; analysis avoids mutating blinded scorecards and refuses agent-model drift.

## Controlled-pilot fixtures (separate artifacts, NOT installed with the skill)

- 12 independently versioned small Python tasks in a safe agent-only archive.
- Hidden positive/negative tests and digests in a grader-only archive; reference solutions and calibration logs in a separate owner-only archive.
- A cumulative three-stage inventory maintenance scenario for sequential changeability.
- Every defective starter was executed and failed/timed out; every reference solution passed its hidden contract (fixtures only).
- No real coding-agent run or blinded quality grade has occurred. No externally enforced sandbox is present.

## Open requirements

- Independent review of graders and corpus realism, run-order contamination and cost instrumentation.
- Agent execution under frozen versions and equal budgets, then human blinded maintainability review.
- Multiple languages, realistic established repositories, sequential independent-run sampling, a confirmatory holdout and statistical uncertainty before claiming improvement.
- Full mechanical gate suite unchanged but not rerun in this evaluation-only revision.
