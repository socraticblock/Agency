# Mode: Refactor

A refactor changes structure while preserving externally observable behavior.

1. Define the structural problem and why it impedes a real change or maintainability.
2. Establish behavioral evidence before moving structure. Add characterization tests when important behavior lacks protection.
3. Separate behavior change from structural change whenever practical.
4. Refactor in small coherent steps that keep the system working.
5. Prefer clearer responsibility boundaries over abstraction for its own sake.
6. Remove duplication only when it represents duplicated knowledge or responsibility.
7. Run focused checks after each meaningful step or batch.
8. Review public interfaces, data formats, timing, ordering, error semantics, and performance characteristics for accidental behavior changes.
9. Stop when the named structural problem is solved.

Do not use "refactor" to smuggle in feature changes, dependency swaps, broad renaming, or architecture replacement.

---

The four recorded obligations in `SKILL.md` — baseline, falsifier, completion record, procedure compliance —
apply in this mode. This file tells you what to do; the obligations tell you what to record while doing it.
