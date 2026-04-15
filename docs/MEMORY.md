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
- **029** — Single user-facing accent: `resolveStyleVariables` uses one preset row; `secondaryAccentId` synced to `accentId`; v11 migration
- **030** — Typography modal 3-tab split: Body / Display / CTA with `ctaTypographyPackId`, `ctaTextHex`, `--font-cta` / `--text-cta`, v12 migration
- **031** — On-card “Look” pill merges accent + button shape (`LookManagerPanel`); typography pill labeled “Type”; removed `AccentManagerPanel`
- **032** — Removed `ghost` from `ButtonStyleId` / `BUTTON_STYLE_PRESETS`; migration maps `ghost` → `outlined`; Noir theme uses `outlined`; `CUSTOMIZER_VERSION` 13
- **033** — Seven button looks: `brutalist`, `stripe`, `tint`, `clay`, `metal`, `mesh`, `glassmorph`; `accentBackground` + `lane1PrimaryAccentBackground` for tint/mesh/glass; v14
- **034** — Removed sidebar `AccentSection` and `ButtonStyleSection` from `StartCustomizer` (on-card Look + Type only)
- **035** — `ExperienceManagerPanel` on-card; deleted `StyleSections.tsx`; vibe/motion/tilt/hover only on card
- **036** — Removed `Dark card surface` control/effect; Card surface now radius + shadow only (legacy flag ignored + migrated false)
- **037** — Moved Card surface controls on-card (`CardSurfaceManagerPanel`); removed sidebar `CardChromeSection`
- **038** — Dead-code sweep: removed orphaned StartCustomizer sections-content files, legacy preset-grid/preset split modules, and unused exports
- **039** — Added on-card `QrManagerPanel` (colors + style + static/dropdown mode + logo toggle); moved QR styling controls out of `IdentitySection`; v15
- **040** — Profile setup flow added (top on-card pill + first-load auto-open) with language/translation source-of-truth, pricing remap (maps free), and v16 migration
- **041** — Georgian-aware pill localization: manager labels/controls follow card language mode (`useSecondary`) across on-card pill surfaces
- **042** — Hero layout locked to centered alignment for all cards (new + migrated states)
- **043** — Removed right sidebar editor; start page is now centered card-only with on-card pills and cleaned sidebar dead code
- **044** — Added mobile photo toolbelt pill under hero photo (all desktop actions + visible labels) and removed unused photo modal
- **045** — Added 1–4 item count controls for Services/Gallery/Testimonials/Awards in on-card Sections manager with thumb-friendly +/- buttons
- **046** — Removed on-card Card Surface pill and deleted `CardSurfaceManagerPanel` (radius/shadow still theme-driven only)
- **047** — Navbar behavior update: fully hidden on `/start/preview`, auto-hide on scroll-down and show on scroll-up across the site
- **048** — Added “unopened pill” onboarding pulse (orange glow) with persistent open-state tracking across manager pills
- **049** — Digital Card tiered pricing + `/start` sales overlay (welcome/pricing/FAQ), v17 state, WhatsApp order schema, chrome bar
- **050** — `/start` order block: inline plan picker + tier-specific URL/domain copy and WhatsApp hint labels
- **051** — Order handoff hardening: `order.json` envelope + review/validation gate + download/share + compact WhatsApp (schema v2) + import on `/start` and preview; ops notes in `docs/digital-card-order-handoff.md`
- **052** — Order review: red on-card field rings from blocking issue ids + “Continue without checklist” bypass (WhatsApp note) + sticky highlight prune on state; dialog lifted to `StartPageEditorColumn`
- **053** — Lean handoff JSON (strip hero/gallery/bg image blobs) + `handoffMedia` meta + WhatsApp schema v3 checklist + Share-first step 2 copy
- **054** — Email-first architect brief in review step 2 + direct-WhatsApp alternative + WhatsApp schema v4 summary; JSON retained as internal fallback only
- **055** — WhatsApp handoff: copy full `buildWhatsAppOrderPasteText` brief + short `buildLane1WhatsAppOpenerUrl`; email optional; `StartOrderSendStep2`
- **056** — Architect paste brief v5: explicit `*_EN`/`*_KA` content keys + full design/QR/social spec in `buildArchitectHandoffDataLines`
- **057** — Primary CTA (Call/WhatsApp) toggle + reorder (`activeCtaChannels`, `ctaChannelOrder`), on-card `CtaManagerPanel`, handoff lines + schema v6
- **058** — Mobile-only portaled overlays for bottom card pills (Background/Look/Type/Experience): escapes preview `overflow-hidden`; desktop keeps anchored popovers
- **059** — Bottom pills: exclusive open state in `BusinessCardTemplate`; Background/Type section `<select>`; unified overlay colors + single Type hex picker
- **060** — Pill section `<select>` → `PillSectionAccordion`; base solid + Look accent use single `TypographyHexColorRow`; `accentCustomPrimary` + `accentId: "custom"` + `resolveAccentPair`; `CUSTOMIZER_VERSION` 19
- **061** — Texture tint: `textureTintHex` + `textureBackgroundImage` third arg; `TextureEffectControls` color row; paste `TEXTURE_TINT_HEX`; v20
- **062** — Background motion tint: `bgEffectTintHex` + `--bg-effect-color` / secondary; CSS uses them instead of `--accent`; `BackgroundMotionControls` picker; v21
- **063** — Hero profile image default fit: `object-contain` for all photo shapes (letterbox); zoom/pan still reach edge-to-edge
- **064** — Order pipeline: `publish_slug` / `requested_domain` / `domain_status` + `card_domains`; tier rules in `order-publish-intent.ts`; admin auth on publish; review dialog blocks on failed save; custom-domain middleware rewrite
- **065** — Professional domain optional at checkout (advisory); `AdminOrdersRunbook` on admin orders; copy updated
- **066** — Admin auth: HttpOnly signed session cookie (`ADMIN_PASSWORD` secret); `/api/admin/login|logout|session`; orders/publish APIs use `verifyAdminRequest()`; removed `NEXT_PUBLIC_ADMIN_PASSWORD`

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
- **Impact:** Background is tuned from the on-card `BackgroundManagerPanel`; sidebar `BackgroundSection` was removed once parity shipped; live preview flows through `style` patches and `BackgroundEngine`.

