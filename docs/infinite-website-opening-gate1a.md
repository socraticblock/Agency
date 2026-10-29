# Genezisi Infinite Website — Gate 0 / Gate 1a opening studies

**Review build:** 29 October 2026. **Status:** static opening exploration, NOT approved production UI, NOT immersive motion, NOT Gate 1b.  
**Controlling brief:** `GENEZISI — Infinite Website North Star v1.1` (29 October 2026).

## Preservation and source reconciliation (Gate 0: remotely verified only)

- GitHub repository: `socraticblock/Agency` (public, connected, write access verified).
- GitHub `main` at review: `734d0eb04de2d4287f0f6af220a705e0be89bcae` (25 October 2026).
- Latest inspected comparison branch: `feat/genezisi-hero-four-act-polish`, **45 commits ahead** of `main` and zero behind at time of inspection. Its historical doorway-prototype document explicitly labels that work a comparison, not approved final hero.
- Existing flagship route: `/flagship-journey/index.html` with opt-in doorway `/flagship-journey/index.html?hero=doorway` on comparison branch.
- Live/GitHub homepage has `en`, `ka`, `nl` locale registry. Existing `#work`, `#capabilities`, and `#about` anchors in the Next homepage are verified in source. Verified WhatsApp intake constant: `995579723564`.
- Vercel `vercel.json` deploys only pushes to `main` and `preview-*`; ordinary feature branches are excluded.
- **Unknown / blocker before Gate 1b integration:** the coder's local workspace, unpublished changes, served local prototype, current browser footage and exact design assets are not accessible in this session. Do not reset or overwrite any local work. These opening studies live in a new isolated file and can be reconciled later with a newer local branch.

## Three original static directions

All three use real text and links, the same locked headline and truthful, independent service positioning. They are intentionally composed as business webpages, not a portal asset or an AI dashboard.

| Direction | Visual thesis | Potential threshold | Strength | Trade-off |
|---|---|---|---|---|
| **A — Editorial Aperture** | Dark evergreen editorial composition with offset near-center page planes. | The existing editorial planes separate from an authored center page region. | Quietest authority; simple construction. | The inset interface can still look like a card; risks resembling the older doorway idea if enlarged indiscriminately. |
| **B — Interface Strata** | Warm paper exterior with a real Genezisi interface rendered as layered digital surfaces. | Original page frame, its two columns, borders and content divisions become left/right structural planes. | **Recommended** as most legible page-to-depth mapping for a controlled forward camera. | Must maintain one real site, not two unrelated sites; warm exterior needs proven optical continuity on return. |
| **C — Typographic Architecture** | Dark centered typography, rhythm from page grid, and three discipline bands. | Grid columns, baseline rules and the central brand rhythm extend into depth. | Strong typographic identity and excellent center focus. | Less obvious physical entry destination; needs a stronger geometry proof before committing to it. |

**Recommendation: B** for the next gate, **subject to founder visual choice**. It offers the clearest geometric source for `PageFrame`, `LeftPlane`, `RightPlane`, `FrameLines` and `CentralAperture`. The founder may prefer A or C; no selection is assumed.

## Files and review

- `index.html?direction=a`, `?direction=b`, or `?direction=c`: browser-renderable **static** HTML/CSS source. It includes only minimal query selection JS; the default with JS disabled is A. No external font/images/animation libraries/API dependencies.
- `contact-sheet-desktop.png`: one comparative sheet from desktop Chromium screenshots, each at 1440×900.
- `contact-sheet-mobile.png`: a comparative sheet from portrait Chromium screenshots, each at 390×844.
- `screenshots/{a,b,c}-{desktop,mobile,small-mobile}.png`: nine actual Chromium screenshots including additional 320×568 stress captures; the six desktop/mobile stills satisfy the Gate 1a review requirement.
- `capture.py`: reproducible capture script using Playwright Chromium; it uses `page.set_content(...)` because file:// and localhost navigation were blocked by the execution environment. Screenshots therefore prove layout in headless Chromium, **not route integration or a deployed/served build**.

### What has actually been checked

- All three directions rendered in headless Chromium at 1440×900, 390×844, and 320×568.
- At each captured size no **horizontal** document overflow was detected.
- At 1440×900 all A/B/C layouts fit in the initial viewport after a focused C spacing refinement.
- At 390×844 A/B/C fit the viewport (no vertical document overflow).
- At 320×568 the page content is intentionally taller than the screen (A ~747px, B ~770px, C ~778px); crucial headline/three-discipline proposition/Work+Contact paths are visible at first paint, but the art runs below the fold.
- `prefers-reduced-motion: reduce` was selected in the capture context. The page has no automatic cinematic motion or WebGL. Links are semantic HTML. The live destinations have not been clicked through in a real served review build.
- **Not verified:** physical mobile device, Safari/Firefox, current live preview fidelity, screen reader, localized KA/NL compositions, actual performance metrics, no-JS fully navigable repo route, native scroll trajectory, forward return, reverse, or 3D geometry.

### Commercial and UX notes

- Locked hero: **Your website is only the beginning.**
- Propositions: **Websites & digital experiences**, **Automation & integrations**, **AI systems & engineering**, each independently commissionable.
- Static hero body: “We design distinctive websites and engineer dependable automation and intelligent AI systems. Each works on its own—or together.”
- `Explore our work` points to the source-verified `/en#work` destination on `genezisi.com`.
- `Start a project` opens the verified WhatsApp intake number with the general-project message used in the actual source homepage. No form/backend is created.
- Production locale work **must** be integrated via existing `HOME_LOCALES` registry after selection. This gate is intentionally an English-only design exploration, not launch content.
- No fake client identity, invented case studies, live AI actions, external enquiry submission or appointment booking occurs.

## Founder visual checkpoint

Select **A / B / C** based on the six stills. Only after that choice should the implementation team:

1. Reconcile the genuinely latest local/served work, ensure a safe rollback/checkpoint, and preserve old flagship comparisons.
2. Define exact object identities and K0–K4 geometry for the chosen opening.
3. Build *only* the selected opening, real forward entry, neutral central interior, distinct forward fold-back and actual Selected Work handoff.
4. Capture real **served** browser frames and reverse/rapid-scroll/mobile evidence. Founder review remains required before the enquiry/AI storyline.

**No authorized merge, production deploy, preview-* push, or Gate 2 story expansion.**