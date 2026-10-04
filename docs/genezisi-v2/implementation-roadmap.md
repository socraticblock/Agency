# Genezisi V2 — Implementation Roadmap

**Status:** authoritative implementation handoff  
**Repository:** `socraticblock/Agency`  
**Working branch:** `genezisi-v2/planning`  
**Production branch:** `main`  
**Current prototype route:** `/[locale]/v2-prototype`  
**North star:** **Impress → Prove → Contact**

---

## 0. The safety model: how we build V2 without touching the current website

### Production remains untouched

The existing homepage stays on `main`.

All V2 work happens on a separate branch. Never merge or deploy V2 to the production domain until the final acceptance checklist passes.

### Preview route

V2 has its own isolated route:

```
/en/v2-prototype
/ka/v2-prototype
```

The existing homepage continues to render at:

```
/en
/ka
```

This allows the old and new experiences to coexist in the same codebase.

### Preview deployment

If the repository is connected to Vercel, every V2 branch/PR should use a Vercel Preview Deployment. The coder should review the generated preview URL before any merge.

Preferred workflow:

1. Work on a dedicated branch.
2. Push commits.
3. Wait for preview deployment.
4. Review the preview URL on desktop and real phones.
5. Iterate.
6. Keep PR in draft until approved.
7. Only merge to `main` after explicit approval.

If automatic preview deployments are not configured, create a temporary preview deployment manually from the V2 branch. Do not point the production domain at it.

### Optional additional protection

Before replacing the real homepage, V2 can remain:
- under `/v2-prototype`;
- marked `noindex, nofollow`;
- excluded from sitemap;
- absent from production navigation.

This is the recommended state during development.

---

# 1. Non-negotiable objective

The website is not a complicated sales funnel.

The experience must do three things:

1. **Impress** — visitor thinks “whoa, I want something at this level.”
2. **Prove** — show enough real work/capability that the impression has substance.
3. **Contact** — make messaging Genezisi effortless.

The final action is direct contact, primarily WhatsApp.

Do not add unnecessary lead qualification, fake urgency, chatbots blocking contact, fake metrics, or long forms.

---

# 2. Existing codebase — preserve it

Do **not** migrate frameworks.

Use the current repository:

- Next.js 16
- React 19
- Tailwind CSS 4
- Framer Motion
- Lenis (installed but not globally mounted)
- Three.js / React Three Fiber / Drei
- Supabase
- existing locale routing for English and Georgian
- existing reduced-motion foundations
- existing WhatsApp constants

The current production homepage must remain intact during the prototype phase.

---

# 3. Final V2 page architecture

The target homepage is:

1. **Signature Signal hero**
2. **Selected work**
3. **What I build**
   - Websites
   - AI systems
   - Automation
4. **One system demonstration / Genezisi Lab**
5. **Founder — “Small by design”**
6. **Final contact**
7. Minimal footer

The homepage should become calmer after the hero.

Do not repeat the same visual intensity in every section.

---

# 4. Hero concept — THE SIGNAL

## Core story

One customer request is the protagonist.

Example request:

> “Can I book a consultation next Tuesday?”

It appears inside a beautiful website.

The request becomes a turquoise Signal.

The website reveals what happens behind the surface.

The Signal moves through:

```
Website
  ↓
AI / understanding
  ↓
Useful action / booking / record
  ↓
Human review when needed
  ↓
Owner receives a useful result
```

The visitor should understand the business story even if all technical labels are removed.

## Motion grammar

Every Genezisi system animation should follow:

**Receive → Route → Resolve**

- **Receive:** input appears; one localized turquoise activation.
- **Route:** the same Signal moves through one visible path.
- **Resolve:** output aligns, settles, and motion becomes still.
- **Review:** exception branches to a named human state.

Turquoise means **active**. Do not use it as random decoration.

---

# 5. Exact hero scroll choreography — desktop

## Overall scroll geometry

Target initial prototype:

- section height: ~320–380vh;
- viewport stage: sticky at `top: 0`;
- animation controlled by scroll progress;
- no scroll hijacking;
- browser scroll remains native;
- timeline reversible by scrolling backward.

The exact distances may change during visual tuning. Do not treat 360vh as sacred.

## Recommended animation engine

