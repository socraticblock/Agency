# GENEZISI — Screen 01 Digital Passage V6: CTA Focus-Entry Review

**Date:** 31 October 2026  
**Status:** Committed implementation candidate, **not** visually accepted.  
**Branch:** `feature/screen01-digital-passage-locked-v6-cta-focus-2026-10-31`  
**Based on:** V5 frozen review commit `3c02e0d`. V5 and all earlier cinematic versions remain preserved.

## Founder-approved priority
> Everything except the CTA falls softly out of focus. The CTA stays sharp. We move towards it. It becomes the entrance to the already-approved green Digital Passage. Through the passage we approach the actual Work section. Only after the entrance is convincing do we polish the tunnel further.

The concept, architecture and Work arrival are unchanged. The phase focus here is **only the CTA entry**. Do not add bloom, extra geometry, code rain, scrolling effects, different content or site redesign in response to this brief.

## What changed versus V5

- The actual, existing CTA DOM element (`Explore our work`) translates and scales toward the camera's center. **Neither the hero section nor headline is scaled.**
- A temporary `genezisi-passage-focus` class selectively defocuses only surrounding hero siblings and site navigation. The CTA and its original accessible content remain sharp and unaffected by parent filters.
- The WebGL aperture follows exactly the measured button's translation, scale and rounding, so the visitor visually enters the CTA rather than an unrelated rectangle.
- The live CTA's label retires gracefully before its scale becomes huge; the underlying Three.js passage becomes fully visible as the button's optical rectangle fills the viewport.
- All temporary CTA inline styles, root CSS variables and focus classes are restored on completion or interruption/context loss.
- Existing Work-from-real-DOM projection, 3D camera and lighting, final arrival, scroll fallback and **2.08-second sequence** are preserved from V5.

## Review contract

Serve this exact branch in a separate worktree:
`/flagship-journey/infinite-bc/index.html`

Record full-speed clicks (not only slow-motion) at desktop 1440×900 and portrait 390×844; narrow 320×568 also useful. Check 0%, 5%, 10%, 15%, 20%, 25%, 40%, 70%, 95% and finish.

**Pass/fail entrance:**
- At click, the CTA remains razor sharp while the surrounding hero gently blurs and recedes.
- The actual button moves toward center and approaches the viewer (translation + scale). Headline and page do NOT enlarge.
- The opening is visibly born from the button and immediately leads into the same green 3D environment. No separate green rectangle appearing unrelated to the button.
- No giant double CTA label, pixelated text, odd shape jump, stutter, unexpected waiting or blur lingering after completion/Back/Escape.
- The total visit is still ~2.08 seconds after module load; visitors are not made to wait longer just for spectacle.

**Regression checks:** Work contained inside passage; no white leaks, correct final full-viewport Work; nav history, reduced motion, wheel/touch interruption, resize and WebGL failure. Console and WebGL errors/performance are not established by source checks alone.

**Change control:** This is an isolated CTA experiment. Do not edit Screens 02–04, Work markup, production Next.js components, the business service routes, main, or deployment. Founder will separately approve the actual-browser result before any further cinematic polish.
