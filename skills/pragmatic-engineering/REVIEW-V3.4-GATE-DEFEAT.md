**Status:** CURRENT as a review of its named revision, which is NOT the revision in this directory.
Reviewed the PRE-REDESIGN gate (before change classes and the reversion phase): 368 lines, 15 tests. It found 13
routes to PASS with an obligation unmet and 5 false refusals. Round 6 in `CHANGES-V3.4-RC1.md` records which of
its findings are fixed, which are inherent to a file-based record, and which stay deferred.

# G1 — Defeating `pe_gate.py`: an adversarial review

Reviewer: assistant-4 (Hermes lane), fresh context, no network, no browser.
Artifact under review: `/home/socraticblock/hermes-workspace/pragmatic-engineering/v3.4/build/scripts/pe_gate.py`
Doctrine that motivates it: `/home/socraticblock/hermes-workspace/pragmatic-engineering/v3.4/build/SKILL.md`
All mutation happened in throwaway repositories under `/tmp/pe-defeat/`. No commit was made in any repository I did not create.

## 0. Identity, environment, method

Environment (VERIFIED):

```
$ date -u
Thu Oct 15 12:25:44 UTC 2026
$ uname -sr
Linux 6.6.87.2-microsoft-standard-WSL2
$ git --version
git version 2.43.0
$ which python3
/home/socraticblock/.hermes/tools/python-3.14.7+20260901-linux-x64/bin/python3
$ /home/socraticblock/.hermes/hermes-agent/venv/bin/python3 -V
Python 3.11.15
```

The tool was always run with the venv interpreter (`python3 pe_gate.py …` in the transcripts means
`/home/socraticblock/.hermes/hermes-agent/venv/bin/python3 .../pe_gate.py`), as the brief instructed. The falsifier
commands *inside* the gate were run by the gate through `shell=True`, so `python3 check.py` in a stored command means
Python 3.14.7 from PATH.

Artifact identity (VERIFIED) — this is **R1**, the revision every command in sections 3–8 was run against:

```
$ sha256sum tool/r1/pe_gate.py
1cf9849a689368318734a439804153bfa8ca10cade7bf9a55f53974a5b5e38da  tool/r1/pe_gate.py
$ wc -l tool/r1/pe_gate.py
368 tool/r1/pe_gate.py
```

16223 bytes, mtime `2026-10-15 16:23:53.246169305 +0400`. `read_file` on the build path at the start of this review
reported `file_size: 16223`, `total_lines: 368`, so the review copy is byte-identical to what I read; the `diff` I ran
against the build path earlier only diverged because that path was rewritten underneath me (section 9).

Test suite as reviewed (VERIFIED):

```
$ cp /home/socraticblock/hermes-workspace/pragmatic-engineering/v3.4/build/scripts/{pe_gate.py,tests_pe_gate.py} /tmp/pe-defeat/tool/
$ cd /tmp/pe-defeat/tool && /home/socraticblock/.hermes/hermes-agent/venv/bin/python3 tests_pe_gate.py
Ran 15 tests in 6.015s

OK
```

Suite identity: `sha256 2c7d309ef58ff99a76710164964e6fcfdda015527f3e423410b67c59645ba12b`, 9378 bytes, 15 tests, all
green. Doctrine under test: `sha256 9a6756e0961d37dfc1f39886acc2d1b2803087cff98a88dd6916e3785e10b394` (SKILL.md).
Do not read "15/15 green" as evidence about the obligations: section 4.1 shows a one-line mutation of the fixture that
turns the happy path red, i.e. the suite passes in part because its fixture avoids the case that breaks the tool.

Method. Every attempt builds a throwaway git repository under `/tmp/pe-defeat/`, drives the CLI exactly as SKILL.md
documents, and reports the observed exit code and output. Where an attempt could be confounded by the parsing defect in
4.1, the scenario is repeated with the confounding factor removed (the in-scope file staged, so no path is mis-sliced),
so the result is attributable to the attack under test rather than to the bug. Evidence labels are used literally:
VERIFIED = observed, with the command shown; INSPECTED = code read, not executed; INFERRED; UNVERIFIED.

## 1. Headline

**15 routes to `check` printing PASS (exit 0) with at least one obligation unmet** — every one observed, none inferred.
**5 ways the gate refuses a developer who did nothing wrong.** **3 shapes of uncaught traceback** instead of a named
finding. **7 of the 15 survive unchanged** in the revision that replaced the artifact mid-review (section 9).

The worst is not a trick, it is an absence: `check` never binds its stored state to the tree it is standing in. Commit
the whole change set — including a file that was never authorised — and:

```
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/d5
revision=3c97b9f7456ace4511a44d32e996119075f5c6c6
changed_files=0
  (exit 0)
```

`git show --stat HEAD` on that same revision lists `unrelated.py` and `a.txt`. The state recorded a baseline at
`4ee3291a9cd3`; `check` compared that to nothing. In R2 the new budget check reports `diff=0 file(s),0 added line(s)`
on the same tree.

## 2. How to read the evidence

Each block is the exact `$ command` followed by the output it produced, copied from the transcripts in
`/tmp/pe-defeat/out/` (`A.txt`, `B.txt`, `B2.txt`, `C.txt`, `D.txt`, `E.txt`, `R2.txt`, `R2b.txt`). Repetitive
boilerplate (`ok  gate.falsifier-after-recorded: …`) is elided in some transcripts; nothing else is. Where a scenario
first shows a "control" (the same tree refused) and then the mutation, the difference between the two is the finding.
Environment and artifact identity are pinned in section 0; a finding is only claimed for the revision whose hash is
quoted in it.

## 3. Routes to PASS with an obligation unmet

Fifteen independent routes, all observed:

1. F1 state written by hand — no command ever run (3.1)
2. F2 stale record made current by a hand-computed digest (3.2)
3. F3 authorised scope rewritten after the fact (3.3)
4. F4 committed change set invisible to `check` (3.4)
5. F5 fix reverted after the record was written (3.5)
6. F6 falsifier unrelated to the change, identical output (3.6)
7. F7 phases recorded in reverse order (3.7)
8. F8 files hidden from `git status` — four mechanisms (3.8)
9. F9 root directory named `pe-gate/` exempt from the scope check (3.9)
10. F10 failing `git status` silently means "nothing changed" (3.10)
11. F11 directory named `src -> src` defeats the rename split (3.11)
12. F12 the scope check reads a mis-sliced filename (3.12)
13. F13 `--authorised '*'` authorises everything (3.13)

That is 13 headings and 15 routes: 3.8 carries four mechanisms and 3.4 was demonstrated twice (committing the work, and
committing it under a wired hook).

### 3.1 F1 — the state can be written by hand; no command is ever run

Obligation under attack: baseline + falsifier + record are *recorded*; the record is what the reviewer trusts.

Attack — a fresh repo, then `.pe-gate/` typed out by hand. The tool is never invoked to produce any of it:

```
$ mkdir -p .pe-gate
$ python3 - <<'EOF'   # writes baseline.json, falsify.json, dod.json verbatim, then the record's digest
… digest = hashlib.sha256(json.dumps([base, fals, dod], sort_keys=True).encode()).hexdigest()
EOF
hand-computed digest = 898adc08b5103df488d46d9f1d4ec30e917cd496f9fa37dc711da548f1cfe49d
$ ls .pe-gate
baseline.json
dod.json
falsify.json
record.md
$ git status --porcelain
?? .pe-gate/
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/b1
revision=f8f3d1182b3ff39b850a31ae6725a1bf2995ee60
changed_files=1
  (exit 0)
```

The forged record as the gate will quote it:

```
$ sed -n '1,3p;9,11p' .pe-gate/record.md
# Completion record (generated by pe_gate.py)

state digest: 898adc08b5103df488d46d9f1d4ec30e917cd496f9fa37dc711da548f1cfe49d
```

Why it works (INSPECTED, R1 lines): `state_digest` (122–127) hashes only the three JSON files the tool itself writes;
nothing records who wrote them, when, or that any command ran. Every field the gate tests is a field the forger
chooses: `baseline.root` must equal the workspace (237–239), `before.exit != 0` and `after.exit == 0` (250–255), and
`before.revision == baseline.revision` (256–259) — the last is the one check that pretends to bind the record to a
tree, and it compares two values that both come from the forged file. The `output_sha256` fields are never compared to
anything, so the forger wrote `"0"*64` in both.

Smallest fix: 8.1.

