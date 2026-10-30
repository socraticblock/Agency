# Genezisi Infinite Website — Gate 1 visual foundation and CTA concept

**Decision date:** 30 October 2026  
**Scope:** Four visible Gate 1b compositions, first-screen refinement, and an optional shortcut from the opening CTA to Selected Work.  
**Authority:** [North Star v1.2](./NORTH_STAR_v1.2.md) controls. This is a dated implementation/review brief and decision register, **not a separate North Star or a gate approval**. Read with [Visitor Flow](./VISITOR_FLOW_v1.2.md) and [Acceptance Gates](./ACCEPTANCE_GATES_v1.2.md).

## 1. Why this refinement phase exists

The founder wants a technically durable, exceptionally art-directed studio homepage, using the *perceived craft* of a bespoke, high-budget (described as "$50,000 website") experience as an **aspirational quality benchmark**, **not** a project cost, price, revenue claim, or excuse to add effects. Develop carefully, one screen at a time. The quality target is simultaneous editorial art direction, convincing geometry, smooth interaction, dependable engineering, accessibility, ordinary-phone performance, and maintainability.

**Sequence:** design → implement → inspect real moving output → refine → founder accepts **specific screen** → freeze that screen provisionally → move to the next → perform one end-to-end Gate 1b review before considering Gate 1b accepted. Any later integration can reopen a frozen screen for a demonstrable regression, not aesthetic churn.

The **four screen compositions** here are four major *visual anchors* in the **Gate 1b proof**, not the 18 conceptual moments of the future full visitor story and not permission to implement Gate 2.

| Screen | Role | Work now / acceptance status |
|---|---|---|
| **01 — Centered Opening** | First impression: “Your website is only the beginning.” Independent Websites / Automation / AI systems and useful CTAs. | **Active refinement.** Option D warm cream, revised copy and typographic polish selected/implemented in isolated branch. Founder says it looks good; final CTA motion and specific final visual/mobile acceptance **pending**. |
| **02 — Green Interface / B** | One large opaque, readable three-discipline interface. | Existing native-scroll motion is a working foundation. Detailed card art direction, type, materials and mobile refinement **pending**. |
| **03 — Site-derived Architectural Interior / third reading plane** | Convincing physical continuation of B, integrated calm reading surface. | Motion direction retained. Architectural integration, readable stage, material hierarchy and visual refinement **pending**. **Not** the Gate 2 fictional business story. |
| **04 — Centered C / Final Statement** | “Made to be seen. Built to work.” and seamless release toward Selected Work. | Working spatial proof, but composition, secondary furniture, typography and real Work seam still require review. Genuine Next.js `SelectedWork` integration is **later Gate 3**, not achieved by the static mirror. |

**Current preservation rule:** Existing native-scroll B push, B-to-room, forward fold, C headline reveal and reverse behavior are accepted *working motion foundations*, **not final Gate 1b acceptance**. Do not rebuild them merely to polish the CTA.

## 2. Screen 01 — founder decisions, 30 October

### Creative choices made

- **Background, Option D richer cream:** `#E6DED2`, with main evergreen ink `#173327`, supporting text `#586A5B`, sage metadata `#6D816E`, secondary CTA border `#A3B29F`. These are **selected first-screen values**. Do not propagate the background to B/interior/C without separate visual approval. Maintain deliberate contrast and test accessibility.
- **Eyebrow:** `DIGITAL SOLUTIONS STUDIO` (remove redundant studio name from the eyebrow; wordmark remains in navigation).
- **Headline:** exact `Your website is only the beginning.` with deliberate bold sans / italic serif relationship. Preserve its composition; optical alignment only.
- **Supporting paragraph:** “We build websites, create AI systems, and automate everyday tasks. You can choose one service or combine them.” Short, simple English suitable for non-native speakers. **Do not construe this succinct first-screen line as the full technical limits of services**; elsewhere the studio still offers web applications, integration, workflows and custom AI engineering.
- **CTAs:** primary `Explore our work` → real anchored Work path, secondary `Start a project` → verified contact. Header contact and direct Work navigation must remain immediately usable.
- **Small type and mobile:** simplify and increase legibility, retain balanced centered desktop and responsive mobile compositions. Validate 320px and short-height, even though founder liked the shown mobile layout.

### What is already coded on the isolated branch (as observed 30 October)

