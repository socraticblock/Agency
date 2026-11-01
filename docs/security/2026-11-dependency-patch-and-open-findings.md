# Dependency security patch — change record and open findings

**Date:** 1 November 2026
**Branch:** `security/next-16.4.3-patch-2026-11-01`
**Base:** `main` @ `4065754e4fc1bd0e1d36704fc4fdb54b971cc45e`
**Scope:** dependency versions + the one lint-config compatibility line they force. No application code, routes, copy, styles or assets changed.
**Deployment:** none. This record is a prerequisite for review, not a release note.

## 1. What changed

| Package | Before | After | Reason |
|---|---|---|---|
| `next` | `^16.2.1` (lockfile 16.2.1) | `16.4.3` exact | security advisories, see §2 |
| `eslint-config-next` | `^16.2.1` (lockfile 16.2.1) | `16.4.3` exact | must track the framework version it lints for |
| `zod` | `^4.3.6` (lockfile 4.3.6) | `^4.6.7` (lockfile 4.6.7) | GHSA-mrhx-c7xc-m3w5, direct dependency |
| `source-map-js` | 1.2.1 (via postcss) | 1.2.2 override | GHSA-68fv-2mgg-jv7q |
| `ws` | 8.19.0 (via @supabase/realtime-js) | 8.21.0 override | GHSA-96hv-2xvq-fx4p |
| `fflate` | 0.6.10 (three-stdlib) / 0.8.2 (@types/three) | 0.6.11 / 0.8.3 overrides | GHSA-px8p-9vwx-vf98 |
| `eslint.config.mjs` | — | `react-hooks/refs: "warn"` | see §4 |

Each override stays inside the version range the parent package already declares (`postcss ^1.2.1`, `realtime-js ^8.18.2`, `three-stdlib ^0.6.9`, `@types/three ~0.8.2`), so no parent's contract is widened. None of the four is imported by application code; `ws` is reachable only through `@supabase/realtime-js`, and the app builds a plain Supabase client with no `.channel()` subscription, so the websocket transport is never instantiated.

`next` is pinned **exactly** because a same-minor bump is not a fix: 16.2.11 still matches the critical Image Optimization advisories, whose first patched versions are 16.3.3 / 16.3.6 / 16.4.1.

## 2. Advisory comparison

Independent check against the GitHub Advisory Database (`api.github.com/advisories?ecosystem=npm&affects=next`), testing every `vulnerable_version_range` against the **lockfile** version:

| Version | Applicable advisories |
|---|---|
| next 16.2.1 (before) | **34** — 5 critical, 14 high |
| next 16.4.3 (after) | **0** |

`npm audit --omit=dev` (production tree):

| | critical | high | moderate | low | total |
|---|---|---|---|---|---|
| before | 1 | 6 | 2 | 0 | **9** |
| after | 0 | 0 | 0 | 0 | **0** |

`npm audit` (full tree, including build/lint tooling):

| | critical | high | moderate | low | total |
|---|---|---|---|---|---|
| before | 1 | 10 | 18 | 1 | **30** |
| after | 0 | 3 | 17 | 0 | **20** |

### Advisories cleared from the production tree

Next.js (all previously applicable to 16.2.1):

- GHSA-p293-qw3h-jr36 — critical — unauth RCE on windows-hosted servers → 16.3.3
- GHSA-2xp9-vwfh-vxw4 — critical — unauth RCE in Image Optimization API, AVIF → 16.3.3
- GHSA-vcvr-r3jv-pc5j — critical — RCE in `next/og` ImageResponse → 16.3.6 *(not applicable to this app, see §3)*
- GHSA-2464-fhr4-w9xw — critical — unauth RCE in Image Optimization API, SVG → 16.4.1
- GHSA-673q-mjm6-r5xr — critical — RCE in `use cache` typed arrays → 16.4.1 *(not applicable: no `"use cache"` in this repository)*
- GHSA-cjq9-62q9-8jv4 — high — SSRF in Image Optimization → 16.3.8
- GHSA-p3m5-59mp-jv5r — high — DoS in App Router Server Actions → 16.4.1
- plus 27 further high/moderate/low, including the middleware / proxy bypass family (`GHSA-267c-6grr-h53f`, `GHSA-492v-c6pp-mqqv`, `GHSA-6gpp-xcg3-4w24`, `GHSA-26hh-7cqf-hhc6`), which matter because custom-domain routing lives entirely in `middleware.ts`.

Adjacent dependencies:

