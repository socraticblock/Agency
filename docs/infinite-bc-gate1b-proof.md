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

**Current entrance timeline (normalised progress):** the opening text/body/CTAs start centered at `0`; from `.012–.20` B arrives from the right while the entire intro is displaced **fully out of the left edge** (on mobile, fully above the viewport). B now settles **alone**, larger and centered, with opaque green surfaces and higher-contrast supporting captions. Its fully composed keyframe is held from `.20–.32`; the existing future depth/C prototype still starts at `.32` and was not redesigned. The entrance samples native scroll and viewport layout synchronously, resampling on scroll, resize, fonts-ready and pageshow. All states are reversible. No forced timed pause or autoplay.

**User flow:** `centered intro → right-hand interface pushes into B → full B hold → existing threshold/interior/fold/C prototype → #work preview`. Scrolling backward retraces progress.

## Focused corrective pass — opaque B-to-depth handoff (29 October)

**Founder feedback:** the enlarged centered B now looks closer to the requested entrance, but its readable green surfaces and the following scene became semitransparent and layered over one another after the full-B hold. This was caused by `--b` reducing the **entire opening parent's opacity** while `--d` increased the depth scene opacity.

**Corrective implementation:** retain the whole B at opacity `1` until a solid right-to-left site-colored depth layer has covered the viewport. The new `--depthMask` is a deterministic rectangular occlusion sampled from p=.32–.44; the depth layer itself stays opaque while clipped, and B hides only after the cover completes. Defer magnification of B until the visual cover is nearly complete; introduce the existing interior reading content after the cover. The unchanged full-B hold remains p=.20–.32. This **removes the previous two-layer transparency artifact** but is **not** acceptance of the later spatial journey or its floating-card aesthetics.

**Verification limitation:** new local headless Chromium isolated-opening reconstruction sampled **85 states** (17 progress values × five desktop/mobile viewports: 1690×900, 1440×900, 1366×768, 390×844, 320×568). Verified B opacity remained 1 through the early cover, the depth scene remained opaque while clipped, and the new interior appears after occlusion; `node --check` passed. Reduced-motion kept the static path. These are not served-route or device tests; the revised tunnel branch still requires actual browser inspection. **No main/preview deployment or merge; Gate 1b remains unapproved.**

## Superseding visual requirement — founder clarification, 29 October 2026

The founder reviewed the actual PR #15 tunnel route and specifically rejected ending with the original introduction still in the left column. **The first copy must be pushed out of sight completely**. On a large desktop screen, **one fully opaque, expanded green Interface B** must occupy the center with readable text and labels. On portrait mobile, the introduction moves upward out of view and B becomes the central subject. Both arrive via a shared, geometry-derived native-scroll path rather than separate unrelated slides.

This is **an intentional change to the finished B composition** from the historical two-part B layout. The superseding requirement was propagated into the controlling North Star v1.2, visitor flow and acceptance gates on this same development branch. The underlying 3D/depth, fold, C and real-site integration remain future tasks.

**Current implementation:** intro exits at p=.20 and becomes inert; panel's decorative `aria-hidden` switches off while it is the sole readable B content and is restored when opening exits; header links remain accessible. The green window and sheets are opaque. Desktop final size scales from actual viewport and panel dimensions, capped for viewport width/height; the mobile panel centers vertically. The original scene/material CSS and deeper 3D/C logic are unmodified.

**QA performed (local reconstruction only):** 88 sampled states = 11 positions on eight headless Chromium viewport sizes (1440×900, 1690×900, 1366×768, 1024×768, 768×1024, 390×844, 360×640, 320×568). At measured states p=.20, .26, .32: opening opacity 1, panel within viewport, intro entirely out of view; no intro/panel box collisions across the entrance, and p=0 centered on each screen. Additional desktop/mobile reverse seek verified restoration of centered intro, `inert` and `aria-hidden`; separate no-JS/reduced-motion checks retained normal static content. Local modified JS passed `node --check`.

**Evidence limitation:** the browser test used the reconstructed opening, the real committed `entrance.css`, and the same functional entrance logic as the committed JavaScript, alongside a **subset** of the original `styles.css`. It was **not** served from the complete Next.js checkout or checked on physical devices. The actual tunnel must refresh to the latest commit before founder review; earlier videos reflected commit `3af96f8`, not the new full-push candidate. Founder sign-off remains pending.

## Founder decision and next milestone boundary (29 October)

The founder has asked to finish and review **only the opening / entrance into full B**, then continue through the planned journey **part by part**. This supersedes any suggestion that all of B→C should be polished or Gate 2 narrative scenes should be built in the same development pass. The existing North Star v1.2 and Visitor Flow v1.2 remain authoritative; their later acts are preserved in planning, **not authorized for implementation now**.

**Entrance review checklist (current):** opening starts centered with no B visible; incoming B moves intro entirely out of view (left desktop, up mobile) without collision; B is an enlarged, **single centered opaque readable composition** with a fixed p=.20–.32 scroll range; reverse scroll restores original intro; navigation Work/Services/Contact remain available, offscreen intro links are inert; reduced motion and no-JS retain normal content. Founder visual sign-off is still required. **Do not merge, deploy, mark Gate 1b accepted or begin deeper geometry/C work on the basis of this PR.**

## Verification and evidence status — first increment only

**Source inspection:** GitHub verified that the original HTML, CSS and scroll-motion logic exist at `public/flagship-journey/infinite-bc/` in base commit `722d78a312e336dde7dad39fa3f4d36aea1f0f0c`. Existing 3D/depth/fold/C markup and its `styles.css` were preserved.

**Checks actually performed during this increment:** `node --check` on the new `motion.js` source; headless Chromium with Playwright `page.set_content` over a **local opening-only reconstruction** containing the preserved opening markup and relevant original CSS selectors plus the new `entrance.css` and `motion.js`. Tested scroll positions `0, .045, .105, .16, .20, .27, .32` at `1440×900`, `1366×768`, `390×844` and `320×568`. The local test recorded browser bounding boxes and horizontal-overflow flags; narrow mobile initially exposed clipping in B, leading to a CSS grid-minimum correction. **These are isolated prototype captures, not full-repository served-route validation.**

**Additional entrance polish check (29 October, local isolated reconstruction):** measured 33 progress values from p=0 through p=.32 at 1440×900, 1366×768, 768×1024, 390×844, 360×640 and 320×568 in headless Chromium. Across these **198 sampled states** there were no intro/interface rectangle collisions, all p=.20–.32 measurements matched the complete-B positions, the start state restored after reverse seeking, and the interface remained in-viewport at the settled keyframe. Earlier checks covered no-JS and reduced-motion fallback. The newly edited JavaScript passed `node --check`. These checks used an **opening-only reconstruction**; the original 21 KB `styles.css` was not run as part of a full served Next.js checkout. They do **not** establish visual acceptance, real device behavior, overall performance or end-to-end app integration.

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