import type { StylePresetSelection } from "./types";

export interface EliteThemePreset {
  id: string;
  labelEn: string;
  /** Shallow merge into `style` — content fields untouched. */
  stylePatch: Partial<StylePresetSelection>;
}

/** One-tap looks: merges into existing `style` (does not reset content). */
export const ELITE_THEME_PRESETS: EliteThemePreset[] = [
  {
    id: "minimal-ink",
    labelEn: "Minimal ink",
    stylePatch: {
      bgBaseId: "solid",
      bgBaseColor: "#ffffff",
      bgOverlayId: "none",
      accentId: "navy",
      secondaryAccentId: "slate",
      typographyPackId: "minimal",
      vibeId: "minimal",
      animationId: "fade",
      buttonStyleId: "minimal",
      textureId: "none",
      bgEffectId: "none",
    },
  },
  {
    id: "warm-editorial",
    labelEn: "Warm editorial",
    stylePatch: {
      bgBaseColor: "#FAF8F5",
      bgOverlayId: "none",
      accentId: "copper",
      secondaryAccentId: "gold",
      typographyPackId: "editorial",
      vibeId: "glass",
      animationId: "slide-up",
      buttonStyleId: "luxury",
      textureId: "fine-grain",
      textureOpacity: 6,
      bgEffectId: "ambient-glow",
    },
  },
  {
    id: "corporate-navy",
    labelEn: "Corporate navy",
    stylePatch: {
      bgBaseColor: "#EFF6FF",
      accentId: "navy",
      secondaryAccentId: "slate",
      typographyPackId: "modern",
      vibeId: "minimal",
      animationId: "spring",
      buttonStyleId: "classic",
      textureId: "dot-grid",
      textureOpacity: 4,
      bgEffectId: "none",
    },
  },
  {
    id: "bold-neon",
    labelEn: "Bold neon",
    stylePatch: {
      bgBaseColor: "#0f172a",
      accentId: "teal",
      secondaryAccentId: "slate",
      typographyPackId: "bold",
      vibeId: "neon",
      animationId: "cinematic",
      buttonStyleId: "sharp",
      textureId: "diagonal-lines",
      textureOpacity: 8,
      bgEffectId: "gradient-shift",
    },
  },
  {
    id: "elegant-gold",
    labelEn: "Elegant gold",
    stylePatch: {
      bgBaseColor: "#FFFDF8",
      accentId: "gold",
      secondaryAccentId: "burgundy",
      typographyPackId: "elegant",
      vibeId: "glass",
      animationId: "stagger",
      buttonStyleId: "luxury",
      textureId: "topographic",
      textureOpacity: 5,
      bgEffectId: "vignette",
    },
  },
  {
    id: "noir-contrast",
    labelEn: "Noir",
    stylePatch: {
      bgBaseColor: "#111827",
      accentId: "gold",
      secondaryAccentId: "slate",
      typographyPackId: "noir",
      vibeId: "neon",
      animationId: "cinematic",
      buttonStyleId: "ghost",
      textureId: "coarse-grain",
      textureOpacity: 12,
      bgEffectId: "light-leak",
    },
  },
  {
    id: "soft-sage",
    labelEn: "Soft sage",
    stylePatch: {
      bgBaseColor: "#F0F5F0",
      accentId: "forest",
      secondaryAccentId: "teal",
      typographyPackId: "warm",
      vibeId: "minimal",
      animationId: "scale-in",
      buttonStyleId: "outlined",
      textureId: "waves",
      textureOpacity: 5,
      bgEffectId: "floating-orbs",
    },
  },
  {
    id: "indigo-glass",
    labelEn: "Indigo glass",
    stylePatch: {
      bgBaseColor: "#f8fafc",
      bgOverlayId: "linear",
      bgOverlayColor1: "#3730A3",
      bgOverlayColor2: "#1A2744",
      bgOverlayOpacity: 0.12,
      accentId: "indigo",
      secondaryAccentId: "slate",
      typographyPackId: "modern",
      vibeId: "glass",
      animationId: "slide-up",
      buttonStyleId: "classic",
      textureId: "geometric",
      textureOpacity: 4,
      bgEffectId: "ambient-glow",
    },
  },
];

const SAVED_THEME_KEY = "genezisi_lane1_saved_style_v1";

export function saveLane1StyleToDisk(style: StylePresetSelection) {
  try {
    localStorage.setItem(SAVED_THEME_KEY, JSON.stringify(style));
  } catch {
    /* ignore */
  }
}

export function loadLane1StyleFromDisk(): StylePresetSelection | null {
  try {
    const raw = localStorage.getItem(SAVED_THEME_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StylePresetSelection;
  } catch {
    return null;
  }
}
