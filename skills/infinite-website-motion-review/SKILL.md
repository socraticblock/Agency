# Infinite Website Motion Review — repository-local skill

> **Scope:** Use when designing, coding, auditing, or visually reviewing the Genezisi *studio homepage* B → C scroll experience. This is a repository-local playbook referenced by `AGENTS.md`; it is **not** a claim of automatic installation in any particular AI coding tool. Other product routes, including digital business cards, are out of scope.

## Authority and entry

1. Read `AGENTS.md` and `docs/infinite-website/NORTH_STAR_v1.2.md` first. North Star controls if anything here conflicts.
2. Read `VISITOR_FLOW_v1.2.md`, `ACCEPTANCE_GATES_v1.2.md`, the **current** `GATE_1_VISUAL_FOUNDATION_2026-10-30.md`, and the dated 29 October `HANDOFF_2026-10-29.md` and `LESSONS_2026-10-29.md` as historic evidence.
3. Inspect the exact branch/worktree and full source. Never treat historic screenshots, isolated reconstructions, a prior SHA, or a passed synthetic test as proof that the currently served tunnel has the same code.
4. Do not alter `main`, `preview-*`, production routes, deployment config or independent business-card features without explicit authorization. Do not expand Gate 2 or integrate the prototype into the genuine Next.js homepage unless separately authorized.

## Visual quality and story

The visitor's **central reading axis** stays stable. The introduction says “Your website is only the beginning.” B physically enters from the right on desktop (from below on mobile), **pushes the full introduction offscreen**, and settles as one large, opaque, legible interface. B's own frames/panels evolve into solid green architectural depth. A complete third plane approaches from a distant Z position, becomes readable and offers a natural stop. It folds/recedes as C emerges: “Made to be seen. Built to work.” The final page returns to the *real* Selected Work and normal studio content when integration is authorized.

A scene is convincing when its **geometry, material, occlusion, parallax and causal story** are coherent when paused. Do not add arbitrary portals, particles, dashboard walls, stone arches, neon effects, disconnected modal cards or extra animation simply to create spectacle. 2.5D CSS is permitted as long as real intermediate frames look intentional; do not demand WebGL without evidence it is necessary.

## Native scroll: short holds, strong pause points

- Use browser-native scroll mapped to a deterministic, reversible state function `p = f(scroll position)`.
- A visitor chooses reading time by **stopping**. Never force a long blank/stationary scroll stretch merely to make someone read a card; no autoplay, scroll prison, wheel interception or unnecessary snapping.
- Keep complete readable keyframes and **short physical dwell**, then resume meaningful motion on continued scroll.
- Do not estimate pacing from elapsed video seconds alone: trackpads, mouse wheels, reverse movement and recording pauses produce misleading apparent timing. Inspect scroll distance, normalized progress and rendered frames.
- Preserve visual states on fast jumps, resize, back navigation, reverse scrolling and interrupted wheel/touch input. Ensure no transform variable depends on the preceding frame.

## Architectural transition do's and don'ts

- Begin the room **inside the actual B face dimensions**, not as a generic viewport-centered mask; this is especially important on portrait mobile.
- Keep one dominant central readable surface. Surrounding panels may frame it but must not carry required text.
- If using `transform-style:preserve-3d`, verify that ancestor grouping properties (including `overflow:hidden`) are not flattening the very descendants intended to retain Z depth. Clip the whole outer scene rather than the internal preserve-3d world where possible.
- Opaque backgrounds should remain opaque while text retires; do not crossfade whole scenes with two competing readable layers.
- A new card should emerge **as a complete distant surface**, not as tiny isolated or clipped letters; text can resolve when the solid front reaches legible size.
- At the C handoff, avoid a separate giant dark foreground rectangle or a dominant `G.` watermark. A simple, solid frame/plane motion beats competing triangular folds.
- The **C headline may arrive while green architecture remains at the edge**. Guard its reveal against the actual moving clip boundary using its rendered text bounds, including mobile safety margin. Secondary copy and footer may wait until the entire dark background is established. Do not allow an empty dark hold.
- Keep the finished C typography/layout and authentic Selected Work intact unless founder specifically requests their redesign.

