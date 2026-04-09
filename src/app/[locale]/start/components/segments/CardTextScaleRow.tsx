"use client";

import type { CardTextScaleId } from "../../lib/types";
import { CARD_TEXT_SCALE_PRESETS } from "../../lib/presets";

export function CardTextScaleRow({
  value,
  onChange,
}: {
  value: CardTextScaleId;
  onChange: (id: CardTextScaleId) => void;
}) {
  return (
    <div className="mb-2 rounded-lg border border-white/10 bg-white/5 p-2">
      <p className="mb-1.5 px-0.5 text-[10px] font-bold uppercase tracking-wide text-white/60">Text size</p>
      <div className="grid grid-cols-4 gap-1" role="radiogroup" aria-label="Card text size">
        {CARD_TEXT_SCALE_PRESETS.map((p) => {
          const onSel = value === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={onSel}
              aria-label={p.labelEn}
              title={p.labelEn}
              onClick={() => onChange(p.id)}
              className={`rounded-lg px-1 py-1.5 text-[11px] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 ${
                onSel
                  ? "bg-white/20 text-white ring-1 ring-white/35"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {p.labelEn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
