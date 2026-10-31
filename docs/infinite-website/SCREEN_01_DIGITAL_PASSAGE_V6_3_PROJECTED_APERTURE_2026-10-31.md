# Genezisi — Digital Passage V6.3: Camera-Projected CTA Aperture

**31 October 2026 — review candidate, not visual approval**

## Authority and frozen direction
The founder approved one V6.3 experiment: improve the visible handoff between the actual `Explore our work` CTA and its physical Three.js threshold. The cinematic architectural world, Work destination, short duration and overall five-beat concept remain frozen. No new architecture, lighting effects or other creative treatment.

- **V6.3 implementation branch:** `feature/screen01-digital-passage-locked-v6-3-projected-aperture-2026-10-31`
- **V6.2 preserved checkpoint:** `feature/screen01-digital-passage-locked-v6-2-threshold-continuity-2026-10-31` at `f3cfd94`
- **Visual-review route:** `/flagship-journey/infinite-bc/index.html`
- **No merge or deployment authorization.**

## Diagnosis

V6.2 moved the real Three.js camera toward the CTA-calibrated 3D doorway, but composited that rendering with a separately computed CSS rectangular clip. Its `revealSource` removed the entire clip at progress `0.235`, regardless of the actual shape and screen coverage of the physical doorway. This produced a visible change from rounded rectangle to full-screen architecture.

## Implementation

1. **One geometric source of truth.** `doorContour(z,offset)` constructs the real rounded outline of the physical 3D doorway, with the pill corner radius measured from the clicked CTA's actual dimensions. Both the actual `TubeGeometry` rim and the temporary CSS clipping shape derive from this contour.
2. **Real camera projection.** Each entry frame projects the same 3D mouth's precomputed contour through `THREE.Vector3.project(camera)`, following the real camera's translation, perspective and trajectory. Those projected points become the stage's temporary `clip-path: polygon(...)`. There is no separate source-rectangle interpolation or manually scaled HTML button.
3. **Physical release condition.** The aperture is removed only after the projected rounded polygon encloses **all four screen corners plus 12 px of overscan**. The camera and geometric opening already cover the screen, so switching `clip-path` to `none` is visually equivalent instead of a hard cut. The threshold's end distance is `0.48` world units, allowing geometric overscan before passing the doorway. A mathematical coverage check also safeguards unexpected geometries and a safe direct-Work fallback.
4. **Existing precise CTA handoff.** Original CTA and stage opacity crossfade over progress `0.025–0.075`; background siblings gently defocus. Original CTA never scales; its opacity and all focus variables are restored during completion and interruption.
5. **Remaining path frozen.** The previous matched-velocity Hermite camera track, evergreen nave, authentic Work-derived perspective window, landing crossfade, reduced-motion and no-WebGL navigation are preserved. **Total configured animation duration remains 2.08 seconds.**

## Verification performed
The active V6.3 module and navigation were syntax-checked. Source-contract tests verify no changed CTA/text/content, consistent source-derived Work, physical rounded aperture projection, no unconditional 23.5% release, matched camera velocities, opacity restoration and reduced-motion fallback. A pure-math projected aperture check verifies geometric viewport coverage at 1440×900, 1920×1080, 390×844 and 320×568.

**Tests are source/math checks, not a browser rendering test.** No claim of visual acceptance, real Chrome/Safari GPU success or mobile frame performance has been made.

## Founder visual QA
Serve the exact V6.3 branch from a separate worktree. Confirm the served commit and record normal-speed desktop + portrait interactions. Review at 0.025, 0.075, 0.15, 0.20, 0.235 and 0.26 progress.

**Pass conditions:** the initial aperture aligns with the actual CTA; its corners match the button; the 3D rim expands with natural perspective; no green rectangular card or separate second doorway is seen; the cutout never abruptly becomes full-screen while its corners remain inside the viewport; no oversized CTA text, double CTA or visible snap; no regression to Work containment and final arrival. Inspect network errors, Three.js rendering, FPS and context loss; check interruption, navigation, reduced motion and portrait.

**Do not redesign the tunnel, alter Work markup, merge to `main`, or deploy unless specifically authorized afterward.**
