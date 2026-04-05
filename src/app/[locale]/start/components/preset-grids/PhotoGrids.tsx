"use client";

import { memo } from "react";
import * as LucideIcons from "lucide-react";
import type { PhotoShapePreset, PhotoEffectPreset, PhotoOverlayPreset, PhotoBorderPreset } from "../../lib/presets";
import { chipBase, chipSelected, SwatchCheck } from "./shared";

export const PhotoShapePresetGrid = memo(function PhotoShapePresetGrid({
  options, value, onChange,
}: { options: PhotoShapePreset[]; value: string; onChange: (id: string) => void; }) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Frame shape</legend>
      <div className="grid grid-cols-5 gap-2" role="radiogroup">
        {options.map((p) => {
          const onSel = value === p.id;
          const Icon = (LucideIcons as any)[p.icon] || LucideIcons.Circle;
          return (
            <button key={p.id} type="button" role="radio" title={p.labelEn} aria-checked={onSel}
              className={`${chipBase} ${chipSelected(onSel)} !p-1`} onClick={() => onChange(p.id)}>
              <SwatchCheck show={onSel} />
              <div className="flex h-8 w-full items-center justify-center rounded border border-black/[0.06] bg-slate-50">
                <Icon className="h-5 w-5 text-[#1A2744]" />
              </div>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});

export const PhotoEffectPresetGrid = memo(function PhotoEffectPresetGrid({
  options, value, onChange,
}: { options: PhotoEffectPreset[]; value: string; onChange: (id: string) => void; }) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Film filter</legend>
      <div className="grid grid-cols-5 gap-2" role="radiogroup">
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button key={p.id} type="button" role="radio" title={p.labelEn} aria-checked={onSel}
              className={`${chipBase} ${chipSelected(onSel)} !p-1`} onClick={() => onChange(p.id)}>
              <SwatchCheck show={onSel} />
              <div className="flex h-8 w-full items-center justify-center rounded border border-black/[0.06] bg-slate-200 overflow-hidden" style={{ filter: p.filter }}>
                <div className="w-full h-full bg-gradient-to-br from-slate-400 to-slate-600 opacity-50" />
              </div>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});

export const PhotoOverlayPresetGrid = memo(function PhotoOverlayPresetGrid({
  options, value, onChange,
}: { options: PhotoOverlayPreset[]; value: string; onChange: (id: string) => void; }) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Overlay layer</legend>
      <div className="grid grid-cols-2 gap-2" role="radiogroup">
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button key={p.id} type="button" role="radio" aria-checked={onSel}
              className={`${chipBase} ${chipSelected(onSel)}`} onClick={() => onChange(p.id)}>
              <SwatchCheck show={onSel} />
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">{p.labelEn}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});

export const PhotoBorderPresetGrid = memo(function PhotoBorderPresetGrid({
  options, value, onChange,
}: { options: PhotoBorderPreset[]; value: string; onChange: (id: string) => void; }) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Border</legend>
      <div className="grid grid-cols-2 gap-2" role="radiogroup">
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button key={p.id} type="button" role="radio" aria-checked={onSel}
              className={`${chipBase} ${chipSelected(onSel)}`} onClick={() => onChange(p.id)}>
              <SwatchCheck show={onSel} />
              <div className="flex h-10 w-full items-center justify-center rounded-md border border-black/[0.06] bg-slate-50">
                <div className={`h-6 w-6 rounded-full border-[#1A2744] bg-white ${
                  p.id === 'thin-ring' ? 'border' : (p.id === 'thick-ring' ? 'border-2' : (p.id === 'glow-ring' ? 'shadow-[0_0_8px_#1A2744]' : ''))
                }`} />
              </div>
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">{p.labelEn}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});