### 027
- **Context:** Body and display shared the same eight typography packs; body “Aa” tiles looked nearly identical (mostly Inter), while display options were visually distinct.
- **Decision:** Introduced `BodyTypographyPackId` + `BODY_TYPOGRAPHY_PRESETS` (Inter / Source Sans 3 / Merriweather / Space Grotesk stacks with tuned weights, line-height, and optional letter-spacing), `--font-body-line-height` and `--font-body-letter-spacing` in `resolveStyleVariables`, grouped `BodyTypographyPresetGrid` with sentence preview, `LEGACY_DISPLAY_TO_BODY_PACK` for themes + sidebar display picker, `migrateLegacyBodyTypographyId` in v9 migration, and Inter font weights 500/600.
- **Impact:** Clients see clearer body variety without new npm dependencies; saved cards migrate from old display ids to new body ids; `fontId` legacy mapping uses `BODY_TYPOGRAPHY_TO_LEGACY_FONT` when body changes.

### 028
- **Context:** Clients needed larger/smaller card text without retuning every Tailwind `text-*` class; `rem` ignores parent `font-size`.
- **Decision:** Added `cardTextScaleId` (`compact`→0.9, `default`→1, `comfortable`→1.08, `large`→1.15), `CARD_TEXT_SCALE_PRESETS`, `--card-text-zoom` in `resolveStyleVariables`, and `zoom: var(--card-text-zoom)` on `.business-card-template-font-layer` so all subtree typography scales together; `CardTextScaleRow` in Typography panel; `@media print` forces `zoom: 1` on that layer for 3.5×2in output; customizer v10 migration defaults invalid/missing ids to `default`.
- **Impact:** One bounded control scales headings, body, and buttons consistently; print layout stays physically correct; no new dependencies.

### 029
- **Context:** Two accent pickers confused clients; `--accent-secondary` was driven by a second preset’s `accentSecondary`, not its main swatch.
- **Decision:** `resolveStyleVariables` always takes `--accent` and `--accent-secondary` from the **`accentId`** preset row only; removed secondary UI from `AccentManagerPanel` and sidebar `AccentSection`; any `accentId` patch sets `secondaryAccentId = accentId`; `migrateLane1State` forces that sync; elite themes drop separate `secondaryAccentId`; `CUSTOMIZER_VERSION` 11.
- **Impact:** Same CSS variables and components keep working; old saves normalize on load; cross-preset accent mixing is no longer possible.

