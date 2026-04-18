import { Metadata } from "next";
import { ProfessionalPageClient } from "./ProfessionalPageClient";

export const metadata: Metadata = {
  title: "Professional Package | Genezisi",
  description: "One-page custom landing website. Built in 7–10 days.",
};

export default function ProfessionalPage() {
  return <ProfessionalPageClient />;
}