For the final production hero, prefer:

- **GSAP**
- **ScrollTrigger**
- DOM / SVG / CSS transforms

Reason: the hero is a synchronized pinned/scrubbed timeline with multiple phases and needs deterministic reverse scrolling, refresh handling and responsive matchMedia timelines.

Framer Motion can remain for ordinary component transitions elsewhere.

### Do not enable Lenis initially

Native scroll first.

Only enable Lenis if real-device testing shows it materially improves the feel without hurting input, accessibility or mobile performance.

## Desktop scene timeline

### Phase A — 0% to 15%: first paint

Visible:
- Genezisi nav
- descriptor: `Websites · AI · Automation`
- hero headline
- beautiful business website panel
- subtle atmospheric grid / glow

Motion:
- almost none
- very slow 1–2% depth drift is acceptable
- no decorative looping objects

Goal:
Visitor understands the offer before the cinematic sequence begins.

### Phase B — 15% to 28%: receive

A real customer request appears inside the website UI.

Example:

```
Can I book a consultation next Tuesday?
```

Behavior:
- request slides/fades into the website at low distance;
- one small turquoise pulse appears;
- website remains fully readable;
- a subtle line/pulse indicates “received.”

Do not use typing animation unless it survives usability testing. Prefer immediate readable copy.

### Phase C — 28% to 43%: surface → system reveal

This is one of the hero’s major “whoa” moments.

Website panel:
- translates left ~8–14vw;
- scales to ~0.82–0.9;
- rotates only ~3–6 degrees;
- front surface visually separates from operational layer behind it.

The revealed layer enters from depth:
- assistant panel;
- action/booking panel;
- owner panel.

No full 3D spin.

Use shallow perspective.

Recommended CSS:
- `transform-style: preserve-3d`;
- `perspective` around 1000–1400px;
- GPU-friendly transform + opacity only;
- avoid layout-bound animation.

### Phase D — 43% to 60%: route / understand

The Signal leaves the website and travels along an SVG path.

Implementation:
- use one SVG path;
- animate path progress and Signal position from the same timeline;
- optionally use `getPointAtLength()` or GSAP MotionPathPlugin if justified;
- keep a static faint path visible beneath the active path.

Assistant state changes:
- received;
- understood;
- “checking useful next step.”

The Signal remains visually identical across every stage.

### Phase E — 60% to 75%: useful action

Signal travels into the action panel.

Example:
- calendar availability checked;
- request recorded;
- confirmation prepared.

Visual rule:
show an understandable business outcome, not a technical automation editor.

Use small state changes:
- row appears;
- date becomes selected;
- status resolves.

No confetti.

### Phase F — 75% to 86%: human review

A secondary branch becomes visible.

If the request is unusual:
- main path pauses;
- branch line activates;
- “Needs review” appears;
- branch lands on owner/person state.

This proves human control.

Use a separate shape or label, not color alone.

### Phase G — 86% to 96%: resolve

All panels align.

Signal reaches final owner/output state.

Text appears:

**Beautiful on the surface. Useful underneath.**

or final approved copy.

Animation should slow down rather than become more explosive.

### Phase H — 96% to 100%: completion as stillness

Critical rule:

The “success” state becomes **more still**.

- glows reduce;
- moving line stops;
- panels snap/settle into precise alignment;
- active noise disappears;
- composition becomes calm.

Then the pinned scene releases into selected work.

This contrast is the premium moment.

---

# 6. Mobile hero — separate choreography

Do not shrink desktop into mobile.

## Mobile structure

Use a vertical narrative.

At any moment, show **one primary interface**.

Suggested sequence:

1. website / request;
2. assistant / understanding;
3. useful action;
4. owner / review;
5. final resolved state.

Signal travels vertically.

## Mobile scroll behavior

Preferred:
- shorter sticky scene or normal stacked chapters;
- avoid very long mobile pinning;
- target ~220–300vh maximum if sticky;
- test Safari browser chrome behavior;
- use `100svh` / modern viewport units;
- support orientation changes.

## Touch rules

- no hover-only content;
- no magnetic cursor behavior;
- buttons at least ~44px hit area;
- no tiny multi-node diagrams;
- one main focus per screen;
- no animation required to understand the content.

## Mobile performance

