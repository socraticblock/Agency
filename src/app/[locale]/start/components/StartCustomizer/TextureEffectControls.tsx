"use client";

import { Check } from "lucide-react";
import type { Lane1CustomizerState } from "../../lib/types";
import { TEXTURE_OPTION_META } from "../../lib/texture-presets";
import { labelClass } from "./types";

const chipBase =
  "relative flex flex-col items-center gap-1 rounded-lg border p-2 text-center text-[0.65rem] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A2744]";

function chipSelected(on: boolean) {
  return on
    ? "border-[#1A2744] bg-white shadow-sm ring-2 ring-[#1A2744]/20"
    : "border-slate-200/90 bg-white/80 hover:border-slate-300";
}

export function TextureEffectControls({
  state,
  onPatch,
  useSecondary,
}: {
  state: Lane1CustomizerState;
  onPatch: (p: Partial<Lane1CustomizerState["style"]>) => void;
  useSecondary?: boolean;
}) {
  const { textureId, textureOpacity, bgEffectId } = state.style;

  return (
    <div className="mt-6 space-y-6 border-t border-black/10 pt-6">
      <fieldset>
        <legend className={`${labelClass} mb-2 block`}>{useSecondary ? "ტექსტურის გადაფარვა" : "Texture overlay"}</legend>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Texture">
          {TEXTURE_OPTION_META.map((o) => {
            const onSel = textureId === o.id;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={onSel}
                className={`${chipBase} ${chipSelected(onSel)} min-h-[52px]`}
                onClick={() => onPatch({ textureId: o.id })}
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
        {textureId !== "none" ? (
          <label className={`${labelClass} mt-3 block`}>
            {useSecondary ? "ტექსტურის სიძლიერე" : "Texture strength"} ({textureOpacity}%)
            <input
              type="range"
              min={0}
              max={100}
              value={textureOpacity}
              onChange={(e) => onPatch({ textureOpacity: Number(e.target.value) })}
              className="mt-1 w-full accent-[#1A2744]"
            />
          </label>
        ) : (
          <p className="start-caption mt-3">{useSecondary ? "ჯერ აირჩიე ტექსტურა, შემდეგ სიძლიერე." : "Choose a texture first to adjust strength."}</p>
        )}
      </fieldset>
    </div>
  );
}
