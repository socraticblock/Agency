# GENEZISI / Screen 01 — The Living Page
## Creative-director treatment, cinematic scale and visual production contract

**Date:** 30 October 2026  
**Scope:** **Only the clicked `Explore our work` interaction originating at Screen 01.** Existing Work destination is a target, **not** a redesign assignment. Screens 02–04 and the native-scroll B → C story are excluded.  
**State:** **Lead creative direction proposed after founder video feedback and reference research.** The founder has requested this direction be documented; that request does **not** automatically constitute visual sign-off on a storyboard, animatic, camera rig, or implementation.  
**Authority:** [North Star v1.2](./NORTH_STAR_v1.2.md) controls product/brand. [Screen 01 Cinematic Blueprint](./SCREEN_01_CINEMATIC_BLUEPRINT_2026-10-30.md) and [motion skill](../../skills/infinite-website-motion-review/SKILL.md) control the production checkpoints. This document controls **current Screen 01 CTA art direction** when older Gate 1 briefs describe the rejected symmetrical two-door/tunnel presentation.

> **Creative thesis:** **The website becomes architecture.** Its own cream editorial surface evolves into a precise, asymmetrical spatial fold, revealing an actual Work destination already inside the same physical world. The viewer crosses the threshold in a single uninterrupted movement. **The interface is the material; the transition is not a separate portal.**

## 1. Who directs this work, and who approves it

For this project the **AI design collaborator acts as an integrated creative director, art director, motion director, spatial-experience designer, technical architect and critical visual reviewer** during design exploration. This is an **assignment of responsibilities**, not a claim of a human employee, film-production qualification, agency affiliation, or autonomous authority to deploy.

**Creative-director responsibilities (do not delegate unanswered questions to the founder):**
- Propose **one lead treatment** rather than presenting unlimited unranked alternatives; justify its distinctive brand value and explain why the old version fails.
- **Visualize before engineering**: design complete source, intermediate and arrival compositions at desktop **and portrait**; evaluate the *paused frames*, not only the headline concept.
- **Think two or three steps ahead**: for each creative decision predict the immediate result, the second-order visual/technical failure it may cause, how to prevent that failure, and the evidence that would distinguish success from illusion.
- Direct **composition, proportions, optical scale, material finish, lighting, camera path, timing and focus of attention**. Ensure every frame looks authored rather than assembled from arbitrary CSS effects.
- Own **cross-disciplinary feasibility**: identify CSS 3D vs small mesh-renderer tradeoffs, DOM text semantics, compositor behavior, interaction interruption, responsive layout and navigation continuity **before** full implementation.
- Challenge mediocre output: a technically working click does not clear the quality bar. **Recommend rejection when a result is ordinary, visually inconsistent, or derivative.**
- Maintain a **single source of truth** for the shot, named status and versioned references; stop ad-hoc commits when the premise is unapproved. Preserve rejected designs as lessons, not silently promoted instructions.
- Request **specific evidence** from the founder (e.g. 15–25 s reference site video of a click, source-to-target transition) only when it resolves a known ambiguity; do not turn project direction into open-ended homework.

**Founder is final creative authority.** The AI proposes, critiques, anticipates and executes only within authorization. The founder accepts D0/D1/D2/D5 outcomes and any scope/merge/deploy decision. Coders implement approved specifications and report deviations; no role implies permission to push to `main`.

## 2. Quality ambition and the distinctive idea

The "$50,000 website" comparison means **bespoke creative craft quality**, **not** a monetary budget, quote, price claim or an obligation to introduce 3D for its own sake.

**The shot should feel:**
1. **Editorial:** the site's real composition is the hero, with restrained high-contrast typography and warm cream `#E6DED2` against evergreen `#173327`.
2. **Architectural:** a continuous designed surface develops material form, coherent edge thickness, accurate near/far occlusion and light motivated by the fold.
3. **Cinematic:** a legible beginning, anticipation, visual discovery, controlled forward acceleration and effortless landing; no arbitrary zoom or cut.
4. **Unexpected but inevitable:** the reveal appears to come from **the existing website**, not from a separate staged demo or generic tunnel.
5. **Commercial and accessible:** the user gets to actual Work quickly; the interaction supports a real action rather than delaying it.

