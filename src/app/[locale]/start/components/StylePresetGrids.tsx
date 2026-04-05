"use client";

import { memo } from "react";

import { Check, Plus } from "lucide-react";
import type { Lane1CustomizerState } from "../lib/types";
import type {
  AccentPreset,
  BackgroundPreset,
  FontPreset,
  TextColorPreset,
  VibePreset,
  AnimationPreset,
  PhotoShapePreset,
  PhotoEffectPreset,
  PhotoBorderPreset,
  PhotoOverlayPreset,
} from "../lib/presets";
import { BACKGROUND_SOLID_PRESETS } from "../lib/presets";
import { Circle } from "lucide-react";

const chipBase =
  "relative flex flex-col items-center gap-1.5 rounded-xl border p-2 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A2744]";

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

const BackgroundBaseControls = memo(function BackgroundBaseControls({
  state,
  onPatch,
}: {
  state: Lane1CustomizerState;
  onPatch: (p: Partial<Lane1CustomizerState["style"]>) => void;
}) {
  const { bgBaseColor } = state.style;

  return (
    <div className="space-y-4">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Base Color</span>
      {/* Curated Swatches */}
      <div className="grid grid-cols-4 gap-2">
        {BACKGROUND_SOLID_PRESETS.map((p) => {
          const onSel = bgBaseColor === p.cssValue;
          return (
            <button
              key={p.id}
              onClick={() => onPatch({ bgBaseColor: p.cssValue, backgroundId: p.id })}
              className={`${chipBase} ${chipSelected(onSel)} min-h-0 !p-1.5`}
              title={p.labelEn}
            >
              <div className="h-8 w-full rounded-md border border-black/5" style={{ background: p.cssValue }} />
            </button>
          );
        })}
        {/* Custom Hex Picker */}
        <div className="relative">
          <button
            onClick={() => document.getElementById("bg-base-hex")?.click()}
            className={`${chipBase} ${chipSelected(false)} min-h-0 !p-1.5 w-full`}
          >
            <div 
              className="flex h-8 w-full items-center justify-center rounded-md border border-dashed border-slate-300" 
              style={{ background: bgBaseColor }}
            >
              <Plus className="h-3 w-3 text-slate-400" />
            </div>
          </button>
          <input 
            id="bg-base-hex" 
            type="color" 
            className="sr-only" 
            value={bgBaseColor} 
            onChange={(e) => onPatch({ bgBaseColor: e.target.value, backgroundId: "custom" })} 
          />
        </div>
      </div>
    </div>
  );
});

