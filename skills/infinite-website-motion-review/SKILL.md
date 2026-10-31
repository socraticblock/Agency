# Infinite Website Motion Review — repository-local skill

> **Scope:** Use when designing, coding, auditing, or visually reviewing the Genezisi *studio homepage* B → C scroll experience. This is a repository-local playbook referenced by `AGENTS.md`; it is **not** a claim of automatic installation in any particular AI coding tool. Other product routes, including digital business cards, are out of scope.

## Authority and entry

**For the mesh lab and next Screen 01 session:** first check [31 October Status and Decisions](../../docs/infinite-website/SCREEN_01_STATUS_AND_DECISIONS_2026-10-31.md). It documents the black-screen JavaScript exception fix, its lack of founder retest, and the current proposed **surface → architecture → camera passage** synthesis. Older references to a finished storyboard or currently accepted Living Page art are not final approvals.

1. Read `AGENTS.md` and `docs/infinite-website/NORTH_STAR_v1.2.md` first. North Star controls if anything here conflicts.
2. Read `VISITOR_FLOW_v1.2.md`, `ACCEPTANCE_GATES_v1.2.md`, the **current** `GATE_1_VISUAL_FOUNDATION_2026-10-30.md`, and the dated 29 October `HANDOFF_2026-10-29.md` and `LESSONS_2026-10-29.md` as historic evidence.
3. For **Screen 01 clicked CTA**, first read [The Living Page creative direction](../../docs/infinite-website/SCREEN_01_LIVING_PAGE_CREATIVE_DIRECTION_2026-10-30.md), which is the current proposed shot, material and spatial-scale treatment and describes the AI creative-director role. Then read [Screen 01 cinematic blueprint](../../docs/infinite-website/SCREEN_01_CINEMATIC_BLUEPRINT_2026-10-30.md) as the **current CTA-specific shot plan**; apply the gated production process below for any comparable new cinematic scene. The blueprint is **preproduction guidance**; neither the Living Page treatment nor a written storyboard equals founder-approved high-fidelity artwork or permission to implement.
4. Inspect the exact branch/worktree and full source. Never treat historic screenshots, isolated reconstructions, a prior SHA, or a passed synthetic test as proof that the currently served tunnel has the same code.
5. Do not alter `main`, `preview-*`, production routes, deployment config or independent business-card features without explicit authorization. Do not expand Gate 2 or integrate the prototype into the genuine Next.js homepage unless separately authorized.

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

## Creative / motion director role and visual-scale contract

For premium studio-homepage cinematic work, the **AI design collaborator leads creative direction and technical previsualization**, with the founder retaining final aesthetic, scope and release authority. The lead must **propose, anticipate, visualize, challenge and only then implement**; do not ask the founder to invent the missing visual solution or present a random menu of CSS effects.

**Before coding, own these questions:** What exactly is the one distinctive brand idea? What must the audience see when the shot is paused at 0%, early fold, half-open, passage, and arrival? Which **editorial, architectural and temporal scales** make it feel world-class? What can break as a **second-order consequence**, and how will the storyboard/animatic prove the prevention? What does desktop *and* portrait framing look like? Which technical architecture faithfully delivers the approved shot without false animation claims?

**Creative veto:** Reject a scene that is generic, derivative, physically incoherent, uses a substitute homepage, invents project imagery, hides Work behind a dark UI tunnel, deforms actual readable hero text, or only looks appealing at one keyframe. Smooth code and a shared easing curve are not enough. When the scene lacks art direction, **return to D0/D1/D2**, not to arbitrary transform tuning.

**Scale contract:** Document one camera origin/projection, optical viewport framing, near/far material relationships, real source/destination layout match, responsive portrait variant and expected emotional velocity. Use the fewest coherent surfaces; apparent size and parallax follow geometry, not independently guessed `scale()` multipliers. Timings such as ~1–1.2s and 60fps are **hypotheses/goals**, never evidence or unconditional requirements.

**Current Screen 01 creative candidate:** [The Living Page](../../docs/infinite-website/SCREEN_01_LIVING_PAGE_CREATIVE_DIRECTION_2026-10-30.md). The **previous symmetric two-door / framed green corridor composition and first generated five-frame storyboard are not accepted**. Do not resurrect them as an implementation target. Retain their recordings only for regression/failure analysis.

