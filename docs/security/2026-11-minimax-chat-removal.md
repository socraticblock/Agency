# Removal of the MiniMax chat integration

**Date:** 1 November 2026
**Branch:** `chore/remove-minimax-chat`
**Base:** `main` @ `8428111`
**Driver:** Genezisi no longer uses MiniMax for chat. The integration was public, unauthenticated and unvalidated, and it spent the owner's API credits.

## What was removed

| File | Why it was safe to remove |
|---|---|
| `src/app/api/chat/route.ts` | Public `POST` proxy to `api.minimax.io` authenticated with `MINIMAX_API_KEY`. No schema, no length bound, no cap on forwarded history. |
| `src/components/chat/ChatWidget.tsx` | The only caller of `/api/chat` (`fetch("/api/chat", …)`). Not rendered anywhere. |
| `src/components/chat/ChatWidgetWrapper.tsx` | Shell component that did nothing but `return null;`, imported by no route. |
| `src/lib/bot-config.ts` | Declared `model: "MiniMax-M2.7"` and imported the knowledge base. Imported by nothing. |

Removal was verified by dependency tracing, not by eye:

- `git grep ChatWidgetWrapper src` → only its own definition. Nothing mounted the chat UI.
- `git grep "api/chat" src` → only `ChatWidget.tsx`, which itself had no importer.
- `git grep bot-config src` → only `bot-config.ts` importing `bot-knowledge`.
- `git grep -i minimax` after removal → no matches in `src/` or `public/`.

## Environment variables

`MINIMAX_API_KEY` is no longer read by any code in the repository. It was never listed in `.env.example`, so there is no documentation entry to remove — which is itself worth noting: the variable was consumed but undocumented.

**Owner action required:** delete `MINIMAX_API_KEY` from the Vercel project environment, and revoke the key at the provider. Removing the code stops the spend path; only revocation invalidates the credential.

No other environment variable was touched. `GEMINI_API_KEY` stays: it is used by `/api/test`, which is production-guarded (`NODE_ENV === "production"` → 404).

## Deliberately retained

**`src/lib/bot-knowledge.ts`** — the product/pricing knowledge base. It contains no MiniMax reference, no network code and no secrets; it is brand content (tiers, prices, delivery timelines, the "Sophiko AI" identity). It is now imported by nothing.

It is kept rather than deleted because removing several hundred lines of product copy is not a security change and is not cheap to reverse. **If it should go, say so and it is a one-line follow-up** — but it should be a content decision, not a side effect of a security cleanup.

## Other unused dependencies identified (not removed)

`gsap` is declared in `package.json` (`^3.15.0`) and imported by **zero** files in `src/` or `public/`; the only other reference is a documentation link in `docs/genezisi-v2/research-and-creative-direction-2026-10-04.md`. It is dead weight in the install, unrelated to MiniMax, and removing it changes the lockfile — so it is reported here rather than bundled into this branch.

Every other declared dependency has at least one real importer (`@google/generative-ai` → `/api/test`; `qrcode`, `lenis`, `three`, `@react-three/*`, `@supabase/supabase-js`, `zod`, `react-textarea-autosize`, `lucide-react`, `framer-motion` → live code).

## Verification

| Check | Result |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run lint` | exit 0 — 240 warnings, 0 errors |
| `npm run build` | exit 0 |
| build output | `api/` contains admin, cards, og, onboarding, orders, partner-applications, test, test-db — **no `chat`** |
| `POST /api/chat` | `404` |
| `GET /api/chat` | `404` |
| `/` `/en` `/ka` `/nl` `/en/work` `/en/pricing` `/en/start` | 308 / 200 / 200 / 200 / 200 / 200 / 200 |
| `/api/og` `/sitemap.xml` `/robots.txt` `/llms.txt` | 200 |
| four-frame markers on all three locales | `card4-resolution`, `card2-window`, `genezisi-entry-home` present |
| `approved-four-frame-integration` + `content` | 22 pass / 0 fail |
| `mapped-host` | 5 pass / 0 fail |
| `routes` + `head` + `assets-a11y` | 52 pass / 0 fail |

No homepage, animation, typography, layout, price, route or copy was touched.

## Remaining references

None in source or static assets. `docs/` still contains historical mentions of MiniMax in audit/planning notes; those are records of past decisions and are left intact deliberately (provenance is not rewritten).
