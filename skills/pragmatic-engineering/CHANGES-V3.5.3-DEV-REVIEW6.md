# v3.5.3-dev-review.6 — conservative Git filter refusal

This experimental build refuses tracked paths with active or unrecognized Git `filter` attributes, because Git's clean/smudge canonicalization can conceal unauthorized raw working-tree changes. Checks run before and after live verification; findings also audit filter state. This is intentionally restrictive: repositories using Git LFS or other tracked filters may be refused. It is not a general raw-byte completeness solution. The current candidate marker in INDEX.md was corrected.

Verified locally: supplied clean-filter false-PASS reproduction now returns REFUSED; package validator VALID; regression 14/14; holdout 11/11; syntax compilation successful. Full gate suite, concurrency suite and independent Hermes verification NOT rerun for this build. No 9/10 certification is claimed. Verifier output memory remains unbounded.
