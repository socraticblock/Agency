# Project Memory

## Index
- **006** — Elite roadmap wiring (sections, typography, texture/effects, social/QR, motion, themes, card chrome, cleanup)
- **007** — Preview tab JSON normalization + print/PDF visibility strategy + QR frame radii
- **008** — BackgroundEngine color selector fix (missing `--bg-base-color` CSS variable)
- **009** — CSS variable mismatch fixes (texture pattern, blend mode, and gradient variables)
- **010** — Consolidated duplicate `resolveStyleVariables` functions (removed `presets/resolve-styles.ts`, updated `presets/index.ts`)
- **011** — Removed dead code exports and duplicate variables (10 unused variables from presets.ts, `--start-accent-gold` from start-shell.css)
- **012** — Hero photo shape + toolbelt interaction stabilization (true circle/cinematic sizing, upload reset, expanded active zone, wheel scroll lock)
- **013** — Sovereign handover: removed sidebar Photo section; on-card photo controls are now the single desktop path
- **014** — Section-first on-card activation shell (single active section state + hover edit affordance around card sections)
- **015** — Added desktop section drawer for About/Services (on-card click opens right-side editor; shared active-section controller)
- **016** — Replaced section text drawer with on-card Sections Manager (add/remove/reorder controls) while preserving inline content editing
- **017** — Sections Manager UX hardening (outside-click close + save-status scaffold: idle/saving/saved)
- **018** — Phase 4 polish for section structure edits (event-based pulse highlight, unified section shell interactions, anti-jitter pulse timing)
- **019** — Added sticky bottom Live Preview quick action that opens `/start/preview` in a new tab using current in-memory card state
- **020** — Removed sidebar Sections accordion and retired `SectionsLayoutSection`; section structure control is now exclusively on-card
- **021** — Pass A social sovereignty: added on-card Social Manager (toggle/reorder/save feedback/outside-close) plus mobile button toggles
- **022** — Added true custom social icon color flow (Custom mode now reveals hex + color picker and applies to icon rendering)
- **023** — Removed sidebar Social section and retired legacy social sidebar controls; social management now lives on-card
- **024** — Split map controls into independent toggles: map preview vs Get Directions button
- **025** — Added dedicated on-card Location manager and removed map controls from Social manager
- **026** — On-card Background manager (standalone bottom pill, Base/Overlay/Texture tabs, reuses sidebar control components)
- **027** — Split body typography from display packs (eight distinct body stacks, grouped UI, CSS line-height/letter-spacing, customizer v9 migration)
- **028** — Card text size presets (S/M/L/XL) via `--card-text-zoom` + CSS `zoom` on font layer; print resets zoom to 1

## Current Status
- Phase 1 (Foundation): Complete
- Phase 2 (Photo System): Grain + Ken Burns option shipped; full-bleed still cancelled; scroll parallax not implemented
- Refactor audit: Complete (7 monoliths decomposed)
- Phase 3.1 (Solid Color System): Complete
- Elite customizer roadmap (Phases 2–8 + card chrome): Largely implemented in `/start` (Apr 2026)

## Known Issues
- Full-Bleed Hero photo shape: Cancelled
- Parallax scroll: Needs IntersectionObserver fallback
- Print layout: Card uses visibility + `.business-card-template-print-skip` (see 007); validate in browser print preview

## Detailed observations

### 006
- **Context:** Roadmap audit listed gaps between `Lane1CustomizerState` / `resolveStyleVariables` and UI (sections, textures, typography packs, QR, motion, themes).
- **Decision:** Implemented section dispatcher + content editors; texture/bg-effect layers + secondary accent; typography packs + button styles; social/QR options; `buildItemVariants` + tilt/hover; elite theme presets with local save + toast; `cardDarkSurface` + radius/shadow; removed dead `SectorGrid` and legacy `components/customizer/`; film-grain uses inline SVG noise.
- **Impact:** Customizer version remains 5 with deep merge migration; more surface area in presets/types; build verified with `npm run build`.

### 007
- **Context:** `/start/preview` parsed `sessionStorage` without the same merge/migration as `customizer-store`; print CSS assumed `<main>` and `.business-card-template-font-layer` selectors did not match the DOM; QR “square” style used `rounded-md`.
- **Decision:** Exported `normalizeLane1StateFromJson` + alias `normalizeLane1StateFromUnknown`; preview uses the latter + `useParams()` for locale. Print: visibility subtree + explicit `.qr-code-print-view` visibility; `business-card-template-font-layer` on main `motion.div`; print-hero/contact + `business-card-template-print-skip`. QR frame: `rounded-none` / `rounded-2xl` / `rounded-3xl`. Sections UI clarifies chevron reorder; texture “none” shows helper copy instead of the strength slider.
- **Impact:** Preview tab matches merged defaults; print/PDF no longer blank; `SectionDispatcher` unchanged (`activeSections` ∩ `sectionOrder`).

