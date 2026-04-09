"use client";

import { Check } from "lucide-react";
import type { BodyTypographyPackId } from "../../lib/types";
import { BODY_TYPOGRAPHY_PRESETS } from "../../lib/presets";

const PREVIEW_TEXT = "Aa";

const chipBase =
  "relative flex flex-col items-stretch gap-1 rounded-xl border p-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A2744]";

function chipSelected(on: boolean) {
  return on
    ? "border-[#1A2744] bg-white shadow-[var(--start-shadow-sm)] ring-2 ring-[#1A2744]/25"
    : "border-slate-200/90 bg-white/80 hover:border-slate-300 hover:bg-white";
}

function SwatchCheck({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#1A2744] text-white shadow-sm">
      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
    </span>
  );
}

export function BodyTypographyPresetGrid({
  value,
  onChange,
}: {
  value: BodyTypographyPackId;
  onChange: (id: BodyTypographyPackId) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Body font</legend>
      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3"
        role="radiogroup"
        aria-label="Body text font"
      >
        {BODY_TYPOGRAPHY_PRESETS.map((p) => {
          const onSel = value === p.id;
          const previewStyle = {
            fontFamily: p.fontBody,
            fontWeight: p.bodyWeight,
            lineHeight: p.bodyLineHeight,
            letterSpacing: p.letterSpacing ?? "normal",
          };
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={onSel}
              aria-label={p.labelEn}
              onClick={() => onChange(p.id)}
              className={`${chipBase} ${chipSelected(onSel)} min-h-[88px] touch-manipulation`}
            >
              <SwatchCheck show={onSel} />
              <span
                className="flex h-12 min-h-[48px] w-full items-center justify-center pr-6 text-2xl text-[#1e293b]"
                style={previewStyle}
              >
                {PREVIEW_TEXT}
              </span>
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">{p.labelEn}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
