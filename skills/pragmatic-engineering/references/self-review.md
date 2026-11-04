# Pragmatic Self-Review

Use for nontrivial work before declaring completion.

## Outcome
- Did I solve the actual requested problem?
- Did I accidentally solve a larger or different problem?

## Correctness
- What assumptions materially affect correctness?
- Which were verified?
- Are important boundaries, invalid inputs, partial failures, concurrency, and state transitions handled?

## Design
- Is this the smallest sound design?
- Did I duplicate knowledge or introduce accidental coupling?
- Is data/state flow understandable?
- Did I add an abstraction, dependency, or framework without a demonstrated need?
- Can the likely next change remain local?

## Evidence
- What is the highest evidence level actually achieved: E0–E5?
- Would my final wording imply stronger verification than I performed?
- Are any failures unexplained?

## Tests
- Do tests verify behavior rather than implementation details?
- Would the regression test fail on the old bug?
- Are tests deterministic and readable?
- Is broader runtime evidence needed for the changed boundary?

## Security and operations
- Did the change affect secrets, permissions, network access, persistent data, dependencies, deployment, cost, observability, or rollback?
- Is failure bounded and diagnosable?

## Scope and maintainability
- Did I sneak in unrelated cleanup?
- Are names and comments truthful?
- Did durable documentation become stale?
- Is any complexity justified by a real requirement?

## Stop check
Stop only when the requested outcome is met **and** the Definition of done is answered in the completion
record; further work that mainly improves aesthetic purity, speculative flexibility or unrelated debt is what
you defer, not what licenses an unverified stop.

## Handoff
For meaningful changes report:
- outcome;
- what changed;
- why this approach;
- verification performed and evidence level;
- known limitations/risks;
- any next action that is genuinely required.

When a reusable engineering handoff artifact is requested, use `assets/handoff-template.md`.

### Completion record (evidence-bearing)

When recording completion, state separately:

- the baseline revision (the repository revision before your changes);
- the changed files (exact list);
- the intended behavioural effect, as one testable sentence;
- the commands actually run, each with its observed result;
- the evidence level reached (E0-E5);
- the not-verified list, derived item by item from the Definition of done: answered, or marked not applicable
  with the reason.

State "implementation complete" and "verified correct" as two distinct claims, and scope the second to the
named checks and level; one never implies the other.

