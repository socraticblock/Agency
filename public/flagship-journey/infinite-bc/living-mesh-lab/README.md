# Living Page — isolated deformable-mesh and camera proof

**Date:** 30 October 2026. **Status:** D3 *technical experiment / review candidate*, not a new accepted Screen 01 CTA, not production integration, not proof of good motion quality.

**Independent route:** `/flagship-journey/infinite-bc/living-mesh-lab/index.html` (the Next.js `public/` static file, if served from a branch containing this experiment). The entire demo is a self-contained UTF-8 HTML file: no CDN, no npm/Three.js dependency, no outside requests. Open from the file system or serve locally for a WebGL2-capable browser. **No deployment or preview branch push was authorized.**

## Why this exists

The founder's 30 October desktop and narrow-viewport recording of the prior SVG/CSS Living Page CTA shows a largely **flat wipe**, fading/ghosted opening text and minimal perceived camera movement. This experiment asks a narrower question: does an **actual deformable mesh under one perspective camera** provide a stronger physical basis before we change the existing site?

## What this proof does

- Generates a single rectangular **96 × 52 vertex mesh**. Its **vertex shader moves vertices forward in Z** close to an asymmetric, moving fold boundary; the fragment shader keeps the remaining cream sheet opaque, shades its curl and removes its printed copy as it folds. A narrow underside follows the same crease. No full-hero split/reflow and no opposing swinging doors.
- **One camera** moves in the world: camera Z approximately `4.6 → 2.6`. The existing Work *representation* is a fixed plane at Z `-2.0`. At the end it projects to a full viewport under the same perspective as the original hero at Z `0` when the camera began. Near material therefore changes scale faster than the Work plane; objects do not animate their own independent scales.
- Desktop reveals from the **right** while portrait uses a dedicated **top-down** fold axis. The same material/camera model is shared.
- Textures in this **offline interactive HTML lab** are locally generated using real project names, the approved opening headline and Work's actual `The work speaks.` heading. This is a **geometry surrogate**, not a pixel-accurate copy of Genezisi DOM; there are no invented projects.
- Provides a **Play/Pause/Replay** control, progress scrubber and reset. It does not hijack the actual CTA, `#work`, scroll-driven B→C journey or site history. It shows a clear fallback message and disables animation controls when WebGL2 is unavailable.

## What has been verified

1. The **exact WebGL2 vertex and fragment shader strings in `index.html`** compile and link on headless **ANGLE OpenGL ES 3.0** via EGL, using an independent native test harness.
2. Actual GL draw calls produced stills at 0/12/28/44/59/73/88/100% and **46 rendered frames** per orientation using screenshots extracted from earlier founder-provided Genezisi proof recordings. (These images/videos are **review assets in the separately delivered experiment ZIP**, not production website media or checked into this repository.)
3. The separate scene puts Work at a fixed world depth and uses one projection and camera distance; **desktop and portrait geometry** were verified in the OpenGL renderer, which exposed a too-large underside fold; the underside radius was reduced before this checkpoint.
4. The experiment's code is isolated to this new lab directory. No `work-nav.js`, `work-dive.css`, original Work markup, Screens 02–04, `motion.js`, Next.js app component, dependency manifest, or production route was modified by this experiment.

## Unverified and known limitations

- Chromium in the local test environment **refused WebGL contexts**; therefore the interactive browser UI **has not been tested end-to-end** in Chromium, Safari or real mobile WebGL. The native EGL proof compiles/renders shaders but **does not prove browser input, frame pacing, performance or responsive DOM behavior**. A full served-site review remains required.
- The interactive HTML lab uses **procedural stand-in typography**. The separate native-GL videos used **real-source screenshots** as textures. Neither is a final DOM-to-GPU compositing integration. Final hero/source and target/Work pixel matching, focus, hash/history, keyboard/touch, accessibility, memory cleanup and reduced-motion behavior must be engineered/tested at production integration.
- A genuinely bent paper sheet is **not automatically a cinematic experience**: the current movement may still read as a *physical page peel* rather than a compelling architectural passage. The art direction may need additional development before any D4 promotion.
- Timing is an exploratory **~1.35 second** motion in the interactive lab. This is not an accepted target; do not claim 60 FPS or low-end Android performance.
- Reproducing the native EGL proof requires ANGLE EGL/GLES libraries and the source screenshots; this repository deliberately does not ship founder recording screenshots as website assets.

## QA / next decision

Review the desktop and portrait **actual GL screenshots/videos** alongside the standalone page. Pause around 28%, 44% and 59%: is the fold convincingly dimensional, does Work remain recognizable, and is the depth/camera movement meaningful or still just an elaborate wipe?

**If spatial motion is judged insufficient:** keep this lab as evidence; change the D2 scene/camera treatment before touching production CTA code. **If it passes a founder visual review:** plan a separate integration into the original `work-nav.js` with real DOM, reduced motion, navigation and performance tests, while preserving the unchanged Work section. No merge, deployment, or work on Screens 02–04 follows automatically.

**Document authority:** [Living Page creative direction](../../../../docs/infinite-website/SCREEN_01_LIVING_PAGE_CREATIVE_DIRECTION_2026-10-30.md) and [Screen 01 Cinematic Blueprint](../../../../docs/infinite-website/SCREEN_01_CINEMATIC_BLUEPRINT_2026-10-30.md). Their **creative** gates remain unapproved unless the founder explicitly accepts them.
