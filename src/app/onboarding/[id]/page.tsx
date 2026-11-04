import type { Metadata } from "next";

/** Operational/customer flow, not a public search landing page. */
export const metadata: Metadata = {
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: null },
};

import OnboardingPortal from "./OnboardingPortal";

type Props = { params: Promise<{ id: string }> };

export default async function OnboardingPage({ params }: Props) {
  const { id } = await params;
  return <OnboardingPortal sessionId={id} />;
}
