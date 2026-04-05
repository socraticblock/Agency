# Project Memory

## Index
- **006** — Elite roadmap wiring (sections, typography, texture/effects, social/QR, motion, themes, card chrome, cleanup)

## Current Status
- Phase 1 (Foundation): Complete
- Phase 2 (Photo System): Grain + Ken Burns option shipped; full-bleed still cancelled; scroll parallax not implemented
- Refactor audit: Complete (7 monoliths decomposed)
- Phase 3.1 (Solid Color System): Complete
- Elite customizer roadmap (Phases 2–8 + card chrome): Largely implemented in `/start` (Apr 2026)

## Known Issues
- Full-Bleed Hero photo shape: Cancelled
- Parallax scroll: Needs IntersectionObserver fallback
- Print layout: Needs dedicated print-only container (pending)

## Detailed observations

### 006
- **Context:** Roadmap audit listed gaps between `Lane1CustomizerState` / `resolveStyleVariables` and UI (sections, textures, typography packs, QR, motion, themes).
- **Decision:** Implemented section dispatcher + content editors; texture/bg-effect layers + secondary accent; typography packs + button styles; social/QR options; `buildItemVariants` + tilt/hover; elite theme presets with local save + toast; `cardDarkSurface` + radius/shadow; removed dead `SectorGrid` and legacy `components/customizer/`; film-grain uses inline SVG noise.
- **Impact:** Customizer version remains 5 with deep merge migration; more surface area in presets/types; build verified with `npm run build`.

## Architecture Decisions
- Zero backend for card features
- Sector selector removed — presets replace it
- Max 4 toggleable sections per card
- Pre-built typography packs (no individual sliders)
- Pre-built button styles (no mixing)
- Language Strategy: English first; avoid automated Georgian (human translation later)
