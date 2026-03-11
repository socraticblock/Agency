import type { SovereignPackageId } from "../packages";

export function getCheckoutUrl(grade: SovereignPackageId): string | null {
  const envKey =
    grade === "bridge"
      ? "NEXT_PUBLIC_STRIPE_BRIDGE_CHECKOUT_URL"
      : grade === "network"
        ? "NEXT_PUBLIC_STRIPE_NETWORK_CHECKOUT_URL"
        : "NEXT_PUBLIC_STRIPE_EMPIRE_CHECKOUT_URL";

  const url = process.env[envKey];
  return url ?? null;
}

