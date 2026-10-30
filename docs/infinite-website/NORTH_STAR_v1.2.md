# GENEZISI — THE INFINITE WEBSITE
## Complete Creative North Star, Spatial Experience Specification & Code-Ready Implementation Contract

**Version:** 1.2 — consolidated creative and engineering North Star  
**Date:** 29 October 2026  
**Project:** Genezisi (`genezisi.com`)  
**Repository:** [`socraticblock/Agency`](https://github.com/socraticblock/Agency)  
**Status:** **Founder-selected B → C full journey and narrative direction; final design, Gate 1b visual acceptance, application integration, production readiness and deployment NOT approved.**  
**Audience:** Founder, creative director, designer, motion engineer, front-end engineer, AI coding agents and reviewers.  
**Purpose:** Authoritative product, visual, content, state, integration and acceptance contract. Supersedes v1.1 for subsequent work; retains the original v1.1 file as an archival snapshot, not a competing instruction. The companion [Full B → C Visitor Flow v1.2](./VISITOR_FLOW_v1.2.md) expands each scene. This document controls if there is a conflict.

**30 October later Screen 01 creative-direction clarification (no new North Star version):** After founder review of the first real clicked CTA recordings **and an initial generic five-frame storyboard**, the symmetrical cream doors / green framed tunnel were **rejected visually**. The current **lead proposal**, [The Living Page](./SCREEN_01_LIVING_PAGE_CREATIVE_DIRECTION_2026-10-30.md), reimagines the same useful `Explore our work` shortcut as **the existing cream editorial surface transforming asymmetrically into spatial architecture**, revealing the unchanged Work destination and moving through it along one coherent camera/geometry model. **This is a creative treatment, not an accepted storyboard, animatic, coded effect or release.** The AI design collaborator takes **creative-director and motion-director responsibilities** for proposing one coherent shot, directing perceived editorial/architectural/temporal scale and material/lighting, predicting second-order failures, producing high-fidelity desktop/portrait storyboards and an animatic, and critically recommending rejection of substandard results. The **founder retains final creative authorization**. Apply [Screen 01 Cinematic Blueprint](./SCREEN_01_CINEMATIC_BLUEPRINT_2026-10-30.md) and [motion review skill](../../skills/infinite-website-motion-review/SKILL.md) D0–D5 before another full CTA rewrite. **No Work redesign, Screen 02–04 change, Gate 2, preview/production merge or deployment** is authorized. The older dated paragraphs below remain historical implementation and decision records, not approval of the former door aesthetic.

**30 October founder-decision update (not a new North Star version):** Gate 1b is now being refined as **four sequential visual compositions** (centered opening; green B; site-derived interior/third reading plane; centered C), each reviewed and provisionally frozen before one overall end-to-end Gate 1b visual decision. The founder selected **Option D** for the **opening only**, using warm cream `#E6DED2`, evergreen `#173327`, supporting copy/label below, and approved the direction of a short, sophisticated **Folding Project Dive** from `Explore our work` to `#work`. The hybrid (fold → preview → forward dive → genuine Work) is a **selected prototype concept, not approved implementation**; its prior 680 ms fade/scale attempt is not satisfactory. The aspirational "world-class / $50,000-quality" benchmark is **craft language, not an actual budget or sales claim**. Existing scrolling motion is the working foundation, not final founder acceptance. Current detailed status/acceptance contract: [Gate 1 visual foundation — 30 October](./GATE_1_VISUAL_FOUNDATION_2026-10-30.md); audit: [30 October reconciliation](../DOCUMENTATION_AUDIT_2026-10-30.md). This update supersedes older *first-screen copy/color* candidates only; Gate 2, real app integration and release remain unauthorised.

**30 October CTA code checkpoint (after the initial concept selection):** The Option D branch now contains a *first implementation* of the Folding Project Dive via `work-dive.css`, `work-nav.js`, and the existing Work preview clone. The old root-snapshot fade was removed. This is **code completed for visual review only**: no served browser/device QA, founder visual acceptance, real React integration, release or deployment is implied. [Current Gate 1 brief](./GATE_1_VISUAL_FOUNDATION_2026-10-30.md) records the checkpoint.

**29 October implementation checkpoint (not a new design version):** Gate 1b's centered B push, solid B, B-derived 2.5D architectural chamber, complete third reading plane, short stationary scroll holds and early unclipped C headline were coded in the **isolated, still-draft PR #15**, with last reviewed application-code checkpoint `508db9001ed49532509ce79000b18b78e2d59ff6`. Later commits may update documentation; always inspect the latest PR head and coder's serving worktree. **No founder acceptance of the final served route, Gate 2 narrative, real Next.js Selected Work integration, merge, production release or deployment is implied.** Read [current handoff](./HANDOFF_2026-10-29.md) and [lessons](./LESSONS_2026-10-29.md) for operational status. The North Star below remains the controlling *destination*; this note describes partial implementation only.

> **The North Star**  
> **Make sophisticated technology feel simple, useful and extraordinary.** The visitor meets a beautiful **centered** Genezisi opening: “Your website is only the beginning.” With native scroll, the site-derived **B / Interface Strata** arrives from the right, visibly making room and pushing the introduction left. Its complete readable composition settles before the viewport advances **forward through the website's own architectural geometry**. Inside one coherent, readable, reactive space, the visitor sees how a thoughtfully **designed process**, ordinary automation, connected business systems and appropriate AI can help a fictional enquiry reach an **unsent draft requiring human review**; other processes can run automatically when suitable and authorized. Continuing **forward**, the architecture resolves into a distinct **centered C / Typographic Architecture** statement, “Made to be seen. Built to work.” The page then releases to the *genuine* Selected Work section and normal commercial website. Reverse scrolling retraces the deterministic sequence; this is not replaying the opening or entering a separate site.

**Decision shorthand:** *Centered clarity → B pushes into view → complete B → website-derived spatial journey → designed system at work → forward C reveal → authentic work.*

> **Entrance clarification — founder decision, 29 October 2026 (11:01 UTC):** The earlier **two-column, headline-left + interface-right final B pose is superseded**. The opening headline, body and CTA begin centered. As the opaque green Interface B enters from the right, the **entire introduction must be pushed fully out of the desktop viewport**, not merely into a left column; on mobile it exits upward. The **single prominent, centrally settled Interface B** is enlarged on large screens, solid/high-contrast and completely legible, with a scroll-controlled stable reading interval before any deeper fade/transition. The persistent navigation continues to offer Work, Services and Contact; offscreen intro CTAs must not be keyboard focus targets. This clarification governs any older references below to a "two-part" or "left-column" finished B. **Gate 1b's isolated B → C prototype is now in implementation/review (PR #15); the full served result and subsequent narrative remain unapproved.**

**Version rule:** This file contains the agreed *destination* and contracts, **not authorization to implement every gate**. The flow storyboard includes proposed copy/visual detail that is subject to founder review; it does not authorize Gate 2 or a production merge.

---

# READ THIS FIRST — EXECUTION AUTHORITY AND SCOPE (v1.2)

## A. Scope and current position

**Build incrementally inside `socraticblock/Agency`, preserving the genuine website.** The founder selected **B → C** and subsequently refined the opening to **centered introduction → right-hand interface pushes introduction left → complete B**. The long interior narrative is approved as a planning direction; its exact detailed presentation remains subject to later gate review.

- **Gate 0:** historical GitHub source inspected; the developer integrating with any newer unpublished/local worktree **must recheck and preserve that tree** before editing.
- **Gate 1a:** A/B/C static opening studies produced; B selected for entry, C selected for ending. Do not repeat the selection exercise as an unnecessary blocker.
- **Gate 1b:** the original opt-in proof on PR #11 is historical. Current **draft PR #15** contains a revised centered push, fully visible opaque B, site-derived architectural chamber, complete third reading plane, shortened forced scroll dwell and early C headline reveal. **Implemented in isolated source is not founder visual acceptance of the full served result.** The detailed interior business story, actual Next.js homepage/Selected Work integration and production release remain pending. Work **only within Gate 1b** until founder visual approval.
- **Gates 2–5:** full narrative, genuine app integration, complete polish and production decision require separate authorization / checkpoints. No `main`, `preview-*`, production merge or deployment is implicitly authorized by a documentation update.

The work is not a standalone marketing microsite, a canned video, a real client inbox, a real calendar/CRM connector, a chatbot, or a gratuitous 3D world.

## B. Evidence is not acceptance

Distinguish **implemented**, **tested in a named browser/device**, **founder visually accepted**, **integrated into actual locale routes**, and **production approved**. These are different states. Capture current screenshots/videos and list unverified platforms honestly; an isolated mock `#work` is **not** the real `SelectedWork` React component.

## C. Decision types

| Type | Meaning | Rule |
|---|---|---|
| **LOCKED** | Founder-directed concept, truthful business offer, narrative continuity, native scroll, centered B → C trajectory | Preserve and implement; change only with explicit founder direction |
| **WORKING COPY / VISUAL HYPOTHESIS** | Exact scene lines, lighting, geometry, hold lengths, camera math, responsive motion | Test, polish and obtain visual acceptance; no implied freeze |
| **PRESERVE / VERIFY** | Repo state, authentic work, routes, localization, contact destinations and external claims | Recheck current files and served page; never invent values |
| **FOUNDER GATE** | Gate 1b spatial quality and the later full narrative/release acceptance | Present meaningful evidence and recommendation; do not assume approval |

Priority when rules conflict: **source integrity and truthfulness → locked visitor experience/accessibility → commercial usability → robust native-scroll behavior → tested visual craft → optional effects.** The older prohibition on WebGL is not decisive; the smallest convincing and stable rendering method wins.

## D. Immediate delivery boundary

**Next coding increment = polish Gate 1b, not implement Gate 2.** Complete the centered-to-B push (desktop and vertical mobile), hold the full B design without premature fade, demonstrate physically coherent forward depth using B's own planes, replace prolonged empty interior staging with a clearly legible compact neutral placeholder, and produce a distinct forward-going fold into centered C followed by a convincing seam to Work. Test intermediate frames, reverse/jumps, responsive/fallback states, and exact links. Only claim authentic `SelectedWork` integration after it is actually wired in the real app. Report remaining blockers and request a visual decision; keep work on recoverable draft feature branches.

---

# PART I — WHAT IS DECIDED

## 1. The project in one minute

Genezisi is an independent digital solutions studio. The commercial offer has three **independently commissionable** disciplines:

1. **Websites & digital experiences.** Sophisticated website design and development, responsive experiences, web applications, interface design, usability and front-end engineering.
2. **Automation & integrations.** Dependable workflows, validated information, connections between business tools, and removal of repetitive manual work. Deterministic operations should remain deterministic; not every task needs AI.
3. **AI systems & engineering.** Custom AI functionality, assistants/agents, context-aware systems, and **agentic integrations** that use authorized tools to accomplish useful work with appropriate human oversight.

The site must rapidly answer: **What does Genezisi build? Why does it matter for my business? Can I trust the work? How do I get in touch?**

The hero is a demonstration of design quality **and** a plain-language illustration of the services. It is **not** an interactive game, a futuristic operating system, an exhaustive technical tutorial, a portfolio replacement, or proof that live external systems have been connected.

Our visitor-centered framing is: **“Imagine what Genezisi could build for your business.”** A generic services enquiry makes that visualization transferable to many customer-facing businesses, instead of limiting it to agencies. The visitor watches an **illustrative example**; we never suggest that a real prospect's message or calendar is being accessed.

## 2. Locked creative selection: centered B → C

**Selected composition:** a **centered typographic first impression** leads into **Direction B / Interface Strata** as the right-hand interface physically enters and pushes the original content left. Full B must resolve and become fully legible before entry. The camera then moves **forward into the website itself**, not toward a framed miniature page or fictional portal.

**Narrative center:** stable, near-center readable live DOM content inside a spatial digital environment derived from the actual website layout. The journey shows a **pre-designed workflow** before its execution: one fictional enquiry → rule-based validation/save → connected system handoff → AI meaning extraction → permitted illustrative availability check → unsent reply → **optional automatic actions or human approval according to risk and policy**. In this example, the response always awaits review.

**Ending:** the architecture continues moving **forward** into **Direction C / Typographic Architecture**. The centered C statement reads **“Made to be seen. Built to work.”** C is a different composition of the **same Genezisi design system** and is the entrance to real normal-flow Selected Work—not another site, a replay of the opening, an isolated end card or a second mandatory page.

**Experience rule:** the motion should embody **center → left → depth → center**, or *simplicity → discovery → simplicity*. It remains controlled by native scroll, immediately reversible, skippable, commercially usable, accessible and usable without WebGL. Desktop and mobile are distinctly authored. This is a concept choice, **not a claim that the updated animation or its production implementation has passed visual review.**

## 3. Priority hierarchy — use to resolve every disagreement

1. **Understanding:** A nontechnical visitor can follow the action without effort.
2. **Business credibility:** The first screen proves we understand sophisticated website design and makes our three services clear.
3. **Narrative continuity:** One enquiry, one consistent cause-and-effect story, one visual world.
4. **Stable attention:** Important information remains central, prominent and comfortably readable.
5. **Direct control:** Native scroll, reverse, skip, navigation, accessibility, no forced waiting.
6. **Visual excellence:** Original editorial composition, spatial depth, carefully authored lighting and motion.
7. **Technical excellence:** Robust, responsive, efficient, maintainable rendering.
8. **Decorative ambition:** Optional and removable. It never overrides 1–7.

When a design choice looks spectacular but causes the visitor to search, read small text, wait, or misunderstand whether an action was real, **reject or simplify it**.

## 4. The one-sentence acceptance test

> **“I can immediately understand and contact Genezisi. The centered opening transforms into B, I genuinely enter the website and follow a well-designed process across ordinary automation, connected systems and useful AI. The world then folds forward into centered C, and I continue directly into the authentic work—without losing control of the page.”**

---

# PART II — VISITOR, MESSAGE, AND CONTENT

## 5. Audience and desired visitor thought

Primary visitor: a business owner, founder, operator or decision-maker considering a website, automation, an integration, an AI assistant or a bespoke digital system. They may be highly technical, or not technical at all.

The intended emotional progression is:

- **Centered arrival:** “The studio has excellent visual taste, and I understand what it builds.”
- **B push / full composition:** “The website itself is responding to me.”
- **Forward spatial entry:** “I am travelling inside the structures of this actual webpage.”
- **Designed process:** “There is thoughtful engineering behind how this works.”
- **Enquiry / automation:** “A routine request can be checked and saved without manual repetition.”
- **Connected tools / AI:** “The right systems work together, and an AI assistant can understand where that helps.”
- **Control:** “Important actions can wait for my decision; appropriate routine work can happen automatically.”
- **Centered C:** “The experience has resolved beautifully, and the statement now means something.”
- **Actual work:** “Show me what they have actually built, what I can commission, and how to get in touch.”

The visitor need not remember any implementation term. What remains should be the **capability and its business value**.

## 6. Brand positioning and the essential distinction

**Retained hero headline (locked working copy):**

> **Your website is only the beginning.**

**Selected Screen 01 supporting copy (founder reviewed 30 October; localization still requires a dedicated pass):**

> We build websites, create AI systems, and automate everyday tasks. You can choose one service or combine them.

**Eyebrow:** `DIGITAL SOLUTIONS STUDIO`. **Selected Screen 01 palette:** cream `#E6DED2`, primary evergreen `#173327`, body `#586A5B`, sage metadata `#6D816E`, secondary CTA border `#A3B29F`. These values are **not automatically approved for the later green/interior/C surfaces**.

This explicitly prevents the false impression that AI/automation are add-ons available only with a website. Alternatives may be tested for rhythm, but must preserve that distinction and the broad engineering offer.

**Opening actions:** **Explore our work** (direct route to real proof) and **Start a project** (direct contact). Services must also remain apparent through the page/navigation. Do not make the animated story the only way to discover what we do.

**Possible return line (not mandatory):** “Beautiful outside. Useful inside.” One closing thought is enough; avoid stacking slogans.

### The demo is a representative example, not our entire market

A universal services-enquiry-to-reply story is chosen because it is recognizable across many kinds of service businesses and supports visible cause and effect. It is **not a limitation** on Genezisi's actual capabilities. Elsewhere on the website, the three services must encompass sophisticated websites, applications, APIs, automation of existing business tools, custom AI engineering, knowledge/context systems and authorized agentic integrations.

A visitor must be able to commission **automation without a website**, or an **AI system without rebuilding their site**.

## 7. Plain-language writing doctrine — nonnegotiable

The central experience is **human-first**. Use everyday language, short sentences, familiar nouns and visible actions. The visitor should not be required to translate business or engineering jargon.

| Do **not** use in the central journey | Prefer |
|---|---|
| CRM record created | Your request is saved |
| Structured data extracted | The details are organized |
| Intent classification complete | Your assistant understands the request |
| API endpoint called | The assistant checks permitted availability |
| Calendar tool invocation | Checking example business availability |
| Agentic workflow executed | Your assistant found two options |
| Human-in-the-loop validation | Ready for your review |
| Orchestrator, webhook, LLM, vector database | Describe the **useful action**, not the mechanism |
| Workflow completed successfully | Your reply is ready |
| Approval event emitted | You decide what happens next |

**Important distinction:** Jargon may appear in deeper technical portfolio material where the audience expects it. It must not be required to understand the hero.

**Copy shape per state:** ideally one short heading, one concise message or result, and at most one short supporting line. No tiny clusters of metadata, no wall of body text, no jargon-laden pills. If a state needs a paragraph to explain, its visual design is not doing enough work.

The **subject** of sentences should be human: “Your request,” “Your assistant,” “Your reply,” “Your team.” Do not anthropomorphize the system into an unaccountable autonomous employee; explain its scope and human control where relevant.

## 8. Canonical fictional example and data continuity

A single example must survive the entire sequence without substitutions:

> **“Hi, I'd like to learn more about your services. Could we talk next week? Afternoons work best.”**

**Fictional inputs / invariants:**

- Type of inbound item: general services enquiry (not an enquiry about Genezisi building a website).
- Source: an illustrative visitor's business website, *not* a real inbound lead to Genezisi.
- Topic: learning about a business's services; this is illustrative of a recipient business, not a real Genezisi prospect.
- Timing: next week.
- Preference: afternoons.
- Available times returned by a simulated permitted calendar check: **Tuesday, 2:00 PM** and **Thursday, 3:00 PM**. These are **example times, not live availability**.
- Suggested answer: **“Would Tuesday at 2:00 PM or Thursday at 3:00 PM suit you?”**
- Final state: **prepared for a person's review; not sent or booked**.

If the language, preferred time or available options change in any creative revision, update **every downstream visual and sentence** together. Do not introduce contradictory dates, days, preferences, send confirmations or appointment-booked claims.

### Honest service boundaries

- **Rule-based automation** can validate that the enquiry has required fields, capture the original text, save the request and prepare a team notification. This does **not** require an AI model.
- **The AI assistant** interprets the natural-language timing and preference, then accesses a **permitted read-only** availability source in the illustration and prepares a reply.
- **The person** reviews and decides whether to use it. Scrolling is **not** human approval. No real email, calendar event, CRM write or outbound action occurs.

**Persistent subtle disclosure:** “Illustrative example — no live actions.” Put it in accessible accompanying text and in a visually restrained place in the demo. It must be truthful, without feeling like a debug warning.

---

# PART II-A — APPROVED OPENING AND COMMERCIAL ACCEPTANCE (v1.2)

## 8A. Direction-study history and selected combination

**Completed Gate 1a:** Three different desktop/portrait-mobile static explorations were produced: A / Editorial Aperture, B / Interface Strata, C / Typographic Architecture. The founder selected **B for the entry** and **C for the resolution**, then refined B's choreography: the centered headline is *pushed completely out of view* as the right interface moves inward and becomes the sole, large centered B keyframe.

Do not continue comparing A/B/C as competing whole-page opening directions. A's editorial restraint is a useful quality benchmark; B's edges/columns supply the geometry; C's type/grid supplies the finale. As of **29 October**, the founder had **not** approved final color values, motion execution or application integration. On **30 October**, Option D's exact **Screen 01** colors and simpler copy were selected; the overall animation, later screens and genuine application integration remain pending. The three studies and historical selected B art remain valuable comparison artifacts.

**Gate 1b must add:** coherent movement into fully visible B, a readable stable full-B state, side-surface depth with opacity/occlusion, meaningful (not empty) interior staging, and a distinct spatial fold toward centered C. Keep the transformation anchored to real site geometry. Mobile uses a coordinated *vertical* rearrangement rather than a squeezed desktop side-to-side push.

## 8B. The website is a commercial site first

At first paint **before any scrolling**, show genuine Genezisi identity, the exact headline **“Your website is only the beginning.”**, a concise, honest proposition for **three independently commissionable disciplines**, and working **Explore our work** and **Start a project** paths. Services/navigation must be discoverable; no user has to complete the journey to access real Work or Contact. The right-hand panel may be absent initially **without hiding any essential offer or navigation**. The first frame must feel like a complete, exceptional studio website—not an unfinished prelude.

**Five-second test:** “What can this studio build for me, and how do I contact it?” The answer must not depend on having viewed the B interface or Act II story.

**Post-journey test:** “What happened to the enquiry? Which parts were routine automation, connected-system engineering and AI? What requires human review? Could I commission any one of those services independently?” A visitor should explain the value without jargon or a narrated tutorial.

Business clarity always outranks cinematic spectacle. The existing real Work/Services/Contact links and actual destinations are mandatory throughout.

## 8C. Opening visual-quality vetoes

Reject any candidate whose main differentiator is: excessive glow; an invented fake client dashboard; a stone arch; a neon tunnel; dense technical UI; a giant generic AI glyph; a tiny Genezisi site presented inside a frame; required WebGL for first content; or unreadable mobile type. Do not create an opening only to serve as an animation screenshot. The opening must be the website in its own right.

---

# PART III — THE CINEMATIC EXPERIENCE

## 9. Full flow: three acts, 18 meaningful moments—not 18 screens

The complete companion [Visitor Flow v1.2](./VISITOR_FLOW_v1.2.md) gives each moment's proposed copy and visual treatment. The list below is the canonical **sequence**, not a requirement for eighteen full-viewport holds. Several moments should share one continuous environment; some are short transitions. The visitor must understand one cause-and-effect story, not read a slideshow.

| Moment | Visitor sees / central idea | What the environment does | What this proves |
|---|---|---|---|
| **00 — Centered opening** | “Your website is only the beginning.” | Complete balanced first frame, real links | Beautiful, usable websites |
| **01 — Interface arrives** | Intro moves to left, B enters from right | Coordinated responsive physical push; vertical on mobile | The interface itself can transform |
| **02 — B settles** | Fully readable Websites / Automation / AI systems interface | No early fade or overlapping labels | Three disciplines, separate or together |
| **03 — Enter** | Site becomes spatial | Real page-derived planes, perspective, occlusion | Depth behind the surface |
| **04 — System designed** | “First, we design how it should work.” | A planned route and defined roles are revealed *before* execution | Workflow design / solution architecture |
| **05 — Enquiry arrives** | One canonical fictional enquiry | Original message takes central position | A recognizable business need |
| **06 — Automation saves** | “Your request is saved.” | Required fields checked; destination changes *after* arrival | Deterministic automation, not AI |
| **07 — Systems connect** | “Your tools work together.” | One path connects receiving, team tools and availability source | Integration and system engineering |
| **08 — AI understands** | **“Your AI assistant understands.”** | The original “next week” / “afternoons” text is recognized | Interpretation, not simple data transfer |
| **09 — Availability** | “Finding suitable times.” | Permitted illustrative read-only calendar route returns two example options | Authorized tool use |
| **10 — Draft** | “Your reply is ready.” | Returned options assemble into one proposed response | A useful result |
| **11 — Control** | “Automated when it makes sense. Approved when it matters.” | Brief automatic vs approval branch, this draft awaits approval | Appropriate human gates, not mandatory manual steps everywhere |
| **12 — Forward fold** | World resolves toward C | Reply surface/route/frames become C page grid | Spatial causality and forward continuity |
| **13 — Centered C** | **“Made to be seen. Built to work.”** | Stable distinct centered finale | Clarity after complexity |
| **14 — Selected Work** | Genuine portfolio | Native sticky release directly to actual `SelectedWork` | Real proof, no fake projects |
| **15 — Services** | Independently purchasable offerings | Normal document scroll | Clear scope and business choice |
| **16 — Working approach** | Understand → Design → Build/connect → Test safeguards → Improve | Concise normal-site content; avoid second film | Thoughtful end-to-end solution design |
| **17 — Studio/contact** | Real studio identity and simple invitation | Functional existing verified contact/footer | Straightforward conversion |

### Narrative logic and honesty

The underlying route is designed **before** the fictional request travels through it; automation validates and saves **without AI**; system integrations move data between authorized destinations; AI interprets timing words, checks **illustrative permitted** availability and drafts; a person determines whether this particular reply is sent. Other commissioned tasks may be fully automated if appropriate, authorized and safe. Do **not** imply Genezisi offers only AI agent integrations or that any workflow requires buying a website.

Keep the same original fictional enquiry, same Tuesday/Thursday example times and same unsent reply from §8 throughout. An implementation must be **visually deterministic**: a destination only changes state when the item arrives; preferences highlight in the original message; the example options return and become the actual draft. Nothing actually sends, books, contacts, collects or changes external state.

### Pacing and reading doctrine

Every meaningful interval must **communicate, reveal or meaningfully move**. The complete B interface must settle visibly before it becomes architecture. The interior must have real near/far depth, recognizable structural edges and causal light/reactions, not an empty gradient corridor. The central stage is a member of that architecture—not an unrelated white popup. Give concise text time to be read in *scroll distance*, without any forced timer or long dead zone. Avoid overlapping opacity layers with duplicate unreadable typography. Visitors may stop, reverse, skip, accelerate or access Work without completing the film.

## 10. Proposed copy and staging decisions

- Opening headline and C headline are **locked**: **“Your website is only the beginning.”** and **“Made to be seen. Built to work.”**
- Centered first-frame supporting line (working): “We build distinctive websites, dependable workflows and practical AI systems. Each works on its own—or together.”
- System-design moment (working): **“First, we design how it should work.”** / “Clear steps. Connected tools. Checks where they matter.”
- Enquiry/automation/integration/AI/availability/draft moment lines are in the table above and Appendix A; detailed treatment is in the companion storyboard.
- Human-control line (working but preferred): **“Automated when it makes sense. Approved when it matters.”** / “Routine steps can run automatically. Important actions can wait for you.”
- Final exact factual status: **“Your reply is ready for review.”** / “You decide what happens next.” **Not sent, booked, approved or live.**
- The demo disclosure “Illustrative example — no live actions.” remains visible in an unobtrusive and accessible form.
- Exact secondary lines, copy length, animation curves, panel design and localizations remain subject to staged visual, editorial and accessibility review. Avoid hero-facing “CRM”, “API”, “LLM”, “orchestration”, “human gates”, “solution architecture” and “foolproof” where simple words convey the idea. Technical depth belongs lower on the site.

---

# PART III-A — GEOMETRY, CONTINUITY AND TWO DIRECTIONS OF TRAVEL (v1.2)

## 10A. Mandatory identity/geometry map: center → B → world → C

Maintain **stable visual identities** across transforms. A new image can't appear unrelated to what precedes it; a fade cannot stand in for physical continuity. The following maps the required key roles; refine exact transforms from rendered browser evidence.

| Stable identity | Centered first frame | Complete B | Forward interior | Forward fold and C | Nonnegotiable invariant |
|---|---|---|---|---|---|
| **CenteredIntro** | Hero headline, body and real CTA centered | Coordinated push moves intro fully offscreen | Intro's page alignment supplies left-side architectural origin; semantic text hidden appropriately when out of view | Its typography/grid ancestry belongs to the same design system, but the opening headline is **not** replayed | No jump, unreadable overlap or premature fade; real CTA still reachable elsewhere |
| **IncomingInterfaceB** | Offscreen/not visually present; essential business offer already in hero | From right to full readable services structure | Right-side grids and edges gain perspective and solidity | Its divisions become C's architectural grid | Entire B must be seen before entry and must never resemble a fake external client app |
| **PageFrame / FrameLines** | Genuine Genezisi page spacing/borders | Paired editorial geometry | Structural near/far surfaces and vanishing point | Lines flatten/align with the C typographic grid | Traceability across all frames; no portal or separate microsite |
| **LeftPlane / RightPlane** | Originating intro/interface boundaries | Identifiable real site structure | Relative parallax, correct occlusion and material opacity | Fold/recede into C page/grid | No two translucent flat poster layers pretending to be depth |
| **ContentStage** | Accessible semantic intro | Readable completed interface | Stable readable DOM message space *architecturally integrated*, one idea at a time | Final review surface becomes material for C transition | No unrelated floating white modal, no stack of conflicting texts |
| **SystemRoute** | Not needed | Implicit in visual structure | Deliberately established process path that carries one enquiry | Route resolves to C grid | Events occur after their causes; not decorative random activity |
| **SurfaceMaterial** | Warm paper / forest | Same brand palette | Authored material solidity and restrained lighting | Dark C typography, same family | Coherent brand identity; no generic sci-fi mode |
| **SiteNavigation** | Real clickable links/contact | Real and accessible | Functional through traversal, decorative duplicates inert | Functional C and onward | Links are not inaccessible scene textures |
| **WorkSeam** | Real #work target exists | Same | Must not show made-up client evidence | C releases to genuine `SelectedWork` DOM | A static prototype mock is NOT full integration |

### The geometry-map deliverable must answer explicitly

1. What exact element/plane is the **entry destination** and why does it belong to the website rather than a separate portal?
2. What becomes the left, right, floor/ceiling (if any), and vanishing-point geometry when the viewpoint advances?
3. Which surfaces are real interactive DOM; which are noninteractive 3D or decorative replicas; how are duplicate accessible names avoided?
4. For each named element, how do its transform, material and visibility behave at **entry start, 25%, 50%, 75%, interior hold, fold start, fold mid, fold end**?
5. What actually physically folds back—surface rotation, depth movement, plane alignment, clipping/masking, or a controlled combination—and how does the last central content participate?
6. Which on-screen portions must stay crisp and immediately usable if scripting/3D fails?
7. How is the same object mapping adapted for portrait mobile without reducing necessary text size?
8. How are the real webpage and the simulated geometry aligned at the final seam, without a visible cut?

The mapping is a **design specification**, not a requirement for literal physics simulation. Authoring a convincing constrained 2.5D illusion is acceptable. A physically complete 3D world is unnecessary.

## 10B. Seven keyframes and a continuous path

- **K0 — Centered beginning.** Complete standalone, meaningful, actionable commercial opening; no B card visible yet. Strong in no-JS/reduced-motion states.
- **K1 — Coordinated B push.** Interface enters right; intro physically moves left. Mobile moves intro upward and brings the interface into the free central area.
- **K2 — Fully composed B.** The entire service interface is present and readable, with no concurrent deconstruction or early opacity fade.
- **K3 — Forward website entry.** Page-derived planes gain real side depth, relative speed and occlusion. No flat hero screenshot zoom.
- **K4 — Intentional interior.** Architecturally meaningful depth with readable neutral **Gate 1b placeholder**. Gate 2 later replaces it with the designed-system/enquiry/automation/AI/control story.
- **K5 — Distinct forward fold into C.** Continuing forward, live surfaces and page lines align to C's grid and typography; **not** entry played backward.
- **K6 — Centered C and authentic Work release.** “Made to be seen. Built to work.” is centered and clearly settled; sticky narrative ends and genuine `SelectedWork` immediately follows on next normal scroll.

**Forward sequence:** `K0 → K1 → K2 → K3 → K4 → K5 → K6 → real #work`. Reversing page scroll traverses the *same deterministic state function* in reverse. The forward K5 reassembly must remain a distinct authored event.

## 10C. Camera and transition contracts

- Use one coherent perspective and vanishing point. Primarily advance Z; small optical corrections are allowed, but avoid spinning, orbiting, roll and dramatic yaw/pitch.
- Depth must be perceptible through **relative** movement and occlusion: near layout planes pass faster/larger than far planes. Uniform scaling of one screenshot fails this contract.
- All transforms derive from deterministic progress (plus responsive viewport parameters), not frame-order callbacks or independently advancing timelines.
- Compose the central reading plane near the usable viewport's optical center through the meaningful interior beats; keep readable HTML or an equivalent accessible layer, never a blur-prone image texture.
- A paused frame is legitimate at any fractional progress. No temporal animation may keep the visitor waiting for a scene to finish.
- The final fold visually reassembles recognizable **site geometry** but hands off to the original DOM page; no user should have to wonder whether a second homepage has started.
- At resize mid-journey, recompute projection/layout without losing the semantic progress state or leaving clipped/stranded planes.

## 10D. What the current Gate 1b should implement, precisely

Only the centered opening, B push and full settle, actual site-derived geometry and forward entry, compact neutral readable interior, distinct forward fold into centered C, authentic Work seam where feasible, and fallback/mobile/navigation correctness. **No** fictional enquiry, AI or calendar story until Gate 2 is separately authorized. The existing opt-in Gate 1b static proof is a useful starting point, **not approved final implementation**. Founder review has already identified premature fade, overlong empty interior and an introduction that should begin centered. Work directly on these defects; do not expand the feature list to mask them. Produce real browser footage at the agreed viewports, documenting source/capture limitations.

---

# PART IV — SPATIAL AND VISUAL GRAMMAR

## 11. The central camera axis: the defining interaction constraint

The user explicitly wants the focal content almost at the same visual level throughout—**a teleprompter-like experience with depth**. Interpret this as a **stable attention zone**, not a requirement that every object be mechanically fixed to exactly one pixel.

### Functional reading zone

- Keep core message, its primary result and the next meaningful action in the **central region**, around the same vertical eye level.
- On desktop, the **first opening is centered**; the incoming B interface deliberately pushes the introduction left. The moving composition later converges toward the **same comfortable central reading axis** for the interior.
- On mobile, align the central stage to the **usable visible viewport**, accounting for browser chrome, safe areas and short-height constraints; a fixed geometric center that is obscured by controls or browser UI is a failure.
- Prefer a single centered, high-contrast primary surface. Side surfaces create depth but are never required reading material.
- Critical copy must not fly from the far left to far right on every stage, nor alternate across the screen.
- The viewer may notice surrounding craft, but should be able to follow **100% of the story while looking only at the center**.

### Suggested optical rules (hypotheses; validate)

- One dominant central plane at a time.
- Small, intentional vertical shifts are acceptable for hierarchy; frequent large eye-travel is not.
- A camera trajectory primarily along the **forward Z axis**; minimal yaw/pitch, no unnecessary roll, spinning or orbiting.
- A consistent vanishing point and carefully matched perspective through transitions.
- Layering/occlusion, changing relative scale and parallax should be driven by scene depth.
- Important content should settle before any next major motion event.

## 12. The living digital environment

Think of three legibility layers:

| Layer | Responsibility | Allowed detail | Failure mode |
|---|---|---|---|
| **Foreground / center** | The one idea to understand now | Crisp text, one action, short result | Too small, crowded, shifting sideways |
| **Midground / active system** | Visible causal response | Receiving interface, active calendar, a short transfer | Elaborate effect with no corresponding result |
| **Background / architecture** | Scale, movement, atmosphere, identity | Large glass/interface planes, subtle light, depth | Neon spectacle, noisy data walls, resort visuals |

**Visual causality rule:** every major environment reaction must correspond to the state of the story: receipt activates a source, saving changes a destination, a calendar responds to a request, returned times inform a draft, review quiets the environment. Do not animate random systems continuously just to fill the background.

### Geometry and material language

- Digital architecture originates from **real browser/interface surfaces**: panels, edges, editorial framing, page layers, meaningful translucent surfaces.
- A short corridor/chamber can be architecturally simple: a few deliberately positioned side planes, repeated frames and one centered focal surface. The environment may **feel** much larger than its actual asset count.
- Keep the palette rooted in dark evergreen/charcoal, warm ivory and restrained sage, with subtle warm highlight/light at critical spatial moments. These are visual directions, not approved production hex values.
- Use beautiful editorial typography with clear optical hierarchy; never encode core words as generated-image text.
- Avoid visual clichés: stone gates, plant-filled resort environments, arbitrary orbital particles, generic neural networks, random code rain, glowing dashboards on every wall, aggressive volumetrics or overdone reflections.
- Make each keyframe visually strong **when paused**; smooth animation cannot rescue poor composition.

### Concept-art interpretation

The attached 12-frame sheet is a reference for **journey, atmosphere and scale**, not a literal implementation checklist or set of reusable 3D assets. Preserve its strongest ideas—entering the interface, structured enquiry, impossible-looking depth, visible system connections, and return—while actively removing inaccurate text, excessive peripheral panels and resort/stone-arch drift.

A still image contains only one viewpoint. It cannot reveal arbitrary unseen sides or guarantee physically consistent camera movement. Those relationships need **authored geometry** or a deliberately constrained compositing illusion.

## 13. Cards: one stage, evolving information

Cards are useful as **temporary carriers of meaning**, not the whole visual language. They should feel like reachable architectural surfaces; the current floating white modal treatment is a review concern, not an approved aesthetic. The design must never show a large card already containing every step or a crowded grid of all stages.

**Preferred transformations:**

1. Message appears in the center.
2. Its content visibly passes into a receiving place and is saved.
3. The original timing words are emphasized as the AI interprets them.
4. A calendar surface responds; times move into the center.
5. The times assemble into a proposed reply.
6. The resulting document/surface folds forward into C typography and page geometry.

**Reject:** unrelated cards swapping by opacity alone, six boxes stacked vertically, UI cards orbiting the camera, or any central panel that tries to display all activity simultaneously.

## 14. Motion direction: a user-controlled film

### Principles

- **Native scroll** is the primary timeline. No wheel hijacking, custom scroll prison, autoplay-only sequence or lengthy forced waiting.
- Scroll progress maps **deterministically** to camera and state. Pausing leaves a coherent picture; reversing traces the same sequence; fast jumps land at valid frames.
- **Hold → move → resolve**: read-time and transition-time are different.
- Prefer visual continuity across transformation over elaborate individual animations.
- Do not animate all the peripheral elements at once.
- Make the arrival and return feel intentional rather than just two unrelated flat end-cards.

### Provisional pacing model — no prescribed percentages

Use a single normalized progress `p ∈ [0,1]` for the *immersive* segment. Do **not** copy the superseded v1.1 percentage table. First refine **K0 centered → K1 push → K2 complete B**; only then adjust the K3 depth, K4 short meaningful interior, K5 distinct forward fold and K6 centered C. Evidence from founder recording shows B faded before fully revealed and an empty central stage persisted too long. Correct these before extending scroll length.

Use deliberate **scroll distance** for a held readable scene rather than an autoplay timer. No large empty scroll bands or obligatory eighteen full-screen stops. More story content in Gate 2 must reuse the single environment with short, causally connected readable states. Respect local input speeds: short mouse wheels, fast trackpads, touch flicks, pauses, keyboard jumps and reverse. Check the entire intermediate timeline, not only named end frames.

### Deterministic state requirements

The implementation must be a pure function of progress and viewport/layout state, or an equivalently deterministic declarative timeline. No state should depend on “the previous frame finished first.” A fast scroll jump must not skip a required state transition and leave stale opacity, wrong text, or a lingering active surface. If a discrete user action occurs (e.g. opening a real contact link), manage it explicitly rather than confusing it with scroll progress.

## 15. Centered C resolution and genuine website release

The **forward fold to C** is a distinct positive-progress transformation; it must satisfy all of the following:

1. The originating B website's colors, typography, grid, material and navigation remain recognizable as the same design family.
2. Peripheral environment planes **physically** align/fold into the C typographic grid. Use depth, angle, parallax and occlusion rather than opacity-only crossfades.
3. The drafted response / central surface contributes a traceable piece of this fold. No hard cut, unexplained white wipe, new portal or empty holding interval.
4. The ending is a **new centered C composition**, exact headline **“Made to be seen. Built to work.”**—**not** the opening headline repeated, and not a new website.
5. The illustrative reply status remains clear: **prepared for review, never sent**. The closing hero itself is a brand statement, not a claim of completed external action.
6. C settles enough to read in scroll distance, then the sticky stage releases directly to the genuine `SelectedWork` DOM and normal page flow; no duplicate work section or second full-screen unconnected CTA.
7. Reverse scrolling reconstructs the scene and B arrival exactly; real Work/Services/Contact, browser focus and history remain usable.
8. The genuine Work component and localization are verified in the current production app before *claiming* integration; the existing static GitHub proof currently contains a source-verified **preview**, which does not meet this criterion.

**This is a visual loop, not a navigation loop:** centered at the start and at C, with forward progress and no repeated hero.

---

# PART V — RESPONSIVE AND ACCESSIBLE EXPERIENCE

## 16. Desktop vs. mobile: the same destination, different composition

**Same**: story, central axis, message continuity, cause/effect, direct navigation, forward/back scroll semantics, truthful simulated status.

**Different**: camera FOV and crop, text size/line breaks, panel count, peripheral detail, geometry, depth intensity, holds and fallback threshold. **Never just scale the desktop tunnel down to 360 px.**

### Desktop

- Opening can use generous editorial asymmetry; the camera converges toward the page's center.
- There may be left/right peripheral planes and visible perspective around a centered card/document.
- Keep the central stage narrow enough for comfortable reading and large enough for credibility.
- Side information is atmospheric: no required reading on extreme edges.

### Mobile portrait

- The opening has its own strong composition: brand, headline, concise offer, direct CTA(s), one meaningful visual entry target.
- Put the primary message near the **actual center of the usable viewport**, not at desktop coordinates.
- Use fewer/larger surfaces at the sides; let them be cropped by the viewport rather than shrinking the text to expose every object.
- A message or proposed reply remains legible at normal phone sizes without pinching/zooming.
- Use shallower depth, fewer transparencies and potentially shorter/clearer transitions if necessary for performance and spatial comfort.
- Touch flick, momentum, browser bars and back navigation need deliberate acceptance tests.

### Tablet, landscape, and short-height

Portrait tablet or phone landscape may require a simplified or ordinary-flow presentation. A beautiful, accessible noncinematic sequence is preferable to clipping the central card into a short viewport.

### Minimum test grid

- Phones: **320×568, 360×800, 390×667, 390×844, 430×932**.
- Tablet: **768×1024** and landscape variant.
- Desktop/laptop: **1024-wide, 1366×768, 1440×900, 1920×1080**; test a short-height browser.
- Test zoom at **200%**, larger text, orientation changes, touch momentum and resize while in the middle of the sequence.

These are viewports for verification, **not proof that the result is already responsive**.

## 17. Accessibility and fallbacks

- The experience must remain intelligible with `prefers-reduced-motion: reduce`: provide a designed static/low-motion presentation of the offer and short example, with working direct Work/Services/Contact links.
- Provide a deliberate no-WebGL option. If WebGL is unavailable, the visitor must **never** see a blank hero.
- Ideally the initial headline, offer and navigation remain usable without JavaScript. The demo need not animate without JS, but the business site must still function.
- Meaningful message text must be **real selectable DOM text**, or have an exact accessible HTML equivalent. The generated/storyboard text must not be rasterized into unreadable images.
- Decorative geometry should be hidden from screen readers. The narrative's text equivalent must have sane heading order and reading order.
- Inactive/offstage buttons must not remain tabbable. Focus should not teleport during scroll transformations.
- Visible focus indication on light and dark surfaces; normal links/buttons with semantic roles and accessible names.
- All essential controls should have comfortable touch targets (target **≥44 CSS px** where practical).
- Never rely solely on color, animation or icon shape to convey an outcome.
- No unreadable tiny metadata. Normal body text should target **16 px or more** in actual reading areas; the central message should be stronger. Decorative labels can be smaller only if they are not essential to understanding.
- The experience must not cause seizure-like flashes, uncontrolled rotation or motion traps.

---

# PART VI — TECHNICAL ARCHITECTURE & IMPLEMENTATION

## 18. Current code baseline and preservation — verify before touching anything

**Repository:** [`socraticblock/Agency`](https://github.com/socraticblock/Agency).

At the GitHub inspection during this planning session on 29 October 2026:

- `main` pointed to commit **`734d0eb04de2d4287f0f6af220a705e0be89bcae`**.
- A recent **doorway comparison prototype** existed on **`feat/genezisi-hero-four-act-polish`**, at **`efcafc54f1537e694c9e383c3825ce362d52fbd4`**, with opt-in route **`/flagship-journey/index.html?hero=doorway`**.
- The existing doorway prototype used a transparent PNG foreground, CSS transforms, DOM text and a deterministic native-scroll timeline. Its own documentation explicitly calls it a **layered approach approximation**, not a true 3D camera. The documented CSS used an approximately **540svh** desktop experience and a **500svh** phone experience; these dimensions are *not* approved for the new, more efficient North Star.
- Relevant existing files include `public/flagship-journey/index.html`, `doorway-hero.css`, `doorway-hero.js`, `doorway-frame.png`, `journey.css`, `journey.js`, `signature-hero.css`, `docs/flagship-doorway-prototype.md` and associated tests. These are inspection pointers, **not instructions to rewrite them in place**.
- The repository also had older editorial V2 and scroll-motion prototype branches. Do not conflate those with the current selected creative direction.

**Crucial limitation:** the GitHub connector **cannot verify the Codex/local working tree, unpublished commits, exact served preview, local assets or the most recent browser recording**. Before implementation, inspect those and create a recoverable checkpoint. If local work is newer than GitHub, preserve it instead of resetting to a convenient remote branch.

### Preservation rules

- Do not overwrite or delete useful current work until source-of-truth reconciliation is complete.
- Keep the existing comparison variants accessible during evaluation.
- Work in the actual Genezisi repository or an explicitly connected prototype route, **not** an unrelated microsite that cannot be integrated.
- Preserve real Selected Work, Services, Contact, language routes and project navigation; modify only the hero and its immediate handoff seam unless another scope is explicitly approved.
- Maintain portfolio truth: existing work includes **TK Counsel, Socraticblock and Fornward** in the identified flagship route, while other V2 branches may show additional items. Inspect the chosen live/source baseline before deciding the production project list. Do not invent clients or results, or call a prototype a live client deployment.
- Do **not** merge to `main`, deploy production or push to `preview-*` without explicit owner approval. A new ordinary feature branch may be used for checkpoints after local-state reconciliation.
- A technically complete build is **not** a visual acceptance or a hero freeze.

### Old brief vs. new direction

The provided older **“Genezisi V2 — Editorial Refinement Roadmap”** prohibited WebGL, GSAP pinned storytelling and heavy hero motion for a different, quieter V2 direction. **Those old hero-specific creative restrictions are superseded by this newly selected Infinite Website concept.** Its transferable principles—excellent typography, restrained decoration, honest work, small JS payload, accessibility, stable mobile UX, strong localization and truthful claims—**remain binding design-quality lessons**. The newer Infinite Website handoff is the primary source for the immersive direction; this document is the latest consolidated North Star.

## 19. Rendering strategy: choose the least complex convincing solution

The requirement is **convincing forward spatial travel with visible sides and a readable central interface**. It is **not** “use Three.js” or “avoid Three.js” on principle.

| Candidate | Benefits | Risks | Decision rule |
|---|---|---|---|
| **High-quality DOM/CSS 2.5D or CSS 3D** | Fast iteration, accessible live content, low dependency cost, easy central layout | Unconvincing occlusion/depth at certain viewpoints; perspective synchronization | Start here for a constrained straight-ahead path **if** the side geometry holds up in actual browser frames |
| **Hybrid WebGL + DOM** | True 3D background/side geometry, consistent camera/parallax, live readable HTML foreground | Render cost, camera/DOM alignment, stacking/focus issues, mobile fallback | Use when CSS cannot deliver a credible passage without brittle tricks |
| **Full WebGL content world** | Maximum geometry flexibility | Text accessibility, responsiveness, GPU cost and complexity | **Not the default**; requires clear evidence that simpler techniques fail |

**Recommended technical hypothesis:** First create a short, visually convincing **entry-and-return** proof using real DOM planes and a controlled camera/perspective model. Upgrade only the spatial layer to hybrid WebGL if actual frames demonstrate that CSS depth is insufficient. Keep central typography/UI in DOM where practical.

The current repository includes libraries such as Three.js, React Three Fiber, GSAP and others, but **installed dependencies are not a mandate to use all of them**. Avoid multiple competing animation clocks. Choose one scroll progression owner and one camera/state mapping.

### Technical contracts

- Native window scrolling; no nested scroll prison or simulated momentum.
- Normalized progress with reversible, stateless camera/animation sampling.
- Event-driven paint on scroll/resize; avoid continuously running expensive render loops when no motion is needed.
- Single source of truth for the message, timing constraints, available times and proposed reply.
- Geometric camera model for perspective, near/far clipping, side-plane coordinates, occlusion and depth sorting.
- Readable real DOM content remains above or mapped reliably into 3D space; text must not shimmer or turn into a low-resolution texture on close approach.
- A graceful static/fallback state exists before assets load, when WebGL fails and when JS is disabled.
- Reuse/optimize assets, lazy-load deeper environment resources and keep initial hero informative immediately.
- Local simulation only; no new backend, live calendar, outbound message, CRM, network permission or customer data needed for this demonstration.

## 20. Assets and art-production policy

- Do **not** regenerate twelve full concept frames and mistake them for a production asset pipeline.
- The concept sheet is mood and composition reference, not geometry. Its AI-generated text and interfaces are unreliable.
- Create the **minimum necessary authored assets**: perhaps a small atmospheric texture/background, lighting/reflection detail and a few geometric surfaces. Real UI typography, message content, status and links are native HTML/CSS/SVG.
- Every image or 3D asset must justify its runtime cost and have a fallback.
- No enormous MP4 background, arbitrary frame atlas or video-dependent motion for the primary responsive interaction. A prerendered deterministic layer can be evaluated only if genuinely appropriate and budgeted.
- Keep image source/provenance and license information documented; do not assume storyboard panels are reusable as unseen 3D surfaces.

## 21. Content/localization and real-site integration

- Preserve currently supported locale routes and real translation infrastructure (the repository history includes English, Georgian and Belgian Dutch homepage work; verify the exact active route matrix before editing).
- Prototype the narrative in one source language first if it helps iteration, **but do not launch it in only one language while silently breaking other supported routes**.
- English and Georgian require separately authored headline breaks and type checks; Dutch also needs proper review where it is a supported current route.
- Keep contact destinations real and verified. Do not invent a mailbox, phone number, response time, lead collection endpoint or social proof.
- Maintain SEO metadata and genuine portfolio links. The interactive effect must not hide essential business content behind hydration.
- Once the hero is approved, integrate only at the clean seam leading to **existing Selected Work**. Do not casually rebuild unrelated sections or force an entirely new site architecture.

## 22. Performance and quality budgets

The first screen must remain useful before heavy visual resources arrive. A site that janks or crashes on a typical phone cannot be called premium.

**Performance targets to measure, not to claim prematurely:**

- Prefer Google's *good* CWV thresholds at the tested production experience: **LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1** (evaluate with representative conditions and field data when available).
- Aim for fluid interaction on modern desktop and ordinary mobile hardware; investigate dropped frames, long tasks, GPU burden and touch latency rather than inferring frame rate from passing tests.
- Keep the first meaningful textual paint independent of large 3D assets.
- Avoid expensive postprocessing, multiple transparency layers, dense particles, wide shadow cascades and unnecessary real-time reflections, especially on mobile.
- Respect DPR budgets; prefer fewer decorative surfaces at narrow viewports.
- Ensure resize/orientation switch and back/forward navigation restore coherent state.
- Track actual image/font payload and loading priority; avoid layout shifts from unreserved dimensions.

Any proposal to add costly visuals needs an evidence-based answer: **What improves comprehension or the experience? What does it cost? What can be removed to pay for it?**

---

# PART VII — PHASED EXECUTION AND ACCEPTANCE

## 23. Build order: small, recoverable gates

**Gate history and next scope are explicitly separated.** This is a destination spec, not a blanket work order. Do not silently expand into full narrative engineering when the entrance/geometry needs improvement.

### Gate 0 — Reconcile and preserve (repeat on integration)

Inspect the actual newest local worktree, GitHub refs, currently served route, unpublished changes, locale routes, authentic project links, contacts and rollback SHA before modifying the app. Historical GitHub inspection does not establish the state of a coder's local tree. Preserve current work and never reset it to an earlier example SHA.

### Gate 1a — Static direction studies (DONE as an exploration; not production acceptance)

Three desktop/mobile opening studies A/B/C were created. The founder selected **B entry → C ending** and then explicitly changed the opening choreography to **centered headline → incoming interface pushes to left**. Do not commission three more competing static openings unless founder specifically revises that decision.

### Gate 1b — Centered opening, B entrance, geometry and C forward fold (ACTIVE; NOT ACCEPTED)

1. Implement a **beautiful, actionable centered first frame**, with three independent offerings, real links and a calm no-motion experience.
2. Build a **coordinated desktop right-to-left B arrival** that physically displaces the headline, body and CTA **fully offscreen**, finishing with a much larger centered B; author a distinct **mobile vertical push** that moves the intro upward and B to center. Preserve real navigation, and remove offscreen controls from focus order.
3. Let **complete B** resolve clearly before any fading or forward entry. No unreadable overlapping headings during intermediate progress.
4. Map B's real page edges/columns to **solid spatial near/far geometry**, responsive projection, relative parallax and occlusion. Forward viewpoint passes *through* site-derived objects, not a scaled screenshot.
5. Stage one **short, well-composed, architecturally integrated neutral interior**; eliminate the excessive empty/flat hold and unrelated floating modal. **Do not add full Gate 2 fictional story** here.
6. Build the **distinct forward fold into centered C**, with its exact headline, followed by a clean handoff toward `#work`; never play the opening in reverse as a forward ending.
7. Test deterministic native scroll forwards/reverse/rapid changes; no dead zones, forced timers or scroll hijack. Verify links, keyboard/semantic content, reduced motion, no-WebGL/no-JS, portrait and short mobile.
8. Produce stills and slow/fast/reverse recordings, note exact browser, route, viewport and capture method, and submit for **founder visual acceptance**. Existing isolated proof is not full app integration: state clearly whether genuine `SelectedWork` is wired.

**Pass gate 1b only when:** founder confirms the centered→B→forward depth→centered C impression is beautiful at actual intermediate frames, the full B is readable before moving, the interior is not empty or overlong, the reverse path works, mobile is deliberate and normal browsing is unaffected. A responsive screenshot or passing QA script **alone is insufficient**.

**Failure/simplification protocol:** after one focused refinement, compare a smaller, more reliable CSS/2.5D or hybrid solution with identical real-browser evidence. Reject opacity-only poster swaps and blank corridors. Preserve all variants and report limitations without claiming success.

### Gate 2 — The connected single-enquiry narrative (NOT YET AUTHORIZED)

Only after Gate 1b visual approval, add Act II using the **pre-designed process → fictional enquiry → deterministic automation → systems/integration → AI interpretation → permitted illustrative availability → unsent draft → optional automatic/human control** sequence. Maintain one original message, exact example times, central legibility and visible cause and effect. The visitor must comprehend systems engineering and workflows *without* assuming every step requires AI or a new website.

### Gate 3 — Genuine website integration and coherent post-C experience

Connect approved motion to the real Next.js homepage shell and `SelectedWork` component, preserving capabilities, localization, authentic projects, links and SEO. C must become the introduction to normal content, not a second invented portfolio. Add or adjust concise working-approach copy only through a scoped design review.

### Gate 4 — Release-candidate polish and verification

Founder-directed typography, material, lighting, spacing, responsive choreography, accessibility, translations and performance; visual regression tests and physical browser/device tests where available. State actual measured metrics and known gaps.

### Gate 5 — Controlled preview and production decision

After explicit owner approval, prepare one deliberate preview, obtain cross-device sign-off, and require a separate merge/deploy decision. Preserve rollback and check deployed site. **No `main`/`preview-*`/production update from a documentation-only request.**

## 24. Mandatory screenshots and recordings

**Gate 1b capture keyframes:** centered first paint; right-hand B arrival at 25/50/75%; complete B full-legibility hold; site-derived entry 25/50/75%; mid-entry paused cross-section showing real occlusion; compact neutral interior; forward fold to C at 25/50/75%; fully centered C; immediate real `#work` seam (label **preview only** unless actual `SelectedWork` component is rendered); reverse across entry and fold; fast scroll jumps; short mobile portrait; reduced motion/no-WebGL/no-JS; keyboard direct Work/Services/Contact; relevant locales.

**Gate 2 additions after authorization:** process architecture before enquiry; exact enquiry; automatic saved state; distinct cross-system transfer; AI highlights “next week” / “Afternoons”; illustrative calendar result; draft from exact returned options; branch showing automatic vs needs approval; unsent final status; reverse through each state.

Record browser, OS/device or emulation, route, branch/commit, screen size, any manual vs synthetic scroll method and limitations. Do **not** claim Safari/iOS/Android hardware acceptance, screen reader results, Web Vitals or frame rate without actual corresponding measurements. Screenshots and recordings must be reviewed visually, not accepted solely because tests pass.

## 25. Acceptance checklist — creative, UX, engineering and business

### A. Creative

- [ ] First viewport alone looks like an exceptional, original digital studio site.
- [ ] The website itself becomes the threshold; no resort/stone gate is necessary.
- [ ] The camera feels as if it moves **forward**, not as if a screenshot zooms toward the visitor.
- [ ] Side geometry creates coherent perspective/parallax with a stable vanishing point.
- [ ] Every held frame is well composed, not just the named storyboard moments.
- [ ] Spatial drama is meaningful and restrained; no generic AI spectacle.

### B. Understanding

- [ ] A visitor knows we offer websites, automation and AI engineering, independently.
- [ ] A visitor can follow **one enquiry** throughout without reading jargon.
- [ ] A saved request is visibly different from AI interpretation and from checking availability.
- [ ] The calendar responds to a request and its results inform the draft.
- [ ] The visitor knows the prepared reply needs a human to review it.
- [ ] The demonstration is clearly illustrative; nothing is falsely claimed to have been sent, approved or booked.

### C. Attention and motion

- [ ] One primary message is readable in roughly the same central area at every key beat.
- [ ] The viewer does not need to scan peripheral panels to understand the story.
- [ ] Native scroll works; there is no hijacking, forced waiting or dead zone.
- [ ] Reverse scroll reconstructs the same state in reverse.
- [ ] Fast scroll jumps, resize, browser back and orientation changes do not leave stale state.
- [ ] Forward scroll **folds into a distinct centered C** without replaying the opening, then releases into genuine Work.

### D. Responsive and accessible

- [ ] Desktop and mobile are separately authored and both look intentional.
- [ ] Crucial content is readable at 320–390 px widths and short heights.
- [ ] Touch controls, keyboard focus, semantics and screen-reader narrative remain usable.
- [ ] Reduced-motion, low-power/no-WebGL and preferably no-JS fallback are coherent.
- [ ] All essential Work, Services and Contact paths remain reachable without completing the film.

### E. Trust and production quality

- [ ] Only actual portfolio projects and verified project statuses are shown.
- [ ] Build/typecheck/lint/relevant tests pass or known preexisting exceptions are documented.
- [ ] Real browser QA and performance measurements support any claimed smoothness or readiness.
- [ ] No unexplained new client integrations, data collection, external sends or calendar writes are introduced.
- [ ] Work is recoverable; current production remains untouched until owner approval.
- [ ] Owner explicitly approves the visual result before any hero freeze or production cutover.

## 26. Counterexamples — immediately reject these outcomes

- “Website” intro collapses into a tiny postage stamp in a stone arch.
- The whole screen scales uniformly and we call it camera travel.
- Six unrelated cards crossfade in front of a static science-fiction corridor.
- Information moves from left to right, forcing repeated eye travel.
- All stages are listed on a single dense panel.
- The surroundings constantly animate with no response to the action in the center.
- The visitor must read “CRM”, “LLM”, “API”, “tool call” or “orchestration” to follow the demo.
- An illustrated form or approval button falsely suggests a real submission/action.
- The AI gets credit for ordinary deterministic saving/mapping.
- A fabricated availability result is presented as live calendar availability.
- C becomes an isolated promotional second website instead of the same Genezisi visual system with an immediate genuine Work seam.
- A huge blank transition separates the hero from Selected Work.
- Mobile receives only a scaled desktop crop with unreadable type.
- The effect is beautiful in a still but clips, flashes, drops frames or breaks scroll in the browser.
- Engineers build the full AI enquiry story **before** the centered opening, fully settled B, entry geometry and forward C fold are visually convincing.

---

# PART VIII — GOVERNANCE OF THE NORTH STAR

## 27. Source-of-truth hierarchy

1. **This North Star v1.2:** controlling full experience, preserved technical standards, scope boundaries and approvals.
2. **[Full B → C Visitor Flow v1.2](./VISITOR_FLOW_v1.2.md):** companion storyboard, scene-level proposed copy and visual cues; subordinate to this North Star when a detail conflicts.
3. **[Gate acceptance v1.2](./ACCEPTANCE_GATES_v1.2.md):** actionable incremental tests and visual approval record for each gate; cannot authorize a future gate.
4. **Current verified source/served website:** authoritative for actual code, enabled locale routes, genuine projects and contact behavior, not a unilateral creative override.
5. **North Star v1.1 archive and historical visual studies:** provenance and technical detail only where compatible; superseded B opening, eight-beat story and return-to-opening contract are not current directions.
6. **Older feedback, master handoffs and concept art:** useful for craft and traceability, not permission to contradict the approved B→C concept or business truth.

If a founder decision changes, amend this North Star, companion storyboard and acceptance tests together and record the change. Do not attach conflicting appendices and expect developers to guess.

## 28. Locked vs. deliberately open

### Locked / founder-selected

- Centered first frame, exact opening headline, three independent services, direct real navigation and contact.
- Incoming right-hand interface physically makes room by pushing intro left; mobile uses its own vertical composition.
- Complete readable B settles **before** moving forward into the website's own spatial architecture.
- Genuine perspective, relative near/far motion, traceable structural edges and occlusion; no tiny framed website or generic sci-fi portal.
- One coherent system story: pre-designed workflow, one canonical fictional request, rule-based automation, real conceptual system-engineering/integrations, AI only where useful, permitted demo availability, prepared unsent reply, appropriate automatic versus human-approval choices.
- One stable accessible central reading zone and visually causal motion; short, meaningful rather than long empty scroll.
- Distinct **forward** fold into centered C, exact headline **“Made to be seen. Built to work.”**, and actual Selected Work on normal scroll.
- Native reversible scroll, skip, reduced-motion/no-WebGL/no-JS fallbacks, honest simulation and meaningful mobile/locale support.
- Separate founder approval for Gate 1b, later narrative, integration/production; code completion does not imply visual or release acceptance.

### Open / subject to proof and founder visual review

- Exact appearance, font choices, visual density, material, lighting, interface typography and depth objects.
- Exact transition curves, scroll distances, B hold length, center optical alignment and camera projection.
- Final scene supporting lines, control split visualization, fictional business UI treatment and localization.
- Minimal CSS/2.5D/hybrid renderer choice after evidence; budgets and device-level quality.
- How a working-approach explainer fits within the genuine current site sections.
- Approval of Gate 1b and all later gates; the opt-in static preview is **not** yet production integration.

## 29. Immediate developer handoff

> **GENEZISI — Infinite Website, North Star v1.2.** Treat this file as controlling; see the B → C visitor-flow and gate-acceptance companions. The founder selected a **centered opening** with “Your website is only the beginning.” A site-derived interface arrives **from the right and pushes the intro left**; the **complete B composition must settle** with legible contents before forward travel. Then the actual website's structure becomes 3D/2.5D architecture with genuine parallax and occlusion along a stable central reading axis. A short, designed—not empty—interior proves depth and a distinct forward fold resolves into **centered C**, “Made to be seen. Built to work.” Immediately afterward, native scroll releases into the genuine `SelectedWork` component. **This is a visual loop, not a return to the original headline.** Later, and **only after Gate 1b is approved**, an illustrative story shows a *pre-designed* process, one enquiry, normal automation, connected systems, AI understanding and illustrative availability, an unsent draft, and an appropriately chosen human approval step. All disciplines are independently commissionable; avoid technical jargon, false live actions and claims of foolproof automation. Respect mobile vertical choreography, reversible scroll, fallback, links, SEO and locales. Preserve newer unpublished local work and historical prototypes, use recoverable draft branches and provide real browser evidence. **Next authorized scope is to polish Gate 1b only.** Do not merge/deploy without specific approval.

## 30. The North Star test for every pull request

Before proposing another effect, component, card or chapter, answer:

1. **What does the visitor understand more easily because of this change?**
2. **Does it strengthen the uninterrupted forward/return illusion?**
3. **Can they keep their attention in the center?**
4. **Does the environment's movement visibly cause or reflect a meaningful event?**
5. **Is the claim truthful and the action actually authorized?**
6. **Does it work equally convincingly, if differently composed, on mobile?**
7. **Can we remove something else to keep the experience fast and simple?**

If the proposed change cannot pass these questions, it probably does not belong in the hero.

---

# APPENDIX A — CANONICAL ENGLISH COPY (WORKING EXCEPT LOCKED HEADLINES)

Exact line breaks and non-headline copy require typography, localization and founder review. These are short visible slots, **not** permission to stack every heading, eyebrow and paragraph at once.

| Moment | Eyebrow (optional) | Main line | Supporting content | Decision |
|---|---|---|---|---|
| 00 Centered opening | DIGITAL SOLUTIONS STUDIO | **Your website is only the beginning.** | “We build websites, create AI systems, and automate everyday tasks. You can choose one service or combine them.” | Screen 01 wording/colors selected 30 Oct; localized copy and final visual gate pending |
| 01 Push / 02 Full B | THREE DISCIPLINES | Websites · Automation · AI systems | “Form and function, connected.” | Layout principle locked, secondary copy open |
| 03 Enter | Optional | “Beyond the interface.” | Motion does primary work | Optional |
| 04 Design | SYSTEM DESIGN | **First, we design how it should work.** | “Clear steps. Connected tools. Checks where they matter.” | Working |
| 05 Enquiry | NEW ENQUIRY | **A new enquiry arrives.** | Canonical §8 fictional message unchanged | Canonical data locked |
| 06 Automation | AUTOMATION | **Your request is saved.** | “The details are checked and organized for your team.” | Working |
| 07 Systems | SYSTEMS & INTEGRATIONS | **Your tools work together.** | “Information moves where it's needed, without being copied by hand.” | Working |
| 08 AI | AI SYSTEMS | **Your AI assistant understands.** | “It recognizes what the person is asking for.” / “Next week” + “Afternoons” | Working preferred |
| 09 Availability | CONNECTED INTELLIGENCE | **Finding suitable times.** | “Tuesday · 2:00 PM” / “Thursday · 3:00 PM” | Times fixed, illustrative |
| 10 Draft | PREPARED RESPONSE | **Your reply is ready.** | “Would Tuesday at 2:00 PM or Thursday at 3:00 PM suit you?” | Canonical draft fixed |
| 11 Control | THOUGHTFUL AUTOMATION | **Automated when it makes sense. Approved when it matters.** | “Routine steps can run automatically. Important actions can wait for you.” / “Your reply is ready for review.” / “You decide what happens next.” | Working preferred; unsent final state locked |
| 12 Forward fold | Optional | None required | Physical geometry does the work | No duplicate hero |
| 13 C center | GENEZISI / DESIGN & ENGINEERING | **Made to be seen. Built to work.** | “Thoughtful digital experiences. Dependable systems behind them.” | Headline locked; support candidate |
| 14 Work | SELECTED WORK | Existing genuine project's copy | Current `SelectedWork` component | Preserve, verify |
| 15 Services | CAPABILITIES | Three independently available offerings | “Start with what you need. Each service works on its own, or we can design a complete solution.” | Business principle locked |
| 16 Approach | HOW WE WORK | Understand → Design → Build/connect → Test safeguards → Improve | Compact factual explanation | Proposed existing-site fit |
| 17 Contact | CONTACT | “Tell us what you're trying to solve.” | Existing verified destination | Working copy; link real |

**Demo disclosure:** “Illustrative example — no live actions.” Persistent and accessible during Act II (and its ending context as appropriate).

---

# APPENDIX B — REFERENCE MATERIALS AND PROVENANCE

**Version 1.2 primary source:** Founder-approved discussions on 29 October 2026 and [Complete B → C Visitor Flow v1.2](./VISITOR_FLOW_v1.2.md). B opening/C ending were selected after Gate 1a studies; the founder then specified center-first, interface pushes headline, full B before transition, stronger physical interior, and a business story that explicitly distinguishes solution architecture, ordinary workflows, systems engineering, AI interpretation, and optional automation or human approval. The B→C Gate 1b opt-in proof on draft PR #11 was visually reviewed but **not accepted as final**. The attached v1.1 North Star is archived separately and has its contradictory instructions **superseded**.

1. **Uploaded master handoff:** `GENEZISI_Infinite_Website_Master_Handoff_2026-10-29(2).md` (29 October 2026). Establishes Infinite Website, continuous forward movement, full-circle resolution, preserve-current-code rule, feasible rendering approaches, staged proof and accessibility/performance constraints.
2. **Uploaded 12-frame storyboard:** `image(20261029-025011).png`. Illustrates surface → move forward → interaction → structured message → automation → AI → connected world → draft → return → original website → selected work → conclusion. Mood and narrative reference only; not production geometry.
3. **Uploaded older feedback:** `Website Review Feedback.txt` (Genezisi V2 editorial refinement roadmap). Useful enduring standards for editorial quality, honest copy, visual restraint, real work, localization, a11y and performance. Its static/no-WebGL creative prohibition is superseded by the current immersive selection.
4. **Repository inspection, 29 October 2026:** [`socraticblock/Agency`](https://github.com/socraticblock/Agency), [`feat/genezisi-hero-four-act-polish`](https://github.com/socraticblock/Agency/tree/feat/genezisi-hero-four-act-polish), [`doorway comparison documentation`](https://github.com/socraticblock/Agency/blob/feat/genezisi-hero-four-act-polish/docs/flagship-doorway-prototype.md), [`commit efcafc54`](https://github.com/socraticblock/Agency/commit/efcafc54f1537e694c9e383c3825ce362d52fbd4). GitHub state only; local worktree not verified here.
5. **Founder brainstorming, this conversation, 29 October 2026:** explicit selection of **forward C transformation** for entering the whole website, center/teleprompter attention model, human-language on-screen copy, cinematic reactive surroundings, visitor-business perspective, **distinct B→C forward fold**, and natural continuation into real Selected Work.

---

# APPENDIX C — DETAILED ENGINEERING CONTRACT (NORMATIVE)

This appendix converts the creative requirements into implementable state, geometry, accessibility, integration and test contracts. It supplements—not replaces—the creative chapters. If exact code structure differs because of the verified repository, preserve the observable behavior and explain the variance.

## C1. Required runtime composition

**Use the actual existing application and its routing system.** Identify whether the chosen production route renders Next.js components, static HTML, or a mixed microsite; do not invent a second production stack. Suggested responsibilities (logical architecture, not mandatory filenames):

1. **Server/static site shell:** brand, header/navigation, headline, independent services proposition, direct work/contact links, real Selected Work and all post-hero content. This must appear without the cinematic layer.
2. **Narrative source module:** one canonical structured definition of the fictional enquiry, relative date preference, two simulated available times and unsent draft. Localizable text comes from the actual site's locale mechanism.
3. **Timeline mapper:** a pure or equivalently deterministic `sample(progress, layout)` returning camera pose, visibility, object transforms, and scene phase. Only one normalized progress value controls the spatial scene.
4. **Geometry/visual layer:** the minimum DOM/CSS perspective planes or optional hybrid 3D scene that creates convincing entry/depth/fold. It must not replace necessary accessible business content.
5. **Central semantic stage:** actual readable text and equivalent screen-reader narrative, positioned within the usable viewport. No generated-image text, inaccessible canvas UI, or arbitrary per-frame remounting of inputs.
6. **Fallback renderer:** no-motion/static, no-WebGL, and sensible no-JS opening; cannot be a blank screen.
7. **QA aids:** development-only progress/keyframe scrubber or deterministic route/query feature flag if it helps capture frames. Never ship a visible debug panel or expose private data.

## C2. Timeline/state data contract

**Use one immutable normalized progress model, not a stack of timers.** Semantic phases may have stable names (not mandatory React components):

```text
CENTERED_OPEN
B_INTERFACE_PUSH
B_FULLY_COMPOSED
FORWARD_SITE_ENTRY
INTERIOR_NEUTRAL          # Gate 1b only; replace later
SYSTEM_DESIGNED           # Gate 2 later
ENQUIRY_RECEIVED
REQUEST_SAVED
SYSTEMS_CONNECTED
AI_INTERPRETATION
AVAILABILITY_LOOKUP
REPLY_PREPARED
HUMAN_APPROVAL_REQUIRED   # this example is NOT sent
FORWARD_FOLD_TO_C
C_CENTERED
SITE_WORK_RELEASE
```

**Gate 1b uses only:** `CENTERED_OPEN`, `B_INTERFACE_PUSH`, `B_FULLY_COMPOSED`, `FORWARD_SITE_ENTRY`, `INTERIOR_NEUTRAL`, `FORWARD_FOLD_TO_C`, `C_CENTERED`, `SITE_WORK_RELEASE`. Do not implement Gate 2 narrative now or sneak it into the geometry proof. Stage names may differ; user-visible behavior must match.

Let `p = clamp((scrollY - segmentStart) / segmentScrollableLength, 0, 1)` where segment boundaries are **measured** and recomputed on viewport change; no fixed `window.innerHeight` assumptions. `sample(p, layout, locale, canonicalDemoData)` determines view and geometric objects **without dependence on the previous frame**. Sampling out of order, fast jumps, reverse scroll, orientation change and browser history restoration must remain coherent. A small ambient effect may be omitted under reduced motion, and must never drive semantic progress.

No separate clock or one-time `hasCompleted` state may cause a wrong result after scroll reversal. No scroll-based send/approval/calendar write. Actual link clicks/other explicit controls have their own normal user-initiated behavior.

**Narrative continuity:** the one fictional message, exact example time preference, Tuesday/Thursday slots, and matching reply are canonical data; changes propagate consistently across visible and accessible text. The `Runs automatically / Needs approval` split describes possible **design choices**; in the demo, saving is automatic and replying awaits approval. Never turn the visitor's scroll into approval.

## C3. Geometry/camera model

Define the dimensions and camera model explicitly in a short markdown geometry specification and (if useful) a scene configuration object. Recommended definitions:

- **World axes:** stable `x` horizontally, `y` vertically and `z` as forward depth; document which sign is toward the viewer.
- **Viewpoint:** perspective projection or a carefully constrained equivalent; coherent vanishing point and optical center per layout.
- **Planes:** named local transforms and parent frames for `PageFrame`, `CentralAperture`, `LeftPlane`, `RightPlane`, `FrameLines`, `ContentStage` and `WorkSeam` (or equivalent design-specific identities).
- **Occlusion:** explicit ordering and clipping; avoid text disappearing behind decorative planes during settles.
- **Responsive tuning:** desktop and mobile can use different field of view, plane count, plane spacing, travel extent and hold length. They must share the same semantic story and causal object mapping.
- **Forward return:** an independently authored second transformation that resolves site identity and real DOM handoff while the progress increases.

Start with **CSS/DOM 2.5D or CSS 3D** if it creates believable relative depth. Use hybrid WebGL + DOM **only if** actual screenshot/recording comparisons show CSS cannot achieve the effect reliably or economically. Keep essential text in DOM. Full WebGL scene/content is an exception needing compelling evidence. Installed Three.js/R3F/GSAP packages are not authorization to use all of them.

Do not finalize FOV, exact camera coordinates, optical center in pixels or easing by writing arbitrary values in this brief. The coder should supply tested values and frame evidence in the geometry spec; the founder approves the visible result, not the math constants.

## C4. Native scroll, interruption and handoff

- **No wheel interception, custom scroll prison, forced momentum or autoplay movie.** Native window scrolling is the controlling user input.
- If using a sticky scene, its scrollable containing section determines duration. It ends so the **existing** Selected Work content follows naturally with no duplicate hero, gap, overscroll trap or sudden content swap.
- The user can scroll backward and forward repeatedly at any speed. Scroll behavior never depends on sitting through an animation or timer.
- Deep links and **Explore our work** should reach the real Work section regardless of whether the visitor has seen the immersive experience. Preserve keyboard focus and browser navigation behavior; prefer the site's existing anchor/router mechanisms.
- Existing Services, Contact and language links must remain reliable. Site navigation may stay in a functional overlay or standard document context while a *noninteractive decorative echo* participates in the spatial world. Never leave invisible offstage interactive controls tabbable.
- Landing with a fragment identifier, loading mid-document, restoring browser back/forward, or jumping via a direct Work action must not show a stale overlay that obstructs content.
- Account for mobile touch inertia, browser UI shrinking/expanding, safe areas and address-bar changes. Do not tie the optical center blindly to an unstable `100vh` approximation.

## C5. Performance decisions

Prioritize real first paint and a reliable normal website before spatial sophistication. Keep the initial headline, offer, navigation and primary CTAs available even if 3D assets are delayed. Load only the geometry/assets actually used by the accepted prototype. Do not ship a huge hero MP4, heavy frame atlas, redundant render loops, excessive transparent planes, particle clouds or expensive postprocessing to hide inadequate composition.

Record actual tested LCP/INP/CLS, total initial payload, long tasks, scroll frame drops and qualitative mobile behavior; treat **LCP ≤2.5s, INP ≤200ms, CLS ≤0.1** as targets for representative conditions, not results guaranteed by this specification. Measure with tools available in the repository/browser. If field data are unavailable, say that and use reproducible lab conditions. Do not claim 60 FPS merely because a rendering tick occurs 60 times a second.

Limit expensive paints to necessary progress/resize updates; avoid simultaneous animation clocks. Initial DOM is readable when JS fails. Font loading must be deliberately checked for English, Georgian and any currently supported Dutch route; do not silently ship synthetic bold Georgian headings or a large unused font palette.

## C6. Accessibility and truthful behavior

- **Accessible meaning:** provide the same enquiry → saved → understood → example times → prepared reply flow in semantic DOM/reading order. Hidden decorative canvases/planes are `aria-hidden` where appropriate. Do not make every changing visual stage a disruptive live region announcement during scrolling.
- **Reduced motion:** a separate designed static/low-motion path with headline, three services, the concise sample and functional links; not simply zero-duration transforms of a broken perspective scene.
- **No WebGL/low capability:** rendering loss must leave the business website and central example usable. If necessary simplify the experience to an accessible normal-flow sequence.
- **Keyboard:** visible focus on light/dark backgrounds; no phantom focusable elements in offscreen panels; Skip-to-content or equivalent respects normal site structure; real links behave as links.
- **Truthfulness:** no real customer data, network calendar lookups, inbox access, CRM writes, outbound messages, inferred booking, simulated approval attributed to the viewer, invented clients or performance claims. The unobtrusive disclosure **“Illustrative example — no live actions.”** appears with the demo and in equivalent accessible text.
- **Illustrative status sequence:** deterministic save simulation → AI preference interpretation (example) → permitted read-only availability illustration → prepared draft **not sent**. The demo must not accidentally imply an appointment was booked.

## C7. Localization and content contract

All text, including status copy, original enquiry, time labels, suggested reply, disclosure, CTAs and accessible descriptions must use the site's verified locale infrastructure. Draft the first prototype in English if faster, but **do not ship production with broken or silently missing existing locale routes**. Georgian line breaks, font weights, reading widths and mobile optical alignment need independent visual review. If Belgian Dutch remains an active route, include it; verify actual supported locales in current code rather than assuming every historic branch is active.

**Canonical fictional content (English working data; one source):**

```json
{
  "kind": "general-services-enquiry",
  "message": "Hi, I'd like to learn more about your services. Could we talk next week? Afternoons work best.",
  "requestedWindow": "next week",
  "preferredTimeOfDay": "afternoons",
  "illustrativeOptions": [
    {"weekday": "Tuesday", "time": "2:00 PM"},
    {"weekday": "Thursday", "time": "3:00 PM"}
  ],
  "suggestedReply": "Would Tuesday at 2:00 PM or Thursday at 3:00 PM suit you?",
  "finalState": "ready-for-human-review-not-sent",
  "isLive": false
}
```

The JSON is a conceptual schema, not a mandate for a new API or even a JSON file. Use the repository's existing conventions. Never have separate scene scripts hardcode conflicting customer messages, times, or final statuses. The weekday/time labels remain deliberately **example values** and are not tied to the viewer's real current calendar.

---

# APPENDIX D — REQUIRED PRODUCTION ARTIFACTS, CHECKPOINTS AND TESTS

## D1. Deliverables per gate

| Gate | What is permitted and expected | Evidence to hand over | Do not advance until |
|---|---|---|---|
| **0 — Preserve** | Verify local+remote latest state, recovery point, real route/locales/content; never reset newer local work | Exact branch/SHAs, worktree status, served baseline, source inventory | Source is preserved and reconciled |
| **1a — Direction exploration (historical completed)** | A/B/C desktop/mobile studies; selection **B entry + C ending** already made; later founder center/push refinement recorded | Preserve original six studies and selection history | Do not reopen B/C choice without new founder instruction |
| **1b — Opening/geometry proof (ACTIVE)** | Centered intro → right-hand push → fully readable B → actual forward site depth → compact neutral interior → distinct forward centered C → truthful Work seam | K0–K6 mapping, desktop/mobile/320px stills, forward/reverse videos, browser details, accessibility/fallback and pass/fail | Founder **visually accepts** movement/intermediate frames and any unfinished real-site integration is clearly labeled |
| **2 — Designed-system narrative** | One predesigned process/enquiry, ordinary automation, systems integration, AI/time lookup, unsent reply, optional automatic vs human path | Source-consistent story frames, reverse, comprehension notes and disclaimer | Separately authorized and founder reviews narrative quality |
| **3 — Real application handoff** | Integrate approved hero into actual locale pages and genuine Next.js `SelectedWork`, preserve rest | Source file/route proof, app tests, real Work seam recording | No false claim that standalone static preview is integrated |
| **4 — Polish and QA** | Full visual/mobile/localization/a11y/performance and browser/device verification | Actual captures, metrics, tests, known gaps, founder release candidate review | Owner approves release candidate on real evidence |
| **5 — Controlled release** | Explicitly approved preview, then separate main/production deployment decision | Preview and rollback, sign-off, post-deploy smoke test | No self-authorized push/merge/deploy |

**No unused features and no artificial parallel branches.** Commit recoverable working stages and keep historical prototypes intact until an owner agrees they may be archived.

## D2. Concrete screenshot and recording matrix

Use at least **1440×900 desktop**, **390×844 portrait** and **320×568 small portrait** for Gate 1b. Later also use 1366×768, short-height/landscape and real hardware as available. Every artifact records browser, exact viewport, device or emulation, timestamp/capture order, route, branch/SHA and scroll progress. Do not call emulation a physical phone test.

| Capture | Required state | Failure to reject |
|---|---|---|
| S00 | **Centered** opening at first paint, no right card | Off-center, missing services/CTA, blank JS first paint |
| S01–03 | **B arrives** from right at ~25/50/75% of its move | Push teleports/crossfades, headline collision, unreadable text |
| S04 | **Full B fully settled** and readable | Premature fading of card, cropped labels, no readable hold |
| S05–07 | Entry into real site geometry at ~25/50/75% | Uniform screenshot zoom, translucent overlapping posters, no occlusion |
| S08 | Stable **compact interior** with real near/far structure | Empty dark gradient, endless hold, unrelated floating white dialog |
| S09–11 | Distinct **forward fold into C** at ~25/50/75% | Replay of entry, new portal, opacity-only swap, blank scene |
| S12 | Final **centered C** fully visible | Uncentered headline, same old opening repeated, broken brand |
| S13 | Following **actual Selected Work** (or mark static preview clearly) | Work duplicated, sticky trap, blank spacer, fabricated project |
| S14 | Reverse entry, reverse fold, pause, jump, resize | Wrong state after jump, stale surfaces, lost focus |
| S15 | Reduced-motion/no-WebGL/no-JS and keyboard Work/Contact | Blank site, inaccessible anchor, hidden services |
| S16+ | Gate 2 system-design/enquiry/automation/integration/AI/availability/control | Data discontinuity, fake send, AI credited for ordinary saves |

Record **slow forward, fast forward, reverse through all transitions, pause mid-transition, mobile touch flick**, Work skip, browser back/forward and resizing. Capture and inspect intermediate frames and narrow screen layouts. No FPS, Safari, physical Android or WCAG claim without supporting measurement.

## D3. Automated tests to add/adapt

Use the repository's existing test framework; these are *test intentions*, not a request to install a second suite needlessly.

- **Content continuity:** one canonical enquiry, preferred window/afternoon constraint, Tuesday/Thursday example options, correctly assembled reply, ready-for-review-only final status.
- **Deterministic timeline:** matching output for matching progress/layout; jump sampling; reverse restores earlier transforms; no stale success flags.
- **Boundary conditions:** `p=0`, `p=1`, p outside range clamped, fast jumps, resize/viewport change, locale changes.
- **Navigation:** Work/Services/Contact destination functionality before/during/after scene; no duplicate hero or sticky overlay blocking Work; focus remains logical.
- **Fallback:** reduced motion and absent WebGL produce legible meaningful content, functional first screen, no runtime crash; no-JS base content where feasible.
- **Data safety:** no real outbound send, calendar write or inbox access; simulated state cannot trigger network side effects.
- **Rendering QA (where tools exist):** representative browser image snapshots across agreed viewports to catch clipping/regression, while recognizing image diffs are not proof of aesthetic excellence.
- **Existing site regression:** portfolio truth/status, localization, page SEO metadata, existing project links and contact path remain intact.

Do not create brittle tests for arbitrary animation timestamps if the implementation derives from scroll progress. Make tests assert semantic and geometry contracts.

## D4. Explicit founder approval moments

1. **Gate 1a choice — recorded:** Founder selected B as the entry architecture and C as the ending, then refined the opening to center-first with coordinated push. Do not reopen the choice without new direction.
2. **Gate 1b visual sign-off — outstanding:** Demonstrate complete B (no premature fade), genuine forward spatial movement, meaningful short interior, fold to a centered C, mobile, reverse and a truthful Work seam. A positive assessment of a *promising start* is **not** final acceptance.
3. **Gate 2 story review — later:** Founder reviews concrete story visuals/copy, safeguards, causal AI/automation distinctions after authorizing that gate.
4. **Integration and release candidate — later:** Genuine `SelectedWork`/locales/SEO/contact paths and full responsive/a11y/performance review.
5. **Preview and production — separately authorized:** no automatic `main`/`preview-*` merge or deploy based on a docs or PR update.

If acceptance is not yet given, preserve a draft and report remaining defects. Do not expand scope merely to avoid waiting for a meaningful visual decision.

## D5. Developer final report template (fill with real facts)

```text
GENEZISI INFINITE WEBSITE — GATE [0/1/2/3/4/5] REPORT
Repository / working branch:
Base SHA / current SHA / rollback SHA:
Actual served route and locale routes checked:
Current gate implemented vs not implemented:
Files changed and why:
Renderer used and evidence-based rationale:
Geometry identity map and keyframe reference:
Static openings / selected direction (if applicable):
Desktop captures (browser, viewport, screenshot/recording paths):
Mobile captures (browser, device/emulation, viewport, paths):
Accessibility/reduced-motion/no-WebGL results:
Native scroll, reverse, rapid jump, Work seam results:
Automated checks run (commands + pass/fail):
Performance metrics (tools, device, conditions, numbers):
Known risks and unverified areas:
Deviations from North Star and justification:
Founder approval required: [specific gate only]
Next gate proposed: [not started unless authorized]
Main/preview/production untouched: [yes/no and details]
```

No report may simply claim “done, polished, mobile verified” without the corresponding evidence. Provide artifacts with paths that actually exist.

---

# APPENDIX E — NON-NEGOTIABLE DECISION MATRIX AND RED FLAGS

| If this happens | Decision |
|---|---|
| First-frame design is only compelling because objects move | Stop animation work; redesign opening still |
| Uniform page scaling looks like entering a screenshot | Reject; add genuine relative side depth/occlusion or a better spatial model |
| CSS 3D becomes brittle in browser captures | Compare minimal hybrid WebGL + DOM; do not switch stacks on theoretical preference |
| A rich WebGL world compromises DOM text clarity | Preserve essential HTML text; simplify/replace the spatial layer |
| Forward return looks like retracing entry or starting the hero again | Reject; author K3 as a separate forward-going fold and work handoff |
| Mobile needs much smaller text to fit all planes | Remove planes/depth instead; keep readable content |
| A lengthy journey becomes a scroll prison | Shorten holds/reduce beats, preserve native scroll and direct Work route |
| More dramatic particles/glows make the scene confusing | Remove them; purposeful visual causality only |
| A timeline jump yields wrong state or freezes a surface | Make sampling pure/reversible; no chained time-ordered side effects |
| Portfolio, legal copy, contact URLs or locale data are missing | Inspect existing truth, preserve links; never invent clients/addresses/results |
| A real integration would make the demo look more believable | Do not add it; illustrative simulation is intentionally sufficient |
| The only remaining blocker is subjective visual selection | Present evidence + recommendation for the founder gate, not an open-ended design questionnaire |
| Implementation passes tests but looks weak in actual browser | The gate is **not** visually accepted; simplify/refine rather than adding story beats |
| Gate 1 fails after one focused refinement | Produce one simpler proof, compare evidence, report failure if neither meets bar; no speculative massive build |
| A separate portfolio section duplicates the immersive story | Keep one coherent example only; preserve real Selected Work and existing content |
| Existing local state is newer than GitHub | Preserve local changes and checkpoint them before basing a new branch on remote history |

## E1. No-go / scope exclusions

No full-width hero background video, giant pre-rendered cinematic, fake terminal activity, neural-brain object, arbitrary animated dashboard walls, stone/resort threshold, auto-sent reply, actual appointment booking, fake client work, fake metrics, complex on-site chatbot, crypto feature, new analytics tracker collecting personal messages, unrelated site architecture rewrite, or self-authorized `main`/production merge.

## E2. Quality maxim

**The Genezisi website must not look like a studio showing off 3D for its own sake. It should look like sophisticated digital engineering made to feel effortless, trustworthy and valuable.** This is a visual and business constraint, not a demand for a particular rendering technology.

---

# APPENDIX F — V1.2 CHANGE RECORD, PROVENANCE AND HISTORY

This is an **integrated revision of the complete v1.1 North Star**; its preserved technical constraints, performance/camera requirements, localization, accessibility and evidence standards remain in force unless directly revised here. The **original 29 October v1.1 source must remain archived unchanged**.

**30 October 2026 refinement addendum:** Screen 01 Option D palette and simpler copy selected; four-screen Gate 1 art-direction sequence adopted; the optional CTA's **Folding Project Dive** concept selected for visual prototyping, not yet implemented or accepted. Do not confuse the separately clicked shortcut with the deterministic native-scroll journey or the static proof with authentic Next.js Work. Read the [dated active brief](./GATE_1_VISUAL_FOUNDATION_2026-10-30.md) and [new audit](../DOCUMENTATION_AUDIT_2026-10-30.md) for precise status and implementation boundaries.

**Founder-led changes recorded 29 October 2026:**

1. The static opening direction studies were completed. **B / Interface Strata** was chosen for the entrance, **C / Typographic Architecture** for the ending; neither is treated as a different website.
2. The initial screen now starts **centered**. The interface appears from the right and **pushes** intro content left; mobile uses a vertical rearrangement.
3. Full B must **settle completely** before fade/entry. Review exposed a premature fade and crossing typography; these are defects to fix, not approved motion.
4. The interior needs materially more **credible site-derived depth**, less empty hold and an architecturally integrated central reading surface; the current prototype is a proof, not final approval.
5. The finale is a **forward transformation into centered C** with the exact heading “Made to be seen. Built to work.” and then the **authentic** Selected Work, not a reprise of the beginning.
6. The narrative now explicitly shows **system/workflow/solution design before execution**, the distinct value of ordinary automation and **connected systems engineering**, and **AI interpretation where useful**.
7. The spoken-friendly decision phrase is **“Automated when it makes sense. Approved when it matters.”** The demo reply is always **unsent and awaiting a person's review**; legitimate future client workflows may be authorized for full automation.
8. One fictional message, exact options, consistent causal transfers, plain language and truthful demo disclosure still govern the story.
9. Historic Gate 1a and opt-in Gate 1b code/docs are preserved; **no** demo acceptance, live app integration, device/locale certification, or main/deployment approval is implied.
10. Gate sequencing remains strict: refine founder-reviewed Gate 1b, then authorize Gate 2 narrative, Gate 3 production integration, Gate 4 QA and Gate 5 controlled release.

**Source availability:** The v1.1 original is available in the provided handoff. The 29 October 2026 full B→C visitor-flow document is also available. Other older named master handoffs/concept art were mentioned in the prior North Star and may not be present in the current worktree; those descriptions are historical provenance only, not fresh inspection. Current GitHub refs and local working-copy state must be reconciled before any subsequent integration. No unverified deployment or served-site claim is introduced here.

---

## FINAL NORTH STAR

> **Start with a beautiful, complete centered Genezisi website. Let its own interface arrive and reshape the page. Move forward through the website's genuine spatial architecture to discover a clearly designed, useful process—ordinary automation, connected systems, appropriate AI and well-placed human decisions. Let every action have a visible cause and result. Transform forward into a distinct centered Genezisi statement, then release seamlessly into authentic work and easy contact.**
>
> **Clarity first. Credible engineering throughout. Visual distinction earned, never decorative.**


**This is a specification, not proof of implementation. No visual, performance, QA, production or deployment acceptance is implied.**
