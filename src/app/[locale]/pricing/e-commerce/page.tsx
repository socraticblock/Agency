import type { Metadata } from "next";
import { ECommercePageClient } from "./ECommercePageClient";

export const metadata: Metadata = {
  title: "E-Commerce HQ Package | Genezisi",
  description:
    "Online store package with product management, order workflows, analytics, and Georgian payment integration options.",
};

export default function ECommercePage() {
  return <ECommercePageClient />;
}
