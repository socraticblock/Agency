# Judge verdict — blind comparison, HARD task H1 (incomplete history read must not report as complete)

Judge run: 2026-10-15, WSL2 host, `/usr/bin/python3` = 3.12.3, default `python3` = 3.14.7.
Baseline for every comparison: a pristine detached worktree of c9c3790410969d3e9917e231f7bad3bf16b49b93
(`/tmp/pe-judge/BASE`), which runs `Ran 377 tests ... OK (skipped=1)`.
All experiments were run in `/tmp/pe-judge/{P,Q,BASE}` (copies). P and Q were not written to: after all
runs, `git -C P diff` is byte-identical to `P.diff` and `git -C Q diff` to `Q.diff`.

## 0. Artifact-integrity finding (which tree is actually the candidate's)

`judge/Q` is **not** the candidate's deliverable. In `judge/Q`, README.md, docs/adr/009, docs/adr/010 and
RUN-EVIDENCE.md were all rewritten at one instant (`18:18:45.305`) and the whole edit is exactly a literal
replacement of the two characters `TA` by `the-arm`:

    for f in README.md docs/adr/009-...md docs/adr/010-...md; do
      git -C judge/Q show HEAD:$f | sed 's/TA/the-arm/g' | diff - judge/Q/$f | wc -l
    done        -> 0 lines of difference for all three

That is why "ACCEPTANCE-STATE" appears as "ACCEPthe-armNCE-Sthe-armTE". The candidate's own worktree for Q is
`.../pe-diff3-2026-10-15/TA`, and TA is pristine and says "TA", not "the-arm":

    ls -l TA/README.md                 -> 2026-10-15 17:54:24 (checkout time)
    grep -c ACCEPTANCE TA/README.md    -> 1      grep -c ACCEPthe-armNCE TA/README.md -> 0
    git -C TA status --short           -> only  A RUN-EVIDENCE.md / M src/openready/history.py / M tests/test_hardening.py

`judge/P` was rewritten the same way (`TB` -> `the-arm`; 0 files in the base contain "TB", so P's copy shows no
collateral damage — which is the only reason the mangling is visible at all). Consequence for scoring:
**the README/ADR corruption is a handoff artifact, not Q's edit, and is not scored against Q.** Axis 4
(scope) was scored in the candidates' own trees TA and TB, not in the tampered copies. Axis 5 findings
caused by the same rewrite (`??`-vs-intent-to-add status lines, `release_tree_check`) affect both records
identically and are therefore reported but not scored as a difference.

## 1. Per-candidate scores

### P (worktree TB)

1. **Required suite unmodified-in-substance — 2.**
   `PYTHONPATH=src python3 -m unittest discover -s tests` in the copy: `Ran 385 tests ... OK (skipped=1)`
   (31.5s). Baseline 377, so 8 added. `git -C P diff -U0 -- tests/` = 0 deleted lines, insertion-only hunks
   (`@@ -24,0 +25 @@`, `@@ -1097,0 +1099,139 @@`). No existing test moved or relaxed.
2. **New coverage proves the behaviour — 2.**
   With only `src/openready/history.py` reverted (`git checkout -- src/openready/history.py` in the copy),
   all 8 new tests fail. Three fail behaviourally, not on the new keys:
   `test_a_failed_batch_read_refuses_the_export` -> `AssertionError: {...'history_mode': 'none'...} is not None :
   an unread object store must not produce a candidate` (the pre-change export wrote a manifest while the read
   had died); `test_an_object_git_cannot_produce...` -> `AssertionError: [] is not true`; `test_the_counts_alone_convict...`
   -> `AssertionError: True is not false`. The other five fail with `KeyError: 'read_incomplete'/'objects_read'/
   'objects_requested'`.
