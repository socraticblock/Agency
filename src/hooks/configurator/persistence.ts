import { z } from "zod";

export const CONFIGURATOR_STORAGE_KEY = "genezisi_architect_config";

export const configSchema = z.object({
  step: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).optional(),
  foundation: z.string().nullable().optional(),
  selectedModules: z.array(z.string()).optional(),
  moduleQuantities: z.record(z.string(), z.number()).optional(),
  shieldTier: z.number().min(0).max(3).optional(),
  answers: z.record(z.string(), z.unknown()).optional(),
  discoveryStep: z.number().optional(),
});

export type ConfigState = z.infer<typeof configSchema>;

/** Read and validate persisted config from sessionStorage. */
export function getInitialState(): ConfigState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CONFIGURATOR_STORAGE_KEY);
    if (!raw) return null;
    const result = configSchema.safeParse(JSON.parse(raw));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

/** Persist config state to sessionStorage. */
export function persistState(state: ConfigState): void {
  try {
    sessionStorage.setItem(CONFIGURATOR_STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

/** Clear persisted config from sessionStorage. */
export function clearPersistedState(): void {
  try {
    sessionStorage.removeItem(CONFIGURATOR_STORAGE_KEY);
  } catch {}
}
