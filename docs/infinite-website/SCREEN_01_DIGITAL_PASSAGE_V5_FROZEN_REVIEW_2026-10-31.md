# GENEZISI — SCREEN 01 / DIGITAL PASSAGE V5: FROZEN REVIEW CANDIDATE

**31 October 2026.** Founder froze the Digital Passage concept and authorized a focused V5 continuity pass after reviewing the V4 recording. V5 is now a **code-frozen review candidate** on its own branch, pending founder visual approval and device-level QA. Do not describe it as visually accepted or production-ready before real-browser evidence.

**Branch:** \`feature/screen01-digital-passage-locked-v5-continuity-2026-10-31\`  
**V4 checkpoint (untouched):** \`feature/screen01-digital-passage-locked-v4-camera-2026-10-31\`  
**Route:** \`/flagship-journey/infinite-bc/index.html\`

## Frozen concept (no substitution)
Actual homepage → clicked **Explore our work** CTA becomes the opening → immersive evergreen architectural Digital Passage with real 3D camera, light filaments and depth → **existing Work** visibly approaches inside the distant passage → real interactive \`#work\`.

Never switch to page peel, twin doors, copycat Matrix code rain, a new generic corridor or fake Work screenshot. Do not redesign any site text or content. Screens 02–04, native scroll runtime, real production Next.js Work, main and deployment remain outside this iteration.

## V5 continuity work

**1. Only CTA zooms — NOT the whole page.** V4 applied \`transform: scale(...)\` to the full \`.opening\` hero, making the headline and copy enormous. V5 removes that transform completely. The fixed 3D world is clipped to the exact measured, rounded CTA button rectangle; the aperture expands and recenters until it occupies the viewport. All source copy remains stationary.

**2. Perspective-correct Work approach.** The previous V4 Work preview gradually broke free from the 3D camera, forcibly interpolating its corners to a viewport rectangle late in the animation. V5 keeps the portal corners projected with \`Vector3.project(camera)\` for the entire flight. Camera end position is solved from the far portal dimensions and the final vertical field of view, so the projected Work quad fills the viewport **by camera motion alone**. Mobile uses a different FOV and the same exit-projection relation. We removed manual final panel scaling.

**3. Precisely aligned handoff.** Camera lateral offset, vertical drift and roll ease to zero before exit; the projected Work plane converges to the real #work DOM. A short crossfade replaces the large radial mask/wipe. Target scroll-margin offset is measured once on arrival and compensated subtly in the optical preview. Original site content stays entirely in the real DOM; a temporary inert DOM copy is used only for perspective continuity.

**4. Visitor time.** Nominal animation duration shortened from **2.14 s to 2.08 s**; still subject to actual-world motion review. If the Three.js module fails to load promptly, the normal \`href="#work"\` fallback remains. A short but high-fidelity experience is more valuable than prolonged spectacle.

## Evidence and limitations

- Source-contract tests check real native Work anchor, module boundary, no page transform, actual Work clone, WebGL geometry and cleanup, and optical exit math at 1440x900, 390x844 and 320x568.
- These checks do NOT verify GPU shader compilation, image quality, motion smoothness, frame performance, focus handling or Chrome/Safari mobile browser rendering.
- The Work in Gate 1b is **static QA mirror** sourced from the existing projects; later integration must use the real React/Next.js SelectedWork component, which V5 deliberately does not modify.
- This branch retains earlier iterations as files for comparison, but only \`digital-passage-scene-v5.js\` is loaded by the CTA.

## Founder review — specifically request a real browser recording

1. Serve exact V5 branch/commit in an isolated worktree. Do not edit other pending Codex work.
2. Normal-speed desktop recording: hero before click; CTA-only entry (0–25%); architectural travel (25–80%); Work filling view (80–100%); settled actual Work.
3. At CTA entry there must be **NO enormous headline or copy**. Confirm the visual journey feels like *entering the button*, not merely enlarging a green rectangle.
4. Work must remain inside the far architectural opening, enlarge continuously without a last-second jump, then match the actual interactive Work pixels. No duplicated text or dark fringes.
5. Repeat in 390x844 portrait and 320x568. Inspect at 10%, 25%, 45%, 70%, 85%, 94% and final. Verify fps, network, console, WebGL errors and CDN handling.
6. Test repeated/modified clicks, scroll, interruption, reduced motion, context loss, keyboard, Back/Forward and navigation. Provide evidence; do not assume source tests prove them.
7. Creative concept is locked and cannot be reimagined. Only founder-directed corrections to V5 implementation or production readiness are permitted after visual approval.

**Do not merge, deploy or start Screens 02–04 until separately authorized.**