**Do not reproduce:** twin hinged cream doors, duplicated enlarged headline fragments, window-sized screenshot in nested glowing green rectangles, generic corridor and spotlight, stock architectural photographs, unrelated art, invented client projects, particles, sci-fi chrome/glass effects, simulated heavy loading or a long empty hold. Simplicity is not the same as ordinary execution.

## 3. The final shot — director's five-frame sequence

The following **K0–K4 are production-target *descriptions***, **not** completed or approved concept frames. A rejected D1 storyboard candidate (30 October) demonstrated that merely depicting five rectangles with panels is insufficient. **Create new polished imagery of this Living Page treatment; do not reuse the rejected candidate as the target.**

| Shot | Composition, action and point of attention | Physical/visual continuity test |
|---|---|---|
| **K0 / Hero (intent)** | Exact source hero: eyebrow `DIGITAL SOLUTIONS STUDIO`; headline **“Your website is only the beginning.”**; simple three-discipline copy; real `Explore our work` / `Start a project` actions. No unapproved edits to typography, nav or brand layout. | On frame zero, not a pixel of the hero unexpectedly changes. The real CTA is still the link. |
| **K1 / The surface responds (anticipation)** | A subtle crease and grazing shadow emerge from the actual cream field, **asymmetrically** and plausibly related to the hero layout. Real text recedes in synchrony with the first physical movement; no prolonged blank interval. | The viewer can identify a cause of motion. Text does **not** enlarge, split in half or appear on a warped duplicate. |
| **K2 / Living fold (discovery)** | A continuous cream *editorial surface* bends/unfolds out of plane. An off-center aperture develops with deliberate edge thickness, soft shaded curvature/facets and authentic overlap. A recognizable glimpse of existing Work appears **through the opening**, not within an added dark hallway. | A paused half-open frame has readable mass, physical depth and the Work destination already visibly present. No symmetric doors. |
| **K3 / Pass the threshold (momentum)** | One camera advances along a declared forward axis; the near cream edge sweeps beyond frame and moves faster than the Work plane. Evergreen remains a restrained spatial backdrop, not the focal object. The composition feels large because of perspective/occlusion and proximity, **not** thick frames. | A 25%/50%/75% comparison shows consistent projection and a visible camera trajectory, not arbitrary per-layer scaling. |
| **K4 / Arrival (release)** | The real existing Work section occupies the viewport with the same geometry as its animated destination representation. The transition layer disappears without revealing a different scroll offset or a ghosted duplicate. | Side-by-side final animation and first actual Work frame align; focus/hash/back/forward/native scrolling remain usable. |

**First principle:** original hero text and functional links remain real semantic DOM until the designed retirement point; an inert decorative *surface* may transform, but **do not clone the complete hero into half-width rotating containers**.

## 4. Scale and camera contract — what makes the shot feel big

**Scale is a design relationship, not the size of an animated rectangle.** Establish these relationships in a camera/geometry diagram and prove them in a browser before prescribing arbitrary CSS transforms.

### 4A. Three scales to direct together

**Editorial scale (perceived):** K0 retains the approved centered hero and natural typographic hierarchy. No headline may unexpectedly magnify because a duplicate was reflowed. K2 has one clear viewing aperture whose opening is substantial enough to show the existing Work identity. K4 fills the viewport at a measured **1:1 match**. No new headings or client imagery are commissioned.

**Architectural scale (physical illusion):** Define camera position, look direction, perspective / field of view, near plane, cream material thickness or faceted/curved representation, fold/hinge line, adjacent opaque geometry, destination plane and clipping rules in **one coordinate system**. Keep near architecture close enough to produce parallax, but not so close that it becomes a dominant giant green frame. Every plane and shadow must correspond to a surface and a light assumption.

**Temporal scale (viewer perception):** The impression should be **anticipation → reveal → approach → seamless arrival**, with smooth velocity and no stop in empty space. Roughly **1.0–1.2 seconds is a hypothesis**, not a directive. A 30fps video is not proof of compositor 60fps performance; inspect true frame timing in browser where feasible.

### 4B. Required geometry artefact

At D3 produce a **top view and side view with one common origin and units**, annotated with source viewport, cream fold segment, parent hierarchy/clipping boundaries, destination `#work` plane, camera path and projected framing for K0–K4.

