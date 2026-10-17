# Pragmatic Engineering — 9/10 promotion protocol

**Status:** preregistration proposal, NOT an observed outcome, 2026-10-16.

See `ENGINEERING_QUALITY_RUBRIC_V1.md` and `QUALITY_EVAL_PILOT_V1.md` for independently graded code quality,
longitudinal repository health, and the runnable blinded-results pilot. These documents do not
modify the gate or establish empirical benefit by themselves.

## Release dimensions (do not average unverified dimensions into a flattering score)

**M1 Mechanical correctness.** A separate Linux account reproduces the final artifact's original false-PASS cases, all new raw-audit counterexamples, 50 gate cases (including permission test), and the independent concurrency/state suites. Legitimate nonnormalized, `text=auto`, custom filter, and linked-worktree tasks must pass. No observed critical false-PASS remains unresolved. Verify the exact ZIP digest and unmodified source bytes before running tests.

**M2 Threat-boundary truthfulness.** Explicit local-agent-controlled evidence limitation, dirty baselines, Git-ignored inputs, malicious external filter commands, symlink/TOCTOU, process escape, local hook bypass, Linux-only locking and resource constraints. Host-enforced CI and isolation required for independent policy enforcement.

**M3 Maintainability and utility.** A clean contributor can identify invariant checks, modify a rule and produce both negative and positive tests without tracing unrelated code. Measure baseline/check wall time and I/O for small (100 files), medium (2,000) and large (20,000) repositories. If overhead is unacceptable, implement a separate trusted file snapshot service or downgrade scope; do not silently cache by timestamp.

**M4 Independent outcome benefit.** A four-arm blinded, paired test: A no doctrine/no gate, B doctrine only, C gate only, D doctrine+gate. Use at least 12 pilot tasks to shake down the harness without claiming superiority; preregister a 60-task primary corpus and held-out confirmation with a different coding agent. Fix task starting commit, hidden grader, model/runtime/dependencies, time/tool/token budget, seed allocation, and graders before running. Randomize arm order by task and seed; grade final checkout correctness in isolation without treatment labels. Measure task-level success, severe defect escapes, unnecessary changes, user cost, time, tokens, and manual intervention. Analyze paired differences with task-family clustering and uncertainty intervals. A planning threshold of +5 percentage points is not evidence until measured. A non-improving gate may be excellent evidence governance but not a proven coding enhancer.

**M5 Independent clearance.** Two reviewers not responsible for the repair independently propose *new* bypasses and read the raw negative and positive controls. One executes on an unprivileged Linux account. Publish exact command lines, artifacts, environment, SHA-256, observed outcomes, and an unambiguous GO/NO-GO signed or CI-controlled verdict.

## Fail conditions

A reproduced false PASS on any documented mechanical obligation, state corruption leading to PASS, known verifier side effects after a deterministic refusal, manipulated grading harness, or missing candidate provenance blocks release. A broken user workflow cannot be waved away by only counting negative-test passes. Zero observed escapes is not proof of a zero true rate.

## Current v3.5.3-dev-review.9 status

M1 remains pending external verification. M2 documented but host controls not in scope. M3 performance characterization pending. M4 not conducted. M5 not conducted. Consequently the **whole skill cannot currently be assigned an evidence-backed 9/10**.
