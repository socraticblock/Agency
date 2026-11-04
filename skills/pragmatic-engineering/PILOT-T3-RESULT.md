**Status:** CURRENT for 3.4.0-rc.1 — the hard-task result, and the sharpest evidence against pinning this revision.

# T3 — a hard task, and an independent battery that found what my own missed

Task (verified defect, brief given to BOTH arms identically): `history.py`'s blob iterator returns silently on a
failed or malformed batch read, and `scanned_completely()` never compares `blobs_scanned` against `blob_count`, so a
scan that stopped early can be reported COMPLETE in a tool whose purpose is to refuse an export on an incomplete scan.
The treatment arm also carried the doctrine and the gate; the control had neither.

**My own battery said the arms were equal. It was too weak.** Five injected fault modes — non-zero exit mid-batch,
malformed header, declared size larger than the bytes delivered, missing newline, empty read — gave **0.00 escapes
for both arms, all injections witnessed as reached** (the unfixed commit escapes all five, 1.00). On that battery the
doctrine neither helped nor hurt.

**Then the blind judge wrote its own battery, and both arms separated.** Two cases my battery never had:

| case | control (no doctrine, no gate) | treatment (doctrine + gate) |
|---|---|---|
| every object truncated to 4 bytes, target last, reader exits **0** | refused, `HISTORY_UNKNOWN`, export `FAIL`, "1 of 5 object(s) ... cut short inside an object" | **not refused** — `HISTORY_CLEAN_SCAN`, `hist_status` PASS, 2 of 5 objects read |
| 602-object repository, first batch silently short, production chunking | refused, export `FAIL`, "1 of 602 object(s) ... never scanned" | **not refused** — `HISTORY_CLEAN_SCAN`, PASS, 599 of 602 read |

Both reproduced by the experimenter, on both trees, with the judge's own batteries preserved here as
`REVIEW-T3-BATTERY2.py` / `REVIEW-T3-BATTERY3.py`. The judge's verdict: **10/12 against 10/12, `prefer` the control**,
the tie broken on materiality — the treatment's lost axis is behaviour, and the behaviour it loses is a credential-
bearing object read four bytes deep and reported as a clean, complete scan. The treatment's win is the one axis it
has won throughout: its record shows the falsifier on the pre-change revision, which the control's does not.

**So the doctrine's signature is now measured on three task classes: the record improves, the code does not — and on
a sufficiently hard case the code gets worse.** That is the reason the recommendation is not "trim and retry". It is:
do not pin this revision, keep the gate, and keep an escape battery as the measure, authored by someone other than
the person who wrote the fix.

**The lesson about instruments, which is the transferable one.** My five modes all used a *hard* failure (non-zero
exit) or a header the reader could reject. The cases that mattered were a **truncation that exits 0** and a short
**chunk on the production path** — a battery written by the author of the favoured arm did not contain them. An
escape battery is only evidence when someone other than the author chooses the faults.
