# Genezisi — Coding Agent Working Agreement

Repository: `socraticblock/Agency`. The **shipping website** is the Next.js App Router app under `src/app/[locale]/`. Always confirm current `main`, active feature/integration branch and open PRs before writing.

## Read before changes
1. [Development branching and release policy](docs/development/BRANCHING_INTEGRATION_RELEASE.md) — authoritative ongoing workflow.
2. [Current four-frame website handoff](docs/genezisi-v2/HANDOFF_2026-11-01_FOUR_FRAME.md) — integration state and pending acceptance.
3. [Production-integration skill](skills/genezisi-production-integration/SKILL.md) — repeatable implementation and QA procedure.
4. Existing code and relevant tests; historical designs only when genuinely needed.

## Required behaviors
- **Build in production architecture** on a non-production branch; no standalone HTML proof as release implementation.
- Use one branch per coherent feature, **not** one branch per tweak. For multi-part work, use an integration branch based on `main`; branch dependent tasks from integration, independent tasks from `main`.
- Synchronize integration from `main` regularly; use focused PRs and avoid wholesale merging experimental histories.
- Preserve real Selected Work, EN/KA/NL, WhatsApp/contact, navigation, SEO, reduced-motion fallback, and native reversible scrolling.
- Coders run relevant static/build tests and describe executed commands; the founder handles visual/gameplay acceptance. Do **not** conflate source tests with live browser QA.
- No unsolicited production merge, deployment or force-push. Avoid needless actions/deployments; use local/tunnel QA where possible.
- Keep `docs/MEMORY.md`'s next index and three-bullet observation protocol for major architectural decisions, without broad historical rewrites.

The 2026-11-01 four-frame design is frozen as a creative baseline, but the integrated Card 3 runtime behavior still requires founder verification after PR #19.
