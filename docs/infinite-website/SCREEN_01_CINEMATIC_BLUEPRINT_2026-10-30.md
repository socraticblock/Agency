# Genezisi — Screen 01 Cinematic Blueprint / Folding Project Dive

**Prepared:** 30 October 2026  
**State:** **Preproduction framework and written shot plan only.** The five high-fidelity storyboard images, timed animatic, camera/geometry proof, real-browser QA and founder visual approval **do not yet exist**. No authorization to silently rewrite the implementation.  
**Authority:** [North Star v1.2](./NORTH_STAR_v1.2.md), [Visitor Flow](./VISITOR_FLOW_v1.2.md) and [Acceptance Gates](./ACCEPTANCE_GATES_v1.2.md) govern. This is a narrower working blueprint, not a replacement for those documents or a new release gate.  
**Related records:** [Gate 1 visual foundation](./GATE_1_VISUAL_FOUNDATION_2026-10-30.md) and [motion-review skill](../../skills/infinite-website-motion-review/SKILL.md).

## 1. Problem statement — why we stop patching

Founder recordings of the click transition revealed a repeated failure pattern: implementation-first changes produced split/enlarged hero lettering, mismatched cream geometry, thick green frames around a small flat portfolio screenshot, an unconvincing camera approach, and visible discontinuity at arrival. Adjusting timing alone cannot resolve inconsistent spatial construction. Video can establish perceptual issues, **not** precise dropped-frame counts.

**New operating rule:** **Concept → high-fidelity storyboard → motion previsualization → technical feasibility proof → production → evidence-led acceptance.** No full effect implementation before the required design and motion checks pass. When a defect is structural, go back to the storyboard or spatial model rather than adding animation layers.

The studio seeks the *craft* of a highly bespoke cinematic website; the "$50,000 website" comparison is a **quality aspiration, not a budget, price, performance promise, or mandate for expensive software**.

## 2. Non-negotiable boundaries

- This blueprint concerns **only Screen 01 and the clicked `Explore our work` shortcut**.
- Preserve the original centered cream Option D hero, heading, copy, brand hierarchy, usable links, and the verified source `#work` anchor. Do not redesign or expand the actual Work section, its cards, imagery or project list.
- Do not modify Screens 02 (green B), 03 (architectural interior), 04 (centered C), their native-scroll logic in `motion.js`, or future Gate 2 story.
- Current Gate 1b static `#work` is a **labeled Work mirror**; genuine Next.js `SelectedWork` remains a later integration gate.
- The shortcut must be immediate, optional, interruptible, keyboard/assistive-technology safe and usable without animation. No compulsory corridor or theatrical waiting. Prototype duration is a hypothesis, not an acceptance criterion.
- Keep `main`, `preview-*`, PR #15, real deployment, locales and unrelated products untouched unless separately authorized.

## 3. Intended finished experience (the audience-facing shot)

> The visitor clicks **Explore our work**. The actual cream hero remains precisely where it was. Its typography retires elegantly as the architectural cream surface develops a subtle seam and opens. A recognizable glimpse of the existing Work layout appears behind it. The visitor advances *through* the aperture, with near architecture moving past faster than the distant destination. The Work layout expands to exact viewport alignment; the overlay disappears with **no detectable jump, flash, broken focus or delay**.

Desired visual feelings: **calm anticipation → physical reveal → momentum and depth → effortless arrival**. Epic by *continuity, weight, light, spatial causality and precision*, not screen-filling visual noise.

**Not the shot:** two enlarged copies of the homepage rotating; giant distorted letters at the edges; anonymous green tunnel with a thumbnail at the end; nested neon rectangles; a 2D zoom with decorative borders; a black/green empty interval; fake client media; a hard cut to Work.

## 4. Five keyframes — written storyboard specification

These are **art-direction instructions**, not completed storyboard artwork or automatically accepted camera coordinates. Illustrate desktop **and** portrait-mobile versions before an animatic.

