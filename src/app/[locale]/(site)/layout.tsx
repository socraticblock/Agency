import type { Metadata } from "next";
import { MotionPreferences } from "@/components/providers/MotionPreferences";

/**
 * Legacy route group only. Children own their own canonical, OG and index
 * policies; a layout cannot know the final page path and must not emit a
 * homepage canonical for every nested page.
 */
export const metadata: Metadata = {
  title: "Genezisi — Websites, AI & Automation",
  description: "Founder-led websites, AI systems and automation built around real business needs.",
  metadataBase: new URL((process.env.NEXT_PUBLIC_SITE_URL || "https://genezisi.com").replace(/\/$/, "")),
};

export default function LegacySiteLayout({ children }: { children: React.ReactNode }) {
  return <MotionPreferences>{children}</MotionPreferences>;
}
