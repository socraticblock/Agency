# v3.5.3-dev-review.12 — real-repository learning, not a certification

**Status:** current experimental skill. **Stable promotion:** NO-GO.
**2026-10-16**

## Observed motivation

A read-only review of the private Socraticblock Astro repository found a publication metadata checker that
returned the first `approvalStatus` key from a note and ignored a later contradictory declaration. A
separate narrow draft PR proposes refusing duplicates. Isolated Node controls demonstrated the prior
function behavior and the revised function's behavior. The full website tests are not yet executed.

This is a field pilot of engineering **judgment**, not a randomized no-skill-versus-skill experiment.
The website has an older installed skill (v3.3), and the review used this candidate's principles
explicitly. A successful PR therefore cannot prove this skill caused an improvement.

## New, evidence-based guidance

- `references/boundary-correctness.md`: authority-bearing duplicate declarations and agreement with
  the actual downstream parser/consumer. Do not invent first/last-wins rules.
- `SKILL.md` routes remote-only evidence limits to `references/evidence-ladder.md`, preserving progressive
  disclosure; E1 source/diff inspections are not E3 integrated test results. A focused reconstruction
  supports only its tested behavior. Name unexecuted gate/build steps.
- `SKILL.md` routes proportionate verification details to `references/engineering-quality.md`; do not bypass mandatory repository checks or confuse evidence volume with correctness. A controlled surrogate bugfix required baseline + three falsification phases + six completion answers + record/check for a six-line change. This is workflow observation, not an effect-size estimate.
- No changes to the gate, evaluator, or the four commitments. No new dependencies.

## Suggested test and negative control

1. A single explicit approved value must remain accepted.
2. A later contradictory value must not be ignored even when an approval manifest hash matches.
3. Two equal duplicate authority values should still be reported as ambiguous unless the real
   downstream contract explicitly defines how duplicates work.
4. Remote source inspections must never be reported as `pe_gate` PASS.

## Evidence that this release does not provide

No independent code-agent A/B test; no complete site build on the submitted PR; no target-environment
verification; no evidence that the skill statistically improves final code quality. The control case is
now known to its developers and must not enter a future untouched confirmatory holdout.
