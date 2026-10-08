import type { Metadata } from "next";
import { CommandCenterPageClient } from "./CommandCenterPageClient";

export const metadata: Metadata = {
  title: "Command Center Package | Genezisi",
  description:
    "Multi-page business website with an editable dashboard, CMS, analytics, and priority support.",
};

export default function CommandCenterPage() {
  return <CommandCenterPageClient />;
}
