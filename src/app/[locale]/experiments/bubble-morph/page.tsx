import { notFound } from "next/navigation";
import { BubbleMorphStudy } from "./BubbleMorphStudy";

export const metadata = {
  title: "Bubble-to-card interaction study | Genezisi",
  robots: { index: false, follow: false },
};

export default async function BubbleMorphPreview({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // This is a design prototype. Localized production content is not yet approved.
  if (locale !== "en") notFound();
  return <BubbleMorphStudy />;
}