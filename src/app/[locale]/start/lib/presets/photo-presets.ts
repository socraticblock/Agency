import type { PhotoShapePreset, PhotoEffectPreset, PhotoBorderPreset, PhotoOverlayPreset } from './types';

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
