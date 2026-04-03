import type { CSSProperties } from "react";

export interface BackgroundPreset {
  id: string;
  labelKa: string;
  labelEn: string;
  /** Resolved background for --bg-primary */
  cssValue: string;
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
  /** Heading stack (Georgian-capable) */
  fontHeading: string;
  fontBody: string;
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  { id: "cream", labelKa: "კრემი", labelEn: "Cream", cssValue: "#FAF8F5" },
  { id: "white", labelKa: "თეთრი", labelEn: "White", cssValue: "#FFFFFF" },
  { id: "lightgray", labelKa: "ღია ნაცრისფერი", labelEn: "Light gray", cssValue: "#F3F4F6" },
  { id: "sand", labelKa: "ქვიში", labelEn: "Warm sand", cssValue: "#F5F0E8" },
  { id: "softnavy", labelKa: "ღია სანაპირო", labelEn: "Soft navy", cssValue: "#E8EEF5" },
  { id: "charcoal", labelKa: "ქვა", labelEn: "Stone", cssValue: "#E7E5E4" },
  {
    id: "grad1",
    labelKa: "გრადიენტი 1",
    labelEn: "Gradient 1",
    cssValue: "linear-gradient(180deg, #FAF8F5 0%, #E8EEF5 100%)",
  },
  {
    id: "grad2",
    labelKa: "გრადიენტი 2",
    labelEn: "Gradient 2",
    cssValue: "linear-gradient(135deg, #F5F0E8 0%, #F3F4F6 100%)",
  },
];

export const TEXT_COLOR_PRESETS: TextColorPreset[] = [
  { id: "ink", labelKa: "მუქი მელანი", labelEn: "Ink", color: "#1A1A2E" },
  { id: "charcoal", labelKa: "ნაცრისფერი", labelEn: "Charcoal", color: "#374151" },
  { id: "navytext", labelKa: "სანაპირო", labelEn: "Navy", color: "#1A2744" },
  { id: "warm", labelKa: "თბილი შავი", labelEn: "Warm black", color: "#292524" },
  { id: "slate", labelKa: "სლეითი", labelEn: "Slate", color: "#334155" },
  { id: "soft", labelKa: "რბილი", labelEn: "Soft", color: "#4B5563" },
];

export const ACCENT_PRESETS: AccentPreset[] = [
  { id: "navy", labelKa: "სანაპირო", labelEn: "Navy", accent: "#1A2744", accentSecondary: "#2D3F5E" },
  { id: "forest", labelKa: "ტყე", labelEn: "Forest", accent: "#14532D", accentSecondary: "#166534" },
  { id: "burgundy", labelKa: "ბორდო", labelEn: "Burgundy", accent: "#7F1D1D", accentSecondary: "#991B1B" },
  { id: "slate", labelKa: "სლეითი", labelEn: "Slate", accent: "#475569", accentSecondary: "#64748B" },
  { id: "gold", labelKa: "ოქრო", labelEn: "Gold", accent: "#C5A55A", accentSecondary: "#A8843A" },
  { id: "teal", labelKa: "ტილა", labelEn: "Teal", accent: "#0F766E", accentSecondary: "#115E59" },
];

export const FONT_PRESETS: FontPreset[] = [
  {
    id: "classic",
    labelKa: "კლასიკური",
    labelEn: "Classic",
    fontHeading: "Georgia, 'Noto Serif Georgian', serif",
    fontBody: "var(--font-inter, Inter), system-ui, sans-serif",
  },
  {
    id: "modern",
    labelKa: "თანამედროვე",
    labelEn: "Modern",
    fontHeading: "var(--font-space, 'Space Grotesk'), system-ui, sans-serif",
    fontBody: "var(--font-inter, Inter), system-ui, sans-serif",
  },
  {
    id: "bold",
    labelKa: "მძიმე",
    labelEn: "Bold",
    fontHeading: "system-ui, -apple-system, sans-serif",
    fontBody: "var(--font-inter, Inter), system-ui, sans-serif",
  },
  {
    id: "minimal",
    labelKa: "მინიმალური",
    labelEn: "Minimal",
    fontHeading: "var(--font-inter, Inter), system-ui, sans-serif",
    fontBody: "var(--font-inter, Inter), system-ui, sans-serif",
  },
  {
    id: "traditional",
    labelKa: "ტრადიციული",
    labelEn: "Traditional",
    fontHeading: "Georgia, 'Noto Serif Georgian', serif",
    fontBody: "Georgia, 'Noto Serif Georgian', serif",
  },
];

export function resolveStyleVariables(selection: {
  backgroundId: string;
  textColorId: string;
  accentId: string;
  fontId: string;
}): CSSProperties {
  const bg = BACKGROUND_PRESETS.find((p) => p.id === selection.backgroundId) ?? BACKGROUND_PRESETS[0];
  const txt = TEXT_COLOR_PRESETS.find((p) => p.id === selection.textColorId) ?? TEXT_COLOR_PRESETS[0];
  const acc = ACCENT_PRESETS.find((p) => p.id === selection.accentId) ?? ACCENT_PRESETS[0];
  const font = FONT_PRESETS.find((p) => p.id === selection.fontId) ?? FONT_PRESETS[1];
  return {
    ["--bg-primary" as string]: bg.cssValue,
    ["--text-primary" as string]: txt.color,
    ["--accent" as string]: acc.accent,
    ["--accent-secondary" as string]: acc.accentSecondary,
    ["--font-heading" as string]: font.fontHeading,
    ["--font-body" as string]: font.fontBody,
  } as CSSProperties;
}
