"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "lane1-pill-opened-v1";

function readOpenedMap(): Record<string, boolean> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as Record<string, boolean>;
  } catch {
    return {};
  }
}

function writeOpenedMap(map: Record<string, boolean>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Ignore storage write issues (private mode, quota, etc).
  }
}

export function usePillOnboardingGlow(pillId: string, open: boolean): boolean {
  const [openedBefore, setOpenedBefore] = useState(true);

  useEffect(() => {
    const map = readOpenedMap();
    setOpenedBefore(Boolean(map[pillId]));
  }, [pillId]);

  useEffect(() => {
    if (!open || openedBefore) return;
    const map = readOpenedMap();
    map[pillId] = true;
    writeOpenedMap(map);
    setOpenedBefore(true);
  }, [open, openedBefore, pillId]);

  return !openedBefore;
}
