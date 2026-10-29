# Genezisi Agency — repository cleanup and migration-readiness audit

**Date:** 29 October 2026  
**Repository:** `socraticblock/Agency`  
**Base:** documentation PR #12 at `a664835885b57e5675184ef5fe6b161b098c8d30`  
**Cleanup branch:** `chore/repository-cleanup-infinite-website-2026-10-29`  
**Purpose:** prepare the **existing Genezisi website repository** for staged Infinite Website development while retaining live products, honest historic evidence and a rollback path. This is a **safe cleanup**, not a destructive redesign, production cutover or proof of an entirely unused-free codebase.

## 1. What was inspected

- GitHub's full recursive tree for the PR #12 baseline: **417 tracked files** plus directory entries; specifically **304 `src/` files**, **29 `public/` files**, **36 `docs/` files**, **13 `.cursor/` files**, **9 `tests/` files**, and root/config/infra/scripts.
- Actual homepage routing: `src/app/page.tsx` → `/en`, `src/app/[locale]/page.tsx` → `SignalHeroPrototype` → current `V2Hero`, **genuine `SelectedWork`**, capabilities, lab, close and footer.
- Existing business functionality: card customizer `src/app/[locale]/(site)/start/`, public card `/c/[slug]`, partner, pricing, blog, stores, booking, services, onboarding, orders/admin, APIs, Turso schema and mapped-domain middleware.
- Opt-in old flagship assets and routes, new B → C study, user-facing preview routes, `vercel.json`, `next.config.ts`, package manifest, script directory, known code-agent rules and docs.
- Specific code risks: root repair script, historical patch, `/api/test` and `/api/test-db`, chatbot route, old videos/starter assets, URL and language boundaries.
- Earlier complete documentation precedence pass in `docs/DOCUMENTATION_AUDIT_2026-10-29.md`.

**Evidence limit:** GitHub source inspection and remote tree, not a full local clone. The connected environment cannot `git clone` GitHub, and the repository-wide code-search index returned no results even for known present symbols. Thus a reliable complete import graph, actual asset runtime usage, `npm run build`, tests in the complete checkout, browser behavior and the unpublished founder/Codex worktree could **not** be verified here. Do **not** infer dead code from negative code-search results.

## 2. Changes actually made

| Area | Before | Action | Risk |
|---|---|---|---|
| Root `fix_wrap.mjs` | One-time Windows-specific file rewrite targeting an old `FoundationGrid.tsx` path absent from repository tree | **Delete** the obsolete source-repair script | Low; not an application/runtime entry point |
| Root `partner-page.patch` | April 27 email-format development patch at repository root; matching current partner page/migration files exist | **Move** its exact bytes to `docs/archive/partner-page-2026-04-27.patch`; verify equality **before removing root copy** | Low; preserves original historical patch |
| `src/app/api/test-db/route.ts` | Public unauthenticated GET with returned database URL, last ten auth-token characters and raw database/query response | **Disable outside development** (404). In development respond only with boolean configured/queryWorks; suppress raw errors, URLs, token fragments and query data. No-store, no production DB fetch | High benefit: prevents disclosure from the diagnostic endpoint once deployed |
| `tests/repository-cleanup.test.mjs` | No explicit smoke guard for cross-product paths, doc authority and security regression | **Add** Node built-in source/structure assertions, callable with `node --test tests/repository-cleanup.test.mjs` | Low; no application runtime effect |
| `docs/REPOSITORY_CLEANUP_2026-10-29.md` | No single scope-and-safety cleanup inventory | **Add** this audit, retained-assets rationale, validation state and migration handoff | Low |
| `README.md`, `AGENTS.md`, old V2 docs, `.cursor/rules/` | Previous full documentation pass in PR #12 | **Retain** and use as new authority; no additional broad rewrites | No new impact |

**No other application route or React component was removed, renamed or retargeted.**

## 3. Explicit keep decisions

