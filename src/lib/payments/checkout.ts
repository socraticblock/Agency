import { SOVEREIGN_PACKAGES, type SovereignPackageId } from "../packages";

export function getCheckoutUrl(grade: SovereignPackageId): string | null {
  const pkg = SOVEREIGN_PACKAGES.find((p) => p.id === grade);
  if (!pkg) return null;

  const url = process.env[pkg.stripePriceEnvKey];
  return url ?? null;
}

