// Barrel re-export — preserves the existing public API so all consumers
// can keep importing from "../lib/presets" without changes.

// Types
export type {
  BackgroundPreset,
  TextColorPreset,
  AccentPreset,
  FontPreset,
  VibePreset,
  AnimationPreset,
  PhotoShapePreset,
  PhotoEffectPreset,
  PhotoBorderPreset,
  PhotoOverlayPreset,
} from './types';

// Background presets
export {
  BACKGROUND_SOLID_PRESETS,
  BACKGROUND_GRADIENT_PRESETS,
  BACKGROUND_PRESETS,
  LEGACY_BACKGROUND_ID_MAP,
} from './background-presets';

// Style presets (text, accent, font, vibe, animation)
export {
  TEXT_COLOR_PRESETS,
  ACCENT_PRESETS,
  FONT_PRESETS,
  VIBE_PRESETS,
  ANIMATION_PRESETS,
} from './style-presets';

// Photo presets
export {
  PHOTO_SHAPE_PRESETS,
  PHOTO_EFFECT_PRESETS,
  PHOTO_OVERLAY_PRESETS,
  PHOTO_BORDER_PRESETS,
} from './photo-presets';

// Utility functions
export {
  isBackgroundLockingTextColor,
  resolveStyleVariables,
} from './resolve-styles';
