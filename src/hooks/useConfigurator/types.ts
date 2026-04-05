import { z } from "zod";

export const STORAGE_KEY = "genezisi_architect_config";

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