### 030
- **Context:** Display typography also drove CTA button label font/color, so bold heading stacks could make action labels unreadable; users needed isolated control.
- **Decision:** Added `ctaTypographyPackId` + `ctaTextHex`, `resolveStyleVariables` exports `--font-cta`, `--font-cta-weight`, `--text-cta`; `TypographyManagerPanel` third tab; card surfaces use `ctaLabelStyle` (Call/WhatsApp, Share/Refer, Get Directions, booking chip); v12 migration copies prior display pack/hex into CTA when keys absent; theme typography sync sets CTA pack with display.
- **Impact:** Display edits no longer change CTA labels unless the user uses the CTA tab; live preview still flows through `resolveStyleVariables` on `state.style`.

### 031
- **Context:** Separate “Accent” and “Typography” pills split brand color from type; button *shape* lived only in the sidebar, so on-card flows felt fragmented.
- **Decision:** Replaced `AccentManagerPanel` with `LookManagerPanel` (trigger **Look**, header “Brand & actions”): stacked accent grid + `ButtonStyleGrid` in one popover; renamed typography trigger/title to **Type** for a clear Type vs Look pairing.
- **Impact:** Fewer competing pills for the same mental model (brand + CTA chrome); sidebar `AccentSection` / `ButtonStyleSection` later removed (see **034**).

### 032
- **Context:** “Ghost” was redundant with Outlined for most users and the name confused the product story.
- **Decision:** Dropped `ghost` from `ButtonStyleId` and `BUTTON_STYLE_PRESETS`; removed all `case "ghost"` branches from `button-styles.ts`; `migrateLane1State` maps saved `ghost` → `outlined` and invalid ids → `minimal`; elite “Noir” theme uses `outlined` instead of `ghost`; `UtilitySegments` / `BookingSegment` treat only `outlined` as non-filled for accent fill logic.
- **Impact:** Five on-card button look tiles; legacy saves and imports stay valid via migration; `CUSTOMIZER_VERSION` 13.

### 033
- **Context:** Product needed a broader button vocabulary (brutalist, glass, etc.) without breaking accent fills or CTAs.
- **Decision:** Added `brutalist`, `stripe`, `tint`, `clay`, `metal`, `mesh`, `glassmorph` to `ButtonStyleId` and `BUTTON_STYLE_PRESETS`; extended `Lane1CtaSurface` with optional `accentBackground` for layered fills; `lane1PrimaryAccentBackground()` used by `CtaSegment`, `UtilitySegments`, `BookingSegment`, and Get Directions (`ContactSegment`); `lane1DirectionsClasses` drives directions chrome; grid preview uses `buttonStylePreviewChipClass`; `CUSTOMIZER_VERSION` 14.
- **Impact:** Twelve picker tiles; tint/mesh/glass use `color-mix` / layered gradients instead of only `var(--accent)`; glassmorph uses `backdrop-blur-md` on card CTAs (same zoom context as before—monitor Samsung).

### 034
- **Context:** Sidebar “Accent color” and “Buttons” duplicated on-card **Look** (accent + button shape) after sovereign pills shipped.
- **Decision:** Removed `AccentSection` and `ButtonStyleSection` from `StartCustomizer.tsx`.
- **Impact:** Accent + button chrome edited only via on-card **Look**; quick themes still apply accent + `buttonStyleId`.

### 035
- **Context:** Experience (vibe, animation, tilt, hover) duplicated sidebar vs on-card mental model.
- **Decision:** Added `ExperienceManagerPanel` (Waves icon, “Experience” pill) on `BusinessCardTemplate`; reuses `VibePresetGrid`, `AnimationPresetGrid`, `Phase5ExperienceControls`; removed `ExperienceSection` from `StartCustomizer` and deleted `StyleSections.tsx`.
- **Impact:** All card “feel” controls live on the card with Background / Look / Type / Experience pills; sidebar no longer lists Experience.

