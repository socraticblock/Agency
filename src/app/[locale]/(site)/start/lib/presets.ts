import type { CSSProperties } from "react";
import type {
  BodyTypographyPackId,
  ButtonStyleId,
  CardShadowId,
  CardTextScaleId,
  StylePresetSelection,
  TypographyPackId,
} from "./types";
import { textureBackgroundImage, textureBackgroundSize } from "./texture-presets";

const SOLID_HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * Calculates the relative luminance of a color for accessibility (WCAG 2.0).
 * Range: 0.0 (Black) to 1.0 (White).
 */
function getLuminance(hex: string): number {
  const h = hex.startsWith("#") ? hex : `#${hex}`;
  // Basic hex parsing for 6-char hex
  try {
    const r = parseInt(h.slice(1, 3), 16) / 255;
    const g = parseInt(h.slice(3, 5), 16) / 255;
    const b = parseInt(h.slice(5, 7), 16) / 255;

    const a = [r, g, b].map((v) => {
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  } catch (e) {
    return 0.5; // Neutral fallback
  }
}

/**
 * Determines if a color is "dark" based on relative luminance.
 * Threshold is set to 0.5 (neutral midpoint).
 */
export function isDarkColor(hex: string): boolean {
  if (!hex || !hex.startsWith("#")) return false;
  return getLuminance(hex) < 0.5;
}

export interface BackgroundPreset {
  id: string;
  labelKa: string;
  labelEn: string;
  /** Resolved background for --bg-primary */
  cssValue: string;
  category: "solid" | "gradient";
  /**
   * When true, --text-primary uses pairedTextColor and the text swatch is hidden.
   * Dark solids + all gradients (fixed per refinement brief §8.1–8.2).
   */
  locksTextColor: boolean;
  /** Used when locksTextColor is true */
  pairedTextColor: string;
}

export interface TextColorPreset {
  id: string;
  labelKa: string;
  labelEn: string;
  color: string;
}

export interface AccentPreset {
  id: string;
  labelKa: string;
  labelEn: string;
  accent: string;
  accentSecondary: string;
}

export interface FontPreset {
  id: string;
  labelKa: string;
  labelEn: string;
  fontHeading: string;
  fontBody: string;
  headingWeight: number;
  bodyWeight: number;
}

export interface VibePreset {
  id: string;
  labelKa: string;
  labelEn: string;
  /** UI features: glass blur, shadow depth, etc. */
  blur: string;
  shadow: string;
  borderOpacity: number;
}

export interface AnimationPreset {
  id: string;
  labelKa: string;
  labelEn: string;
  /** Framer motion spring settings or base delay */
  stagger: number;
  entranceY: number;
  springDamping: number;
  /** Drives `buildItemVariants` behavior */
  flavor: "fade" | "spring" | "spring-blur" | "scale";
}

export interface PhotoShapePreset {
  id: string;
  labelKa: string;
  labelEn: string;
  icon: string;
}

export interface PhotoEffectPreset {
  id: string;
  labelKa: string;
  labelEn: string;
  filter: string;
}

export interface PhotoBorderPreset {
  id: string;
  labelKa: string;
  labelEn: string;
}

export interface PhotoOverlayPreset {
  id: string;
  labelKa: string;
  labelEn: string;
}

/** §8.1 — eight solid backgrounds (light + two dark) */
export const BACKGROUND_SOLID_PRESETS: BackgroundPreset[] = [
  {
    id: "warmcream",
    labelKa: "თბილი კრემი",
    labelEn: "Warm cream",
    cssValue: "#FAF8F5",
    category: "solid",
    locksTextColor: false,
    pairedTextColor: "#1A1A2E",
  },
  {
    id: "purewhite",
    labelKa: "წმინდა თეთრი",
    labelEn: "Pure white",
    cssValue: "#FFFFFF",
    category: "solid",
    locksTextColor: false,
    pairedTextColor: "#111827",
  },
  {
    id: "coolgray",
    labelKa: "ღია ნაცრისფერი",
    labelEn: "Cool gray",
    cssValue: "#F3F4F6",
    category: "solid",
    locksTextColor: false,
    pairedTextColor: "#111827",
  },
  {
    id: "softblue",
    labelKa: "ღია ლურჯი",
    labelEn: "Soft blue",
    cssValue: "#EFF6FF",
    category: "solid",
    locksTextColor: false,
    pairedTextColor: "#1E3A5F",
  },
  {
    id: "sagemist",
    labelKa: "ქვიში ნისლი",
    labelEn: "Sage mist",
    cssValue: "#F0F5F0",
    category: "solid",
    locksTextColor: false,
    pairedTextColor: "#1A2E1A",
  },
  {
    id: "blush",
    labelKa: "შიში ვარდისფერი",
    labelEn: "Blush",
    cssValue: "#FFF5F5",
    category: "solid",
    locksTextColor: false,
    pairedTextColor: "#4A1A1A",
  },
  {
    id: "deepnavy",
    labelKa: "ღრმა სანაპირო",
    labelEn: "Deep navy",
    cssValue: "#0F172A",
    category: "solid",
    locksTextColor: true,
    pairedTextColor: "#F1F5F9",
  },
  {
    id: "charcoalbg",
    labelKa: "ქვა",
    labelEn: "Charcoal",
    cssValue: "#1F2937",
    category: "solid",
    locksTextColor: true,
    pairedTextColor: "#E5E7EB",
  },
];

/** §8.2 — four gradient presets (135deg, subtle) */
export const BACKGROUND_GRADIENT_PRESETS: BackgroundPreset[] = [
  {
    id: "dawn",
    labelKa: "დილა",
    labelEn: "Dawn",
    cssValue: "linear-gradient(135deg, #FAF8F5, #F0ECE6)",
    category: "gradient",
    locksTextColor: true,
    pairedTextColor: "#1A1A2E",
  },
  {
    id: "ocean",
    labelKa: "ოკეანე",
    labelEn: "Ocean",
    cssValue: "linear-gradient(135deg, #EFF6FF, #E0F2FE)",
    category: "gradient",
    locksTextColor: true,
    pairedTextColor: "#1E3A5F",
  },
  {
    id: "forestgrad",
    labelKa: "ტყე",
    labelEn: "Forest",
    cssValue: "linear-gradient(135deg, #F0F5F0, #E8F0E8)",
    category: "gradient",
    locksTextColor: true,
    pairedTextColor: "#1A2E1A",
  },
  {
    id: "dusk",
    labelKa: "საღამო",
    labelEn: "Dusk",
    cssValue: "linear-gradient(135deg, #FFF5F5, #FDF2F8)",
    category: "gradient",
    locksTextColor: true,
    pairedTextColor: "#4A1A1A",
  },
];

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  ...BACKGROUND_SOLID_PRESETS,
  ...BACKGROUND_GRADIENT_PRESETS,
];

export function isValidSolidHex(s: string | undefined): boolean {
  return typeof s === "string" && SOLID_HEX_RE.test(s.trim());
}

/**
 * Resolves `--bg-base-color` from `bgBaseColor` + `backgroundId`.
 * Invalid or legacy values fall back to a known solid preset so `backgroundColor` is never invalid CSS.
 */
export function resolveSolidBgBaseColor(selection: StylePresetSelection): string {
  const id =
    selection.backgroundId === "minimal-white" ? "purewhite" : selection.backgroundId;
  if (isValidSolidHex(selection.bgBaseColor)) {
    return selection.bgBaseColor.trim();
  }
  const preset = BACKGROUND_PRESETS.find((p) => p.id === id);
  if (preset?.category === "solid" && isValidSolidHex(preset.cssValue)) return preset.cssValue;
  const solid = BACKGROUND_SOLID_PRESETS.find((p) => p.id === id);
  if (solid && isValidSolidHex(solid.cssValue)) return solid.cssValue;
  return "#ffffff";
}

/** Persist-time cleanup: fix legacy `minimal-white` id and invalid hex in localStorage. */
export function coerceSolidBgBaseInStyle(style: StylePresetSelection): StylePresetSelection {
  const next = { ...style };
  if (next.backgroundId === "minimal-white") next.backgroundId = "purewhite";
  if (next.bgBaseId === "solid" && !isValidSolidHex(next.bgBaseColor)) {
    next.bgBaseColor = resolveSolidBgBaseColor(next);
  } else if (isValidSolidHex(next.bgBaseColor)) {
    next.bgBaseColor = next.bgBaseColor.trim();
  }
  return next;
}

const CARD_CHROME_SHADOW: Record<CardShadowId, string> = {
  none: "none",
  soft: "0 4px 24px rgba(15, 23, 42, 0.08)",
  elevated: "0 12px 40px rgba(15, 23, 42, 0.12)",
  luxury: "0 20px 50px rgba(15, 23, 42, 0.18)",
};

/** Dark text on light backgrounds — §8.1 subset when client can pick */
export const TEXT_COLOR_PRESETS: TextColorPreset[] = [
  { id: "ink", labelKa: "მელანი", labelEn: "Ink", color: "#1A1A2E" },
  { id: "charcoal", labelKa: "ნაცრისფერი", labelEn: "Charcoal", color: "#374151" },
  { id: "navytext", labelKa: "სანაპირო", labelEn: "Navy", color: "#1A2744" },
  { id: "warm", labelKa: "თბილი შავი", labelEn: "Warm black", color: "#292524" },
  { id: "slate", labelKa: "სლეითი", labelEn: "Slate", color: "#334155" },
  { id: "soft", labelKa: "რბილი", labelEn: "Soft", color: "#4B5563" },
];

/** §8.3 — eight accent presets */
export const ACCENT_PRESETS: AccentPreset[] = [
  { id: "navy", labelKa: "სანაპირო", labelEn: "Navy", accent: "#1A2744", accentSecondary: "#2D3F5E" },
  { id: "gold", labelKa: "ოქრო", labelEn: "Gold", accent: "#C5A55A", accentSecondary: "#A8843A" },
  { id: "forest", labelKa: "ტყე", labelEn: "Forest", accent: "#2D5016", accentSecondary: "#365314" },
  { id: "burgundy", labelKa: "ბორდო", labelEn: "Burgundy", accent: "#7F1D1D", accentSecondary: "#991B1B" },
  { id: "teal", labelKa: "ტილა", labelEn: "Teal", accent: "#0F766E", accentSecondary: "#115E59" },
  { id: "slate", labelKa: "სლეითი", labelEn: "Slate", accent: "#475569", accentSecondary: "#64748B" },
  { id: "copper", labelKa: "სპილენძი", labelEn: "Copper", accent: "#B45309", accentSecondary: "#C2410C" },
  { id: "indigo", labelKa: "ინდიგო", labelEn: "Indigo", accent: "#3730A3", accentSecondary: "#4338CA" },
];

export const FONT_PRESETS: FontPreset[] = [
  {
    id: "classic",
    labelKa: "კლასიკური",
    labelEn: "Classic",
    fontHeading:
      "var(--font-playfair), 'Noto Serif Georgian', Georgia, serif",
    fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    headingWeight: 700,
    bodyWeight: 400,
  },
  {
    id: "modern",
    labelKa: "თანამედროვე",
    labelEn: "Modern",
    fontHeading: "var(--font-space), 'Noto Sans Georgian', system-ui, sans-serif",
    fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    headingWeight: 600,
    bodyWeight: 400,
  },
  {
    id: "bold",
    labelKa: "მძიმე",
    labelEn: "Bold",
    fontHeading: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    headingWeight: 700,
    bodyWeight: 400,
  },
  {
    id: "minimal",
    labelKa: "მინიმალური",
    labelEn: "Minimal",
    fontHeading: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    headingWeight: 300,
    bodyWeight: 300,
  },
  {
    id: "traditional",
    labelKa: "ტრადიციული",
    labelEn: "Traditional",
    fontHeading: "var(--font-merriweather), 'Noto Serif Georgian', Georgia, serif",
    fontBody: "var(--font-source-sans), 'Noto Sans Georgian', system-ui, sans-serif",
    headingWeight: 700,
    bodyWeight: 400,
  },
];

/** Roadmap typography packs — drives `--font-heading` / `--font-body` via `typographyPackId`. */
export interface TypographyPackPreset extends FontPreset {
  id: TypographyPackId;
}

export type BodyTypographyGroup = "neutral" | "humanist" | "distinctive";

/** Card body copy — separate from display packs for visibly different stacks. */
export interface BodyTypographyPack {
  id: BodyTypographyPackId;
  labelKa: string;
  labelEn: string;
  group: BodyTypographyGroup;
  fontBody: string;
  bodyWeight: number;
  bodyLineHeight: number;
  letterSpacing?: string;
}

export const BODY_TYPOGRAPHY_PRESETS: BodyTypographyPack[] = [
  {
    id: "body-neutral",
    labelKa: "ნეიტრალური",
    labelEn: "Neutral",
    group: "neutral",
    fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    bodyWeight: 400,
    bodyLineHeight: 1.5,
  },
  {
    id: "body-strong",
    labelKa: "ძლიერი",
    labelEn: "Strong",
    group: "neutral",
    fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    bodyWeight: 600,
    bodyLineHeight: 1.38,
  },
  {
    id: "body-air",
    labelKa: "ჰაერიანი",
    labelEn: "Light",
    group: "neutral",
    fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    bodyWeight: 300,
    bodyLineHeight: 1.65,
  },
  {
    id: "body-humanist",
    labelKa: "კითხვადი",
    labelEn: "Readable",
    group: "humanist",
    fontBody: "var(--font-source-sans), 'Noto Sans Georgian', system-ui, sans-serif",
    bodyWeight: 400,
    bodyLineHeight: 1.52,
  },
  {
    id: "body-warm",
    labelKa: "თბილი",
    labelEn: "Warm",
    group: "humanist",
    fontBody: "var(--font-source-sans), 'Noto Sans Georgian', system-ui, sans-serif",
    bodyWeight: 400,
    bodyLineHeight: 1.55,
    letterSpacing: "0.02em",
  },
  {
    id: "body-serif",
    labelKa: "რედაქციული",
    labelEn: "Editorial",
    group: "distinctive",
    fontBody: "var(--font-merriweather), 'Noto Serif Georgian', Georgia, serif",
    bodyWeight: 400,
    bodyLineHeight: 1.58,
  },
  {
    id: "body-geometric",
    labelKa: "გეომეტრიული",
    labelEn: "Geometric",
    group: "distinctive",
    fontBody: "var(--font-space), 'Noto Sans Georgian', system-ui, sans-serif",
    bodyWeight: 400,
    bodyLineHeight: 1.45,
  },
  {
    id: "body-bold",
    labelKa: "ტექნო",
    labelEn: "Bold geo",
    group: "distinctive",
    fontBody: "var(--font-space), 'Noto Sans Georgian', system-ui, sans-serif",
    bodyWeight: 700,
    bodyLineHeight: 1.32,
  },
];

/** When a theme or sidebar picks a display pack, pair a recommended body stack. */
export const LEGACY_DISPLAY_TO_BODY_PACK: Record<TypographyPackId, BodyTypographyPackId> = {
  classic: "body-neutral",
  modern: "body-geometric",
  editorial: "body-serif",
  bold: "body-strong",
  minimal: "body-air",
  warm: "body-humanist",
  noir: "body-bold",
  elegant: "body-warm",
};

/** Maps body packs to legacy `fontId` (FONT_PRESETS) for older tooling. */
export const BODY_TYPOGRAPHY_TO_LEGACY_FONT: Record<BodyTypographyPackId, string> = {
  "body-neutral": "minimal",
  "body-strong": "bold",
  "body-air": "minimal",
  "body-humanist": "traditional",
  "body-warm": "traditional",
  "body-serif": "traditional",
  "body-geometric": "modern",
  "body-bold": "bold",
};

export function migrateLegacyBodyTypographyId(raw: string | undefined): BodyTypographyPackId {
  if (!raw) return "body-air";
  if (BODY_TYPOGRAPHY_PRESETS.some((p) => p.id === raw)) {
    return raw as BodyTypographyPackId;
  }
  if (raw in LEGACY_DISPLAY_TO_BODY_PACK) {
    return LEGACY_DISPLAY_TO_BODY_PACK[raw as TypographyPackId];
  }
  return "body-air";
}

export function resolveBodyTypographyPack(selection: StylePresetSelection): BodyTypographyPack {
  const normalized = migrateLegacyBodyTypographyId(String(selection.bodyTypographyPackId ?? ""));
  return (
    BODY_TYPOGRAPHY_PRESETS.find((p) => p.id === normalized) ?? BODY_TYPOGRAPHY_PRESETS[0]
  );
}

export interface CardTextScalePreset {
  id: CardTextScaleId;
  labelEn: string;
  labelKa: string;
  /** CSS zoom factor on `.business-card-template-font-layer` (print forces 1). */
  zoom: number;
}

export const CARD_TEXT_SCALE_PRESETS: CardTextScalePreset[] = [
  { id: "compact", labelEn: "S", labelKa: "S", zoom: 0.9 },
  { id: "default", labelEn: "M", labelKa: "M", zoom: 1 },
  { id: "comfortable", labelEn: "L", labelKa: "L", zoom: 1.08 },
  { id: "large", labelEn: "XL", labelKa: "XL", zoom: 1.15 },
];

export function resolveCardTextZoomScale(selection: StylePresetSelection): number {
  const id = selection.cardTextScaleId ?? "default";
  const p = CARD_TEXT_SCALE_PRESETS.find((x) => x.id === id);
  return p?.zoom ?? 1;
}

export const TYPOGRAPHY_PACK_PRESETS: TypographyPackPreset[] = [
  {
    id: "classic",
    labelKa: "კლასიკური",
    labelEn: "Classic",
    fontHeading:
      "var(--font-playfair), 'Noto Serif Georgian', Georgia, serif",
    fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    headingWeight: 700,
    bodyWeight: 400,
  },
  {
    id: "modern",
    labelKa: "თანამედროვე",
    labelEn: "Modern",
    fontHeading: "var(--font-space), 'Noto Sans Georgian', system-ui, sans-serif",
    fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    headingWeight: 600,
    bodyWeight: 400,
  },
  {
    id: "editorial",
    labelKa: "რედაქციული",
    labelEn: "Editorial",
    fontHeading:
      "var(--font-playfair), 'Noto Serif Georgian', Georgia, serif",
    fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    headingWeight: 600,
    bodyWeight: 400,
  },
  {
    id: "bold",
    labelKa: "მძიმე",
    labelEn: "Bold",
    fontHeading: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    headingWeight: 800,
    bodyWeight: 500,
  },
  {
    id: "minimal",
    labelKa: "მინიმალური",
    labelEn: "Minimal",
    fontHeading: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    headingWeight: 300,
    bodyWeight: 300,
  },
  {
    id: "warm",
    labelKa: "თბილი",
    labelEn: "Warm",
    fontHeading:
      "var(--font-merriweather), 'Noto Serif Georgian', Georgia, serif",
    fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    headingWeight: 700,
    bodyWeight: 400,
  },
  {
    id: "noir",
    labelKa: "ნუარ",
    labelEn: "Noir",
    fontHeading: "var(--font-space), 'Noto Sans Georgian', system-ui, sans-serif",
    fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    headingWeight: 800,
    bodyWeight: 400,
  },
  {
    id: "elegant",
    labelKa: "ელეგანტური",
    labelEn: "Elegant",
    fontHeading:
      "var(--font-playfair), 'Noto Serif Georgian', Georgia, serif",
    fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif",
    headingWeight: 500,
    bodyWeight: 300,
  },
];

export interface ButtonStylePreset {
  id: ButtonStyleId;
  labelKa: string;
  labelEn: string;
}

export const BUTTON_STYLE_PRESETS: ButtonStylePreset[] = [
  { id: "classic", labelKa: "კლასიკური", labelEn: "Classic" },
  { id: "outlined", labelKa: "კონტური", labelEn: "Outlined" },
  { id: "sharp", labelKa: "კუთხოვანი", labelEn: "Sharp" },
  { id: "luxury", labelKa: "ლუქსი", labelEn: "Luxury" },
  { id: "minimal", labelKa: "თხელი", labelEn: "Minimal" },
  { id: "brutalist", labelKa: "ბრუტალისტი", labelEn: "Brutalist" },
  { id: "stripe", labelKa: "ზოლი", labelEn: "Stripe" },
  { id: "tint", labelKa: "გაფერადება", labelEn: "Tint" },
  { id: "clay", labelKa: "კლეი", labelEn: "Clay" },
  { id: "metal", labelKa: "მეტალი", labelEn: "Metal" },
  { id: "mesh", labelKa: "ბადე", labelEn: "Mesh" },
  { id: "glassmorph", labelKa: "მინა", labelEn: "Glass" },
];

/** Keep legacy `fontId` in sync for older saves / grids that still key on it. */
export const TYPOGRAPHY_TO_LEGACY_FONT: Record<TypographyPackId, string> = {
  classic: "classic",
  modern: "modern",
  editorial: "classic",
  bold: "bold",
  minimal: "minimal",
  warm: "traditional",
  noir: "modern",
  elegant: "classic",
};

export const VIBE_PRESETS: VibePreset[] = [
  {
    id: "minimal",
    labelKa: "მინიმალური",
    labelEn: "Minimal",
    blur: "0px",
    shadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
    borderOpacity: 0.1,
  },
  {
    id: "glass",
    labelKa: "მინა",
    labelEn: "Glassmorphic",
    blur: "16px",
    shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    borderOpacity: 0.25,
  },
  {
    id: "neon",
    labelKa: "ნეონი",
    labelEn: "Neon glow",
    blur: "4px",
    shadow: "0 0 15px currentColor",
    borderOpacity: 0.4,
  },
];

export const ANIMATION_PRESETS: AnimationPreset[] = [
  {
    id: "none",
    labelKa: "გარეშე",
    labelEn: "None",
    stagger: 0,
    entranceY: 0,
    springDamping: 40,
    flavor: "fade",
  },
  {
    id: "fade",
    labelKa: "გაქრობა",
    labelEn: "Subtle fade",
    stagger: 0.05,
    entranceY: 10,
    springDamping: 25,
    flavor: "spring-blur",
  },
  {
    id: "spring",
    labelKa: "ზამბარა",
    labelEn: "Playful spring",
    stagger: 0.08,
    entranceY: 30,
    springDamping: 12,
    flavor: "spring-blur",
  },
  {
    id: "cinematic",
    labelKa: "კინემატოგრაფიული",
    labelEn: "Cinematic",
    stagger: 0.15,
    entranceY: 50,
    springDamping: 20,
    flavor: "spring-blur",
  },
  {
    id: "slide-up",
    labelKa: "ზემოდან",
    labelEn: "Slide up",
    stagger: 0.06,
    entranceY: 36,
    springDamping: 26,
    flavor: "spring",
  },
  {
    id: "scale-in",
    labelKa: "მასშტაბი",
    labelEn: "Scale in",
    stagger: 0.07,
    entranceY: 12,
    springDamping: 18,
    flavor: "scale",
  },
  {
    id: "stagger",
    labelKa: "საფეხური",
    labelEn: "Soft stagger",
    stagger: 0.14,
    entranceY: 18,
    springDamping: 22,
    flavor: "spring-blur",
  },
];

export function isBackgroundLockingTextColor(backgroundId: string): boolean {
  const bg = BACKGROUND_PRESETS.find((p) => p.id === backgroundId);
  return Boolean(bg?.locksTextColor);
}

/** Resolves `--accent` / `--accent-secondary` from named presets or `accentId === "custom"`. */
export function resolveAccentPair(selection: StylePresetSelection): { accent: string; accentSecondary: string } {
  const custom = (selection.accentCustomPrimary ?? "").trim();
  if (selection.accentId === "custom") {
    if (/^#[0-9A-Fa-f]{6}$/.test(custom)) {
      return {
        accent: custom,
        accentSecondary: `color-mix(in srgb, ${custom} 68%, #0f172a)`,
      };
    }
    const fb = ACCENT_PRESETS.find((p) => p.id === "indigo") ?? ACCENT_PRESETS[0];
    return { accent: fb.accent, accentSecondary: fb.accentSecondary };
  }
  const row = ACCENT_PRESETS.find((p) => p.id === selection.accentId) ?? ACCENT_PRESETS[0];
  return { accent: row.accent, accentSecondary: row.accentSecondary };
}

export function resolveStyleVariables(selection: StylePresetSelection): CSSProperties {
  const bg = BACKGROUND_PRESETS.find((p) => p.id === selection.backgroundId) ?? BACKGROUND_SOLID_PRESETS[0];
  const txt = TEXT_COLOR_PRESETS.find((p) => p.id === selection.textColorId) ?? TEXT_COLOR_PRESETS[0];
  const acc = resolveAccentPair(selection);
  const displayPackId = selection.buttonTypographyPackId ?? selection.typographyPackId ?? "minimal";
  const ctaPackId =
    selection.ctaTypographyPackId ?? selection.buttonTypographyPackId ?? selection.typographyPackId ?? "minimal";
  const bodyResolved = resolveBodyTypographyPack(selection);
  const displayFont =
    TYPOGRAPHY_PACK_PRESETS.find((p) => p.id === displayPackId) ??
    TYPOGRAPHY_PACK_PRESETS.find((p) => p.id === selection.typographyPackId) ??
    TYPOGRAPHY_PACK_PRESETS.find((p) => p.id === "minimal")!;
  const ctaFont =
    TYPOGRAPHY_PACK_PRESETS.find((p) => p.id === ctaPackId) ??
    TYPOGRAPHY_PACK_PRESETS.find((p) => p.id === "minimal")!;
  const vibe = VIBE_PRESETS.find((p) => p.id === selection.vibeId) ?? VIBE_PRESETS[0];

  // 1. Resolve Base Layer (never pass invalid hex into --bg-base-color)
  const baseColorValue = resolveSolidBgBaseColor(selection);

  // 2. Resolve Overlay Layer
  let overlayGradientValue = "transparent";

  if (selection.bgOverlayId === "linear") {
    overlayGradientValue = `linear-gradient(${selection.bgOverlayAngle}deg, ${selection.bgOverlayColor1}, ${selection.bgOverlayColor2})`;
  } else if (selection.bgOverlayId === "radial") {
    overlayGradientValue = `radial-gradient(circle at center, ${selection.bgOverlayColor1}, ${selection.bgOverlayColor2})`;
  } else if (selection.bgOverlayId === "mesh") {
    // High-end organic mesh blend using 3 colors
    overlayGradientValue = `
      radial-gradient(at 0% 0%, ${selection.bgOverlayColor1} 0%, transparent 50%),
      radial-gradient(at 100% 0%, ${selection.bgOverlayColor2} 0%, transparent 50%),
      radial-gradient(at 50% 100%, ${selection.bgOverlayColor3} 0%, transparent 50%)
    `.trim();
  } else if (selection.bgOverlayId === "solid") {
    overlayGradientValue = selection.bgOverlayColor1;
  }

  // 3. Composition & Contrast Logic
  let backgroundIsDark = isDarkColor(baseColorValue);
  
  if (selection.bgBaseId === "image") {
    backgroundIsDark = true; // Assume images need light text for overlaying
  }
  
  if (selection.bgOverlayId !== "none" && selection.bgOverlayOpacity > 0.4) {
    backgroundIsDark = isDarkColor(selection.bgOverlayColor1);
  }

  // User's text color selection takes priority (preset baseline)
  let textColor = txt.color;

  // Force light text for dark backgrounds for accessibility
  if (backgroundIsDark) {
    textColor = "#F1F5F9";
  }

  const bgResolved = baseColorValue;

  const bodyHex = (selection.bodyTextHex ?? "").trim();
  const buttonHex = (selection.buttonTextHex ?? "").trim();
  const ctaHex = (selection.ctaTextHex ?? "").trim();
  const textBody = bodyHex || textColor;
  const textHeading = buttonHex || textColor;
  const textCta = ctaHex || textColor;

  const cardRadius = typeof selection.cardRadiusPx === "number" ? selection.cardRadiusPx : 24;

  const texOp =
    selection.textureId === "none"
      ? 0
      : Math.min(1, Math.max(0, selection.textureOpacity / 100));

  const bgEffectOp =
    selection.bgEffectId === "none"
      ? 0
      : Math.min(1, Math.max(0, (selection.bgEffectOpacity ?? 100) / 100));

  const bgEffectSpeed = Math.min(200, Math.max(50, selection.bgEffectSpeed ?? 100));
  const bgEffectIntensity = Math.min(150, Math.max(50, selection.bgEffectIntensity ?? 100));
  const bgEffectIntNorm = (bgEffectIntensity - 50) / 100;
  const cardTextZoom = resolveCardTextZoomScale(selection);

  const motionTint = (selection.bgEffectTintHex ?? "").trim();
  const motionColors = /^#[0-9A-Fa-f]{6}$/.test(motionTint)
    ? {
        primary: motionTint,
        secondary: `color-mix(in srgb, ${motionTint} 68%, #0f172a)`,
      }
    : { primary: acc.accent, secondary: acc.accentSecondary };

  return {
    "--bg-base-color": baseColorValue,
    "--overlay-gradient": overlayGradientValue,
    "--overlay-opacity": selection.bgOverlayId === "none" ? "0" : String(selection.bgOverlayOpacity),
    "--bg-primary": bgResolved,
    "--background": bgResolved,
    "--text-primary": textBody,
    "--text-body": textBody,
    "--text-heading": textHeading,
    "--text-cta": textCta,
    "--accent": acc.accent,
    "--accent-secondary": acc.accentSecondary,
    "--texture-pattern": textureBackgroundImage(
      selection.textureId,
      backgroundIsDark,
      selection.textureTintHex,
    ),
    "--texture-bg-size": textureBackgroundSize(selection.textureId),
    "--texture-opacity": String(texOp),
    // multiply / screen keeps grain readable on light vs dark surfaces (overlay mutes mid-tones)
    "--texture-blend-mode":
      selection.textureId === "none"
        ? "normal"
        : backgroundIsDark
          ? "screen"
          : "multiply",
    "--bg-effect-opacity": String(bgEffectOp),
    "--bg-effect-speed": String(bgEffectSpeed),
    "--bg-effect-int-norm": String(bgEffectIntNorm),
    "--bg-effect-color": motionColors.primary,
    "--bg-effect-color-secondary": motionColors.secondary,
    "--bg-gradient": selection.bgOverlayId !== "none"
      ? overlayGradientValue
      : `linear-gradient(135deg, ${acc.accent}, ${acc.accentSecondary})`,
    "--font-heading": displayFont.fontHeading,
    "--font-cta": ctaFont.fontHeading,
    "--font-body": bodyResolved.fontBody,
    "--font-heading-weight": String(displayFont.headingWeight),
    "--font-cta-weight": String(ctaFont.headingWeight),
    "--font-body-weight": String(bodyResolved.bodyWeight),
    "--font-body-line-height": String(bodyResolved.bodyLineHeight),
    "--font-body-letter-spacing": bodyResolved.letterSpacing ?? "normal",
    "--card-text-zoom": String(cardTextZoom),
    "--glass-blur": vibe.blur,
    "--card-shadow": vibe.shadow,
    "--border-opacity": String(vibe.borderOpacity),
    "--card-radius": `${cardRadius}px`,
    "--card-chrome-shadow":
      CARD_CHROME_SHADOW[selection.cardShadowId] ?? CARD_CHROME_SHADOW.soft,
  } as CSSProperties;
}

/** Migrate legacy preset ids (pre–refinement brief §8) */
export const LEGACY_BACKGROUND_ID_MAP: Record<string, string> = {
  "minimal-white": "purewhite",
  cream: "warmcream",
  white: "purewhite",
  lightgray: "coolgray",
  sand: "sagemist",
  softnavy: "softblue",
  charcoal: "coolgray",
  grad1: "dawn",
  grad2: "ocean",
};

export const PHOTO_SHAPE_PRESETS: PhotoShapePreset[] = [
  { id: "circle", labelKa: "წრე", labelEn: "Circle", icon: "Circle" },
  { id: "rounded-square", labelKa: "კვადრატი", labelEn: "Square", icon: "Square" },
  { id: "wide-cinematic", labelKa: "კინემატოგრაფიული", labelEn: "Cinematic", icon: "Monitor" },
];

export const PHOTO_EFFECT_PRESETS: PhotoEffectPreset[] = [
  { id: "none", labelKa: "ორიგინალი", labelEn: "Original", filter: "none" },
  { id: "bw", labelKa: "შავ-თეთრი", labelEn: "B&W", filter: "grayscale(100%)" },
  { id: "sepia", labelKa: "სეპია", labelEn: "Sepia Warm", filter: "sepia(40%)" },
  { id: "cool", labelKa: "ცივი ტონი", labelEn: "Cool Tone", filter: "saturate(0.7) contrast(1.1) hue-rotate(180deg)" },
  { id: "high-contrast", labelKa: "კონტრასტული", labelEn: "High Contrast", filter: "contrast(130%) saturate(110%)" },
  { id: "soft-focus", labelKa: "რბილი", labelEn: "Soft Focus", filter: "blur(2px) brightness(1.1)" },
  { id: "vivid", labelKa: "კაშკაშა", labelEn: "Vivid", filter: "saturate(150%)" },
  { id: "duotone", labelKa: "დუოტონი", labelEn: "Duotone", filter: "grayscale(100%) contrast(1.2)" },
  { id: "film-grain", labelKa: "ფირის მარცვალი", labelEn: "Film Grain", filter: "none" },
  { id: "fade-to-white", labelKa: "თეთრში დაშლა", labelEn: "Fade to White", filter: "none" },
];

export const PHOTO_OVERLAY_PRESETS: PhotoOverlayPreset[] = [
  { id: "none", labelKa: "გარეშე", labelEn: "None" },
  { id: "gradient-fade", labelKa: "გრადიენტი", labelEn: "Gradient Fade" },
  { id: "color-tint", labelKa: "ფერადი ტიხარი", labelEn: "Color Tint" },
  { id: "dark-vignette", labelKa: "ვინეტი", labelEn: "Dark Vignette" },
];

export const PHOTO_BORDER_PRESETS: PhotoBorderPreset[] = [
  { id: "none", labelKa: "ჩარჩოს გარეშე", labelEn: "No Border" },
  { id: "thin-ring", labelKa: "თხელი წრე", labelEn: "Thin Ring" },
  { id: "thick-ring", labelKa: "სქელი წრე", labelEn: "Thick Ring" },
  { id: "glow-ring", labelKa: "ნეონ-გლოუ", labelEn: "Glow Ring" },
  { id: "double-frame", labelKa: "ორმაგი ჩარჩო", labelEn: "Double Frame" },
  { id: "gradient-border", labelKa: "გრადიენტ-ჩარჩო", labelEn: "Gradient Border" },
];
