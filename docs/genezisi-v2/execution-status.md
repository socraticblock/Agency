# Genezisi V2 — Roadmap Completion Status

**Date:** 4 October 2026  
**Branch:** `genezisi-v2/planning`  
**Production `main`:** untouched  
**Production cutover:** explicit owner approval required

## Roadmap implementation — complete

The protected V2 branch now implements the roadmap:

- Research, competitive direction, experience specification, codebase audit and implementation roadmap.
- Isolated English and Georgian V2 prototype routes with `noindex, nofollow` plus robots exclusion.
- Signature Signal story: **Receive → Route → Review → Resolve**.
- Desktop hero: ~360svh native-scroll sticky scene using **GSAP 3.15 + ScrollTrigger + MotionPath**.
- One persistent Signal follows a visible SVG route; human review uses a distinct branch.
- Website surface shifts/scales/rotates shallowly to reveal the operational layer.
- Enquiry appears after first paint rather than being present from frame zero.
- Useful action, owner review and calm resolved state are staged explicitly.
- Completion fades the active path and removes motion rather than ending in spectacle.
- Mobile: separately authored ~280svh sticky sequence with one primary interface at a time and a vertical Signal cue.
- Reduced motion: complete static six-state story; no scroll-dependent comprehension.
- Hero architecture split into dedicated V2 copy, visual, stage and timeline modules with lifecycle cleanup.
- Selected Work: three large editorial project moments with real destinations and honest live/prototype status labels.
- TK Counsel and Her House Pilates use lazy decorative live previews with separate accessible outbound links; Frankencoin Desk uses the real repository screenshot.
- Websites / AI systems / Automation positioning.
- Genezisi Lab explicitly labeled **Internal demo**, tied to the same sample request and showing request → understanding → action → exception → final outcome.
- Founder section: **Small by design**, direct founder-led positioning, no fake team and no fabricated portrait.
- WhatsApp available in the fixed header, after Selected Work and in the final contact section.
- Central WhatsApp intake copy broadened beyond website-only enquiries.
- English and Georgian marketing copy, navigation, status labels and metadata.
- Georgian font stack includes real 400 / 600 / 700 / 900 Noto Sans Georgian weights.
- Language switching remains available down to small-phone widths.
- Localized page metadata and route-specific Open Graph image.
- Broader Genezisi business metadata/structured-data copy for Websites + AI + Automation.
- Keyboard focus, touch-target, semantic navigation and hidden-state accessibility pass.
- No mandatory hero video, WebGL render loop or Lenis dependency.
- Production homepage is still not replaced.

## Self-review corrections completed

A deliberate second review found and fixed:

- incomplete reduced-motion behavior;
- missing resolved desktop state;
- enquiry visible too early;
- linear “review” behavior instead of a true branch;
- mobile choreography that was too long / too desktop-like;
- short-phone clipping/header pressure;
- partial Georgian localization and synthetic heavy Georgian weights;
- duplicated WhatsApp copy;
- duplicate `#main-content` / skip-link ownership;
- missing mobile locale switch;
- weak text contrast;
- placeholder portfolio art where real project proof was available;
- live iframes nested inside clickable project cards;
- abstract founder image placeholder despite no real portrait asset;
- Genezisi Lab ending before the final business outcome;
- stale website-only locale SEO;
- stale inherited website-only V2 social image;
- route cue staying visually loud at completion;
- inactive opacity-only hero states remaining semantically visible before GSAP initialization.

## Build validation

**PASS.** Full implementation code head:

`0815debacc9108ce26ee308249dd1bdaa4c6ae46`

reports a successful Vercel build.

The stable branch preview alias is:

`https://agency-git-genezisi-v2-planning-socraticblock-7157s-projects.vercel.app`

Review routes:

- `/en/v2-prototype`
- `/ka/v2-prototype`

## Repository integrity

- Production `main` remains the base and has not been merged/replaced.
- V2 is confined to the protected branch.
- Existing pricing/service routes remain intact.
- The V2 prototype is excluded from indexing and the sitemap.
- No old website-only WhatsApp default remains in the V2 path.
- No TODO/FIXME/placeholder markers remain in the V2 implementation.
- Framer Motion is retained only for reduced-motion detection in V2; the signature scroll choreography is GSAP/ScrollTrigger.
- No fake performance metrics, client AI claims or fabricated founder photography were introduced.

## External acceptance gates — not certifiable from this environment

The Vercel alias is deployed, but the available review browser refuses access to the Vercel preview domain and the local Chromium runtime has no outbound DNS/network access. Therefore repository/build validation cannot honestly substitute for:

- pixel review at 320 / 360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1728+ and short-laptop height;
- slow wheel / fast wheel / trackpad flick / reverse scroll;
- direct scrollbar jump;
- reload mid-sequence;
- resize and orientation changes;
- browser back/forward;
- real iPhone Safari;
- real mid-range Android Chrome;
- desktop Safari / Firefox / Edge;
- measured frame rate and Core Web Vitals;
- rendered Georgian line-break/glyph review;
- visual judgment that the final art direction reaches the intended premium bar.

A real founder portrait is not present anywhere in the repository or available project files. The V2 founder section intentionally remains typographic rather than using a fake or generated portrait.

## Gate conclusion

**Implementation roadmap: complete on the protected branch and build-validated at `0815debacc9108ce26ee308249dd1bdaa4c6ae46`.**

**Acceptance/launch roadmap: not complete until rendered/device QA and owner visual approval occur.**

Do not merge to `main` merely to bypass preview restrictions.

## Production cutover after acceptance

1. Fix any defects discovered in rendered/device QA.
2. Verify English + Georgian, WhatsApp, work links, keyboard navigation and reduced motion in the rendered build.
3. Preserve/tag the current production rollback point.
4. Obtain explicit owner approval.
5. Merge the approved V2 branch to `main`.
6. Smoke-test production and preserve immediate rollback.