Repo `socraticblock/Agency`; branch `feature/infinite-gate1b-opening-option-d-cream-2026-10-30`; application checkpoint **`5f24cc714230867075c9251623ecd8fc60562adb`** (verify actual HEAD again before changes). Forked from draft PR #15 HEAD `0f9ccaa73e6144d1d2104efc7f0b48eee35256bf` and was four commits ahead at audit. Files changed versus that base: `public/flagship-journey/infinite-bc/index.html`, `styles.css`, and new `work-nav.js`. Existing `motion.js` remained unchanged.

**Existing Work CTA is not the intended final effect:** `work-nav.js` uses same-document View Transitions with `::view-transition-old/new(root)` and ~680 ms scale/fade. Founder recorded it as **too quick, without convincing forward travel**. This is an implemented experiment requiring replacement/review, not an approved visual result.

No evidence of production integration, browser/device certification, exact current coder tunnel state, or full final approval follows from those commits.

## 3. The Folding Project Dive (C + D) — selected *concept*, not implemented motion

The founder preferred two concept-art directions: **C — The Folding Website** and **D — The Project Dive**. Their **hybrid is the selected creative direction** for a prototype, but not an approved final animation, camera path, timing, or engineering method.

**One-sentence interaction:** *The opening folds to reveal the work inside; the camera advances into a recognizable portfolio preview that becomes Selected Work.*

### Intended visual events — one compact, uninterrupted interaction

1. **Intent:** user activates `Explore our work`. No forced progress through Screens 02–04 and no replay of the full scroll film.
2. **Fold:** a small number of cream, *site-derived* visual surfaces pivot out from the opening; avoid slicing readable words into strange ghosts. They expose the existing evergreen material and meaningful depth rather than a random science-fiction portal.
3. **Reveal:** a portfolio-facing editorial surface becomes visible behind the fold. For the proof, represent **actual** known Work identities and design geometry; do not invent client results, logos, screenshots or arbitrary buildings from the concept art.
4. **Dive:** the camera/preview approaches in a single centered axis. Near surfaces occlude/recede faster than the distant preview; real perspective and a nontransparent occlusion moment hide the navigation swap.
5. **Arrive:** transition visual matches the real `#work` target so there is no disconnected flash. Remove the visual layer. Immediately enable ordinary browsing, focus and native scrolling.

**Pacing hypothesis:** approximately **0.8–1.2 seconds** as a starting experiment, not a mandated duration or an additional waiting state. Test by appearance and responsiveness; cut or shorten stages when they introduce friction. The user already chose to view Work, so the effect must never obstruct that intention.

**No separate tunnel stop, loading screen, autoplay, long corridor, neon halo, particles or decorative WebGL just to manufacture a premium look.** Concept-art boards are visual explorations, not literal architecture/assets, copy, or a specification for a new portfolio design.

### Proposed implementation architecture — evidence-led, deliberately small

- Keep actual opening semantic HTML, `href="#work"`, native scroll journey `motion.js`, and original Work link functional. Do **not** physically split/duplicate live focusable DOM into interactive copies.
- Add one short-lived, noninteractive, `aria-hidden` overlay/stage to depict the folding planes, evergreen depth and Work preview; prefer 2–3 coherent surfaces over many loose cards.
- Prototype with `perspective`, `transform-origin`, `rotateY`, Z movement, `backface-visibility`, carefully bounded masks and shadows. Validate that parent `overflow`/flattening and compositing do not destroy 3D. CSS 3D + Web Animations API is a **candidate**, not an obligation.
- If CSS 3D cannot produce credible intermediate frames on representative devices, compare a *small* hybrid renderer while retaining semantic DOM. Do not migrate to WebGL/Three.js/Blender or pre-render a huge video by default.
- Position the actual `#work` target behind a completely occluding plane **only after** the transition is visually covering the old view. Resolve browser URL/hash/history deliberately, guard interruption/repeat clicks, and clean up on completion/error/navigation.
- Do not run the old root-snapshot fade alongside the new stage: it produced ghosting and undermines continuity. Either remove it for the new path or use it only as a verified fallback.
- In reduced-motion/no-JS/unsupported browsers, keep direct anchor navigation and correct focus; no theatrical delay.
- When migrating later to real `SelectedWork`, adapt the final preview geometry to that **actual component**, not to the temporary Gate 1b mirror.

**Decision priority:** believable, distinctive visual effect **and** effortless navigation **and** maintainability. A simpler fold/dive that passes those tests beats a fragile, more complicated scene.

### Prototype acceptance checklist (not yet passed)

