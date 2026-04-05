import type { CSSProperties } from "react";
import { BACKGROUND_PRESETS } from './background-presets';
import { TEXT_COLOR_PRESETS, ACCENT_PRESETS, FONT_PRESETS, VIBE_PRESETS, ANIMATION_PRESETS } from './style-presets';
import type { StylePresetSelection } from '../types';

export function isBackgroundLockingTextColor(backgroundId: string): boolean {
  const bg = BACKGROUND_PRESETS.find((p) => p.id === backgroundId);
  return Boolean(bg?.locksTextColor);
}

export function resolveStyleVariables(selection: StylePresetSelection): CSSProperties {
  const bg = BACKGROUND_PRESETS.find((p) => p.id === selection.backgroundId) ?? BACKGROUND_PRESETS[0];
  const acc = ACCENT_PRESETS.find((p) => p.id === selection.accentId) ?? ACCENT_PRESETS[0];
  const font = FONT_PRESETS.find((p) => p.id === selection.fontId) ?? FONT_PRESETS[1];
  const vibe = VIBE_PRESETS.find((p) => p.id === selection.vibeId) ?? VIBE_PRESETS[0];
  const anim = ANIMATION_PRESETS.find((p) => p.id === selection.animationId) ?? ANIMATION_PRESETS[0];

  let textColor = "#ffffff";
  if (selection.textColorId === "dark") {
    textColor = "#1a1a1a";
  } else if (selection.textColorId === "ink") {
    textColor = "#0f172a";
  } else if (selection.textColorId === "light") {
    textColor = "#ffffff";
  } else {
    // Fallback to legacy preset logic if needed
    const txt = TEXT_COLOR_PRESETS.find((p) => p.id === selection.textColorId) ?? TEXT_COLOR_PRESETS[0];
    textColor = bg.locksTextColor ? bg.pairedTextColor : txt.color;
  }

  let overlayGradient = "transparent";
  switch (selection.bgOverlayId) {
    case "solid":
      overlayGradient = selection.bgOverlayColor1;
      break;
    case "linear":
      overlayGradient = `linear-gradient(${selection.bgOverlayAngle}deg, ${selection.bgOverlayColor1}, ${selection.bgOverlayColor2})`;
      break;
    case "radial":
      overlayGradient = `radial-gradient(circle, ${selection.bgOverlayColor1}, ${selection.bgOverlayColor2})`;
      break;
    case "mesh":
      overlayGradient = `
        radial-gradient(at 20% 30%, ${selection.bgOverlayColor1} 0%, transparent 50%),
        radial-gradient(at 80% 70%, ${selection.bgOverlayColor2} 0%, transparent 50%),
        radial-gradient(at 50% 50%, ${selection.bgOverlayColor3 || selection.bgOverlayColor1} 0%, transparent 70%)
      `;
      break;
    case "none":
    default:
      overlayGradient = "transparent";
  }

  let texturePattern = "none";
  let textureMixBlend: "overlay" | "soft-light" | "multiply" = "soft-light";

  switch (selection.textureId) {
    case "fine-grain":
      texturePattern = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;
      textureMixBlend = "overlay";
      break;
    case "coarse-grain":
      texturePattern = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.45' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;
      textureMixBlend = "multiply";
      break;
    case "dot-grid":
      texturePattern = `radial-gradient(color-mix(in srgb, var(--text-primary) 30%, transparent) 1px, transparent 1px)`;
      break;
    case "waves":
      texturePattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20c10 0 10-10 20-10s10 10 20 10 10-10 20-10' stroke='rgba(255,255,255,0.1)' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E")`;
      break;
    case "diagonal-lines":
      texturePattern = `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 11px)`;
      break;
    case "cross-hatch":
      texturePattern = `
        repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.03) 15px, rgba(255,255,255,0.03) 16px),
        repeating-linear-gradient(-45deg, transparent, transparent 15px, rgba(255,255,255,0.03) 15px, rgba(255,255,255,0.03) 16px)
      `;
      break;
    case "geometric":
      texturePattern = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h10v10H0V0zm10 10h10v10H10V10z' fill='rgba(255,255,255,0.03)'/%3E%3C/svg%3E")`;
      break;
    case "topographic":
      texturePattern = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10c20 0 20 50 40 50s20-50 40-50M10 30c20 0 20 50 40 50s20-50 40-50M10 50c20 0 20 50 40 50s20-50 40-50M10 70c20 0 20 50 40 50s20-50 40-50' stroke='rgba(255,255,255,0.04)' fill='none'/%3E%3C/svg%3E")`;
      break;
  }

  return {
    ["--bg-primary" as string]: bg.cssValue, // Legacy fallback
    ["--bg-color" as string]: selection.bgBaseColor || bg.cssValue, // Legacy fallback map
    ["--bg-base-color" as string]: selection.bgBaseColor || bg.cssValue,
    ["--overlay-gradient" as string]: overlayGradient,
    ["--overlay-opacity" as string]: String(selection.bgOverlayOpacity ?? 0.5),
    ["--texture-pattern" as string]: texturePattern,
    ["--texture-opacity" as string]: String((selection.textureOpacity ?? 5) / 100),
    ["--texture-blend-mode" as string]: textureMixBlend,
    ["--texture-bg-size" as string]: selection.textureId === "dot-grid" ? "20px 20px" : "auto",

    ["--text-primary" as string]: textColor,
    ["--accent" as string]: acc.accent,
    ["--accent-secondary" as string]: acc.accentSecondary,
    ["--font-heading" as string]: font.fontHeading,
    ["--font-body" as string]: font.fontBody,
    ["--font-heading-weight" as string]: String(font.headingWeight),
    ["--font-body-weight" as string]: String(font.bodyWeight),
    ["--glass-blur" as string]: vibe.blur,
    ["--card-shadow" as string]: vibe.shadow,
    ["--border-opacity" as string]: String(vibe.borderOpacity),
    ["--stagger-delay" as string]: String(anim.stagger),
    ["--entrance-y" as string]: String(anim.entranceY),
    ["--spring-damping" as string]: String(anim.springDamping),
  } as CSSProperties;
}
