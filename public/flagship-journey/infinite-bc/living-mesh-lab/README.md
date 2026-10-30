# GENEZISI — Living Page mesh/camera proof v2

**30 October 2026. Isolated laboratory, not the live CTA.**

The active Genezisi prototype, existing Work section, and all four scroll screens remain unchanged. The laboratory evaluates the narrower feasibility question: can one genuinely deformed cream surface, animated through a coherent perspective camera, create a better fold/reveal/dive than the original SVG wipe?

## Changes from the first mesh proof

1. **Upright texture fix:** canvas image sources use top-left coordinates; the mesh UV uses `a_uv.y=0` at the top. The old `UNPACK_FLIP_Y_WEBGL=true` applied an extra Y inversion in the browser. v2 uses `false`, aligning the browser upload with the native EGL pixel layout.
2. **Better material:** curl radius reduced from ~0.048–0.112 to ~0.018–0.046 world units; vertex lift and warp also reduced; lighting is more matte.
3. **No oversized printed hero:** the ink is gently retired between normalized 27% and 43% of the shot, before the nearby material passes the camera. This is a visual study only; final integration must coordinate the real DOM without screenshot ghosts.
4. **Stronger coherent camera travel:** Work plane stays at Z=-3.4; one camera moves from Z=4.6 to Z=1.2 along a small return-to-zero lateral arc. At the endpoints, the source and destination planes share the same 4.6-unit optical distance, guaranteeing the same projected viewport size. The destination grows from about 57.5% to 100% of screen width.
5. **Lighting beyond the fold:** background shifts from evergreen toward the original Work paper tone during the approach so Work is not trapped in a static dark framed tunnel. The fold persists slightly longer during travel.

**Duration in interactive lab:** ~1.25 seconds. This is a design hypothesis, not a target or performance claim.

## Evidence and limits

- JavaScript passed `node --check`. Both GLSL ES 3 shaders compiled and linked successfully in headless EGL OpenGL ES 3 via ANGLE.
- Renderer produced eight review frames and a 46-frame, 30-fps reference video in each of 960×480 desktop and 390×844 portrait sizes. These are native shader draws, **not** browser WebGL captures or measured frame rates.
- Exact first and last OpenGL images match the respective real reference screenshots **pixel-for-pixel** at the native render resolution (RMSE=0); vertical-flip comparisons are much worse. Browser correctness of the texture flag must still be confirmed in a real web recording.
- The interactive HTML remains self-contained and WebGL2-based; procedural Genezisi UI is a test surrogate, not the actual live DOM. The bundled EGL videos use reference screenshots from the founder's earlier review. No production asset or new Work design is introduced.
- The isolated lab has Play/Pause, slider and Replay. Chrome in this test runtime could not navigate to the local test path (`ERR_BLOCKED_BY_ADMINISTRATOR`). **Browser end-to-end smoothness, mobile device behavior, keyboard focus, real CTA navigation and resource cleanup remain unverified.**
- Visually, the proof is still a single folded page plus destination plane; the middle may remain too much of a page peel and not enough of an architectural journey. This is evidence to review, not an accepted cinematic design.

## Review and next gate

Review the desktop and portrait videos, then open `index.html` in your browser (or the served lab route under the experiment branch). At 0% and 100% the text must be upright; at 28%, 44%, 59% and 73% inspect ink retirement, curved material mass, near/far travel, and whether the cream-to-green-to-Work tonal passage reads intentional. If that experience is not compelling at normal speed, return to creative direction/camera previsualization before modifying the active CTA.

**No deployment or integration authorized.** Original branch: `feature/infinite-gate1b-opening-option-d-cream-2026-10-30`. Experiment branch: `experiment/screen01-living-page-mesh-camera-2026-10-30`.