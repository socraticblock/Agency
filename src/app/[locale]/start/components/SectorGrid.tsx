"use client";

import type { SectorId } from "../lib/types";
import { SECTOR_LABELS } from "../lib/placeholders";

export function SectorGrid({ onSelect }: { onSelect: (id: SectorId) => void }) {
  const sectors: SectorId[] = ["lawyers", "realestate", "consultants", "restaurants"];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {sectors.map((id) => {
        const L = SECTOR_LABELS[id];
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className="group rounded-2xl border border-amber-900/15 bg-white/80 p-6 text-left shadow-sm transition hover:border-amber-700/40 hover:shadow-md"
          >
            <h2 className="text-lg font-bold text-amber-950">{L.titleEn}</h2>
            <p className="mt-2 text-sm text-amber-900/70">{L.descEn}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-amber-800 underline-offset-4 group-hover:underline">
              Choose
            </span>
          </button>
        );
      })}
    </div>
  );
}
