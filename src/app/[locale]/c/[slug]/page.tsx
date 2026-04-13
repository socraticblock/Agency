"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import type { Lane1CustomizerState } from "@/app/[locale]/start/lib/types";
import { BusinessCardTemplate } from "@/app/[locale]/start/components/BusinessCardTemplate";

interface CardApiResponse {
  id: string;
  slug: string;
  tier: string;
  status: string;
  name: string | null;
  company: string | null;
  state: Lane1CustomizerState;
}

export default function PublicCardPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const [card, setCard] = useState<CardApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/cards/${slug}`)
      .then((res) => {
        if (res.status === 404) {
          setError(true);
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: CardApiResponse) => {
        if (data) setCard(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#1A2744]" />
          <p className="mt-3 text-sm text-slate-500">Loading card...</p>
        </div>
      </div>
    );
  }

  if (error || !card) {
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
