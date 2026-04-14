import { notFound } from "next/navigation";
import type { Lane1CustomizerState } from "@/app/[locale]/start/lib/types";
import { BusinessCardTemplate } from "@/app/[locale]/start/components/BusinessCardTemplate";
import { getPublishedCardBySlug } from "@/lib/db";

export const revalidate = 60; // cache for 60 seconds

interface CardData {
  id: string;
  slug: string;
  tier: string;
  status: string;
  name: string | null;
  company: string | null;
  state: Lane1CustomizerState;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicCardPage({ params }: PageProps) {
  const { slug } = await params;
  const card = await getPublishedCardBySlug(slug);

  if (!card) {
    notFound();
    return null;
  }

  const parsedState: Lane1CustomizerState = JSON.parse(card.state_json);
  const cardData: CardData = {
    id: card.id,
    slug: card.slug ?? slug,
    tier: card.tier,
    status: card.status,
    name: card.name,
    company: card.company,
    state: parsedState,
  };

  const qrUrl = `https://genezisi.com/c/${slug}`;
  const ownerName = cardData.name ?? cardData.company ?? "Business Card";

  return (
    <div className="min-h-screen bg-slate-50">
      <BusinessCardTemplate
        state={cardData.state}
        previewLang="primary"
        homeHref="/"
        ownerName={ownerName}
        layoutMode="responsive"
        qrUrl={qrUrl}
        hideBranding={false}
      />
    </div>
  );
}