Mobile is the baseline.

If an effect causes frame drops on a mid-range Android device, remove or simplify it.

---

# 7. Reduced-motion version

When `prefers-reduced-motion: reduce`:

- no scrubbed spatial movement;
- no large parallax;
- no Signal traveling long distances;
- show a static or lightly faded sequence;
- keep all information visible and understandable;
- final contact remains identical.

Do not hide key content merely because animation is disabled.

---

# 8. Static keyframes before animation

Before animating, create six visually complete states:

1. First paint
2. Request received
3. System revealed
4. Signal routed
5. Human review
6. Resolved final composition

Each frame must look premium as a screenshot.

Do not animate weak static compositions.

The static keyframes are the visual source of truth.

---

# 9. Prototype file architecture

Recommended structure:

```
src/app/[locale]/v2-prototype/page.tsx

src/app/[locale]/_components/v2/
  V2Hero.tsx
  V2HeroDesktop.tsx
  V2HeroMobile.tsx
  SignalPath.tsx
  WebsiteSurface.tsx
  AssistantPanel.tsx
  ActionPanel.tsx
  OwnerPanel.tsx
  HumanReviewState.tsx
  HeroCopy.tsx
  HeroStage.tsx
  hero.timeline.ts
  hero.constants.ts
```

Do not leave the entire hero in one huge component after the concept stabilizes.

## Timeline separation

Keep animation choreography separate from visual components.

The UI components should be renderable statically.

The timeline file should:
- create timeline;
- register ScrollTrigger;
- select refs;
- define phases;
- clean up correctly;
- reinitialize at breakpoint changes.

Use GSAP Context for cleanup.

---

# 10. Breakpoints

Do not design only “desktop and mobile.”

Test:

- 320px
- 360px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1728px+
- short laptop heights such as 768px

Design by available space, not device name.

Use `matchMedia` / CSS media queries to switch choreography.

---

# 11. Typography

Goals:
- editorial;
- bold;
- precise;
- readable;
- Georgian support is first-class.

Rules:
- hero line breaks are intentionally authored;
- do not force identical English and Georgian line breaks;
- body copy should remain readable around 17–19px on mobile;
- limit monospaced text to statuses/labels;
- avoid excessive gradient text;
- large headlines must not clip on short phones.

Before final font lock:
- verify license;
- verify Georgian glyph quality;
- verify loading/subsetting;
- verify CLS.

---

# 12. Visual system

## Palette

Near-black base.

White and neutral text.

Turquoise/emerald only for:
- Signal;
- active path;
- selected state;
- primary CTA;
- confirmed system action.

Avoid:
- purple AI gradients;
- constant glowing borders;
- cyan everywhere;
- generic “cyberpunk” dashboards.

## Surfaces

Use:
- subtle translucent technical surfaces;
- precise 1px borders;
- controlled shadow;
- little or no blanket glassmorphism.

Screens must remain legible as static images.

## Texture

If used:
- subtle;
- static;
- non-essential;
- must not hurt text readability.

---

# 13. Selected work

Immediately after the hero, reduce motion.

Show 3–4 strongest projects, not a giant card grid.

Preferred treatment:
- large visual;
- project name;
- short project type;
- 1–2 sentence explanation;
- optional “View website.”

Use honest project labels:
- Client project
- Internal system
- Prototype
- Illustrative demo

Do not invent AI/automation results for website-only work.

Case-study language:

**Problem → What we built → What changed**

If no measured outcome exists, say what shipped instead of inventing a metric.

---

# 14. “What I build”

Keep it concise.

Three pillars:

### Websites
Custom sites, booking experiences, ecommerce and premium web experiences.

### AI systems
Useful assistants/agents for repeat questions, information retrieval, task preparation, support and handoff.

### Automation
Connections between the tools and repetitive steps that already exist in a business.

Avoid technical jargon as the main explanation.

---

# 15. Genezisi Lab demonstration

If there is not yet a perfect real AI/automation case study:

Create one polished internal demonstration.

Label it clearly:

`GENEZISI LAB · INTERNAL DEMO`

Show:
- customer input;
- system response;
- useful action;
- human exception;
- final business outcome.

Never present a demo as a paid client result.

---

# 16. Founder section

Headline territory:

