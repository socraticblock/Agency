import { useEffect, useRef } from "react";
import { configSchema, STORAGE_KEY, type ConfigState } from "./types";

export function getInitialState(): ConfigState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const result = configSchema.safeParse(JSON.parse(raw));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function usePersistence({
  hydrated,
  foundation,
  selectedModules,
  moduleQuantities,
  shieldTier,
  step,
  answers,
  discoveryStep,
}: {
  hydrated: boolean;
  foundation: string | null;
  selectedModules: string[];
  moduleQuantities: Record<string, number>;
  shieldTier: number;
  step: number;
  answers: Record<string, unknown>;
  discoveryStep: number;
}) {
  const persistTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!hydrated) return;

    if (persistTimerRef.current) {
      clearTimeout(persistTimerRef.current);
    }

    persistTimerRef.current = setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
          foundation,
          selectedModules,
          moduleQuantities,
          shieldTier,
          step,
          answers,
          discoveryStep,
        }));
      } catch {}
    }, 250);

    return () => {
      if (persistTimerRef.current) {
        clearTimeout(persistTimerRef.current);
      }
    };
  }, [foundation, selectedModules, moduleQuantities, shieldTier, step, hydrated, answers, discoveryStep]);
}
