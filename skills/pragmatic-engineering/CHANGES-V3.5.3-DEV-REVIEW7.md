# v3.5.3-dev-review.7 — bounded verifier execution and audit preflight

**Status:** experimental; local mechanical assurance only. Not stable and not a 9/10 certification.

## Correctness changes

- Replaced unlimited `Popen.communicate()` stdout/stderr capture with one incrementally drained pipe, a 1 MiB combined-output budget and a 4 KB bounded tail. Output beyond the budget terminates the process group, sets `output_limited=true`, `exit=null`, and is INCONCLUSIVE, not an observed failing test. A detached subprocess holding the pipe still cannot extend a command indefinitely; the drain window is bounded. This is *not* a sandbox; detached processes, process memory and side effects remain outside this control.
- A fully collected stream gets a SHA-256 over its actual bytes. Timeouts and output-limit failures have `output_sha256=null` (the full stream was not observed). `output_bytes` records bytes consumed, not necessarily bytes the verifier attempted to emit.
- Preserved validation of older phase records that do not have the optional `output_limited` and `output_bytes` fields.
- Refuse active/unknown Git `filter`, `text`, `eol`, `ident` and `working-tree-encoding` attributes, `core.autocrlf` normalization, and hidden-index flags at `falsify` preflight, before executing side-effectful verification. Recheck after verifier execution before publishing evidence. Refusal is restrictive for Git LFS and other filters; this is not general working-tree raw-byte equivalence.
- Corrected the release identity in `SKILL.md` and `INDEX.md`.

## Limitations and release criteria

Verification commands still run with the caller's privileges and can have arbitrary external side effects. A malicious process can manipulate the filesystem or Git state beyond the cooperative local guarantee; Git internals and ignored content do not have complete byte-based attestation. The phase command must be independently sandboxed in protected CI for high-trust claims.

Required before promotion: full exact-ZIP gate and concurrency suites, fresh independent hostile-review reproduction, non-root permission checks, and blinded engineering outcome trials. See handoff bundle for commands and results.