### 3.2 F2 — a stale record is made current by a hand-computed digest

Obligation under attack: an answered DoD item must not be changeable after the record is written.

Attack — answer everything, write the record, then change an answer and repair the digest by hand:

```
$ python3 pe_gate.py dod --item dod.1 --answer "changed my mind after the record was written"
ok  gate.dod-recorded: dod.1
$ python3 pe_gate.py check
REFUSED
- gate.record-stale: the completion record was written before the state changed: regenerate it with `pe_gate.py record`
  (exit 2)
$ python3 - <<'EOF'   # sha256 over the same three loaded objects, re.sub into record.md
pasted digest: fcee0fd13246ebfb76ae5944afa247b7687b55632e5c3934325f1cebb9db35de
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/b5
revision=0f179c226fca1a31307d7d45dd51ad00501275e8
changed_files=2
  (exit 0)
```

The digest is 6 lines of ordinary Python away from being forgeable — it is `sha256(json.dumps([baseline, falsify,
dod], sort_keys=True))` over plain files (R1 122–127), and `record` writes exactly the JSON it later reloads
(`json.dumps(..., indent=2, sort_keys=True)`, R1 104–106), so a forger can reproduce the serialisation byte for byte.
The check is a single regex, `re.search(r"state digest: ([0-9a-f]{64})", text)` (R1 280), so the digest may sit in a
record that says anything else at all.

Smallest fix: 8.2.

### 3.3 F3 — the authorised scope is rewritten after the fact

Obligation under attack: "every changed file is inside the authorised scope" — for the scope recorded *before* the
first write.

Attack — complete the ritual honestly, then widen the scope in `baseline.json`:

```
$ git status --porcelain
?? .pe-gate/
?? unrelated.py
$ python3 pe_gate.py check
REFUSED
- gate.scope-outside-authority: unrelated.py changed but is not in the authorised scope and is not a named exception
  (exit 2)
$ python3 - <<'EOF'   # edit baseline.json
authorised is now ['a.txt', 'unrelated.py']
$ python3 pe_gate.py check
REFUSED
- gate.record-stale: the completion record was written before the state changed: …
  (exit 2)
pasted digest: 2df6e418ed773ee545e4da06872633e131a63f205c9f3fc96be3978f00f4cc56
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/e9
revision=aa9f571e9c65acc716f78cbf32ffb238acb04c87
changed_files=2
  (exit 0)
```

The digest does cover `baseline.json`, so the edit invalidated the record — for as long as it takes to recompute the
digest (3.2). Note for anyone reproducing this by hand: `json.dumps(..., indent=2)` puts each array element on its own
line, so a one-line `sed` over `"authorised": [...]` silently does nothing; the edit must go through a JSON parse.

Smallest fix: 8.1, 8.2.

### 3.4 F4 — committed changes are invisible: PASS on a diff nobody authorised

Obligation under attack: every changed file accounted for, inside the authorised scope.

Attack — complete the ritual, then commit an out-of-scope file along with the change:

```
$ python3 pe_gate.py check          # control: the same file, uncommitted
REFUSED
- gate.scope-outside-authority: unrelated.py changed but is not in the authorised scope and is not a named exception
  (exit 2)
$ git add -A
$ git commit -q -m "the out-of-scope file, committed"
$ git status --porcelain
$ git rev-parse HEAD
ee9ec866f031ca154170ebafd4fa9e81967fffc7
$ python3 -c "…print(json.load(open('.pe-gate/baseline.json'))['revision'])"
ce2b0b9e39abc9e4b459fd41288af2839a5eb62f
$ diff <(baseline revision) <(HEAD)
  DIFFERENT -- and check raises no finding about it
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/a3
revision=ee9ec866f031ca154170ebafd4fa9e81967fffc7
changed_files=0
  (exit 0)
```

The same escape under a *wired* hook, in the hook's own repository:

```
$ git show --stat --oneline HEAD
3c97b9f the unauthorised file, committed under a wired hook
 .pe-gate/baseline.json |  11 ++
 .pe-gate/dod.json      |  20 +++
 .pe-gate/falsify.json  |  21 +++
 .pe-gate/record.md     |  23 ++++
 a.txt                  |   2 +-
$ python3 pe_gate.py check
PASS
…
changed_files=0
  (exit 0)
```

Why it works (INSPECTED): `changed_paths` (R1 67–87) asks `git status --porcelain`, which reports the *worktree and
index* against HEAD — never HEAD against the baseline. The baseline revision is recorded (R1 145–148) and is only ever
compared to the falsifier's `before` revision (R1 256–259), never to the current HEAD. So "nothing changed" and "the
commit is where the changes went" are the same observation.

Smallest fix: 8.3.

### 3.5 F5 — the recorded fix can be reverted; PASS does not bind to the tree

Obligation under attack: the falsifier is a live observation that the defect is gone — `after` exits 0.

Attack — run the honest ritual, then throw the fix away:

```
$ python3 pe_gate.py check          # done honestly: PASS expected here
REFUSED … (see 4.1: this is the tool's own parsing bug, not the attack) …
$ git checkout -- a.txt
$ git status --porcelain
?? .pe-gate/
$ cat a.txt
VALUE = 1
$ python3 check.py
  (exit 1 = the recorded 'after' check is now red again)
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/a4
revision=f8f3d1182b3ff39b850a31ae6725a1bf2995ee60
changed_files=1
  (exit 0)
```

`check` re-runs nothing: the falsifier is read out of `falsify.json`, and `after.exit` is a number a previous invocation
wrote (R1 253–255). A developer can also reach this state without touching the tree — the record outlives the change it
describes. The task brief's "can a stale record be made to look current?" has two answers: yes by editing the state
(3.2), and yes by changing the code underneath it (this section).

Smallest fix: 8.4.

### 3.6 F6 — a falsifier that has nothing to do with the change, with identical output

Obligation under attack: "Demonstrate the defect before you correct it, with the identical command on both sides" and
"an after run that still fails is refused" — i.e. the pair must be red-then-green *about the change*.

Attack — nothing in the repository is ever modified; the falsifier watches a file outside the repo:

```
$ python3 pe_gate.py falsify --label t --cmd "test -e /tmp/pe-defeat/FLAG" --phase before
ok  gate.falsifier-before-recorded: label=t exit=1 … output_sha256=e3b0c44298fc1c14
$ python3 pe_gate.py falsify --label t --cmd "test -e /tmp/pe-defeat/FLAG" --phase after
ok  gate.falsifier-after-recorded: label=t exit=0 … output_sha256=e3b0c44298fc1c14
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/b3
revision=705908867de1c9ab5dea37a654664636abd47933
changed_files=1
  (exit 0)
$ git status --porcelain     # the only "change" in the tree is the state directory
?? .pe-gate/
```

Two things are being demonstrated at once. First, the gate accepts a falsifier that never touches the repository, so
"the requested outcome is satisfied" is checked by nothing. Second, both runs produced byte-identical, empty output —
and the recorded `output_sha256` for both phases is `e3b0c44298fc1c14…`:

```
$ printf '' | sha256sum
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  -
```

that is the digest of the empty string. "Identical output on both sides" is not merely tolerated, it is recorded and
never compared (R1 169–172 store `output_sha256`; nothing in `findings` reads it).

Smallest fix: 8.4.

### 3.7 F7 — the two phases recorded in reverse order

Obligation under attack: `before` is the pre-change observation, `after` the post-change one.

Attack — record `after` while the check is green, wait two seconds, then record `before` while it is red:

```
$ python3 pe_gate.py falsify --label t --cmd "test -e /tmp/pe-defeat/FLAG" --phase after
ok  gate.falsifier-after-recorded: label=t exit=0 …
$ sleep 2
$ python3 pe_gate.py falsify --label t --cmd "test -e /tmp/pe-defeat/FLAG" --phase before
ok  gate.falsifier-before-recorded: label=t exit=1 …
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/b4
revision=c5f9f844505da06e25e1b2a744e6a325bc67ded8
changed_files=1
  (exit 0)
$ python3 -c "…print the recording times…"
before at 2026-10-15T12:23:52+00:00
after  at 2026-10-15T12:23:50+00:00
```

`at` is stamped on both runs (R1 170) and never compared; `revision` is compared only for `before`, and against the
baseline rather than against the order of events (R1 256–259). The only temporal claim the gate makes — that the
defect was demonstrated *before* it was corrected — is unenforced.

