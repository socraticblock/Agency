import type { TextColorPreset, AccentPreset, FontPreset, VibePreset, AnimationPreset } from './types';

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
  { id: "classic", labelKa: "კლასიკური", labelEn: "Classic", fontHeading: "var(--font-playfair), 'Noto Serif Georgian', Georgia, serif", fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif", headingWeight: 700, bodyWeight: 400 },
  { id: "modern", labelKa: "თანამედროვე", labelEn: "Modern", fontHeading: "var(--font-space), 'Noto Sans Georgian', system-ui, sans-serif", fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif", headingWeight: 600, bodyWeight: 400 },
  { id: "bold", labelKa: "მძიმე", labelEn: "Bold", fontHeading: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif", fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif", headingWeight: 700, bodyWeight: 400 },
  { id: "minimal", labelKa: "მინიმალური", labelEn: "Minimal", fontHeading: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif", fontBody: "var(--font-inter), 'Noto Sans Georgian', system-ui, sans-serif", headingWeight: 300, bodyWeight: 300 },
  { id: "traditional", labelKa: "ტრადიციული", labelEn: "Traditional", fontHeading: "var(--font-merriweather), 'Noto Serif Georgian', Georgia, serif", fontBody: "var(--font-source-sans), 'Noto Sans Georgian', system-ui, sans-serif", headingWeight: 700, bodyWeight: 400 },
];

export const VIBE_PRESETS: VibePreset[] = [
  { id: "minimal", labelKa: "მინიმალური", labelEn: "Minimal", blur: "0px", shadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)", borderOpacity: 0.1 },
  { id: "glass", labelKa: "მინა", labelEn: "Glassmorphic", blur: "16px", shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", borderOpacity: 0.25 },
  { id: "neon", labelKa: "ნეონი", labelEn: "Neon glow", blur: "4px", shadow: "0 0 15px currentColor", borderOpacity: 0.4 },
];

export const ANIMATION_PRESETS: AnimationPreset[] = [
  { id: "fade", labelKa: "გაქრობა", labelEn: "Subtle fade", stagger: 0.05, entranceY: 10, springDamping: 25 },
  { id: "spring", labelKa: "ზამბარა", labelEn: "Playful spring", stagger: 0.08, entranceY: 30, springDamping: 12 },
  { id: "cinematic", labelKa: "კინემატოგრაფიული", labelEn: "Cinematic", stagger: 0.15, entranceY: 50, springDamping: 20 },
];