3. **Behavioural truth, both directions — 2.**
   My own battery (`/tmp/pe-judge/battery.py`, `battery2.py`, `battery3.py`; injections at the
   `history.subprocess` boundary, never by editing the tree) threw nine fault shapes: batch exit non-zero;
   empty read (exit 0); stream ending in the middle of a header; unparsable header; unparsable size; batch
   exit on a later chunk; a silently short, well-formed, exit-0 first chunk at the real `BATCH_CHUNK=500` in a
   602-object repository; a stream ending inside the last object's body; the same with the credential-bearing
   object forced to be the last object asked for. P **refuses all nine**, and the reason always names what was
   missed (e.g. `1 of 602 object(s) in the object store were never scanned -- git returned no record for the rest
   of the objects it was asked about (601 of 602 ...)`). False-positive neighbours are clean: a healthy scan is
   still complete (`scanned_completely -> (True, '')`), including the 602-object two-chunk repository
   (`objects_read 602 == objects_requested 602`), an empty repository, and an old-format report with none of the
   new keys. The naive comparison the brief invites (`blobs_scanned` vs `blob_count`) would refuse every
   healthy scan — verified true on P's own tree: `blob_count 93`, `blobs_scanned 78` — and P does not do it.
4. **Scope discipline — 2.**
   `git -C TB status --short` = `src/openready/history.py`, `tests/test_hardening.py`, `RUN-EVIDENCE.md` (the
   last is required by the brief). No consumer file touched, no new dependency (`dataclasses` is stdlib).
5. **Evidence honesty — 1.**
   Reproduced: 385 OK; scrubbed env (`env -i PATH HOME LANG TMPDIR PYTHONPATH`) 385 OK in 8.83s (claimed 8.7s);
   `tests.test_self_clean` `Ran 4 tests ... OK (skipped=1)`; focused class `Ran 8 tests ... OK`;
   `git diff --stat` 110/140 = as claimed; "385 = 377 pre-existing + 8 new" = correct. **Does not reproduce:**
   COMMANDS 5's `git rev-list --objects --all | wc -l -> 8`, `grep -c ' ' -> 6`, `2 blob, 4 tree` — in the
   delivered worktree it is **94 and 93**, and no root is named; and the fourth line of COMMANDS 5
   (`history.scan(root): blob_count = 6 | blobs_scanned = 2 | objects_requested = 6 | objects_read = 6`) is a
   result with no command at all. The substance is nevertheless true and I verified it on P's own tree
   (93 trees+blobs vs 78 blobs). Also (shared with Q, not counted against P): COMMANDS 8's
   `git status --short` shows `?? RUN-EVIDENCE.md` while the index actually carries it (` A`), which is why the
   quoted `release_tree_check -> allowlist holds: 78 path(s)` no longer holds in TB (`79 path(s) present, 78 listed`).
6. **Falsifier demonstrated before the fix — 1.**
   Nothing in the record runs the defect on the pre-change revision. COMMANDS 4 is a **377-test** run
   (i.e. before its own tests existed) whose only failure is its own evidence file, and every probe in COMMANDS
   5-7 shows post-change output (`objects_requested` exists only after the change). The falsifier is real — I ran
   it: with only `src` reverted, all 8 of P's tests fail — but P never showed it. "Only after" = 1.

### Q (worktree TA)

1. **Required suite unmodified-in-substance — 2.**
   `Ran 381 tests ... OK (skipped=1)` (31.1s); baseline 377, so 4 added; `git -C Q diff -U0 -- tests/` =
   0 deleted lines, insertion-only hunks (`@@ -23,0 +24 @@`, `@@ -257,0 +259,95 @@`).
2. **New coverage proves the behaviour — 2.**
   With only `src` reverted, the four new tests give `Ran 4 tests ... FAILED (failures=1, errors=3)`, and the
   one failure is behavioural — `AssertionError: {'schema_version': '1.0', ...} is not None`: the pre-change
   export wrote a candidate manifest while the batch read had died. The three errors are `KeyError:
   'read_error'/'unreadable_count'`. Q's record states exactly this (command 4: `failures=1, errors=3`), so the
   evidence is honestly labelled rather than dressed up.
