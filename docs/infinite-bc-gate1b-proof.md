## Founder-approved third-card → C spatial handoff — 29 October

**Founder review:** Latest desktop video confirmed that the entrance and B-to-third transition are worth preserving. The remaining problem was C arriving as a low-contrast, unrelated crossfade over the third card. Founder authorized this next focused construction, with no merge/deploy until actual visual review.

**Implementation (motion.js + entrance.css only):**
- Keep first intro push, B pause/approach, solid architectural room, reading copy, native scroll map, and final C's layout/typography unchanged.
- After the third reading plane has fully settled, it **folds about its left edge** and recedes in Z (story p≈.655–.712). Existing architectural folding surfaces are given solid green materials and meet behind it.
- C is an **opaque stage**, exposed by a clip aperture rooted at the settled third plane's left edge, growing to full viewport (p≈.665–.709). The dark background never appears by globally fading in over still-readable cream typography. The aperture is computed from untransformed `.reading.offsetWidth/offsetHeight` and viewport dimensions; deterministic for jumps, reverse, resizing.
- C's actual editorial content remains hidden until the aperture is **fully open**; visible with a short fade-and-vertical-resolve at p≈.709–.746. This specifically prevents a cropped or dim C headline at intermediate sizes.
- The cream reading remains solid while it turns, and becomes inert by p>.75; the C links become focusable at p≥.75. Reduced-motion/static mode retains normal readable sections, without the clip or fold.
- No extra new story cards, shader assets, Three.js, scroll prison, automatic advancement, main integration or C/SelectedWork redesign.

**Technical checks:** JS syntax valid on the authored branch. An **isolated local Chromium reconstruction** sampled 184 forward and 184 reverse scroll states over eight viewport sizes (1690×900, 1440×900, 1366×768, 1024×768, 768×1024, 390×844, 360×640, 320×568). No modeled horizontal overflow, invalid transform values, jump/reverse mismatch, or JS runtime errors; eight reduced-motion static-mode checks passed. Desktop/mobile contact sheets and QA metadata are in `Genezisi_C_Handoff_Review_2026-10-29.zip` attached in the founder chat.

**Explicit limit:** Browser evidence uses a **partial reconstruction** of the prototype; it is not the full GitHub route with the exact 21 KB stylesheet. The complete actual tunnel must be refreshed to the PR tip and reviewed for timing, card-front visibility, typography on small devices, performance, and seamlessness into Selected Work. Founder art acceptance pending. **PR #15 remains draft; no merge or deployment.**

## Pacing and actual 3D-depth correction — founder video 14:23 (29 October)

**Founder requirement:** Native scroll should feel like one fluid, user-directed motion. Fully settled cards are natural places to **stop and read**, not long compulsory stretches of otherwise static scrolling. Critically, do **not** diagnose apparent pace from a touchpad recording alone: the code's normalized progress controls motion; the video shows scroll input, not prescribed duration. Also keep refining the B-derived architectural space, without restarting the opening or C composition.

**Measured existing behavior:** At `height:440svh`, the journey's effective scroll distance is about 3.4 viewports. The full B static window `story p=.20–.32` previously required 0.12 × 3.4 = **0.408 viewport heights** of scroll; the third card's settled pre-fold `p=.56–.62` required about 0.06 × 3.4 = **0.204 viewport heights**.

**Implementation (this increment only):**
- Introduced a monotonic, piecewise-linear **native-scroll → existing story-progress** mapping in `motion.js`. No wheel event interception, autoplay, snapping or sticky hold trigger. All authored poses and scene content remain as before; stopping a scroll at any frame freezes that frame, and reverse traversal is deterministic.
- Full B's raw static range is now **0.20–0.24** (0.04 × 3.4 = **0.136 viewport heights**, a 67% reduction); the third reading card's settled pre-fold raw interval is now **0.48–0.505** (0.025 × 3.4 = **0.085 viewport heights**, a 58% reduction). The first intro proximity-push trajectory stays untouched through 0.20, and the final C pose and its outer handoff remain unchanged.
- B's content and its header/footer fade out slightly earlier (story progress 0.408–0.429) as the new chamber material opens, reducing leftover ghost typography without fading the green facade itself.
- Removed `overflow:hidden` from `.room-architecture` while retaining `transform-style:preserve-3d`. This overflow property was forcing its depth children to flatten; the outer `.depth` layer still clips the viewport. This is grounded in the CSS 3D grouping-property behavior in the MDN `transform-style` reference: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-style
- Updated **only the background behind B** during its camera approach to an evergreen radial gradient, so the approach inherits B's material color instead of traversing a neutral gray wash.

**Recorded video findings:** The founder's 63.8 s screen recording demonstrates the same intended order (intro, B, room, third plane, C), including reverse scrubbing; absolute recording times are not evidence of mandatory scroll distance. The room's near/far depth and mid-transition still need proper full-route review. The current C crossfade remains a later concern; do not claim that the entire cinematic site is visually approved.

