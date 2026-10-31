# Genezisi — Digital Passage V6.5: Smoother Work Arrival

**31 October 2026**  
**Status (updated 31 October):** **Founder accepted V6.5 as the sufficient Screen 01 clicked-CTA visual foundation** following normal-speed viewing. Scope is the standalone Digital Passage prototype only; this is **not** final visual polish, full Screen 01/Gate 1b approval, production integration, merge, deployment or release authorization.  
**Branch:** `feature/screen01-digital-passage-locked-v6-5-work-arrival-2026-10-31`  
**Parent V6.4 approved entrance:** `b732fdd23a3186a827afaabfc44ada2a35f1992d` (unchanged).

## Founder directive
Founder explicitly approved the **V6.4 CTA-to-tunnel entrance**. No new work on CTA focus, anchoring, doorway, camera bridge, aperture, parallax, or tunnel architecture is authorized by this review. The one requested improvement is the Work card: it is visible in the distance but seems to pop too quickly to full-screen near the end. Founder suggested keeping the previously used softly faded corners a little longer. Judge the result at normal playback speed rather than rejecting individual awkward frames.

Reference recording: `20261031-0937-53.2347937.mp4` (5.17 s, desktop), with Work growth especially visible around video times 2.1–2.6 s.

## Changes

1. **A real camera-based optical easing, only in the late tunnel.** V6.4's camera depth calculation is preserved verbatim in `cameraTrackBase()`. Until progress `0.68`, V6.5 returns that trajectory exactly. From `0.68` to `0.925`, V6.5 blends the existing perspective occupancy curve with a cubic-Hermite-smoothed occupancy curve at 72% correction strength, preserving some of the previous pacing. Position and derivative are matched at entry; scale smoothly approaches 100% at `0.925`. The required camera depth is solved through actual perspective and current FOV, so the Work preview remains a genuine Three.js projection, not an arbitrary CSS enlargement or screenshot. The late Work card becomes legible sooner, with a gentler final settle.
2. **Corner softness persists.** A temporary vignette overlay on the transition scene (not on the real Work page) fades in at progress `0.70–0.83`, remains through `0.925`, then dissolves smoothly by progress `1`. Its gradient is deliberately understated at center and darkens the periphery. No extra duration or content is added.
3. **Authentic Work section maintained.** Existing inert cloned Work DOM, camera-projected rectangular window, same `onCover()` and `onFinish()` callbacks, native-scroll fallback, and stage-to-real-page crossfade are unchanged.
4. **No entrance regression.** The full V6.4 entrance through the camera bridge remains identical. Parallax, focus, CTA text, doorway, screenshot-free Work markup, native/reduced-motion navigation, and WebGL fallback are unchanged. Total configured sequence is still `2080 ms`.

## Checks completed
- 20 source and mathematical checks passed, including original entrance regression, desktop and portrait camera geometry, C1 continuity of Work depth at 0.68, no reversed camera movement, earlier appearance of Work at 0.8 and 0.85, exact Work fill at 0.925, and vignette alpha zero by finish.
- JS source parsing succeeded.
- No real browser run or mobile device rendering has yet verified this visual outcome.

## Founder decision and stop point — 31 October 2026

After reviewing the V6.5 recording `20261031-1001-04.3886368.mp4`, the founder accepted the transition as **foundationally OK** and explicitly instructed the team to **stop spending time iterating on it**. The prior V6.4 CTA entrance approval remains valid. Small imperfections visible only under frame stepping do not justify reopening the effect when normal-speed viewing is acceptable.

**Current checkpoint:** `feature/screen01-digital-passage-locked-v6-5-work-arrival-2026-10-31` at `ce8eae22f1d3500674265d529cdcb793d23b538b`. Preserve earlier V1–V6.4 versions and this SHA. No source changes, Work-content edits, unsolicited visual polish, new design proposals or additional review gates follow automatically from this approval.

**Acceptance boundaries:** This is a founder-approved **prototype foundation**, not a merge/deploy instruction or acceptance of the integrated Next.js homepage, all Screen 01 scroll scenes, other screens, mobile performance, accessibility in production or Gate 2. The 20 source/math checks and JS parsing documented above remain valid at their limited evidence level; they are not browser/device QA. Any later integration or functional hardening needs a fresh, specific request.
