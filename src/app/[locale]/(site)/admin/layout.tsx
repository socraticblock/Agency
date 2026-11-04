import type { Metadata } from "next";

/** Admin login and order management are not search landing pages. */
export const metadata: Metadata = {
  title: "Genezisi — Administration",
  robots: { index: false, follow: false, noarchive: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