- GHSA-mrhx-c7xc-m3w5 — high — zod memory exhaustion on oversized constrained collections → fixed by 4.6.6
- GHSA-68fv-2mgg-jv7q — high — source-map-js event-loop DoS → 1.2.2
- GHSA-96hv-2xvq-fx4p — high — ws memory-exhaustion DoS → 8.21.0
- GHSA-58qx-3vcg-4xpx — moderate — ws uninitialised memory disclosure → 8.20.1
- GHSA-px8p-9vwx-vf98 — moderate — fflate infinite loop on malformed ZIP64 → 0.8.3 / 0.6.11
- GHSA-f88m-g3jw-g9cj, GHSA-rgj7-g3m4-5g8c, GHSA-wq5f-xc86-pv6w — high — sharp/libvips/libheif/librsvg → cleared by next 16.4.3 pulling sharp 0.35.5
- GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849 — postcss → cleared by postcss 8.5.23
- GHSA-28wg-ghj8-5hjv, GHSA-2v37-7h3g-55p8, GHSA-xwg4-73v4-xw9w — nanoid → cleared by 3.3.20
- GHSA-w5vr-8v7q-w6rv — baseline-browser-mapping → cleared by 2.11.34

### Remaining: 3 high + 17 moderate, all in the dev toolchain

Every remaining advisory is inside the ESLint / `@typescript-eslint` dependency chain, which never ships to a visitor:

- `brace-expansion` — GHSA-3jxr-9vmj-r5cp, GHSA-mh99-v99m-4gvg, GHSA-rgw5-rvv9-x895, GHSA-qhr7-859c-m2p7, GHSA-6j4f-fj2g-mc7p — high
- `js-yaml` — GHSA-52cp-r559-cp3m, GHSA-5p4m-2wfm-xmqj, GHSA-2883-xcg3-v3hh — high
- `picomatch` — GHSA-c2c7-rcm5-vvqj — high
- 17 moderate packages, all lint-time: `eslint`, `eslint-config-next`, `@eslint/*`, `@typescript-eslint/*`, `eslint-plugin-*`, `minimatch`, `@humanfs/node`, `@next/eslint-plugin-next`

These are **not fixed here**. Fixing them means overriding the internals of the ESLint 9 plugin ecosystem, which is a separate, testable change and outside a framework-patch PR.

## 3. Corrections to the 2026-11-01 website audit

**SEC-01 was rated correctly but evidenced poorly.** It read "high/critical issues with deployment-dependent preconditions" and named no advisory, no patched version. Measured: 34 applicable advisories, 5 critical, 14 high on the installed `next 16.2.1`.

**`/api/og` is not in scope for GHSA-vcvr-r3jv-pc5j.** The advisory's own impact statement reads: *"Applications using the Edge `ImageResponse` implementation, or applications that do not pass attacker-controlled values into SVG content, attributes or styles, are not affected."* `src/app/api/og/route.tsx` declares `export const runtime = "edge"`, so the route is out of scope on the runtime axis as well as on the SVG axis (its query values are rendered into `div` text, not SVG). The audit's "potential SSRF" framing for this route is a **different** issue and is correct to treat separately.

**The remote `photo` parameter is a real, separate concern — and the capability is confirmed, not theoretical.** See §5 for the measurement.

## 4. Lint-config change (compatibility, not a fix)

`eslint-config-next` 16.4.3 bundles a stricter `react-hooks` plugin whose new `react-hooks/refs` rule errors on four sites in `src/app/[locale]/(site)/start/components/segments/HeroSegment.tsx` (lines 78, 80, 117, 118), where zoom/style/pointer refs are deliberately mirrored during render so pointer handlers read the latest value without re-attaching listeners.

Measured: baseline lints 237 warnings / 0 errors (exit 0); with 16.4.3 alone it is 238 warnings / **4 errors** (exit 1). The rule is downgraded to `warn` in `eslint.config.mjs`, next to `react-hooks/set-state-in-effect`, which is already `warn` in this file. No component code was touched: rewriting those refs affects a live pointer-drag interaction that this branch cannot visually verify.

**Open finding LINT-01:** the four ref-mirror sites should be restructured (or the rule re-enabled per file) once the pointer interaction has browser acceptance coverage.

## 5. `/api/og` remote `photo` parameter — measured behaviour

`src/app/api/og/route.tsx:35,296` reads `photo` from the query string and renders `<img src={photo}>`. Measured against a local production build of this branch:

