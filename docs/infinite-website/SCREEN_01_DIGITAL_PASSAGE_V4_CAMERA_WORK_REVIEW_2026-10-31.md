# Screen 01 — Digital Passage V4 camera and spatial Work correction

**Status:** Committed to isolated branch; source checks passed; actual-browser visual and GPU QA still required. **Concept remains frozen.**

Branch: `feature/screen01-digital-passage-locked-v4-camera-2026-10-31`  
Parent (preserved): `feature/screen01-digital-passage-locked-v3-2026-10-31`  
User footage basis: `20261031-0538-51.8505208.mp4` (7.6 s, 1918×988, 30 FPS capture).

## Evidence-based V3 defects
- From approximately 3.1 s: CTA opened a growing aperture, but there was no perspective movement of the *site camera into the actual CTA*. It felt like a portal placed over a page.
- During approximately 3.7–4.7 s: the Work preview appeared as exposed white shapes through openings between architecture. Cause: full-viewport `workPlane` was behind a transparent Three.js canvas without a true projected spatial matte.
- Around 4.7–5.0 s: the landing was brief and visually abrupt. A final mask still needs browser evaluation.
- The architecture and overall green/mint material world remain founder approved. Replacing this concept is explicitly out of scope.

## V4 changes
1. **Real hero-to-CTA camera approach**: measure clicked button and source `.opening` geometry. For the first 30% of the 2.14-second animation, transform the actual source hero toward the button. Synchronize the WebGL stage aperture to the *same* expanding button bounds. The original inline transforms and transform origin are restored at full-stage cover and on dispose/error. This deliberately avoids copying or redesigning the source hero.
2. **Spatial Work destination**: Work continues to be cloned **only from existing real `#work` markup**, inert and visually temporary. Wrap it in a clipped `work-window`, calculate a four-corner destination quad with `THREE.Vector3.project(camera)` every frame, and mask DOM to the projected rectangle. The far quad is sized to fit the final physical architectural mouth, not the whole viewport. Outside the projected window the scene remains dark rather than exposing stray cream panels.
3. **Convergent real-DOM handoff**: Work's projected corners and transform resolve to the actual viewport position near the end. The final real-DOM iris reveal begins earlier (88.5% of animation) and ends near 99.5%, to avoid a very short last-second wipe. Camera world motion and real destination still retain their original content and navigation.
4. **Preserve performance/fallback constraints**: no new npm dependencies, WebGL context remains Three.js 0.186.1 loaded on intent, no new native-scroll hooks, direct `#work` fallback, and existing multi-device/failure testing requirements.

## Important remaining uncertainties
- The hero zoom may show scale artifacts or source-text motion near the button; do not call this visually accepted until full-speed recording.
- The Work quad projection and the 2D DOM scaling need real-browser verification for framing and uniformity, especially portrait.
- The interim Work proof is the Gate 1b static mirror, not the production Next.js SelectedWork component.
- No measured GPU FPS, mobile thermals, actual accessibility auditing or browser shader success has been established by source-contract tests.

## Browser visual-review contract
Serve precisely this branch in a separate worktree. Review 1440×900 and 390×844, ideally also 320×568.

1. **Before click:** original Option D untouched.
2. **0–30%:** source page physically travels toward CTA. The button and architectural threshold align, with no green rectangle jumping in as an unrelated graphic.
3. **30–80%:** genuine near/far parallax; authentic Work preview is *only* inside distant portal. **No white Work content outside the tunnel.**
4. **80–100%:** far Work resolves to exactly the actual scroll position and foreground geometry withdraws; no double typography or sudden cropping.
5. **Exit:** actual `#work` is fully interactive, nav/history correct, no retained clone/canvas/modified source transform.
6. Browser console, WebGL, network, visible performance/stutter, click load latency, reduced-motion, touch/resize/Back and unsupported-device fallback.

Existing URL: `/flagship-journey/infinite-bc/index.html`. Pause with `?passageDebug=1` and `window.__genezisiPassage.seek(.15)`, `.seek(.40)`, `.seek(.70)`, `.seek(.90)`.

**No merge, no production deployment, no editing Screens 02–04 or replacing the locked concept.**
