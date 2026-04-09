"use client";

import type { Lane1CustomizerState } from "./types";
import { CUSTOMIZER_VERSION, defaultLane1State } from "./types";
import {
  ACCENT_PRESETS,
  BACKGROUND_PRESETS,
  BUTTON_STYLE_PRESETS,
  CARD_TEXT_SCALE_PRESETS,
  coerceSolidBgBaseInStyle,
  FONT_PRESETS,
  LEGACY_BACKGROUND_ID_MAP,
  migrateLegacyBodyTypographyId,
  TEXT_COLOR_PRESETS,
} from "./presets";

const STORAGE_KEY = "genezisi_lane1_customizer_v3";
const LEGACY_V2_KEY = "genezisi_lane1_customizer_v2";
const LEGACY_V1_KEY = "genezisi_lane1_customizer_v1";

function safeParse(raw: string | null): Lane1CustomizerState | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    const v = typeof data.version === "number" ? data.version : 1;
    // Allow migration from v1–v16
    if (v < 1 || v > 16) return null;
    return migrateLane1State(data as unknown as Lane1CustomizerState);
  } catch {
    return null;
  }
}

/**
 * Deep-merge snapshot with defaults (session preview, import, etc.).
 * Safe for partial JSON from `JSON.parse`.
 */
export function normalizeLane1StateFromJson(data: unknown): Lane1CustomizerState | null {
  if (data === null || typeof data !== "object") return null;
  try {
    return migrateLane1State(data as Lane1CustomizerState & { version?: number });
  } catch {
    return null;
  }
}

/** Alias for preview/import callers (same merge as `normalizeLane1StateFromJson`). */
export const normalizeLane1StateFromUnknown = normalizeLane1StateFromJson;

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

  // Legacy background ID mapping logic
  const bgMap = LEGACY_BACKGROUND_ID_MAP[merged.style.backgroundId];
  if (bgMap) merged.style.backgroundId = bgMap;

  merged.style = coerceSolidBgBaseInStyle(merged.style);
  // Hero alignment is now fixed to centered (no user-facing toggle).
  merged.style.photoAlignment = "center";

  // Cleanup/validation
  if (typeof merged.proTranslationAcknowledged !== "boolean") {
    merged.proTranslationAcknowledged = false;
  }

  if (merged.profileLanguageMode === undefined) {
    if (merged.secondaryMode === "self" || merged.secondaryMode === "pro") {
      merged.profileLanguageMode = "both";
    } else if (merged.primaryLang === "ka") {
      merged.profileLanguageMode = "ka_only";
    } else {
      merged.profileLanguageMode = "en_only";
    }
  }
  if (merged.translationMethod === undefined) {
    if (merged.secondaryMode === "self") merged.translationMethod = "self";
    else if (merged.secondaryMode === "pro") merged.translationMethod = "professional";
    else merged.translationMethod = "none";
  }
  if (merged.translationSourceLang === undefined) {
    merged.translationSourceLang = merged.primaryLang === "ka" ? "ka" : "en";
  }
  if (typeof merged.profileSetupCompleted !== "boolean") {
    merged.profileSetupCompleted = true;
  }

  if (merged.profileLanguageMode === "both") {
    merged.secondaryMode = merged.translationMethod === "self" ? "self" : "pro";
    if (merged.translationMethod === "professional") {
      merged.proTranslationAcknowledged = true;
    }
  } else {
    merged.secondaryMode = "none";
    merged.translationMethod = "none";
  }

  if (merged.style.textColorId === "black") {
    merged.style.textColorId = "ink";
  }

  const ds = data.style as Partial<Lane1CustomizerState["style"]> | undefined;
  if (ds?.typographyPackId) {
    if (!("bodyTypographyPackId" in ds)) {
      merged.style.bodyTypographyPackId = migrateLegacyBodyTypographyId(ds.typographyPackId);
    }
    if (!("buttonTypographyPackId" in ds)) merged.style.buttonTypographyPackId = ds.typographyPackId;
  }

  merged.style.bodyTypographyPackId = migrateLegacyBodyTypographyId(
    merged.style.bodyTypographyPackId as string | undefined,
  );

  if (
    merged.style.cardTextScaleId == null ||
    !CARD_TEXT_SCALE_PRESETS.some((p) => p.id === merged.style.cardTextScaleId)
  ) {
    merged.style.cardTextScaleId = "default";
  }

  merged.style.secondaryAccentId = merged.style.accentId;
  // Deprecated: dark card override removed; background presets handle dark looks.
  merged.style.cardDarkSurface = false;

  if (merged.style.bodyTextHex === undefined) merged.style.bodyTextHex = "";
  if (merged.style.buttonTextHex === undefined) merged.style.buttonTextHex = "";

  const rawStyle = data.style as unknown as Record<string, unknown> | undefined;
  if (!rawStyle || !("ctaTypographyPackId" in rawStyle)) {
    merged.style.ctaTypographyPackId = merged.style.buttonTypographyPackId;
  }
  if (!rawStyle || !("ctaTextHex" in rawStyle)) {
    merged.style.ctaTextHex = merged.style.buttonTextHex ?? "";
  }
  if (merged.qrDisplayMode === undefined) merged.qrDisplayMode = "static";
  merged.showQrLogo = false;

  if ((merged.style.buttonStyleId as string) === "ghost") {
    merged.style.buttonStyleId = "outlined";
  }
  if (!BUTTON_STYLE_PRESETS.some((p) => p.id === merged.style.buttonStyleId)) {
    merged.style.buttonStyleId = "minimal";
  }

  merged.version = CUSTOMIZER_VERSION;
  return merged;
}

export function loadLane1State(): Lane1CustomizerState {
  if (typeof window === "undefined") return defaultLane1State();
  
  // 1. Try v3 (Current)
  const parsedV3 = safeParse(localStorage.getItem(STORAGE_KEY));
  if (parsedV3) return parsedV3;

  // 2. Try v2 (Legacy)
  const parsedV2 = safeParse(localStorage.getItem(LEGACY_V2_KEY));
  if (parsedV2) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedV2));
      localStorage.removeItem(LEGACY_V2_KEY);
    } catch { /* ignore */ }
    return parsedV2;
  }

  // 3. Try v1 (Ancient)
  const parsedV1 = safeParse(localStorage.getItem(LEGACY_V1_KEY));
  if (parsedV1) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedV1));
      localStorage.removeItem(LEGACY_V1_KEY);
    } catch { /* ignore */ }
    return parsedV1;
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
  localStorage.removeItem(LEGACY_V2_KEY);
  localStorage.removeItem(LEGACY_V1_KEY);
}
