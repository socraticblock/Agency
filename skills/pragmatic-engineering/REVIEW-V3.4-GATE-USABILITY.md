**Status:** CURRENT as a review of its named revision, which is NOT the revision in this directory.
Reviewed the PRE-REDESIGN gate. It landed a one-line fix in 16 gate invocations and 23 commands, and two of its
three `check` runs refused honest work — one naming a file that does not exist, which was a real parsing defect in
the tool (fixed in round 6).

# G2 — Usability review: does `pe_gate.py` prevent the failures it claims to prevent?

Independent reviewer, fresh context. Artifact under test (read-only; I never edited it):

    /home/socraticblock/hermes-workspace/pragmatic-engineering/v3.4/build/scripts/pe_gate.py
    md5 3a4f4444d7b2079e91e60e28ce793a64

Doctrine the gate claims to mechanise: `/home/socraticblock/hermes-workspace/pragmatic-engineering/v3.4/build/SKILL.md`
("The four recorded obligations"). All work below is in throwaway repositories under `/tmp/pe-gate-usability/`;
no network, no browser, no commits outside `/tmp`, no writes to the artifact or to its repository.

Tool interpreter, as instructed:

    /home/socraticblock/.hermes/hermes-agent/venv/bin/python3 <gate> ...

HEADLINE: 16 pe_gate invocations (23 commands in all) to land a one-line fix in one file — and 2 of the 3
`check` runs refused it. The first refusal named a file that does not exist. The gate does change what I would have
done (I would not have run the reversion phase on my own), but it also PASSes a bugfix whose test never passes, and
refuses an honest tree because of a parsing bug in its own scope check. It is a discipline ritual, not yet a gate
I would put in CI.

## 1. The repository I built and the task I gave myself

One real task, of the shape the doctrine's hardest obligation is written for: a one-line arithmetic defect.

    $ mkdir -p /tmp/pe-gate-usability/repo/src /tmp/pe-gate-usability/repo/tests
    $ cd /tmp/pe-gate-usability/repo && git init -b main -q
    $ git config user.email socraticblock@gmail.com && git config user.name 'G2 reviewer'
    $ printf 'TAX_RATE = 0.2\n...taXed = int(round(subtotal_cents * (1 + TAX_RATE))); return taxed - discount_cents\n' > src/calc.py
    $ printf '.pe-gate/\n' > .gitignore
    $ git add -A && git commit -q -m 'initial: buggy order_total' && git log --oneline | cat
    65f2ea1 initial: buggy order_total

The defect: `order_total` taxes the full subtotal and subtracts the discount afterwards, so the customer pays tax on
money they never paid. The task brief I wrote for myself says "fix it" with authorised scope `src/calc.py,
tests/test_calc.py`. The one verification command used in every phase:

    python3 -m unittest discover -s tests -t . -p 'test_*.py'

Interpreter used to run the gate, as the brief instructs:

    $ /home/socraticblock/.hermes/hermes-agent/venv/bin/python3 -V
    Python 3.11.15

Five further throwaway repositories under `/tmp/pe-gate-usability/` each isolate one experiment:

    repo        the honest bugfix (sections 2, 5)
    repo-trunc  the isolated scope-parsing repro (section 2e)
    repo-rushed the rushed agent, and its reconstruction (section 3)
    repo-blind  a bugfix whose oracle never passes (section 4)
    repo-class  same tree, same evidence, changed class flag (section 5c)
    repo-doc    the documented loop verbatim, plus the installed hook (sections 2c, 5b)

Full captured transcripts of every command and its output are at
`/tmp/pe-gate-usability/transcript*.log` (8 files; `transcript.log` is an aborted first attempt described in
section 3a). The artifact was never edited; only read. Commits exist only inside these `/tmp` repositories.

## 2. Obligation A — a fix whose original failure must be demonstrated

### 2a. The honest sequence, in the order I ran it

