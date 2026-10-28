# Enquiry composition study — review checkpoint

28 October 2026. Status: compositions for visual review; animation implementation and hero freeze are not approved.

## Reconciled baseline

Branch: `feat/genezisi-hero-four-act-polish`.
Fetched origin and fast-forwarded cleanly from `310374f` to `2de2732` before editing. The newer remote commits include the three depth planes, enlarged approval boundary, full ivory resolution and Work floor seen in the owner's `20261028-1300-57.9449822.mp4` recording. The local page had retained an older document until explicitly reloaded. After reload, the served baseline exposes three `.depth-plane` elements and the ending “Three disciplines. One standard.” It now matches the identifiable elements in the recording. No previous work was reset or discarded.

## Scope of this milestone

The agreed next step is static art direction inside the actual complete website. It is not another implementation of the full scroll animation.

The current hero and its timeline are preserved. A single inert-by-default deferred script is added before `journey.js`. Only a recognised `?hero-study=STATE` query replaces the hero with the proposed study. Without the query, the script exits before accessing the DOM. All subsequent projects, services, intelligence demonstration, contact, and navigation remain present on the same route. The existing hero engine sees no `#heroJourney` in study mode, so it leaves the manually selected compositions alone while its project and explorer behavior continues.

Review URL: `/flagship-journey/index.html?hero-study=experience`.
Clean capture URL: append `&capture=1` to omit the reviewer controls.

## Main compositions

- **experience**: original outer headline and identity; an editorial website with an original code-native architectural artwork, integrated enquiry excerpt, and functional local drawer. The opening excerpt “Could we talk next week?” establishes the same enquiry before the journey begins.
- **connection**: the enquiry expands within the same website. Its message stays prominent. Fixed-rule validation and mapping feed CRM record DEMO-1042; owner notification is prepared, not sent. There is no inference of the unstructured time preference in the automation scene.
- **intelligence**: the same message is annotated by intent, date constraint, and preference. A permitted read-only tool supplies Tuesday/Thursday times; they inform an actual proposed reply. Human review is integrated within the document; sending and appointment creation are explicitly unavailable in the demonstration.
- **resolution**: the original editorial website returns. Its enquiry now carries the recognisable request excerpt and record identity alongside a clearly labelled simulated owner approval. The draft is ready for manual delivery; no message or booking is represented as completed.

The document is one persistent DOM element; review controls change only its state, presentation and outer narrative. No automatic scene animation or scroll timeline has been added. Four desktop and four phone stills are captured from the real page.

## Intermediate compositions

- **unfold**: the editorial area yields space to its original enquiry, with the website identity and complete message readable.
- **interpret**: the message and its extracted meaning become the focal point before availability and drafting take over.
- **return**: editorial website and reduced working document coexist at full opacity during reassembly.
- **handoff**: resolved website shares the viewport with the authentic Selected Work introduction. Only this study state adjusts the immediately adjacent introduction's top spacing; its source and content remain unchanged. Handoff evidence is captured after ordinary native scrolling (desktop 160px, phone 200px) to show both sides of the seam.

These are manually selected proposed poses, not proof that transitions between them are solved.

## Responsive decisions

Primary captures: 1440×900 desktop and 390×844 phone. The phone reorders the narrative vertically, uses the document at near-full width, and gives the tool's name a separate supporting line rather than compressing it beside the times. At 390×844 the complete human-review boundary ends at approximately 773px, within the visible viewport. The important document labels use a 9px supporting-size floor; messages, options, reply and review are larger. Tiny artwork/page-furniture captions remain secondary and are not necessary to understand the services or simulation.

Additional layout checks: 320×568, 390×667, 768×1024, 1366×768 and 1920×1080. No horizontal overflow after correcting the tablet review footer's relative positioning. Short phones and portrait tablets deliberately flow beyond one viewport; there is no sticky trap, forced miniature working document or new minimum viewport height. This is an intentional composition-stage trade-off to review before mobile motion is designed.

## Verification

- `node --test tests/flagship-signature-hero.test.mjs tests/flagship-hero-composition-study.test.mjs`: 10 passed.
- Existing legacy test contained a malformed double-escaped regular expression that prevented the test file parsing. Corrected its escaping; the assertion still rejects text-cutting inset masks.
- Downstream content invariant ignores only the added deferred study-script line. Actual project and service markup remains identical to the original baseline after newline normalization.
- New tests prove the study has no DOM effects on normal/invalid-query URLs, contains one enquiry document/message and honest approval limits, and introduces no scroll/wheel/touch interception or automatic timeline.
- `npm run build`: passed.
- `npm run typecheck`: passed.
- `npm run lint`: 0 errors, 235 existing repository warnings.
- Browser: Chromium-based Codex in-app browser. Real opening-drawer interaction exercised; closing sets `aria-expanded=false` and returns focus to the opener. Review controls and Work/Services/Contact anchors are local/ordinary navigation.

## Remaining review and limits

This is not final creative acceptance. Review the opening artwork and independent website identity, message continuity, editorial character of the working document, reading size on phones, and portfolio seam. The complete motion, its intermediary states at every scroll position, real browser traces, recordings, touch momentum, physical-device browsers, assistive technology and expanded-text variants remain a later milestone. A successful build does not establish those qualities.

No WebGL, animation library, image-generation service or new dependency was used. The artwork is an original static SVG. No external API, CRM, calendar, email or AI model is called.

No production change, deployment, merge or hero freeze. The current normal-route hero remains the reconciled remote implementation until a later approved implementation stage.

## Short desktop containment check

A separate compact desktop composition is used below 820px viewport height. All four main states were rendered at 1366×768 and 1280×720. The website and all meaningful content fit within the viewport; the human-review boundary ends near 603px and 579px respectively. No horizontal overflow observed. This does not change the primary 1440×900 stills or the phone layouts.