Smallest fix: 8.4.

### 3.8 F8 — four ways to make a changed file invisible to `git status`

Obligation under attack: every changed file accounted for. `changed_paths` is `git status --porcelain` and nothing
else, so anything that removes a path from that output removes it from the audit. Each of these was run on a repo that
was otherwise green, with the in-scope file staged so that 4.1's slicing bug cannot contribute the refusal:

(a) a pre-existing `.gitignore` rule:

```
$ printf 'build/\n' > .gitignore && git commit -q -m "a build/ rule that predates the task"
$ mkdir -p build && printf 'sneaky = True\n' > build/unrelated.py
$ git status --porcelain
M  a.txt
?? .pe-gate/
$ ls -l build/unrelated.py
-rw-rw-r-- 1 socraticblock socraticblock 14 … build/unrelated.py
$ python3 pe_gate.py check
PASS … changed_files=2 (exit 0)
```

(b) `.git/info/exclude` — and here the concealment is invisible too:

```
$ printf 'unrelated.py\n' >> .git/info/exclude
$ printf 'sneaky = True\n' > unrelated.py
$ git status --porcelain
M  a.txt
?? .pe-gate/
$ ls -l unrelated.py
-rw-rw-r-- 1 socraticblock socraticblock 14 … unrelated.py
$ git check-ignore -v unrelated.py
.git/info/exclude:7:unrelated.py	unrelated.py
$ python3 pe_gate.py check
PASS … changed_files=2 (exit 0)
```

`.git/info/exclude` lives inside `.git`, so editing it is not itself a changed path: unlike (a), the record shows no
trace that an ignore rule was added. The same is true of every repository-configuration escape below.

(c) `status.showUntrackedFiles=no`:

```
$ git config status.showUntrackedFiles no
$ printf 'sneaky = True\n' > unrelated.py
$ git status --porcelain
M  a.txt
$ ls -l unrelated.py
-rw-rw-r-- 1 socraticblock socraticblock 14 … unrelated.py
$ python3 pe_gate.py check
PASS … changed_files=1 (exit 0)
```

(d) `update-index --assume-unchanged` on an out-of-scope *tracked* file:

```
$ printf 'guard = 666\n' > b.txt
$ git update-index --assume-unchanged b.txt
$ git status --porcelain
M  a.txt
?? .pe-gate/
$ cat b.txt
guard = 666
$ python3 pe_gate.py check
PASS … changed_files=2 (exit 0)
```

Four mechanisms, one root cause: the audit surface *is* `git status`, so an attacker who can shape what `git status`
prints controls the audit. Two of the four (b, c) leave no trace at all in anything the gate reads.

Smallest fix: 8.3 (audit against the baseline revision, not against the worktree).

### 3.9 F9 — any root directory named `pe-gate/` is outside the scope check

Obligation under attack: every changed file is inside the authorised scope or a named exception.

Attack — the state directory is skipped by *name*, so take the name:

```
$ mkdir -p pe-gate && printf 'sneaky = True\n' > pe-gate/unrelated.py
$ git status --porcelain
M  a.txt
?? .pe-gate/
?? pe-gate/
$ ls -l pe-gate/unrelated.py
-rw-rw-r-- 1 socraticblock socraticblock 14 … pe-gate/unrelated.py
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/e1
revision=0ba6aca8f27cce1851de3b01c8b520465b676cdb
changed_files=3
  (exit 0)
```

`state_forms = {".pe-gate", "pe-gate"}` (R1 267) and a path whose first component is in that set is skipped before the
scope test (R1 268–271). The exemption exists so the tool's own state does not count as the task's diff; it is granted
to any path, so an unauthorised directory named `pe-gate` — or a root *file* named `pe-gate`, via the `path in
state_forms` clause — is audited by nothing. R2 keeps the first-component skip (`pe_gate.py:397–401`).

Smallest fix: 8.5.

### 3.10 F10 — a failing `git status` silently means "nothing changed"

Obligation under attack: every changed file accounted for.

Attack — break the index, keep the change:

```
$ printf 'sneaky = True\n' > unrelated.py
$ git add a.txt
$ printf 'not an index at all\n' > .git/index
$ git status --porcelain
fatal: .git/index: index file smaller than expected
  (exit 128)
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/e10
revision=7f2af072f2d445f0f766a39c144a07e6fa314851
changed_files=0
  (exit 0)
```

`unrelated.py` is on disk, unstaged, and unauthorised; the gate reports `changed_files=0` and passes. Root cause:
`changed_paths` returns `[]` when `git status` fails (R1 70–71), so "I could not ask" is indistinguishable from "there
is nothing to report". Note the asymmetry with `baseline`, which does refuse when `git status --short` fails (R1
135–139) — the check is the weak end. R2 keeps both behaviours (`pe_gate.py:96–97`).

This one is worth a second, cheaper observation from R2, where the new `diff_stats` inherits the same failure:

```
$ python3 pe_gate.py check
PASS … diff=0 file(s),0 added line(s) … (exit 0)
```

Smallest fix: 8.6.

### 3.11 F11 — a directory named `src -> src` defeats the rename split

Obligation under attack: renames report both sides, so neither side can hide.

Attack — the gate splits any status line containing ` -> ` into two paths (R1 77–78). Name a directory so the split
manufactures covered paths out of an uncovered one:

```
$ python3 pe_gate.py baseline --authorised src
$ mkdir -p 'src -> src'; printf 'sneaky = True\n' > 'src -> src/e'
$ git status --porcelain
?? .pe-gate/
?? "src -> src/"
$ find . -name e -not -path './.git/*'
./src -> src/e
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/e6
revision=6e584095d588a1d10610936754c307dcbc9b8913
changed_files=2
  (exit 0)
```

The real path is `src -> src/e` — a directory whose name is not `src`. The gate never checks that string: it splits the
reported name at ` -> ` and tests `src` and `src` (trailing slash stripped, R1 82–84), both covered by the authorised
entry `src`. Renames are also why the ` -> ` handling exists at all; a structural parse (`-z` output, or
`git status --porcelain=v2`) removes the ambiguity instead of guessing at it.

Smallest fix: 8.6.

### 3.12 F12 — the scope check reads a filename nobody wrote

Obligation under attack: "every changed file is inside the authorised scope".

Attack — authorise a path that does not need to exist, then change a *different* file whose mis-sliced name lands on it:

```
$ python3 pe_gate.py baseline --authorised vil.py
$ printf 'quiet = 666\n' > evil.py
$ git status --porcelain
 M evil.py
?? .pe-gate/
$ cat evil.py
quiet = 666
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/e8
revision=57c40169fda6bfa63cce38608a88103a9e2e6f1e
changed_files=2
  (exit 0)
$ git add evil.py            # the same change, staged
$ git status --porcelain
M  evil.py
?? .pe-gate/
$ python3 pe_gate.py check
REFUSED
- gate.scope-outside-authority: evil.py changed but is not in the authorised scope and is not a named exception
  (exit 2)
```

`changed_paths` returns `vil.py` for a repository containing only `evil.py`, because the first line of `git status
--porcelain` has its first character eaten (4.1). Whether an out-of-scope edit is caught therefore depends on a
one-character shift: unstaged it is invisible, staged it is refused. Section 4.1 is the root cause; it is listed here
as an attack because it is one.

Smallest fix: 8.6.

### 3.13 F13 — `--authorised '*'` authorises everything

Obligation under attack: "name the files or directories this task authorises".

Attack — one glob entry, and the scope check has nothing left to say:

```
$ python3 pe_gate.py baseline --authorised '*'
$ printf 'sneaky = True\n' > unrelated.py
$ mkdir -p src_new/deep; printf 'more\n' > src_new/deep/other.py
$ git status --porcelain
?? .pe-gate/
?? src_new/
?? unrelated.py
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/c2
revision=2cc0761c592153e587888dbd42a9bb3562ba7c62
changed_files=3
  (exit 0)
```

`covers` falls through to `fnmatch` whenever the entry contains `*` or `?` (R1 116–118), and `fnmatch`'s `*` crosses
`/`:

```
$ python3 -c "import pe_gate; print(pe_gate.covers('*','a.txt'))"
True
$ python3 -c "import pe_gate; print(pe_gate.covers('.','a.txt'))"
False
```

