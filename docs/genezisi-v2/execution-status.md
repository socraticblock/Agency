# Genezisi V2 — Execution Status

**Date:** 4 October 2026  
**Branch:** `genezisi-v2/motion-performance-rebuild`  
**PR:** #4  
**Production `main`:** not replaced  
**Production cutover:** explicit owner approval required

## Current implementation

The V2 prototype now includes the post-recording visual-polish pass:

- English and Georgian prototype routes at `/[locale]/v2-prototype` with route-level `noindex, nofollow`.
- Signature story: **Surface → Request → Understand → Act → Human Review → Resolve**.
- Desktop GSAP choreography re-composed around one dominant state at a time.
- The website surface shifts aside to reveal a substantial operational surface rather than leaving isolated cards in empty space.
- Signal movement and route drawing are timed to visible interface reactions.
- Human review uses a distinct routed branch.
- Resolution clears the website/system/action/review layers before the final statement settles.
- Desktop hero reduced to a bounded ~275svh scene.
- Mobile remains native document scrolling with discrete chapter activation and no GSAP runtime.
- Mobile chapters have tighter pacing, stronger route contrast, one active Signal and reversible completed-route state.
- Reduced motion remains a complete static story.
- Genezisi Lab is an interactive request → state → outcome proof rather than a static settings-style list.
- Capability rows received restrained semantic interaction without introducing another heavy animation sequence.
- Selected Work no longer depends on live iframes.
- Frankencoin uses the real repository screenshot.
- TK Counsel now uses a static reconstruction based on the current live site's real structure/content instead of generic invented artwork.
- Her House uses the live project's real hero imagery and current live-site content inside a static presentation.
- Existing outbound project links remain the source of truth.
- Founder-led positioning and direct WhatsApp conversion remain intact.
- V2-only Georgian display weights remain scoped to the prototype route.
- Below-fold `content-visibility` containment remains in place.

## Self-review corrections retained

Earlier review findings remain fixed:

- production-wide SEO is not changed by this prototype PR;
- production-wide WhatsApp copy is not changed by this prototype PR;
- `robots.txt` does not block the prototype from exposing its `noindex` directive;
- V2-only font weights do not widen the global root font payload;
- mobile chapter selection is deterministic;
- completed route segments remain completed while progressing and reverse on back-scroll;
- inactive chapters do not imply multiple active Signals;
- reduced-motion detection does not require Framer Motion in the V2 hero;
- desktop GSAP attaches/detaches cleanly across the desktop breakpoint.

## Build gate

The authoritative result is the Vercel status on the current PR head.

The post-recording polish implementation has passed Vercel build validation.

## Remaining acceptance gates

Build validation does not replace rendered/device acceptance.

Before merge, review:

- desktop composition at 1366×768, 1440×900 and 1728+;
- mobile at 320, 360, 390 and 430 widths;
- slow scroll, aggressive flick, abrupt stop and reverse scroll;
- resize/orientation changes through the 1024 breakpoint;
- iPhone Safari;
- mid-range Android Chrome;
- reduced motion;
- English and Georgian line breaks;
- Selected Work image loading and crops;
- final visual comparison against the supplied before/after recordings.

## Belgian Dutch (`/nl`) — 2026-10-10

The V2 homepage is being extended to Belgian Dutch on
`feat/genezisi-belgian-dutch-homepage` (base `879b5b7e9ea5…`). The same rendered/device gate
above applies to `/nl`, plus the language switcher and the Dutch line breaks. Local route,
metadata and content evidence is in
[`../internationalization/nl-be-test-report.md`](../internationalization/nl-be-test-report.md);
the owner-run visual checklist is at the end of that file. No preview or production deployment
has been created.

The current environment cannot open the private Vercel preview, so rendered judgment remains an owner/device gate.

## The motion rebuild — 2026-10-27

**Branch:** `feat/genezisi-epic-preview` (base `08b3177`) · **PR:** #9 (draft) · **HEAD:** `c74f157`

The V2 homepage in `main` is text-led and static. This branch is the **motion** version:

- `/[locale]/scroll-preview` — the desktop GSAP/ScrollTrigger Signal story restored on its own
  `noindex, nofollow` route, so it can be judged without touching the live homepage.
- A **scroll-scrubbed frame layer** behind the story: the frame index is arithmetic on scroll
  progress, driven by the same GSAP timeline as the panels (one clock, one easing curve, no
  drift). 96 WebP frames at 960 px, fetched on demand as the scroll approaches them; the layer is
  not mounted at all below 1024 px.
- **The frames are the master asset, not a derivative of a video.** The previous layer shipped
  one MP4 and scrubbed it by seeking `video.currentTime` on every tick, then built a runtime
  cache of 90 decoded canvases at 960×540 to make the scrub smooth — ~178 MB of decoded RGBA,
  built by seeking 90 times at load. With frames there is no seek, no decode and nothing to
  drift; memory is a 16-frame LRU (~33 MB) instead of the clip length.
- The frames are **rendered in 3D, not drawn in 2D**: a Blender Cycles scene — a routed path
  across a blueprint grid with volumetric mist, a moving camera, depth of field and a signal that
  lights each station as it arrives. Rendered on the RTX 3090 (CUDA): 96 frames at 1920×1080 /
  48 samples in 15m44s. `scripts/media/build-scrub-frames.sh` reproduces the sequence end to end
  (render → WebP → poster). `scripts/media/generate-scroll-video.py` remains committed as the
  MiniMax path for when the account has video quota (it returned 402 — the video product is a
  separate plan from chat).
- Homepage craft pass on top: one grotesk display type scale, staggered hero entrance, a
  five-project work grid, and the Sakartvelo + Socraticblock portfolio entries.
- The desktop story is now published to the accessibility tree (GSAP `autoAlpha: 0` had dropped
  the whole narrative out of it — measured with CDP `Accessibility.getFullAXTree`: one heading,
  nothing else).

**Gates:** typecheck clean · lint 0 errors (236 pre-existing warnings) · `next build` clean ·
`scripts/media/test-scrub-frames.mjs` 18/18 pass (index mapping, monotonicity, every frame
reachable, nearest-frame fallback, LRU bound) · `scripts/media/verify-scrub-browser.mjs` PASS —
9 distinct canvas states across 9 scroll positions, `has-frames` set at every step, zero page
errors · `scripts/media/probe-scrub-story.mjs` confirms the foreground story advances in step
with the footage (intro → surface → enquiry → system → action → owner → resolved, signal route
drawing 0.00 → 0.46 → 0.86 → 1.00, review branch 0 → 1) · mobile issues zero media requests ·
AX tree contains the full transcript in `h1 → h2 → h3` order.

**Fixed during verification:** the client requested `f000..f095` while the files are
`f001..f096` (every fetch 404'd), and the layer's `has-frames` class was set on frame *load*
rather than on frame *draw* (a black flash over the poster). Both fixed in `63e9742`.

**Not done:** no production deploy, `main` untouched. `vercel.json` gates Git deployments to
`main` and `preview-*`, so this branch triggers no Vercel build. Rendered/device acceptance on
the owner's hardware is still the open gate.

## Gate conclusion

**Code architecture: accepted.**  
**Static/self-review: accepted.**  
**Current Vercel build: passed.**  
**Production merge: still requires rendered/device review and explicit owner approval.**

Do not merge to `main` merely because the deployment is green.
