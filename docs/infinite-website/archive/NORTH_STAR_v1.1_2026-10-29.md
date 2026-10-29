# GENEZISI — THE INFINITE WEBSITE
## Complete Creative North Star, Spatial Experience Specification & Code-Ready Implementation Contract

**Version:** 1.1 — consolidated, developer-ready North Star  
**Date:** 29 October 2026  
**Project:** Genezisi (`genezisi.com`)  
**Repository:** [`socraticblock/Agency`](https://github.com/socraticblock/Agency)  
**Status:** **Creative direction approved; visual design, technical proof, production readiness and deployment NOT yet approved.**  
**Audience:** Founder, creative director, product/UX designer, motion designer, front-end engineer, Codex/AI coding agents, QA reviewers.  
**Purpose:** A single controlling specification a coding agent can execute gate-by-gate without asking the founder to re-explain the concept. It distinguishes locked requirements, working defaults, evidence requirements and the few visual approvals that necessarily belong to the founder. It supersedes v1.0 for this direction.

> **The North Star**  
> **Make sophisticated technology feel simple, useful and extraordinary.** Visitors arrive at an exceptional Genezisi website; native scrolling carries their viewpoint **forward into the website itself**. Along one stable, central reading axis, they experience how an enquiry can become an organized request, how an AI assistant can understand it and check permitted availability, and how a useful reply is prepared for human review. The surrounding digital space visibly responds to each action, without stealing attention. At the end, continued forward scrolling makes that world **fold back into the recognizable Genezisi website**, releasing naturally into real projects and straightforward ways to contact Genezisi. This is **not** merely reversing the camera or replaying the opening hero.

**Decision shorthand:** *An exceptional website → enter it → watch useful systems work → return to the same website → explore real work.*

---

# READ THIS FIRST — EXECUTION AUTHORITY AND SCOPE (v1.1)

## A. Exactly what the coder is being asked to do

**Build the Genezisi “Infinite Website” experience in the existing `socraticblock/Agency` website, incrementally, with Gate 1 first.** This document contains the destination, not permission to implement all gates at once. The coder should not ask the founder to restate the concept, choose libraries, invent missing business data, or decide whether the basic narrative is still wanted. Follow the defaults and decision rules here. Stop only at the explicitly defined **founder visual-approval checkpoints** or if a genuinely blocking source-preservation/security condition exists.

**Next authorized development scope = Gate 0 + Gate 1 only** unless the founder separately authorizes the next gate. Creating a design exploration, a local prototype, tests, screenshots and a draft PR on a normal feature branch is allowed. Production merge/deployment and `preview-*` pushes are not implicitly allowed.

**The job is not:** build a separate marketing microsite; reproduce an AI image as a video; create a real enquiry-handling backend; connect to calendars/CRMs; install libraries indiscriminately; redesign the whole portfolio; or spend weeks building a complex 3D world before the opening/entry/return works.

## B. Completion means demonstrated evidence, not confident descriptions

A developer may report a **gate implemented** when its code and automated checks are complete. They may report a **gate visually accepted** only after founder-reviewed recordings/screenshots. A passing build, a screenshot of concept art, or a claimed frame rate is never visual acceptance. Any untested platform must be labeled **not verified**.

## C. Decision types — avoid accidental over-specification

| Type | Meaning | What the coder should do |
|---|---|---|
| **LOCKED** | Founder-selected product/experience requirement | Implement or explain a proven technical conflict; do not silently replace |
| **DEFAULT** | The recommended first implementation or working text | Use it without reopening discussion; may refine only if evidence shows an improvement without changing meaning |
| **PROTOTYPE HYPOTHESIS** | Easing, geometry values, scale, field-of-view, scroll distance, material finish | Test locally and tune against real browser frames; never call it final approval |
| **PRESERVE/VERIFY** | Repo state, project labels, locale routes, live contact URLs | Inspect actual current source/served site; keep current verified values, do not invent |
| **FOUNDER GATE** | Choice among initial art directions and final creative acceptance | Present concise visual evidence and stop before expanding scope or deploying |

If specifications conflict, prioritize: **preserve current work and real business truth → locked experience and accessibility → current verified code constraints → evidence-based simplest rendering → aesthetic details**. Never let an older V2 prohibition on WebGL override this selected concept; never use the new concept as permission to discard old V2's standards for restraint, truthfulness and fast load.

## D. Nonnegotiable first-delivery summary

For Gate 1 the coder must supply: (1) precise source baseline/rollback checkpoint; (2) three original desktop-and-portrait-mobile static opening explorations, with rationale; (3) a geometry/identity map explaining where the site elements go; (4) the chosen opening implemented using actual HTML/CSS and working links; (5) a convincing native-scroll forward entry and **distinct forward fold-back** into the recognizable site; (6) a correctly designed reduced-motion/no-WebGL path; (7) real browser frames and recordings including reverse and rapid scroll; and (8) a short pass/fail report. **Do not implement the complete enquiry story yet.**

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

## 2. Final creative selection

### Chosen direction: **Infinite Website — enter the entire website**

- We enter **the website as a whole**, not a pop-up card and not a literal stone arch. The *site's own design* becomes the spatial threshold.
- As the visitor scrolls, **the viewpoint/camera advances forward**. It must not feel as though a flat screenshot merely scales toward the viewer.
- The **central reading position stays nearly fixed**. As with a teleprompter, new, short pieces of meaning occupy approximately the same place while the world moves around them.
- A sequence of **visually synchronized transformations** tells one coherent business example. We **never** place all the explanatory cards on screen at once.
- The surrounding environment looks like a **living, connected digital system**: interface surfaces, pathways and destinations respond to data and to the camera's travel. Background effects are subordinate to comprehension.
- The journey is **cinematic but user-controlled**: normal scrolling advances or reverses it; pausing does not lose legibility; visitors may skip it.
- The return is **Option A**: while scrolling **forward**, the digital world transforms into the original Genezisi visual system, without replaying the opening hero. Continued forward scrolling reveals genuine selected work; scrolling **backward** reverses the timeline and retraces earlier stages.
- Desktop and mobile share the **same narrative and conceptual camera axis**, but have *separately authored* compositions, field of view, density and fallback treatments.

### Decision status

These choices are **product/creative North Star decisions**. They do **not** mean that final artwork, motion curves, exact camera positions, technical rendering approach, language translations or a production hero have been visually approved.

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

> **“I immediately understand what Genezisi offers; I feel myself travel forward into a real website; without looking away from the middle I follow one understandable example of automation and AI; I return naturally to the original website and can explore real work.”**

---

# PART II — VISITOR, MESSAGE, AND CONTENT

## 5. Audience and desired visitor thought

Primary visitor: a business owner, founder, operator or decision-maker considering a website, automation, an integration, an AI assistant or a bespoke digital system. They may be highly technical, or not technical at all.

The intended emotional progression is:

- **Arrival:** “This studio has exceptional visual taste.”
- **Entry:** “I didn't expect a website to work like this.”
- **Request:** “I recognize this everyday business problem.”
- **Automation:** “The repetitive part can happen without my team doing it manually.”
- **AI:** “The assistant understands what the person means and can take a useful next step.”
- **Review:** “I'm still in control.”
- **Return:** “I get how this could apply to my business.”
- **Work:** “Show me what they've actually built.”

The visitor need not remember any implementation term. What remains should be the **capability and its business value**.

## 6. Brand positioning and the essential distinction

**Retained hero headline (locked working copy):**

> **Your website is only the beginning.**

**Recommended supporting copy (candidate, to polish in every supported language):**

> We design distinctive websites and engineer dependable automation and intelligent AI systems. Each works on its own—or together.

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

# PART II-A — OPENING ART DIRECTION AND COMMERCIAL ACCEPTANCE (v1.1)

## 8A. Three fast opening compositions — mandatory before full spatial engineering

Create **three deliberately different, static first-viewport explorations**. Each must show desktop (~1440×900) and portrait-mobile (~390×844) *with the same truthful offer, identity and primary links*. They are focused visual explorations, **not** three complete websites, three production implementations, or three alternative narratives. Reuse existing brand assets/typesetting where appropriate. Avoid stock/AI-generated pseudo-client UI.

- **Direction A — Editorial Aperture.** Bold, authored Genezisi typography and restrained real interface composition. The meaningful near-center space between layout planes becomes the eventual entry target. Distinguishing feature: highest editorial authority, minimal decor.
- **Direction B — Interface Strata.** A beautiful, believable original website interface is composed as layered structural planes. Its left/right frames and inset edges already imply spatial depth without looking like a generic SaaS dashboard. Distinguishing feature: clearest geometry-to-environment continuity.
- **Direction C — Typographic Architecture.** Navigation, baseline grids, page frames and large type create strong spatial rhythm. The webpage's underlying design language, not a separate portal, establishes the forward opening. Distinguishing feature: the brand itself forms the architecture.

These are **proposed exploration briefs, not preapproved compositions**. The designer may make an equally distinct third alternative if the actual current Genezisi site suggests a more convincing direction, but must explain the substitution. All three must be plausible as *normal high-end business webpages* with motion disabled.

### Show and assess each exploration against the same criteria

1. Within five seconds, can someone identify **Websites / Automation / AI systems** as independent commissions and find **Work** or **Start a project**?
2. Does the still image feel authored, premium and unmistakably Genezisi rather than a generic technology template?
3. Is the intended central entry target meaningful and geometrically connected to the actual webpage?
4. Does the mobile opening remain readable, balanced and commercially useful without copying the desktop crop?
5. Can its edges/planes become credible forward-moving architecture at reasonable implementation cost?
6. Would it still be compelling with low-motion or no-JavaScript treatment?

**Selection procedure:** coder supplies a labeled A/B/C contact sheet at desktop and mobile, notes tradeoffs, recommends one, and requests **one founder choice**. Do not wait for any other creative answers. Only the selected direction receives the full Gate 1 entry/return prototype. Do not treat a developer's recommendation as founder visual approval.

## 8B. The website is a commercial site first

At first paint and before any scroll interaction, the visitor must see real Genezisi identity; the locked headline **“Your website is only the beginning.”**; an intelligible three-discipline proposition; working **Explore our work** and **Start a project** actions; and available services/navigation. The user must **not need to complete the film** to contact Genezisi or see authentic work.

Commercial acceptance adds two lightweight, nontechnical reviewer prompts:

- **First-viewport check:** “What does this studio do, and how would you contact it?” A reviewer seeing the static opening should answer in ordinary language without prompting.
- **Post-journey check:** “What useful work did the example system accomplish for its business? What could Genezisi potentially build for yours?” Reviewers should describe business value, not just 3D motion.

The team should collect short notes from people unfamiliar with the design; do not claim formal conversion evidence from a handful of informal tests. The animation must not reduce findability of Work, Services or Contact. Where the two goals compete, **business clarity wins**.

## 8C. Opening visual-quality vetoes

Reject any candidate whose main differentiator is: excessive glow; an invented fake client dashboard; a stone arch; a neon tunnel; dense technical UI; a giant generic AI glyph; a tiny Genezisi site presented inside a frame; required WebGL for first content; or unreadable mobile type. Do not create an opening only to serve as an animation screenshot. The opening must be the website in its own right.

---

# PART III — THE CINEMATIC EXPERIENCE

## 9. Narrative structure: eight beats, not eight pages

The creative blueprint contains eight major beats. Their number does **not** prescribe eight full-height panels or eight separately mounted dashboards. Adjacent beats may be part of a single continuous transformation.

| Beat | Central meaning | Surrounding reaction | Visitor learns |
|---|---|---|---|
| **00 — The original website** | “Your website is only the beginning.” | Premium Genezisi site is static and fully credible | We build sophisticated digital experiences |
| **01 — Enter the website** | “See what could happen behind yours.” *(optional microcopy)* | Viewpoint advances through the actual interface; side depth appears | More can happen behind a good interface |
| **02 — New enquiry** | “A new enquiry arrives.” + original message | A message arrives; origin remains recognizable | Something needs attention |
| **03 — Saved and organized** | “Your request is saved.” | Receiving work area visibly changes from empty to received | Automation removes repetitive work |
| **04 — Understood** | “Your assistant understands the request.” | Original words “next week” and “afternoons” are visibly recognized | AI can interpret the message's meaning |
| **05 — Checking availability** | “Finding suitable times.” | A distant calendar-like surface activates and returns two real-looking **example** options | AI can use a permitted tool to help |
| **06 — Ready for review** | “Your reply is ready for review.” + suggested reply | The central draft assembles from the returned times; peripheral space quiets | A person stays in control |
| **07 — Fold back / Work** | Optional: “Beautiful outside. Useful inside.” | Digital structures fold into the original website; normal scroll releases into Selected Work | This is one coherent site with real projects |

### Narrative pacing rule

The visitor should see **one main event at a time**. Every beat follows **arrive → settle → understand → advance → transform**. The visual state must remain coherent when the scroll stops, including halfway between named beats.

### The continuous-object rule

A panel should not simply vanish while an unrelated panel appears. Use continuity devices:

- The enquiry's distinctive text remains recognizable from receipt to AI interpretation.
- The saved state appears in the **destination** only when the item arrives.
- The timing words activate; a calendar responds; **its results** travel into the draft.
- The final document can become a visible element within the surrounding website as the environment folds back.

**No pile of simultaneous cards. No series of arbitrary fade transitions disguised as a journey.**

## 10. Beat-by-beat production direction

### 00 — Arrival: the website must earn the journey

**Initial frame:** an exceptionally composed Genezisi homepage, not a thumbnail inside a giant arch. Crisp, real DOM content and fully actionable navigation; clear three-service proposition; strong visual focal point close enough to the center to become the entry destination.

**What is on screen:** Genezisi identity, the retained headline, concise supporting copy, direct CTA(s), visual interface/art direction. The site should persuade even if nothing moves.

**Interaction:** ordinary native scroll. “Explore our work” skips directly to projects; “Start a project” goes directly to the working contact route. No interaction to “unlock” the rest of the site.

**Visual caution:** a hotel/resort, fantasy stone gate, generic glossy dashboard, AI brain or neon tunnel is not a good opening for an engineering studio. Use digital/interface geometry, typography, purposeful color, visual restraint and considered materials.

**Acceptance still frame:** someone understands websites, automation and AI and can identify a contact/work action without scrolling.

### 01 — Enter: we physically travel into the website

**Camera:** advance forward on a stable near-center axis. The exterior website remains geometrically recognizable while near-edge surfaces pass toward the edges; a meaningful element at the center becomes a clear destination. Perspective changes arise from actual depth relationships or a convincing controlled 2.5D construction, *not simply global zoom*.

**Threshold:** avoid a separate stone gateway. The website's own layout, interface edges, layers and depth cues become the spatial threshold. We must be able to explain exactly what became the left and right sides of the digital world.

**Copy:** optionally “See what could happen behind yours.” Keep it brief and subordinate; the motion should communicate entry by itself.

**Visual caution:** avoid a hard cut from website to unrelated sci-fi corridor. Preserve continuity of palette, typography, recognizable geometry, lighting and focal position.

**Acceptance:** a paused frame at every quarter of the approach still looks authored; reverse scroll produces the exact same spatial relationships in reverse.

### 02 — Receive: the first human-sized event

**Central frame:** a believable enquiry appears near the camera's stable reading point:

> **A new enquiry arrives.**  
> “Hi, I'd like to learn more about your services. Could we talk next week? Afternoons work best.”

A simple message/email symbol is acceptable. No email client chrome is needed unless it improves credibility. No fake sender domain that could be mistaken for a real customer; use `example.com` if a sender is necessary.

**Surroundings:** the source surface briefly responds to receipt. A pathway or receiving destination becomes visible. The main message retains its original words.

**Hold:** allow adequate scroll distance for reading without the text sliding away. The card and stage should not fight for attention.

### 03 — Organize: demonstrate automation without overstating AI

**Central copy:**

> **Your request is saved.**  
> Everything is in one place for your team.

**Action:** an initially empty receiving surface changes to a recorded request **after** the fictional message reaches it. A prepared team notification may briefly appear as a secondary outcome, but no crowded list of destinations.

**Visual grammar:** one item → one visible transfer → one receiving state changes. This is the strongest plain-language demonstration of automation. Avoid “CRM”, “webhook”, “orchestrator”, “data mapping” or three parallel cartoon arrows.

**Accessibility meaning:** equivalent text describes the result, not just an animation of a green dot travelling.

### 04 — Understand: distinguish AI through meaning

**Central copy:**

> **Your assistant understands the request.**  
> Next week. Afternoons.

**Action:** the **same source sentence** is still visible long enough for “next week” and “Afternoons work best” to gain visual emphasis. Its meaning resolves into simple constraints near the same central reading point.

**Do not:** hide the original enquiry behind a completely new abstract AI graphic. Avoid a brain, talking robot, fake code execution stream or dense checklist of cognitive tasks.

**Meaning:** AI interprets a language preference. The previous automation stage did not claim to do this interpretation.

### 05 — Check availability: one memorable action

**Central copy:**

> **Finding suitable times.**

A connected calendar-like surface on the **periphery** becomes active. A single visible lookup/request flows to it. It returns two example available times, which move *toward the same central reading point*:

> **Tuesday · 2:00 PM**  
> **Thursday · 3:00 PM**

The visitor need not read the calendar UI or understand any technical permission vocabulary. The words “Finding suitable times” refer to the fictional recipient business's permitted availability source, never the current visitor's private calendar. The surrounding animation supplies cause and effect. The accessible explanation makes clear this was an illustrative read-only availability check.

**Do not:** show ambiguous infinite loading, invented bookings, spinners that imply real processing, or changing times for stylistic variety.

### 06 — Review: human control is the emotional resolution

**Central copy:**

> **Your reply is ready for review.**
>
> “Would Tuesday at 2:00 PM or Thursday at 3:00 PM suit you?”
>
> **You decide what happens next.**

**Visual:** the returned times visibly inform the message. The digital environment becomes calmer, not louder. One restrained confirmation/review affordance may appear; if it looks interactive, it must have real local-only demo behavior, appropriate labelling and clear semantics. A decorative “Approve” button that cannot be clicked is unacceptable.

**Truth:** scrolling to this moment **does not approve or send** anything. The final verified state is **ready for human review**, not “sent,” “appointment booked,” or “approved by the owner.” A separately implemented explicit simulated approval click could be considered later; it is not part of the North Star's required hero.

### 07 — The full-circle return: Option A

**Conceptual action:** while scrolling **forward**, the deep environment begins folding into familiar original website surfaces. The central drafted reply or its containing surface becomes part of that structure, so the fold has a tangible point of continuity. Peripheral panels retract, shift and resolve into recognizable layout planes. Typography, geometry, lighting and navigation return to their original form.

**End frame:** the **same genuine Genezisi website and design system**, not a recreated approximation with different colors or identity. The opening hero must not be replayed; the returned configuration should rejoin the real page at the Selected Work seam. It can carry a small, truthful trace of the demonstration, e.g. “Example reply prepared for review.” No additional, duplicative hero is inserted.

**Release:** sticky/immersive behavior ends cleanly and the next normal scroll reveals the original **Selected Work** section. No white wipe, blank interlude, end-title tunnel, mandatory extra CTA or long empty spacer.

**Critical distinction:** continued forward scroll **returns** to the site. Reverse scroll **retraces** the journey. Both must work.

---

# PART III-A — GEOMETRY, CONTINUITY AND TWO DIRECTIONS OF TRAVEL (v1.1)

## 10A. The mandatory identity/geometry map

Before programming the full transition, draw the first, deep and returned keyframes and document a stable **visual identity** for each meaningful object. An object may change scale, depth, angle, opacity and semantic role, but it cannot teleport into an unrelated counterpart. The table below is the **first mapping hypothesis**; refine it for the chosen opening while preserving its continuity rules.

| Stable identity / role | Opening website | During entry / interior | During forward fold-back | What MUST remain true |
|---|---|---|---|---|
| **PageFrame** | Actual webpage composition, spacing, framing | The camera moves into depth established by the page | Frame geometry reconstitutes the real site around the handoff | Never a tiny page pasted onto a gateway; same design family |
| **CentralAperture** | A near-center legitimate interface region / negative space | Becomes the visible route into deeper planes | Resolves into a normal website content region near the work seam | No abrupt new tunnel background or white wipe |
| **LeftPlane / RightPlane** | Genuine left/right layout edges, separators or surfaces | Separate into perspective-bearing side surfaces with relative parallax | Rejoin recognizable page regions / layout edges | Traceable origin and destination; not arbitrary flying walls |
| **FrameLines** | Borders, grid rules, panel edges and alignment | Extend into receding lines, frames, occlusion cues | Shorten/re-align to original design lines | Stable vanishing point; legible at intermediate frames |
| **SurfaceMaterial** | Actual Genezisi typography/palette/materials | Same design language under authored lighting/depth | Returns to brand-correct, ordinary DOM styling | No abrupt science-fiction palette switch |
| **ContentStage** | Real semantic webpage content and central meaning | Holds one live DOM message or state at readable depth | Last prepared-reply surface becomes a brief visual continuity cue | Critical copy stays accessible and near central reading axis |
| **SiteNavigation** | Real functional links/header | Real controls remain operable; scenery may echo their geometry decoratively | Original links/header remain usable | Never transform clickable controls into inaccessible inert 3D textures |
| **WorkSeam** | Real Selected Work anchor already in site | Not shown as false project content | Spatial return ends directly at genuine Selected Work section | No second hero, duplicate sales panel or dead spacer |

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

## 10B. Five spatial keyframes and the continuous path

- **K0 — First website.** Complete and persuasive, with recognizably Genezisi design, working links and original page geometry. With motion disabled this is still excellent.
- **K1 — Threshold / forward entry.** Same site surfaces acquire depth; camera advances along a primarily Z-axis path; near-edge parallax/occlusion reveals that the viewer is going *through the site's actual interface*. No unrelated portal image appears.
- **K2 — Interior.** A restrained, coherent digital chamber composed of the site-derived planes. A centered content stage is plainly readable; a few side surfaces can react to meaningful work later. It must look convincing when paused.
- **K3 — Forward fold-back.** **Still moving forward**, the digital architecture compacts, aligns, and resolves into the recognizable Genezisi visual grammar. The center surface has a tangible route into the real page. This is not the K1 entry played backward.
- **K4 — Returned website / work release.** Site brand/nav/typography are recognizably continuous; no repeated opening hero. The sticky stage ends and the immediately following section is the existing authentic Selected Work content. Ordinary scrolling takes over without a jump.

**One direction of increasing scroll progress:** `K0 → K1 → K2 → K3 → K4 → Selected Work`. Scrolling *backward* decreases progress, so the same state graph is traversed backward in the reverse order. The final K3 fold-back remains a distinct forward event at its own position on the timeline; reverse scroll naturally reverses that event, but forward travel must not be represented as returning via the original entry path.

## 10C. Camera and transition contracts

- Use one coherent perspective and vanishing point. Primarily advance Z; small optical corrections are allowed, but avoid spinning, orbiting, roll and dramatic yaw/pitch.
- Depth must be perceptible through **relative** movement and occlusion: near layout planes pass faster/larger than far planes. Uniform scaling of one screenshot fails this contract.
- All transforms derive from deterministic progress (plus responsive viewport parameters), not frame-order callbacks or independently advancing timelines.
- Compose the central reading plane near the usable viewport's optical center through the meaningful interior beats; keep readable HTML or an equivalent accessible layer, never a blur-prone image texture.
- A paused frame is legitimate at any fractional progress. No temporal animation may keep the visitor waiting for a scene to finish.
- The final fold visually reassembles recognizable **site geometry** but hands off to the original DOM page; no user should have to wonder whether a second homepage has started.
- At resize mid-journey, recompute projection/layout without losing the semantic progress state or leaving clipped/stranded planes.

## 10D. What Gate 1 should implement, precisely

In Gate 1, a single short interior **placeholder** may demonstrate a readable centered plane, but no AI or enquiry steps. Implement the real opening, the site-derived geometry, forward movement, interior hold, the distinct forward fold-back, and Work handoff. Include the reduced-motion/static alternative from day one. The first proof is evaluated from **real rendered browser frames and recordings**, not only source CSS, concept sheets or assertions.

---

# PART IV — SPATIAL AND VISUAL GRAMMAR

## 11. The central camera axis: the defining interaction constraint

The user explicitly wants the focal content almost at the same visual level throughout—**a teleprompter-like experience with depth**. Interpret this as a **stable attention zone**, not a requirement that every object be mechanically fixed to exactly one pixel.

### Functional reading zone

- Keep core message, its primary result and the next meaningful action in the **central region**, around the same vertical eye level.
- On desktop, the opening can be editorial/asymmetric, but the motion converges on a **central destination** before the narrative begins.
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

Cards are useful as **temporary carriers of meaning**, not the whole visual language. The design must never show a large card already containing every step or a crowded grid of all stages.

**Preferred transformations:**

1. Message appears in the center.
2. Its content visibly passes into a receiving place and is saved.
3. The original timing words are emphasized as the AI interprets them.
4. A calendar surface responds; times move into the center.
5. The times assemble into a proposed reply.
6. The resulting document/surface folds into the original website.

**Reject:** unrelated cards swapping by opacity alone, six boxes stacked vertically, UI cards orbiting the camera, or any central panel that tries to display all activity simultaneously.

## 14. Motion direction: a user-controlled film

### Principles

- **Native scroll** is the primary timeline. No wheel hijacking, custom scroll prison, autoplay-only sequence or lengthy forced waiting.
- Scroll progress maps **deterministically** to camera and state. Pausing leaves a coherent picture; reversing traces the same sequence; fast jumps land at valid frames.
- **Hold → move → resolve**: read-time and transition-time are different.
- Prefer visual continuity across transformation over elaborate individual animations.
- Do not animate all the peripheral elements at once.
- Make the arrival and return feel intentional rather than just two unrelated flat end-cards.

### Provisional timeline model

Use a single normalized progress value `p ∈ [0, 1]` for the immersive segment; values below are **creative keyframe markers**, *not approved CSS/GSAP specifications*:

| Approx. progress | Event / hold | Expected viewer state |
|---|---|---|
| 0.00–0.12 | Opening | Original website is legible, static, actionable |
| 0.12–0.29 | Forward entry | Website passes into coherent digital depth |
| 0.29–0.40 | New enquiry | Message clearly readable at center |
| 0.40–0.50 | Saved/organized | One destination visibly changes after transfer |
| 0.50–0.61 | AI understands | Timing words reveal meaning |
| 0.61–0.74 | Availability | One connected calendar responds, times return |
| 0.74–0.85 | Draft/review | Reply prepared, calm central hold |
| 0.85–0.97 | Fold-back | System surfaces resolve into original website |
| 0.97–1.00 | Handoff | Original site intact, Selected Work immediately next |

**Do not implement these percentages blindly.** Pacing must be tuned against actual reading time, screen dimensions and browser recordings. The goal is a **short, satisfying business-site experience**, not a mandatory five-to-eight-screen-height cinematic. Where more reading time is needed, give it without inflating the entire experience. Visitors may always skip.

### Deterministic state requirements

The implementation must be a pure function of progress and viewport/layout state, or an equivalently deterministic declarative timeline. No state should depend on “the previous frame finished first.” A fast scroll jump must not skip a required state transition and leave stale opacity, wrong text, or a lingering active surface. If a discrete user action occurs (e.g. opening a real contact link), manage it explicitly rather than confusing it with scroll progress.

## 15. Return: exact spatial contract

The **forward fold-back** (a distinct forward-going transformation, not camera reversal) must satisfy each of these:

1. The original website's defining colors, type, navigation and composition remain recognizable.
2. Peripheral environment surfaces collapse into familiar website layout elements, with sensible perspective and occlusion.
3. The center never cuts to a different unexplained scene.
4. The result is truthful: a **prepared example reply awaiting human review**.
5. No second oversized hero, replayed landing-page introduction, white wipe, blank canvas or unnecessary scroll spacer appears.
6. Native scroll releases to **Selected Work** without a trapped sticky layer.
7. Reverse scrolling fully restores the previous digital world, enquiry and opening composition.
8. Original Work/Services/Contact functionality and browser history/focus survive the journey.

A faint result trace is a **candidate** rather than a required interface: keep only if it measurably improves continuity without making the returned website less compelling.

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

### Gate 0 — Reconcile and preserve

**Actions:** inspect actual local/remote branch, current served prototype, uncommitted changes, relevant scripts, newest recording and existing work; record SHA/route/files; create a safe feature-branch/checkpoint. No overwrite of unpublished work. Verify baseline nav, project sections and supported locales.

**Evidence:** exact worktree status, reference screenshots, current route, recovery point.

**Do not:** merge/deploy, assume a particular old branch is latest, or delete old variants.

### Gate 1 — Prove the opening, entry and forward return (FIRST HARD GATE)

**Do not start Gate 2 until founder acceptance of this one.** Carry out these activities in order:

1. Generate **three quick static opening compositions**, each desktop and portrait mobile, with real hero messaging, navigable Work/Contact paths and a credible entry destination. Submit the six stills with recommendation and one decision request; founder selects a direction.
2. Document the selected composition's **object identity/geometry map** and K0–K4 spatial keyframes. Explain the persistence and return mapping of left/right edges, central aperture, navigation and work seam.
3. Implement the selected **real opening viewport** in the actual Genezisi website using real accessible HTML/CSS, preserving currently supported locales/links.
4. Build the **native-scroll, forward camera** movement into a small visually coherent interior with actual relative side depth and clear intermediate frames. Keep the center readable.
5. Implement the **separate forward-going fold-back** resolving into the recognizably original website and releasing immediately to authentic Selected Work. Backward scroll reverses the whole timeline and remains exact; it is not a substitute for forward fold-back.
6. Test mobile portrait as its own composition, not a shrink of desktop. Add direct Work/Contact actions, reduced-motion/static and no-WebGL states, keyboard and touch behavior.
7. Capture the screenshot and recording matrix defined below: hero; entry 25/50/75%; interior; fold-back 25/50/75%; Work handoff; reverse; rapid scroll; reduced-motion; mobile touch. Report exact device/viewport, branch/commit, limitations.

**Gate 1 pass requires all:** exceptional static opening; first viewport explains the three independent services and direct actions; moving viewpoint convincingly enters *this* website; intermediate frames hold up; forward fold-back is coherent and **not a replay of the opening**; reverse works; no dead scrolling or forced waiting; mobile is independently composed; fallback is readable; original Work/Services/Contact continue to work; founder explicitly approves the visual evidence.

**Not in Gate 1:** the complete enquiry story, full AI effects, real backend/calendar connections, an extensive digital city/corridor, unrelated site redesign, preview/production deploy. Existing doorway and V2 comparison work must not be erased.

### Gate 1 failure / simplification protocol

If the first implementation looks like a uniformly zooming screenshot, generic tunnel, clipped mobile card or abrupt scene swap, **do not build more beats**. First make one focused geometry/composition refinement. If it is still visually unconvincing, produce a cheaper alternative proof (for example, constrained DOM/CSS planes instead of fragile pseudo-3D, or a small hybrid spatial backdrop instead of highly layered CSS). Compare both using the same browser evidence. **Do not invest indefinitely in the more complicated option because it already exists.**

If both practical approaches fail the bar, report a clear **Gate 1 failed / direction not yet visually proven** result, preserve the work and propose a simplified entry/return variant for the founder to decide. A founder visual gate is the only planned creative decision blocker; technical implementation choices remain the coder's responsibility.


### Gate 2 — Single synchronized information journey

Add the **one central example**: new enquiry → saved → AI understands → availability → draft for review. Implement actual visual **cause and effect**, consistent content, state holds and accessible text. No real backend integrations.

**Pass criterion:** a nontechnical reviewer can explain what happened at every beat without reading implementation terminology or searching for off-center information.

### Gate 3 — Fold-back and Work release

Connect final review to the original website. Preserve state continuity, reverse motion and a clean release into the existing Selected Work section. No duplicate opening, blank wipe or forced pause.

**Pass criterion:** a single forward scroll journey completes and releases to real work; a reverse-scroll recording precisely retraces it.

### Gate 4 — Polish and production readiness

Art direction, type, color, lighting, mobile framing, scroll pacing, accessibility, localization, performance, browser/real-device QA, cut unnecessary decorative complexity, verify all business links.

**Pass criterion:** owner-reviewed screenshots and recordings plus real performance/a11y evidence justify release candidacy. No unilateral visual freeze.

### Gate 5 — Controlled preview and production decision

Only after explicit owner approval: one deliberate preview, cross-device sign-off, then separate production merge/deploy authorization. Retain rollback SHA and verify the real site after deployment.

## 24. Mandatory screenshots and recordings

At minimum record **real browser output** for:

- First-frame hero (desktop and portrait mobile).
- 25%, 50%, 75% of the **entry transition**, plus stable interior.
- All five central meaningful content states: enquiry, saved, understood, availability, draft/review.
- Start/middle/end of the **fold-back** transition.
- Completed original website and immediate Selected Work seam.
- Reverse traversal; rapid jump scrolling; slow mouse wheel/trackpad; normal touch momentum.
- Reduced-motion or ordinary-flow alternative; narrow/short screens; keyboard focus.

Give exact viewport, browser/device, branch/commit and whether footage is a local/emulated or actual mobile device capture. Do not say “60 FPS verified,” “Safari works” or “mobile tested” without corresponding evidence.

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
- [ ] Forward scroll folds the world back into the **original website** and releases into real Work.

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
- The journey finishes at a disconnected promotional screen instead of the original website.
- A huge blank transition separates the hero from Selected Work.
- Mobile receives only a scaled desktop crop with unreadable type.
- The effect is beautiful in a still but clips, flashes, drops frames or breaks scroll in the browser.
- Engineers spend time building the full corridor/agent world **before** the one-entry-and-return illusion is visually convincing.

---

# PART VIII — GOVERNANCE OF THE NORTH STAR

## 27. Source-of-truth hierarchy

When documents conflict, apply this order:

1. **This North Star v1.1**: consolidated 29 October 2026 decisions, the general-service-enquiry update, explicit geometry contract, three opening exploration requirement, distinct forward fold-back, strict Gate 1 and commercial acceptance.
2. **The 29 October “GENEZISI — THE INFINITE WEBSITE” master handoff**: detailed previous exploration, source preservation, render tradeoffs, original constraints and staged proof philosophy.
3. **Verified current repository/local implementation**: facts about what code/assets actually exist (not permission to silently change creative direction).
4. **The attached 12-frame storyboard**: visual inspiration for mood and sequence, *not* literal geometry, UI copy or approval.
5. **Older Genezisi V2 editorial feedback/roadmaps**: transferable craftsmanship and trust principles, but not authority to override the selected immersive direction.

If the owner changes any locked decision, record the new decision and why; do not quietly drift through incremental implementation changes.

## 28. Locked vs. deliberately open

### Locked for this direction

- **Infinite Website** is the approved creative direction, pending actual visual proof.
- Enter **the entire website**; do not make a small form or stone portal the primary entry metaphor.
- A forward-travel camera and stable center-attention zone underpin the experience.
- The story is a **single general service-business enquiry**, appearing **one understandable event at a time**.
- Ordinary language, visible cause/effect and human review are essential.
- Services include sophisticated sites, automation/integrations and AI/agentic engineering, each available independently.
- The environment responds meaningfully but never steals focus.
- Mobile is an intentional version of the same narrative.
- **Option A forward return**: the system folds into the recognizable original website while continuing forward, *without re-showing the opening hero*, then real Work follows. Reverse scrolling backtracks separately.
- The hero is user-controlled, reversible, skippable and truthfully simulated.

### Still to decide through real visual experiments

- Exact opening art/layout and what interface geometry becomes the entry threshold.
- CSS 3D vs hybrid WebGL and the minimal actual scene assets.
- Optical center, camera travel distance, FOV, scene coordinates and easing curves.
- Final typography, palette values, lighting/material finish and detailed responsive compositions.
- Scroll length, holds and exact microcopy in each locale.
- Whether a small prepared-reply trace remains on return.
- Final runtime performance and browser/device acceptance.
- Whether the proved concept is good enough for production; visual approval/freeze is a **founder decision**.

## 29. The immediate developer handoff, ready to copy

> **GENEZISI — Infinite Website, North Star v1.1**  
> Treat this complete document as the controlling source. Reference the master handoff or storyboard only when available; neither is required to interpret this specification. Before editing code, inspect the actual latest local worktree/branch and the currently served page; a newer local prototype may supersede GitHub. Preserve it in a recoverable checkpoint. We have selected an immersive **website-first** experience—not a literal stone arch or form popup. A native-scroll camera travels **forward into the original website**, revealing a digitally constructed system with actual side depth. All meaningful text stays near a stable **central focal point**, with one simple business action at a time. We show a generic fictional service enquiry being saved by ordinary automation, interpreted by an AI assistant, checked against illustrative available times, and turned into a reply **awaiting human review**. Use plain language; no CRM/API/LLM jargon in the hero; no real sending, booking or approval. The environment visibly reacts to these events without stealing attention. As the visitor continues forward, the digital world **folds back into the same website** and naturally releases into existing Selected Work. Design portrait mobile intentionally. Preserve Work/Services/Contact, accessible alternatives, native scroll, reverse-state correctness and honest claims. **First create three static opening directions, then build only the selected exceptional opening plus a convincing forward entry and distinct forward fold-back**; record real browser desktop/mobile evidence and obtain founder creative review before expanding to the full story. Do not merge/deploy/freeze without explicit owner approval.

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

# APPENDIX A — CANONICAL COPY TABLE (WORKING, NOT LANGUAGE-FROZEN)

The table below is the single canonical **English story copy draft**. Text must be polished and localized; it is not a guarantee of final line breaks or approved visual composition.

| Stage | Eyebrow (optional) | Main line | Secondary line / object | Status |
|---|---|---|---|---|
| Opening | GENEZISI / INDEPENDENT DIGITAL STUDIO | **Your website is only the beginning.** | “We design distinctive websites and engineer dependable automation and intelligent AI systems. Each works on its own—or together.” | Headline retained; body candidate |
| Enter | BEYOND THE SURFACE | **See what could happen behind yours.** | None needed if motion explains it | Optional microcopy |
| Enquiry | NEW ENQUIRY | **A new enquiry arrives.** | “Hi, I'd like to learn more about your services. Could we talk next week? Afternoons work best.” | v1.1 canonical fictional scenario |
| Automation | YOUR WORKFLOW | **Your request is saved.** | “Everything is in one place for your team.” | Candidate |
| Interpretation | YOUR AI ASSISTANT | **Your assistant understands the request.** | “Next week. Afternoons.” | Candidate |
| Availability | CHECKING AVAILABILITY | **Finding suitable times.** | “Tuesday · 2:00 PM” / “Thursday · 3:00 PM” | Illustrative times only |
| Draft | READY FOR REVIEW | **Your reply is ready for review.** | “Would Tuesday at 2:00 PM or Thursday at 3:00 PM suit you?” + “You decide what happens next.” | Candidate; not sent |
| Return | Optional closing thought | **Beautiful outside. Useful inside.** | “Explore our work” | Optional closing line; direct handoff |

**Persistent small disclosure in the demo:** “Illustrative example — no live actions.”

**Voice guardrail:** Don't overload every scene with an eyebrow + heading + description + three chips + button; these are *copy alternatives and slots*, not instructions to show all fields simultaneously.

# APPENDIX B — REFERENCE MATERIALS AND PROVENANCE

1. **Uploaded master handoff:** `GENEZISI_Infinite_Website_Master_Handoff_2026-10-29(2).md` (29 October 2026). Establishes Infinite Website, continuous forward movement, full-circle resolution, preserve-current-code rule, feasible rendering approaches, staged proof and accessibility/performance constraints.
2. **Uploaded 12-frame storyboard:** `image(20261029-025011).png`. Illustrates surface → move forward → interaction → structured message → automation → AI → connected world → draft → return → original website → selected work → conclusion. Mood and narrative reference only; not production geometry.
3. **Uploaded older feedback:** `Website Review Feedback.txt` (Genezisi V2 editorial refinement roadmap). Useful enduring standards for editorial quality, honest copy, visual restraint, real work, localization, a11y and performance. Its static/no-WebGL creative prohibition is superseded by the current immersive selection.
4. **Repository inspection, 29 October 2026:** [`socraticblock/Agency`](https://github.com/socraticblock/Agency), [`feat/genezisi-hero-four-act-polish`](https://github.com/socraticblock/Agency/tree/feat/genezisi-hero-four-act-polish), [`doorway comparison documentation`](https://github.com/socraticblock/Agency/blob/feat/genezisi-hero-four-act-polish/docs/flagship-doorway-prototype.md), [`commit efcafc54`](https://github.com/socraticblock/Agency/commit/efcafc54f1537e694c9e383c3825ce362d52fbd4). GitHub state only; local worktree not verified here.
5. **Founder brainstorming, this conversation, 29 October 2026:** explicit selection of **Option A** for entering the whole website, center/teleprompter attention model, human-language on-screen copy, cinematic reactive surroundings, visitor-business perspective, **Option A fold-back return**, and natural continuation into real Selected Work.

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

The story's **semantic state** may be identified by stable names (these names do not prescribe framework components):

```text
SITE_OPEN
ENTERING
ENQUIRY_RECEIVED
REQUEST_SAVED
AI_INTERPRETATION
AVAILABILITY_LOOKUP
REPLY_READY_FOR_REVIEW
FORWARD_FOLD_BACK
SITE_WORK_RELEASE
```

**Gate 1 uses only** `SITE_OPEN`, `ENTERING`, a neutral `INTERIOR_PLACEHOLDER`, `FORWARD_FOLD_BACK`, `SITE_WORK_RELEASE`. Subsequent gates replace the neutral interior with the single meaningful narrative. Do not create two unrelated timelines that have to be synchronized.

For reproducibility, map actual document scroll to normalized progress with a clamped monotonic mapping such as `p = clamp((scrollY - segmentStart) / segmentScrollableLength, 0, 1)`. Recompute `segmentStart` and `segmentScrollableLength` from actual measured geometry and viewport, not hard-coded window dimensions. That formula is **illustrative**; the browser's actual `sticky`, viewport changes and document flow are authoritative. There is no requirement to use GSAP or a WebGL renderer.

Progress must be the source of truth for all reversible visuals. Avoid one-time scroll threshold flags (`hasCompleted`, `sent`, `activated`) that remain stale after the user scrolls backward. A real navigation or button action can have independent explicit state, but a scroll alone cannot send, book or approve anything.

**Pure-state invariants:** same `p` + same layout + same locale + same demo data = same scene; a jump from `0.2` to `0.8` yields the correct output immediately; scrolling backward from `0.8` to `0.2` restores the matching earlier state; orientation/resize is well-defined. Any small ambient light movement must remain expendable and stop under reduced motion.

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

| Gate | What gets implemented | Evidence to hand over | Hard stop before |
|---|---|---|---|
| **0 — preserve** | No visual rewrite; source/route/local reconciliation, rollback point, inventory | Branch, base SHA, clean/dirty worktree, screenshot of current baseline, exact relevant files and locales | Changing old scene files destructively |
| **1a — opening selection** | Three quick desktop/mobile static concepts, no complete animation | Six labeled stills, quality comparison, recommended direction, proposed geometry maps | Full spatial implementation until founder selects one |
| **1b — illusion proof** | Real opening, K0–K4 entry/interior/fold/work handoff, accessibility and mobile | Branch/commit, geometry map, frame contact sheets, slow/fast/reverse/touch recordings, pass/fail table | Enquiry story until founder visually approves |
| **2 — coherent story** | Five meaningful states around one fictional enquiry, visual causes and persistent source data | Keyframe screenshots and readable/reduced-motion alternative, consistency tests | Longer cinematic polish before comprehension test |
| **3 — production handoff seam** | Refine fold-back with reply continuity and exact real Selected Work release | Forward/backward full recordings including Work anchor and browser history/focus | Styling other site sections |
| **4 — polish/harden** | Typography, spacing, light, materials, localization, a11y, performance, responsive/device QA | Before/after evidence, test outputs and measured budgets, verified real links | Production candidate assertion without proof |
| **5 — controlled release** | Explicitly approved preview/production procedure | Preview URL, sign-off, rollback SHA, post-deploy smoke test | Any `main`/`preview-*` push or production merge without owner permission |

**Work should be incremental and recoverable.** Create normal feature-branch commits for meaningful gates, not a cascade of branch debris. Keep old comparison work accessible until it is safe to archive by owner decision.

## D2. Concrete screenshot matrix

Capture at minimum **both** ~1440×900 desktop and ~390×844 portrait mobile. Add 1366×768 laptop and 360×800 phone for constrained checks; use the larger required viewport list from Section 16 for final QA. Each screenshot must name **actual browser, viewport, device/emulation, source branch+SHA, timestamp or capture order, and story progress**.

| Capture ID | Required visual | Failure to watch for |
|---|---|---|
| S00 | Static real hero before scroll | Weak branding, missing services/CTAs, blank JS first paint |
| S01/S02/S03 | Entry at ~25/50/75% | Uniform screenshot zoom, perspective break, text blur |
| S04 | Stable interior | Unrelated tunnel, wrong vanishing point, center displaced |
| S05/S06/S07 | Forward fold-back ~25/50/75% | Reversed camera, new hero duplication, abrupt palette jump |
| S08 | Original-site identity fully re-formed | Inaccurate recreated site, dead nav, wrong visual alignment |
| S09 | Immediately following actual Selected Work | Spacer gap, sticky trap, duplicated CTA/hero |
| S10 | Mid-scroll after resize/orientation | Stale transforms, clipped message, overscroll |
| S11 | Reduced-motion/no-WebGL fallback | Empty or incoherent scene |
| S12+ | Gate 2 enquiry/saved/AI/calendar/draft holds | Contradictory fictional content, peripheral readability demand |

Record video of **slow wheel**, **fast mouse/trackpad**, **touch flick on portrait phone**, **pause mid-transition**, **forward fold**, **reverse across fold**, **reverse across entry**, **Work skip**, **browser back/forward**. You need not claim that an emulated phone recording represents real mobile hardware. Final production acceptance includes real-device testing where available and an explicit list of unavailable environments.

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

There are only a few necessary creative/product decision points. At each, deliver evidence and **one clear recommendation**:

1. **After three static openings:** founder chooses one visual direction before complete transition engineering.
2. **After Gate 1 visual proof:** founder approves/rejects the opening + actual forward entry + actual forward fold-back + mobile experience; only then expand to Gate 2.
3. **After polished release candidate:** founder approves/rejects preview/production separately; no auto-deploy from coding completion.

If a founder approval is unavailable, preserve a reviewable draft and report the exact blocker; proceed with independent fixes within the already authorized gate only. Do not fabricate approval, and do not expand scope to fill time.

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

# APPENDIX F — V1.1 CHANGE RECORD AND SOURCE AVAILABILITY

This document **integrates** (rather than merely appends a contradictory note to) the established v1.0 blueprint and the later critique/agreement:

1. General-service-business enquiry replaces the narrow “we want a new website” fictional enquiry.
2. First-viewport business clarity and independent service offerings receive a specific commercial reviewer test.
3. Three **quick static** opening explorations, each desktop and mobile, precede expensive scene engineering.
4. The named geometry/identity map and K0–K4 keyframes define continuity from opening webpage through interior to real website.
5. **Forward fold-back** is distinguished explicitly from backward scrolling and from reversing the entry camera. The returned site must not replay a duplicate opening hero.
6. Simplified, causal, honest on-screen copy remains provisional until visual/localization review; AI and calendar claims cannot overstate the simulation.
7. Gate 1 is evidence-based and may fail; after one focused refinement, test a simpler alternative rather than expanding scope.
8. A coding agent gets concrete artifacts, browser QA, integration/fallback/state contracts and a final report template without reopening the core design.

**Source availability caveat:** v1.0 and the older editorial feedback were available in this drafting context. The v1.0 text refers to a separate 29 October master handoff and 12-frame image sheet, but those files were **not part of the currently mounted source files for this v1.1 rewrite**. Treat the document's descriptions of those references as provenance, not as independently re-inspected visual evidence. Coders should use them if present in the actual project; do not block Gate 0/1 if they are unavailable because this v1.1 file is the controlling brief.

**Repository caveat:** recorded 29 October GitHub SHAs and branch names in Part VI are **historical inspection notes from the source blueprint**, not a fresh live audit or authorization to reset to those commits. The actual coder must inspect local and remote state first.

---

## FINAL NORTH STAR

> **Design a website so exceptional that entering it feels extraordinary; guide visitors through a clear, human story of what connected automation and intelligent AI could do for their business; keep every meaningful moment in the center; let the digital world respond; return them seamlessly to the original website; and lead them directly to authentic work.**
>
> **Understanding first. Visual sophistication second. Engineering excellence throughout.**

**This is a specification, not proof of implementation. No visual, performance, QA, production or deployment acceptance is implied.**
