# Boundary Correctness

Use when values cross a boundary: API/input parsing, persistence, serialization, configuration, caching, time, money/numbers, text identifiers, protocols, or resource-intensive inputs.

Correct code can still be wrong when the representation or boundary semantics are ambiguous.

## Make value semantics explicit

For important values define, as applicable:

- unit and scale;
- valid range;
- signed/unsigned behavior;
- precision and rounding;
- overflow/underflow behavior;
- null/missing/empty distinctions;
- encoding;
- Unicode normalization and case semantics;
- locale dependence;
- ordering/canonicalization;
- timezone/calendar semantics;
- version and compatibility expectations.

Do not rely on a variable name such as `timeout`, `amount`, or `size` to communicate these contracts.

## Numeric correctness

- Use representations appropriate to the domain.
- For money or other exact-decimal domains, define currency/scale/rounding and avoid binary floating point when exact decimal behavior is required.
- Check overflow, underflow, divide-by-zero, NaN/infinity, truncation, and narrowing conversions when the language/domain makes them relevant.
- Make unit conversions explicit and test boundary values.

## Text and identifiers

When identity or security depends on text:

- define encoding and normalization;
- distinguish display text from identifiers;
- avoid locale-sensitive transformations unless the locale is intentionally part of the contract;
- be deliberate about case folding and canonical forms.

Do not assume visually similar strings are semantically identical.


## Environment and operating-system boundaries

When software is expected to run across different operating systems, runtimes, filesystems, shells, CPU architectures, or packaging environments, make the relevant portability assumptions explicit. Consider, as applicable:

- path separators, reserved names, and path/case sensitivity;
- case-only renames and case-differing lookups, which succeed on a case-sensitive filesystem and can silently target the wrong entry, or fail to register as a change at all, on a case-insensitive one;
- newline and text-file conventions;
- executable/permission bits and ownership semantics;
- shell/command quoting and process-spawn behavior;
- filesystem atomicity/locking guarantees;
- integer width, endianness, native extensions, and architecture-specific behavior;
- runtime/toolchain versions and environment-specific defaults.

Local success on one environment is not evidence that these semantics hold on another. Exercise the relevant target or state the portability gap when it can affect the requested outcome.

## Configuration

Configuration is input.

- Validate required configuration early.
- Make dangerous or environment-selecting defaults explicit; do not silently fall into production-like behavior.
- Preserve the provenance of important configuration when debugging or reporting.
- Test missing, malformed, conflicting, and environment-specific values.
- Prefer one authoritative source for each configuration fact.

## Authoritative fields and ambiguous declarations

When a field controls consent, authorization, publication, access, payment, migration, or an irreversible
change, define what happens when the same logical field is declared more than once. **Do not quietly choose
first-wins or last-wins** unless that precedence is a deliberate, documented part of the consumer's actual
contract. Ambiguous or contradictory authority declarations should fail closed, with an actionable error.

Use the same interpretation as the downstream consumer: YAML/frontmatter parsers, environment overlays,
configuration merges, HTTP headers, and query parameters may resolve duplicates differently. Check that the
verification layer and consumer agree; a hand-rolled regex over a subset of the format does not establish
parser equivalence. Preserve ordinary single-value inputs and make a regression case with two conflicting
values where the old validator would have selected an apparently acceptable one.

## Caches and derived state

A cache is not the source of truth unless the architecture explicitly says otherwise.

Define:

- authoritative source;
- complete cache key, including tenant/user/version dimensions where relevant;
- freshness/staleness semantics;
- invalidation/update mechanism;
- behavior on cache failure;
- TTL clock semantics;
- consistency requirements after writes.

Never treat stale cached success as proof that the underlying write/read path is correct.

## Resource budgets

For untrusted or potentially large input, define practical limits where required:

- bytes/items;
- nesting/depth;
- recursion;
- decompressed size;
- concurrency/fan-out;
- queue growth;
- response/body size;
- CPU/time/memory budget.

Prefer streaming, batching, backpressure, or bounded concurrency when unbounded work can exhaust resources.

## Protocol completeness and integrity

Do not equate "received some data" with "received a complete valid result."

When relevant verify:

- status/result code;
- framing/declared length;
- checksum/signature;
- schema/version;
- required fields;
- terminal marker/EOF semantics;
- partial/truncated response behavior.

## Retry and rate limits

When a protocol supplies retry guidance such as retry-after timing, idempotency keys, retryable status codes, or backpressure signals, honor those semantics where appropriate instead of applying a generic retry loop.

Retries remain bounded and must be safe for the operation.

## Test isolation

Tests that mutate process-global or environment state must restore it reliably.

Examples:

- environment variables;
- current working directory;
- locale/timezone;
- global registries/singletons;
- clocks;
- random seeds;
- temporary files/ports;
- feature flags;
- monkey patches.

Prefer fixtures/scopes that guarantee cleanup even when the test fails. Tests should be safe under reordering and parallel execution unless the suite explicitly serializes them.

## Error preservation

Cleanup or secondary failures should not erase the primary causal failure.

Preserve or chain enough error context to explain:

1. what operation originally failed;
2. what cleanup/recovery also failed, if applicable.

Do not turn partial or corrupt results into apparent success merely to keep the pipeline moving.
