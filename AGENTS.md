# Genezisi — repository instructions for coding agents

**Updated:** 30 October 2026. **Scope:** `socraticblock/Agency`. This file routes work to the current authority; it is not permission to change production.

## First decide which product the task concerns

This repository contains both the **Genezisi studio website** and **legacy/ongoing digital business-card and other service routes**. Do not mistake card-specific documents or rules for the studio homepage specification.

### Studio homepage / Infinite Website (current target)

Read in this order:

1. [Infinite Website North Star v1.2](docs/infinite-website/NORTH_STAR_v1.2.md) — controlling business, creative, engineering and release contract.
2. [Full Visitor Flow v1.2](docs/infinite-website/VISITOR_FLOW_v1.2.md) — proposed scene copy and B → C storyboard; subordinate where wording is not yet visually accepted.
3. [Acceptance Gates v1.2](docs/infinite-website/ACCEPTANCE_GATES_v1.2.md) — scope/QA/evidence gates.
4. [Documentation audit and precedence](docs/DOCUMENTATION_AUDIT_2026-10-29.md) — old/current documents and rules.
5. [30 October Gate 1 visual foundation and CTA concept](docs/infinite-website/GATE_1_VISUAL_FOUNDATION_2026-10-30.md) — **current working brief**, four visual screens, Option D selected colors/copy and Folding Project Dive concept plus QA. Also review [30 October doc audit](docs/DOCUMENTATION_AUDIT_2026-10-30.md) and preserve the [29 October historical handoff](docs/infinite-website/HANDOFF_2026-10-29.md).
6. [29 October lessons](docs/infinite-website/LESSONS_2026-10-29.md) and [repository-local motion-review skill](skills/infinite-website-motion-review/SKILL.md) — repeatable visual QA, scroll pacing, CSS 3D and screenshot/proof boundaries. The skill is a checked-in reference, not automatically installed by every agent runtime.

**Locked destination:** centered “Your website is only the beginning.” → right-hand B interface pushes original headline left → complete, readable B → native-scroll forward through the website's own architecture → coherent illustration of system design, ordinary automation, connected systems, appropriate AI and optional human approval → distinct forward fold into centered C, “Made to be seen. Built to work.” → *actual* `SelectedWork` and ordinary website content.

**Historical 29 October delivery checkpoint (see linked 30 October brief for newer code and decisions):** Gate 1b is an **isolated opt-in, technically implemented draft candidate** at PR #15. The centered push, full-B hold, B-derived CSS architectural chamber, third reading plane, shortened scroll holds, and early C headline are in the prototype source. **The full served route has NOT been visually accepted by the founder; the real Next.js app integration, full Gate 2 narrative and genuine Selected Work seam have NOT been implemented.** Read the dated handoff for evidence limits and current code checkpoint; do not jump to Gate 2 without explicit authorization.

**Business:** Websites/digital experiences, automation/workflow/system engineering/integration, and AI systems/assistants are **independently commissionable**. Do not position the site as an AI-only or digital-business-card-only company.

**Screen-by-screen policy (30 October):** Complete Screen 01 (including CTA prototype and founder footage/review), then Screen 02/B, Screen 03/interior, Screen 04/C. Screen approvals are separate from overall Gate 1b approval. The clicked Work shortcut is a separate animation from native scroll; do not invent a tunnel requiring compulsory navigation or claim the existing 680ms snapshot fade is the approved result. No Gate 2 coding in this phase.

**Development:** Preserve the current `main`, `preview-*`, live routes, local unpublished work, EN/KA/NL locale behavior, authentic Selected Work, verified contact channel, and separate business-card products. Work on isolated draft branches; do not merge/deploy without specific founder approval. First inspect the current branch/worktree; prior documentation is not proof of present deployment. Native reversible scroll, mobile-first, keyboard, reduced-motion, no-JS fallback, truthfulness and rendering-performance evidence matter.

**Examples are fictional:** no actual email, calendar, CRM activity or outgoing message is implied; no purported live AI system. A visitor can bypass the cinematic journey to real Work/Services/Contact.

### Digital business card or older site features

Use the relevant `docs/digital-card-*.md`, `docs/MEMORY.md`, pricing, legacy-site and route-specific rules **only for that work**. Preserve the product and its operational documents. Do not introduce Infinite Website motion/UI requirements into digital-card checkout, order, template or SEO functionality.

## Conflict policy

For the Infinite Website, the North Star v1.2 overrides older Genezisi V2 (“The Signal”), original flagship four-act/doorway, dated prototype notes, generic design recipes, and any card-only editor rules. Historical documents remain valuable as implementation/evidence records, not forward instructions. For live route/API facts, inspect source and the served environment; never infer from a previous design memo.

**No production or integration claims from a static preview.** Explicitly distinguish planned, implemented, tested, visually approved and shipped. Record the last confirmed commit and unresolved blockers.

## Expected reporting

For a coding gate: identify touched files, preserved boundaries, checks actually run, stills/recordings and device limitations, remaining defects and whether founder sign-off exists. Before the next gate, wait for the founder's visual decision. Prefer a polished small increment over a partially implemented full story.
