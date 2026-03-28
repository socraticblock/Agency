/**
 * Pure formatting utilities for the Architect Studio.
 * Extracted from useConfigurator to prevent recreation on every render.
 */

const EXCHANGE_RATE = 2.7;

/**
 * Format a price in GEL or USD depending on the `isUSD` flag.
 * This is a pure function — safe to call from any context.
 */
export function formatPrice(price: number, isUSD: boolean): string {
  if (isUSD) {
    const converted = price / EXCHANGE_RATE;
    return `$${converted.toFixed(0)}`;
  }
  return `${price.toLocaleString("ka-GE")} ₾`;
}

export { EXCHANGE_RATE };
