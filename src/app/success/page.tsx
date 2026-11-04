import type { Metadata } from "next";

/** Operational/customer flow, not a public search landing page. */
export const metadata: Metadata = {
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: null },
};

import SuccessView from "./SuccessView";

export default function SuccessPage() {
  return <SuccessView />;
}