### 036
- **Context:** `Card surface` had a `Dark card surface` toggle that overlapped with Background dark presets and confused clients.
- **Decision:** Removed the `Dark card surface` checkbox from `CardChromeSection`; deleted runtime dark override from `resolveStyleVariables` (`--background` and text no longer switch via `cardDarkSurface`); migration now forces `cardDarkSurface = false`; field kept in `types.ts` only as deprecated JSON compatibility.
- **Impact:** `Card surface` is now shape/elevation only (corner radius + shadow); dark looks come exclusively from Background presets/overlays; old saved states with `cardDarkSurface: true` normalize to false.

### 037
- **Context:** `Card surface` still lived in the sidebar after other visual controls moved on-card, creating a split control path.
- **Decision:** Added `CardSurfaceManagerPanel` bottom pill (Surface icon) to `BusinessCardTemplate` with corner radius + shadow controls and save feedback; removed `CardChromeSection` usage from `StartCustomizer` and deleted `CardChromeSection.tsx`.
- **Impact:** All visual customization surfaces now live on-card (Background, Surface, Look, Type, Experience); sidebar flow is reduced to content/add-ons/themes/identity only.

### 038
- **Context:** Sidebar migration left several orphaned files/exports from prior accordion-era structures and split preset modules.
- **Decision:** Deleted unreferenced files under `StartCustomizer/sections-content/`, removed dead `StartCustomizer/SectionsContentSection.tsx` and `ServiceCountStepper.tsx`, removed unused `components/preset-grids/*` and `lib/presets/*` split tree plus `lib/presets-temp.ts` and `lib/vcf-utils.ts`, and removed unused exports `lane1CtaSecondarySurface`, `lane1UtilitySecondaryClasses`, `saveLane1StyleToDisk`, `loadLane1StyleFromDisk`.
- **Impact:** Smaller code surface with no known runtime loss; `rg` found no remaining references and `npm run build` passes.

### 039
- **Context:** QR customization (foreground/background/style/show-on-card) lived in sidebar `IdentitySection`, while visual editing moved on-card; users wanted QR display mode (static vs dropdown).
- **Decision:** Added `qrDisplayMode` (`static | dropdown`) to state + defaults and v15 migration; created on-card `QrManagerPanel` with show toggle, display mode, shape, foreground/background inputs, and logo toggle; inserted panel above `QrOnCardSegment`; updated `QrOnCardSegment` to render either static QR block or dropdown-reveal variant.
- **Impact:** QR look/behavior now edited on-card; sidebar `IdentitySection` keeps download/print identity kit actions only; live QR behavior updates immediately in preview.

### 040
- **Context:** Profile identity + language/translation decisions were split between sidebar add-ons and implicit preview behavior, causing mismatch with the new on-card workflow.
- **Decision:** Added `profileLanguageMode` / `translationMethod` / `translationSourceLang` / `profileSetupCompleted` to state with v16 migration and legacy mapping; created `ProfileSetupManagerPanel` as a top on-card pill that auto-opens once on first load; derived preview rules to enforce EN-only, KA-only, both-self toggle, and both-professional source-language-only behavior; updated pricing to make Google Maps free and charge translation based on profile setup.
- **Impact:** Profile setup is now the source-of-truth for card identity/language decisions, pricing reflects business rules (maps free, pro translation +150₾ only when both languages + professional), and backward compatibility is preserved through migration syncing with legacy fields.

### 041
- **Context:** Card copy in Georgian mode became consistent, but on-card pills and their control text remained mostly English, creating a mixed-language editing experience.
- **Decision:** Threaded `useSecondary` from `BusinessCardTemplate` into on-card manager pills and key nested controls, then localized high-visibility pill labels/status/tabs/options (Background/Look/Type/Experience/Surface/Sections/Social/Location/QR/Profile setup) and related control copy.
- **Impact:** When previewing Georgian mode, pill UI now aligns with card language context, reducing cognitive switching and making the editing experience more coherent without changing state schema.

### 042
- **Context:** Hero alignment options were no longer desired; product direction required a single centered hero layout for consistency.
- **Decision:** Removed left/center conditional rendering in `HeroSegment` and forced centered hero classes/text alignment; set default `photoAlignment` to `"center"` and added migration normalization to always coerce saved states to centered.
- **Impact:** All cards render a consistent centered hero regardless of legacy snapshot data, with no user-facing alignment choice.

