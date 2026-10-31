# GENEZISI / Screen 01 — Digital Passage V6.2: Threshold Continuity Correction

**31 October 2026**  
**Status:** Implementation and source-level checks completed; **browser visual approval pending**.  
**Branch:** \`feature/screen01-digital-passage-locked-v6-2-threshold-continuity-2026-10-31\`  
**Preserved V6.1:** \`feature/screen01-digital-passage-locked-v6-1-camera-threshold-2026-10-31\`, commit \`e631d4f\`.

## Founder-authorized scope — only two entrance defects
The founder reviewed a V6.1 video and authorized a narrowly targeted correction. Do not redesign the tunnel, add cinematic effects, increase duration, alter Work content, touch Screens 02–04, or merge/deploy.

1. **Duplicate CTA:** V6.1 displayed the original button underneath a partly transparent 3D portal while the portal started moving toward the viewport center. The user could temporarily see both the old button and the moving doorway. V6.2 synchronizes the real button's opacity with the WebGL stage opacity over the **same 2.5%–7.5% progress interval**. After the portal owns those pixels, the original button is hidden. The underlying CTA text is never enlarged. Its original inline opacity is restored in \`restoreFocus()\` during normal completion and all interruption paths.
2. **Doorway slowdown / jump:** V6.1 used separate smoothstep easings on the camera's depth before and after the doorway, forcing velocity to **zero** at the transition. V6.2 replaces the pair with a continuous two-segment cubic Hermite depth trajectory, matching the nonzero doorway velocity on both sides while retaining the same starting camera position, physical doorway location and Work exit destination. Camera direction/height alignment and the Digital Passage contents are unchanged.

## Technical boundaries
- Existing Three.js \`digital-passage-scene-v6-1.js\` is preserved; only the new \`digital-passage-scene-v6-2.js\` is loaded by updated \`digital-passage-nav.js\`.
- The overall animation is still **2080 ms** (assuming the Three.js module has loaded). No added waiting time, no new dependency.
- The shallow background sibling blur, real 3D rounded portal and authentic Work preview/handoff are inherited without other visual changes.
- No HTML button scale or full-page zoom, no global scroll interception. CTA is always the original HTML anchor, including reduced-motion / WebGL-disabled fallback.
- Source tests verify camera-depth monotonicity and matched doorway velocities across desktop and mobile geometries, matched CTA/stage opacity ramps, original CTA opacity restoration, lazy-loading and native Work fallback.

## Real-browser review — founder acceptance needed

Serve the exact V6.2 branch in a separate worktree at:

\`/flagship-journey/infinite-bc/index.html\`

Capture normal-speed desktop and portrait recordings. Inspect at approximately 2%, 4%, 6%, 8%, 18%, 23.5%, 26%, tunnel midpoint, 90%, and settled Work.

**Pass/fail questions:**
- Is there ever a visible second CTA under/beside the moving portal? **There should not be.**
- Does the opening initially align with the clicked button before gaining perspective depth?
- Does the camera actually cross the rounded physical doorway without hesitation, snap or a change in speed profile?
- Is the CTA label neither enlarged nor flickering, with surrounding blur remaining visually restrained?
- Does Work remain contained in the tunnel, expand naturally and settle on the existing real interactive Work section?
- Does interruption (Escape, wheel/touch, browser Back, context loss or pagehide) restore the CTA, blur variables and native browser behavior?
- No JS/WebGL console errors, undue asset load delay, frame drops or mobile layout problems.

**Do not claim this is visually approved based solely on source tests.** After founder approval, freeze this entry and separately consider broader cinematic polish.
