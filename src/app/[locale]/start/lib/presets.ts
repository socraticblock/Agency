import type { CSSProperties } from "react";
import type { ButtonStyleId, CardShadowId, StylePresetSelection, TypographyPackId } from "./types";
import { textureBackgroundImage, textureBackgroundSize } from "./texture-presets";

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
  { id: "ghost", labelKa: "მინიმალური ჩარჩო", labelEn: "Ghost" },
  { id: "sharp", labelKa: "კუთხოვანი", labelEn: "Sharp" },
  { id: "luxury", labelKa: "ლუქსი", labelEn: "Luxury" },
  { id: "minimal", labelKa: "თხელი", labelEn: "Minimal" },
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

export function resolveStyleVariables(selection: StylePresetSelection): CSSProperties {
  const bg = BACKGROUND_PRESETS.find((p) => p.id === selection.backgroundId) ?? BACKGROUND_SOLID_PRESETS[0];
  const txt = TEXT_COLOR_PRESETS.find((p) => p.id === selection.textColorId) ?? TEXT_COLOR_PRESETS[0];
  const acc = ACCENT_PRESETS.find((p) => p.id === selection.accentId) ?? ACCENT_PRESETS[0];
  const secondaryFamily =
    ACCENT_PRESETS.find((p) => p.id === selection.secondaryAccentId) ?? acc;
  const font =
    TYPOGRAPHY_PACK_PRESETS.find((p) => p.id === selection.typographyPackId) ??
    FONT_PRESETS.find((p) => p.id === selection.fontId) ??
    FONT_PRESETS[1];
  const vibe = VIBE_PRESETS.find((p) => p.id === selection.vibeId) ?? VIBE_PRESETS[0];

  // 1. Resolve Base Layer
  const baseColorValue = selection.bgBaseColor;

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

  // User's text color selection takes priority
  let textColor = txt.color;
  
  // Force light text for dark backgrounds for accessibility
  if (backgroundIsDark) {
    textColor = "#F1F5F9";
  }
  
  let bgResolved = baseColorValue;
  if (selection.cardDarkSurface) {
    bgResolved = "#0b1220";
    textColor = "#e2e8f0";
  }

  const cardRadius = typeof selection.cardRadiusPx === "number" ? selection.cardRadiusPx : 24;

  const texOp =
    selection.textureId === "none"
      ? 0
      : Math.min(1, Math.max(0, selection.textureOpacity / 100));

  return {
    "--bg-base-color": baseColorValue,
    "--overlay-gradient": overlayGradientValue,
    "--overlay-opacity": selection.bgOverlayId === "none" ? "0" : String(selection.bgOverlayOpacity),
    "--bg-primary": bgResolved,
    "--background": selection.cardDarkSurface ? "#030712" : bgResolved,
    "--text-primary": textColor,
    "--accent": acc.accent,
    "--accent-secondary": secondaryFamily.accentSecondary,
    "--texture-pattern": textureBackgroundImage(selection.textureId),
    "--texture-bg-size": textureBackgroundSize(selection.textureId),
    "--texture-opacity": String(texOp),
    "--texture-blend-mode": selection.textureId === "none" ? "normal" : "overlay",
    "--bg-gradient": selection.bgOverlayId !== "none"
      ? overlayGradientValue
      : `linear-gradient(135deg, ${acc.accent}, ${secondaryFamily.accentSecondary})`,
    "--font-heading": font.fontHeading,
    "--font-body": font.fontBody,
    "--font-heading-weight": String(font.headingWeight),
    "--font-body-weight": String(font.bodyWeight),
    "--glass-blur": vibe.blur,
    "--card-shadow": vibe.shadow,
    "--border-opacity": String(vibe.borderOpacity),
    "--card-radius": `${cardRadius}px`,
  } as CSSProperties;
}

/** Migrate legacy preset ids (pre–refinement brief §8) */
export const LEGACY_BACKGROUND_ID_MAP: Record<string, string> = {
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