### 043
- **Context:** The remaining right sidebar (`Content`, `Add-ons`, `Quick themes`, `Identity Kit`) duplicated controls now living in on-card pills, creating maintenance overhead and desktop/mobile mismatch.
- **Decision:** Removed `StartCustomizer` from `StartPageClient`, deleted obsolete sidebar modules (`StartCustomizer.tsx`, `ContentSection.tsx`, `AddonsSection.tsx`, `ThemePresetsSection.tsx`, `IdentitySection.tsx`, `index.ts`), and switched the page layout to a centered card-first flow with a single WhatsApp order block under the card.
- **Impact:** `/start` now has one editing surface (the card pills), less dead code, and a more mobile-friendly centered layout without split UI responsibilities.

### 044
- **Context:** Mobile had no hover, so the desktop `PhotoToolbelt` actions were not discoverable; users needed the same controls with explicit labels.
- **Decision:** Added a mobile-only pill row beneath the hero photo in `HeroSegment` exposing all desktop actions (Shape, Filter, Border, Layers, Center, Replace, Reset) with always-visible text labels; removed `PhotoEditModal` as dead code.
- **Impact:** Photo editing parity now exists across desktop and mobile without hover dependency, and the mobile path is clearer and faster for touch users.

### 045
- **Context:** Clients could edit section content but could not easily add/remove repeated items per section; Services, Gallery, Testimonials, and Awards needed bounded item counts.
- **Decision:** Extended `SectionManagerPanel` with explicit count controls (1–4) for those four sections, using large touch targets and existing state fields (`serviceCount`, `galleryCount`, `testimonialCount`, `awardCount`) with shared save feedback.
- **Impact:** Clients can now add/remove section items directly from the on-card Sections pill with mobile-friendly controls, and card rendering updates immediately through existing segment count wiring.

### 046
- **Context:** Product direction requested removing the Card Surface editor completely to simplify on-card controls.
- **Decision:** Removed `CardSurfaceManagerPanel` usage from `BusinessCardTemplate` and deleted the `CardSurfaceManagerPanel.tsx` component file.
- **Impact:** Radius/shadow are no longer directly editable via a dedicated pill; existing style fields remain for defaults/themes and runtime rendering, but card-surface UI complexity is reduced.

### 047
- **Context:** Live preview should be distraction-free (no navbar), while normal site pages need a modern scroll-aware navbar behavior.
- **Decision:** Updated shared `Navbar` to return `null` on `/start/preview`; added scroll-direction logic to hide navbar on downward scroll and reveal it on upward scroll with a movement threshold and top-of-page reset.
- **Impact:** Preview page now renders without navigation chrome, and the rest of the site gains cleaner reading space with responsive nav visibility on mobile and desktop.

### 048
- **Context:** First-time users needed a clearer visual cue for which on-card pills are interactive before opening them.
- **Decision:** Added a shared `usePillOnboardingGlow` hook with `localStorage` persistence and a reusable CSS pulse class (`business-card-pill-attention`) to highlight unopened pills; glow disables after first open per pill.
- **Impact:** Pill discoverability improves without permanent noise, onboarding cue respects reduced-motion fallback, and repeat users see a cleaner steady UI.

### 049
- **Context:** `/start` still used legacy 450₾ + add-on totals and had no first-visit sales layer for the new Subdomain / Professional / Executive Digital Card product.
- **Decision:** Added `selectedTier` + `digitalCardUrlHint`, `CUSTOMIZER_VERSION` 17, tier-based pricing helpers + WhatsApp `ORDER · schema v1` header; built glass/solid overlay (welcome/pricing/FAQ), post-dismiss chrome bar under site navbar, blur-lock on customizer while overlay is open, separate `start-overlay-storage` keys, customer copy in `src/constants/start-digital-card-*.ts`, internal summary in `docs/digital-card-product-internal.md`.
- **Impact:** Card features remain client-only; bilingual profile UI stays but no longer drives the public card price line; fulfillment gets explicit tier + hosting lines in WhatsApp; `npm run build` verified.