**Small by design.**

Use:
- real photo;
- real founder name/role;
- direct communication promise, only if operationally true.

Tone:
- personal;
- confident;
- not fake-agency corporate.

Suggested principle:

“You work directly with the person designing and building your project.”

Do not fabricate staff/team scale.

---

# 17. Contact

Primary CTA language:

**Message me**

Keep it available:
- navbar;
- after selected work;
- final section.

Primary destination:
WhatsApp.

Update the default WhatsApp message so it does not assume the visitor wants only a website.

Suggested message:

```
Hi Genezisi, I have something I'd like to build. Can we talk?
```

Optional secondary contact:
email.

Do not force:
- account creation;
- chatbot;
- 10-field form;
- booking call;
- budget questionnaire.

---

# 18. Navigation

Target simplified V2 nav:

- Work
- What I build
- About
- Message me

Language switcher remains available.

Existing SEO/service/pricing pages may remain accessible even if removed from top navigation.

---

# 19. Performance architecture

## Hero baseline

Do not require:
- 20MB+ video;
- WebGL;
- third-party video stream;
- giant Lottie file;
- continuous requestAnimationFrame loops.

First paint should render:
- headline;
- copy;
- core hero visual shell;
- CTA

without waiting for cinematic assets.

## Animation properties

Prefer:
- transform;
- opacity;
- SVG stroke/path progress.

Avoid animating:
- width;
- height;
- top/left when transform can be used;
- expensive filters at high frequency;
- large blur radii during continuous scroll.

## Asset strategy

- responsive images;
- AVIF/WebP where appropriate;
- explicit dimensions;
- lazy-load below-fold work;
- preload only truly critical assets;
- no giant autoplay background video on mobile.

## Render-loop rule

If WebGL is introduced:
- pause when offscreen;
- reduce DPR;
- respect reduced motion;
- disable on weak devices if needed;
- no continuous render loop if scene is static.

---

# 20. WebGL decision gate

Do not start with WebGL.

First build DOM/SVG version.

Only add Three.js/R3F if:
1. static composition is already excellent;
2. shallow 3D cannot achieve the desired reveal;
3. real-device tests prove smooth performance;
4. the effect materially improves the “whoa” moment.

If any condition fails, stay DOM/SVG.

---

# 21. Exact QA matrix

## Functional

- every CTA opens correct destination;
- WhatsApp message is correct;
- reverse scroll restores previous states correctly;
- no duplicate timelines after route changes;
- resize does not break stage;
- mobile orientation change survives;
- back/forward navigation works;
- locale switch works.

## Visual

Check:
- 320×568
- 360×800
- 390×844
- 430×932
- iPad-ish tablet sizes
- 1366×768
- 1440×900
- 1728×1117
- large desktop

No clipped hero type.

No panel overlaps.

No Signal leaving its route.

No CTA hidden by browser chrome.

## Browsers

- iOS Safari
- Android Chrome
- desktop Chrome
- Safari
- Firefox
- Edge

## Accessibility

- keyboard navigation;
- visible focus;
- reduced motion;
- meaningful headings;
- contrast;
- no information encoded only by color;
- decorative SVG hidden from accessibility tree;
- real buttons/links, not div click handlers.

## Scroll behavior

Test:
- slow wheel;
- fast wheel;
- trackpad flick;
- touch flick;
- reverse direction;
- jump to middle via scrollbar;
- page reload mid-scene;
- resize mid-scene.

No broken timeline state.

---

# 22. Quality gates

## Gate A — static design

Do not animate until all six keyframes look premium.

## Gate B — desktop motion

Desktop hero must feel controlled, not busy.

No obvious jank.

Reverse scroll must be clean.

## Gate C — mobile

Real iPhone and mid-range Android.

Mobile must still create a strong first impression.

## Gate D — accessibility

Reduced-motion version must feel intentionally designed.

## Gate E — performance

No effect survives merely because it looks good on a high-end developer laptop.

## Gate F — content honesty

No placeholders, fake metrics or invented client results.

## Gate G — founder approval

Do not replace production homepage until explicit approval of the preview.

---

# 23. Development milestones

## Milestone 1 — branch / preview safety

- keep `main` untouched;
- confirm preview deployments;
- keep V2 route noindex;
- establish before/after test URLs.

