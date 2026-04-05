import { useEffect } from "react";
import {
  FOUNDATION_TO_TIER_SLUG,
  TIER_SLUG_TO_FOUNDATION,
} from "../../lib/architectTierUrl";
import { FOUNDATIONS } from "../../constants/pricing";

export function useURLSync(
  hydrated: boolean,
  urlSynced: boolean,
  setUrlSynced: (v: boolean) => void,
  foundation: string | null,
  setFoundation: (id: string | null) => void
) {
  // Deep-link from pricing: ?tier=professional | ?foundation=cms
  useEffect(() => {
    if (!hydrated || urlSynced) return;
    const params = new URLSearchParams(window.location.search);
    const tier = params.get("tier");
    const fromTier = tier ? TIER_SLUG_TO_FOUNDATION[tier] : undefined;
    const foundationParam = params.get("foundation");
    if (fromTier && FOUNDATIONS.some((x) => x.id === fromTier)) {
      setFoundation(fromTier);
    } else if (foundationParam && FOUNDATIONS.some((x) => x.id === foundationParam)) {
      setFoundation(foundationParam);
    }
    setUrlSynced(true);
  }, [hydrated, urlSynced, setFoundation, setUrlSynced]);

  // Keep `?tier=` / `?foundation=` in sync when user changes foundation (shareable deep links)
  useEffect(() => {
    if (!hydrated || !urlSynced || typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const slug = foundation ? FOUNDATION_TO_TIER_SLUG[foundation] : undefined;
    if (slug) {
      params.set("tier", slug);
      params.delete("foundation");
    } else if (foundation) {
      params.set("foundation", foundation);
      params.delete("tier");
    } else {
      params.delete("tier");
      params.delete("foundation");
    }
    const qs = params.toString();
    const next =
      `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
    const cur = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next !== cur) {
      window.history.replaceState(null, "", next);
    }
  }, [hydrated, urlSynced, foundation]);
}
