# Genezisi V2

Status: implementation prototype under review on PR #4. Production `main` is not replaced.

## North star

**Impress → Prove → Contact**

Build a dark, cinematic, founder-led Genezisi website with one clear Signal story, real work, concrete capabilities and a direct message path.

## Current architecture

- **Desktop:** one bounded GSAP / ScrollTrigger sequence with the Signal and its route in the same SVG coordinate system.
- **Mobile:** native document scrolling, threshold-triggered chapters, compositor-friendly transitions and no GSAP runtime.
- **Reduced motion:** complete static six-state story.
- **Below the hero:** editorial Selected Work, Websites / AI systems / Automation, one small Genezisi Lab interaction, founder positioning and direct contact.

## Documents

- [Research and creative direction](./research-and-creative-direction-2026-10-04.md)
- [Creative & experience specification v0.1](./creative-experience-spec-v0.1.md)
- [Implementation roadmap](./implementation-roadmap.md)
- [Current implementation audit](./current-implementation-audit.md)
- [Execution status](./execution-status.md)

## Merge gate

Do not merge merely because the code builds.

Before production cutover, verify the rendered preview on real mobile hardware, including iPhone Safari and a mid-range Android, with slow scroll, aggressive flicks, reverse scrolling, orientation changes and reduced motion. English and Georgian must both receive a visual pass.
