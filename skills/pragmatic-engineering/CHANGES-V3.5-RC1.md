# Changes — 3.5.0-rc.1

3.5.0-rc.1 is 3.4.0-rc.1 with one change: **`SKILL.md` cut from 9,638 to 5,915 bytes** (133 → 96 lines) and
restructured around four commitments. Nothing else moved — every reference file, the gate, its tests and every
provenance report are byte-identical to 3.4.0-rc.1. Rounds 1-8 of this package's history are in
`CHANGES-V3.4-RC1.md`.

## Why the cut

Four task classes were run as blind differentials, treatment (this doctrine plus the gate) against control (neither),
same model, same brief, judged by independent judges and, in the last two, by an identity-blind injected-fault
battery authored outside the arm:

| task | control | treatment |
|---|---|---|
| small: dangling citations | 11 / 12 | 9 / 12 |
| small: bytecode cache | 11 / 12 | 10 / 12 |
| small: licence vs UNDECIDED | 11 / 12 | 9 / 12 |
| hard, briefed: history fail-open | 10 / 12 | 10 / 12 (preferred for materiality: the treatment arm still reported a 4-byte read of a credential-bearing object as clean) |
| hard, outcome-only: same defect, no location given | 11 / 12 | 10 / 12 |

Aggregate 55/72 control against 48/72 treatment. The one axis the doctrine won consistently was *the failure was
demonstrated before the fix*. On the fault class with **no error signal** — a body truncated while the reader exits 0 —
the doctrine arm reported a clean scan twice, on two different tasks, where the arm with no doctrine caught it by
arithmetic. Its cost was measurable too: model calls up 33% across the two pairs where counts were recorded.

An external review, given this evidence, recommended removing 80-90% of the automatically loaded material and keeping
four commitments, and predicted the hard-task outcome that then occurred. That recommendation is what this revision
implements. The commitments kept are the ones the measurement did not refute.

## What the cut keeps

- The four commitments, now the whole doctrine: identify the invariant, challenge it executably, follow the failure to
  its boundary, report only established evidence — with the injection-witness rule and the new arithmetic rule for
  failures that produce no error signal.
- The gate paragraph with all four commands and the per-class evidence obligations compressed to one line; the gate
  itself is unchanged and remains the authority.
- The three rules that changed outcomes most often in eight rounds of review: pre-existing attribution by
  demonstration, never weakening a verification artefact, and not inventing a parallel workflow.
- Every route: all 24 links to references, modes and assets are intact, so the validator's runtime graph and the
  packages' regressions are unaffected.
- A closing section stating plainly what the measurement found, so a future reader cannot mistake this doctrine for a
  demonstrated improvement.

## Acceptance for this revision

Validator `VALID`; regression suite 14/14; holdout 11/11; gate tests 25/25 — and the injected-fault battery unchanged,
which is the point: the shrink cannot make the *tool* weaker, only the prose smaller. **Unverified:** whether the
smaller doctrine behaves any better than the larger one. The differential that would answer that has not been run.
