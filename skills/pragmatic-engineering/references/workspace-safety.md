# Workspace Safety

Use whenever an agent edits a version-controlled workspace, especially when the checkout may contain human work, another agent's work, generated artifacts, or running development processes.

The workspace is shared state. Preserve work you did not create.

## Before editing

- Inspect relevant version-control status, and when the workspace is version-controlled take the mandatory
  pre-edit baseline below — the baseline is not conditional.
- Distinguish pre-existing changes from changes made by this task.
- Do not assume a dirty file is disposable because it is uncommitted.
- If another change overlaps the same lines or files, understand it before editing around it.
- Prefer task-scoped edits that compose with existing work.


### Pre-edit baseline (mandatory)

Before the first write to a version-controlled workspace, record in the transcript:

- the status output (Git: `git status --short`, plus `git rev-parse HEAD`);
- the files and behaviours this task authorises you to change, named explicitly.

Do not write through a path whose status changed since that baseline; re-read and reconcile first. Before
finalising, re-run status and separate your edits from concurrent work by file and effect; if they overlap,
stop and report rather than overwrite.


## Write targets and links

Before writing through a path you did not create, determine where it resolves when links, mounts, generated mirrors, or workspace indirection may be involved. Do not follow a symlink or equivalent path indirection outside the intended authorized workspace merely because the link is stored inside the repository. If an out-of-workspace target is genuinely required, treat it as a separate write boundary and establish authority first.

## Before overwriting a file

If a file may have changed since you read it, re-read or verify its current version before writing. Do not blindly write from a stale in-memory copy over newer work.

This is especially important when:

- multiple agents or humans may be active;
- generators/watchers rewrite files;
- formatting tools run concurrently;
- long-running tasks separate read and write by significant time.

## Git safety

Do not use destructive version-control operations merely to make the workspace easier to reason about.

Without explicit authority, do not:

- discard unrelated modifications;
- run `reset --hard`;
- run destructive `clean` commands;
- force-checkout over modified files;
- drop stashes you did not intentionally create for this task;
- rewrite published/shared history;
- resolve conflicts by wholesale "ours" or "theirs" when that would discard meaningful work.

When a conflict exists, preserve both intents and resolve semantically.


Preserve the user's staging/index state. When asked to create a commit, stage only task-relevant changes unless broader staging is explicitly intended, inspect the staged diff, and do not silently include unrelated already-staged or newly discovered work.

## Shared workspaces and multiple agents

When independent actors may write to the same checkout:

- minimize overlapping file ownership;
- re-check status before consequential writes;
- detect changed files before finalizing;
- avoid assuming earlier test results still describe the current tree;
- prefer separate worktrees/branches or another isolation mechanism when the environment supports it.

Do not claim verification for code that changed after the verification run without assessing whether the evidence remains valid.

## Remote API-only Git edits

When there is no executable checkout, pin the base commit and target blob SHA before writing,
use a dedicated branch, and compare the final diff against the authorized file list.
Before claiming even syntax correctness, obtain and parse/compile the *exact resulting file*
where your available tools permit it. A patch that looks small can still introduce a syntax
error; a remote diff is not an execution check. Read GitHub/CI job logs after pushing and
resolve actual failures before requesting merge. Treat the final commit SHA as a new
verification target: earlier green checks on its parent do not transfer automatically.
If toolchain/CI execution is unavailable, state E1 and leave promotion pending instead of
recasting a static review as a passed build.

## Processes and local services

A running process may belong to the user or another task.

Do not kill, restart, reconfigure, or replace an unknown process merely because it occupies a port or resource. Identify ownership and use a non-destructive alternative when practical. Treat actions that can interrupt someone else's work as consequential.

## Verification commands can have side effects

A command named "test", "build", "install", "migrate", "seed", "preview", or "dev" is not automatically safe.

Before running an unfamiliar command that could cross a trust or persistence boundary, inspect enough configuration/script definition to understand whether it can:

- write persistent/local user data;
- contact live external services;
- use production credentials;
- deploy/publish;
- run migrations;
- execute package lifecycle hooks;
- start/stop processes;
- incur cost;
- access privileged host capabilities such as container-daemon sockets, devices, broad filesystem mounts, or host-control APIs.

Use the least consequential verification path that still provides the needed evidence.


Repository-defined hooks, task runners, package scripts, build plugins, and test setup can execute code before or after the named command. Treat unfamiliar hooks as part of the command's action surface.

Local child processes may inherit ambient credentials, open file descriptors/handles, sockets, and network access. Do not expose broad production/cloud or host authority to repository code merely because it is already present in the parent process; narrow, close, or scrub inherited authority when practical and when the command does not require it.

## Final workspace check

Before finishing:

- inspect task-relevant status/diff;
- ensure unrelated pre-existing work is preserved;
- ensure no temporary destructive workaround remains;
- ensure evidence was gathered against the final code state;
- state clearly if workspace concurrency prevented strong verification.
