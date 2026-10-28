import type { Metadata } from "next";
import { redirect } from "next/navigation";

/**
 * A deliberately isolated, noindex review route.
 * The production homepage is untouched; all assets live in public/flagship-journey.
 * English-first candidate pending translated locale versions and owner acceptance.
 */
export const metadata: Metadata = {
  title: "Genezisi — Flagship Journey Preview",
  robots: { index: false, follow: false },
};

export default function FlagshipJourneyPreview() {
  redirect("/flagship-journey/index.html");
}
