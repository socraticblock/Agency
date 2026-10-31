# GENEZISI / SCREEN 01 — Digital Passage, Director's Cut V2

**Date:** 31 October 2026  
**Status:** Implemented in isolated GitHub branch for real-browser founder visual and performance review. Not visual approval, not production integration, not deployed.  
**Branch:** \`feature/screen01-digital-passage-directed-v2-2026-10-31\`  
**Parent:** \`feature/screen01-digital-passage-threejs-2026-10-31\`, preserved at \`fe441dd\`  
**Creative authority:** Founder authorized assistant to advance the visual and engineering design of the actual Screen 01 CTA, without touching the remaining screens or production.

## Why V2 exists
The first Three.js scene proved a real camera, procedural tunnel and real DOM navigation but repeated decagonal rings and used an overlay fade for arrival. V2 replaces the monotone visual rhythm with **three authored spatial chapters**. It remains an experiment requiring actual browser footage.

### Act I — Source-origin threshold
A directional eight-sided aperture emanates from the clicked CTA. Behind it is **one asymmetric monumental structure**, combining cream editorial material and evergreen engineered stone/metal. This deliberately does not use the rejected twin hinged doors or a curled page. The camera must physically pass its near surfaces.

### Act II — Impossible nave
A long central void is bounded by *non-identical* structural chapters. Width, height, cantilever, off-axis massing and light seams vary; suspended wings cross different depth planes. Real 3D filament curves, spatial light packets, fog, emissive materials and strategically positioned practical lights provide parallax and forward velocity. This must not look like a tunnel built from copies of one rectangular frame.

### Act III — Resolution into real Work
Physical foreground plates move out of the sightline as a controlled iris **masks the entire canvas**, revealing the actual existing \`#work\` DOM underneath, already in its correct scrolled position. The reveal center comes from the actual Work \`h2\` bounding rectangle. This is not a copied screenshot or a generic opacity fade. The circle is a temporary mask construction, not a promise of physical transformation, and should be judged candidly against real footage.

## Changed files
- NEW: \`public/flagship-journey/infinite-bc/digital-passage-scene-v2.js\` (new 3D staging)
- UPDATED: \`public/flagship-journey/infinite-bc/digital-passage-nav.js\` (V2 load, shorter timeout, intent preload, Back safety)
- UPDATED: \`public/flagship-journey/infinite-bc/digital-passage.css\` (remove progress-demo HUD; full bleed atmosphere)
- UPDATED: \`tests/screen01-digital-passage.test.mjs\` (V2 contracts)

The parent file \`digital-passage-scene.js\` remains unchanged as a checkpoint. The existing Gate 1b \`index.html\` stays wired to the same CTA controller; it dynamically loads V2 on intent. **No changes** to \`motion.js\`, Screens 02–04, Work markup, Next.js production components, or any other business service.

## Review in served browser — exact procedure
1. Check out this precise branch in a separate worktree; preserve all Codex/other local changes.
2. Serve the existing application/tunnel. Open \`/flagship-journey/infinite-bc/index.html\` without the debug parameter for normal playback.
3. Check Option D 0% state. Click **Explore our work**; confirm that the camera travels through actual architecture rather than a curl or generic box tunnel.
4. Check midpoint K2/K3 paused frames at 25, 40, 55, 70, 82, 92 and 100%; evaluate thickness, perspective, clipping, lighting and memorable spatial changes. Capture desktop 1440×900, Android-style portrait 390×844 and narrow 320×568.
5. Verify final physical plates disassemble while **authentic Work** is exposed by the aperture; no flat page zoom or jump. The screen must end on the actual focusable Work DOM, with the normal page and scroll behavior restored.
6. Verify browser Console/Network: module fetch from \`cdn.jsdelivr.net\` for pinned \`three@0.186.1\`, shader compilation/link, WebGL context, errors, long tasks and actual GPU frame timings. The code is not fully locally browser-verified.
7. To pause/inspect on a separate run, navigate to \`?passageDebug=1\`. Click CTA, then in Console use \`window.__genezisiPassage.seek(.55)\`; \`.seek(.82)\`; \`.resume()\`. \`window.__genezisiPassage.stats\` gives last draw calls, triangles, pixel ratio and progress. Debug is not a product UI.
8. Test Ctrl/Meta-click, keyboard-only, reduced-motion, WebGL unavailable, slow/offline CDN, back/forward while loading, wheel/touch interruptions, mobile orientation change and repeated clicks. No-JS: original \`href="#work"\` still works.
9. No preview branch, build deployment, main merge or Gate 2. Do not start redesigning Screens 02–04 until explicit visual authorization.

## Engineering decisions
- **Three.js 0.186.1** pinned on a stable existing branch dependency. The r187 release is newer, but novelty alone is not a quality guarantee. For production, vendor/bundle Three.js and respect CSP rather than depend on the CDN.
- One WebGL2 context, a dynamic scene behind an isolated overlay, no full-page JS clientification, no scroll interception and no application-router changes.
- World-space instanced light parcels plus shared geometry/materials; custom fragment light sheets, exponential scene fog and physically based matte/polished materials.
- No realtime shadow maps or heavy full-frame bloom pass for this first measured review. Those effects are optional refinements **only if visual evidence justifies their cost**. It would be inaccurate to call the fog physically simulated volumetrics.
- Intent loading; 1.5s load timeout followed by direct anchor if blocked. Mobile DPR cap and basic dropped-frame backoff. Scene and InstancedMesh disposal, context loss handler, history handling and immediate-interrupt policy.
- Duration is presently 2.52s *when loaded*. This is deliberately a working cinematic hypothesis, not founder-approved timing.

## Acceptance distinction
JS parsing and source-contract checks can pass while actual browser rendering still fails. This proof has not yet passed Chrome/Edge/iOS or mobile GPU evidence, visual look, Work pixel continuity or full accessibility QA. Founder must explicitly approve after real recordings.