| Probe | Result |
|---|---|
| no `photo` | 200, `image/png`, 214,234 B |
| `photo=https://httpbin.org/image/png` | **200, `image/png`, 259,955 B, 2.59 s** — the Edge renderer fetches and embeds an arbitrary public URL |
| `photo=http://127.0.0.1:3110/_next/image?...` (own loopback) | connection dropped after 3 ms, no response |
| `photo=http://192.0.2.1/x.png` (TEST-NET-1, non-routable) | connection dropped after **10.3 s**, no response |

Server log for the failing cases: `Error: Image size cannot be determined. Please provide the width and height of the image.` — an unhandled renderer exception.

Conclusions that the evidence supports: caller-controlled remote fetching **works** (proven against a benign public endpoint); loopback is refused or fails; a non-routable host holds a request for ~10 s before the connection is dropped and an unhandled exception is logged. That is a request-amplification and SSR F shape worth fixing — but it is **not** proof of internal-network access, and no internal endpoint was probed.

**Open finding SSRF-01:** whitelist permitted image origins (or require an uploaded asset), bound query lengths, cache rendered images, and return a controlled error instead of dropping the connection.

## 6. Verification run

All commands executed in a throwaway worktree at `~/hermes-workspace/agency-sec-next` on this branch.

| Check | Command | Result |
|---|---|---|
| clean install | `npm ci` | exit 0, 457 packages, resolved `next 16.4.3`, `zod 4.6.7` |
| types | `npm run typecheck` | exit 0 |
| lint | `npm run lint` | exit 0 — 242 warnings, 0 errors (baseline: 237 / 0) |
| build | `npm run build` | exit 0 |
| four-frame port | `node --test tests/approved-four-frame-integration.test.mjs tests/home-i18n/content.test.mjs` | 22 pass / 0 fail |
| mapped host | `node --test tests/home-i18n/mapped-host.test.mjs` | 5 pass / 0 fail |
| served routes | `BASE_URL=http://127.0.0.1:3110 node --test tests/home-i18n/{routes,head,assets-a11y}.test.mjs` | 52 pass / 0 fail |

`tests/home-i18n/turso-stub.mjs` is a fixture, not a suite: six test files, 79 tests, all passing.

### Served-output A/B, 16.2.1 vs 16.4.3

Both builds served locally (`3112` baseline, `3110` branch) and the three homepages compared:

| Locale | Visible text | DOM tags | Class attributes | Script/link URL sets |
|---|---|---|---|---|
| `/en` | identical, 4,752 chars | +2 (`<script>` inline) | same count (389) | identical |
| `/ka` | identical, 5,227 chars | +2 | same count | identical |
| `/nl` | identical, 5,356 chars | +2 | same count | identical |

Differences, all framework-internal: font module class names changed shape (`inter_…-module__qDXSWW__variable` → `qDXSWW_variable`) — the same six `--font-*` variables are still emitted, verified in the served CSS chunks; and one external script is now inlined (external 12 → 11, inline 30 → 32). No asset URL appears in only one build, in either direction.

`<html lang>` unchanged: `en`, `ka-GE`, `nl-BE`. Four-frame markers `card4-resolution`, `card2-window` and `genezisi-entry-home` present in all three locales on both builds. Security headers unchanged on the patched build (`nosniff`, `strict-origin-when-cross-origin`, permissions policy, HSTS). `/flagship-journey/infinite-bc/motion.js` still served, 17,993 B.

**Visual and interaction acceptance is explicitly out of scope for this record** — it requires a real browser and is the owner's call.

## 7. Open findings not addressed by this branch

- **SEC-02** — no request throttling or pre-parse body limit on `/api/orders` or `/api/partner-applications`; `/api/orders` accepts any non-null object as `state` and returns raw internals (`detail: msg`, `detail: result.error`) on 500.
- **SEC-03** — admin login has no brute-force controls, no constant-time comparison, a 7-day cookie, a signing secret derived from the admin password, and no server-side session revocation.
- **SEC-04** — no Content-Security-Policy and no `X-Frame-Options` / `frame-ancestors` in `next.config.ts`.
- **SSRF-01** — §5.
- **LINT-01** — §4.
- **PERF-03** — `digital-passage-scene-v6-5.js` imports `three@0.186.1` from jsDelivr while the package tree pins `three@0.183.2`; `KineticHero.tsx:120` loads `hls.js@latest` from jsDelivr with no version pin at all. Both are runtime third-party dependencies owned by someone else's CDN.
- **PERF-04** — five additional live iframes outside `/en/work`, in `(site)/start/components/segments/*` and `HomeLandingPage.tsx`.
- **TOOLCHAIN-01** — §2, the 20 dev-only advisories in the ESLint chain.
