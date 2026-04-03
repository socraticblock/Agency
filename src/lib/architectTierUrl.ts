/**
 * Maps `?tier=` query values on `/architect` to `FOUNDATIONS` ids.
 */
export const TIER_SLUG_TO_FOUNDATION: Record<string, string> = {
  essential: "landing",
  professional: "cms",
  "command-center": "saas",
  "ecommerce-hq": "ecomm",
};

/** Reverse map for `?tier=` when persisting foundation to the URL */
export const FOUNDATION_TO_TIER_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(TIER_SLUG_TO_FOUNDATION).map(([slug, id]) => [id, slug]),
);
