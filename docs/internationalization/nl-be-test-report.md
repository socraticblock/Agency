# NL-BE test report

Everything below was executed against a **served production build** of this branch
(`npm run build` → `npm run start -- --port 3100`), not against the dev server.

| Gate | Command | Result |
|---|---|---|
| Lint | `npm run lint` | exit 0 — 0 errors, 234 warnings (identical to baseline) |
| Types | `npm run typecheck` | exit 0, clean |
| Build | `npm run build` | exit 0, `✓ Compiled successfully` |
| Routes + rendered head | `BASE_URL=http://localhost:3100 node --test tests/home-i18n/routes.test.mjs tests/home-i18n/head.test.mjs` | **42 tests, 42 pass, 0 fail** |

One transient failure was observed and resolved: an unrelated `next/font/google` module
resolution error (network fetch to Google Fonts) failed one build attempt. Connectivity was
verified with `curl` and the build then succeeded unchanged. It is not caused by this branch,
but it is recorded because it can make a build look broken.

## Route matrix (real HTTP, redirect: manual)

| Input | Expected | Observed |
|---|---|---|
| `/` | 308 → `/en` | ✅ 308 → `/en` |
| `/en`, `/ka` | 200, correct language | ✅ |
| `/nl` | 200, Dutch | ✅ Dutch copy, no English proof line |
| `/nl/` | no loop | ✅ 200 |
| `/nl?utm_source=test` | 200 Dutch, canonical `/nl` | ✅ |
| `/nl/pricing`, `/nl/pricing/professional`, `/nl/work`, `/nl/start`, `/nl/blog`, `/nl/websites`, `/nl/c/example` | 307 → `/en/…` | ✅ all seven, `Location: /en/…`, query preserved (`?x=1` case) |
| `/nl/unknown`, `/nl/unknown/nested`, `/nl/v2-prototype`, `/nl/admin` | 404, never English 200 | ✅ 404, body is the app's own not-found shell (same as `/en/<unknown>`) |
| `/fr` | baseline 308 → `/en/fr` | ✅ unchanged |
| `/en/pricing`, `/ka/pricing` | 200 | ✅ |
| `/onboarding`, `/onboarding-brief`, `/success` | 200, unlocalized | ✅ |
| `/api/og?…` | image response | ✅ 200, `image/*` |
| `/games` | configured game redirect | ✅ → `broken-chapel-prototype.vercel.app` |
| `/sitemap.xml` | contains `/nl`, no `/nl/pricing` etc. | ✅ |
| `/robots.txt` | points at the sitemap, `/nl` not blocked | ✅ |
| `/nl/unknown?next=https://attacker.example` | 404, no `Location` | ✅ no open redirect |
| `/nl%2Fpricing`, `/nl/%2e%2e/pricing` | no crash, no loop | ✅ |

Custom host: a request with `Host: some-client.example` still falls through exactly as before
(308 → `/en`). The mapped-host rewrite is untouched and still runs before the NL branch.

## Rendered head (`<link>`/`<meta>` tags only, never RSC payload substrings)

| Check | `/en` | `/ka` | `/nl` |
|---|---|---|---|
| Exactly one canonical | ✅ `/en` | ✅ `/ka` | ✅ `/nl` |
| Exactly 4 reciprocal alternates (`en`, `ka-GE`, `nl-BE`, `x-default`→`/en`) | ✅ | ✅ | ✅ |
| `og:locale` | `en_US` | `ka_GE` | `nl_BE` |
| `og:url` = own canonical | ✅ | ✅ | ✅ |
| `og:image` = `/api/og?…`, rendered as a real PNG | ✅ | ✅ | ✅ 1200×630 PNG magic number verified |
| Dutch share card free of the English sentence | n/a | n/a | ✅ |
| Exactly one JSON-LD script, `Organization`, country `GE`, no Belgian claim | ✅ | ✅ | ✅ |

Legacy regression: `/en/pricing` still serves its own canonical, its pricing OG image
(`type=pricing`) and exactly one `LocalBusiness` graph.

## Content language

`/nl` ships `<div id="main-content" lang="nl-BE">` and `<main lang="nl-BE">`.
Root `<html lang="en">` remains (known limitation, see decisions doc §7.1). `LangSetter`
sets `document.documentElement.lang = "nl-BE"` after hydration.

## WhatsApp

All three CTAs on `/nl` (header, hero, founder) resolve to the same URL:
`https://wa.me/995579723564?text=Hallo%20Genezisi%2C%20ik%20wil%20graag%20een%20project%20bespreken.%20Kunnen%20we%20even%20overleggen%3F`
— one `encodeURIComponent` pass, same destination as EN/KA.

## NOT TESTED — owner-run visual/device gate

No browser automation is available or permitted in this environment, so **no screenshot,
layout, zoom, keyboard, screen-reader or real-device claim is made**. These remain open:

- [ ] `/nl` at 320×568, 360×800, 390×844, 430×932, 768×1024, 1024×768, 1366×768, 1440×900, 1728×1000, and 667×375 landscape.
- [ ] EN/KA/NL side by side at 320 and 1440 — confirm no EN/KA visual change.
- [ ] Header at 320px: wordmark + `EN · KA · NL` + CTA all visible and tappable (≥44px targets).
- [ ] All five NL demo states: mobile sticky stack, and the short-viewport fallback (a phone ≤700px tall should show the cards in normal flow, nothing truncated or buried).
- [ ] Desktop stage: click each step, slow scroll, reverse scroll, resize through `lg`, reduced motion.
- [ ] Keyboard: tab order, visible focus, `aria-current` announced, Enter/Space on stage buttons.
- [ ] 200% zoom, JavaScript disabled, screen-reader language on `/nl`.
- [ ] WhatsApp deep link opens the intended account (do **not** send a message from QA unless intended).
- [ ] Portfolio destinations still load: tkcounsel.com, frankencoindesk.com, her-house-pilates.vercel.app.
- [ ] Samsung Galaxy S25 + Brave (owner's device) for the sticky stack and header.

## Editorial sign-off

Native/proficient Belgian-Dutch review: **pending**. The Dutch copy is the brief's candidate
with light polish; it has not been certified by a native reviewer.
