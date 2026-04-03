"use client";

import type { Lane1CustomizerState } from "./types";
import { CUSTOMIZER_VERSION, defaultLane1State } from "./types";

const STORAGE_KEY = "genezisi_lane1_customizer_v1";

function safeParse(raw: string | null): Lane1CustomizerState | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Lane1CustomizerState;
    if (data.version !== CUSTOMIZER_VERSION) return null;
    return data;
  } catch {
    return null;
  }
}

export function loadLane1State(): Lane1CustomizerState {
  if (typeof window === "undefined") return defaultLane1State();
  const parsed = safeParse(localStorage.getItem(STORAGE_KEY));
  return parsed ?? defaultLane1State();
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
}
