# Genezisi — Liquid Bubble Motion Study (PR #30)

**Scope:** Isolated, English-only Next.js preview at `/en/experiments/bubble-morph`.
**Branch:** `feature/what-i-do-liquid-bubble-prototype-2026-11-02`.
**Status:** Design review prototype, not the homepage. Do not deploy or merge without founder approval.

## Experience and intent

Three visible, accessible service bubbles represent Websites, AI Systems, and Automation. Hovering near the **outline** produces a small, localized inward/outward elastic deformation; hovering inside the center does not. Clicking or tapping a bubble opens it into a readable, softly lit editorial card. Clicking X, tapping outside, or pressing Escape reverses the transformation and returns focus to the original bubble.

The selected bubble should look like **one material changing shape**. The content, lighting, and title must not look like a second modal appearing over the first shape. The three services remain independently understandable, not dependent on the old five-step System in Action narrative.

## Implementation

- `BubbleMorphStudy.tsx` owns the preview interface, modal semantics, focus, sizing, and animation lifecycle.
- `BubbleMorphStudy.module.css` is local to this experiment; the approved homepage styles are untouched.
- `bubbleMotion.ts` contains the pure geometry and timing functions, which are independently unit-tested.
- **One contour:** 96 angular vertices interpolate between a circle (superellipse power 2) and a soft rounded reading surface (power 6.8). The fill, reflected light, and only stroke all use the exact same SVG path string. This eliminates detached rim outlines.
- **One spring:** An analytic underdamped step response (`damping = 0.76`, `naturalFrequency = 13`) makes a roughly 2.5% visual overshoot and diminishing rebound independent of frame count. Edges trail the center by at most about 36ms for a soft-material effect. Opening runs about 1.06s; closing about 0.88s, including settling.
- **One title:** The visible service heading travels from its location inside the selected bubble to a reserved position inside the finished card. The original button is hidden while the overlay is present. Short explanatory text is timed to appear once the card is spacious enough. A brief small-index/description ghost preserves continuity at the start.
- **Lighting:** Radial gradients follow the same animated contour. A density layer increases behind the expanded shape so background text never bleeds through the reading content. Large real-time blur effects are avoided on phones.
- **Membrane on the closed bubbles:** Localized radial forces couple neighboring points and integrate with a frame-time-aware step. The simulation is active only while the bubble is moving, not in a permanent loop. This is an approximation of soft material, not physically accurate water.
- **Droplets:** At most two tiny short-lived droplets separate near the source outline on opening. They do not fill the screen or run continuously.
- **Readability:** The card measures its own content in an offscreen clone, then uses as much height as needed up to the available viewport. Internal scrolling remains available only on smaller/shorter screens.
- **Input:** Tap, click, X, backdrop, Escape, keyboard focus trap after opening, focus restoration after closing. Close requests made during opening are queued rather than ignored.
- **Reduced motion:** The shape switches to its final state without the elastic animation or droplets; the content remains accessible.

## Intended mobile behavior

The desktop bubbles sit side-by-side and gently overlap. Mobile stacks the same three interactive bubbles. Tapping one reveals its description **inside its own expanded card**, not at the bottom of all three. The card has 12px external side margins on narrow phones and preserves necessary scrolling. There is no hover dependency.

## Verification performed locally

1. Pure unit tests (`node --experimental-strip-types tests/bubble-motion.test.mjs`): analytic overshoot and settling; 96-point paths; continuous opening/reversal; content-reveal windows; finite geometry at 320px through 1918px.
2. Local strict TypeScript check with minimal React dependency stubs and `typescript` global compiler: no errors. This is **not** a production Next.js typecheck.
3. Chromium rendering of a standalone motion harness, using the **same pure geometry and CSS**, at 1440×900, 390×844, 320×650 and 1918×1116: no JS exceptions or horizontal page overflow. Content fits without an internal scrollbar at standard sizes; 320×650 scrolls because the content requires more height.
4. Frozen rendering checkpoints of the contour at 0, 0.07, 0.14, 0.22, 0.32, 0.5 and 0.9 seconds, for inspecting the actual transformation and verifying no detached stroke.

**Not yet verified:** Installing the full repository dependencies; `npm run typecheck`, `npm run lint`, `npm run build` in the actual Next.js environment; full React route rendering in desktop and mobile browsers; production performance on low-powered phones; real EN/KA/NL translation fit. These remain release gates.

## QA checklist before merging

- [ ] Full project typecheck, lint and production build
- [ ] Render the **actual Next.js preview route** in Chromium, Firefox and WebKit; keyboard/touch, close/reopen and rapid repeated input
- [ ] Confirm zero visible duplicate headings at every animation frame
- [ ] Check no detached outline, no background text bleeding into the expanded card, and no empty card phase
- [ ] Check all three explanations and the smallest supported viewport; verify scrolling only when needed
- [ ] Test reduced motion, keyboard accessibility and full screen-reader labeling
- [ ] Measure actual frame timing and animation long tasks on at least one weaker Android phone
- [ ] Founder visual approval and separate decision on homepage integration

**No change to the existing What I Do, Selected Work, hero or System in Action on the live homepage has been made by this PR.**