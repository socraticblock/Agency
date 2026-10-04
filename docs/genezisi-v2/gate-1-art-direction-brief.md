# GENEZISI V2 — Gate 1 Art Direction Brief

**Status:** Active implementation gate  
**Date:** 4 October 2026  
**Authority:** Use with `implementation-roadmap.md`, `creative-experience-spec-v0.1.md`, research, and implementation audit.  
**Scope:** Static hero art direction only. Do not proceed to serious scroll animation or the rest of the homepage until this gate is approved.

## Objective

Create six presentation-quality hero states for desktop and six deliberately re-authored states/chapters for mobile.

The stills must make Genezisi feel like a small, high-end studio capable of exceptional websites and the useful systems behind them. They must communicate the Signal story without relying on motion to explain weak composition.

**Pass condition:** any key frame should look intentional and premium as a screenshot. The sequence should be understandable when viewed as stills in order.

## Critical correction to the current prototype

The current prototype has the correct narrative ingredients but visually overuses bordered dark mini-windows/cards. It risks becoming the exact “dashboard everywhere” language the creative specification says to leave behind.

Do not merely polish the current four-panel arrangement.

Keep the useful information architecture, but redesign the composition so that:
- the website surface is the dominant, beautiful object;
- the operational system feels revealed behind/through the surface rather than presented as an equal card grid;
- fewer borders are visible;
- hierarchy comes from scale, depth, typography, light, spacing and material contrast;
- the Signal is the one semantically active turquoise element;
- system information is recognizable business UI, not a generic futuristic HUD;
- negative space is treated as a premium material.

## Non-negotiable visual principles

1. **Customer intention is the protagonist.** The request “Can I book a consultation next Tuesday?” remains visually identifiable through the sequence.
2. **Turquoise means activity.** Do not use turquoise as ambient decoration everywhere.
3. **Dark, precise, cinematic, technical, editorial, human, confident.** Never cyberpunk, gaming-HUD, crypto-dashboard, neon-techno, or generic AI-agency.
4. **One dominant idea per frame.** Do not ask four equal cards to compete for attention.
5. **Readable interfaces.** If text becomes decorative microtext, simplify.
6. **Shallow spatial depth.** Perspective supports the reveal; it never becomes a 3D stunt.
7. **Completion becomes calmer.** The final frame must contain less visual agitation than the middle of the story.
8. **No motion dependency.** Every message below must work in a static screenshot.

## Desktop keyframes

### D0 — First impression / Surface

Purpose: establish Genezisi before explaining the machinery.

Must show:
- calm minimal navigation;
- `Websites · AI · Automation`;
- a decisive headline, initially `Your website is only the beginning.`;
- direct `Message me` action;
- one exceptional website/project surface large enough to desire.

The website surface should feel like something a prospective client wants Genezisi to build for them. Avoid making the first paint look like SaaS admin software.

Composition target: editorial hero + one dominant crafted digital surface. Almost no “system” visual language yet.

### D1 — Enquiry received / Signal born

Purpose: make the story instantly human.

The same website remains dominant. The customer enquiry appears naturally inside/adjacent to the website experience:
`Can I book a consultation next Tuesday?`

A small turquoise Signal activates at the request. This should be the clearest turquoise event in the frame.

Do not add a separate explanatory dashboard merely to say “request received.”

### D2 — Surface separates / System revealed

Purpose: first true “whoa” frame.

The polished website shifts modestly aside/back with shallow perspective. Behind it, reveal the operational layer.

The reveal should answer visually:
`There is useful machinery underneath this beautiful surface.`

Do not reveal four equal windows. Use a spatial hierarchy: website foreground; understanding/action layer behind; finite route emerging between them.

This frame should be the strongest single screenshot in the set.

### D3 — Route / Useful action

Purpose: prove that the system does something comprehensible.

The exact same Signal/request has left the surface and reached the useful next step. Show recognizable business behavior:
- request understood;
- Tuesday availability checked;
- customer details structured;
- consultation state prepared.

Prefer one principal action surface plus supporting fragments over a wall of cards.

