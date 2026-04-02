/**
 * Maps `?tier=` query values on `/architect` to `FOUNDATIONS` ids.
 */
export const TIER_SLUG_TO_FOUNDATION: Record<string, string> = {
  essential: "landing",
  professional: "cms",
  "command-center": "saas",
  "ecommerce-hq": "ecomm",
};
