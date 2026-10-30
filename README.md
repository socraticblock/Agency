# Genezisi — Digital Solutions Studio

**Repository:** `socraticblock/Agency`  
**Current application:** Next.js 16 App Router / React 19 / Tailwind 4 / TypeScript, with existing public site, locale routes and digital-card functionality. Verify current versions in `package.json`.

## The next Genezisi homepage: Infinite Website (B → C)

The founder-selected **future** Genezisi studio homepage is a continuous, native-scroll experience:

**Centered “Your website is only the beginning.” → B / Interface Strata pushes the introduction left → complete, readable B → physically travel forward through site-derived geometry → meaningful illustration of a designed business workflow, connected systems, automation and appropriate AI → centered C / Typographic Architecture, “Made to be seen. Built to work.” → the genuine Selected Work section and normal website.**

The studio's independently commissionable work is **Websites & digital experiences**, **Automation / workflow / integration / system engineering**, and **AI systems / assistants where useful**. Clients can request one service or a complete solution.

**Project state (30 October 2026):** Gate 1a selection is complete; the Gate 1b centered opening → green B → architectural interior → centered C is an **isolated, still-unaccepted visual proof**. A separate Option D branch contains the warmer cream opening and simplified copy, while its Folding Project Dive Work CTA is a **selected concept awaiting prototype/visual review**. Four-screen individual polish and end-to-end Gate 1b acceptance remain ahead. Full fictional story, genuine Next.js Selected Work integration and production are later, separately authorized gates. No `main` merge or production deployment is implied.

### Read before any homepage development

1. [Current North Star v1.2](docs/infinite-website/NORTH_STAR_v1.2.md) — authoritative.
2. [Full Visitor Flow v1.2](docs/infinite-website/VISITOR_FLOW_v1.2.md) — companion storyboard; proposed on-screen copy.
3. [Acceptance Gates v1.2](docs/infinite-website/ACCEPTANCE_GATES_v1.2.md) — implementation, visual and release checkpoints.
4. [Gate 1 visual foundation and CTA brief — 30 October](docs/infinite-website/GATE_1_VISUAL_FOUNDATION_2026-10-30.md) — current four-screen review and next motion concept.
5. [Documentation map and audits](docs/README.md) — active/historical specs and other products.
6. [Coding-agent instructions](AGENTS.md) — context boundaries and source-of-truth policy.

**Existing prototypes are not the site.** Previous flagship comparison routes and the draft B → C proof are isolated review artifacts. The current real homepage is assembled through `src/app/[locale]/page.tsx` and `src/app/[locale]/_components/SignalHeroPrototype.tsx`; inspect the current code and deployed route before modifying. Preserve authentic `SelectedWork`, locales, navigation and contact methods.

### Existing products and routes are preserved

This repository also contains digital business-card templates, customizer, ordering and other older routes. Their specifications and historical records remain in `docs/`. The Infinite Website is a **studio-homepage redesign**, not authorization to remove or replace the rest of the application.

## Local development

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

Use the scripts currently defined in `package.json`. Open the active locale homepage (for example `/en`) in your browser; verify `/ka` and `/nl` behavior against actual routing. These commands are **instructions**, not a claim that checks were run for this documentation-only commit.

## Delivery and safety

- Work on an isolated feature or documentation branch; preserve unpublished local code before integrating.
- Do not push to `main` or `preview-*`, merge, change DNS or deploy without explicit founder authorization. Avoid unnecessary automatic preview deployment.
- Native, reversible scrolling, accessible semantic content, mobile responsiveness, reduced motion, no-JavaScript fallback, real project/contact links and truthful fictional examples are requirements.
- A passing build does not equal founder visual approval; show actual screenshots/videos, intermediate states, QA results, and unresolved limitations for each gate.
