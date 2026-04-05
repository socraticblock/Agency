// Barrel re-export — preserves the existing public API so all consumers
// can keep importing from "@/constants/pricing" without changes.

export type {
  ProFeature,
  StrategicBackingItem,
  ServiceItem,
  Foundation,
  Module,
  ShieldPerk,
  ShieldTier,
} from './types';

export { FOUNDATIONS } from './foundations';
export { MODULES } from './modules';
export { SHIELD_TIERS, getAccessibleModuleIdsByFoundation } from './shields';
