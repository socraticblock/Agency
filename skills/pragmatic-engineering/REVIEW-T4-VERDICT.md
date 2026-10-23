# Judge verdict — pe-diff4, blind comparison P vs Q

Judged from the artifacts on disk and by re-running them. Both candidates are full worktrees of
`socraticblock/open-source-ready` @ c9c3790 with one uncommitted change each. I did not modify either
worktree: every revert/experiment ran on copies under `/tmp/j4` (`cp -a`), and a clean pristine tree was
made by `git clone --no-hardlinks judge/P /tmp/j4/pristine_clean`. My git invocations inside the judge
copies refreshed the shared index stat-cache (mtime only) — no tracked file, HEAD, or uncommitted hunk was
altered (verified: `diff -r --brief` of `src/`+`tests/` against the original candidate worktrees is empty;
src/test file mtimes still 18:4x).

## 0. First: a packaging defect in the material I was given (affects evidence, not scoring)

The judge copy of Q (and `Q.diff`) shows 13 changed paths, 3 of them tracked documentation: `README.md`,
`docs/adr/009-…md`, `docs/adr/010-…md`. All three are corrupted by a blind lane-token substitution
("TA" -> "the-arm"): `06-ACCEPthe-armNCE-TESTS.md`, `docs/ACCEPthe-armNCE-Sthe-armTE.{md,json}`, and
`## Sthe-armTE` in Q's own RUN-EVIDENCE.md. This is a **copy artifact**, not the candidate's work:

    cd /home/socraticblock/.../pe-diff4-2026-10-15/TA && git diff --name-only     # 10 paths, no docs
    grep -c 'the-arm' TA/README.md TA/docs/adr/009-*.md TA/docs/adr/010-*.md TA/RUN-EVIDENCE.md
    -> 0 0 0 0
    diff -r --brief TA/src judge/Q/src ; diff -r --brief TA/tests judge/Q/tests   # no output (identical)
    stat -c '%y %n' judge/Q/README.md ...  -> all 2026-10-15 19:15:04 (copy time)

The same substitution touched P's copy (`judge/P/RUN-EVIDENCE.md` title, mtime 19:15:04; the original says
`(TB)`). So: `src/` and `tests/` are faithful copies; the doc diffs and the mangled headings in both
RUN-EVIDENCE copies are harness artifacts. They play **no part** in any score below.

## 1. Verification of MECHANICAL-EVIDENCE.md (re-run, not repeated)

    cd judge/P && PYTHONPATH=src python3 -m unittest discover -s tests   -> Ran 390, OK (skipped=1)   [30.0s]
    cd judge/Q && PYTHONPATH=src python3 -m unittest discover -s tests   -> Ran 390, OK (skipped=1)   [30.3s]
    git diff --numstat -- tests                                           -> P 414/0, Q 393/0 (no deletions, no edited test)

Both halves of the experimenter's first two claims hold. I did **not** re-run their fake-git battery (their
harness is not in the judge directory), so I wrote my own (§4); it independently reproduces the Q hole they
report (truncated read, reader exits 0, `scanned_completely()` still true) and additionally finds a P hole
their battery did not test (§5).

