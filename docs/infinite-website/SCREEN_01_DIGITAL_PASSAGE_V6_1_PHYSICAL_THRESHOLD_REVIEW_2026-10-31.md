# GENEZISI — Screen 01, Digital Passage V6.1: World-Space Camera-to-CTA Threshold

**31 October 2026 — Implementation candidate.** Locked concept unchanged. Founder authorized the specific V6.1 refinement after V6 footage: the button must feel like a physical doorway approached by a real camera, not a giant scaled HTML button or an expanding green rectangle. Entrance only; preserve the remaining digital architecture and Work arrival.

## Branches and authority
- **V6.1 isolated branch:** \`feature/screen01-digital-passage-locked-v6-1-camera-threshold-2026-10-31\`
- **V6 preserved:** \`feature/screen01-digital-passage-locked-v6-cta-focus-2026-10-31\` at \`b5405b2\`.
- Locked concept: \`SCREEN_01_DIGITAL_PASSAGE_LOCKED_DIRECTION_2026-10-31.md\`.
- No main merge, preview deployment, Screen 02–04 modifications, Work content changes, page-scroll redesign or additional FX work.

## Engineering change
Previous V6 still used \`trigger.style.transform = translate3d(...) scale(...)\`. The visitor saw an enlarged HTML CTA followed by a different scene, with an oversized CTA label. V6.1 **does not scale or translate the HTML CTA at all**.

Instead:
1. Measure the real CTA bounds once. Create a real 3D rounded doorway whose world-space aspect equals the measured CTA's width and height.
2. Derive the first camera-to-door distance from the physical doorway height, viewport height, field of view and CTA pixel height:
   \`distance = worldDoorHeight * viewportHeight / (2 * tan(fov/2) * ctaHeight)\`.
3. Derive the initial 3D camera X/Y offsets from the CTA's actual viewport center. The 3D doorway projects exactly onto the real CTA rectangle at the first frame.
4. Over the first 23.5% of the **existing 2.08-second experience**, move the actual Three.js camera toward the 3D doorway, and shift its optical axis so the doorway moves naturally into the viewport center. The projected 3D doorway, **not a separately scaled CSS rectangle**, determines the visible scene aperture.
5. Surrounding hero elements softly blur via sibling-only CSS filters; the real CTA and its lettering stay sharp and stationary. The dark-green environment appears inside the CTA and expands as camera distance decreases. Architectural frame members give the entrance real depth and surface highlights.
6. At the doorway boundary, transition without a camera-position jump into the already-accepted nave travel. The World-to-Work projection and final optical handoff are inherited unchanged.

The entrance has a physical 3D contour (paired rounded TubeGeometry outlines plus connecting structural beams) sharing the same camera as the digital architecture. This is a continuous perspective setup, **not** physically simulated depth of field or a global DOM 3D camera.

## Acceptance
Serve \`/flagship-journey/infinite-bc/index.html\` from the exact V6.1 branch in a separate worktree. Founder records full-speed interaction at desktop and portrait resolutions. Inspect at entry 0%, 5%, 10%, 15%, 20%, 23.5%, tunnel midpoint and Work arrival.

Check:
- CTA copy never becomes giant. Hero does not scale. Only surrounding elements blur; no parent CSS filter blurs CTA.
- The first emergent 3D doorway is perfectly aligned with clicked CTA, including on 390×844 and 320×568.
- The frame has genuine apparent depth and the camera physically travels toward and then through it; no unrelated green rectangle or snap.
- There is no flash, hard crop seam or visual jump at 23.5%.
- Existing Work stays contained inside tunnel and emerges into authentic usable Work. No extra time: current configured duration stays **2.08 s** (module loading separate).
- Cleanup on Escape, wheel, Back, resize, pagehide, WebGL context loss; reduced motion and failure go directly to real #work; keyboard and modified click remain native.
- Network/console/WebGL shaders, actual frame timings and mobile performance must be checked in browser; **source tests do not establish these**.

## Source tests
The repository source contract tests now validate initial 3D portal-to-CTA projection for three representative viewport/CTA geometries, monotonic apparent scale under forward camera travel, 3D doorway geometry, no HTML CTA scale, correct nav module, Work DOM continuity, and error handling. Syntax/contract success is **not visual acceptance**.

**Do not add cinematic polish elsewhere or reopen the frozen creative direction until this entrance is visually reviewed and accepted.**