| Category | Decision | Why |
|---|---|---|
| `src/app/[locale]/page.tsx`, `SignalHeroPrototype`, `v2/SelectedWork.tsx` | **KEEP** | Real locale homepage and authentic Work seam for the future B → C integration |
| EN/KA/NL homepage and middleware | **KEEP** | Established locale behavior, SEO and mapped-host routing; replacing could cause regressions |
| Existing digital-card `/start`, `/c/`, orders/admin, partner, pricing and onboarding APIs/routes | **KEEP** | Live/independent products and business workflows; no proof of deprecation or migration |
| `public/work-previews/*` | **KEEP** | Real project previews; names can be referenced from active and historic work |
| `public/flagship-journey/*` and `/[locale]/flagship-preview` | **KEEP pending founder visual acceptance** | Prior hero art, evidence, opt-in compare and useful rollback/reference paths. Deleting now erases useful comparisons; standalone previews are NOT production React integration |
| `public/flagship-journey/infinite-bc/*` | **KEEP** | Actual unfinished Gate 1b prototype to refine |
| `public/flagship-journey/infinite-opening-study/*` | **KEEP** | Historical A/B/C selection reference |
| `docs/genezisi-v2/*`, older flagship docs, v1.1 North Star | **KEEP with superseded banners** | Research and provenance; their status labels are not active design instructions |
| Legacy digital-card specs and `docs/MEMORY.md` | **KEEP** | Product operations and implementation history |
| `src/app/api/test/route.ts` | **KEEP for now** | Existing development-only route already returns 404 under `NODE_ENV=production`; avoid changing historical testing workflow without evidence |
| `src/app/api/chat/route.ts` / `ChatWidgetWrapper` | **KEEP pending integration/security decision** | Wrapper currently renders nothing, but API may be called directly or by other clients; unproven unused. Audit rate limiting/auth/abuse budget before public enablement |

## 4. Potential further cleanup — NOT safe to execute blindly

| Candidate | Observation | Blocker / next verification |
|---|---|---|
| `public/hero-bg-animation.mp4` | **22,529,156 bytes** in public assets; the largest repository static file | Requires actual source and live route references, production usage and replacement/archival plan before deletion. Public URLs can be used outside the repo |
| `public/next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg` | Look like Next.js scaffold resources | A complete code/string and inbound public-URL reference audit is unavailable here; delete in a verified checkout only after proving not used |
| Old `src/app/[locale]/_components/` hero and lead-generation components | Many unused-looking names; overlapping V2 and legacy definitions | Source graph + Next route bundle analysis and actual legacy page behavior required; shared imports/route use cannot be assumed |
| `/[locale]/(site)/v2-prototype`, old `flagship-preview` and experimental `public/flagship-journey` assets | Multiple opt-in historical prototypes | Preserve until new integrated homepage is visually accepted and founder chooses archival/removal; do not delete a rollback option prematurely |
| `next.config.ts` game redirect | Historical `broken-chapel-prototype.vercel.app` external target | Potentially stale brand/product destination; must verify real game service and affected inbound URLs before altering |
| Large code files and unused dependencies | Multiple components are long; packages include Three/R3F, GSAP, Lenis, Gemini | Do not remove or split without complete dependency graph, tests and gate-specific performance evidence |
| Chat API budget/control | `src/app/api/chat/route.ts` is callable independently of hidden widget | Separate security/product decision: rate-limit, validate limits, review auth/cost before use. Not changed by cleanup PR |
| Legacy pricing copy/route consistency | Old homepage/card pricing, independent studio offering | Copy and legal/commerce review before changing real offers or removing published pages |

**Conclusion:** file existence and a negative code-search result are not adequate proof that a public asset, route, API or component is safe to delete.

## Separate production security hotfix

A **one-file, draft PR #14** ([review the production-targeted fix](https://github.com/socraticblock/Agency/pull/14)) was opened separately from the cleanup branch. It targets `main` and restricts `GET /api/test-db` to development without depending on the unmerged website/creative documentation stack. The exact same route correction remains in this cleanup branch.

**Merge coordination:** if PR #14 is released first, reconcile duplicate edits before combining the stacked cleanup PR with main; do not double-revert the security guard. Neither PR was merged or deployed in this audit. The potential exposure persists on any running deployment with the previous route.

## 5. Verification and release gates

### Verified at GitHub source level

- Cleanup branch starts exactly from the latest PR #12 head.
- Historical April patch copied byte-for-byte to `docs/archive/` and fetched back/compared successfully **before root deletion**.
- One-time `fix_wrap.mjs` referenced a Windows absolute path and old `FoundationGrid.tsx` that is absent from the repo tree.
- Diagnostic route had unguarded token-fragment and query-detail disclosure; new code has explicit development-only guard and minimized response.
- All changes have isolated commits. No pushes to `main`, `preview-*` or production.
- New repository hygiene test exists; its **actual execution in a full clone is still pending**.

### Must run in a real, current checkout before merging

```bash
git status --short
git fetch origin
git branch -vv
npm ci
node --test tests/repository-cleanup.test.mjs
npm run typecheck
npm run lint
npm run build
```

Also inspect active routes and Dutch/Georgian behavior, card ordering and mapped domains, production middleware, old opt-in prototype links, Work project links, reduced-motion behavior and any deployed application before removing more files.