### 008
- **Context:** Background color swatches in `/start` updated `state.style.bgBaseColor`, but `BackgroundEngine`'s base layer used `var(--bg-base-color)` which was never defined in `resolveStyleVariables()`. The selector appeared "inactive" because the computed CSS variable fell back to an invalid/empty value. Additionally, overlay decor (solid/linear/radial/mesh) used `var(--overlay-gradient)` which also didn't exist; only `--bg-image-overlay` and `--bg-overlay-color` were exported separately.
- **Decision:** Added `"--bg-base-color": baseColorValue` and `"--overlay-gradient": overlayGradientValue` (combines image and color branches) to the return object in `resolveStyleVariables()`. The overlay gradient variable now maps correctly to what `BackgroundEngine` Layer 3 reads.
- **Impact:** Color selector and overlay decor (linear/radial/mesh/solid + opacity) now work; `BackgroundEngine` Layers 1 and 3 render correctly from state.

### 009
- **Context:** CSS Variable Mismatch Audit Report identified 3 critical bugs: (1) `--texture-pattern` read by BackgroundEngine but exported as `--texture-bg`, causing texture overlay to never render; (2) `--texture-blend-mode` read but never exported, causing textures to default to "normal" blend mode instead of "overlay"; (3) `--bg-gradient` used by HeroSegment for gradient-border photo style but never exported, causing silent failures.
- **Decision:** Renamed `"--texture-bg"` to `"--texture-pattern"` in presets.ts line 621 to match BackgroundEngine usage; added `"--texture-blend-mode": selection.textureId === "none" ? "normal" : "overlay"` export at line 624; added `"--bg-gradient": selection.bgOverlayId !== "none" ? overlayGradientValue : \`linear-gradient(135deg, ${acc.accent}, ${secondaryFamily.accentSecondary})\` export at line 625.
- **Impact:** Texture overlay layer (Layer 5) now renders correctly with proper blend mode; gradient-border photo style in HeroSegment now works; all 3 critical rendering bugs resolved; build verified with `npm run build`.

### 010
- **Context:** Audit report identified TWO different `resolveStyleVariables` functions: one in `presets.ts` (526-637, used by BusinessCardTemplate) and another in `presets/resolve-styles.ts` (11-114, exported by `presets/index.ts`). This created confusion, maintenance burden, and potential divergence.
- **Decision:** Updated `presets/index.ts` line 46 to export `isBackgroundLockingTextColor` and `resolveStyleVariables` from `../presets` instead of `./resolve-styles`; deleted duplicate file `presets/resolve-styles.ts` entirely.
- **Impact:** Single source of truth for style variable resolution; eliminated 114 lines of duplicate code; reduced maintenance burden; build verified with `npm run build`.

### 011
- **Context:** Audit report identified 10-11 dead code variables exported by `resolveStyleVariables()` but never read by any component: `--bg-base-image`, `--bg-base-blur`, `--bg-image-overlay`, `--bg-overlay-color`, `--bg-color`, `--bg-overlay-opacity` (duplicate of `--overlay-opacity`), `--stagger-delay`, `--entrance-y`, `--spring-damping`, `--card-chrome-shadow`. Also `--start-accent-gold` defined in start-shell.css but never read.
- **Decision:** Removed all 10 unused exports from presets.ts return object (lines 609-612, 615, 617, 635-637); removed `--start-accent-gold` from start-shell.css line 26. Also removed unused local variables: `typo`, `anim`, `baseImageValue`, `overlayImageValue`, `overlayColorValue`, `cardShadowKey`, and `CARD_CHROME_SHADOW` object.
- **Impact:** Reduced CSS variable exports from 26 to 16 (38% reduction); eliminated bloat and confusion; cleaner, more maintainable codebase; simplified function logic by removing unused intermediate variables; build verified with `npm run build`.

### 012
- **Context:** Hero photo controls had production regressions: circle shape rendered as square, cinematic shape stayed constrained to 180px, replacement uploads could retain prior pan/zoom during async processing, and the toolbelt hid too aggressively while moving between photo and hero text.
- **Decision:** Updated `HeroSegment` to use true shape geometry (`w-full` + `16/9` for cinematic, `1/1` for non-cinematic) and dynamic wrapper sizing; added wheel scroll lock guard while hovering the photo; rewired `PhotoToolbelt` to a wider grid pedestal with 250px proximity + hero text active zone, plus delayed close; reset photo transform before compression and again on apply in both upload handlers.
- **Impact:** Shape toggle now maps correctly to visible masks, cinematic fills the intended width, new uploads open centered instead of inheriting stale transforms, page scroll no longer hijacks wheel-zoom interactions, and toolbelt/floating-label behavior is stable during hero editing.

### 013
- **Context:** Desktop photo editing reached parity on-card (`HeroSegment` + `PhotoToolbelt`) and the `StartCustomizer` sidebar `Photo` accordion became duplicate surface area.
- **Decision:** Removed `PhotoSection` usage from `StartCustomizer.tsx` and deleted `StartCustomizer/PhotoSection.tsx`, making on-card controls the single desktop interaction path for shape/filter/border/overlay/reset/replace.
- **Impact:** Sidebar is decluttered and photo state flow is simpler (fewer competing handlers/props), reducing future regression risk while mobile parity is handled in a dedicated follow-up pass.

### 014
- **Context:** With photo controls moved on-card, section editing still relied on sidebar mental mapping; users needed direct “click section to edit” affordance to continue sovereign desktop flow.
- **Decision:** Added centralized `activeSection` state in `BusinessCardTemplate` and passed it into `SectionDispatcher`; wrapped each dynamic section (`about/services/testimonials/gallery/awards/video/booking`) in an on-card editor shell with hover pencil affordance and active ring highlight.
- **Impact:** The card now acts as section navigation context without opening competing side panels; establishes the single-active-section contract needed for upcoming desktop drawer/mobile bottom-sheet editors.

### 015
- **Context:** Section activation existed on-card, but users still needed a practical editing surface for complex section content without relying on legacy sidebar flows.
- **Decision:** Introduced `SectionEditorDrawer` (desktop-only overlay) wired to the centralized `activeSection` state; clicking `About` opens a textarea editor, clicking `Services` opens structured title/description editors for each service item.
- **Impact:** Desktop now has a true section-first editing loop (select on card -> edit in contextual drawer -> immediate card update), validating the sovereign interaction model before mobile bottom-sheet rollout.

### 016
- **Context:** Inline text editing on card already covered section content, making the extra About/Services drawer redundant and adding unnecessary workflow friction.
- **Decision:** Removed `SectionEditorDrawer` entirely and added `SectionManagerPanel` as an on-card control surface for section visibility and order only (toggle + move up/down), driven by existing `activeSections`/`sectionOrder` state.
- **Impact:** Editing flow is simpler and more sovereign: content edits remain direct on-card, while structural section management is available in-context without reopening the old sidebar dependency.

### 017
- **Context:** Sections overlay required more intuitive dismissal and user reassurance during structural edits (toggle/reorder), especially with mouse/touch workflows where ESC usage is low.
- **Decision:** Added global outside-click/tap dismissal to `SectionManagerPanel` and introduced a lightweight save-status scaffold (`idle | saving | saved`) around patch updates, with transient status feedback in the panel header.
- **Impact:** Overlay behavior now matches natural interaction expectations (click anywhere outside to close) while setting the technical foundation for richer auto-save micro-feedback in later polish phases.

### 018
- **Context:** Section structure changes (add/remove/reorder) needed visual confirmation on-card without noisy per-keystroke motion or jitter during rapid actions.
- **Decision:** Added event-based section pulse signaling from `SectionManagerPanel` to `BusinessCardTemplate` and into `SectionDispatcher` (`pulseSectionId` + `pulseToken`), rendering a short-lived accent ring pulse overlay only on structural changes; unified shell hover/active visuals with restrained lift and ring behavior.
- **Impact:** Structural edits now feel immediate and premium (clear “where change happened”) while remaining stable under rapid interaction, with no animation spam during normal text editing.

### 019
- **Context:** Users already relied on the top preview action (`Preview my site`) that opens a separate preview tab; the new bottom control needed to match that exact behavior.
- **Decision:** Replaced the bottom mode toggle with a single sticky `Live Preview` button in `StartPageClient` that writes `businessCardPreview` to `sessionStorage` and opens `/${locale}/start/preview` in a new tab.
- **Impact:** Preview behavior is now consistent across entry points (top + bottom), avoids in-page mode divergence, and preserves a reliable client-facing preview flow.

### 020
- **Context:** Desktop polish direction is now fully card-first; the sidebar `Sections` accordion duplicated controls already provided by the on-card `SectionManagerPanel`.
- **Decision:** Removed `SectionsLayoutSection` from `StartCustomizer` and deleted `StartCustomizer/SectionsLayoutSection.tsx` to eliminate parallel section-structure surfaces.
- **Impact:** Section visibility/order is managed from a single on-card source of truth, reducing UI redundancy and lowering regression risk from divergent section-management paths.

### 021
- **Context:** Social structure and mobile button display controls still lived primarily in sidebar flows, while section structure had already moved to on-card management.
- **Decision:** Added `SocialManagerPanel` on-card with section-style management patterns (toggle visibility, reorder active items, `idle/saving/saved` feedback, outside-click close) and included mobile button UI toggles (`addGoogleMap`, `showMapPreview`) plus social icon appearance controls.
- **Impact:** Social behavior now follows the same sovereign control model as sections, with a single card-proximate management surface and consistent social render ordering/visibility across card segments.

### 022
- **Context:** Social color mode included a `custom` option, but there was no input surface to define the custom color and rendering still fell back to accent.
- **Decision:** Added `socialIconCustomHex` to customizer state defaults; updated social color resolver to use validated hex when `custom` is selected; exposed color picker + hex text input in on-card `SocialManagerPanel` (and mirrored in sidebar social appearance controls).
- **Impact:** `Custom` is now a complete interaction path: users can choose exact brand color and see social icons update live without dead-end UI options.

### 023
- **Context:** With on-card social controls now covering platform visibility/order, URL inputs, icon UI settings, and mobile button toggles, the right sidebar social accordion became redundant.
- **Decision:** Removed `SocialSection` from `StartCustomizer` and deleted `StartCustomizer/SocialSection.tsx` plus `StartCustomizer/SocialAppearanceControls.tsx`.
- **Impact:** Social configuration now follows a single sovereign control surface on-card, reducing duplicated UI paths and preventing sidebar/card drift.

### 024
- **Context:** Two map-related toggles behaved like duplicates because both effectively controlled the same Get Directions visibility path.
- **Decision:** Added `showGetDirectionsButton` state and separated rendering logic: `showMapPreview` now controls an embedded map preview block, while `showGetDirectionsButton` controls the CTA button. Updated on-card and sidebar toggles to match this split.
- **Impact:** Map UI controls are now semantically correct and predictable: clients can independently show preview context and the navigation action button.

### 025
- **Context:** Location/map controls were mixed into the `Social` manager, causing conceptual overlap and clutter in the social editing flow.
- **Decision:** Created `LocationManagerPanel` with its own on-card trigger (`Location`) and moved map preview/Get Directions toggles + ordering controls there; removed the map controls block from `SocialManagerPanel`.
- **Impact:** Control surfaces are now domain-clean (Social vs Location), improving discoverability and reducing cognitive load while preserving button ordering behavior on card.

### 026
- **Context:** Background editing still lived primarily in the right sidebar while other major surfaces moved on-card; users needed a sovereign path without relocating Sections/Social/Location pills.
- **Decision:** Added `BackgroundManagerPanel` as a single centered bottom pill (after `BrandingFooter`) with `Base` / `Overlay` / `Texture` tabs, reusing `BackgroundBaseControls`, `BackgroundOverlayControls`, `TextureEffectControls`, and conditional `TextColorPresetGrid`; panel opens above the pill with scrollable light inner content and save-status micro-feedback.
- **Impact:** Background can be tuned entirely from the card while sidebar `BackgroundSection` remains available until a later removal pass; live preview continues to flow through existing `style` patches and `BackgroundEngine`.

### 027
- **Context:** Body and display shared the same eight typography packs; body “Aa” tiles looked nearly identical (mostly Inter), while display options were visually distinct.
- **Decision:** Introduced `BodyTypographyPackId` + `BODY_TYPOGRAPHY_PRESETS` (Inter / Source Sans 3 / Merriweather / Space Grotesk stacks with tuned weights, line-height, and optional letter-spacing), `--font-body-line-height` and `--font-body-letter-spacing` in `resolveStyleVariables`, grouped `BodyTypographyPresetGrid` with sentence preview, `LEGACY_DISPLAY_TO_BODY_PACK` for themes + sidebar display picker, `migrateLegacyBodyTypographyId` in v9 migration, and Inter font weights 500/600.
- **Impact:** Clients see clearer body variety without new npm dependencies; saved cards migrate from old display ids to new body ids; `fontId` legacy mapping uses `BODY_TYPOGRAPHY_TO_LEGACY_FONT` when body changes.

### 028
- **Context:** Clients needed larger/smaller card text without retuning every Tailwind `text-*` class; `rem` ignores parent `font-size`.
- **Decision:** Added `cardTextScaleId` (`compact`→0.9, `default`→1, `comfortable`→1.08, `large`→1.15), `CARD_TEXT_SCALE_PRESETS`, `--card-text-zoom` in `resolveStyleVariables`, and `zoom: var(--card-text-zoom)` on `.business-card-template-font-layer` so all subtree typography scales together; `CardTextScaleRow` in Typography panel; `@media print` forces `zoom: 1` on that layer for 3.5×2in output; customizer v10 migration defaults invalid/missing ids to `default`.
- **Impact:** One bounded control scales headings, body, and buttons consistently; print layout stays physically correct; no new dependencies.

## Architecture Decisions
- Zero backend for card features
- Sector selector removed — presets replace it
- Max 4 toggleable sections per card
- Pre-built typography packs (no individual sliders)
- Pre-built button styles (no mixing)
- Language Strategy: English first; avoid automated Georgian (human translation later)