| Frame | What the visitor must see | What must not happen | Approval evidence |
|---|---|---|---|
| **K0 — Hero intact / intent** | Exact selected Option D hero, current readable headline and CTAs. One coherent on-screen source. | Overlay first frame has altered type scale, nav placement, layout, or color. | Pixel/composition comparison to real source hero on desktop and mobile. |
| **K1 — Anticipation / retire** | Typography retires cleanly, cream background remains visually continuous, subtle seam and early shadow indicate the fold. | Text fragments stretch, rotate, become enormous, or vanish into a blank static cream slide. | Still and moving 0–early phase frames; explain content-retirement order. |
| **K2 — Physical unfold / glimpse** | Cream *architectural surfaces*, not duplicate page screenshots, hinge away; believable edges, lighting, occlusion. Existing Work geometry is already recognizable within the opening. | Two giant doors, disconnected panels, deep green void, fake portfolio imagery, perspective mismatch. | Half-open desktop/mobile stills and a geometry diagram showing hinges/occluders. |
| **K3 — Through the aperture** | One camera axis and material world. Near edge passes outside frame, distant Work grows through perspective, lighting changes with orientation. No arbitrary second tunnel stop. | Work reads as a flat mini webpage with thick nested frames; camera and surfaces move with inconsistent trajectories. | Annotated mid-flight frames (at least 25/50/75%) and motion animatic. |
| **K4 — Work arrival** | Animated destination matches **existing** `#work` position and layout exactly; normal page is immediately usable. | Preview-to-real cut, vertical 15px jump, focus loss, back/forward/history break, overlay remains. | Pre-handoff and post-handoff adjacent screenshots, DOM/focus/history checks. |

**Timing:** Start by testing roughly one second, but decide by perceived continuity and quick access. Do not assign immutable per-frame milliseconds before evaluating an animatic. For each K-frame record **normalized progress, duration hypothesis, visible surfaces, camera pose and expected viewer attention**. Capture at least the in-betweens between K1–K2 and K3–K4 (known failures).

## 5. Previsualization and camera/spatial contract

Build a minimal **separate visual animatic/proof** before touching production CTA code again. Low-detail solids are acceptable *for motion testing*, but the art-direction storyboard must be polished enough to reveal whether the proposed composition is worth engineering.

1. **One coordinate system:** define a common virtual camera, viewport framing, near/hinge planes, occluding architectural edges, Work destination plane and a shared forward axis. A CSS transform implementation can emulate the camera with an inverse world transform; a literal 3D engine is not required.
2. **One progression:** camera and objects sample the same normalized timeline; their relative positions follow the spatial model. A shared easing curve by itself is **not proof** of coherent 3D. Avoid arbitrary scales for every object.
3. **One intact source:** do not duplicate full-width hero content into two half-width `overflow:hidden` planes that compute different typography/layout. Separate semantic real hero (stays interactive) and decorative material surfaces; retire content before it can warp.
4. **One destination reference:** for Gate 1b use a noninteractive visual of the existing Work markup, not a redesigned gallery. Match its viewport geometry. The later real integration can update only the end-seam mechanism.
5. **Depth evidence:** demonstrate meaningful near/far relative motion, correct occlusion and panel orientation at K2 and K3. A flat scale-up of the preview is not enough.
6. **Resizing:** recalculate framing for desktop, 390px portrait, 320px narrow, and short viewports. Mobile may fold vertically or use a simpler aperture if the horizontal solution does not read physically; do **not** merely shrink desktop.
7. **Fallback:** a normal `href="#work"` must continue to work if reduced motion, animation APIs, resources, or JavaScript are unavailable. A failure cannot strand navigation.

Proposed approach: **CSS 3D + Web Animations API + measured DOM geometry**, provided an animatic proves it visually. A small WebGL hybrid is a possible *evidence-driven fallback* only when an agreed visual requirement fails consistently in CSS, not a prerequisite. Large video assets, heavy shader environments and invented client footage are out of scope.

## 6. Predictive failure analysis: solve second-order effects before coding

| Planned decision | First-order effect | Predictable second-order failure | Required preproduction test / mitigation |
|---|---|---|---|
| Retire text before folding | No split/warped glyphs | Brief blank cream page makes motion feel stalled | Stage content retirement simultaneously with seam/shadow and immediate visible physical change. |
| Fold independent cream panels | Architectural portal | Panels jump from original hero to a new geometry at time 0 | Source/overlay pixel comparison, correct hinge placement, inspect first 1–3 painted frames. |
| Show Work deep in space | Clear direction | Work is hidden behind solid 3D ancestor background or too tiny to recognize | Layer-order/occlusion proof at K2; preview identity/scale readability test. |
| Use frames and walls for parallax | Strong forward travel | Thick nested rectangles overpower Work and look like a UI mockup | Restrict to a few near edges with physically derived motion; K3 composition veto. |
| Move camera through aperture | Momentum | Near geometry clips, flattens, changes orientation or flashes | Inspect true 3D hierarchy and projected bounds at sampled progress; test clipping/preserve-3D. |
| End on the real Work markup | Seamless arrival | Anchor scroll margin, browser hash behavior or reflow causes a jump | Exact geometry/scroll-target mapping; adjacent final frames; history/resize tests. |
| Render inert replicas | Visual fidelity without duplicate semantics | Replicas differ in typography, reflow under mobile, or capture focus | Prefer geometric surfaces, minimal measured visual content, `aria-hidden`/inert and event isolation. |
| Compose for mobile | Distinctive portrait result | Lateral fold consumes screen, undersized preview, awkward threshold | Separate portrait composition and early 320px storyboard; do not postpone mobile until QA. |
| Add depth/light | Premium material feel | GPU costs, dropped frames, unreadable contrast | Conservative composited transforms; test GPU/frame traces on representative hardware; simplify. |
| Allow interruption | Immediate user control | Persistent overlay, stale focus or forced return to Work after Back | Explicit cancellation/cleanup table; simulated and real-browser interaction tests. |

