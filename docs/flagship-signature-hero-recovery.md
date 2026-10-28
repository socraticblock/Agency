# Genezisi flagship — signature hero recovery (implementation checkpoint)

**Date:** 28 October 2026
**Repository:** `socraticblock/Agency`
**Branch:** `feat/genezisi-signature-hero-restoration`
**Base:** `feat/genezisi-real-project-journey` at `e43a967a4e334533c595d2d54d871a72d9156752`
**Status:** implemented first hero pass; **not visually accepted or production-ready**. No production merge, deployment, or `preview-*` push.

## Why this exists

The founder approved preserving the original *Beyond the Surface* visual direction (Prototypes 04/05) while keeping the current flagship's authentic real-project chapters. The October 28 flagship reintroduced scroll animation, but its opening was a drifting TK Counsel preview. This repeated the first portfolio project and no longer demonstrated website → automation → AI agent → human control as the signature opening.

The full Prototype 05 source ZIP described in previous handoffs could not be recovered from the currently accessible project source files. This pass is a **source-informed reconstruction**, not a claim of identical recovery. Its narrative derives from the Prototype 04 frame audit, the Prototype 05 handoff, and the founder's explicit direction.

## Implementation

- `public/flagship-journey/index.html`: Replace the TK Counsel opening artwork with one original Genezisi illustrative surface and five progressively visible business-system scenes. Keep real projects and all later sections. Hero handoff now says **Real work.** rather than prematurely introducing TK Counsel before the Work introduction.
- `public/flagship-journey/signature-hero.css`: Isolated styling for the opening. Dark/ivory/mint palette; an editorial surface, custom geometric element, authentic-looking workflow UI; distinct automation, AI, human review and outcome treatments; mobile-specific composition; reduced-motion static fallback.
- `public/flagship-journey/journey.js`: One normalized scroll progress controls the scene transitions, stage indicator, caption and visual state; reverse scrolling is deterministic. No new animation library, no automatic page scrolling, no network operations.
- `tests/flagship-signature-hero.test.mjs`: Zero-dependency structural regression tests. Run: `node --test tests/flagship-signature-hero.test.mjs`.

## Single canonical six-stage story

| Index | Stage | Visible event and limits |
|---|---|---|
| 01 | Surface | Genezisi-owned illustrative website surface |
| 02 | Request | Fictional visitor enquiry: consultation next week, afternoon |
| 03 | Automation | Fixed-rule CRM record `DEMO-1042` and owner notification prepared, **not sent** |
| 04 | AI agent | Scheduling intent, afternoon preference, permitted `calendar.read_availability` with example time options. Calendar creation and outbound sends disallowed |
| 05 | Human control | Proposal reviewed; owner approval **simulated** |
| 06 | Result | Approved reply **ready for manual delivery**; no actual message sent or booking created |

The narrative and current caption are always indexed by the same JS stage variable. Scene crossfades interpolate using scroll progress. This addresses Prototype 04's inconsistent stage/footer captions and false leap from HOLD to RESOLVED.

## Deliberate boundaries

- Do **not** describe this as an authentic production software system or as a customer result. It is a local simulation; only portfolio chapters showcase genuine projects.
- The content below the hero currently retains an interactive automation/AI Lab. A subsequent editorial review must remove repetitive explanations and decide whether the Lab provides a worthwhile *deeper*, explicitly user-controlled demonstration.
- Authentic complete TK Counsel/Socraticblock page captures are still missing. The existing project previews remain unchanged. Do not claim full-site visual tours until captures and real-browser pan behavior are verified.
- The visual is **not yet** premium-art-direction approved. Custom interface typography, crop composition and every frozen keyframe still require review. There is no proof of mobile FPS or browsers from a static source inspection.

## Quality gates before visual approval

1. Run `node --test tests/flagship-signature-hero.test.mjs`, build and site test commands from the repo's actual `package.json`.
2. Review entire `/flagship-journey/index.html` at **320x568, 390x844, 768x1024, 1366x768, 1440x900**. Capture 0%, ~25%, ~45%, ~62%, ~77%, ~93% hero progress, plus transition into the Work section. Inspect composition, clipping, legibility, and case continuity.
3. Verify slow/fast/reverse scrolling, trackpad, mouse wheel, touch flick, resize/orientation changes, browser zoom, keyboard navigation, and reduced-motion.
4. Check iOS Safari, Android Chrome, Firefox and Chrome/Edge. Watch for sticky container overflow, typography clipping and any forced compositor layers.
5. Verify text contrast, accessible description and no claim of a sent message or real booked appointment.
6. Review the complete site, not a detached or miniature hero re-creation. Only pursue extra 3D or custom asset production after frozen keyframes pass visual acceptance.
7. Generate, inspect, optimize and commit genuine project captures; retest project sections and original-site links. Keep existing frame permission/security constraints.
8. Complete EN/KA/NL-BE art direction and translations as a separate gated implementation.
9. One deliberately authorized preview deployment after build/visual QA; merge `main` only with explicit founder approval.

## QA evidence / environment limitations

The HTML tag counts, referenced scene IDs, JavaScript syntax (compiled without executing browser code), and CSS brace balance were checked during implementation. GitHub connector comparison confirmed the branch diverged only by the intended hero files at that checkpoint. A connected real-browser session was not available in this ChatGPT context; the Browser connector requires an originating browser context. Therefore **no real browser screenshots, full build, Playwright run, or device performance claims are made**.

The goal remains a bespoke, high-end, continuous visitor journey. This checkpoint establishes the correct story and implementation seam, not final creative polish.
