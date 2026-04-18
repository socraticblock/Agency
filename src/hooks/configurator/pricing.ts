import { useMemo, useCallback } from "react";
import { FOUNDATIONS, MODULES, SHIELD_TIERS } from "@/constants/pricing";
import { formatPrice as formatPricePure, EXCHANGE_RATE } from "@/utils/format";

const WESTERN_AGENCY_TOTAL_USD = 150 * 50;

/**
 * Pure pricing calculations hook — all derived values from configuration state.
 */
export function useConfiguratorPricing({
  foundation,
  selectedModules,
  moduleQuantities,
  shieldTier,
  isUSD,
}: {
  foundation: string | null;
  selectedModules: string[];
  moduleQuantities: Record<string, number>;
  shieldTier: number;
  isUSD: boolean;
}) {
  const exchangeRate = EXCHANGE_RATE;

  const activeFoundation = useMemo(
    () => FOUNDATIONS.find((f) => f.id === foundation),
    [foundation]
  );
  const foundationPrice = activeFoundation?.priceGEL || 0;

  const modulesPrice = useMemo(
    () =>
      selectedModules.reduce((acc, id) => {
        const mod = MODULES.find((m) => m.id === id);
        const qty = moduleQuantities[id] ?? 1;
        return acc + (mod?.priceGEL || 0) * qty;
      }, 0),
    [selectedModules, moduleQuantities]
  );

  const shieldPrice = useMemo(
    () => SHIELD_TIERS.find((s) => s.id === shieldTier)?.priceGEL || 0,
    [shieldTier]
  );

  const oneTimeTotal = useMemo(
    () => foundationPrice + modulesPrice,
    [foundationPrice, modulesPrice]
  );
  const annualShieldTotal = shieldPrice;

  const currentTotalUSD = useMemo(
    () => oneTimeTotal / exchangeRate,
    [oneTimeTotal, exchangeRate]
  );
  const savingsUSD = useMemo(
    () =>
      WESTERN_AGENCY_TOTAL_USD - currentTotalUSD > 0
        ? WESTERN_AGENCY_TOTAL_USD - currentTotalUSD
        : 0,
    [currentTotalUSD]
  );

  const hasGita = useMemo(
    () =>
      selectedModules.some(
        (id) => MODULES.find((m) => m.id === id)?.category === "Georgian Advantage"
      ),
    [selectedModules]
  );

  const totalHoursSaved = useMemo(
    () =>
      selectedModules.reduce((acc, id) => {
        const mod = MODULES.find((m) => m.id === id);
        return acc + (mod?.timeSaved || 0);
      }, 0),
    [selectedModules]
  );

  const formatPrice = useCallback(
    (price: number) => formatPricePure(price, isUSD),
    [isUSD]
  );

  return {
    activeFoundation,
    foundationPrice,
    modulesPrice,
    oneTimeTotal,
    annualShieldTotal,
    savingsUSD,
    hasGita,
    totalHoursSaved,
    formatPrice,
    exchangeRate,
  };
}