So `*` is a whole-workspace authorisation, and `src/*` is a whole-subtree one — the second is the more dangerous in
practice, because it looks narrow and reads as deliberate. The gate cannot distinguish an honest glob from a blanket
one; at minimum the baseline should record the *number* of changed-path candidates a scope admits, so a reviewer sees
"this scope admits every path in the repository" in the record rather than having to reason about `fnmatch`.

Smallest fix: 8.5.

## 4. Honest work refused

The gate is meant to refuse dishonest work; these cases refuse work that satisfies every obligation. Two are the same
root cause (a file is reported under a name that does not exist) and one is a documented-looking scope spelling that
does not work.

### 4.1 G1 — the leading-space slice: the root cause, and why the test suite cannot see it

`run()` does `out = (proc.stdout + proc.stderr).strip()` (R1 53). `.strip()` removes the leading whitespace of the
*whole* output, which is the leading space of the *first line* of `git status --porcelain` — the index-status column of
a worktree-modified entry. `changed_paths` then slices a fixed three characters off every line (R1 74). The first line
therefore loses four characters instead of three.

Demonstration:

```
$ printf 'z = 2\n' > z_tracked.txt
$ git status --porcelain | od -c | head -3
0000000       M       z   _   t   r   a   c   k   e   d   .   t   x   t
0000020  \n   ?   ?       u   n   t   r   a   c   k   e   d   .   p   y
0000040  \n
$ python3 -c "import pe_gate; print(pe_gate.changed_paths(Path('$PWD')))"
['_tracked.txt', 'untracked.py']
```

`z_tracked.txt` exists and is modified; the tool's own view of the changed paths is `_tracked.txt`. The same thing
happens to any honest developer who edits a tracked file and leaves it unstaged — and it is not about `.pe-gate/`
appearing first: tracked entries are emitted before untracked ones, so the first line is the first worktree-modified
tracked file:

```
$ printf '.pe-gate/\n' > .gitignore && git commit -q -m "the tool's own advice"
$ python3 pe_gate.py baseline --authorised a.txt,check.py
$ python3 pe_gate.py falsify --label t --cmd "python3 check.py" --phase before    # exit 1
$ printf 'VALUE = 2\n' > a.txt
$ python3 pe_gate.py falsify --label t --cmd "python3 check.py" --phase after     # exit 0
$ python3 pe_gate.py record
$ git status --porcelain
 M a.txt
$ python3 pe_gate.py check
REFUSED
- gate.scope-outside-authority: .txt changed but is not in the authorised scope and is not a named exception
  (exit 2)
$ ls -l .txt
ls: cannot access '.txt': No such file or directory
```

The file named in the refusal does not exist. The developer's work is inside the authorised scope (`a.txt`), the fix is
in place, the falsifier flipped — and the gate refuses, naming `.txt`.

Staging the same change removes the leading space, and the refusal disappears — the same work, the same tree, a
different verdict (this is why several scenarios in section 3 stage the in-scope file: the result must not be
attributable to this bug):

```
$ git add a.txt
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/b5
revision=0f179c226fca1a31307d7d45dd51ad00501275e8
changed_files=2
  (exit 0)
```

