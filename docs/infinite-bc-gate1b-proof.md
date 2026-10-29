# Genezisi Infinite Website — Gate 1b / B → C spatial proof

**Prepared:** 29 October 2026. **Status:** interactive opt-in development proof, **not visual acceptance** and **not production integration**.

## Approved art direction

The founder explicitly selected **B → C**: start with Interface Strata, travel **forward through site-derived geometry**, emerge in a distinct Typographic Architecture (C) composition, then **continue downward normally** to discover the studio's actual work. No second hero, reverse-only return, new portal, AI enquiry narrative or mandatory play-to-contact requirement.

This stage implements and tests the **visual and interaction mechanism** in a self-contained route. The original source of truth remains the existing Next.js homepage's `SelectedWork` component. The preview's `#work` uses **source-verified project names and real external project URLs**, but it is **not** that React component; the true Next.js seam still needs integration and founder review. This distinction is a pass/fail boundary, not a minor footnote.

## Files

- `index.html` — semantic opening B, middle reading plane, C editorial reveal, Work preview, and ordinary lower service section. Real `#work` and `#capabilities` anchors; verified WhatsApp intake CTA.
- `styles.css` — responsive page and plane geometry, 3D perspective, editorial C, skip link, keyboard focus, no-JavaScript and reduced-motion layouts.
- `motion.js` — one timeline sampler, pure `sample(progress,width)` geometry, requestAnimationFrame-coalesced native scroll input, reverse determinism, viewport resizing, and inert states for offscreen semantic content.
- `capture.py`, `qa.py`, `record.py` — local Chromium QA scripts; `evidence/` — browser screenshots, review sheets, and scroll walkthrough videos.

## Geometry / identity map

| Identity | B opening | Forward entry and middle | Forward fold and C end |
|---|---|---|---|
| PageFrame | Light editorial homepage | A single viewport/perspective rooted in B's grid | Dark, typographic C; original site vocabulary survives |
| CentralAperture | Negative space beside B's service structure | One stable central HTML reading plane | Resolves into centrally aligned C copy; no replayed opening headline |
| LeftPlane / RightPlane | Two edges and subdivisions of B's right structure | Near and far planes travel at different rates in Z and X | Two sash planes flatten and align toward C's grid columns |
| FrameLines | Rules, divisions, paper edges | Horizontal and vertical recession lines | Regular C column rules / page borders |
| SurfaceMaterial | Warm paper and deep forest | Same forest/mint family with deeper light | Dark editorial field with pale type and subtle grid |
| ContentStage | Live semantic opening | Readable, accessible central message | Distinct C statement: “Made to be seen. Built to work.” |
| Navigation | Real Work, Services and WhatsApp links | Header stays clickable through entire timeline | Same clickable header + distinct C→Work link |
| WorkSeam | The `#work` destination is available immediately | No fake projects inside the cinematic environment | Native sticky release into a **preview** of existing project identities; production React seam pending |

**Timeline hypotheses (normalised progress):** K0 0–0.12; entry 0.12–0.39; reading hold around 0.4–0.62; distinct fold 0.62–0.90; C at 0.93–1; normal scroll into Work immediately thereafter. No independent clock/tween. Pause and reverse are valid at every fractional value.

**User flow:** `B → threshold → readable interior → forward reassembly → C → #work`. Scrolling backward reverses the *entire* path, not just the opening.

## Verification in this environment

Chromium via Playwright `page.set_content` of the *same HTML, CSS and JS* inlined in memory; local browser navigation/deployment were not available, so this is **not a served-route test**. Headless stills at 1440×900, 390×844 and 320×568. Reduced-motion and disabled-JS tests use native nonsticky sections. A separate test exercises 11 scroll samples per viewport: 33 samples with zero horizontal overflow, clickable header CTA, correct semantic inert behaviour, and working native jump to Work; additional tests exercise reverse deterministic sampling and rapid reset. Desktop and mobile wheel walkthroughs provided as available. Physical iPhone/Android, Safari, Firefox, screen reader, production hydration, multilingual rendering and FPS on low-end Android are **not yet verified**.

### Follow-up defects / acceptance blockers

1. **True app integration:** render the B→C journey only on an explicit opt-in route/flag within the real Next.js homepage, retain the existing `SelectedWork`, `Capabilities`, header, locale controls and footer, and make C→real Work an uninterrupted seam. Do not merge the standalone preview as the production homepage.
2. **Visual acceptance:** founder must review forward/backward recording and still frames, especially the nested-window risk at B, page-derived depth, illumination at entry, fold geometry, and the transition into C. Test realistic scroll speed/stop points on hardware before declaring this visually polished.
3. **Cross-browser & device:** real served build, iOS Safari and weaker Android; reduced motion with keyboard and screen reader; 320px short-viewport optical centering; `en`, `ka`, `nl` long strings and actual locale routing.
4. **Performance:** profile compositing and scroll frame times with representative devices. No synthetic `60 FPS` claim.

**No WebGL, backend actions, live AI, actual appointment booking, fake testimonials, main deployment, `preview-*` branch or production merge.**

## Reviewer instructions

Open `index.html` in a browser alongside `styles.css` and `motion.js`. Scroll normally through B into C, then below C into the preview Work section. Scroll backward. Try `Explore our work`, `Start a project`, the navigation links, and browser reduced motion. The `evidence/` folder contains `desktop-contact.png` and `portrait-contact.png`, the intermediate quarter-frame images, and desktop/mobile walkthrough recordings. Compare at 1440×900 and portrait 390×844; 320×568 is a small-height stress case. Report any ambiguous or visually weak frames. **Stop at founder review**; do not expand into Gate 2 enquiry content.