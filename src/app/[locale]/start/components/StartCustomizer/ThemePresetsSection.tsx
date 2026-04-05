"use client";

import type { Dispatch, SetStateAction } from "react";
import { CollapsibleSection } from "../CollapsibleSection";
import {
  ELITE_THEME_PRESETS,
  loadLane1StyleFromDisk,
  saveLane1StyleToDisk,
} from "../../lib/elite-themes";
import { TYPOGRAPHY_TO_LEGACY_FONT } from "../../lib/presets";
import type { Lane1CustomizerState, StylePresetSelection, TypographyPackId } from "../../lib/types";
import { defaultLane1State } from "../../lib/types";

function mergeThemeStyle(
  prev: StylePresetSelection,
  patch: Partial<StylePresetSelection>,
): StylePresetSelection {
  const next = { ...prev, ...patch };
  if (patch.typographyPackId) {
    next.fontId = TYPOGRAPHY_TO_LEGACY_FONT[patch.typographyPackId as TypographyPackId];
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
    showToast(`Applied “${t.labelEn}”.`);
  }

  function randomize() {
    const t = ELITE_THEME_PRESETS[Math.floor(Math.random() * ELITE_THEME_PRESETS.length)];
    if (!t) return;
    setState((s) => ({ ...s, style: mergeThemeStyle(s.style, t.stylePatch) }));
    showToast(`Random look: “${t.labelEn}”.`);
  }

  function saveTheme() {
    saveLane1StyleToDisk(state.style);
    showToast("Saved this look in your browser.");
  }

  function loadTheme() {
    const saved = loadLane1StyleFromDisk();
    if (!saved) {
      showToast("No saved look found yet.");
      return;
    }
    const base = defaultLane1State().style;
    const merged: StylePresetSelection = { ...base, ...saved };
    if (saved.typographyPackId) {
      merged.fontId = TYPOGRAPHY_TO_LEGACY_FONT[saved.typographyPackId as TypographyPackId];
    }
    setState((s) => ({ ...s, style: merged }));
    showToast("Restored your saved look.");
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
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={randomize}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#1A2744] shadow-sm hover:bg-slate-50"
        >
          Randomize
        </button>
        <button
          type="button"
          onClick={saveTheme}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#1A2744] shadow-sm hover:bg-slate-50"
        >
          Save look
        </button>
        <button
          type="button"
          onClick={loadTheme}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#1A2744] shadow-sm hover:bg-slate-50"
        >
          Load saved
        </button>
      </div>
    </CollapsibleSection>
  );
}