### 050
- **Context:** Bottom checkout showed a single generic “preferred URL” field while tier choice lived mainly in the first-visit overlay; clients needed clearer guidance per plan (subdomain vs own domain vs executive domain check).
- **Decision:** Added `StartOrderCheckoutBlock` with three tier pills (reusing pricing tier names), conditional helper copy + optional inputs for Subdomain/Executive, Professional note only; clearing `digitalCardUrlHint` when switching to Professional; WhatsApp header uses tier-specific lines for trimmed hint; touch-safe tier hover via `start-shell.css`.
- **Impact:** Order UX matches fulfillment story without new state fields; operators see labeled preferences in WhatsApp; same `digitalCardUrlHint` field serves subdomain slug or executive domain.

### 051
- **Context:** WhatsApp-only handoff was lossy (style/sections/assets missing) and long `wa.me` URLs were fragile; operators need a replayable snapshot without making the card depend on a backend.
- **Decision:** Added `GenezisiOrderFileV1` (`order-payload.ts`), `validateOrderState` (`order-validation.ts`), download + optional Web Share (`order-share.ts`), `StartOrderReviewDialog` gate before WhatsApp, `DIGITAL_CARD_ORDER_SCHEMA_VERSION` 2 compact messages (`whatsapp.ts`), import on `/start` and `preview` via `parseImportedOrderFile` + `normalizeLane1StateFromUnknown`; documented optional DB/storage in `docs/digital-card-order-handoff.md`.
- **Impact:** Fulfillment can trust `order.json`; clients get guided blocking vs advisory copy; card runtime stays client-only; onboarding API limits remain documented for future ops storage.

### 052
- **Context:** After the review modal, clients needed to see which card fields blocked Continue, and an escape hatch when they still want to message Genezisi without fixing the checklist.
- **Decision:** `StartPageEditorColumn` owns sticky `orderHighlightIssueIds` (set on dismiss from step 1 with blockers, pruned as `validateOrderState` blocking ids clear; cleared on bypass or step-2 dismiss). Red rings on hero name/title block, contact phone/email/address, booking URL editor, subdomain/executive inputs; bypass adds EN/KA line via `buildLane1WhatsAppUrl` `incompleteChecklist` until dialog closes.
- **Impact:** Faster self-serve fixes; fewer stuck users; operators get an explicit “skipped checklist” signal in WhatsApp when bypass is used.

### 053
- **Context:** Full `order.json` with base64 images was heavy and awkward to attach; operators still need a lossless-enough spec plus photos.
- **Decision:** `buildLeanHandoffState` + `handoffMedia` on `GenezisiOrderFileV1`; `buildGenezisiOrderFile` always exports lean state; `buildOrderSummaryLines`/`Ka` and step-2 UI emphasize Share-to-WhatsApp, small JSON, and follow-up messages for headshot/gallery/background; `DIGITAL_CARD_ORDER_SCHEMA_VERSION` 3.
- **Impact:** Smaller files and clearer client steps; import/replay still works with placeholder hero until images arrive in chat.

### 054
- **Context:** Clients should not have to download files; the handoff needed a smoother primary path that operators can paste into a database quickly, while keeping WhatsApp as the human-first fallback.
- **Decision:** Added `ARCHITECT_INTAKE_EMAIL` plus `order-email.ts` to build a structured `mailto:` brief from `Lane1CustomizerState`; step 2 now recommends **Send My Custom Build to the Architect** and offers **I Prefer Communication Directly via WhatsApp** as the alternative; `buildLane1WhatsAppUrl` / summary lines now describe direct chat instead of JSON attachment and `DIGITAL_CARD_ORDER_SCHEMA_VERSION` moved to 4.
- **Impact:** Customer flow is email-first without downloads; ops gets a stable copy/paste brief for manual fulfillment; lean JSON stays available only for internal replay/import work.

### 055
- **Context:** Long WhatsApp URLs and email-only flows were still friction; clients wanted one full message to paste after a simple opener.
- **Decision:** `buildArchitectHandoffDataLines` shared core; `buildWhatsAppOrderPasteText` for clipboard; `buildLane1WhatsAppOpenerUrl` replaces long `wa.me` payloads; step 2 UI in `StartOrderSendStep2` is copy → open WhatsApp → paste, with email as optional.
- **Impact:** Primary path matches mobile habits; operators receive the same structured block as email without forcing a mail client.