**Highest priority security check:** ensure `GET /api/test-db` returns **404** from an actual production-mode build and never echoes DB credentials, credential fragments, raw URLs or query errors. Any production deployment from an older branch may still carry the exposed diagnostic; this branch does **not** fix production until an authorized merge/deploy.

### Developer handoff

- Use the **cleanup branch** as the clean working base once dependencies/merges are reconciled and acceptance checks pass. Do not base new Gate 1b implementation on the stale v1.1 creative files or the old Signal roadmap.
- Keep PR #10 (studies), #11 (opt-in geometry proof), and #12 (North Star/docs) as independently reviewable historical checkpoints; this cleanup is a new child branch.
- Next creative coding gate remains **Gate 1b**: centered hero → right-hand B push and full readable hold → genuinely spatial site-derived movement → compact meaningful interior → forward C fold → actual Work only after integration authorization.
- A new homepage is **not** released by a repository cleanup; preserve all existing business features until separately approved.

---

## Final independent source-readiness review (29 October 2026)

**Verdict: suitable to resume isolated Gate 1b development, NOT accepted for merge or production release.**

### Facts rechecked after PRs #13 and #14 were opened

- GitHub PRs **#10 → #11 → #12 → #13** remain **open, draft, unmerged and fast-forward stacked**, with the base for #13 at the head of #12. No head is missing its parent. The combined cleanup head was **92 commits ahead of `main` and zero behind** at review time; that count includes the prior older flagship exploration and documentation history, **not 92 new cleanup changes**. Recheck refs before cherry-pick/rebase or merge.
- The cleanup compared with its parent is a focused five-path change: root one-off script deletion, exactly preserved partner patch moved to `docs/archive/`, `/api/test-db` restriction, new smoke test and this audit. The patch's file content matches the old root copy.
- **Eight source-level consistency checks passed** against the actual cleanup-branch GitHub tree and contents: all required North Star/flow/acceptance/legacy files present; actual `src/app/[locale]/page.tsx` and `v2/SelectedWork.tsx` preserved; card, partner, card-by-slug and locale middleware paths present; old root clutter removed; patch header preserved; production-mode database diagnostic guard exists; response no longer serializes token fragments; agent and README clearly label prototype limitations.
- Inspected actual `SelectedWork.tsx`: section `id="work"` exists; project definitions still include **TK Counsel**, **Frankencoin Desk** and **Her House Pilates**, each with current source-held external URL and image path. This is the **actual React component**, not the B → C proof's sample Work section.
- Current `next.config.ts` / `middleware.ts` remain untouched; `vercel.json` still restricts automatic deployment to `main` and `preview-*`. The combined cleanup branch did not trigger a production cutover.
- Separately, **PR #14** is an **open, draft, unmerged one-file change based on `main`** carrying the database diagnostic hardening. Its presence in GitHub is **not** proof that production has been patched.

### Concrete limits still preventing a clean merge/release sign-off

1. **Full checkout validation missing:** there was no network-enabled Git clone/Node dependency install in this review environment. The committed `tests/repository-cleanup.test.mjs` was verified against GitHub source/tree expectations, but **not executed under `node --test` in a complete checkout**. Typecheck, lint, Next build and application regression tests remain necessary.
2. **Security still unreleased:** a running deployment built from the old `main` may still expose the DB diagnostic. Treat separate PR #14 as a priority security review and confirm a deployed 404 without revealing any secret values. Do not claim this vulnerability is fixed on the live site yet.
3. **No route/device acceptance:** EN/KA/NL SEO and routing, actual business-card/partner/onboarding paths, cross-browser/native scroll, reduced-motion and mobile performance are **not yet tested** after consolidation. Static sources cannot establish production parity.
4. **Visual Gate 1b remains unfinished:** the old B → C standalone motion proof does not yet implement the new centered-to-push entrance, full B hold, genuine foreground depth, compact readable interior or fully integrated C→React Work seam. Founder visual acceptance and subsequent Gate 2 authorization are separate.
5. **Potential cleanup deliberately deferred:** large public video, starter SVGs, old opt-in hero code, duplicated-looking React components and chat endpoints require a complete dependency/runtime inspection before deletion. Do not treat absence from GitHub code-search results as proof of dead code.

**Next coder's starting point:** begin an isolated **new feature branch from `chore/repository-cleanup-infinite-website-2026-10-29`** after confirming this is still the newest committed base and reconciling unpublished local files. Read `AGENTS.md`, the v1.2 North Star, Visitor Flow and Gate Acceptance documents. Complete actual build/test smoke checks before implementing **Gate 1b only**. Do not casually merge the five stacked PRs or automatically deploy.

**Status conclusion:** strong **design, source organization and branch-preservation foundation**; **not yet a verified production-ready release foundation**.
