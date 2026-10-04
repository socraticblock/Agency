# Genezisi V2 — Execution Status

**Date:** 4 October 2026  
**Branch:** `genezisi-v2/motion-performance-rebuild`  
**PR:** #4  
**Production `main`:** not replaced  
**Production cutover:** explicit owner approval required

## Implemented

The V2 prototype currently includes:

- English and Georgian prototype routes at `/[locale]/v2-prototype` with route-level `noindex, nofollow`.
- Signature Signal story: **Surface → Request → Understand → Act → Human Review → Resolve**.
- Desktop cinematic choreography using GSAP / ScrollTrigger / MotionPath, with one Signal contained in the same SVG coordinate system as its route.
- Mobile choreography rebuilt around normal document scrolling and discrete chapter activation. Mobile does not load or execute the GSAP hero timeline.
- Mobile route state that remains visually completed as the request progresses, reverses when the visitor scrolls backward, and uses a distinct human-review branch.
- Reduced-motion detection implemented with the browser media query directly, avoiding a Framer Motion runtime just for one preference hook.
- Reduced-motion static story with no scroll-dependent comprehension.
- Selected Work without automatic live iframes; real outbound project links remain available.
- Websites / AI systems / Automation positioning.
- A lightweight Genezisi Lab interaction showing request → understanding → action → exception → outcome.
- Founder-led positioning and direct WhatsApp conversion.
- V2-only Georgian display weights instead of widening the production-wide font payload.
- Below-fold `content-visibility` containment hints.
- No mandatory hero video, WebGL loop, Lenis scroll-jacking or mobile smooth-scroll layer.

## Self-review corrections

The review pass after PR creation corrected:

- prototype indexing strategy: route-level `noindex` remains, while `robots.txt` no longer blocks crawlers from seeing that directive;
- unintended global production SEO changes were removed from this prototype PR;
- unintended global production WhatsApp-copy changes were removed; V2 now owns localized intake copy locally;
- V2-only Georgian font weights were moved out of the root font bundle;
- mobile chapter activation no longer depends on whichever IntersectionObserver entry happens to arrive first;
- completed mobile route segments remain completed instead of retracting immediately;
- inactive chapters no longer expose multiple visible Signal dots;
- the human-review chapter has a distinct routed branch;
- desktop/mobile mode switching retains explicit lifecycle cleanup across breakpoint changes;
- the V2 hero no longer imports Framer Motion merely to detect reduced-motion preference.

## Build gate

The authoritative build result is the Vercel status attached to the **current PR head**. A previously green SHA is not sufficient after later review fixes.

Do not merge unless the current head reports success.

## Repository integrity

- The branch starts from the latest `main` base used for this work.
- The previous long-lived V2 draft PR is closed as superseded.
- Existing production homepage routes remain intact.
- The V2 prototype is not included as a production homepage replacement.
- Route-specific metadata marks the prototype as non-indexable.
- Production-wide SEO/contact copy is intentionally left unchanged until actual cutover.

## External acceptance gates

Repository/build validation does not substitute for:

- rendered review at 320 / 360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1728+;
- slow scroll, fast flick, reverse scroll and rapid direction changes;
- reload mid-sequence and browser back/forward;
- resize and orientation changes;
- iPhone Safari;
- mid-range Android Chrome;
- desktop Safari / Firefox / Edge;
- measured frame behavior and Core Web Vitals;
- English and Georgian line-break/glyph review;
- final visual judgment against the supplied current-site recording;
- clean direct screenshots for TK Counsel and Her House Pilates before production cutover. The current lightweight covers are prototype presentation, not final proof imagery.

## Gate conclusion

**Implementation is ready for rendered/device acceptance once the current PR head is green.**

Do not merge to `main` until that acceptance pass is complete and explicitly approved.
