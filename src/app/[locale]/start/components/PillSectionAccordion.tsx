"use client";

import { ChevronDown } from "lucide-react";

/** Single-open section headers for bottom pill panels (dark chrome). */
export function PillSectionAccordion({
  sections,
  openId,
  onOpenChange,
}: {
  sections: readonly { id: string; label: string }[];
  openId: string;
  onOpenChange: (id: string) => void;
}) {
  return (
    <div className="mb-2 flex flex-col gap-1">
      {sections.map((s) => {
        const on = openId === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onOpenChange(s.id)}
            className={`flex w-full items-center justify-between rounded-lg border px-2 py-2 text-left text-xs font-semibold transition ${
              on ? "border-white/30 bg-white/10 text-white" : "border-white/10 bg-black/30 text-white/80 hover:bg-white/5"
            }`}
          >
            <span>{s.label}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-white/70 transition-transform ${on ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
        );
      })}
    </div>
  );
}
