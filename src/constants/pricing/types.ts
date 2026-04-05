export interface ProFeature {
  title: string;
  desc: string;
}

export interface StrategicBackingItem {
  title: string;
  fact: string;
  reality: string;
  cost: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  priceGEL: number;
  emoji?: string;
  tagline?: string;
  deliveryTimeline?: string;
  effortEstimate?: string;
  audienceLabel?: string;
  revisionRounds?: number;
  warrantyDays?: number;
  ctaLabel?: string;
  ctaHref?: string;
  isRecommendedTier?: boolean;
  description?: string;
  technicalSpec?: string;
  roiNote?: string;
  concept?: string;
  strategy?: string;
  howItWorks?: string;
  proFeatures?: ProFeature[];
  bestFor?: string[];
  tooltip?: string;
  timeSaved?: number;
  scope?: string[];
  whatItIs?: string;
  howItHelps?: string;
  lawyerRole?: string;
  strategicBacking?: StrategicBackingItem[];
  recommendation?: string;
  customPriceLabel?: string;
  isBespoke?: boolean;
  /** Shown on pricing page only (e.g. installment line); optional */
  installmentLabel?: string;
}

export interface Foundation extends ServiceItem {
  description: string;
  concept: string;
  strategy: string;
  scope: string[];
  recommendedModules?: string[];
  inheritedValue?: { id: string, name: string, priceGEL: number };
  strategyLabel?: string;
}

export interface Module extends ServiceItem {
  whatItIs?: string;
  howItHelps?: string;
  lawyerRole?: string;
}

export interface ShieldPerk {
  title: string;
  desc: string;
}

export interface ShieldTier {
  id: number;
  name: string;
  priceGEL: number;
  level: string;
  risk: string;
  isRecommended?: boolean;
  perks: ShieldPerk[];
  description: string;
}
