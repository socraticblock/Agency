import type { Metadata } from "next";
import { notFound } from "next/navigation";

/**
 * No onboarding invitations are active. Retain the historical portal
 * component for possible future development, but do not serve an interactive
 * form that cannot safely save to the retired API.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: null },
};

export default function OnboardingUnavailable() {
  notFound();
}
