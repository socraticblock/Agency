# Genezisi — full doorway hero path prototype

28 October 2026. A working comparison prototype, not an approved/frozen hero.

Branch: `feat/genezisi-hero-four-act-polish`. Base: `00c11ed` (latest remote composition-study checkpoint when this work began).

## Open and compare

- Doorway: `/flagship-journey/index.html?hero=doorway`
- Enquiry compositions: `/flagship-journey/index.html?hero-study=experience`
- Previous animated hero: `/flagship-journey/index.html`

The fixed prototype bar provides the same three comparison links and four buttons for native-scroll jumps to the major acts. Scrolling normally drives the complete sequence. The doorway mode is opt-in. The previous hero, composition study and all authentic downstream site content remain intact.

## What this prototype actually builds

1. **Website visible within the opening.** The exact original outer headline and three independent services introduce a real HTML website visible inside a generated architectural foreground. Its text, navigation, service index and enquiry control are browser-rendered elements, not baked image lettering.
2. **Approach and unfold.** One transparent arch asset scales outward as the same responsive website grows into view. The initial enquiry control lets the user explicitly advance into the demonstration. The website's enquiry expands into a continuing working document.
3. **Deterministic automation.** The message remains in the same DOM document. A request signal travels along the integration rail; CRM record DEMO-1042 becomes visible after arrival, then an owner notification is prepared, not sent. No contextual AI interpretation is attributed to validation or mapping.
4. **Agentic interpretation and tool use.** Words in the original message are emphasised. Consultation intent, next-week constraint and afternoon preference appear. A permitted read-only availability lookup returns Tuesday 14:00 / Thursday 15:00. Those options inform an actual proposed reply.
5. **Observable human gate.** The draft first says “Ready for your review.” Further scroll reveals an explicitly simulated owner approval. Sending and appointment creation remain disabled. This is not a real user approval or external operation.
6. **Return and real evidence.** The document closes only after its content has left. The original website returns inside the arch with an approved draft ready for manual delivery. Native scrolling releases into the unchanged Selected Work introduction and authentic projects. Only the immediately adjacent introduction's spacing is adjusted in this mode.

## Asset and rendering technique

`doorway-frame.png` is a new, built-in-imagegen-produced foreground asset with alpha both outside and through its aperture. It is copied into the repository and used locally; it is not referenced from the Codex image cache. Its complete prompt is in `docs/doorway-prototype-asset.json`. Runtime size: 940,277 bytes; one PNG, not a large frame atlas.

The previously generated four-pose atlas is deliberately not used: its geometry drift would undermine a continuous camera move. This prototype uses a stable prerendered material layer and controlled CSS geometry with real HTML behind it. It approximates a camera approach; it is not a true 3D camera or an animated door hinge. No WebGL, video background, animation library, model API, external tool or new dependency was added.

## Motion implementation

`doorway-hero.js` exits before DOM access unless `hero=doorway`. It replaces only the old hero before the existing journey script initialises. The original project explorer, project choreography, services and interactive lab continue to use the existing script.

A pure `getFrame(progress)` maps native page scroll into geometry and visibility. It has no elapsed-time state, damping or independent playback. Event-driven requestAnimationFrame updates stop when scroll/resize activity stops. The only scripted scroll is in response to an explicit review-act/enquiry button; wheel and touch input are never intercepted.

Important holds and events (normalised native progress):

| Range | Main event |
|---|---|
| 0–.07 | Opening composition |
| .07–.25 | Stable arch enlarges while the live website grows through the opening |
| .20–.35 | Website editorial content leaves before the enquiry grows into that space |
| .35–.44 | Validation, transfer, CRM arrival and notification preparation |
| .44–.48 | Complete automation hold |
| .51–.57 | Same message interpreted as intent, constraint and preference |
| .575–.665 | Permitted tool and returned options |
| .675–.75 | Draft and human review boundary |
| .80–.84 | Explicitly simulated owner approval hold |
| .85–.98 | Document content leaves, website returns, truthful result settles into its enquiry bar |
| .98 onward | Resolved composition and native handoff into real work |

Outgoing/incoming record and review labels have separated fades rather than two readable strings crossfading over each other. On phones the opening CTA/detail copy leaves before the growing website reaches its position. The main headline stays visible until the next focal event is established. Reverse scroll computes the same state directly.

## Responsive and accessible presentation

- Main animated prototypes inspected at 1440×900, 1366×768, 1280×720, 1920×1080 and 390×844.
- Short windows (height below 680px), short mobile landscape, portrait tablets below 1100px wide, and prefers-reduced-motion use an ordinary-flow presentation. This is a deliberate readable alternative, not the pinned cinema squeezed onto a small viewport. A review-bar status explains reading mode.
- Reading views inspected at 320×568, 390×667 and 768×1024. They retain the real website, an openable document and the complete four-act written explanation. The document has enough height for the complete review boundary, with ordinary native page scrolling.
- Primary CTA anchors, project/contact paths and the original skip link remain real links. Hidden story controls become inert; resolved/hidden enquiry buttons are disabled. Opacity-hidden operational groups receive appropriate aria-hidden state, and the complete accessible narrative remains available.
- Native viewport resizing is supported, including moving between the cinematic and reading presentations. No minimum 620px sticky viewport or nested scroll container is introduced; 620px is the height of the ordinary-flow document illustration only.

## Verification and evidence

- `node --test tests/flagship-doorway-hero.test.mjs tests/flagship-signature-hero.test.mjs tests/flagship-hero-composition-study.test.mjs`: 15 passed.
- New pure-timeline tests sample 1,001 progress positions forward and reverse, check arbitrary jumps, finite/bounded values, separated readable copy/operational/review states and causal ordering. These are source/state tests, not performance measurements.
- The existing downstream-content invariant passes after excluding only the explicit opt-in review-script hooks. No selected project/service/contact markup was changed.
- Production build and typecheck passed. Full lint: zero errors, 235 repository warnings. A scoped lint check covers the final prototype files.
- Real in-app Chromium UI exercised forward, reverse, act jumps, manual keyboard scrolling, the opening enquiry control, simulated approval and native Work handoff.
- Actual settled browser captures: four acts on desktop and phone, plus intermediate approach, simulated approval and the Work seam. Capture automation waits on the actual DOM progress value before saving an act; it does not inject a fake visual state.
- At 1440×900 the human-review boundary ends around 691px, above the document footer at 703px. At 390×844 it ends around 716px, above the footer at 734px. At 1366×768 it ends around 576px, above the footer at 628px. All eight layout checks showed no horizontal overflow after fixes. The small reading layout's initial review/footer collision was fixed by giving its ordinary-flow document more room.

## What still needs judgement / limits

This prototype exists to decide whether the doorway direction earns its space compared with the enquiry-led and earlier versions. The opening website is intentionally miniature inside the aperture, especially on phones; that is the main commercial/art-direction trade-off to assess. A beautiful portal should not outweigh proof of website craftsmanship.

The generated foreground has prototype-quality alpha edges and can be refined if this direction is chosen. The camera move is a layered approximation. Further material, perspective and transition art direction may be needed. The Work seam is a native release, not an elaborate project transition.

No measured FPS, field Core Web Vitals, real browser trace, realtime screen recording, physical touch/trackpad run, Firefox, Safari or Android-device claim is made. Reduced-motion and short-window paths share the exercised reading layout, but the OS preference and screen-reader speech have not been independently tested.

No merge, production deployment, preview-branch push or hero freeze. The feature-branch checkpoint is for review only. Explicit owner visual approval remains required before freezing a direction.
