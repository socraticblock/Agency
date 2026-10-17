**Status:** CURRENT for 3.5.0-rc.1 — the outcome-only differential, and the measurement that produced this revision.

# T4 — nobody told them where to look

Every earlier task named the defect and the method, which hands the arm without the doctrine the doctrine's
reasoning. T4 gives one auditor's sentence — "your tool states conclusions it has not earned; I cannot tell from its
output whether it actually looked at everything" — with no location, no defect, no method, and an explicit warning
that the auditor may be wrong about which claim is unearned. Same repository, same commit, same model; the treatment
arm also carried the doctrine and the gate, the control carried neither.

Both found the defect class and closed multiple routes (treatment: 8 files, +454/−119; control: 2 files plus a new
test module, +305). Both suites green at 390 tests, no test weakened.

**Identity-blind injected-fault battery, seven faults** (hard failures, rejectable headers, and the two cases that
matter: every header delivered with the last body stopping 4 bytes into its declared 33 while the reader exits 0, and
every body truncated the same way). All seven injections witnessed as reached:

| tree | escape rate |
|---|---|
| unmodified commit c9c3790 | **1.00** (7 of 7) |
| treatment — doctrine + gate | **0.14** (1 of 7) |
| control — neither | **0.00** (0 of 7) |

The treatment's single escape is the fault with **no error signal at all**: `scanned_completely()` returned complete
with 6 of 6 objects "scanned" while the last object's body had been cut short and git exited 0. The blind judge,
writing its own battery, found the same defect independently (`JFAULT=tail_body` → `complete: true`, the secret
blob's body arriving 4 of 60 bytes, and `_iter_blobs` adding the fragment to `seen` with no length check).

Verdict: **11/12 control against 10/12 treatment, `prefer` the control.** The judge also found a route the control
left open — a deny-list-shaped secret in an unreachable object, where the export proceeds and the clone carries it —
and a `doctor` report that calls a partly unread tree clean. Both arms lost the same honesty axis for a summary line
that did not match their own diffs.

**Conclusion, at four task classes and five measurements: the doctrine produced a better record and no better code,
and on the fault class where correctness actually bites the arm without it was repeatedly safer.** 3.5.0-rc.1 is the
response: the prose cut to the four commitments that survived, the gate and the battery kept as the authority and the
measure.
