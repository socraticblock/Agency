"use client";

import type { Lane1CustomizerState } from "./types";
import { CUSTOMIZER_VERSION, defaultLane1State } from "./types";
import {
  ACCENT_PRESETS,
  BACKGROUND_PRESETS,
  FONT_PRESETS,
  LEGACY_BACKGROUND_ID_MAP,
  TEXT_COLOR_PRESETS,
} from "./presets";

const STORAGE_KEY = "genezisi_lane1_customizer_v2";

function safeParse(raw: string | null): Lane1CustomizerState | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    const v = typeof data.version === "number" ? data.version : 1;
    if (v !== 1 && v !== 2) return null;
    return migrateLane1State(data as unknown as Lane1CustomizerState);
  } catch {
    return null;
  }
}

function migrateLane1State(
  data: Lane1CustomizerState & { version?: number },
): Lane1CustomizerState {
  const base = defaultLane1State();
  const merged: Lane1CustomizerState = {
    ...base,
    ...data,
    style: { ...base.style, ...data.style },
    social: { ...base.social, ...data.social },
  };

  const bgMap = LEGACY_BACKGROUND_ID_MAP[merged.style.backgroundId];
  if (bgMap) merged.style.backgroundId = bgMap;

  if (!BACKGROUND_PRESETS.some((p) => p.id === merged.style.backgroundId)) {
    merged.style.backgroundId = base.style.backgroundId;
  }
  if (!TEXT_COLOR_PRESETS.some((p) => p.id === merged.style.textColorId)) {
    merged.style.textColorId = base.style.textColorId;
  }
  if (!ACCENT_PRESETS.some((p) => p.id === merged.style.accentId)) {
    merged.style.accentId = base.style.accentId;
  }
  if (!FONT_PRESETS.some((p) => p.id === merged.style.fontId)) {
    merged.style.fontId = base.style.fontId;
  }

  if (typeof merged.proTranslationAcknowledged !== "boolean") {
    merged.proTranslationAcknowledged = false;
  }

  merged.version = CUSTOMIZER_VERSION;
  return merged;
}

export function loadLane1State(): Lane1CustomizerState {
  if (typeof window === "undefined") return defaultLane1State();
  const parsed = safeParse(localStorage.getItem(STORAGE_KEY));
  if (parsed) return parsed;
  const legacy = safeParse(localStorage.getItem("genezisi_lane1_customizer_v1"));
  if (legacy) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));
      localStorage.removeItem("genezisi_lane1_customizer_v1");
    } catch {
      /* ignore */
    }
    return legacy;
  }
  return defaultLane1State();
}

export function saveLane1State(state: Lane1CustomizerState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota or private mode */
  }
}

export function clearLane1State(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("genezisi_lane1_customizer_v1");
}