## Cinematic preproduction gates — mandatory before a new full effect

**Why:** Repeated implementation-first iterations of the Screen 01 CTA produced large duplicate letterforms, premature folds, flat miniature Work previews, heavy green rectangles and incoherent apparent camera movement. Small code/easing edits cannot reliably fix a broken spatial composition. **Design the final frame sequence and predict the next failure before authoring more full-scene code.**

For a **new signature interaction, structural redesign, or repeated visual failure**, execute these gates *in order*. Each stage has a concrete artifact, reviewer and go/no-go state. Routine local bug fixes to an **already approved** storyboard do not require restarting the process; if a bug exposes a failed spatial assumption, return to the earliest broken gate.

1. **D0 / Creative treatment:** Write the audience-visible effect in plain language, the emotional trajectory, the fixed scope, non-goals, accessibility and the reason the motion exists. Distinguish the interaction from normal scroll and content design. **Pass:** founder accepts the *intended shot*, not a technology list.
2. **D1 / High-fidelity visual storyboard:** Produce at least five internally consistent paused states (source, anticipation, reveal, travel, destination), including desktop **and portrait mobile**, plus high-risk in-between frames. Compare the first frame with the actual source page and the last with the actual destination. **Pass:** believable continuity, legible destination, coherent materials and no invented Work, approved as visual direction. Do not call prose-only descriptions or schematic diagrams completed artwork.
3. **D2 / Motion previsualization:** Produce a lightweight **moving animatic** separate from full production. Record camera axis, apparent scale, occlusion, phase pacing, easings and source-to-target continuity. Inspect normal speed and paused moments. **Pass:** founder can see the planned cinematic effect *before* investing in full application integration.
4. **D3 / Technical architecture/feasibility:** Specify camera and world coordinate system, near/far positions, 3D hierarchy, clipping, text-retirement and target geometry. Verify a barebones browser spatial proof on desktop, narrow portrait and short viewport, including fallback navigation. **Pass:** no unsupported spatial illusion or hidden preview, real-browser source/target alignment evidence.
5. **D4 / Production implementation:** Only after D0–D3, code on an isolated recoverable branch, preserving semantics, native-scroll source and existing Work. Derive object motion from coherent spatial relationships rather than independently scaling/rotating arbitrary parts. **Pass:** implementation matches approved previsualization without new scene inventions.
6. **D5 / Visual + engineering acceptance:** Capture the actual complete served route, intermediate and edge frames, browsers/viewport/device provenance, slow/fast interaction, history/focus/reduced motion, and measured frame/performance characteristics when available. **Pass:** founder explicitly accepts the specific visual interaction; do not imply approval of an entire Screen 01/Gate 1b or production readiness.

**Second-order failure check (required in D1–D3):** For every creative choice, fill **decision → desired visible effect → predictable next failure → prevention → evidence**. Examples: removing letters from folding material may introduce a blank cream dwell; adding real Z may bury Work behind opaque ancestors; using perspective on a half-width cloned hero may enlarge/split text; adding architecture may become a tunnel rather than a camera journey; matching an inert preview may still cause a 15px hash-scroll jump; shrinking desktop for mobile may destroy the aperture. Solve these *on paper and in the animatic* before production code.

**Escalation / stop rule:** If two focused implementation corrections do not reproduce the approved motion, **do not keep tweaking timing and shadows**. Preserve attempts, cite source and founder video evidence, return to D1/D2/D3, and explain the failed assumption. Stronger rendering technology is a justified comparison only when actual browser evidence shows CSS 3D insufficient.

**Artifact provenance:** Always label documents **specified**, **storyboard artwork created**, **animatic created**, **technical proof browser-tested**, **coded**, **founder accepted**, **integrated**, and **released** separately. Never infer earlier stages from a green test suite or claim an uncreated storyboard exists.