For comparison, the same repository one command earlier refuses (section 3.2's first check, `REFUSED …
gate.scope-outside-authority: .txt …`), and in R2 the staged/unstaged pair shows the same switch (section 9, probe 1).

Why the suite is green. I mutated one line of the reviewed suite's happy path so that a *tracked, authorised* file is
left edited and unstaged:

```
$ cp tests_pe_gate.py mut/tests_mut.py            # same 15 tests, one line added
+       (self.repo / "app.py").write_text("VALUE = 2\n", encoding="utf-8")  # MUTATION
$ python3 tests_mut.py
AssertionError: 2 != 0 : REFUSED
- gate.scope-outside-authority: pp.py changed but is not in the authorised scope and is not a named exception
Ran 15 tests …
FAILED (failures=1)
```

`pp.py` is the mis-sliced `app.py`, and the *authorised* file is what got refused. The suite's fixtures never leave a
tracked file edited and unstaged at check time (the flag file that drives its falsifier lives *outside* the repository —
tests_pe_gate.py:31–37 says so explicitly, and the comment at 30–32 explains that the choice was made to stop the gate
refusing its own test). The mutation shows the consequence: the fixture design hides the defect, so 15/15 green is
evidence about the fixtures, not about the parser.

Two smaller consequences of the same line, both VERIFIED:

- `run()` concatenates stderr into the parsed stream, so any warning git writes to stderr is parsed as a changed path.
- The same `.strip()` is what makes the check order-dependent: the verdict for one unchanged repository can differ
  between two runs if the set of *other* dirty files changes which line is first. INFERRED from the code path (R1 53,
  74); I did not construct the two-run demonstration.

Smallest fix: 8.6 (this is the highest-value two-line change in the file).

### 4.2 G2 — `.` does not authorise the tree

Obligation under attack: none; this is a legitimate reading of "the files or directories this task authorises".

```
$ python3 pe_gate.py baseline --authorised .
$ printf 'VALUE = 2\n' > a.txt
$ git add a.txt
$ git status --porcelain
M  a.txt
?? .pe-gate/
$ python3 pe_gate.py check
REFUSED
- gate.scope-outside-authority: a.txt changed but is not in the authorised scope and is not a named exception
  (exit 2)
$ python3 -c "import pe_gate; print(pe_gate.covers('.', 'a.txt'))"
False
```

`covers` tests `entry == path` and `path.startswith(entry + "/")` (R1 111–115); with `entry = "."` that asks whether the
path starts with `./`, and git never prints a leading `./`. A developer who records `.` — the obvious spelling for "this
whole workspace" — is refused on every file. Not fail-open, but it is a false refusal built into the most likely
spelling of a wide scope, and it is invisible until the gate is run.

Smallest fix: 8.5.

### 4.3 G3 — non-ASCII and quoted paths

Obligation under attack: none; the developer named the file correctly.

```
$ printf 'cafe = 2\n' > "café.txt"
$ python3 pe_gate.py baseline --authorised café.txt
$ git status --porcelain
 M a.txt
 M "caf\303\251.txt"
?? .pe-gate/
$ python3 pe_gate.py check
REFUSED
- gate.scope-outside-authority: .txt changed but is not in the authorised scope and is not a named exception
- gate.scope-outside-authority: caf\303\251.txt changed but is not in the authorised scope and is not a named exception
  (exit 2)
```

(Two findings: the first is the 4.1 mis-slice, the second is the escaping bug this section is about.)

`changed_paths` strips the surrounding quotes but never decodes git's octal escaping (R1 82), so the recorded authorised
entry `café.txt` can never match the reported `caf\303\251.txt`. Fails closed, so it is a usability defect rather than
a hole — but it is a refusal an honest developer cannot clear except by re-spelling their filename in escapes. The
ordinary fix is to stop asking git to escape (`-c core.quotePath=false`) and to stop hand-parsing the porcelain format.

Smallest fix: 8.6.

### 4.4 G4 — a submodule change is reported as `ub`

```
$ python3 pe_gate.py baseline --authorised a.txt,check.py
$ git add a.txt
$ git submodule add /tmp/pe-defeat/e11-sub sub      # needs -c protocol.file.allow=always in git 2.43
$ printf 'sneaky = True\n' > sub/unrelated.py
$ git status --porcelain
 M sub
?? .pe-gate/
$ git -C sub status --porcelain
?? unrelated.py
$ python3 pe_gate.py check
REFUSED
- gate.scope-outside-authority: ub changed but is not in the authorised scope and is not a named exception
  (exit 2)
```

The refusal is right and the name is wrong: the change is inside `sub`, reported as `ub` (4.1 again). The substantive
answer to the brief's submodule question is in 7 (negative results): a superproject cannot see a change inside an
uninitialised submodule at all, and sees an initialised one only as `M sub` — one entry, no path inside it. A submodule
entry in the authorised scope therefore authorises everything inside that submodule, which is the same
directory-authorises-contents rule as everywhere else, and no *finer* audit is available from the superproject.

Smallest fix: 8.6, and 8.3 for the audit surface.

### 4.5 G5 — the hook blocks a commit when the tool is not at `scripts/pe_gate.py`

Obligation under attack: none.

```
$ python3 pe_gate.py install-hook
ok  gate.hook-installed: /tmp/pe-defeat/d4/.githooks/pre-commit
note: `git config core.hooksPath .githooks` makes git use it
$ git config core.hooksPath .githooks
$ git add -A
$ git commit -m "tool lives elsewhere"
python3: can't open file '/tmp/pe-defeat/d4/scripts/pe_gate.py': [Errno 2] No such file or directory
  (commit exit 1)
```

The hook hard-codes a relative path, `exec python3 scripts/pe_gate.py check` (R1 311–315). In the artifact's own layout
the tool lives at `build/scripts/pe_gate.py`, so a repository that adopts this hook without vendoring the file at
`scripts/` gets a hook that cannot run: it blocks every commit (fail-closed, which is the right direction) with a
Python error that reads as a broken hook rather than as an unmet obligation. See section 5.

Smallest fix: 8.7.

## 5. The hook

Question asked: does `install-hook` produce something that actually blocks a commit, and what is its bypass surface?

Does it block? **Not by default.** `install-hook` writes the file and prints the `core.hooksPath` command as a note;
it does not set the config (R1 318–326). In a repository that satisfies nothing:

```
$ python3 pe_gate.py install-hook
ok  gate.hook-installed: /tmp/pe-defeat/d1/.githooks/pre-commit
note: `git config core.hooksPath .githooks` makes git use it
$ ls -l .githooks/pre-commit
-rwxr-xr-x 1 socraticblock socraticblock 237 … .githooks/pre-commit
$ git config --get core.hooksPath || echo '(unset)'
(unset)
$ git commit -m "no baseline, no falsifier, no dod, no record"
  (exit 0)
$ git log --oneline
94b7268 no baseline, no falsifier, no dod, no record
bd366fc base
```

So the default install leaves `.githooks/pre-commit` sitting in the tree, executable, inert — and the commit lands
with the gate's own file in the diff, which is worse than no hook: the repository now looks gated.

When it is wired up manually, it does refuse:

```
$ git config core.hooksPath .githooks
$ git commit -m "still nothing satisfied"
REFUSED
- gate.baseline-missing: no baseline recorded: run `pe_gate.py baseline --authorised ...` before writing
  (commit exit 1)
$ git log --oneline
bd366fc base
```

Bypass surface, observed and inferred:

1. `git commit --no-verify` — VERIFIED, works, and is documented by the doctrine as "a recorded act, not a silent one"
   (SKILL.md line 63). It is not recorded by anything in this tool.

```
$ git commit --no-verify -m wip
  (exit 0)
```

2. The hook cannot see what it is committing as a change set: it runs `check`, which audits the worktree only. Committing
   is itself the evasion (3.4), so the hook does not stop the out-of-scope file — it stops the *first* attempt and
   permits the same content one command later, or immediately under `--no-verify`.
3. Path/tooling assumptions: relative `scripts/pe_gate.py` (4.5), and `python3` from `PATH` rather than `sys.executable`
   or a pinned interpreter — if the repository's PATH resolves `python3` to something else, the hook runs a different
   interpreter with the repository's working directory as CWD. INFERRED (I did not construct a hostile PATH; constructing
   one in a throwaway repo is cheap if the author wants it VERIFIED).
4. Any escape in 3.8 makes the hook pass while an unauthorised file sits in the tree, because the hook is exactly
   `check`.

The smallest change that makes the default install honest is to set `core.hooksPath` (or install to `.git/hooks/pre-commit`)
and to refuse to install a hook whose target path does not exist relative to the repository root; then `--no-verify` is
the only bypass, which is the one the doctrine already names and accepts.

## 6. Crashes instead of attributions

Three shapes, all observed, all exit 1 with a traceback on stderr instead of a named finding on stdout. Each is
reachable from a state file that is valid JSON of the wrong shape — which is what a partly-written state looks like
after an interrupted run, and what a hostile hand writes.

```
$ printf '[]' > .pe-gate/falsify.json
$ python3 pe_gate.py check
Traceback (most recent call last):
  …
  File "pe_gate.py", line 241, in findings
    live_labels = [l for l, e in fals.items() if …]
AttributeError: 'list' object has no attribute 'items'
  (exit 1)

$ printf '"a string"' > .pe-gate/baseline.json
$ python3 pe_gate.py check
Traceback (most recent call last):
  …
  File "pe_gate.py", line 237, in findings
    if base.get("root") != str(root):
AttributeError: 'str' object has no attribute 'get'
  (exit 1)
```

and on R2, from the same class of input:

```
$ python3 pe_gate.py check          # a hand-written falsify.json without R2's new tests_digest field
Traceback (most recent call last):
  …
  File "pe_gate.py", line 378, in class_findings
    seen = {r["tests_digest"] for r in entry.get("runs", {}).values()}
KeyError: 'tests_digest'
  (exit 1)
```

Assessment. The direction is fail-closed: exit 1 stops a commit, and `run()` catches only `ValueError`/`OSError` when
loading (R1 96–101), so a *malformed* file is treated as absent, but a *well-formed file of the wrong shape* is not
validated at all. The consequence is a gate whose failure mode is an unattributed traceback — the reviewer cannot tell
"refused because X" from "crashed". Given the doctrine's own standard ("`check` exits 2 and names every unmet
obligation"), a crash is not a refusal: it is a fourth exit code nobody documented, and every one of these inputs
should be a named finding. The smallest fix is a shape check at load time — `isinstance(payload, dict)` returning a
`gate.state-unreadable` finding (8.2).

## 7. Negative results — attempts that failed

A clean negative is a result, and several of the gate's defences held. Listed with the command that showed it.

**N1. State copied to a different workspace is refused.** The one binding check that works:

```
$ cp -r /tmp/pe-defeat/b2 /tmp/pe-defeat/b2-reuse && cd /tmp/pe-defeat/b2-reuse
$ rm -rf .git && git init -q . && git commit -q -m "a new repository that never saw the ritual"
$ python3 pe_gate.py check
REFUSED
- gate.baseline-other-workspace: the baseline names /tmp/pe-defeat/b2, not this workspace /tmp/pe-defeat/b2-reuse
  (exit 2)
```

`baseline.root` is compared against the resolved workspace root (R1 237–239). But this is a string comparison against a
field the author can edit, and a digest that can be recomputed (3.2, 3.3) — and it does not fire when the state is
reused at the *same* path, which is the realistic case (3.4, 3.5). So: copied state across paths is refused; copied state
reused in place is accepted.

**N2. A pre-change run that already passes is refused.** `gate.falsifier-not-flipped` (observed while I was building the
harness, before I had a falsifier that was genuinely red), and in R2 as `gate.evidence-not-demonstrated`.

**N3. Changing the command between phases is refused.** `gate.falsifier-command-changed` (R1 165–168); the suite covers
it and passes.

**N4. An `after` run that still fails is refused.** `gate.falsifier-still-failing` (R1 253–255); suite-covered and green.

**N5. A `before` run made off the recorded baseline revision is refused.** `gate.falsifier-not-on-baseline` (R1 256–259);
suite-covered (`test_a_before_run_made_after_the_fix_was_committed_is_refused` passes in the 15/15 run). This is the
gate's only tree-binding check and it is a comparison of two values inside the same forgeable file (3.1).

**N6. An unanswered DoD item, and an NA item with a blank reason, are refused.** `gate.dod-unanswered`,
`gate.dod-na-without-reason` (R1 260–265); suite-covered.

**N7. An *uncommitted* out-of-scope file is refused.** The control in 3.4: `gate.scope-outside-authority`. The gate
catches the honest-looking version of the violation; it is the commit and the four concealment mechanisms of 3.8 that
walk past it.

**N8. A rename out of the authorised scope is refused, both sides named.**

```
$ git mv secret.py src/secret.py
$ python3 pe_gate.py check
REFUSED
- gate.scope-outside-authority: secret.py changed but is not in the authorised scope and is not a named exception
- gate.scope-outside-authority: src/secret.py changed but is not in the authorised scope and is not a named exception
  (exit 2)
```

**N9. Deleting an unauthorised file is refused.** ` D secret.py` → `gate.scope-outside-authority: secret.py`. Deletions
are not a hiding place.

**N10. A newly added directory is refused when it is not authorised.** `?? src/` → a finding naming `src`. Adding files
*inside* an authorised directory is allowed, which is the intended reading of a directory entry (and is why the glob
findings in 3.13 and 3.11 matter: they widen what a directory entry means).

**N11. A staged out-of-scope edit is refused** — and it is precisely the case the self-slicing bug in 4.1 turns into a
pass (3.12). Recorded here as evidence that the gate's *intent* works when the parser happens to line up.

**N12. A stale `.git/index.lock` does not break `git status` here.**

```
$ : > .git/index.lock
$ git status --porcelain
 M a.txt
?? .pe-gate/
?? unrelated.py
  (exit 0)
```

git 2.43 answered normally, so the obvious "make status fail" route (and therefore the `[]`-on-failure hole in 3.10) was
not reachable this way. Corrupting the index itself *is* reachable (3.10).

**N13. The hook refuses a commit when it is wired up** — `REFUSED / gate.baseline-missing / (commit exit 1)`; see
section 5. The failure is that it is not wired up by default.

**N14. A symlink inside an authorised directory does not evade the path audit.**

```
$ ln -s /tmp/pe-defeat/outside-target src/link
$ ls -l src/link
lrwxrwxrwx 1 socraticblock socraticblock 29 … src/link -> /tmp/pe-defeat/outside-target
$ python3 pe_gate.py check
PASS … (exit 0)
```

The symlink is covered by the authorised entry `src`, which is correct — it is a file in `src`. The gap is different and
smaller than the brief's hypothesis: the gate models repository paths only, so the *target* of a symlink (here, a path
outside the workspace) is outside its world entirely; a change made through that link is not a changed file. I did not
find a way to use a symlink to hide a *repository* path change.

**N15. A submodule change is not invisible — it is coarsely visible.** The superproject reports ` M sub` (one entry,
naming the directory), so an unauthorised edit inside a submodule is refused, with a mangled name (4.4). What the gate
cannot do is see *which* file inside the submodule changed; that audit belongs to the submodule's own gate. UNVERIFIED:
whether an *uninitialised* submodule hides its contents entirely — my attempt to add a submodule at all needed
`-c protocol.file.allow=always` and the uninitialised case went untested (the first attempt failed with
`fatal: transport 'file' not allowed`).

**N16. `--no-verify` bypasses the hook** — expected, documented by SKILL.md, and not counted as a finding.

## 8. Root causes and the smallest fixes

Six root causes account for all 15 PASS routes and all 5 false refusals. Each fix below is the smallest change that
closes the named findings; I have not applied any of them (the artifact is read-only to me).

**8.1 — Fix for F1/F3 (hand-written state, rewritten scope): the state is unauthenticated.**
The digest is an integrity check over three files, and it is reproducible by anyone who can read `record`'s output.
Smallest honest fix, in order of cost:
(a) relabel it. The record should say `state digest (integrity only, not authenticity): …`, and the doctrine should
    stop implying that a stored state is evidence of the work. Zero code risk, and it is what the doctrine's own
    standard ("the transcript must contain it") actually asks for.
(b) make the digest an HMAC keyed by a key file *outside* the workspace (`~/.config/pe-gate/key`, mode 0600, generated on
    first use). That converts "forge the state" into "forge the state and read a file outside the repository", which is
    a real boundary, needs no network and no secret in the repo.
Independently: the record must quote the recorded *commands* verbatim (it already prints the command line for each
falsifier phase), so that a reviewer has something to re-run rather than a hash to trust.

**8.2 — Fix for F2 and the crashes: validate shape, and put the record inside the digest's story.**
`load` must check `isinstance(payload, dict)` and return a named finding (`gate.state-unreadable: falsify.json is a
list`) rather than handing a list to `.items()` (R1 96–101 rejects malformed JSON but not wrong-shaped JSON). Two lines,
and it closes all three crash shapes in section 6. For the record itself: either HMAC the digest (8.1b) or include the
record body in the digest domain — otherwise "paste the recomputed digest" is always available (3.2).

**8.3 — Fix for F4 and F8: bind the audit to the baseline revision, and never confuse "failed" with "empty".**
This is the single highest-value fix. Today the audit surface is `git status --porcelain` — the worktree and index
against HEAD — and the baseline revision is never compared to HEAD (R1 67–87, 237–259). Concretely:

```
paths = set(changed_paths(root))                                  # worktree + index
code, out = run(f"git diff --name-status {base['revision']} HEAD", root)   # committed range
if code != 0:
    return [("gate.audit-failed", f"cannot diff against the baseline revision: {out}")]
paths |= {line.split("\t")[-1].strip() for line in out.splitlines() if line.strip()}
```

Then every path in `paths` must be inside the authorised scope or a named exception, and the record must state the
baseline revision, the current revision and the number of paths audited. With that one change, committing the change set
(3.4) no longer removes it from the audit, `.gitignore`/`info/exclude`/`assume-unchanged` no longer hide committed
history (they still hide uncommitted edits, so this fix is necessary but not sufficient for 3.8), and the state directory
can be excluded by exact path instead of by name (8.5).

**8.4 — Fix for F5/F6/F7: the falsifier must be an observation, not a memory.**
Three mechanical additions to `findings`:
(a) re-run the recorded `after` command at the current revision and refuse if it exits non-zero
    (`gate.falsifier-after-stale`) — this is what makes PASS mean "the fix is here now", and it closes 3.5;
(b) require the two phases' `output_sha256` to *differ* (or require `before`'s exit to be reproducible on the baseline
    revision, e.g. by re-running it in a worktree at `base["revision"]`) — this closes the identical-output half of 3.6;
(c) require `at(before) <= at(after)` — one comparison, closes 3.7.
The "unrelated command" half of 3.6 needs a rule about *relevance*, and R2 already has the raw material: it records a
`tests_digest` per run (`tests_digest=none:0` in every R2 transcript above, i.e. the field exists and currently carries
no information). Requiring the test-file digest to differ between `before` and `after` would make "a test that flips for
an unrelated reason" at least require the test file to have changed — which is the obligation the doctrine is actually
trying to express.

**8.5 — Fix for F9/F13/G2: scope semantics.**
(a) `covers` must treat `.` and a trailing `/` as "everything under the root" (`entry in (".", "/", "")` → compare
    `path` against the whole tree) — the current code silently refuses `.` (4.2)
    and silently accepts `*` (3.13).
(b) at baseline time, refuse or loudly record a scope that admits every path: iterate the current changed-path
    candidates (or the tracked file list, bounded) and record "this scope admits N of M paths" in the baseline. A
    reviewer reading `authorised: ['*']` currently has no way to see that it is a blanket authorisation.
(c) the state-directory exemption must be an exact path (`root/".pe-gate"`) and the state directory's own contents must
    be checked against the known file set (`baseline.json`, `falsify.json`, `dod.json`, `record.md`), not skipped by
    first component — otherwise a directory named `pe-gate/` is a free pass for anything (3.9).

**8.6 — Fix for G1/G3/G4/F10/F11/F12: stop hand-parsing `git status`.**
The leading-space bug (4.1) is two characters of code:

```
-        return proc.returncode, (proc.stdout + proc.stderr).strip()
+        return proc.returncode, proc.stdout          # caller strips per line, after slicing
```

but the durable fix is to stop slicing fixed offsets out of a human-readable format:

```
code, out = run("git -c core.quotePath=false status --porcelain=v1 -z --untracked-files=all", root)
if code != 0:
    return None                     # NOT [] -- the caller raises gate.audit-failed
for entry in out.split("\0"):
    if not entry:
        continue
    raw = entry[3:]                 # safe: -z never quotes and never strips
```

With `-z`, paths are NUL-separated and unquoted (which also fixes the `caf\303\251.txt` refusal, 4.3), and rename
entries arrive as two NUL-separated fields, so the `" -> "` heuristic — and the `src -> src` evasion it enables (3.11) —
can be deleted rather than patched. Removing the global `.strip()` also makes the verdict independent of which dirty
file happens to be listed first.

**8.7 — Fix for G5 and section 5: install a hook that runs.**
Set `core.hooksPath` (or write to `.git/hooks/pre-commit`) instead of printing the command as a note; resolve the tool's
path at install time absolutely, and refuse to install if that path does not exist relative to the repository root;
print the note only as a fallback for a repository that wants the hooks directory checked in (in which case the missing
tool must be a *documented* pre-condition).

## 9. The artifact changed under review (R1 → R2)

While this review was running, the file at the reviewed path was rewritten. That is an identity event, so it is recorded
here rather than silently absorbed.

```
$ ls -l --time-style=full-iso /home/socraticblock/…/build/scripts/pe_gate.py /tmp/pe-defeat/tool/r1/pe_gate.py
-rw-rw-r-- 1 socraticblock socraticblock 23773 2026-10-15 16:25:30.613072419 +0400 …/build/scripts/pe_gate.py
-rw-rw-r-- 1 socraticblock socraticblock 16223 2026-10-15 16:23:53.246169305 +0400 /tmp/pe-defeat/tool/r1/pe_gate.py
$ sha256sum /home/socraticblock/…/build/scripts/pe_gate.py
2bba574efc05dd1d4980db46ac7c94b56d6e5ac1898fb5f5f24080c59e155894  (R2, 517 lines)
$ sha256sum /tmp/pe-defeat/tool/r1/pe_gate.py
1cf9849a689368318734a439804153bfa8ca10cade7bf9a55f53974a5b5e38da  (R1, 368 lines — everything above)
```

R2 is not a small edit: it adds change classes (`bugfix`, `new-behaviour`, `refactor`, `performance`, `security`,
`docs`), a three-phase falsifier (`before`, `after`, `reverted`), a diff budget (`--budget files=N,lines=M`, default
6/250, lifted by any `--budget-note`), a `tests_digest` per run and a `class_findings` layer. I re-ran the headline
attacks against R2 (`sha256 2bba574e…`, probes in `out/R2.txt` and `out/R2b.txt`). Results:

**Survives unchanged (7):**

1. The self-slicing parser (4.1). The honest unstaged bugfix is still refused with a nonexistent path, and staging the
   same change makes it pass — so it is the parser, not the work:

```
$ python3 pe_gate.py baseline --change-class bugfix --authorised a.txt,check.py
$ … falsify --phase before / after / reverted, record …
$ git status --porcelain
 M a.txt
?? .pe-gate/
$ python3 pe_gate.py check
REFUSED
- gate.scope-outside-authority: .txt changed but is not in the authorised scope and is not a named exception
  (exit 2)
$ git add a.txt
$ python3 pe_gate.py check
PASS … (exit 0)
```

   R2 still strips the whole output and still slices a fixed three characters: `pe_gate.py:80`
   (`return proc.returncode, (proc.stdout + proc.stderr).strip()`), `:99` (`raw = line[3:].strip()`).

2. Committing the change set (3.4) — PASS, and the new budget check is blind too:

```
$ git show --stat --oneline HEAD
5edc8ad everything, including the file that was never authorised
 .pe-gate/… | … 
 a.txt                  |   2 +-
 unrelated.py           |   1 +
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/r2p4b
change_class=bugfix
revision=5edc8adc7658fa9762751f0fbeb360ba2e92da36
diff=0 file(s),0 added line(s)
  (exit 0)
```

3. State written by hand (3.1). R2 requires one more field (`tests_digest`); with it, a hand-written state passes:

```
$ python3 - <<'EOF' … writes baseline/falsify/dod by hand, including tests_digest, then the record digest …
hand-written state, digest d797f6832c5087b5
$ python3 pe_gate.py check
PASS
root=/tmp/pe-defeat/r2p2b
change_class=bugfix
revision=ef1a88af96426c2e96d285f29891bc1dea534b97
diff=0 file(s),0 added line(s)
  (exit 0)
```

   Without that field R2 crashes instead (`KeyError: 'tests_digest'`, section 6).

4. The failing-status hole (3.10), including on the new `diff_stats`:

```
$ printf 'not an index at all\n' > .git/index
$ git status --porcelain
fatal: .git/index: index file smaller than expected
  (exit 128)
$ python3 pe_gate.py check
PASS … diff=0 file(s),0 added line(s) … (exit 0)
```

5. The `.git/info/exclude` concealment (3.8b):

```
$ printf 'unrelated.py\n' >> .git/info/exclude
$ printf 'sneaky = True\n' > unrelated.py
$ git status --porcelain
?? .pe-gate/
$ ls -l unrelated.py
-rw-rw-r-- 1 socraticblock socraticblock 14 … unrelated.py
$ python3 pe_gate.py check
PASS … diff=0 file(s),0 added line(s) … (exit 0)
```

6. The `pe-gate/` directory exemption (3.9):

```
$ mkdir -p pe-gate && printf 'sneaky = True\n' > pe-gate/unrelated.py
$ git status --porcelain
?? .pe-gate/
?? pe-gate/
$ python3 pe_gate.py check
PASS … diff=1 file(s),0 added line(s) … (exit 0)
```

   The exemption is now `if path.split("/", 1)[0] in state_forms: continue` (`pe_gate.py:400`).

7. The hook (section 5): R2's `HOOK` block is identical to R1's, including `exec python3 scripts/pe_gate.py check`
   (`pe_gate.py:456–461`), and `cmd_install_hook` still only prints the `core.hooksPath` note (`:463–472`) — INSPECTED
   (code read and compared), not re-run.

**Fixed or changed in R2 (partial credit, but note the cost):**

- A `bugfix` now needs a third phase, `reverted` (restore the defect, show the command fails again). That is a genuine
  strengthening: it makes the "I removed the fix afterwards" state (3.5) at least *recorded*. It does not make it
  *checked* — the reverted run is read out of `falsify.json` exactly like the other two, so the recorded file still
  decides.
- The diff budget raises `gate.budget-exceeded` for a large diff, and any free-text `--budget-note` at baseline time
  removes the finding without evaluating the note:

```
$ python3 pe_gate.py check
REFUSED
- gate.budget-exceeded: the diff is 8 file(s) / 0 added line(s) against a budget of 6 / 250 and no reason was recorded
  (exit 2)
$ python3 pe_gate.py baseline --change-class bugfix --authorised '*' --budget-note because
$ python3 pe_gate.py record
$ python3 pe_gate.py check
REFUSED
- gate.evidence-not-demonstrated: … (this run's falsifier was mis-sequenced by my probe; the budget finding is gone)
  (exit 2)
```

  so the budget is opt-out by typing any note; and since `diff_stats` counts only uncommitted changes, the budget is also
  silently `0/0` on a committed change set (probe 2 above). A budget that is measured on the same surface as the scope
  check inherits the same blind spot.

**Net:** 7 of the 15 PASS routes reproduce on R2 with no change to the attack; the two new mechanisms (reverted phase,
budget) add requirements to the *record* without adding a check on the *tree*. Confidence that the other 8 also survive:
HIGH for the pure-scope ones (3.8a, 3.8c, 3.8d, 3.13) since R2's `changed_paths`/`covers` are unchanged code, MEDIUM for
3.2/3.3/3.6/3.7 (unchanged digest and the same read-from-file falsifier checks, but I did not re-run them individually
under R2's shape rules). UNVERIFIED for "all 15 also hold on R2" — I ran the headline set, not the full battery.

One more identity note: the R2 rewrite happened *after* the brief told me the artifact was fixed at that path. If
another lane is editing the same file while a gate review reads it, a verdict bound to a hash is the only defensible
one — and the hash that matters here is the one in section 0.

Post-script, observed after this section was written: the artifact moved **again**:

```
$ sha256sum ../build/scripts/pe_gate.py
2502b34674953b33527b45b4fdd22699cd37431f2e16051a39cdc87418352e28  (R3)
```

So the file at the reviewed path has had at least three identities during one review pass. Everything in this report is
bound to R1 (`1cf9849a…`), and the R2 probes are bound to R2 (`2bba574e…`); nothing here is a claim about R3.

## 10. What this means for the doctrine

The four recorded obligations are sound, and the doctrine's insistence that they be recorded rather than asserted is the
right instinct. What fails is the claim in "Make it mechanical" (SKILL.md 51–65) that reading is not compliance and "the
gate is". As built, `pe_gate` is a **record with a linter**: it checks that fields have been filled in, not that the work
happened. Specifically:

- **"check exits 2 and names every unmet obligation"** — true, but "unmet" is tested from files the audited party
  writes (3.1–3.3). A gate whose verdict is derived from the defendant's own notes is a template, not a gate.
- **"Bypassing it with `git commit --no-verify` is itself a recorded act, not a silent one"** — the doctrine names the
  one bypass a hook can never close, while the bypass that matters is quieter: everything in 3.4 and 3.8 needs no
  `--no-verify` at all.
- **"a fix needs a failing-before run of the identical command"** — the identical command is enforced (good); that it is
  the *same* defect, on the *same* tree, in the *right order* is not (3.6, 3.7).
- **"no unscoped 'none' is possible"** (obligation 3) — true, and it is why the 15 routes all require the attacker to
  fill the record in rather than skip it. That is a real property. It is also why the cheapest honest improvement is to
  make the record's *content* checkable rather than its *shape*.

Three sentences I would change in SKILL.md:

1. "Advice is what gets skipped under pressure; this tool is the part that cannot be skipped, because it refuses."
   → "this tool is the part that cannot be silently *forgotten*; it records, and it refuses when the record is
   incomplete or inconsistent with the worktree." (The claim of unskippability is what the audit contradicts.)
2. Add, next to the four commands: "The record is evidence only if the same state is checked against the same revision.
   Re-run the falsifier command before you believe a PASS." Until 8.3 and 8.4 are in, that is a human step.
3. Obligation 1's "The reviewer's test is mechanical: every changed file is inside the authorised scope" should say
   *which* surface is audited: "against the baseline revision, including committed changes, and not through any path
   that a `.gitignore` or an index flag can remove from `git status`."

The doctrine's own best sentence is the one the tool does not implement: "where a rule says RUN, the command and its
observed output must appear." `pe_gate` stores a command string and two hashes of output that nothing ever compares. If
the tool stored and re-checked *output*, rather than trusting an exit code, the identical-output falsifier (3.6) and the
reverted fix (3.5) would both fall out.

## 11. Limits, and what I did not test

- The artifact was read-only to me; I reviewed a byte-identical copy and never modified the build tree. All mutation was
  in `/tmp/pe-defeat/`, and no commit was made in any repository I did not create (the harness sets its own
  `user.name`/`user.email` per repo).
- Platform: WSL2 Linux with git 2.43.0 only. Path quoting, case-insensitivity and symlink behaviour differ on Windows and
  macOS; findings 4.3 and 3.11 have platform-specific variants I did not test.
- R2's newer falsifier kinds (`rejection`, `equivalence`, `benchmark`) and change classes (`security`, `performance`,
  `docs`, `refactor`, `new-behaviour`) were not exercised beyond `capability`/`bugfix`. `class_findings` is 80 lines of
  new logic (R2 306–385) and is the most likely place for a *new* class of defeat; it deserves its own pass.
- Concurrency is untested and looks unsafe by inspection: `save` writes the state with a plain `write_text` and no lock
  (R1 104–106), so two agents (or an agent plus a hook) sharing one workspace can interleave a read-modify-write on
  `falsify.json`/`dod.json` and lose a run. Labelled INSPECTED because I did not run it.
- Hostile `PATH` for the hook's `exec python3 …` was not exercised (INFERRED, section 5).
- An uninitialised submodule's contents were not tested (N15), and I did not test `git worktree`, bare repositories, or
  a workspace whose `.git` is a file pointing elsewhere.
- I did not attempt a `--budget-note`-vs-budget argument on the merits, nor review R2's budget defaults.
- The 15 routes are the ones I found within the brief's list plus the two I hit by accident (3.12, 4.1). The list is not
  claimed to be exhaustive; the *patterns* — state written by the audited party, audit surface controllable by the
  audited party, stored evidence never re-checked — are what closes the design, and section 8 addresses those.

## Appendix A — harness, transcripts, reproduction

Everything is under `/tmp/pe-defeat/` (throwaway; recreate with the scripts below).

Harness:
- `lib.sh` — `mk <dir>` builds a throwaway git repo (`a.txt` holding `VALUE = 1`, `check.py` exiting 0 iff `a.txt` holds
  `VALUE = 2`); `c` prints and runs the tool; `g` prints and runs git; `ritual <authorised>` runs the honest four
  commands; `force_pass <authorised>` runs the four commands with a falsifier that watches a file outside the repo.
- `A-trees.sh` — honest path, the leading-space refusal, commit evasion, revert-after-pass.
- `B-state.sh` — hand-written state, copied state, unrelated falsifier, phase order, digest recomputation.
- `C-scope.sh` — glob scope, `.` scope, gitignore, info/exclude, showUntrackedFiles, assume-unchanged, index.lock,
  renames/deletions, `->` in a name, non-ASCII path, symlink, submodule, malformed state, the mangled-name cover.
- `D-hook.sh` — install-hook inert by default, wired hook refusing, `--no-verify`, missing tool path, commit-then-check.
- `E-clean.sh` — the clean re-runs of the scope findings with the in-scope file staged (so the parser bug cannot
  contribute), plus `.` scope, corrupt index, submodule, `pe-gate/` directory.
- `R2-probe.sh`, `R2-probe2.sh` — the same attacks against the revision that replaced the artifact mid-review.
- `tool/r1/` — the reviewed revision (sha256 `1cf9849a…`); `tool/r2/` — the replacement (sha256 `2bba574e…`);
  `mut/` — the one-line fixture mutation of the suite's happy path.
- Transcripts: `out/{A,B,B2,C,D,E,R2,R2b,suite}.txt`.

To reproduce any finding: `bash /tmp/pe-defeat/E-clean.sh` (or `A`, `B`, `C`, `D`, `R2-probe`, `R2-probe2`), then read the
matching transcript. Each scenario uses its own repository under `/tmp/pe-defeat/<name>/`, so they can be run
individually by extracting the section from the script. The scenarios in section 3 stage the in-scope file before
`check`; that is deliberate and noted where it happens (it removes the 4.1 confounder so the observed PASS is the
attack and not a side effect).

## Appendix B — finding index

Routes to PASS with an obligation unmet (15):

| # | Section | Attack | Observed | Fix |
|---|---|---|---|---|
| F1 | 3.1 | state written by hand, no command run | `PASS`, exit 0 | 8.1 |
| F2 | 3.2 | stale record made current by hand-computed digest | `PASS` after paste | 8.2 |
| F3 | 3.3 | authorised scope rewritten after the fact | `PASS` after digest paste | 8.1/8.2 |
| F4 | 3.4 | commit the out-of-scope change set | `PASS changed_files=0` (also under a wired hook) | 8.3 |
| F5 | 3.5 | revert the fix after the record | `PASS` while `check.py` exits 1 | 8.4 |
| F6 | 3.6 | falsifier unrelated to the change, identical empty output | `PASS`, `output_sha256=e3b0c442…` both phases | 8.4 |
| F7 | 3.7 | `after` recorded before `before` | `PASS`, times reversed | 8.4 |
| F8a | 3.8a | pre-existing `.gitignore` rule | `PASS` with the file on disk | 8.3 |
| F8b | 3.8b | `.git/info/exclude` | `PASS`, concealment invisible | 8.3 |
| F8c | 3.8c | `status.showUntrackedFiles=no` | `PASS changed_files=1` | 8.3 |
| F8d | 3.8d | `update-index --assume-unchanged` | `PASS`, file holds `666` | 8.3 |
| F9 | 3.9 | root directory named `pe-gate/` | `PASS changed_files=3` | 8.5 |
| F10 | 3.10 | corrupt `.git/index` → `status` exit 128 | `PASS changed_files=0` | 8.6 |
| F11 | 3.11 | directory named `src -> src` | `PASS` under scope `src` | 8.6 |
| F12 | 3.12 | mis-sliced name as cover (`evil.py` → `vil.py`) | `PASS` unstaged, `REFUSED` staged | 8.6 |
| F13 | 3.13 | `--authorised '*'` | `PASS changed_files=3` | 8.5 |

Honest work refused (5):

| # | Section | Case | Observed | Fix |
|---|---|---|---|---|
| G1 | 4.1 | tracked file edited and left unstaged | `REFUSED … .txt`, a path that does not exist | 8.6 |
| G2 | 4.2 | `--authorised .` | `REFUSED` on every file | 8.5 |
| G3 | 4.3 | non-ASCII path, git-quoted | `REFUSED` naming `caf\303\251.txt` | 8.6 |
| G4 | 4.4 | submodule change | `REFUSED` naming `ub` | 8.6 |
| G5 | 4.5 | hook installed where the tool is not at `scripts/` | commit blocked with a Python error | 8.7 |

Crashes (3 shapes, section 6): `falsify.json = []` → `AttributeError`; `baseline.json = "a string"` →
`AttributeError`; R2's `falsify.json` without `tests_digest` → `KeyError`. All exit 1 with a traceback, not a named
finding. Fix 8.2.

Surviving on R2 (`sha256 2bba574e…`, section 9): the mis-slicing parser (F12's mechanism), the commit evasion (F4), the
hand-written state (F1), the failing-status hole (F10), the `.git/info/exclude` concealment (F8b), the `pe-gate/`
exemption (F9), and the hook — 7 routes, plus a new opt-out (`--budget-note`) and a new crash. Defence that held:
N1 (cross-repo state copy).
