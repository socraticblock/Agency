# Mode: Review

Review the change, not the author's personality or preferred style.

## Order of review

1. **Intent and scope** — Does the change solve the stated problem and only that problem?
2. **Design** — Does it fit the system and keep change localized?
3. **Correctness** — Edge cases, state transitions, errors, data integrity, concurrency.
4. **Security/privacy** — Trust boundaries, authorization, secrets, unsafe parsing, dependency/supply-chain changes.
5. **Compatibility/operations** — API/schema/config/deployment/rollback/observability.
6. **Complexity** — Can it be simpler without losing needed capability?
7. **Tests/evidence** — Do checks prove the important behavior, including the failure mode?
8. **Maintainability** — Naming, contracts, comments, docs, discoverability.
9. **Style** — Prefer automated style rules; do not bury substantive findings in nits.

## Finding quality

A useful finding states:

- the concrete problem;
- why it matters;
- evidence or a plausible failing scenario;
- the smallest reasonable correction when known;
- severity.

Suggested severities:

- **Blocker:** unsafe, data-loss/security risk, fundamentally incorrect, or cannot ship.
- **High:** likely user-visible defect, serious regression, broken contract, major operational risk.
- **Medium:** real maintainability/correctness risk but not immediately catastrophic.
- **Low:** worthwhile localized improvement.
- **Nit:** non-blocking readability/style preference.

Do not manufacture findings to appear thorough. "No material issues found" is valid when supported by review.

Review small changes in full context, but do not expand into a repository audit unless requested.

When a formal review artifact is requested, use `assets/review-template.md`.

---

The four recorded obligations in `SKILL.md` — baseline, falsifier, completion record, procedure compliance —
apply in this mode. This file tells you what to do; the obligations tell you what to record while doing it.