- State actual perspective/FOV or equivalent projection. Avoid assigning independent `scale()` values to every unrelated DOM element merely to approximate travel.
- Make occlusion physically explainable: at K2 the Work plane is revealed behind the source surface; at K3 near edges can pass the camera without clipping over live content.
- **Viewport-safe design, not shrink-to-fit:** independently compose and storyboard desktop `1440×900`, portrait `390×844`, narrow portrait `320×568` and a short desktop viewport. Portrait may use a different off-center fold/camera projection if more convincing. Keep legibility, safe areas and clear CTA fallback.
- Confirm which version is **2.5D faceted CSS** versus **genuinely deformable material**. A visually essential curved organic bend may warrant a tiny mesh surface or shader; it is **not** technically correct to promise a smooth continuous bend from two rigid CSS doors.
- **Select renderer by evidence** at D3: compare CSS 3D / Web Animations against a minimal mesh-based proof **only if the approved storyboard requires nonrigid deformation**. Choose the simplest measured implementation that reproduces the accepted D2 animation. Never move real interactive text into a canvas.
- Note device limits and budget (transient layers, compositing, memory and cleanup); prefer fewer surfaces, stable textures and reduced-motion direct navigation. Do not claim a measured frame rate without tracing it.

## 5. Art-direction grammar

**Material:** warm printed ivory/cream, matte and finely dimensional, not reflective metal or generic glass. Highlight on a folded edge should follow orientation. A one-pixel rule may become a seam; it should not suddenly spawn a giant gateway.

**Light:** coherent warm-to-green bounce and soft falloff connected to actual geometry, never a neon portal. A subtle contact shadow should establish overlap without swallowing content.

**Composition:** a strong central or deliberately off-center viewing axis and one destination; negative space is composed rather than empty. The aperture should expand through perspective and true reveal, not become a tiny inset website inside a dark box.

**Camera:** no unmotivated shake, hard cuts, unrelated motion tracks or constant-speed zoom. Camera acceleration/deceleration are chosen in D2 and tied to near/far relationships. One controllable timeline with physically consistent surfaces; a shared easing function **alone** does not prove this.

**Typography:** content exits gracefully before deformation could damage legibility. No duplicate navigation, giant split letters, invented headline or source re-layout. The cream surface itself is the actor; readable copy stays the lead at K0.

**Sound:** do not introduce audio into the normal website to manufacture epicness. If ever explored, it requires separate design/permission and off-by-default accessible handling; out of this CTA gate.

## 6. Think-ahead matrix (must be completed before code)

| Direction decision | Expected win | Next likely failure | Prevention / proof |
|---|---|---|---|
| Keep actual hero intact | No ghost type | Blank cream gap when copy retires | K1 staged seam/fold within same visual beat; first 3–5 frame comparison |
| Make an asymmetric bend | Distinctive surface transformation | Bend looks like polygon fracture or rubber | D1 high-fidelity paused curvature/facet study; D3 CSS vs small mesh proof as needed |
| Open aperture early | Immediate narrative destination | Existing Work clone appears tiny/unrecognizable | K2 native source preview scale/framing check; target is existing Work only |
| One camera forward | Genuine cinematic travel | Independent geometric transforms conflict with virtual camera | D3 single projection/camera diagram; examine projected points across progress |
| Use near cream edges | Physical parallax | Edges occlude Work too late or look like swinging doors | Test viewport sweep and true depth order at K2/K3 |
| Light the fold | Material and weight | Glow looks like a random portal overlay | Surface-normal/light rationale; eliminate lighting that does not clarify geometry |
| Align existing Work | Seamless continuation | Hash/scroll margin/layout shifts after overlay cleanup | Real before/after pixel diffs and focus/history tests |
| Design for portrait | Deliberate mobile experience | Vertical shutter looks mechanical; fold consumes all space | Independent portrait storyboard and framing proposal; fallback if weak |
| Choose WebGL for curvature | Smooth material deformation | Load/performance/text rendering overhead | Feasibility A/B vs CSS, DOM-based text, fallback without renderer |
| Add spectacle | Higher emotional payoff | Distraction, slow tap, more technical fragility | Each effect must pass necessity review; remove if it does not serve spatial causality |