A viewer with no knowledge of AI terminology must understand what happened.

### D4 — Human judgment

Purpose: show restraint and trust.

Introduce a deliberate secondary branch:
`Needs review → Socratic / Owner`

The human branch must feel different from the automated route without becoming alarming. It demonstrates that Genezisi does not pretend automation should decide everything.

The owner/human moment should feel human, named and intentional—not another anonymous system node.

### D5 — Resolved / Completion as stillness

Purpose: deliver the premium ending.

Show the relationship between surface, system, action and owner in a settled composition. The Signal has completed its journey. Interfaces align. Glow reduces. Visual noise decreases.

No confetti, success explosion or gratuitous neon.

Copy territory:
`Beautiful on the surface. Useful underneath.`
or
`Your website was only the beginning.`

Include `See the work ↓` as the natural release into the rest of the page.

This should feel expensive because it is composed and calm.

## Mobile keyframes / chapters

Mobile is not a crop of desktop.

Create six reviewable mobile states, but organize them around the three-chapter vertical story:

### M0 — First impression
Large typography, Genezisi identity, direct message action, one dominant website surface.

### M1 — Receive
Customer enquiry appears in the website context. Signal activates. No tiny workflow map.

### M2 — Transition into system
Website gives way vertically to the understanding state. Signal continuity makes the relationship obvious.

### M3 — Useful action
One primary interface shows availability/request processing. Text remains genuinely readable.

### M4 — Human review
Owner/review state is the primary object. No hover-dependent explanation.

### M5 — Resolve
Signal settles; composition becomes calm; concluding statement and `See the work ↓`.

Mobile quality comes from typography, vertical pacing, cropping, state transitions and restraint—not miniature desktop complexity.

## Visual rejection criteria

Reject and redesign a frame if any of these are true:
- it could be mistaken for a generic AI/SaaS landing page;
- it is mostly a grid of similarly weighted glass cards;
- turquoise is decorative rather than semantic;
- the customer request is no longer traceable;
- the “AI” layer requires technical knowledge to understand;
- text is too small to be meaningful;
- perspective makes UI harder to read;
- the frame needs animation to look finished;
- mobile is merely desktop squeezed into a phone;
- the composition is busy because “premium” was confused with “more effects.”

## Required implementation behavior for Gate 1

- Work only inside the protected V2 branch/prototype.
- Keep `main` and the production homepage untouched.
- Do not add GSAP/ScrollTrigger yet for this gate.
- Static components must be renderable independently of a timeline.
- Desktop and mobile compositions may share primitives but must not be forced into the same layout.
- Preserve `noindex` on the prototype route.
- Preserve the existing real contact destination.
- Do not make the 22.5 MB hero video, WebGL, live AI or live booking a dependency.
- English is the first art-direction pass; Georgian must receive separate composition QA before launch.

## Review package required before Gate 2

Return:
1. six desktop screenshots at a representative desktop viewport;
2. six mobile screenshots at a representative phone viewport;
3. the prototype URL/preview;
4. a short note explaining the hierarchy and visual decision in each state;
5. any known compromises or unresolved visual questions.

Do **not** continue into the full homepage while waiting for review.

## Approval rubric

Each category is judged Pass / Revise:

- **Immediate desire:** does the first frame make the studio feel expensive and capable?
- **Distinctiveness:** does this avoid generic AI-agency/SaaS visual language?
- **Story clarity:** can a nontechnical visitor follow request → useful action → human control → result?
- **Signal continuity:** is the same active intention visually traceable?
- **Hierarchy:** is there one dominant idea per frame?
- **Craft:** typography, spacing, surfaces, cropping and detail feel deliberate.
- **Mobile authorship:** mobile feels designed, not adapted.
- **Still-frame strength:** every key frame works without animation.
- **Restraint:** effects serve meaning; the final state becomes calmer.

Gate 2 (scroll choreography) opens only after the stills pass.

## North-star test

Before presenting the work, ask:

> If all animation were permanently disabled, would these twelve stills already make someone think “I want Genezisi to build mine”?

If the answer is not clearly yes, keep designing.