### 056
- **Context:** Operator paste text mixed primary/secondary fields (`ADDRESS` vs `ADDRESS_SECONDARY`) and omitted layered background, typography packs, motion, QR, and social chrome details that the builder already stores.
- **Decision:** Rewrote `buildArchitectHandoffDataLines` to emit `CONTENT_EN`/`CONTENT_KA` sections ordered by `primaryLang` + `profileLanguageMode`, preset `id (labelEn)` pairs from `presets.ts` / `texture-presets.ts`, and grouped `BACKGROUND` / `TYPE` / `LOOK` / `EXPERIENCE` / `HERO_PHOTO_STYLE` / `CARD_SURFACE` / `QR` / `SOCIAL_CHROME` / `CTA_LABELS` lines; bumped `DIGITAL_CARD_ORDER_SCHEMA_VERSION` to 5.
- **Impact:** Fulfillment can match the on-card managers without opening JSON; paste is longer but machine- and human-readable; email and WhatsApp share the same contract.

### 057
- **Context:** Call and WhatsApp were always stacked in a fixed order; operators had no explicit handoff line when a client hid one or swapped order.
- **Decision:** Added `CtaChannelId`, `activeCtaChannels`, `ctaChannelOrder`, `orderedActiveCtaChannels()`, v18 migration in `customizer-store`, on-card `CtaManagerPanel` (Social-style toggle/reorder), `CtaSegment` renders ordered active channels; `buildArchitectHandoffDataLines` + `appendDesignSpec` + compact `buildOrderSummaryLines`/`Ka` emit CTA order; `DIGITAL_CARD_ORDER_SCHEMA_VERSION` 6; advisory `cta-buttons` when both off.
- **Impact:** Card matches client intent; WhatsApp/email paste documents primary button layout; slight paste length increase.

### 058
- **Context:** Bottom pill popovers (`absolute bottom-full`) lived inside `StartPageEditorColumn`’s `overflow-hidden` preview shell; on small viewports content was clipped and outside-click handling treated portaled UI as “outside” the pill root.
- **Decision:** `useMediaMinMd` (768px) gates behavior: `md+` unchanged anchored popovers + window outside-click only when `mdUp`; below `md`, `CardEditorMobileOverlay` uses `createPortal` to `document.body`, centered panel with backdrop, Escape, and body scroll lock; shared surface builders in Background/Look/Type/Experience panels.
- **Impact:** Mobile editors are fully visible above the chrome bar; desktop UX untouched; one extra paint after mount until `matchMedia` resolves (initial hook state assumes desktop).

### 059
- **Context:** Clients needed more visible card while editing; multiple bottom pills and multiple color inputs competed for space (especially Background overlay stops and Type body/display/CTA hex rows).
- **Decision:** `openBottomPill` + `BottomPillPanelProps` (`isOpen` / `onToggle` / `onClose`) lifted to `BusinessCardTemplate` so only one of Background/Look/Type/Experience is open; Background and Type replace pill tab chip rows with native `<select>`; `BackgroundOverlayUnifiedColors` + `TypographyHexColorRow` consolidate overlay gradient stops and typography hex into one picker surface (stop / section selector + single row).
- **Impact:** Clearer mobile/desktop editor chrome; `StylePresetGrids` overlay block delegates colors to the new component; pill panels require parent pill props wherever `BusinessCardTemplate` is composed with `editable`.

### 060
- **Context:** Product direction preferred accordion headers over dropdowns for pill sections; Background base and Look accent still used large preset grids instead of one color control.
- **Decision:** Added `PillSectionAccordion` (chevron headers, one active id) for Background and Type pills; `BackgroundBaseControls` solid mode uses `TypographyHexColorRow` only (`backgroundId: "custom"` on edit); Look uses the same row with `ACCENT_PRESETS` exact-match → named `accentId`, else `accentId: "custom"` + `accentCustomPrimary`; `resolveAccentPair` in `presets.ts` drives CSS (invalid custom hex → indigo fallback); `CUSTOMIZER_VERSION` 19 + migration default `accentCustomPrimary`.
- **Impact:** Smaller UI footprint; handoff/email accent line shows `custom` id when applicable; `AccentPresetGrid` unused in Look but kept exported for potential reuse.