**Kill criteria for D1:** If an image looks like flat doors, a green corridor, a miniature screenshot, generic stock-architecture art or a substitute Genezisi homepage, **reject the treatment before animating it**. Do not argue that an eventual shader will rescue weak composition.

## 7. Workflow and decision rights

Follow [cinematic skill D0–D5](../../skills/infinite-website-motion-review/SKILL.md).

- **D0 / Treatment:** This document is the *lead proposed treatment* for founder review. The founder's documentation request is not by itself D0 art-direction acceptance.
- **D1 / Storyboard:** Produce **five truly high-fidelity matched K0–K4 frames** using the correct Genezisi assets, plus problematic in-between views. **Desktop and portrait both required.** Label approximate/purely illustrative imagery unmistakably. Rejected D1 candidate is historical evidence only.
- **D2 / Animatic:** Produce short **playable previsualization** of camera and fold. Evaluate normal-speed impact and pause states before any app integration. No full CTA code rewrite during this phase.
- **D3 / Proof:** Test coordinate model, source match, occlusion, target alignment, renderer feasibility and mobile framing in real browser. This may be a separate tiny technical study, not production patching.
- **D4 / Implementation:** Only after approved visual direction/animatic and feasibility proof, build the small isolated CTA effect. Do not rework actual Work or the native scroll.
- **D5 / Verification:** Real served-route recordings, browser frame metrics where available, click/back/forward/interrupt/reduced-motion tests and explicit founder acceptance; no automatic screen/gate/release approval.

**Ownership:** AI creative/motion direction must *recommend* one coherent treatment and critique it before external founder review. Founder retains final aesthetic and scope authority. Coding agents must not silently replace the selected concept with "whatever CSS is easiest."

**Stop after a failed concept:** If the final paused frames are not excellent, return to D1. If frames are excellent but motion is wrong, return to D2. If motion is good but browser proof cannot reproduce it, return to D3. Only if the previsualization is accepted and the app differs do we fix D4 code.

## 8. External reference study (research, not Genezisi source)

The following were checked on 30 October 2026. They are **studies of qualities**, not instructions to copy visuals, IP, layouts or interaction mechanics. Live sites may change; developer reports must specify what was actually captured and measured.

- [Unseen Studio](https://unseen.co/) / [World](https://unseen.co/world/) — study the intentional immersive world and sense of scale. The site itself invites visitors to drag to explore. **Question for reference recording:** how does the environment communicate depth and visual hierarchy without hiding projects?
- [Podium](https://podium.global/) — sports creative-direction and production portfolio. Study source-to-work navigation and keeping the project as protagonist. **Question:** can we see a recognizable source persist through an interaction instead of a disconnected theatrical stage? Do not claim a particular animation was verified unless captured.
- [Ciel Rose development case study — Codrops, 7 Apr 2025](https://tympanus.net/codrops/2025/04/07/case-study-ciel-rose/) — documented alignment of WebGL planes with DOM, page-transition classes and restrained perspective/plane deformation. **Question:** which technique applies if—and only if—the Living Page's material bend cannot be expressed convincingly with CSS?

**Optional founder footage request (only if needed):** 15–25 seconds of Unseen's entry/interaction and a clicked project transition on Podium, cursor visible, normal speed. State what aspect needs study; neither footage nor these sites are prerequisite to the D1 storyboard.

## 9. Status and handoff

- **Approved:** Genezisi core homepage North Star, selected Screen 01 Option D art direction (palette/copy), scope isolation and a storyboard-first workflow.
- **Not accepted:** old symmetric Folding Project Dive execution; earlier code-first reels; earlier D1 five-frame board (generic panel/portal composition); any final Living Page frame/animatic.
- **Current lead candidate:** **The Living Page** — a new interpretation of the existing fold/reveal/dive intent, not authorization for app code.
- **Next actionable design deliverable:** **new D1 five-frame high-fidelity desktop + portrait storyboard for The Living Page**, with scale/camera map and high-risk in-betweens. Obtain founder visual critique **before** D2 motion animatic.
- **Preserve:** `public/flagship-journey/infinite-bc/...` existing code, original `#work` content, Screens 02–04, historical notes, PR #15 and any unmerged work. No merge or deploy.
