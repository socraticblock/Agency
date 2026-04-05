"use client";

import { memo } from "react";
import type { AccentPreset, FontPreset, VibePreset, AnimationPreset } from "../../lib/presets";
import { chipBase, chipSelected, SwatchCheck } from "./shared";

export const AccentPresetGrid = memo(function AccentPresetGrid({
  options, value, onChange,
}: { options: AccentPreset[]; value: string; onChange: (id: string) => void; }) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Accent</legend>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup" aria-label="Accent color">
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button key={p.id} type="button" role="radio" aria-checked={onSel} aria-label={p.labelEn}
              onClick={() => onChange(p.id)} className={`${chipBase} ${chipSelected(onSel)} min-h-[88px] touch-manipulation`}>
              <SwatchCheck show={onSel} />
              <div className="h-8 w-8 min-h-[32px] min-w-[32px] rounded-full border-2 border-white shadow-md sm:h-7 sm:w-7"
                style={{ background: p.accent, boxShadow: onSel ? `0 0 0 2px #1A2744` : undefined }} />
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">{p.labelEn}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});

export const FontPresetGrid = memo(function FontPresetGrid({
  options, value, onChange,
}: { options: FontPreset[]; value: string; onChange: (id: string) => void; }) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Font</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Font">
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button key={p.id} type="button" role="radio" aria-checked={onSel} aria-label={p.labelEn}
              onClick={() => onChange(p.id)} className={`${chipBase} ${chipSelected(onSel)} min-h-[88px] touch-manipulation`}>
              <SwatchCheck show={onSel} />
              <span className="flex h-12 w-full min-h-[48px] items-center justify-center rounded-md border border-slate-200/80 bg-slate-50/80 text-2xl text-[#1e293b]"
                style={{ fontFamily: p.fontHeading, fontWeight: p.headingWeight }}>Aa</span>
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">{p.labelEn}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});

export const VibePresetGrid = memo(function VibePresetGrid({
  options, value, onChange,
}: { options: VibePreset[]; value: string; onChange: (id: string) => void; }) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Aesthetic Vibe</legend>
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Vibe presets">
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button key={p.id} type="button" role="radio" aria-checked={onSel}
              className={`${chipBase} ${chipSelected(onSel)}`} onClick={() => onChange(p.id)}>
              <SwatchCheck show={onSel} />
              <div className="flex h-10 w-full items-center justify-center rounded-md border border-black/[0.06]"
                style={{
                  background: p.id === "glass" ? "rgba(255,255,255,0.2)" : (p.id === "neon" ? "black" : "#f8fafc"),
                  backdropFilter: p.id === "glass" ? `blur(8px)` : "none",
                  boxShadow: p.id === "neon" ? "0 0 10px rgba(0,255,255,0.5)" : "none",
                }}>
                <div className="h-6 w-6 rounded-full border border-black/10 transition-transform group-hover:scale-110" />
              </div>
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">{p.labelEn}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});

export const AnimationPresetGrid = memo(function AnimationPresetGrid({
  options, value, onChange,
}: { options: AnimationPreset[]; value: string; onChange: (id: string) => void; }) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Movement</legend>
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Animation presets">
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button key={p.id} type="button" role="radio" aria-checked={onSel}
              className={`${chipBase} ${chipSelected(onSel)}`} onClick={() => onChange(p.id)}>
              <SwatchCheck show={onSel} />
              <div className="flex h-10 w-full items-center justify-center rounded-md border border-black/[0.06] bg-slate-50">
                <div className={`h-2 w-8 rounded-full bg-[#1A2744] ${p.id === 'spring' ? 'animate-bounce' : (p.id === 'cinematic' ? 'animate-pulse' : '')}`} />
              </div>
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">{p.labelEn}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});
