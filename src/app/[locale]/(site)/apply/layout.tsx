import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discuss a bespoke project | Genezisi",
  description: "Project enquiries now begin with a direct conversation about scope and requirements.",
  robots: { index: false, follow: false },
};

export default function LegacyApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
