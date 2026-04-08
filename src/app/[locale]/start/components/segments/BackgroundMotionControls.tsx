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

const MOTION_DISCLAIMER =
  "Heavy or older phones, low-power mode, and the visitor’s “Reduce motion” setting can slow down or turn off background motion. What you see here is the high-quality target; real devices vary.";

export function BackgroundMotionControls({
  state,
  onPatch,
}: {
  state: Lane1CustomizerState;
  onPatch: (p: Partial<Lane1CustomizerState["style"]>) => void;
}) {
  const { bgEffectId, bgEffectOpacity, bgEffectSpeed, bgEffectIntensity } = state.style;
  const speed = bgEffectSpeed ?? 100;
  const intensity = bgEffectIntensity ?? 100;

  return (
    <fieldset className="border-0 p-0">
      <legend className={`${labelClass} mb-2 block`}>Background motion</legend>
      <p className="start-caption mb-2">Animated layer behind your content.</p>
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
        <div className="mt-3 space-y-3">
          <label className={`${labelClass} block`}>
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
          <label className={`${labelClass} block`}>
            Motion timing ({speed}
            {speed < 85 ? " · slower" : speed > 115 ? " · faster" : " · default"})
            <input
              type="range"
              min={50}
              max={200}
              value={speed}
              onChange={(e) => onPatch({ bgEffectSpeed: Number(e.target.value) })}
              className="mt-1 w-full accent-[#1A2744]"
            />
          </label>
          <label className={`${labelClass} block`}>
            Motion intensity ({intensity}
            {intensity < 85 ? " · subtle" : intensity > 115 ? " · bold" : " · balanced"})
            <input
              type="range"
              min={50}
              max={150}
              value={intensity}
              onChange={(e) => onPatch({ bgEffectIntensity: Number(e.target.value) })}
              className="mt-1 w-full accent-[#1A2744]"
            />
          </label>
          <p className="start-caption text-slate-600">{MOTION_DISCLAIMER}</p>
        </div>
      ) : (
        <p className="start-caption mt-3">Choose an effect to adjust motion.</p>
      )}
    </fieldset>
  );
}
