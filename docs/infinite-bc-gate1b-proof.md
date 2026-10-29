# Genezisi Infinite Website — Gate 1b / B → C spatial proof

**Prepared:** 29 October 2026. **Updated:** 29 October 2026 for the centered-opening first increment. **Status:** interactive opt-in development proof, **not founder visual acceptance**, **not the complete Gate 1b**, and **not production integration**.

## Approved art direction

The founder explicitly selected **B → C**: start with a centered introduction, let Interface Strata enter from the right and push the introduction left, hold a fully readable B composition, then travel **forward through site-derived geometry**, emerge in a distinct Typographic Architecture (C) composition, then **continue downward normally** to discover the studio's actual work. No second hero, reverse-only return, new portal, AI enquiry narrative or mandatory play-to-contact requirement.

This stage implements and tests the **visual and interaction mechanism** in a self-contained route. The original source of truth remains the existing Next.js homepage's `SelectedWork` component. The preview's `#work` uses **source-verified project names and real external project URLs**, but it is **not** that React component; the true Next.js seam still needs integration and founder review. This distinction is a pass/fail boundary, not a minor footnote.

## Files

- `index.html` — first-frame motion bootstrap and stylesheet link; existing opening B, middle reading plane, C editorial reveal, Work preview and service section are preserved. Real `#work` and `#capabilities` anchors; original WhatsApp CTA unchanged.
- `styles.css` — **unchanged** original page/plane geometry, perspective, C reveal, skip/focus, and fallback rules.
- `entrance.css` — isolated desktop horizontal push, mobile vertical entrance, first-frame centering and narrow-screen B text-fit corrections.
- `motion.js` — preserves the original sampler, deep geometry, fold/C values, coalesced native scroll, reverse determinism, resize and inert management; adds deterministic entrance progress/offsets and delays the original depth start until after a full B reading window.
- **Evidence inventory correction:** `capture.py`, `qa.py`, `record.py` and an `infinite-bc/evidence/` directory **do not exist in this verified commit**. Previous references to checked-in scripts, captures and recordings were inaccurate. Do not rely on or cite them as repository evidence.

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

**First-increment entrance timeline (normalised progress):** centered opening at `0`; interface and introduction move together from `.012–.20`; complete B is held at `.20–.32`; original depth starts at `.32`, with its remainder and the future C work preserved for subsequent review. Full-journey timing is still provisional. No independent clock/tween; every fractional position is reversible.

**User flow:** `centered intro → right-hand interface pushes into B → full B hold → existing threshold/interior/fold/C prototype → #work preview`. Scrolling backward retraces progress.

## Verification and evidence status — first increment only

**Source inspection:** GitHub verified that the original HTML, CSS and scroll-motion logic exist at `public/flagship-journey/infinite-bc/` in base commit `722d78a312e336dde7dad39fa3f4d36aea1f0f0c`. Existing 3D/depth/fold/C markup and its `styles.css` were preserved.

**Checks actually performed during this increment:** `node --check` on the new `motion.js` source; headless Chromium with Playwright `page.set_content` over a **local opening-only reconstruction** containing the preserved opening markup and relevant original CSS selectors plus the new `entrance.css` and `motion.js`. Tested scroll positions `0, .045, .105, .16, .20, .27, .32` at `1440×900`, `1366×768`, `390×844` and `320×568`. The local test recorded browser bounding boxes and horizontal-overflow flags; narrow mobile initially exposed clipping in B, leading to a CSS grid-minimum correction. **These are isolated prototype captures, not full-repository served-route validation.**

**Evidence storage:** Captures and a JSON-lines measurement log were created as **conversation artifacts**, not committed to a repository `evidence/` directory. Do not claim that videos, production/browser route captures or missing Python QA scripts were checked into Git. This stage still needs a real served-route review of the committed branch, reverse-scroll and reduced-motion checks against the full original CSS, hardware testing, and founder visual acceptance.

**Not run / not established:** `npm install`, full Next.js build, typecheck/lint of the full repository, production integration, cross-browser or physical-device testing, video capture, performance/FPS measurements, and localized route visual checks. None of those are implied by these static-source changes.

### Follow-up defects / acceptance blockers

1. **True app integration:** render the B→C journey only on an explicit opt-in route/flag within the real Next.js homepage, retain the existing `SelectedWork`, `Capabilities`, header, locale controls and footer, and make C→real Work an uninterrupted seam. Do not merge the standalone preview as the production homepage.
2. **Visual acceptance:** founder must review forward/backward recording and still frames, especially the nested-window risk at B, page-derived depth, illumination at entry, fold geometry, and the transition into C. Test realistic scroll speed/stop points on hardware before declaring this visually polished.
3. **Cross-browser & device:** real served build, iOS Safari and weaker Android; reduced motion with keyboard and screen reader; 320px short-viewport optical centering; `en`, `ka`, `nl` long strings and actual locale routing.
4. **Performance:** profile compositing and scroll frame times with representative devices. No synthetic `60 FPS` claim.

**No WebGL, backend actions, live AI, actual appointment booking, fake testimonials, main deployment, `preview-*` branch or production merge.**

## Reviewer instructions

Open `public/flagship-journey/infinite-bc/index.html` on a local served route with `styles.css`, `entrance.css` and `motion.js`. Scroll normally through B into C, then below C into the preview Work section. Scroll backward. Try `Explore our work`, `Start a project`, the navigation links, and browser reduced motion. There is **no checked-in evidence folder** for this proof. Use the separately supplied first-increment headless Chromium stills and measurements, and review the actual branch in a browser before visual acceptance. Compare at 1440×900 and portrait 390×844; 320×568 is a small-height stress case. Report any ambiguous or visually weak frames. **Stop at founder review**; do not expand into Gate 2 enquiry content.