const BackgroundOverlayControls = memo(function BackgroundOverlayControls({
  state,
  onPatch,
}: {
  state: Lane1CustomizerState;
  onPatch: (p: Partial<Lane1CustomizerState["style"]>) => void;
}) {
  const { bgOverlayId, bgOverlayColor1, bgOverlayColor2, bgOverlayColor3, bgOverlayAngle, bgOverlayOpacity } = state.style;

  return (
    <div className="space-y-6 pt-4 border-t border-slate-100 mt-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overlay Decor</span>
        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">Optional</span>
      </div>

      {/* Overlay Type Selector */}
      <div className="grid grid-cols-5 gap-1.5 p-1 bg-slate-100 rounded-xl">
        {(["none", "solid", "linear", "radial", "mesh"] as const).map((t) => (
          <button
            key={t}
            onClick={() => onPatch({ bgOverlayId: t })}
            className={`py-1.5 text-[10px] font-bold rounded-lg transition-all capitalize ${
              bgOverlayId === t ? "bg-white shadow-sm text-[#1A2744]" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {bgOverlayId !== "none" && (
        <div className="space-y-5 animate-in fade-in slide-in-from-top-2">
          {/* Color Pickers */}
          <div className="flex items-center gap-3">
            <div className="space-y-1.5 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">Colors</span>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={bgOverlayColor1} 
                  onChange={(e) => onPatch({ bgOverlayColor1: e.target.value })}
                  className="h-8 w-12 rounded-md border border-white shadow-sm cursor-pointer"
                />
                {bgOverlayId !== "solid" && (
                  <input 
                    type="color" 
                    value={bgOverlayColor2} 
                    onChange={(e) => onPatch({ bgOverlayColor2: e.target.value })}
                    className="h-8 w-12 rounded-md border border-white shadow-sm cursor-pointer"
                  />
                )}
                {bgOverlayId === "mesh" && (
                  <input 
                    type="color" 
                    value={bgOverlayColor3} 
                    onChange={(e) => onPatch({ bgOverlayColor3: e.target.value })}
                    className="h-8 w-12 rounded-md border border-white shadow-sm cursor-pointer"
                  />
                )}
              </div>
            </div>

            {bgOverlayId === "linear" && (
              <div className="space-y-1.5 w-1/3">
                <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">Angle</span>
                <input 
                  type="number" min="0" max="360" 
                  value={bgOverlayAngle} 
                  onChange={(e) => onPatch({ bgOverlayAngle: parseInt(e.target.value) })}
                  className="h-8 w-full rounded-md border border-slate-200 bg-white text-xs font-bold text-center"
                />
              </div>
            )}
          </div>

          {/* Opacity Slider */}
          <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 space-y-3">
            <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
              <span>Effect Opacity</span>
              <span>{Math.round(bgOverlayOpacity * 100)}%</span>
            </div>
            <input 
              type="range" min="0" max="1" step="0.01" 
              value={bgOverlayOpacity} 
              onChange={(e) => onPatch({ bgOverlayOpacity: parseFloat(e.target.value) })}
              className="w-full accent-[#1A2744]"
            />
          </div>
        </div>
      )}
    </div>
  );
});

export { BackgroundBaseControls, BackgroundOverlayControls };

export const TextColorPresetGrid = memo(function TextColorPresetGrid({
  options,
  value,
  onChange,
}: {
  options: TextColorPreset[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Text color</legend>
      <p className="start-caption -mt-1 mb-1">
        Only for light backgrounds. Dark solids and gradients set text automatically.
      </p>
      <div
        className="grid grid-cols-3 gap-2 sm:grid-cols-3"
        role="radiogroup"
        aria-label="Text color"
      >
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={onSel}
              aria-label={p.labelEn}
              onClick={() => onChange(p.id)}
              className={`${chipBase} ${chipSelected(onSel)} min-h-[72px] touch-manipulation`}
            >
              <SwatchCheck show={onSel} />
              <div
                className="h-11 w-11 min-h-[44px] min-w-[44px] rounded-full border border-black/10 shadow-inner sm:h-9 sm:w-9"
                style={{ backgroundColor: p.color }}
              />
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">
                {p.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});

/** §8.3 — filled accent circles */
export const AccentPresetGrid = memo(function AccentPresetGrid({
  options,
  value,
  onChange,
}: {
  options: AccentPreset[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Accent</legend>
      <div
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        role="radiogroup"
        aria-label="Accent color"
      >
        {options.map((p) => {
          const onSel = value === p.id;
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
              <div
                className="h-8 w-8 min-h-[32px] min-w-[32px] rounded-full border-2 border-white shadow-md sm:h-7 sm:w-7"
                style={{
                  background: p.accent,
                  boxShadow: onSel ? `0 0 0 2px #1A2744` : undefined,
                }}
              />
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">
                {p.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});

export const FontPresetGrid = memo(function FontPresetGrid({
  options,
  value,
  onChange,
}: {
  options: FontPreset[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Font</legend>
      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3"
        role="radiogroup"
        aria-label="Font"
      >
        {options.map((p) => {
          const onSel = value === p.id;
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
                className="flex h-12 w-full min-h-[48px] items-center justify-center rounded-md border border-slate-200/80 bg-slate-50/80 text-2xl text-[#1e293b]"
                style={{
                  fontFamily: p.fontHeading,
                  fontWeight: p.headingWeight,
                }}
              >
                Aa
              </span>
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">
                {p.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});

export const VibePresetGrid = memo(function VibePresetGrid({
  options,
  value,
  onChange,
}: {
  options: VibePreset[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Aesthetic Vibe</legend>
      <div
        className="grid grid-cols-3 gap-2"
        role="radiogroup"
        aria-label="Vibe presets"
      >
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={onSel}
              className={`${chipBase} ${chipSelected(onSel)}`}
              onClick={() => onChange(p.id)}
            >
              <SwatchCheck show={onSel} />
              <div
                className="flex h-10 w-full items-center justify-center rounded-md border border-black/[0.06]"
                style={{
                  background: p.id === "glass" ? "rgba(255,255,255,0.2)" : (p.id === "neon" ? "black" : "#f8fafc"),
                  backdropFilter: p.id === "glass" ? `blur(8px)` : "none",
                  boxShadow: p.id === "neon" ? "0 0 10px rgba(0,255,255,0.5)" : "none",
                }}
              >
                <div className="h-6 w-6 rounded-full border border-black/10 transition-transform group-hover:scale-110" />
              </div>
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">
                {p.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});

export const AnimationPresetGrid = memo(function AnimationPresetGrid({
  options,
  value,
  onChange,
}: {
  options: AnimationPreset[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Movement</legend>
      <div
        className="grid grid-cols-3 gap-2"
        role="radiogroup"
        aria-label="Animation presets"
      >
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={onSel}
              className={`${chipBase} ${chipSelected(onSel)}`}
              onClick={() => onChange(p.id)}
            >
              <SwatchCheck show={onSel} />
              <div className="flex h-10 w-full items-center justify-center rounded-md border border-black/[0.06] bg-slate-50">
                <div 
                  className={`h-2 w-8 rounded-full bg-[#1A2744] ${
                    p.id === 'spring' ? 'animate-bounce' : (p.id === 'cinematic' ? 'animate-pulse' : '')
                  }`} 
                />
              </div>
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">
                {p.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});

export const PhotoShapePresetGrid = memo(function PhotoShapePresetGrid({
  options,
  value,
  onChange,
}: {
  options: PhotoShapePreset[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Frame shape</legend>
      <div className="grid grid-cols-5 gap-2" role="radiogroup">
        {options.map((p) => {
          const onSel = value === p.id;
          const Icon = Circle;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              title={p.labelEn}
              aria-checked={onSel}
              className={`${chipBase} ${chipSelected(onSel)} !p-1`}
              onClick={() => onChange(p.id)}
            >
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
  options,
  value,
  onChange,
}: {
  options: PhotoEffectPreset[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Film filter</legend>
      <div className="grid grid-cols-5 gap-2" role="radiogroup">
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              title={p.labelEn}
              aria-checked={onSel}
              className={`${chipBase} ${chipSelected(onSel)} !p-1`}
              onClick={() => onChange(p.id)}
            >
              <SwatchCheck show={onSel} />
              <div 
                className="flex h-8 w-full items-center justify-center rounded border border-black/[0.06] bg-slate-200 overflow-hidden"
                style={{ filter: p.filter }}
              >
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
  options,
  value,
  onChange,
}: {
  options: PhotoOverlayPreset[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Overlay layer</legend>
      <div className="grid grid-cols-2 gap-2" role="radiogroup">
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={onSel}
              className={`${chipBase} ${chipSelected(onSel)}`}
              onClick={() => onChange(p.id)}
            >
              <SwatchCheck show={onSel} />
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">
                {p.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});

export const PhotoBorderPresetGrid = memo(function PhotoBorderPresetGrid({
  options,
  value,
  onChange,
}: {
  options: PhotoBorderPreset[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Border</legend>
      <div className="grid grid-cols-2 gap-2" role="radiogroup">
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={onSel}
              className={`${chipBase} ${chipSelected(onSel)}`}
              onClick={() => onChange(p.id)}
            >
              <SwatchCheck show={onSel} />
              <div className="flex h-10 w-full items-center justify-center rounded-md border border-black/[0.06] bg-slate-50">
                <div className={`h-6 w-6 rounded-full border-[#1A2744] bg-white ${
                  p.id === 'thin-ring' ? 'border' : (p.id === 'thick-ring' ? 'border-2' : (p.id === 'glow-ring' ? 'shadow-[0_0_8px_#1A2744]' : ''))
                }`} />
              </div>
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">
                {p.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});
