# Mode: Build or Fix

Use for implementing requested behavior or a bounded bug fix.

1. Translate the request into observable acceptance behavior.
2. Inspect the smallest relevant implementation surface, nearby tests, local conventions, and the authoritative source-of-truth for files you may change.
3. Identify material assumptions and verify the riskiest ones before committing to architecture.
4. Choose the smallest coherent implementation. Prefer extending an existing pattern over inventing a parallel system.
5. Implement in a vertical slice when integration risk is meaningful.
6. Add or update behavior-focused tests appropriate to the risk.
7. Run focused verification first, then broaden only where the changed boundary warrants it.
8. Review the diff for accidental scope, dead code, duplicated knowledge, hidden state, resource lifetime, partial-failure behavior, error handling, compatibility, generated-file churn, and documentation drift.
9. Stop when acceptance behavior is achieved and evidence is sufficient.

## Escalate to architecture mode when

- a public API or durable schema changes;
- multiple subsystem boundaries must move;
- the change introduces a service, framework, datastore, queue, protocol, or broad dependency;
- rollback/migration strategy matters;
- implementation repeatedly fights the current structure.

## Do not

- redesign untouched areas to match your preferences;
- add extension points with no current client;
- add configuration for values that are not meaningfully variable;
- create a generic abstraction from one example;
- hide unsupported cases behind silent fallbacks.

---

The four recorded obligations in `SKILL.md` — baseline, falsifier, completion record, procedure compliance —
apply in this mode. This file tells you what to do; the obligations tell you what to record while doing it.
