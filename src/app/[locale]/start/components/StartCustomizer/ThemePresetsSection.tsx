"use client";

import type { Dispatch, SetStateAction } from "react";
import { CollapsibleSection } from "../CollapsibleSection";
import { ELITE_THEME_PRESETS } from "../../lib/elite-themes";
import { LEGACY_DISPLAY_TO_BODY_PACK, TYPOGRAPHY_TO_LEGACY_FONT } from "../../lib/presets";
import type { Lane1CustomizerState, StylePresetSelection, TypographyPackId } from "../../lib/types";

function mergeThemeStyle(
  prev: StylePresetSelection,
  patch: Partial<StylePresetSelection>,
): StylePresetSelection {
  const next = { ...prev, ...patch };
  if (patch.accentId != null) {
    next.secondaryAccentId = patch.accentId;
  }
  if (patch.typographyPackId) {
    const pack = patch.typographyPackId as TypographyPackId;
    next.fontId = TYPOGRAPHY_TO_LEGACY_FONT[pack];
    next.buttonTypographyPackId = pack;
    next.ctaTypographyPackId = pack;
    next.bodyTypographyPackId = LEGACY_DISPLAY_TO_BODY_PACK[pack];
  }
  return next;
}

export function ThemePresetsSection({
  state,
  setState,
  showToast,
  isOpen,
  onToggle,
}: {
  state: Lane1CustomizerState;
  setState: Dispatch<SetStateAction<Lane1CustomizerState>>;
  showToast: (message: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  function applyPreset(id: string) {
    const t = ELITE_THEME_PRESETS.find((x) => x.id === id);
    if (!t) return;
    setState((s) => ({ ...s, style: mergeThemeStyle(s.style, t.stylePatch) }));
    showToast(`Applied "${t.labelEn}".`);
  }

  return (
    <CollapsibleSection id="themes" title="Quick themes" isOpen={isOpen} onToggle={onToggle}>
      <p className="start-caption mb-3">
        One-tap palettes adjust colors, type, motion, and background layers — not your text or links.
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {ELITE_THEME_PRESETS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => applyPreset(t.id)}
            className="rounded-xl border border-slate-200 bg-white px-2 py-2.5 text-left text-xs font-semibold text-[#1e293b] shadow-sm transition hover:border-[#1A2744]/40 hover:bg-slate-50"
          >
            {t.labelEn}
          </button>
        ))}
      </div>
    </CollapsibleSection>
  );
}