**Current Screen 01 state (30 October):** Prior CTA prototypes are **coded but visually rejected/incomplete**; several founder videos show the structural shortcomings. The [cinematic blueprint](../../docs/infinite-website/SCREEN_01_CINEMATIC_BLUEPRINT_2026-10-30.md) establishes the production gates, while [The Living Page](../../docs/infinite-website/SCREEN_01_LIVING_PAGE_CREATIVE_DIRECTION_2026-10-30.md) defines the **new** creative treatment. An older generic five-frame board was **rejected**; a separate **Living Page D1/D2 desktop + portrait storyboard and animatic candidate was then produced and founder explicitly authorized a new code prototype**. The resulting SVG/CSS 2.5D Living Page implementation is **coded on the isolated branch, not yet visually approved or verified end-to-end in the actual served route**. **That SVG version was subsequently reviewed and found visually insufficient** (ghosted type and page-wipe character). An independent WebGL2 lab was created; founder later saw upside-down content, then a black screen due to a `draw()` helper used before declaration. The inverted texture and helper bugs have been corrected on the **separate experiment branch**; the latest black-screen fix is **not yet confirmed in a founder browser recording**. The next task is verifying that corrected lab in a real browser, then critically refining the hybrid **surface-origin reveal + architectural journey** concept before any CTA integration. Continue to preserve `#work` and the scroll-driven B → C code.

## Review loop — small, real, reversible

1. Re-read current source, PR status and most recent founder recording. Identify **one exact visual failure**; avoid broad redesign from a single imperfection.
2. Define the target paused keyframes and several **in-between states**. Write down what's visible at each point; annotate normalized scroll progress, not just video seconds.
3. **First identify which preproduction gate remains valid.** If the visual defect is a small code-level deviation from an approved shot, implement one isolated reversible increment on the draft branch. If the spatial model or design itself is unapproved/broken, return to D1–D3 and do **not** code another full scene.
4. Verify JavaScript syntax and the actual served-route build, where available. Capture desktop `1440×900`, portrait `390×844`, narrow `320×568`, and a short-height viewport. Test both scroll directions, jumps, trackpad/wheel and touch where possible.
5. Check: first-frame intro; B physical push; fully opaque B hold; B-derived chamber with correct depth; no stranded interface labels; third front arriving whole; no long stationary interval; third-to-C fold; early unclipped C title with remaining green; complete C; direct Work/Services/Contact links; real Work seam only when integrated.
6. Check keyboard focus/inert for offscreen interactive elements, reduced-motion/static/no-JS behavior, locale and text scaling, responsive overflow, screenshot evidence and realistic performance claims.
7. Differentiate **source verified**, **local partial reconstruction**, **complete served prototype**, **physical mobile device**, **founder visual acceptance**, and **production release**. Never call one another. Report exact SHA, changed files, screenshots, test coverage and remaining gaps.
8. Keep PR draft until founder explicitly approves. Do not merge/deploy on the basis of local QA or a positive general comment.

## Clicked Work shortcut — separate from native-scroll motion (30 October)

The initial **Folding Project Dive** (fold → reveal existing Work → forward travel → `#work`) was a historical creative hypothesis; **its symmetric-door/tunnel execution and first generic storyboard were rejected**. The currently proposed creative treatment is **The Living Page**, which reinterprets the fold as the actual cream editorial material becoming asymmetrical architecture. First read [current Gate 1 brief](../../docs/infinite-website/GATE_1_VISUAL_FOUNDATION_2026-10-30.md). The original root-snapshot fade and subsequent Web Animations twin-door tunnel were **reviewed and visually rejected**. The current isolated implementation in `work-nav.js` / `work-dive.css` instead uses **one asynchronous-RAF-driven vector curl**, a masked single-layout inert ink replica and the **unchanged** Work DOM as destination copy. This is **2.5D previsualization-based code**, not proof of physical 3D mesh deformation or founder approval. Preserve `motion.js` scroll choreography and `#work` fallback.

For this clicked shortcut:
- **Read The Living Page treatment first**, including material, light, camera scale, the no-invented-portfolio rule, founder sign-off, and the CSS-versus-small-mesh decision criterion.
- **Read the cinematic blueprint and pass D0–D3 before another full structural rewrite.** Source-level fixes already tried are failure evidence; do not continue to tweak the old half-width cloned-hero scene without a reviewed storyboard and animatic.
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
- `docs/infinite-website/SCREEN_01_CINEMATIC_BLUEPRINT_2026-10-30.md`
- `docs/infinite-website/SCREEN_01_LIVING_PAGE_CREATIVE_DIRECTION_2026-10-30.md`
- `docs/DOCUMENTATION_AUDIT_2026-10-30.md`
- Current source: `public/flagship-journey/infinite-bc/{index.html,styles.css,entrance.css,motion.js,work-nav.js,work-dive.css}`
