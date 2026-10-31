# GENEZISI — Screen 01 Digital Passage V6.4: Camera Approaches Stationary CTA

**Date:** 31 October 2026  
**Status:** Isolated implementation candidate. Source/geometry checks pass; founder visual approval pending.  
**Branch:** `feature/screen01-digital-passage-locked-v6-4-camera-approach-2026-10-31`  
**Parent:** V6.3 checkpoint `0781470743432afbb7506280422f49815b9de557` (preserved).

## Founder observation

V6.3 feels like the CTA comes toward the viewer: the button appears to move toward the center and only then the camera enters the tunnel. The desired perception is the inverse: the webpage's CTA stays anchored in its original position while the viewer/camera approaches it.

The founder approved one experiment **only on camera direction/anchoring plus subtle background parallax**. Do not alter approved tunnel architecture, Work arrival, CTA copy, page layout, production branch or duration.

## Exact change

1. The real CTA remains untransformed and never scales. The rounded 3D doorway is still one world-space contour shared with its projected clipping polygon.
2. Remove V6.3's `mix(buttonCenter,viewportCenter,ease(...))` that deliberately centered the projected doorway. During the 0–23.5% acquisition interval, the doorway's projected center remains **exactly at the original CTA's pixel coordinates**.
3. The real Three.js camera travels diagonally: as its Z distance to the portal decreases, its X and Y converge toward the doorway's world-space axis. `cameraX=(viewportCenterX-ctaCenterX)*2*tan(fov/2)/viewportHeight * distanceToDoor`; Y is analogous. Camera looks straight forward during this phase. Thus the camera, **not the doorway**, translates through the virtual world.
4. At the boundary, the camera's residual X/Y position and first derivative are carried into a Hermite bridge that fades completely by 39% progress, while the original tunnel camera track resumes. Viewing direction likewise transitions smoothly, avoiding the sideways or angular snap a simple hard switch would introduce.
5. Gentle parallax on non-CTA background elements (selected nav, typography and art) shifts each layer by at most 9 px away from the stationary CTA. Existing blur remains. There is no global hero scaling, no changes to surrounding layout, and no new effects or dependencies.
6. Temporary `style.translate`, CTA opacity and focus variables are restored through the existing `restoreFocus()` during normal completion, Escape, wheel/touch, resize, pagehide, WebGL loss and navigation interruption.
7. V6.3's camera-projected rounded aperture still removes its clip only after actual geometry covers all four viewport corners with overscan. Its one-source-of-truth 3D rim, evergreen nave, real Work projection and native navigation fallback remain intact.
8. Configured duration remains **2080 ms**.

## QA coverage

Source/geometry checks cover: button stays at exact same screen X/Y across approach depths for 1440×900, 390×844, 320×568; actual camera world X/Y converge toward doorway; matched position/velocity at threshold and bridge convergence back into existing tunnel; coverage of viewport after physically anchored approach; no HTML button scaling; limited parallax and cleanup; unchanged Work handoff, no screenshot plane, no source navigational changes, JS syntax.

**These checks do not prove the human perceptual objective.** Test full-speed clicks in a browser (desktop and narrow/portrait), especially first 0.5 seconds. Ask: does the viewer feel the camera moving toward the fixed CTA, rather than the CTA moving toward the viewer? Is there an unwanted snap at the threshold? Is parallax restrained or distracting? Does a very wide or narrow CTA still align? Is normal Work navigation correct and responsive? Check console, WebGL and poor-device performance, reduced motion, interruption and native fallback.

Review route: `/flagship-journey/infinite-bc/index.html`.

**Do not merge/deploy, change other screens, or begin cinematic polish until founder review.**