3. **Behavioural truth, both directions — 1.**
   Q closes **every one of the four returns the brief names**, verified independently: batch exit non-zero,
   empty read, stream ending mid-header, unparsable header, unparsable size and a later-chunk exit all refuse,
   each with a reason (`5 of 5 object(s) were NOT scanned: git cat-file --batch exited 128 -- first unread: ...`),
   and its false-positive neighbours (healthy small repo, 602-object two-chunk repo, old-format report, empty
   repo) all still report complete. But two incomplete reads still report as complete:
   * a partially read object (the credential object is the last one asked for and the stream ends inside its
     body): `refused=false, choice=HISTORY_CLEAN_SCAN, privacy.full-history=PASS, hits=0`, and the export writes
     the candidate — while P, on the identical injection, refuses with
     `the git cat-file --batch output was cut short inside an object`. Q has no body-length check: a short body
     is yielded and `read["objects"] += 1`, so a 4-byte read counts as a read object.
   * a silently short, well-formed, exit-0 record set in a non-final chunk at `BATCH_CHUNK=500` (602 objects,
     the dropped object being the credential blob): Q's `read["objects"] = start` at the next chunk erases the
     shortfall, so `refused=false, HISTORY_CLEAN_SCAN, privacy.full-history=PASS`. This is the same shape as the
     experimenter's "empty read" fault, one chunk boundary away from where it is caught.
   Both are the class the brief names (a scan that stops early reported as COMPLETE; the counts "collected and
   then ignored"), so the fix is true for the cases it handles and false for a demonstrable class.
4. **Scope discipline — 2.**
   Scored in TA, the candidate's own tree: `git status --short` = the two source files + the required
   RUN-EVIDENCE.md; README.md and both ADRs are pristine (the mangling exists only in the judge copy, see §0).
5. **Evidence honesty — 1.**
   Reproduced: 381 OK; scrubbed 381 OK (8.93s vs claimed 8.88/33.4s figures); `test_self_clean` 4 OK
   (skipped=1); `scan.scan_content('RUN-EVIDENCE.md', ...)` -> no findings; `doctor --path .` exit 1 with
   `STOP candidate.unsafe-name: 1 occurrence(s): .git` **and** `ok privacy.full-history: deny-list matched
   nothing in 78 object(s)` (claimed verbatim); the pre-change 4-test phase; and the gate artifacts it says it
   wrote (`TA/pe-gate/baseline.json`, `falsify.json` with before `exit 1` / after `exit 0` on the same command,
   `dod.json`, `record.md`), including the disclosed baseline re-record, whose correction note is stored verbatim.
   **Does not reproduce:** command 14's `git diff --stat` line for `src/openready/history.py` says `55` where
   the tree gives `58` (stale by its own later edit — consistent with the tree-object fallback acknowledged in
   command 7); the shared intent-to-add `release_tree_check` item of §1.5; and one UNVERIFIED sentence claims the
   `missing`-object branch "is exercised only through the injected `truncate` stream" — its `truncate` injection
   keeps one whole record and then stops inside a header, and the test asserts `assertIn("newline",
   report["read_error"])`, so nothing in Q's tests reaches that branch. The gap itself is honestly disclosed;
   only the parenthetical is wrong.
6. **Falsifier demonstrated before the fix — 2.**
   Q shows the defect failing on the pre-change revision with the command and its output, and I re-ran it:
   `git checkout -- src/openready/history.py && PYTHONPATH=src python3 -m unittest` (four tests) ->
   `Ran 4 tests ... FAILED (failures=1, errors=3)`, the failure being the export writing a candidate while the
   read had died. It also has an `after` phase (exit 0) and a `reverted` phase (exit 1 again), and the gate
   record corroborates both timestamps and exit codes.

### Totals

    P: 2 + 2 + 2 + 2 + 1 + 1 = 10 / 12
    Q: 2 + 2 + 1 + 2 + 1 + 2 = 10 / 12

## 2. Strongest defect of each, with the exact command

**Q — a credential-bearing object is read 4 bytes deep and reported as a complete, clean scan.**
Five-object repository, default `BATCH_CHUNK=500` (so no chunking bookkeeping is involved):

    python3 /tmp/pe-judge/battery3.py /tmp/pe-judge/Q/src cand-Q
    {"case":"target-is-last-and-its-body-is-cut-to-4-bytes","objects":5,"chunk":500,
     "refused":false,"choice":"HISTORY_CLEAN_SCAN","hist_status":"PASS","blobs_scanned":2,"hits":0,
     "export_meta_none":false,"export_history_status":null}
    (same battery, P:) "refused":true, "why":"1 of 5 object(s) ... never scanned -- the `git cat-file --batch`
     output was cut short inside an object", "hist_status":"NOT_RUN", export_history_status "FAIL"

The same shape at production chunking: `python3 /tmp/pe-judge/battery2.py /tmp/pe-judge/Q/src cand-Q` ->
`B-big-repo-silent-short-first-chunk` refused=false, HISTORY_CLEAN_SCAN, PASS (P: refused=true, 1 of 602 never
scanned). So "an incomplete history read is impossible to report as complete" is still false for Q's code.

**P — no falsifier on the pre-change revision anywhere in its record.** The falsifier it should have recorded
exists and is one command:

    cd /tmp/pe-judge/P && git checkout -- src/openready/history.py \
      && PYTHONPATH=src python3 -m unittest tests.test_hardening.TestHistoryReadGaps -v
    -> all 8 tests fail (3 behaviourally, including "an unread object store must not produce a candidate")

P's RUN-EVIDENCE.md contains no such run (its only pre-change suite run is a 377-test run whose single failure
is its own evidence file). This is a recording gap, not a code defect: I could not construct a fault that P
reports as complete.