### 061
- **Context:** Texture overlay had only pattern + strength; clients wanted a tint color like other pill surfaces.
- **Decision:** Added `textureTintHex` on `StylePresetSelection` (empty = legacy `ink()` contrast); `textureBackgroundImage(id, dark, tintHex)` uses `hexToRgba` for lines/dots/waves and a light wash under SVG grain when set; `TextureEffectControls` adds `TypographyHexColorRow`; `resolveStyleVariables` passes tint; email paste adds `TEXTURE_TINT_HEX`; `CUSTOMIZER_VERSION` 20.
- **Impact:** One more optional style field in JSON; grain+tint is a subtle wash layered under noise.

### 062
- **Context:** Motion layer (ambient glow, orbs, gradient shift, light leak) read `var(--accent)` so motion always matched accent; product wanted an independent motion color.
- **Decision:** `bgEffectTintHex` (empty = use resolved accent pair); `resolveStyleVariables` emits `--bg-effect-color` / `--bg-effect-color-secondary`; `business-card-template.css` motion selectors use those vars; `BackgroundMotionControls` adds `TypographyHexColorRow`; paste `BG_MOTION_TINT_HEX`; `CUSTOMIZER_VERSION` 21 + migration default empty string.
- **Impact:** Vignette stays neutral (unchanged); other motion effects can diverge from UI accent without breaking existing cards (empty → same as before).

### 063
- **Context:** Hero photo used `object-cover` for circle and rounded-square, so non-square uploads looked unintentionally cropped; wide-cinematic already used `object-contain`.
- **Decision:** `HeroSegment` sets `imageFitClass` to `object-contain` for all shapes; existing `photoZoom` / `photoPositionX` / `photoPositionY` still allow users to scale and pan toward a full-bleed look inside the mask.
- **Impact:** New and existing cards show the full image in-frame by default (letterboxing on `bg-slate-100`); no schema or version bump.

### 064
- **Context:** Orders computed a publish slug but did not persist it; admin preview used published-only API; publish route was unauthenticated; WhatsApp step 2 continued after failed DB insert; professional/executive needed a stable internal slug + domain handoff.
- **Decision:** Added `publish_slug`, `requested_domain`, `domain_status` on `cards` + `card_domains` table; `computeOrderPublishIntent` (subdomain = hint or name slug; pro/exec = order id); `POST /api/orders` persists intent; `GET/PATCH /api/orders/[id]` for admin; publish requires admin session + slug match (see **066**); `StartOrderReviewDialog` blocks step 2 on save failure; middleware rewrites mapped custom hosts to `/en/c/[slug]`.
- **Impact:** Turso migration `0002_order_intent_and_domains.sql` required before deploy; ops map `card_domains` via admin PATCH or SQL after DNS.

### 065
- **Context:** Professional tier blocked checkout without a domain field; ops wanted clients to order first and receive a buy/DNS guide on WhatsApp.
- **Decision:** `validateOrderState` treats empty professional domain as **advisory** only; `START_DC_ORDER_BLOCK` labels domain optional; checkout copy clarifies guide-after-order; `AdminOrdersRunbook` documents subdomain vs professional vs executive steps (single app/DB, Vercel + Cloudflare + map host).
- **Impact:** No schema change; admin page shows fixed operator instructions above the orders table.

### 066
- **Context:** `NEXT_PUBLIC_ADMIN_PASSWORD` embedded the admin secret in the client bundle; header-based checks duplicated that risk.
- **Decision:** Server-only `ADMIN_PASSWORD`; HMAC-signed payload in HttpOnly cookie (`admin-auth.ts`); `POST /api/admin/login` sets cookie, `POST /api/admin/logout` clears, `GET /api/admin/session` bootstraps UI; `verifyAdminRequest()` guards `GET /api/orders`, `GET/PATCH /api/orders/[id]`, `POST /api/cards/[slug]/publish`; admin page uses `credentials: "include"` and `useAdminOrdersAuth` (no public env var).
- **Impact:** Password never ships to browsers; ops must set `ADMIN_PASSWORD` on Vercel and sign in once per browser session.

## Architecture Decisions
- Zero backend for card features
- Sector selector removed — presets replace it
- Max 4 toggleable sections per card
- Pre-built typography packs (no individual sliders)
- Pre-built button styles (no mixing)
- Language Strategy: English first; avoid automated Georgian (human translation later)
