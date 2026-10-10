# NL-BE baseline — homepage localization (2026-10-10)

Gate A evidence for `feat/genezisi-belgian-dutch-homepage`.

## Verified starting point

| Item | Value | How it was verified |
|---|---|---|
| Repository | `socraticblock/Agency` | `git remote -v` |
| Remote `main` SHA | `879b5b7e9ea5c16681b56b5e176f127830692918` | `gh api repos/socraticblock/Agency/commits/main --jq .sha` (commit date 2026-10-08) |
| Local `origin/main` | `879b5b7e9ea5c16681b56b5e176f127830692918` | `git rev-parse origin/main` |
| Working checkout | `~/hermes-workspace/agency-v2-preview` | local clone, clean tree at branch time |
| Branch | `feat/genezisi-belgian-dutch-homepage` (created from `origin/main`) | `git switch -c … origin/main` |
| Node / npm | v26.7.0 / 11.19.0 | `node -v` / `npm -v` |
| Stack | Next 16.2.1 (Turbopack), React 19.2.3, Tailwind 4, TS 5 | `package.json` |

**Note:** `git fetch` over SSH fails in this environment (`Permission denied (publickey)`).
Remote truth was therefore established with the authenticated `gh` CLI, which authenticated
as `socraticblock`. This is not a blocker for branch work and is recorded rather than worked
around silently.

## Production parity

Production was probed read-only with `curl` (no browser). Public behaviour observed
**before** any change:

```text
https://genezisi.com/            -> 308  https://genezisi.com/en
https://genezisi.com/en          -> 200
https://genezisi.com/ka          -> 200
https://genezisi.com/nl          -> 308  https://genezisi.com/en/nl
https://genezisi.com/nl/pricing  -> 308  https://genezisi.com/en/nl/pricing
https://genezisi.com/sitemap.xml -> 200
https://genezisi.com/robots.txt  -> 200
```

`/nl` did not exist: an unknown first segment is redirected to `/{default}{path}`, which is
why `/nl` became `/en/nl` (and then 404s).

**Unverified:** the exact Vercel deployment SHA serving production. No Vercel credentials or
dashboard access were available from this environment, so deployment parity is *assumed*
from the fact that the Vercel project deploys `main`, and is marked as a release-gate item
(see the rollout doc).

## Route inventory at baseline

- `/[locale]` — V2 homepage (`src/app/[locale]/page.tsx`), dynamic, EN/KA only.
- `/[locale]/(site)/…` — legacy marketing and app surfaces: `apply`, `blog`, `blog/[slug]`,
  `booking-websites`, `c/[slug]`, `enterprise`, `online-stores`, `partner`, `pricing`,
  `pricing/{professional,command-center,e-commerce}`, `service-websites`, `start`,
  `start/preview`, `stop-renting`, `v2-prototype` (noindex), `websites`, `work`,
  `admin/orders`.
- Unlocalized, outside the locale prefix: `/onboarding`, `/onboarding-brief`, `/success`,
  `/api/*`, `/opengraph-image`, `/sitemap.xml`, `/robots.txt`.
- `next.config.ts` `redirects()`: `/games` and `/games/:path*` → the game's own deployment.
  Redirects resolve **before** middleware, so they are unaffected by locale work.
- Custom-host rewrite: an unpublished-but-mapped host is rewritten to `/{default}/c/{slug}`
  inside middleware, before any locale logic.

## Baseline gates (before edits)

| Command | Result |
|---|---|
| `npm run lint` | exit 0 — **0 errors, 234 warnings** (pre-existing) |
| `npm run typecheck` | exit 0, clean |
| `npm run build` | exit 0 (`✓ Compiled successfully`) |

Logs: `baseline-build.log` in the QA evidence folder.

## Known constraints carried into implementation

1. Root `src/app/layout.tsx` renders `<html lang="en">` for every route; the locale wrapper
   and client `LangSetter` set language below that. Fixing the root would require moving the
   locale root or making every route dynamic — out of scope for this branch.
2. `src/lib/i18n.ts` (`Locale = 'en' | 'ka'`) is used by legacy dictionaries and must not
   gain `nl`.
3. No test runner is configured in the repo; `lint`/`typecheck`/`build` were the only gates.
4. The Dutch copy supplied with the brief is an editorial candidate, not native-certified.
5. Verified business facts not available: professional email address, ability to hold calls
   in Dutch, legal/invoicing particulars. Nothing was invented to fill these gaps.
