"use client";

import { PartnerHero } from "./PartnerHero";
import { PartnerProducts } from "./PartnerProducts";
import { PartnerShield } from "./PartnerShield";
import { PartnerEarnings } from "./PartnerEarnings";
import { PartnerCompetitiveEdge } from "./PartnerCompetitiveEdge";
import { PartnerDayInLife } from "./PartnerDayInLife";
import { PartnerSplit } from "./PartnerSplit";
import { PartnerOwnCard } from "./PartnerOwnCard";
import { PartnerQuestionnaire } from "./PartnerQuestionnaire";
import { PartnerProfile } from "./PartnerProfile";
import { PartnerTrust } from "./PartnerTrust";
import { PartnerApplication } from "./PartnerApplication";

interface PartnerPageClientProps {
  locale: string;
}

export function PartnerPageClient({ locale }: PartnerPageClientProps) {
  return (
    <div className="flex flex-col">
      <PartnerHero />
      <PartnerProducts />
      <PartnerShield />
      <PartnerEarnings />
      <PartnerCompetitiveEdge />
      <PartnerDayInLife />
      <PartnerSplit />
      <PartnerOwnCard />
      <PartnerQuestionnaire />
      <PartnerProfile />
      <PartnerTrust />
      <PartnerApplication />
    </div>
  );
}