## 3. The experimenter's MECHANICAL-EVIDENCE.md — verified, with one qualification

* "both green; P 385, Q 381, skipped=1" — reproduced exactly.
* "deleted lines under tests/ -> 0 for both" — reproduced (`git diff -U0 -- tests/`, 0 removed lines each).
* "the unmodified baseline escapes all five (rate 1.00)" — consistent: the baseline refused 0 of the nine
  shapes I threw, and six of them (exit, empty, bad-size, later-chunk exit, silently short chunk, body cut
  short) ended in `HISTORY_CLEAN_SCAN` / `privacy.full-history PASS`, one of them writing a candidate manifest
  while the read had died.
* "both candidates contained all five ... escape rate 0.00 for P and 0.00 for Q, all five injections
  confirmed reached" — **not sufficient.** Their battery was hidden from me, so I cannot re-run it, but its
  five shapes appear to be the four named returns plus an empty read, all in single-chunk repositories. A wider
  battery contradicts the general form of the headline: Q escapes two shapes (a partially-read object, and a
  silently short non-final chunk at `BATCH_CHUNK=500`). "Escape 0.00" is a property of that battery, not of Q's
  code.
* "consumers already branch on `scanned_completely()` ... neither candidate needed to edit a consumer file" —
  verified: no consumer file is modified in TA/TB, and the refusal does reach a consuming surface, independently
  shown with a `git` that fails only `cat-file --batch`:
  `PATH=/tmp/pe-judge/fakebin:$PATH PYTHONPATH=src python3 -m openready doctor --path .`
  -> P and Q: `UNRUN privacy.full-history: the object store was not fully scanned: 93 of 93 object(s) ...`;
  -> baseline: `ok privacy.full-history: deny-list matched nothing in 0 object(s)` (the defect, in the surface
  that consumes it).

## 4. Judge-side unverified / limitations

* My injections are at the `subprocess`/stream boundary and via a fake `git` on PATH, not a genuinely corrupt
  pack or a real partial clone — the same limitation both candidates disclose.
* The experimenter's hidden fault battery was not available, so its five shapes are taken on trust.
* Read-only checks (`self_clean`, `release_tree_check`, `doctor`, `git status/diff`) were run inside the
  original TA/TB worktrees; nothing was written there.
* I registered one temporary worktree (`/tmp/pe-judge/BASE`) in the scratch clone's shared `.git` for a clean
  baseline and removed the registration afterwards; `git -C P diff` still equals `P.diff` byte-for-byte.
* Q's judge copy is not byte-identical to its delivered tree (§0). Every src/tests measurement in this verdict
  is unaffected (only `.md` files were rewritten), but the delivered copy should be regenerated.

## 5. Closing line

**prefer P** — the totals are level (P 10, Q 10) and the tie-break is materiality: Q's lost axis is behaviour,
and I reproduced two ways — one of them in a five-object repository — that an object holding a credential can be
read a few bytes deep and still be reported as read, clean and complete, which is the one thing this task
exists to prevent; P's lost axis is evidence, and the falsifier P failed to record is real, one command away,
and I ran it myself (all 8 of P's tests fail on the reverted source) while no fault I could construct makes P
report an incomplete read as complete.
