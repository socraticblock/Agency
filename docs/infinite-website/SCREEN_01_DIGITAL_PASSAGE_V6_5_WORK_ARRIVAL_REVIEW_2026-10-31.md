# Genezisi — Digital Passage V6.5: Smoother Work Arrival

**31 October 2026**  
**Status:** Isolated, source-verified implementation; **founder visual approval pending**.  
**Branch:** `feature/screen01-digital-passage-locked-v6-5-work-arrival-2026-10-31`  
**Parent V6.4 approved entrance:** `b732fdd23a3186a827afaabfc44ada2a35f1992d` (unchanged).

## Founder directive
Founder explicitly approved the **V6.4 CTA-to-tunnel entrance**. No new work on CTA focus, anchoring, doorway, camera bridge, aperture, parallax, or tunnel architecture is authorized by this review. The one requested improvement is the Work card: it is visible in the distance but seems to pop too quickly to full-screen near the end. Founder suggested keeping the previously used softly faded corners a little longer. Judge the result at normal playback speed rather than rejecting individual awkward frames.

Reference recording: `20261031-0937-53.2347937.mp4` (5.17 s, desktop), with Work growth especially visible around video times 2.1–2.6 s.

## Changes

1. **A real camera-based optical easing, only in the late tunnel.** V6.4's camera depth calculation is preserved verbatim in `cameraTrackBase()`. Until progress `0.68`, V6.5 returns that trajectory exactly. From `0.68` to `0.925`, V6.5 interpolates the Work plane's *screen occupancy* using cubic Hermite. Position and derivative are matched at entry; scale smoothly approaches 100% at `0.925`. The required camera depth is solved through actual perspective and current FOV, so the Work preview remains a genuine Three.js projection, not an arbitrary CSS enlargement or screenshot. The late Work card becomes legible sooner, with a gentler final settle.
2. **Corner softness persists.** A temporary vignette overlay on the transition scene (not on the real Work page) fades in at progress `0.70–0.83`, remains through `0.925`, then dissolves smoothly by progress `1`. Its gradient is deliberately understated at center and darkens the periphery. No extra duration or content is added.
3. **Authentic Work section maintained.** Existing inert cloned Work DOM, camera-projected rectangular window, same `onCover()` and `onFinish()` callbacks, native-scroll fallback, and stage-to-real-page crossfade are unchanged.
4. **No entrance regression.** The full V6.4 entrance through the camera bridge remains identical. Parallax, focus, CTA text, doorway, screenshot-free Work markup, native/reduced-motion navigation, and WebGL fallback are unchanged. Total configured sequence is still `2080 ms`.

## Checks completed
- 20 source and mathematical checks passed, including original entrance regression, desktop and portrait camera geometry, C1 continuity of Work depth at 0.68, no reversed camera movement, earlier appearance of Work at 0.8 and 0.85, exact Work fill at 0.925, and vignette alpha zero by finish.
- JS source parsing succeeded.
- No real browser run or mobile device rendering has yet verified this visual outcome.

## Founder acceptance
Serve in a separate worktree at `/flagship-journey/infinite-bc/index.html`. At full speed, does the Work card now appear a little sooner and grow progressively, without the old last-second pop? Do the softened dark corners persist until the card nearly settles, then fade naturally into the real Work page? Does the approved camera-to-CTA entrance still feel exactly as before? Confirm no white leakage outside the existing Work window, no top-border jump, no obvious delay, and no console/WebGL errors. Repeat at desktop and narrow/portrait widths.

Do not merge, deploy, redesign, or adjust the approved entrance without further founder instruction.