**Exit criterion:** old homepage and V2 preview both independently accessible.

## Milestone 2 — static hero keyframes

- desktop six frames;
- mobile six frames;
- exact typography;
- exact panel design;
- Signal path;
- final still state.

**Exit criterion:** screenshots alone already feel premium.

## Milestone 3 — desktop scroll prototype

- install/configure GSAP + ScrollTrigger;
- create bounded timeline;
- implement receive/reveal/route/review/resolve;
- ensure reversible scroll;
- cleanup on unmount.

**Exit criterion:** desktop “whoa” moment achieved without scroll weirdness.

## Milestone 4 — mobile choreography

- separate mobile timeline;
- one primary panel at a time;
- vertical Signal;
- shorter scroll;
- touch testing.

**Exit criterion:** mobile feels authored, not reduced.

## Milestone 5 — hero performance/accessibility

- reduced motion;
- resize;
- orientation;
- frame-rate profiling;
- asset optimization.

**Exit criterion:** hero passes real-device tests.

## Milestone 6 — selected work

- choose strongest real projects;
- replace current dense grid;
- create large editorial project sections;
- verify screenshots/live links.

**Exit criterion:** work immediately supports the premium claim.

## Milestone 7 — services + Genezisi Lab

- websites / AI / automation;
- one honest internal system demo if needed;
- subtle motion only.

**Exit criterion:** expanded offer understood in seconds.

## Milestone 8 — founder + contact

- real founder section;
- simple WhatsApp contact;
- remove sales-funnel clutter from homepage;
- simplify nav.

**Exit criterion:** visitor can message Genezisi from any major stage.

## Milestone 9 — SEO / metadata / locale update

- broaden homepage metadata;
- update OG;
- maintain English/Georgian;
- review Georgian line breaks;
- update sitemap if route structure changes.

**Exit criterion:** V2 describes the actual business accurately.

## Milestone 10 — full regression QA

- desktop;
- mobile;
- browsers;
- locale;
- accessibility;
- performance;
- contact;
- existing routes.

**Exit criterion:** no critical regression.

## Milestone 11 — production cutover

Only after explicit approval:

1. keep a tag/commit for current production;
2. merge approved V2 branch;
3. deploy;
4. smoke-test production;
5. verify WhatsApp;
6. verify analytics if used;
7. verify indexing/canonical metadata;
8. monitor first real mobile sessions.

Have a rollback commit ready.

---

# 24. Definition of “perfect enough to ship”

The page ships only when:

- first screen immediately looks premium;
- offer is understandable in seconds;
- Signal story makes sense without technical knowledge;
- hero reverses cleanly;
- mobile is genuinely excellent;
- reduced motion is intentional;
- real work appears soon after hero;
- site becomes calmer after cinematic opening;
- no placeholder work remains;
- no fake claims exist;
- “Message me” is always easy;
- WhatsApp works;
- performance is strong on a mid-range phone;
- no animation is present only to show off technology;
- screenshot of any major state still looks designed;
- owner explicitly approves preview.

---

# 25. Things the coder must NOT do

Do not:
- replace the live homepage early;
- rewrite to Astro;
- enable Lenis globally without testing;
- turn every section into a scroll animation;
- use Three.js just because it is installed;
- make mobile a shrunken desktop layout;
- depend on hover;
- add large autoplay video as the hero baseline;
- use generic AI purple/glass dashboard visuals;
- add fake metrics/testimonials/results;
- add a chatbot in front of the contact route;
- lower quality to meet an arbitrary deadline;
- merge V2 before real-device QA.

---

# 26. First task for the implementation coder

Before touching the rest of the homepage:

1. Read:
   - `docs/genezisi-v2/research-and-creative-direction-2026-10-04.md`
   - `docs/genezisi-v2/creative-experience-spec-v0.1.md`
   - `docs/genezisi-v2/current-implementation-audit.md`
   - this roadmap.
2. Open the existing `/[locale]/v2-prototype` implementation.
3. Refactor it into the proposed V2 component architecture.
4. Build the six static keyframes.
5. Show screenshots / preview.
6. Only then implement the final scroll timeline.

The entire V2 homepage must not be completed in one pass before the hero is approved.
