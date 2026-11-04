# Artifact lifecycle: completeness, immutable bytes and truthful decisions

Use when a change prepares or verifies a release candidate, backup, archive, migration,
package, report, synchronization batch or any deliverable assembled from mutable inputs.
This is conditional guidance, not a new mandatory process for ordinary edits. Also see
`boundary-correctness.md`, `reliability.md` and `authority-boundaries.md`.

## Establish the actual contract before changing the gate

Name the consumer-visible artifact and its provenance. Separate **confidentiality**
(what must not leave), **completeness** (what must arrive), **integrity** (which exact bytes),
**authorization** (who decides) and **execution containment** (what untrusted code can do).
A missing file is not automatically a secret leak; refusing every intentional deletion is
not the same as safer software. Choose whether a detected omission must STOP, needs human
review, or is an explicitly documented exclusion. Encode that policy in a result, not just
in an internal plan or diagnostic log.

## Follow the data across every boundary

1. **Discover:** identify the *authoritative* inventory. Distinguish Git-tracked,
   staged-deleted, unstaged-deleted, untracked, ignored, generated, and nested/submodule
   content as applicable. A Git tracked path is not proof its working-tree bytes exist.
2. **Plan:** reconcile inventory = included + intentionally excluded + unavailable.
   Account for each category by path and decision. Do not quietly equate a successful
   process exit or a small export count with a complete result.
3. **Capture:** establish per-file and aggregate size/count limits; handle malformed
   paths, symlinks, hardlinks, nonregular files, read failures and concurrent writers.
   For scan-to-export assurances, scan captured bytes and write those *same bytes*;
   a second source-path read invites a time-of-check/time-of-use gap.
4. **Assemble:** stage privately, reject contradictory metadata, avoid overwriting
   someone else's artifact, and publish complete output atomically when the target
   filesystem supports that contract. Treat crash consistency and power-loss durability
   as different guarantees.
5. **Verify:** re-enumerate the final artifact, compare file sets in *both* directions,
   verify digest/size against actual bytes and preserve a separately obtained expected
   digest when asserting identity. A manifest generated beside altered content can prove
   self-consistency without authenticating provenance.
6. **Decide:** distinguish automated PASS from NOT_RUN, NOT_TESTED, NOT_ENFORCED and
   NEEDS_HUMAN. Never turn an acknowledgment of a finding into proof that sensitive
   bytes were removed from a history-bearing artifact. Never infer owner consent,
   licence rights or publication authorization from a local hash.
7. **Execute:** test/build steps that run candidate code are a separate trust boundary.
   An environment with fewer variables is not a sandbox; require explicit opt-in and
   host-enforced isolation when the threat model demands it. Bound stdout/stderr, wall
   time, process descendants and other resources, and report what was not contained.

## Minimum adversarial and legitimate controls

- **No omission:** one required item vanishes between discovery and capture; test the
  exact *observable* refusal or review status, plus an intentional-omission control.
- **No substitution:** edit a file after scanning but before assembly. The shipped
  bytes must equal scanned bytes or the operation must refuse.
- **No path escape:** parent traversal, symlink in an intermediate directory, odd
  filename bytes, archive member aliases, duplicate paths and collisions must not
  redirect reads/writes or silently overwrite another item.
- **No false identity:** mutate the final artifact, its manifest and/or its stored
  digest separately; include an independently known expected digest control.
- **No partial success:** inject read errors, oversize content, serialization failure,
  cancellation and interrupted writes; confirm destination integrity and useful
  error reporting. Exercise a normal artifact and a legitimate intentional deletion.
- **No authority invention:** a positive scanner result or successful test run cannot
  change a pending approval into owner authorization.

The test must actually reach the failing boundary. A generic error or mock failure
before the target code runs is not evidence that the target invariant is protected.
For a major change, record the predecessor's failure, the changed candidate's result,
and what the same tests cannot establish. Use a fresh checkout and independent grader
when asserting cross-agent coding improvements.