## Review loop — small, real, reversible

1. Re-read current source, PR status and most recent founder recording. Identify **one exact visual failure**; avoid broad redesign from a single imperfection.
2. Define the target paused keyframes and several **in-between states**. Write down what's visible at each point; annotate normalized scroll progress, not just video seconds.
3. Implement one isolated, reversible code increment and commit it to the existing draft feature branch.
4. Verify JavaScript syntax and the actual served-route build, where available. Capture desktop `1440×900`, portrait `390×844`, narrow `320×568`, and a short-height viewport. Test both scroll directions, jumps, trackpad/wheel and touch where possible.
5. Check: first-frame intro; B physical push; fully opaque B hold; B-derived chamber with correct depth; no stranded interface labels; third front arriving whole; no long stationary interval; third-to-C fold; early unclipped C title with remaining green; complete C; direct Work/Services/Contact links; real Work seam only when integrated.
6. Check keyboard focus/inert for offscreen interactive elements, reduced-motion/static/no-JS behavior, locale and text scaling, responsive overflow, screenshot evidence and realistic performance claims.
7. Differentiate **source verified**, **local partial reconstruction**, **complete served prototype**, **physical mobile device**, **founder visual acceptance**, and **production release**. Never call one another. Report exact SHA, changed files, screenshots, test coverage and remaining gaps.
8. Keep PR draft until founder explicitly approves. Do not merge/deploy on the basis of local QA or a positive general comment.

## Clicked Work shortcut — separate from native-scroll motion (30 October)

The founder selected the **Folding Project Dive** (fold → reveal Work-facing preview → forward dive → actual `#work`) as a **creative hypothesis to prototype**, not a finished transition. First read [current Gate 1 brief](../../docs/infinite-website/GATE_1_VISUAL_FOUNDATION_2026-10-30.md). The original `work-nav.js` 680 ms root-snapshot fade/scale was replaced in the first 30 October isolated prototype by `work-dive.css` and a Web Animations folding/dive controller; the new effect remains **unverified in real browser video and unaccepted**. Preserve `motion.js` scroll choreography and `#work` fallback.

For this clicked shortcut:
- Use a temporary, decorative, noninteractive layer and the minimum credible site-derived geometry. Do not split or disable the actual anchor or accessible business text.
- Validate *paused and in-between frames*: fold must be legible, occlusion truly solid, preview recognizably related to actual Work, and dive must feel forward rather than flat zoom.
- No compulsory intermediate card or tunnel hold: users click to see work. Keep duration as a tested hypothesis, not a fixed quality metric.
- Verify click/back/forward/repeated click/interrupt/keyboard/mobile/short viewport/reduced motion and no-JS. The Work destination must be accessible and ready immediately when the effect ends.
- Do not label the current mirrored static `#work` as real React `SelectedWork`; that is a later integration gate.
- Art-directed excellence is required, but a bespoke high-budget-quality aspiration is **not** authority to add WebGL or heavy assets without visual/performance evidence.

## Reporting template

State: current branch + SHA + PR status; **what changed** (brief); **what was preserved**; actual verification run and where; observed defects; what has *not* been tested; the one next review action. Never invent acceptance or a tunnel URL.

## References

- `docs/infinite-website/NORTH_STAR_v1.2.md` (controlling)
- `docs/infinite-website/VISITOR_FLOW_v1.2.md`
- `docs/infinite-website/ACCEPTANCE_GATES_v1.2.md`
- `docs/infinite-website/HANDOFF_2026-10-29.md`
- `docs/infinite-website/LESSONS_2026-10-29.md`
- `docs/infinite-website/GATE_1_VISUAL_FOUNDATION_2026-10-30.md`
- `docs/DOCUMENTATION_AUDIT_2026-10-30.md`
- Current source: `public/flagship-journey/infinite-bc/{index.html,styles.css,entrance.css,motion.js}`
