# Mode: Architecture / API / Schema

Architecture is a set of tradeoffs under uncertainty.

1. Define the outcome, constraints, expected lifetime, scale, failure cost, and likely change axes.
2. Identify the decisions that are expensive to reverse.
3. Separate facts from forecasts.
4. Generate at least two credible options when the decision is consequential.
5. Compare them on simplicity, coupling, data ownership, operability, security, migration, rollback, performance requirements, and future change.
6. Prefer the simplest option that satisfies current constraints while keeping expensive future choices reversible.
7. Prototype or tracer-bullet the riskiest assumption before building the full system.
8. Make contracts explicit: inputs, outputs, invariants, ownership, failure semantics, compatibility, and versioning.
9. Record why the decision exists, not just what it is.
10. Revisit decisions when their underlying forces change.

## API design

- Optimize for correct use and clear contracts.
- Avoid exposing implementation details.
- Prefer stable domain concepts over temporary storage/UI structures.
- Make invalid states difficult to represent where practical.
- For durable/public values, make units, range, precision/rounding, encoding/normalization, ordering, and missing-value semantics explicit when they matter.
- Treat backward compatibility as a product/operational constraint, not an afterthought.

## Data/schema changes

- Define migration and rollback or forward-fix strategy.
- Consider mixed-version operation during rollout.
- Preserve old readers/writers when necessary.
- Make destructive migration steps explicit and separately authorized.
- Test representative old and new data paths.
- Assess lock duration, table/data rewrite cost, backfill load, and service availability for the real data volume; use online/chunked/staged migration techniques when required by the operational constraint.

## Architecture smell

Reconsider if the proposal requires explaining many abstractions before explaining the user outcome.

When a durable architecture decision record is useful, use `assets/architecture-decision-template.md` rather than inventing a heavier format.

---

The four recorded obligations in `SKILL.md` — baseline, falsifier, completion record, procedure compliance —
apply in this mode. This file tells you what to do; the obligations tell you what to record while doing it.