A **known missing input** is real production Work layout: do not pretend the Gate 1b mirror is the final portfolio. The transition must be visually compelling using today's real source and adaptable to future integration.

## 7. Gated production workflow (deliverable and veto)

| Gate | Deliverable | Pass condition | Failure action |
|---|---|---|---|
| **D0 — Creative treatment** | 1-page viewer experience, intended emotional progression, no-go references and scope locks | Founder agrees on *what the finished shot is* | Rewrite treatment before producing more assets |
| **D1 — Storyboard** | **Five high-fidelity, matching K0–K4 stills**, desktop and mobile framing, plus intermediate risk frames | Composition is coherent, Work recognizable, no fake content; founder accepts direction | Redesign panels, not code |
| **D2 — Motion animatic** | Short playable motion preview with labelled progress/easing, not production CTA | At normal speed and while paused, folding and forward travel read as *one* shot; no green void | Change shot/camera/spatial model; rerun D1 if necessary |
| **D3 — Technical feasibility** | Isolated coordinate model, camera/plane diagram, source/overlay first-frame and destination alignment measurements, fallback contract | Can reproduce D2 in actual browser at desktop and narrow portrait; no structural clipping/ghosting | Simplify scene or compare rendering technique with evidence |
| **D4 — Production integration** | Small isolated branch implementation with verified exact files, tests and reversible checkpoints | Matches previsualized motion; existing hero, Work and scroll journey preserved | Correct implementation against approved D2/D3; do not improvise new creative direction |
| **D5 — Evidence and acceptance** | Served full-route recordings, intermediate frames, named browsers and viewports, actual performance data, navigation/focus/reduced-motion checks | Founder explicitly accepts CTA motion; separate Screen 01 and full Gate 1b sign-offs still required | Log precise failure and return to **earliest invalid gate**, not another arbitrary patch |

**Stop rule:** If two focused technical adjustments fail to reproduce the approved motion, report evidence, preserve both checkpoints and return to D2/D3; avoid indefinite trial-and-error. A good code diff or synthetic pass is **not** visual approval.

## 8. Production handoff worksheet (fill, do not assume)

Before D4 implementation, fill:

- **Approved treatment / storyboard ref:** pending.
- **Founder-reviewed keyframes (desktop and portrait):** pending.
- **Animatic file and tested duration:** pending.
- **Viewport coordinates and camera/plane depth model:** pending.
- **Typography retirement plan without cloned halves:** pending.
- **Layer/occlusion proof and Work source/target alignment:** pending.
- **Responsive mobile variation and small viewport test:** pending.
- **Fallback, focus, hash/history, interruption model:** pending.
- **Performance/rendering method decision backed by browser evidence:** pending.
- **Exact current branch, baseline SHA, worktree status and rollback:** recheck at coding start.
- **Out-of-scope:** Work redesign, Screens 02–04, narrative Gate 2, production merge/deployment.

**Current status as of this written blueprint:** Prior implementations and founder videos are useful **failure evidence**, not approved storyboards or production-ready animatics. **Next action is D1 visual storyboard**, after confirming the D0 creative treatment, then D2 motion preview. Do not jump directly to another full CTA code rewrite.

## 9. Reuse for future screens

The **process** (treatment → storyboard → animatic → feasibility → production → visual acceptance) is reusable for complex transitions on Screens 02–04 and later site sections. **The actual camera geometry, hero copy, project preview and visual treatment in this document apply only to the Screen 01 clicked CTA.** Never carry the click-transition timing/geometry rules over to native-scroll states; the latter remain deterministic and user-directed.
