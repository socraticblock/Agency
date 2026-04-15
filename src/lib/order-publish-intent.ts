/**
 * Tier rules for persisted publish slug + domain handoff (orders API + admin).
 */

export type DigitalCardTier = "subdomain" | "professional" | "executive";

export type DomainStatus = "none" | "requested" | "awaiting_dns" | "connected" | "live";

export type OrderPublishIntent = {
  publishSlug: string;
  requestedDomain: string | null;
  domainStatus: DomainStatus;
};

function makeSlugFromNameCompany(name: string, company: string): string {
  const base = name
    ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : company
      ? company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
      : "card";
  return base || "card";
}

/** Slug segment safe for URL path (matches publish route validation). */
export function normalizePublishSlugSegment(raw: string): string {
  const s = raw
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/-+/g, "-");
  return s || "card";
}

export function computeOrderPublishIntent(
  tier: DigitalCardTier,
  orderId: string,
  digitalCardUrlHint: string,
  name: string,
  company: string,
): OrderPublishIntent {
  const hint = digitalCardUrlHint.trim();

  if (tier === "subdomain") {
    const publishSlug = hint
      ? normalizePublishSlugSegment(hint)
      : normalizePublishSlugSegment(makeSlugFromNameCompany(name, company));
    return {
      publishSlug,
      requestedDomain: hint || null,
      domainStatus: "none",
    };
  }

  const publishSlug = normalizePublishSlugSegment(orderId);

  if (tier === "professional") {
    return {
      publishSlug,
      requestedDomain: hint || null,
      domainStatus: hint ? "requested" : "none",
    };
  }

  return {
    publishSlug,
    requestedDomain: hint || null,
    domainStatus: hint ? "requested" : "none",
  };
}