**Validation, limitations:** A Chromium **isolated reconstruction** checked **168 scroll samples across six viewports**, with no detected scroll-width overflow/nonfinite state; repeated reverse seeks and reduced-motion static fallback passed. After the last CSS and text adjustment, a **30-sample smoke pass at desktop 1440×900 and portrait 390×844** passed. One attempted second full screenshot sweep timed out, and is *not* a passing test. Screenshots and metrics are in the founder chat artifact `Genezisi_Pacing_and_3D_Review_2026-10-29.zip`. These use **partial reconstructed HTML/CSS**, not the complete published prototype/tunnel. User must review the updated tunnel, actual physical mobile and browser behavior, legibility, third surface and C exit. Keep the PR draft, no merge/main/deploy/preview branches.

## Founder-authorized architectural correction — full B → 3D chamber → complete third plane (29 October)

**Context:** Founder reviewed the latest 19.5-second tunnel recording and approved fixing the visually weak B-to-third transition. The entrance was considered good and must not be reworked. Defects: faint side geometry, third text fragments appearing before the card surface, old B header/footer and content competing behind the third card, and a flat/modal feel.

**Code changes** (only `public/flagship-journey/infinite-bc/index.html`, `motion.js`, and `entrance.css`):
- Built a minimal, authored **site-derived chamber** within the existing `.depth-space`: solid evergreen left/right architecture, perspective ceiling/floor and nested structural frames. The two existing B backing sheets still unfold into the side planes and the existing rails remain. This is restrained 2.5D/CSS geometry, not a new 3D engine or unrelated visual theme.
- Kept the initial proximity-triggered push, centered B read hold (`p=.20–.32`), and viewport-fitted camera approach (`p=.32–.41`) unchanged.
- The portal aperture is now calculated from the **actual transformed B face bounds**, expanding first to those proportions (`p=.415–.47`), then to the whole viewport (`p=.47–.515`). This prevents the former narrow viewport-shaped slit from appearing disconnected from B on portrait mobile. The facade remains opaque until it is occluded.
- B's original title/footer labels **and** column typography retreat and vanish by approximately `p=.445`, before the third plane becomes visually present. Green materials are never faded.
- The existing third card (unchanged authorial copy) is rendered as a **whole, distant surface** beginning around `p=.452` desktop / `p=.462` portrait; it moves along the same depth axis (`p=.46–.56`). An inner `.reading-ink` wrapper makes its real text readable only once the surface has become large (`p=.507–.543`). No isolated letter fragments precede the card.
- Fixed a discovered **reverse-scroll defect**: applying camera variables *before* measuring `getBoundingClientRect()` makes the mask geometry deterministic rather than dependent on the previous scroll sample. No wheel hijacking or timers.
- Left the later C/fold, Selected Work proof area, wording and scope untouched. Static/reduced-motion path shows the existing ordinary readable sections; the new architecture is only active in motion mode.

**Local evidence and checks:** Isolated browser mirror based on a **subset of the original CSS and simplified markup** (not the full source route). After the geometry fix, 64 progress-position snapshots across 1440×900, 1024×768, 390×844 and 320×568; 60 forward/reverse/repeated-seek assertions; four reduced-motion checks; all passed. No obvious initial B opacity loss, header remnant at p=.45, early third-card text, final third-card legibility failure or horizontal overflow in the mirror. `node --check` passed. Desktop/mobile contact sheets and measurements in the founder-chat attachment `Genezisi_B3_Architectural_Entry_Review_2026-10-29.zip`.

**Limitations:** These frames are **NOT screenshots of the complete original served app**. Actual tunnel and full original CSS, hardware performance, C handoff and selected-work integration must still be inspected. This is a founder review candidate, **not approval**. Keep PR #15 in draft. **Do not merge, deploy or push to main/preview branches.**

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

## Architectural B-to-third entry — focused Gate 1b next increment, 29 October

**Founder direction:** The entrance motion is generally satisfactory. The green B interface should remain a stable point of reference after the initial camera approach; its visible side cards should unfold into a convincing **site-derived 3D environment**, and the **third content plane should begin appearing sooner** so scrolling does not spend too long on an empty green composition. The third plane approaches only **after** the camera has settled. The intended final aesthetic is sophisticated and spacious, not a portal or a separate floating modal.

**Implementation on the same draft branch:**
- Keep the existing centered intro/proximity-triggered push, fully readable B hold `p=.20–.32`, and viewport-fitted zoom cap.
- Camera approaches B during `p=.32–.41`, then becomes stable before the third readable plane approaches.
- Transform the two existing backing `.sheet` elements into opposite, solid side wings `p=.345–.445`; material accents match B's green.
- Keep the existing depth rails but give the side surfaces actual opaque material, legible structural divisions, and less offscreen displacement so near/far geometry remains visible. These originate from B's layered interface instead of unrelated objects.
- The existing B text columns retire sideways `p=.42–.495`, progressively clearing the center **without fading the parent green facade**. This prevents two full-size readable text layers competing.
- Use the existing `.reading` DOM, not cloned typography. It begins emerging as a distant Z plane around `p=.432`, advances forward `p=.43–.54`, and becomes the central readable surface. The existing center-depth occlusion expands `p=.42–.54`, completing the transition without a fully transparent B card.
- No new Gate 2 content, fabricated dashboards, invented third-card copy, C rework or production integration.

