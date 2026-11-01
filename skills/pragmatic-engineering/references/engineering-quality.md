# Engineering quality: improve the repository, not the report

**Use for consequential, multi-file, architectural, or repeated maintenance tasks.** For a tiny safe fix,
apply the same tests of judgment without producing a lengthy rubric. Owner instructions and repository
standards take precedence (see `core-rules.md`).

## Before writing

- Define the observable outcome, failure behavior and preservation invariant.
- Find the authoritative implementation and its neighboring conventions. Identify which existing module owns
  the behavior and which public contract may change.
- Note likely maintenance hazards: duplicate logic, overly broad interface, new dependency, global state,
  error suppression, partial writes or uncontrolled resource use.
- Choose the smallest solution that can be verified; explain an abstraction only when a real repeated need
  or contract justifies it. Do not refactor surrounding code simply to make a feature look elegant.

## After writing — five checks

1. **Correctness:** prove requested behavior and relevant negative/boundary behavior at the observable edge.
   Missing/unverified paths remain explicit; avoid false confidence from exit code or mock-only tests.
2. **Maintainability:** can a newcomer trace the implementation and modify it without reading unrelated modules?
   Prefer small coherent units, clear names and straightforward control flow; don't reward line-count reduction alone.
3. **Architecture:** does ownership remain in the right layer? Avoid hidden coupling, cross-layer imports,
   leaking infrastructure details into domain logic, and multiple sources of truth.
4. **Testing:** could tests fail for the intended bug? Preserve independent assertions; cover failures and
   regression behavior proportionally; don't delete or weaken checks to manufacture green.
5. **Scope and security:** identify every changed file and external effect; preserve authorization and data
   boundaries; add no dependency, permission or external operation without demonstrable need.

## Artifact and release pipelines

When the change crosses discovery → capture → scan → export → verify, review the full
lifecycle rather than optimizing each helper in isolation. Apply `artifact-lifecycle.md`
only when such an artifact exists. Reconcile what was promised, omitted and actually
shipped; make each exclusion visible at the severity its contract warrants.
A privacy-safe omission can still be a reliability defect when the operator is told the
candidate is complete. Do not repair that defect by forbidding intentional removals
unless the product contract explicitly requires refusal.

## Future-maintainer question

Imagine another agent must extend this feature after ten successive changes. What will now be easier or harder?
If the change introduces a cost (coupling, migration, state, complexity), record why it was worth it and what
would falsify that decision. A gate PASS cannot answer this question.

## Evidence and stop rule

State the verified behavior and remaining uncertainty, mention consequential trade-offs, and stop when the
requirement is satisfied and sufficiently checked. Avoid boilerplate quality scores in ordinary task reports.
For a controlled independent evaluation use `../evals/ENGINEERING_QUALITY_RUBRIC_V1.md`, not the local gate
as a proxy for final software correctness.

## Proportionate verification work

Do not bypass repository-mandated CI, security, publication or release gates. Where a local checkout
is available, consequential security/authorization/data-integrity changes justify the full executable
falsification protocol when feasible. For truly low-risk nonbehavioral edits, narrow source/diff checks
may be proportionate if the repository allows them; report that the full gate did not run. Keep cost
separate from correctness: additional recorded steps are not evidence of better final code.