- [ ] Before/after stills and key intermediate frames look physically continuous at 1440×900, 390×844, 320×568 and short desktop heights.
- [ ] Founder sees real browser **video** of click → fold → reveal → dive → arrival; title/CTA never ghost or fragment; no dark/blank flash.
- [ ] The perceived forward movement is convincing without excessive duration or visual noise.
- [ ] Actual `#work` is immediately interactive; real URL/history/back, keyboard, click modifiers, skip/Work link and direct contact continue working.
- [ ] Mobile is intentionally staged, not a squashed desktop fold; touch input, zoom/resize and orientation do not strand an overlay.
- [ ] Reduced-motion, unsupported animation APIs and no-JS continue to reach Work directly.
- [ ] No unrelated B/interior/C scroll-frame regression; original `motion.js` behavior remains deterministic and reversible.
- [ ] If performance/visual evidence is weak, simplify rather than claiming a finished `$50k`-quality transition.
- [ ] Static Gate 1b Work preview remains clearly labeled **integration pending**.

## 4. Delivery and approvals

**Before any CTA coding:** review the [30 October documentation audit](../DOCUMENTATION_AUDIT_2026-10-30.md), reread live branch/PR/tunnel status, preserve unpublished work, and inspect current `work-nav.js` + `styles.css` + `motion.js`. This brief was written **before** starting new CTA motion coding.

Do not start Gate 2 (fictional enquiry / AI), real Next.js integration, merge, `main` / `preview-*` push or deployment without separately explicit founder authorization. Founder acceptance of the palette/copy/creative hybrid is **not** final Screen 01 or Gate 1b approval.

**Next authorized work to discuss after this documentation audit:** an isolated Folding Project Dive visual proof on the existing Option D branch, with exact GitHub SHA and desktop/mobile footage. Coding that proof is a **separate next action**, not accomplished by this documentation update.

## 5. First Folding Project Dive implementation checkpoint — 30 October 2026

**Status:** **Coded for visual review; NOT founder accepted, NOT real-device QA verified, NOT deployed or merged.** This addendum is newer than the *pre-coding* baseline recorded above. Read the current GitHub HEAD before any further work.

**Implementation branch:** `feature/infinite-gate1b-opening-option-d-cream-2026-10-30`, first CTA implementation checkpoints `0223c2c` (new style layer), `34a546e` (navigation controller), and corrective handoff checkpoint `f474956` (exact Work scroll alignment). Intervening commits link stylesheet, remove obsolete View Transition animation and improve interruption handling.

**Files:**
- `public/flagship-journey/infinite-bc/work-dive.css` — temporary opaque evergreen perspective chamber, two hinged cream print planes, measured on-screen hero replicas, portfolio frame and direct arrival.
- `public/flagship-journey/infinite-bc/work-nav.js` — changed from 680 ms root snapshots to ~980 ms CSS 3D + Web Animations choreography. Real source `#work` DOM is cloned inertly for the preview; clean up on completion, navigation, interruption and errors. Preserve plain anchor fallbacks.
- `public/flagship-journey/infinite-bc/index.html` — load the dedicated stylesheet.
- `public/flagship-journey/infinite-bc/styles.css` — remove old root View Transition rules to prevent overlapping effects.
- **Not changed:** `public/flagship-journey/infinite-bc/motion.js` and `entrance.css`, the rest of the scroll story, production Next.js components and other routes.

**Checks run at this checkpoint:**
- V8 parse of current `work-nav.js` and `motion.js` **passed**.
- Stylesheets passed basic brace balance checks; new CSS link, `#work` source link and fallback paths present.
- Lightweight simulated DOM click executed the full navigation/controller cleanup path; reduced-motion, static mode, no-animation-API, and modified-click simulated fallbacks preserved the native anchor. These are **not** real-browser visual tests.
- GitHub source/readback comparisons verify old root-snapshot code is removed and existing scroll motion source remains unmodified.
- **Not yet run or verified:** served full-route desktop/mobile animation footage, visual frame review, actual browser back history, device responsiveness, actual GPU/compositor performance, assistive technology, and Next.js integration. Do not mark the checklist in section 3 passed without this evidence.

**Founder review target:** capture the complete ~980 ms click at normal speed and in slowed/intermediate frames on 1440×900, 390×844 and 320×568, plus reduced motion and browser back/forward. Look particularly at live-hero-to-door visual alignment, physical depth while doors fold, whether the preview is visually legible before arrival, and the final no-flash handoff. Revise **this prototype only** until approved. No Gate 2 / merge / deployment.
