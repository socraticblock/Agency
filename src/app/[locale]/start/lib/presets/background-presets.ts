import type { BackgroundPreset } from './types';

/** §8.1 — eight solid backgrounds (light + two dark) */
export const BACKGROUND_SOLID_PRESETS: BackgroundPreset[] = [
  { id: "warmcream", labelKa: "თბილი კრემი", labelEn: "Warm cream", cssValue: "#FAF8F5", category: "solid", locksTextColor: false, pairedTextColor: "#1A1A2E" },
  { id: "purewhite", labelKa: "წმინდა თეთრი", labelEn: "Pure white", cssValue: "#FFFFFF", category: "solid", locksTextColor: false, pairedTextColor: "#111827" },
  { id: "coolgray", labelKa: "ღია ნაცრისფერი", labelEn: "Cool gray", cssValue: "#F3F4F6", category: "solid", locksTextColor: false, pairedTextColor: "#111827" },
  { id: "softblue", labelKa: "ღია ლურჯი", labelEn: "Soft blue", cssValue: "#EFF6FF", category: "solid", locksTextColor: false, pairedTextColor: "#1E3A5F" },
  { id: "sagemist", labelKa: "ქვიში ნისლი", labelEn: "Sage mist", cssValue: "#F0F5F0", category: "solid", locksTextColor: false, pairedTextColor: "#1A2E1A" },
  { id: "blush", labelKa: "შიში ვარდისფერი", labelEn: "Blush", cssValue: "#FFF5F5", category: "solid", locksTextColor: false, pairedTextColor: "#4A1A1A" },
  { id: "deepnavy", labelKa: "ღრმა სანაპირო", labelEn: "Deep navy", cssValue: "#0F172A", category: "solid", locksTextColor: true, pairedTextColor: "#F1F5F9" },
  { id: "charcoalbg", labelKa: "ქვა", labelEn: "Charcoal", cssValue: "#1F2937", category: "solid", locksTextColor: true, pairedTextColor: "#E5E7EB" },
];

/** §8.2 — four gradient presets (135deg, subtle) */
export const BACKGROUND_GRADIENT_PRESETS: BackgroundPreset[] = [
  { id: "dawn", labelKa: "დილა", labelEn: "Dawn", cssValue: "linear-gradient(135deg, #FAF8F5, #F0ECE6)", category: "gradient", locksTextColor: true, pairedTextColor: "#1A1A2E" },
  { id: "ocean", labelKa: "ოკეანე", labelEn: "Ocean", cssValue: "linear-gradient(135deg, #EFF6FF, #E0F2FE)", category: "gradient", locksTextColor: true, pairedTextColor: "#1E3A5F" },
  { id: "forestgrad", labelKa: "ტყე", labelEn: "Forest", cssValue: "linear-gradient(135deg, #F0F5F0, #E8F0E8)", category: "gradient", locksTextColor: true, pairedTextColor: "#1A2E1A" },
  { id: "dusk", labelKa: "საღამო", labelEn: "Dusk", cssValue: "linear-gradient(135deg, #FFF5F5, #FDF2F8)", category: "gradient", locksTextColor: true, pairedTextColor: "#4A1A1A" },
];

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  ...BACKGROUND_SOLID_PRESETS,
  ...BACKGROUND_GRADIENT_PRESETS,
];

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
