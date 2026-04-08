"use client";

import { Check } from "lucide-react";
import type { Lane1CustomizerState } from "../../lib/types";
import { BG_EFFECT_OPTION_META } from "../../lib/texture-presets";
import { labelClass } from "../StartCustomizer/types";

const chipBase =
  "relative flex flex-col items-center gap-1 rounded-lg border p-2 text-center text-[0.65rem] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A2744]";

function chipSelected(on: boolean) {
  return on
    ? "border-[#1A2744] bg-white shadow-sm ring-2 ring-[#1A2744]/20"
    : "border-slate-200/90 bg-white/80 hover:border-slate-300";
}

export function BackgroundMotionControls({
  state,
  onPatch,
}: {
  state: Lane1CustomizerState;
  onPatch: (p: Partial<Lane1CustomizerState["style"]>) => void;
}) {
  const { bgEffectId, bgEffectOpacity } = state.style;

  return (
    <fieldset className="border-0 p-0">
      <legend className={`${labelClass} mb-2 block`}>Background motion</legend>
      <p className="start-caption mb-2">Subtle animated layer behind content. Respects reduced motion.</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Background motion effect">
        {BG_EFFECT_OPTION_META.map((o) => {
          const onSel = bgEffectId === o.id;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={onSel}
              className={`${chipBase} ${chipSelected(onSel)} min-h-[52px]`}
              onClick={() => onPatch({ bgEffectId: o.id })}
            >
              {onSel ? (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1A2744] text-white">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                </span>
              ) : null}
              {o.labelEn}
            </button>
          );
        })}
      </div>
      {bgEffectId !== "none" ? (
        <label className={`${labelClass} mt-3 block`}>
          Motion opacity ({bgEffectOpacity}%)
          <input
            type="range"
            min={0}
            max={100}
            value={bgEffectOpacity}
            onChange={(e) => onPatch({ bgEffectOpacity: Number(e.target.value) })}
            className="mt-1 w-full accent-[#1A2744]"
          />
        </label>
      ) : (
        <p className="start-caption mt-3">Choose an effect to adjust opacity.</p>
      )}
    </fieldset>
  );
}
