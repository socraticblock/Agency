import type { CSSProperties } from "react";

export interface BackgroundPreset {
  id: string;
  labelKa: string;
  labelEn: string;
  cssValue: string;
  category: "solid" | "gradient";
  locksTextColor: boolean;
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
  blur: string;
  shadow: string;
  borderOpacity: number;
}

export interface AnimationPreset {
  id: string;
  labelKa: string;
  labelEn: string;
  stagger: number;
  entranceY: number;
  springDamping: number;
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
