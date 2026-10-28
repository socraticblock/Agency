# Genezisi four-act hero — local review candidate

Date: 28 October 2026. Status: implemented for creative review; not approved or frozen.
Branch: feat/genezisi-hero-four-act-polish
Base: edab4cd0db9e43ebef963ecaf24e41c2d67e624b (restoration branch).

## Change

The former six opaque, horizontally clipped panels are replaced by one persistent editorial website, an underlying fixed-rule data route, an agent workspace, and a compact approval receipt. The original headline and navigation remain. Every section from Selected Work onward retains identical content after newline normalization; its existing choreography is unchanged.

The opening interface uses an original Genezisi studio concept, with no invented client claims or generated media. It separates and changes scale while the enquiry route appears beneath it. A request token travels along the mapped route; the CRM identifier appears as that destination is reached. The agent extracts intent and constraint from unstructured text, reveals its permitted read-only calendar tool, then concrete time options and a human review boundary. The original website returns to a larger composition with a simulated approval receipt, before native scrolling carries the visitor into authentic work.

The three services are explicitly available independently. All system actions are fictional, local and labelled. No external send, calendar creation, CRM write or model call takes place.

## Canonical native-scroll timeline

Progress is the hero's native scroll distance divided by its scrollable sticky range. There is no wheel interception, delayed progress loop, text replacement or clip-path wipe. Smoothstep curves derive all states directly from progress; reverse and fast jumps do not accumulate state. A single event-driven animation frame handles each scroll/resize update and stops when idle.

| Progress | Event |
|---|---|
| 0–.16 | Opening website and original positioning hold |
| .16–.30 | Website lifts and scales; opening copy leaves; automation narrative enters |
| .28–.42 | Enquiry token travels, validation registers, CRM identifier appears, owner notification is prepared |
| .42–.51 | Automation leaves as one group; persistent website anchors the change |
| .51–.59 | Agent workspace enters; message and extracted intent/constraint become readable |
| .60–.67 | Permitted tool call and Tuesday/Thursday options appear |
| .68–.78 | Draft awaits human review; sending and calendar creation remain blocked |
| .77–.88 | System recomposes; approval is explicitly simulated; approved draft is ready for manual delivery |
| .88–1 | Resolved website and receipt hold; selected-work link is available; final composition scales down slightly before native release |

Desktop hero: 420svh; mobile: 370svh. These allocate roughly 3.2 and 2.7 viewport lengths to the four acts. Short mobile scenes expand their working space gradually from 36svh to 44svh while the website shrinks further to preserve readable space. Short landscape uses an ordinary flowing opening. Reduced motion provides a static opening plus a visible written account of the complete simulation; no-script has a normal-length opening and ordinary anchors.

## Validation

- Baseline: 7 existing structural tests passed. Their assertions encoded the rejected six-card architecture and have been replaced.
- node --test tests/flagship-signature-hero.test.mjs: 5 passed. Includes 201 sampled timeline states forward and reverse at five widths, stable fast jumps, no simultaneous readable story headings, finite style values, focusability and approval boundaries, simulation claims, unchanged later content, and script syntax.
- npm run build: production build passed after moving stale generated Next cache out of the repository. Initial failures referenced routes removed on this feature branch, not hero source. Generated cache was preserved outside the repository.
- npm run typecheck: passed.
- npm run lint: no errors; 235 existing warnings in the repository on the initial run. Final run recorded in local work logs.
- git diff --check: passed (Windows newline conversion notices only).

Rendered with the local full-page build in Codex's Chromium-based in-app browser. Desktop four-act stills: 1440×900. Phone four-act stills: 390×844. Short-phone layout inspected at 320×568. Opening captures also taken at 390×667, 768×1024, 1366×768 and 1920×1080; no horizontal document overflow observed. Portrait-tablet type was constrained by both surface width and height after a clipped-title issue was found. Keyboard scrolling in both directions and the resolution's real Work anchor were exercised. TK Counsel's existing full-page preview and Selected Work were rendered during integration review.

## Limits / required follow-up before acceptance

- The owner's named video files and previous frame audit were unavailable in the supplied location; their contents were not independently reviewed. Baseline was inspected in the actual local full website.
- Screenshots are genuine viewport captures, not generated mockups. No complete desktop/mobile screen recording was captured. Sampled screenshots and source tests do not prove smooth frame timing.
- No browser performance trace, field CWV, INP, CLS, measured FPS or physical-device claims. No Firefox, iOS Safari or Android device run. Touch momentum, trackpad, actual 200% zoom, OS text enlargement, screen-reader speech, reduced-motion rendering and script-disabled rendering still need dedicated testing; fallbacks have source coverage only.
- Review the small supporting labels on short phones and the duration of holds with real touch input. The main actions remain legible; metadata is intentionally secondary.
- The new first-screen editorial surface has no independently interactive simulated controls; its narrative interaction is scrolling and its responsive layout. Further interaction art direction may be warranted after owner feedback.
- Creative quality and the resolution-to-portfolio composition require owner review. This checkpoint makes no claim of final aesthetic acceptance.

