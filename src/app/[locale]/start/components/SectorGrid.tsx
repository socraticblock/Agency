"use client";

import { Scale, Building2, Briefcase, UtensilsCrossed } from "lucide-react";
import type { SectorId } from "../lib/types";
import { SECTOR_LABELS } from "../lib/placeholders";

const ICONS: Record<SectorId, typeof Scale> = {
  lawyers: Scale,
  realestate: Building2,
  consultants: Briefcase,
  restaurants: UtensilsCrossed,
};

export function SectorGrid({ onSelect }: { onSelect: (id: SectorId) => void }) {
  const sectors: SectorId[] = ["lawyers", "realestate", "consultants", "restaurants"];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {sectors.map((id) => {
        const L = SECTOR_LABELS[id];
        const Icon = ICONS[id];
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className="start-glass group flex min-h-[160px] w-full flex-col items-center p-6 text-center shadow-[var(--start-shadow-sm)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:shadow-[var(--start-shadow-md)]"
          >
            <Icon
              className="mb-3 h-10 w-10 text-[#1A2744]"
              strokeWidth={1.5}
              aria-hidden
            />
            <h2 className="start-panel-heading mb-1 w-full">{L.titleKa}</h2>
            <p className="start-body mb-1 text-[#64748b]">{L.titleEn}</p>
            <p className="start-caption mb-4">{L.taglineEn}</p>
            <span className="mt-auto text-sm font-semibold text-[#1A2744] underline-offset-4 transition group-hover:underline">
              Choose
            </span>
          </button>
        );
      })}
    </div>
  );
}
