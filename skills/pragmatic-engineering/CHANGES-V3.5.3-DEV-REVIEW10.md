# v3.5.3-dev-review.10 — Engineering Quality Foundation v1

**Status:** experimental; no stable promotion, no controlled agent-outcome evidence yet.

## Intent

Make an AI coding agent consistently deliver correct, maintainable, secure, well-structured code while preventing unnecessary complexity and long-term codebase deterioration.

## Changes from dev-review.9

- Set that objective as the first prose sentence an agent sees after the YAML frontmatter in `SKILL.md`.
- Keep the four commitments and gate semantics; add a concise five-dimension quality contract to the entrypoint.
- Add `references/engineering-quality.md` with proportional engineering standards and a future-maintainer check.
- Add an independent evaluation rubric, a pilot protocol and a standard-library blinded allocation/paired-outcome summarizer (`evals/quality_eval.py`) with unit tests. The pilot manifest is an **illustration only**, not a real frozen study.
- Update release index and link the already-existing 9/10 promotion protocol to these evaluation documents.

## Evidence/limitations

The new evaluator's unit tests check **schema, allocation balance, treatment-label separation, missing records, invalid values, and descriptive task-paired arithmetic**. They do not run a coding agent, independently grade a patch, authenticate a grader, generate confidence intervals, or prove code-quality benefit.

No change is made to `scripts/pe_gate.py`, historical release evidence or the gate's assurance boundaries. Existing behavioral benefit remains unproven; the candidate is not 9/10 or stable.
