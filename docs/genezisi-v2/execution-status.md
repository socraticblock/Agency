# Genezisi V2 — Roadmap Completion Status

**Date:** 4 October 2026  
**Branch:** `genezisi-v2/planning`  
**Production `main`:** untouched  
**Launch:** requires explicit owner approval

## Implemented

- Research, creative direction, experience specification and codebase audit.
- Isolated, noindex V2 route for English and Georgian locale paths.
- Signature Signal narrative: Receive → Route → Review → Resolve.
- Desktop sticky scroll story (~360svh): dominant website surface shifts/scales/tilts to reveal the operational layer; understanding, useful action and owner review are progressively exposed.
- Mobile re-authored as six sequential full-viewport story states instead of a squeezed desktop composition.
- Reduced-motion handling removes the decorative moving Signal while preserving the complete readable story.
- Selected Work redesigned as large editorial project moments using existing Genezisi portfolio references.
- Capabilities repositioned to Websites / AI systems / Automation.
- Genezisi Lab explicitly labeled as an internal demonstration; no fabricated automation-client claims or performance metrics.
- Founder positioning: “Small by design.”
- Direct WhatsApp contact with broadened intake copy.
- Core Georgian V2 marketing copy added for the primary positioning/contact surfaces.
- V2 metadata broadened beyond website-only positioning.
- Keyboard focus treatment and skip-to-content navigation.
- Existing production homepage remains unchanged.

## Validation state

### Automated deployment/build
Vercel deployment is triggered for each branch commit. Final completion requires the latest commit to report success.

### Code-level accessibility
Implemented:
- semantic links and headings;
- visible keyboard focus for primary navigation, work links and contact CTA;
- skip navigation;
- decorative Signal hidden from accessibility tree;
- reduced-motion branch;
- touch-friendly primary CTA sizing.

### Performance decisions
Implemented by design:
- no mandatory hero video;
- no WebGL render loop;
- no Lenis dependency;
- motion uses transforms/opacity;
- portfolio screenshot remains a static local asset;
- mobile avoids the desktop sticky composition.

### Still requires external rendered/device evidence
These checks cannot truthfully be marked passed from repository code alone:
- pixel-level desktop review at 1280 / 1440 / 1728+ and short laptop height;
- pixel-level mobile review at 320 / 360 / 390 / 430;
- real iPhone Safari;
- real mid-range Android;
- scroll abuse: slow wheel, fast wheel, trackpad flick, reverse, scrollbar jump, reload mid-story, resize and orientation;
- rendered Georgian line-break/typography review;
- measured frame-rate / Core Web Vitals on deployed preview;
- final real founder photograph, if owner wants photography rather than the current abstract placeholder.

## Roadmap gate conclusion

The implementation roadmap is **code-complete on the protected V2 branch once the latest Vercel build succeeds**.

It is **not production-launch-complete** until rendered/device QA is performed and the owner explicitly approves the final preview. Production must not be merged merely to satisfy a checklist.

## Launch sequence after visual/device approval

1. Resolve any visual/device defects.
2. Verify English and Georgian routes, WhatsApp, work links, keyboard navigation and reduced motion.
3. Preserve/tag the current production rollback point.
4. Merge the approved V2 branch to `main`.
5. Smoke-test production.
