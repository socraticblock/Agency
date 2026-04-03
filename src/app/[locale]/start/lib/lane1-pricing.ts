export const LANE1_BASE_GEL = 450;
export const LANE1_RENEWAL_COPY_GEL = 120;
export const ADDON_EXTRA_LANG_SELF_GEL = 50;
export const ADDON_EXTRA_LANG_PRO_GEL = 150;
export const ADDON_GOOGLE_MAP_GEL = 75;

export function computeLane1Total(params: {
  secondaryMode: "none" | "self" | "pro";
  addGoogleMap: boolean;
}): number {
  let total = LANE1_BASE_GEL;
  if (params.secondaryMode === "self") total += ADDON_EXTRA_LANG_SELF_GEL;
  if (params.secondaryMode === "pro") total += ADDON_EXTRA_LANG_PRO_GEL;
  if (params.addGoogleMap) total += ADDON_GOOGLE_MAP_GEL;
  return total;
}