**Local technical evidence:** isolated Chromium reconstruction, updated with the new entrance/geometry and a **subset of the original stylesheet and HTML** (not the full original served route), 41 normalized scroll positions at eight viewports = **328 samples**. No detected entrance B/intro collisions, full-B premature transparency, B viewport clipping, reduced-motion failure, or reversible state discrepancies. JS syntax check passed. Desktop and portrait contact sheets and all sample measurements are in the founder review attachment `Genezisi_Gate1b_Spatial_Entry_Review_2026-10-29.zip`.

**Limitations / explicit pending decision:** the newer structural panels and foreground approach require founder review on the actual PR #15 tunnel, which must point to the newest commit. The interior still uses the original reading card; its integration and ultimate 3D art direction are **not** declared complete or accepted. Real route build/performance/mobile hardware/selected-work seam/C scene not retested. Keep PR draft; do not merge or deploy.

## Camera-fit correction from founder's 16:37 recording — 29 October

Founder observed that the apparent speed of the initial push can vary with touchpad scroll input. **Do not diagnose this as a timing defect solely from recording duration:** the entrance remains a deterministic function of native scroll progress (`arrival=smooth(.012,.20,p)`), with text displacement gated by the actual incoming interface edge and a measured gap. The code uses neither a time-based transition nor a forced scroll speed.

The same recording shows a **separate confirmed geometry problem**: the green face was magnified by a hard-coded **2.25×** on top of the already-expanded centered B scale. On 1440×900 reference captures, the settled green face is approximately 914×644 CSS pixels, so 2.25× would overflow the viewport substantially. Founder wants the camera to stop when the green face nearly fills the viewport, preferably with some remaining structure visible for 3D depth.

**Only correction in this pass:** the previous fixed camera multiplier is replaced with a DOM/viewport-based cap. The maximum close-up scale is computed from the *actual* untransformed `.site-window` width and height, the settled interface scale, and the viewport dimensions, leaving horizontal and vertical margins; the camera still samples the same smooth scroll range p=.32–.52. An internal development sample hook reports the same fitted zoom. The proximity push, opaque transition, subsequent scene and its timing are otherwise untouched.

**Verification:** GitHub post-commit source inspection and JavaScript parser check passed. Visual reference is the founder's 92-second screen recording and the earlier isolated p=.32 browser screenshot. The revised geometry **has not** yet been verified in an actual served browser at this commit; no claimed cross-browser/mobile/physical-device proof or visual founder acceptance. The recording has a non-silent audio stream, but no reliable speech transcription was available for this review. **Do not infer additional spoken instructions or treat this as full Gate 1b acceptance.**

## Newest founder refinement — proximity push and camera-first B entry (29 October)

The founder further clarified the entrance: **first-card text must stay still until the incoming B panel gets close enough to push it**. Once the intro has moved away and B is fully centered, the **camera must advance closer to B while its green surface stays solid**; only after B becomes significantly enlarged should the third/interior geometry emerge. The prior right-to-left opaque depth wipe was explicitly rejected as a different effect. **This latest requirement supersedes the wipe experiment described below.**

**Implementation:** Both desktop and portrait mobile compute proximity from the incoming panel's actual screen-space leading edge relative to the initially stationary intro. The intro displacement stays exactly zero until the incoming panel reaches a visible gap; the same edge then determines the displacement, preserving non-collision and fully exiting by p=.20. The existing full-B reading interval remains p=.20–.32. From p=.32 onward B enlarges toward the camera while still rendered at parent opacity 1, reaching approximately 2.25× stack scale by p=.52. The deeper surface reveals through a growing **centered opaque aperture** only from p=.46–.56; the opening is removed after the aperture has filled the viewport. No right-to-left wipe or early crossfade. The existing deeper rails/fold/C are preserved, not polished or approved by this increment.

**Local validation:** 272 scroll states (34 positions × 8 desktop/tablet/portrait mobile viewport sizes), with no intro/panel collisions, a stationary intro at early approach positions, full B stationary p=.20–.32, full B opacity preserved during the approach, and deterministic reverse seek. Headless Chromium screenshots of the entrance/camera approach at 1440×900 and 390×844 were captured from the **isolated opening reconstruction** with the local motion and entrance files; `node --check` passed. The preview tunnel, original full CSS served route, devices, and later journey still require testing. **Founder visual acceptance pending; no merge or deploy.**

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