## Scope and release

Changed: public/flagship-journey/index.html, signature-hero.css, journey.js; tests/flagship-signature-hero.test.mjs; this review record. No new runtime dependency or raster asset. No later-site copy or layout edit. No push, production change, deployment, merge, preview-branch push or freeze.

## Follow-up owner-directed art-direction pass (28 October 2026)

**Input:** owner's latest 12:30 recording review and explicit request to implement refinements **on this existing branch**. This pass builds on Codex's four-act version; it does not establish an alternate site or change Selected Work and later chapters.

### Creative changes

1. **Architectural unfolding.** Added the `system-depth` stack beneath the *same* editorial site surface: three graduated planes identify experience, structured input and connected business systems. A vertical illuminated spine visually joins the layers. The website moves into a smaller upper layer while these planes become visible; the fixed-rule route appears as the connected lower surface. The interface should no longer feel like a different unrelated dashboard appearing behind the website.
2. **Explicit automation exchange.** The existing enquiry token and 3-step rail remain. A small **WEBSITE → BUSINESS TOOLS** indicator explains what the transfer represents. The flow remains deterministic and makes no real CRM write.
3. **AI tool-return event.** The permitted `calendar.read_availability` row now connects visually to the returned options through an animated relay/pulse. The interface distinguishes reading availability from sending a message or creating an event. The latter operations remain blocked.
4. **Human boundary.** The proposed reply reaches a strongly differentiated amber review gate with **SEND BLOCKED / CREATE BLOCKED**, not a claim that approval happened automatically.
5. **Physical resolution.** Replaced the small floating approval receipt with a full editorial ivory composition that visually takes over the same physical object. It joins **Experience → Connection → Intelligence** and states that an owner approved the illustrative draft for **manual delivery only**; no message was sent or booking created.
6. **Portfolio material handoff.** At the final native-scroll fraction, a shallow ivory background rises *behind* the hero objects to match the existing Selected Work section. The downstream section source is untouched.
7. **Reduce overlapping content.** The original browser surface now fades fully when the AI workspace becomes the focus, avoiding transparent competing text while the connected system foundation remains.

### Engineering and tests

- All changes are in `public/flagship-journey/index.html`, `signature-hero.css` and the `heroFrame` portion of `journey.js`; a modified structural test file covers the new elements and choreography. No application dependency or external asset added.
- Progress remains pure normalized native scroll, with eased stateless ranges. No wheel interception, artificial scroll lock or frame-dependent damping. All effects reverse with the user's scroll.
- New test coverage asserts original downstream sections remain byte-for-byte unchanged, spatial and tool-return DOM elements exist, permissions are described honestly and the phase scene values respond at expected normalized positions.
- An additional isolated, tool-side source check successfully parsed the hero JavaScript, checked matching HTML tags and CSS braces, and stepped 201 forward + 201 reverse states at each of six simulated viewport widths. **2,412 sampled states passed**, with no non-finite transform values, overlapping readable story headings or reverse-state mismatch. This is algorithmic/source verification, **not** an executed full repo test run or rendered-browser QA.
- The previously recorded full-build, lint and local-browser results in this document apply to Codex's **earlier** commit, not to the present amendments. They must be rerun before any visual approval.

### Mandatory visual acceptance

The owner must see the new hero in actual Chromium desktop and phone viewport recordings, not just code. Pay special attention to:
- 0–35%: browser scale and the reveal of physical depth layers. Confirm the panels read as one object and no text is clipped.
- 30–50%: token movement and 3-step workflow. The fixed-rule nature of automation must remain clear.
- 50–84%: the agent tool request/result and human gate, including the small short-phone variant. Confirm no visual ghosts or awkward pauses.
- 82–100%: the new ivory resolution occupies the former website footprint, then releases coherently into Selected Work. Validate readability and cream-to-cream handoff.
- Slow touch, trackpad and reverse scroll; no jitter/blank holds; reduced motion, keyboard, 200% zoom and iOS Safari must be checked.
- Capture stills at every act boundary and compare with the owner's recording. Do not claim premium creative approval, mobile performance, 60 FPS, cross-browser or final freeze until measured and accepted.

**Still not approved or frozen.** No push to `main` or `preview-*`, merge or deployment is authorized by this pass.
