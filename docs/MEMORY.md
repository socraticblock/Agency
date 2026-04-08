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

## Architecture Decisions
- Zero backend for card features
- Sector selector removed — presets replace it
- Max 4 toggleable sections per card
- Pre-built typography packs (no individual sliders)
- Pre-built button styles (no mixing)
- Language Strategy: English first; avoid automated Georgian (human translation later)
