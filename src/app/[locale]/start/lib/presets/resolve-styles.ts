import type { CSSProperties } from "react";
import { BACKGROUND_PRESETS } from './background-presets';
import { TEXT_COLOR_PRESETS, ACCENT_PRESETS, FONT_PRESETS, VIBE_PRESETS, ANIMATION_PRESETS } from './style-presets';

export function isBackgroundLockingTextColor(backgroundId: string): boolean {
  const bg = BACKGROUND_PRESETS.find((p) => p.id === backgroundId);
  return Boolean(bg?.locksTextColor);
}

export function resolveStyleVariables(selection: {
  backgroundId: string;
  textColorId: string;
  accentId: string;
  fontId: string;
  vibeId: string;
  animationId: string;
}): CSSProperties {
  const bg = BACKGROUND_PRESETS.find((p) => p.id === selection.backgroundId) ?? BACKGROUND_PRESETS[0];
  const txt = TEXT_COLOR_PRESETS.find((p) => p.id === selection.textColorId) ?? TEXT_COLOR_PRESETS[0];
  const acc = ACCENT_PRESETS.find((p) => p.id === selection.accentId) ?? ACCENT_PRESETS[0];
  const font = FONT_PRESETS.find((p) => p.id === selection.fontId) ?? FONT_PRESETS[1];
  const vibe = VIBE_PRESETS.find((p) => p.id === selection.vibeId) ?? VIBE_PRESETS[0];
  const anim = ANIMATION_PRESETS.find((p) => p.id === selection.animationId) ?? ANIMATION_PRESETS[0];

  const textColor =
    bg.locksTextColor ? bg.pairedTextColor : txt.color;

  return {
    ["--bg-primary" as string]: bg.cssValue,
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