## 2. Candidate P

    1. Required suite unmodified-in-substance ................ 2
       `git diff --numstat` = candidate.py 201/26, history.py 104/10, tests/test_completeness.py 414/0,
       RUN-EVIDENCE.md 198/0 — no existing test, fixture or assertion touched; suite green (above).

    2. New coverage proves the behaviour ..................... 2
       Full src revert (pristine clone + P's test file):
         PYTHONPATH=src python3 -m unittest discover -s tests -p test_completeness.py
         -> Ran 13 / FAILED (failures=10, errors=3)      (exactly P's claimed B2)
       history.py reverted only (/tmp/j4/Prev):
         -> Ran 13 / FAILED (failures=3, errors=2); the named casualties are its object-store tests:
            test_a_cat_file_stream_that_stops_early_is_not_a_complete_scan,
            test_a_cat_file_that_dies_mid_run_is_not_a_complete_scan,
            test_an_object_that_is_gone_when_it_is_read_is_reported, +2 report-key errors.
       P unchanged: Ran 13 / OK.

    3. Behavioural truth, both directions .................... 1
       + every induced read failure on the cat-file seam is refused (0/7 realizable escapes, §4);
       + no false refusal on a clean tree: `candidate --path /tmp/j4/fz --out /tmp/j4/outz_P` -> exit 0,
         wrote 12 file(s), "the allowlist offered 12 path(s), 0 of them not regular files here";
       - **the enumerated set is the reachable set, and P's own new sentence calls it the store** (§5a):
         unmodified store holds 8 objects, `rev-list --objects --all` names 5; P says "4 of 4 object(s) in
         the object store were read", finds 0 hits, and exports (exit 0) while a clone carries the deny-list
         blob. Unearned completeness claim, unclosed.
       - the doctor surface is still silent (§5b).

    4. Scope discipline ...................................... 2
       Two source files (the export decision and the object-store read) + one new test module + the required
       record. No docs, no new dependency, no unrelated hunk; brief's "no skill, no gate tool" honoured
       (SKILL_LOADED=no, no gate artifacts anywhere in the worktree).

    5. Evidence honesty ...................................... 2
       Re-ran every command in P's RUN-EVIDENCE.md:
         B0 baseline suite  -> pristine_clean: Ran 377 / OK (skipped=1)            [reproduces exactly]
         B1 git probes      -> loose blob deleted: rev-list exit 128; cat-file --batch "<sha> missing"
                               exit 0; garbage .git/index: rev-parse --is-inside-work-tree=true exit 0,
                               ls-files exit 128 "index file smaller than expected"   [all reproduce]
         B2 -> Ran 13 / FAILED (failures=10, errors=3)      [exact match]
         B3/B4 -> Ran 13 / OK ; Ran 390 / OK (skipped=1)    [exact match]
         B5/B8 scrubbed (env -i PATH/HOME/LANG/TMPDIR/PYTHONPATH) -> Ran 390 / OK (skipped=1)  [result
                               matches; P's quoted 8.676s does not reproduce — same command takes ~66s here
                               on *both* trees, so this is my host under env -i, not a false result]
         B7 diff accounting -> 305 insertions / 36 deletions over the two sources   [exact match]
         B9 operator output -> reproduced, same two sentences and same numbers on my own clean project:
                               "ok privacy.full-history: deny-list matched nothing in 12 scanned object(s);
                                20 of 20 object(s) in the object store were read"
                               "ok candidate.export: wrote 12 file(s) of 12 planned path(s); the allowlist
                                offered 12 path(s), 0 of them not regular files here; digest sha256:13e322bc…"
       Findings: one non-reproducing quantity, B6 ("Ran 11 tests") — the file now holds 13, and the record
       itself says "at the time the file held 11 tests", so it is a labelled historical snapshot, not a
       slipped claim. Nothing material is unverifiable.

    6. Falsifier demonstrated before the fix ................. 2
       B2 is a real pre-change run with the command and its output (13/13 red on `git archive HEAD`, plus
       transcripts of the tool's own pre-change report: "blobs_scanned: 1", "scanned_completely() -> True").
       I reproduced the 13/13 red myself; B1's induced git states are real git states, verified independently.

    P TOTAL: 11 / 12

## 3. Candidate Q

    1. Required suite unmodified-in-substance ................ 2
       Original worktree diff = 10 paths: 8 sources + `tests/test_coverage_honesty.py` (393/0) +
       RUN-EVIDENCE.md (246/0). No existing test/fixture/assertion touched (numstat above); suite green.

    2. New coverage proves the behaviour ..................... 2
       Full src revert (pristine clone + Q's test file):
         PYTHONPATH=src python3 -m unittest discover -s tests -p test_coverage_honesty.py
         -> Ran 13 / FAILED (failures=13)        (Q's "all 13 fail on their own assertion" reproduces)
       history.py reverted only (/tmp/j4/Qrev):
         -> Ran 13 / FAILED (failures=2): test_an_object_a_clone_carries_is_not_invisible_to_the_scan,
            test_an_object_that_cannot_be_read_is_not_a_complete_scan.
       Q unchanged: Ran 13 / OK.

    3. Behavioural truth, both directions .................... 1
       + the store-enumeration route is genuinely closed (P's hole): with a deny-list blob left unreachable
         by a real `git reset --hard`, Q reports hits=2 and never claims a clean store (§5a);
       + the tree-walk route is closed on the report surfaces as well: `doctor` on a tree with an
         unlistable directory prints `FAILED : 1` and
         `STOP candidate.unreadable-directory: 1 occurrence(s): locked`, and `candidate` refuses
         (`STOP candidate.unread: … locked (could not be listed (PermissionError))`, exit 1, nothing written);
       - **a read truncated inside an object, with git exiting 0, is counted as read** (§5c). Q's own
         `_iter_blobs` adds the sha to `seen` *before* checking `len(body) == size`, so the accounting
         identity balances over a fragment: the scan reports `complete=True`, counts the fragment as
         scanned, and misses the deny-list hits that the intact store yields (2 -> 0). No test covers it,
         so Q's C6 "closure" is true for a missing object and false for a truncated one.
       + no false refusal on a clean tree (12 files, exit 0).

    4. Scope discipline ...................................... 2
       Original diff touches 10 declared paths, each mapped to a named closure C1–C11; no unrelated edit, no
       new dependency (only `Set` added to a stdlib `typing` import), no test weakened, no drive-by hunk.
       The breadth is what the brief demanded ("any way … must be closed, not just the first one you find").
       (Reported separately, not scored on this axis: the brief's first line forbade loading a skill and
       using a gate tool; Q did both and says so — RUN-EVIDENCE.md item 2/7 and the gate artifacts in the
       worktree's git dir `…/worktrees/TA/pe-gate/{baseline,dod,falsify,record}`.)

    5. Evidence honesty ...................................... 1
       Reproduced: 3 before-suite (377/OK skipped=1), 4 after-suite (390/OK skipped=1), 5a module alone
       (13/OK), 5b/5c/5d red-green-reverted (my own revert reproduces exit 1/0/1; gate file `falsify.json`
       and `record.md` are on disk with consistent timestamps), 6 scrubbed suite (390/OK skipped=1),
       7 `git diff --numstat` (matches the original tree file for file).
       Findings, counted:
         (a) item 1's locating evidence (P1–P4) names `$scratch/probe/probe1.py`; that file is not on disk
             (`ls …/pe-diff4-2026-10-15/probe` -> No such file or directory), so four asserted outputs
             ("wrote 2 file(s)", "store 8 vs rev-list 5", "blobs_scanned 1 of 4", "verify … PASS") cannot be
             re-run at all. Their substance I could and did reproduce independently (13/13 red on pristine;
             the unreachable-object miss on pristine) — so it is an unverifiable block, not a fabrication.
         (b) item 7 quotes the gate line "diff: 10 file(s), 454 added line(s)". 454 is the sum of the 8
             source files only, while the same diff list contains 10 files whose added lines total 1093
             (`git diff --numstat`: 454 + 246 + 393). The line reproduces as the tool's text but does not add
             up; the record repeats it without comment.

    6. Falsifier demonstrated before the fix ................. 2
       Red-then-green is shown with the command, its exit code, the per-test assertion messages, and a
       `tests_digest` (92817dee93dfac40) identical across before/after/reverted, which is a stronger
       binding of "the test file did not move" than a narrative. My own pristine run reproduces the red.

    Q TOTAL: 10 / 12

## 4. My own fault battery (different from the experimenter's)

Harness: `/tmp/j4/bin/git` — a shim that delegates every call to `/usr/bin/git` and mutates only
`cat-file --batch` (and, for the census faults, `--batch-all-objects --batch-check`), env-selected by
`JFAULT`; the fault is applied to the real byte stream git produced. Driver:
`PATH=/tmp/j4/bin:$PATH JFAULT=<fault> python3 /tmp/j4/probe.py <tree> <repo> <out>`; the probe prints
`scanned_completely()`, whether `candidate.export` wrote a candidate, and the hit count.
Escape := the tool declares the read complete (`complete: true`) after bytes it asked for were **not**
delivered, or after the enumerated set omitted an object the store holds.

    fault (all realizable by a pipe cut / killed reader unless noted)   P        Q        pristine
    none  (control, no mutation)                                        no-esc   no-esc   no-esc
    exit 1 with full stdout                                             refused  refused  ESCAPE
    empty stdout, exit 0                                                refused  refused  ESCAPE
    stream ends at a header boundary, exit 0 (objects missing silently)  refused  refused  ESCAPE
    last body cut mid-object (body 4..5 of 60 bytes), exit 0            refused  **ESCAPE**  ESCAPE
    declared size non-numeric, exit 0                                   refused  refused  ESCAPE
    one object answered "<sha> missing", exit 0                         refused  refused  ESCAPE
    last byte of the last body missing, exit 0                          refused  **ESCAPE**  ESCAPE
    secret blob unreachable, real `git reset --hard`, no shim           **ESCAPE**  refused  ESCAPE
    census listing fails, exit 128                                       n/a      refused  n/a
    -------------------------------------------------------------------------------------------------
    realizable escapes                                                    1 / 9    2 / 9    9 / 9

    (excluded as not physically realizable — splices, reported for completeness: first_body -> P escape,
     understate -> neither, census_short (listing short by one line with exit 0) -> Q escape)

The battery bites: the pre-change revision escapes 9 of 9. Both batteries (the experimenter's and mine)
agree that Q's hole is the truncated-body/no-error-signal case. Mine adds P's hole.

## 5. Strongest defect of each, with the exact command

### 5a. P — the denominator is the reachable set, presented as the object store; the export proceeds

    # store holds 8 objects; `git reset --hard HEAD~1` left the deny-list-shaped blob unreachable
    cd /tmp/j4/bat/B && git cat-file --batch-all-objects --batch-check | wc -l   -> 8
                        git rev-list --objects --all | wc -l                    -> 5
    PATH=/usr/bin python3 /tmp/j4/probe.py /tmp/j4/P /tmp/j4/bat/B /tmp/j4/outB_P
    -> {"complete": true, "export_wrote": true, "hits": 0, "read": 4, "total": 4, "read_aborted": false}
    PYTHONPATH=src python3 -m openready candidate --path /tmp/j4/fz --out /tmp/j4/outz_P | grep full-history
    -> ok   privacy.full-history: deny-list matched nothing in 12 scanned object(s);
           20 of 20 object(s) in the object store were read
    # the claim is false in that scenario, and the copy a reader receives carries the secret:
    git clone --no-hardlinks /tmp/j4/bat/B /tmp/j4/bat/Bclone && \
      git -C /tmp/j4/bat/Bclone cat-file --batch-all-objects --batch | grep -c api_key   -> 1

Q, same fixture, same absent shim: `hits: 2` — the route is closed there.
P's own record names `blob_count` as counting trees and commits (C3) yet the new sentence says "objects in
the object store"; the sentence P *added* is the unearned claim.

### 5b. P (secondary) — `doctor` still reports a partly-unread tree as clean

    cd /tmp/j4/P && PYTHONPATH=src python3 -m openready doctor --path /tmp/j4/fy/b   # fy/b/locked is mode 000
    -> files scanned  : 12      FAILED         : 0
    grep -ci 'locked\|unread\|could not be read\|walk' <doctor output>               -> 0
    cd /tmp/j4/Q && … doctor --path /tmp/j4/fy/b
    -> files scanned  : 12      FAILED         : 1
       STOP  candidate.unreadable-directory: 1 occurrence(s): locked

The export decision itself refuses in both (`candidate.walk-unreadable` / `candidate.unread`, exit 1,
nothing written), but the human-facing report P leaves untouched still answers the auditor's second half
with a count and a zero.

### 5c. Q — a truncated read with no error signal is counted as read

    cd /tmp/j4/bat/A   # 3 blobs; notes.txt's blob (ffb233a45b6f…) holds the deny-list shapes
    PATH=/tmp/j4/bin:$PATH JFAULT=none      python3 /tmp/j4/probe.py /tmp/j4/Q /tmp/j4/bat/A /tmp/j4/out_Q_none
    -> {"complete": true, "hits": 2, "blob_count": 3, "read_aborted": null}
    PATH=/tmp/j4/bin:$PATH JFAULT=tail_body python3 /tmp/j4/probe.py /tmp/j4/Q /tmp/j4/bat/A /tmp/j4/out_Q_tb
    -> {"complete": true, "hits": 0, …}     # the secret blob's body arrived 4 of 60 bytes, git exit 0
       and `scanned_completely()` -> True, with the fragment counted as a scanned object:
       Q/history.py `_iter_blobs`: `body = stream[offset:offset + size]` … `seen.add(sha)` … (no length check)
    P, same fault:  {"complete": false, "why_not": "the object-store read stopped early: the object stream
                     ended after 5 of 60 byte(s) of object ffb233a45b6f", "history_unscanned": "FAIL"}

The mechanism is one line of Q's own new code, no test covers it, and it is the case the brief names
explicitly (a truncated read that produces no error signal). Q's closing claim for C6 is true for an
object git answers `<sha> missing` for, and false for an object it answers with a short body.

## 6. Scores

    P: 2 2 1 2 2 2 = 11 / 12
    Q: 2 2 1 2 1 2 = 10 / 12
    (axes: 1 suite unmodified, 2 new tests fail on revert, 3 behavioural truth, 4 scope, 5 evidence
     honesty, 6 falsifier before the fix)

Both close the same central defect — the export decision no longer rests on a `scanned_completely()`
that is true over an unread object-store — and each leaves exactly one unearned route open, in opposite
places. Q's remaining hole is the more literal reading of the brief and the one both batteries catch;
P's remaining hole is broader in reach (a false sentence in its own operator output plus an unpatched
report surface) but confined to one scenario (unreachable objects in a store a clone carries).

prefer P

Reason: on identical batteries P leaves one unearned route open to Q's two (0/7 vs 2/9 realizable
cat-file escapes in my battery, matching the experimenter's 0/7 vs 1/7), its operator output carries the
read account the auditor asked for, and every material claim in its RUN-EVIDENCE.md reproduced exactly,
while Q's record leaves a whole locating block unreproducible (`probe1.py` absent) and quotes a gate line
that does not add up — with Q's census/TreeWalk closures being the stronger idea and worth folding into
whichever change lands. Neither is merge-ready as it stands: each must first close the route the other
closed (P: enumerate the store, not `rev-list --all`, and stop calling the reachable count "the object
store"; Q: verify `len(body) == size` and mark the object unread).
