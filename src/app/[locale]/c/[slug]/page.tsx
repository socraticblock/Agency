import { notFound } from "next/navigation";
import type { Lane1CustomizerState } from "@/app/[locale]/start/lib/types";
import { BusinessCardTemplate } from "@/app/[locale]/start/components/BusinessCardTemplate";
import { getPublishedCardBySlug } from "@/lib/db";

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
  const card: CardData | null = await getPublishedCardBySlug(slug);

  if (!card) {
    notFound();
    return null;
  }

  const qrUrl = `https://genezisi.com/c/${slug}`;
  const ownerName = card.name ?? card.company ?? "Business Card";

  return (
    <div className="min-h-screen bg-slate-50">
      <BusinessCardTemplate
        state={card.state}
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
