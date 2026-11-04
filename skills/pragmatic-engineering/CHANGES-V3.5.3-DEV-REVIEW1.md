# Experimental v3.5.3-dev-review.1 — for Hermes review only

**Status: NO-GO for stable release.** Source-level draft changes against pristine v3.5.2-rc.1; not an official Hermes release.

Repairs: canonical narrow scopes; persisted-state validation and safe malformed-state refusals; finite, comparable self-reported benchmarks; repository candidate-change attribution and reversion; strict input path containment; sequence integrity; command-startup failure handling; Git NUL-delimited filename/status/diff/fingerprint processing and surrogateescape-safe hashing; truthful assurance labels. Documentation and tests aligned. Baseline v3.5.2 source not modified.

**Assurance limitations:** Agent-controlled local evidence is not independent attestation. A changed fingerprint is not semantic causal proof. Benchmark values are self-reported. Shell commands run without sandboxing. Legacy state migration, complete corrupted-state schema, native macOS/Windows support, concurrency and protected CI remain unverified. Real agent outcome evaluation is still required. The full handoff gives mandatory promotion gates.