Every gate invocation of the honest run, in order, with its observed output (trimmed to the tool's own line):

 1. baseline          -> ok  gate.baseline-recorded: class=bugfix revision=65f2ea1efb2b authorised=2 entr(y|ies) budget={'files': 6, 'lines': 250}
 2. falsify before    -> ok  gate.falsify-before-recorded: label=discount-order kind=capability exit=1 revision=65f2ea1efb2b tests_digest=f5ebd6ff9b08bcf3
 3. falsify after     -> ok  gate.falsify-after-recorded:  label=discount-order kind=capability exit=0 revision=65f2ea1efb2b tests_digest=f5ebd6ff9b08bcf3
 4. falsify reverted  -> ok  gate.falsify-reverted-recorded: label=discount-order kind=capability exit=1 revision=65f2ea1efb2b tests_digest=f5ebd6ff9b08bcf3
 5-10. dod.1..dod.6   -> ok  gate.dod-recorded: dod.N  (six invocations)
11. record            -> ok  gate.record-written: /tmp/pe-gate-usability/repo/.pe-gate/record.md
12. check             -> REFUSED, three findings (section 2b)
13. check             -> REFUSED, one finding (section 2f)
14. baseline          -> ok  gate.baseline-recorded: class=bugfix revision=65f2ea1efb2b authorised=3 entr(y|ies)
15. record            -> ok  gate.record-written: ...
16. check             -> PASS (root=/tmp/pe-gate-usability/repo, change_class=bugfix, diff=3 file(s),17 added line(s))

The work itself, between those invocations:

    write tests/test_calc.py        (the reproducing test, asserting 600c for a 1000c order with a 500c discount)
    falsify before                  -> exit 1, defect demonstrated
    write src/calc.py               (the fix: discount the subtotal, then tax it)
    falsify after                   -> exit 0
    git diff src/calc.py > fix.patch && git checkout -- src/calc.py     (put the defect back)
    falsify reverted                -> exit 1
    git apply fix.patch             (put the fix back)

That is the whole of obligation A, done honestly and in the doctrine's order, and it is the part of the gate that
works: the three-phase red/green/red sequence was produced by real runs against real states, and I could not have
faked the `reverted` phase without actually watching the test fail again against the original code.

### 2b. What the gate said the first time I asked it to check

The completion record was written, then `check` was run. It refused:

    $ pe_gate.py check
    [exit 2]
    REFUSED
    - gate.scope-outside-authority: rc/calc.py changed but is not in the authorised scope and is not a named exception
    - gate.scope-outside-authority: src/__pycache__ changed but is not in the authorised scope and is not a named exception
    - gate.scope-outside-authority: tests/__pycache__ changed but is not in the authorised scope and is not a named exception

Nothing here is about the fix or its evidence: the evidence obligations were all satisfied. The tree at that moment,
by git's own account, was:

    $ git status --porcelain | cat -A
     M src/calc.py$
    ?? src/__pycache__/$
    ?? tests/__pycache__$
    ?? tests/test_calc.py$

The first finding names `rc/calc.py`. There is no such file (`ls rc/calc.py` -> "No such file or directory",
exit 2). The other two findings are about `.pyc` files the repository's own test suite wrote inside the two
authorised directories. So an honest agent's first encounter with the gate is one fictitious finding plus two
about artefacts it never chose to write. Section 2e isolates the fictitious one; section 2f is what it costs to
get out.

### 2c. Obligation B — a file I never authorised

Deliberate test, in `repo-doc`: I authorised `src/app.py,tests/test_app.py` and then changed `app.py` and
`tests_test.py` — a path mistake of exactly the kind the scope obligation exists to catch.

    $ pe_gate.py baseline --change-class bugfix --authorised src/app.py,tests/test_app.py
    ok  gate.baseline-recorded: class=bugfix revision=... authorised=2 entr(y|ies)
    $ printf 'def f(): return 2' > app.py && printf 'def f(): return 2' > tests_test.py && git add -A
    $ pe_gate.py check
    [exit 2]
    REFUSED
    - gate.evidence-not-demonstrated: bug-123: the pre-change run already passed, so no defect was demonstrated
    - gate.reversion-not-detected: bug-123: with the defect restored the check still passed, so the test does not detect the defect it claims to
    - gate.scope-outside-authority: app.py changed but is not in the authorised scope and is not a named exception
    - gate.scope-outside-authority: tests_test.py changed but is not in the authorised scope and is not a named exception
    - gate.dod-unanswered: dod.1 unanswered: ... (six of these)

The catch is real and correctly worded: the two paths it names are the two paths I changed, factually true, no
false positive. In my own honest run the same check caught the `.gitignore` edit I made to quiet the generated
artefacts:

    $ cat .gitignore
    .pe-gate/
    $ pe_gate.py check
    [exit 2]
    REFUSED
    - gate.scope-outside-authority: .gitignore changed but is not in the authorised scope and is not a named exception

So the scope obligation does what it says: one file, one account, nothing silent.

### 2d. Is the refusal enough for someone who was not present?

Not quite. A reviewer who was not present is told *what* changed, never *against what*. The refusal never
states the authorised scope, and there is no command that prints it — `status` prints the root, revision, stored
files and the changed paths, and no scope:

    $ pe_gate.py status
    root=/tmp/pe-gate-usability/repo
    revision=65f2ea1efb2b0c0add560f95ce0ae80d77c6b3ee
    stored: baseline.json, dod.json, falsify.json, record.md
    changed_files=rc/calc.py, src/__pycache__, tests/__pycache__, tests/test_calc.py
    REFUSED
    ...

To learn the scope the reviewer must open `.pe-gate/baseline.json` by hand. The doctrine promises a remedy the CLI
cannot perform — "name each exception with the authorised outcome it serves" (build/SKILL.md:34-35) — and the gate
reads such names but offers no way to write one:

    $ grep -n 'exceptions\|fnmatch\|install-hook' build/scripts/pe_gate.py
    177:        import fnmatch
    178:        return fnmatch.fnmatch(path, entry)
    414:    scope = list(base.get("authorised") or []) + [e for e in base.get("exceptions", []) if e]
    526:    h = sub.add_parser("install-hook", ...)

Line 414 is the only reader of `exceptions`; no subcommand writes it. So an exception can only be created by
hand-editing the gate's own JSON state, which is precisely the forging route the gate exists to close.

Contrast the reversion refusal, which is fully actionable by a stranger: "a bug fix must show before(fail),
after(pass) and reverted(fail) — restore the defect and show the same command fails again". That one names the
state, the command and the action. The scope message names a path and nothing else.

### 2e. The false refusal: a scope message naming a file that does not exist

`repo-trunc` isolates it: one tracked file, one unstaged edit, everything else clean.

    $ git init -b main -q ... && printf 'def f(): return 1' > src/calc.py && git add -A && git commit -q -m init
    $ pe_gate.py baseline --change-class bugfix --authorised src/calc.py
    ok  gate.baseline-recorded: class=bugfix revision=934cd4e5453b authorised=1 entr(y|ies)
    $ printf 'def f(): return 2' > src/calc.py && git status --porcelain | cat -A
     M src/calc.py$
    ?? .pe-gate/$
    $ pe_gate.py check
    REFUSED
    - gate.evidence-missing: bugfix needs 1 `capability` label(s); found 0
    - gate.scope-outside-authority: rc/calc.py changed but is not in the authorised scope and is not a named exception
    - gate.dod-unanswered: dod.1 unanswered: ... (six of these)
    - gate.record-missing: no completion record written: run `pe_gate.py record`

The one file I changed *is* the one file I authorised, and the gate names `rc/calc.py`, which does not exist. The
cause is in the artifact, and it is mechanical: `run()` returns `(stdout + stderr).strip()` (pe_gate.py:80), and
`.strip()` eats the leading space of the first porcelain line; `changed_paths()` then takes a fixed offset,
`raw = line[3:].strip()` (pe_gate.py:99). git prints `" M src/calc.py"`, the gate receives `"M src/calc.py"`, and
slices off one character too many:

    $ git status --porcelain | cat -A
     M src/calc.py$
    ?? .pe-gate/$
    $ python3 -c "... spec_from_file_location('pe_gate','<build>/scripts/pe_gate.py'); m.run(...) ..."
    git raw   : ' M src/calc.py\n?? .pe-gate/\n'
    gate run(): 'M src/calc.py\n?? .pe-gate/'
    changed_paths(): ['.pe-gate', 'rc/calc.py']

Stage the same change and the finding disappears, with nothing else about the tree different:

    $ git add src/calc.py && git status --porcelain | cat -A
    M  src/calc.py$
    ?? .pe-gate/$
    $ pe_gate.py check
    REFUSED
    - gate.evidence-missing: bugfix needs 1 `capability` label(s); found 0
    - gate.dod-unanswered: dod.1 unanswered: ... (six)
    - gate.record-missing: no completion record written: run `pe_gate.py record`

An unstaged modification of the alphabetically-first changed path is the normal state of a working tree, so this
fires on nearly every real change — the honest agent's first encounter with the gate is a refusal about a file
that does not exist, and following its instruction literally is impossible.

### 2f. How I got the honest run to PASS, and what that remedy costs

Only one route exists, and I took it. Generated artefacts are untracked, and the file that would silence them
(`.gitignore`) is itself outside the authorised scope, so the scope has to be widened — and the gate can only widen
it by re-baselining, which happens after the writes:

    $ stat -c '%y  %n' src/calc.py tests/test_calc.py .gitignore
    2026-10-15 16:34:02 +0400  src/calc.py
    2026-10-15 16:34:02 +0400  tests/test_calc.py
    2026-10-15 16:35:32 +0400  .gitignore
    $ pe_gate.py baseline --change-class bugfix --authorised src/calc.py,tests/test_calc.py,.gitignore
    ok  gate.baseline-recorded: class=bugfix revision=65f2ea1efb2b authorised=3 entr(y|ies)
    $ grep -o '"at": "[^"]*"' .pe-gate/baseline.json
    "at": "2026-10-15T12:35:48+00:00"       # = 16:35:48 +0400, i.e. after all three writes

(re-)baseline, record, check -> PASS. Nothing in the gate compares the baseline timestamp with the modification
times, so the doctrine's first rule — "before the first write" — is unenforced and unrecorded: the record shows a
scope of three entries with no trace that it started as two, or that it grew after the change. That is the only
remedy the tool offers, and it silently rewrites the evidence of scope.

## 3. The rushed agent — fix first, test afterwards, claim pre-existing

### 3a. Write the fix, then run the test "before" phase

`repo-rushed`: repository with the same defect, and an agent that does it backwards — baseline, then write
the fix, then write the test, then run the test (green immediately), then go looking for the "before" evidence.

    $ pe_gate.py baseline --change-class bugfix --authorised src/calc.py,tests/test_calc.py
    ok  gate.baseline-recorded: class=bugfix revision=4dfaa9b5c093 authorised=2 entr(y|ies)
    $ printf '...discounted = subtotal_cents - discount_cents...' > src/calc.py && git add src/calc.py   # fix FIRST
    $ printf '...assertEqual(order_total(1000, 500), 600)...' > tests/test_calc.py                        # test second
    $ python3 -m unittest discover -s tests -t . -p 'test_*.py' | tail -3
    Ran 1 test in 0.000s
    OK
    $ pe_gate.py falsify --label discount-order --kind capability --cmd "..." --phase before
    ok  gate.falsify-before-recorded: label=discount-order kind=capability exit=0 revision=4dfaa9b5c093 tests_digest=72b72616887d9644
    $ pe_gate.py falsify --label discount-order --kind capability --cmd "..." --phase after
    ok  gate.falsify-after-recorded: label=discount-order kind=capability exit=0 revision=4dfaa9b5c093 tests_digest=72b72616887d9644
    $ pe_gate.py dod --item dod.3 --answer "one failure observed, demonstrated pre-existing"
    ok  gate.dod-recorded: dod.3
    $ pe_gate.py record && pe_gate.py check
    [exit 2]
    ok  gate.record-written: ...
    REFUSED
    - gate.evidence-not-demonstrated: discount-order: the pre-change run already passed, so no defect was demonstrated
    - gate.reversion-missing: discount-order: a bug fix must show before(fail), after(pass) and reverted(fail) — restore the defect and show the same command fails again

This is the gate at its best. Two things are worth noting. First, the tool printed `ok` twice while recording the
evidence that refuses the whole task — a rushed agent who trusts the "ok" and never runs `check` learns nothing.
Second, the refusal is precise and actionable; the second line tells the agent exactly what to run.

(A fourth, accidental demonstration came free: my own first honest attempt used a mistyped discovery command that
errored out, so all three phases recorded exit 1. The gate printed `ok  gate.falsify-{before,after,reverted}-recorded
... exit=1` for every one of them, with no warning; I only noticed by printing the stored `output_tail`. Under class
`bugfix` that workspace would have passed `check` — see section 4.)

### 3b. What the claim "pre-existing" buys the rushed agent

Nothing at all. The gate never reads the answers.

    $ grep -n 'pre-existing' build/scripts/pe_gate.py
    65:    ("dod.3", "verification ran without weakening it; failures separated into caused / demonstrated-pre-existing / unexplained"),

Line 65 is a description string. The only code that touches the Definition-of-done store checks that an item exists
and that a not-applicable reason is non-empty (pe_gate.py:428-433); the text of every answer is opaque. So:

  * claiming "demonstrated pre-existing" buys the rushed agent nothing at check time — the class obligation still
    refuses — which is the right outcome for the wrong reason: the claim is inert, not disproved;
  * and the honest agent's true statement in `dod.4` ("the original failure could not be produced") is equally
    inert, so a reviewer who was not present cannot tell my honest dod.3 from the rushed one in section 3a by
    reading anything the gate produces.

The doctrine's rule "attribute a failure to pre-existing causes only by DEMONSTRATING it on the pre-change revision"
(build/SKILL.md:85-86) is not mechanised anywhere. The only mechanical pressure in that direction is the bugfix
class's `reverted` phase, which forces demonstration for the *fixed* defect and says nothing about the other
failures in the same run.

### 3c. The reconstructing agent: stash the fix, run `before`, unstash

The rushed agent can still reach PASS, and I did it, in the same repository, without lying in any recorded
answer. The naive way first, because it is a trap:

    $ git stash && pe_gate.py falsify --label discount-order --kind capability --cmd "..." --phase before
    ok  gate.falsify-before-recorded: label=discount-order kind=capability exit=5 revision=4dfaa9b5c093 tests_digest=0dbf500b10b32e23

exit 5 is unittest's "no tests ran": `git stash` took the *new test file* with it, and the digest changed from
`b137e1363548c27e` to `0dbf500b10b32e23`. Left there, the gate would have refused with
`gate.verification-inputs-changed` — correctly. The manoeuvre that works stashes only the source file:

    $ git stash push src/calc.py
    $ pe_gate.py falsify ... --phase before     -> ok ... exit=1 revision=4dfaa9b5c093 tests_digest=b137e1363548c27e
    $ git stash pop && pe_gate.py falsify ... --phase after
                                                -> ok ... exit=0 revision=4dfaa9b5c093 tests_digest=b137e1363548c27e
    $ git stash push src/calc.py
    $ pe_gate.py falsify ... --phase reverted   -> ok ... exit=1 revision=4dfaa9b5c093 tests_digest=b137e1363548c27e
    $ git stash pop && git add -A
    $ pe_gate.py record && pe_gate.py check
    PASS
    root=/tmp/pe-gate-usability/repo-rushed
    change_class=bugfix
    revision=4dfaa9b5c093f855dd307499b1aaa74578c370f0
    diff=2 file(s),10 added line(s)

The record it produced is indistinguishable in kind from the honest one — three phases, one digest, one revision:

    - discount-order [capability/before]:   `...unittest...` -> exit 1 on 4dfaa9b5c093 (tests_digest b137e1363548c27e)
    - discount-order [capability/after]:    `...unittest...` -> exit 0 on 4dfaa9b5c093 (tests_digest b137e1363548c27e)
    - discount-order [capability/reverted]: `...unittest...` -> exit 1 on 4dfaa9b5c093 (tests_digest b137e1363548c27e)

and the stored runs show the order the phases were actually executed in:

    $ python3 -c "...json.load(open('.pe-gate/falsify.json'))..."
    after    exit 0 rev 4dfaa9b5c093 at 2026-10-15T12:36:22+00:00 digest b137e1363548c27e
    reverted exit 1 rev 4dfaa9b5c093 at 2026-10-15T12:36:23+00:00 digest b137e1363548c27e
    before   exit 1 rev 4dfaa9b5c093 at 2026-10-15T12:36:31+00:00 digest b137e1363548c27e

The `before` run happened last, nine seconds after the "after" run, and the gate says PASS. Its revision field is
HEAD, which does not move for uncommitted work, so it carries no ordering information at all.

What the gate really proves, then, is narrower than doctrine claims and still worth something: at the moment of one
recorded run, this working tree held the defect and this command failed on it. It cannot prove the fix came
afterwards, and it does not try. An agent that has already written the fix pays one `git stash` and passes — but it
must at least watch the failure once, which is the habit the doctrine is trying to build. That is the honest value
of the reversion phase, and it is real.

## 4. The failure the gate does not prevent: a bugfix whose test never passes

The doctrine's own summary of the obligation is three clauses: "before fails, after passes, and **`reverted` fails
again**" (build/SKILL.md:43). The class table in the tool's header says the same. The gate implements two of them.
`class_findings()` for `bugfix` reads `before.exit == 0` and the presence and exit of `reverted`, and never looks at
the `after` run at all (pe_gate.py:339-352). The `new-behaviour` branch does check it -- `if r.get("after", {}).get("exit", 1) != 0: ... gate.evidence-still-failing` (pe_gate.py:358-360) -- so the omission is not a design choice,
it is the one place the pattern was not copied.

`repo-blind` demonstrates it. The repository holds the same defect and a test whose expectation is simply wrong
(600c vs 999c), so the oracle can never pass. The agent's "fix" changes only a docstring:

    $ pe_gate.py baseline --change-class bugfix --authorised src/calc.py,tests/test_calc.py
    ok  gate.baseline-recorded: class=bugfix revision=0b58f212a88d authorised=2 entr(y|ies)
    $ pe_gate.py falsify --label discount-order --kind capability --cmd "..." --phase before
    ok  gate.falsify-before-recorded: label=discount-order kind=capability exit=1 revision=0b58f212a88d tests_digest=2f48a22bfe2f3ab0
    $ printf '...order_total... (docstring added) ...' > src/calc.py && git add -A     # cosmetic only
    $ pe_gate.py falsify ... --phase after
    ok  gate.falsify-after-recorded: label=discount-order kind=capability exit=1 revision=0b58f212a88d tests_digest=2f48a22bfe2f3ab0
    $ pe_gate.py falsify ... --phase reverted
    ok  gate.falsify-reverted-recorded: label=discount-order kind=capability exit=1 revision=0b58f212a88d tests_digest=2f48a22bfe2f3ab0
    $ pe_gate.py dod --item dod.1..dod.6 --answer ...      (six invocations, all "ok")
    $ pe_gate.py record && pe_gate.py check
    [exit 0]
    ok  gate.record-written: /tmp/pe-gate-usability/repo-blind/.pe-gate/record.md
    PASS
    root=/tmp/pe-gate-usability/repo-blind
    change_class=bugfix
    revision=0b58f212a88de2a9ec44618564265c7c7ebe4491
    diff=1 file(s),1 added line(s)

and the completion record it emits says so, in the evidence section, in plain sight:

    ## Evidence

    - discount-order [capability/before]:   `python3 -m unittest discover -s tests -t . -p 'test_*.py'` -> exit 1 on 0b58f212a88d (tests_digest 2f48a22bfe2f3ab0)
    - discount-order [capability/after]:    `python3 -m unittest discover -s tests -t . -p 'test_*.py'` -> exit 1 on 0b58f212a88d (tests_digest 2f48a22bfe2f3ab0)

A record that shows the check failing before the change and failing after it, with no defect fixed and no test that
ever passed, is stamped PASS by the gate. This is the failure the doctrine says the gate exists to prevent, and it
is the failure the gate does not prevent.

Nor does the artifact's own suite catch it: copied to `/tmp` and run against the same file, it is green.

    $ cp -r build/scripts /tmp/pe-gate-usability/suite/scripts && cd /tmp/pe-gate-usability/suite/scripts
    $ python3 -m unittest tests_pe_gate -v | tail -8
    test_the_state_directory_is_not_reported_as_out_of_scope ... ok
    test_the_stored_baseline_records_class_scope_and_budget ... ok
    test_unanswered_definition_of_done_is_refused ... ok
    ----------------------------------------------------------------------
    Ran 20 tests in 9.924s

    OK

Twenty passing tests, and both of the findings in sections 2e and 4 are live. A green suite is evidence about the
checks that ran, not proof they encode the right requirement -- the doctrine's own line, demonstrated on the
doctrine's own tool.

## 5. Friction

### 5a. What the loop costs in commands

For one one-line fix in one file, following the doctrine's order and reaching PASS:

    gate invocations                                    16
      baseline 2 (the second to widen the scope) + falsify 3 + dod 6 + record 2 + check 3
    non-gate commands                                    7
      write the test, write the fix, save the fix as a patch, restore the defect, re-apply the patch,
      append to .gitignore, git add -A
    total                                               23

    $ python3 -c "print(2+3+6+2+3, 2+3+6+2+3+7, 1+3+6+1+1)"
    16 23 12

The floor, if the scope parsing worked and nothing had to be re-baselined, is 12 gate invocations (baseline 1 +
falsify 3 + dod 6 + record 1 + check 1) plus the same work commands.

The doctrine advertises something much smaller. build/SKILL.md:65 -- "Four commands, all of them recorded, none of
them optional:" -- followed by an example block (lines 67-72) that is itself five invocations, omits the six
`dod` answers the same doctrine requires ("an unanswered item blocks the gate", line 56), and omits the `reverted`
phase the same doctrine's own class table demands on line 43. Following that block alone, verbatim, gets an agent
this:

    $ pe_gate.py baseline --authorised src/app.py,tests/test_app.py     # as written in SKILL.md line 68
    [exit 2]
    usage: pe_gate.py baseline [-h] --change-class {bugfix,new-behaviour,refactor,performance,security,docs}
                               --authorised AUTHORISED [--budget BUDGET] ...
    pe_gate.py baseline: error: the following arguments are required: --change-class

and, with only the omissions corrected, a refusal:

    $ pe_gate.py record && pe_gate.py check
    REFUSED
    - gate.evidence-not-demonstrated: bug-123: the pre-change run already passed, so no defect was demonstrated
    - gate.reversion-not-detected: bug-123: with the defect restored the check still passed, ...
    - gate.scope-outside-authority: app.py changed but is not in the authorised scope and is not a named exception
    - gate.scope-outside-authority: tests_test.py changed but is not in the authorised scope and is not a named exception
    - gate.dod-unanswered: dod.1 ... dod.6 (six findings)
    check exit=2

So the documented loop cannot pass, and the fiddly part of the work (the patch/stash dance that produces the
`reverted` phase) is not in the documentation at all.

### 5b. Wording that cost me time, quoted

Where the wording cost me time, in the order I hit it:

1. `check` refuses on a path that does not exist, with no hint that the tool's own parse is at fault
   (section 2e). I spent three commands proving `rc/calc.py` was not my doing, and one stage of the change to
   work around it.

2. The tool says `ok` while recording a violation of the class obligation:

       $ pe_gate.py falsify --label discount-order --kind capability --cmd "..." --phase before
       ok  gate.falsify-before-recorded: label=discount-order kind=capability exit=0 revision=4dfaa9b5c093 tests_digest=72b72616887d9644

   For `bugfix`, a passing `before` is disqualifying, and for `new-behaviour` a failing `after` is; both are
   printed as `ok`. The refusal only appears later, at `check`, so an agent that records its phases and stops
   believes it is done.

3. `--authorised` is the flag whose meaning carries the whole scope obligation, and the help gives it no
   description at all:

       $ pe_gate.py baseline --help
       --change-class {bugfix,new-behaviour,refactor,performance,security,docs}
       --authorised AUTHORISED
       --budget BUDGET       files=N,lines=M (default 6,250)
       --budget-note BUDGET_NOTE
                             why this diff is larger than the budget
       --note NOTE

   `falsify --help` likewise does not say that `--kind` defaults to `capability`, which is the kind that decides
   which obligation applies.

4. Globs are supported and undocumented. `covers()` falls through to `fnmatch.fnmatch(path, entry)`
   (pe_gate.py:176-178), so `src/*/__pycache__` would have been a legitimate scope entry -- I re-baselined
   instead, because nothing in the help, the doctrine or the refusal text suggests a pattern is allowed.

5. Exit codes collide. The header documents "0 all obligations met; 2 refused; 3 usage error" (pe_gate.py:41),
   but argparse's own usage errors exit 2 -- the same code as a refusal:

       $ pe_gate.py baseline --authorised src/app.py,tests/test_app.py
       [exit 2]
       pe_gate.py baseline: error: the following arguments are required: --change-class

   A CI step or hook cannot distinguish "you have unmet obligations" from "your command line was wrong".

6. Piping the tool's output to `head` produces a traceback and exit 1:

       $ bash -c 'pe_gate.py status | head -4 > /dev/null; echo gate_exit=${PIPESTATUS[0]}'
       Traceback (most recent call last):
         ...
         File ".../pe_gate.py", line 456, in cmd_check
           print("REFUSED")
       BrokenPipeError: [Errno 32] Broken pipe
       gate_exit=1

   Any wrapper that trims the output sees a failed run.

7. The `diff:` line in the completion record does not reconcile with git. It read "diff: 6 file(s), 3 added
   line(s)" while `git status --porcelain` reported three paths, because `diff_stats()` counts untracked files
   individually, including the `.pyc` files the suite had just written (pe_gate.py:112-128). The tool's own
   note at baseline tells you to gitignore `.pe-gate/` and says nothing about generated files, which are what
   actually tripped my scope check.

8. `install-hook` writes a hook that cannot work in the repository it is installed into, and the blocked commit
   says nothing about the gate:

       $ pe_gate.py install-hook && cat .githooks/pre-commit
       ok  gate.hook-installed: /tmp/pe-gate-usability/repo-doc/.githooks/pre-commit
       note: `git config core.hooksPath .githooks` makes git use it
       #!/bin/sh
       # Installed by pe_gate.py -- refuses a commit while the recorded obligations are unmet.
       exec python3 scripts/pe_gate.py check
       $ git -c core.hooksPath=.githooks commit -m 'should be blocked'
       python3: can't open file '/tmp/pe-gate-usability/repo-doc/scripts/pe_gate.py': [Errno 2] No such file or directory

   The doctrine says the gate ships with the skill, not the repository (build/SKILL.md:63-64), so `scripts/pe_gate.py`
   relative to the working tree will normally not exist: every commit in every adopting repository is refused for a
   reason the developer cannot read. The tool's own note in the docstring -- "which is itself a recorded act" --
   assumes a hook that gets as far as running the gate.

### 5c. Where an honest agent is blocked, and the only ways out

Four places, one of them hard:

1. **A defect that cannot be reproduced.** The doctrine covers this case in prose -- "where the evidence genuinely
   cannot be produced, name the blocker and the command you attempted, and call the result unverified"
   (build/SKILL.md:51-52) -- but the tool has no unverified, blocked or failed-to-demonstrate state. There is no
   passing route but to stop calling it a bugfix. `repo-class` shows how little separates the two outcomes: same
   repository, same command, same green/green evidence, one flag changed.

       $ pe_gate.py baseline --change-class bugfix --authorised src/calc.py,tests/test_calc.py
       $ pe_gate.py falsify --label discount-order --kind capability --cmd "..." --phase before   -> exit 0
       $ pe_gate.py falsify --label discount-order --kind capability --cmd "..." --phase after    -> exit 0
       $ pe_gate.py record && pe_gate.py check
       REFUSED
       - gate.evidence-not-demonstrated: discount-order: the pre-change run already passed, so no defect was demonstrated
       - gate.reversion-missing: ... restore the defect and show the same command fails again
       $ pe_gate.py baseline --change-class refactor --authorised src/calc.py,tests/test_calc.py
       $ pe_gate.py falsify --label tidy --kind equivalence --cmd "..." --phase before            -> exit 0
       $ pe_gate.py falsify --label tidy --kind equivalence --cmd "..." --phase after             -> exit 0
       $ pe_gate.py record && pe_gate.py check
       PASS
       change_class=refactor
       revision=7785be33245a6ed8c3a6e7ad61288a53c886ef81
       diff=1 file(s),1 added line(s)

   The obligation is whatever the agent declared at baseline, and the declaration is never checked against the
   diff. An agent that cannot demonstrate a defect -- or does not want to -- has a one-flag remedy and a compliant
   completion record.

2. **The `.gitignore` circularity of section 2f.** Any repository whose test suite writes artefacts inside the
   authorised directories needs a scope entry the baseline does not have, and the only tool-supported remedy is a
   post-hoc re-baseline.

3. **The false scope refusal of section 2e.** The working workaround is `git add -A` before every `check`, which is
   not something an agent would guess; I found it by reading the parser.

4. **The installed hook.** Until it is corrected or unset, no commit in the repository is possible at all.

## 6. Does the gate change what I would have done?

Yes, in two specific ways, and neither of them is about correctness.

It changed the sequence of my work. Left to myself I would have written the reproducing test, watched it fail,
written the fix, watched it pass, and reported that. I would not have restored the defect and watched the test fail
a second time. The gate refused to accept anything less (section 3a), so I spent three commands on the patch dance
and produced a third run I would otherwise have skipped. That is a genuine addition: it is the difference between
"a test now passes" and "this test detects this defect". A stub test that asserts nothing would have been caught by
`gate.reversion-not-detected`, and I believe the gate would have caught it -- the mechanism is exactly right for
that job.

It also changed the order I would have written things in. Writing the fix before the test is now visibly a losing
move: it guarantees the `before` phase records a pass, which is a refusal, and the only way back is a
reconstruction (section 3c) that costs more than doing it in order.

It does not change anything else, and I want to be plain about the two reasons. First, its verdict is read from exit
codes only: it never inspects the assertion, so a test that fails for the wrong reason, or never passes at all, is
invisible to it (section 4). Second, it cannot tell my honest record from the rushed one -- the revisions are
identical, the digests are identical, and the Definition-of-done answers are never read (section 3b). A reader of a
`PASS` learns that someone ran the right commands in the right order against a changing tree; they do not learn that
the fix is right.

One behavioural cost is worth naming. The first thing an honest agent will meet is a refusal naming a file that does
not exist (section 2e). That is how a gate teaches people to ignore it, and it would take me two commands of
investigation every time to confirm the tool was wrong rather than my change -- until, on a busy day, I stopped
checking. A gate whose false refusals are cheap to identify is a discipline; one whose false refusals look like
real findings is a trap.

## 7. Verdict and headline number

Verdict: **keep it, do not yet gate on it.** The core mechanism is sound and does work -- the class table, the
three-phase bugfix evidence, the test-digest check, the scope account and the written record are all real, offline
and not forgeable by accident. But two defects make `PASS` unreliable in both directions, one of them on the common
path:

  * `changed_paths()` refuses an honest tree and names a file that does not exist, whenever the alphabetically-first
    changed path is an unstaged modification. Cause: `.strip()` in `run()` (pe_gate.py:80) plus the fixed offset
    `line[3:]` (pe_gate.py:99). Fix: parse `git status --porcelain -z`, or strip line by line rather than the whole
    output. This is a false refusal on the normal path -- the highest-priority item.
  * The `bugfix` class never checks that the `after` phase passed (pe_gate.py:339-352), although
    `new-behaviour` does (pe_gate.py:358-360). A bugfix whose check fails in all three phases is stamped PASS
    (section 4). Fix: mirror the `new-behaviour` after-check into the `bugfix` branch, with
    `gate.evidence-still-failing`.

Three smaller items would remove most of the friction I met: print the authorised scope in a scope refusal (and
add a way to record a named exception, since line 414 reads one that no command writes); correct the installed hook
to the tool's own absolute path (`scripts/pe_gate.py` cannot exist in an adopting repository); and put
`--change-class` into the documented example at build/SKILL.md:68, which as written exits 2.

The one thing I would keep exactly as it is, and the reason the tool is worth its friction: the reversion phase.
It is the only mechanism here that made me do something I would not otherwise have done, and it is the closest thing
to a semantic oracle a mechanical gate can have.

HEADLINE: **16 gate invocations (23 commands) for a one-line fix; 2 of 3 `check` runs refused it, one of them for a
file that does not exist; and a bugfix whose test never passes gets PASS.**

Not verified here: the classes other than `bugfix` were exercised only as far as sections 2c and 5c show; I did not
test the gate from its installed skill path (`~/.hermes/skills/shared/pragmatic-engineering/scripts/pe_gate.py`), only
from `build/scripts/`; and I did not test it on a workspace without version control, or on a repository whose test
directory is not named `tests`/`test`/`spec`/`acceptance` (pe_gate.py:71) -- in that last case `tests_digest()`
returns `none:0` for every phase and the test-editing check cannot fire, which I inferred from pe_gate.py:131-150
and did not execute.
