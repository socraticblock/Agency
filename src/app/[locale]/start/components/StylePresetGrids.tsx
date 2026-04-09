"use client";

import { memo } from "react";

import { Check, Plus, Image as ImageIcon, Trash2, Maximize2 } from "lucide-react";
import type { Lane1CustomizerState } from "../lib/types";
import type {
  AccentPreset,
  BackgroundPreset,
  FontPreset,
  TextColorPreset,
  VibePreset,
  AnimationPreset,
  ButtonStylePreset,
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

function buttonStylePreviewChipClass(id: string): string {
  switch (id) {
    case "sharp":
      return "rounded-none";
    case "luxury":
      return "rounded-xl";
    case "minimal":
      return "rounded-md";
    case "brutalist":
      return "rounded-sm shadow-[3px_3px_0_0_#1e293b]";
    case "stripe":
      return "rounded-none border-y-2 border-x-0";
    case "tint":
      return "rounded-lg opacity-80";
    case "clay":
      return "rounded-2xl";
    case "metal":
      return "rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]";
    case "mesh":
      return "rounded-lg";
    case "glassmorph":
      return "rounded-lg border border-white/50 bg-white/25";
    case "outlined":
      return "rounded-lg bg-white";
    case "classic":
    default:
      return "rounded-lg";
  }
}

function hexColorEqual(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

const BackgroundBaseControls = memo(function BackgroundBaseControls({
  state,
  onPatch,
}: {
  state: Lane1CustomizerState;
  onPatch: (p: Partial<Lane1CustomizerState["style"]>) => void;
}) {
  const { bgBaseId, bgBaseColor, bgBaseImageDataUrl, bgBaseBlur } = state.style;

  return (
    <div className="space-y-6">
      {/* Layer Type Toggle */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
        {(["solid", "image"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onPatch({ bgBaseId: t })}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all capitalize ${
              bgBaseId === t ? "bg-white shadow-sm text-[#1A2744]" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {t === "solid" ? "Color" : "Photo"}
          </button>
        ))}
      </div>

      {bgBaseId === "solid" ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Base Color</span>
          <div className="grid grid-cols-4 gap-2">
            {BACKGROUND_SOLID_PRESETS.map((p) => {
              const onSel = hexColorEqual(bgBaseColor, p.cssValue);
              return (
                <button
                  key={p.id}
                  type="button"
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
                type="button"
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
      ) : (
        <div className="space-y-5 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Background Photo</span>
            {bgBaseImageDataUrl && (
              <button 
                onClick={() => onPatch({ bgBaseImageDataUrl: null })}
                className="text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase tracking-tight flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" /> Clear
              </button>
            )}
          </div>

          {!bgBaseImageDataUrl ? (
            <button
              onClick={() => document.getElementById("bg-image-upload")?.click()}
              className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-10 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-4 ring-slate-100">
                <ImageIcon className="h-6 w-6 text-slate-400" />
              </div>
              <div className="text-center">
                <div className="text-xs font-bold text-slate-600">Upload backdrop</div>
                <div className="text-[10px] text-slate-400">JPG or PNG (max 5MB)</div>
              </div>
            </button>
          ) : (
            <div className="relative group overflow-hidden rounded-2xl border border-slate-200 aspect-[16/6] bg-slate-100">
               <img 
                 src={bgBaseImageDataUrl} 
                 className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                 alt="Background Preview" 
               />
               <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => document.getElementById("bg-image-upload")?.click()}
                    className="bg-white/90 backdrop-blur text-[#1A2744] px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2"
                  >
                    <Maximize2 className="h-3 w-3" /> Change Photo
                  </button>
               </div>
            </div>
          )}

          <input 
            id="bg-image-upload" 
            type="file" 
            accept="image/*" 
            className="sr-only" 
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              // We need to import the compression utility or use a simpler version here
              // For now, we'll assume the parent component handles the heavy lifting or use a basic FileReader
              const reader = new FileReader();
              reader.onload = (re) => {
                onPatch({ bgBaseImageDataUrl: re.target?.result as string });
              };
              reader.readAsDataURL(file);
            }} 
          />

          {/* Blur Control */}
          <div className="p-3 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
              <span className="flex items-center gap-1.5"><Maximize2 className="h-3 w-3 rotate-45" /> Depth Blur</span>
              <span>{bgBaseBlur}px</span>
            </div>
            <input 
              type="range" min="0" max="24" step="1" 
              value={bgBaseBlur} 
              onChange={(e) => onPatch({ bgBaseBlur: parseInt(e.target.value) })}
              className="w-full accent-[#1A2744]"
            />
          </div>
        </div>
      )}
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
            type="button"
            onClick={() => onPatch({ bgOverlayId: t })}
            className={`py-1.5 text-[10px] font-bold rounded-lg transition-all capitalize ${
              bgOverlayId === t ? "bg-white shadow-sm text-[#1A2744]" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Fixed min height avoids panel height jumping when overlay type is "none" vs other modes */}
      <div className="min-h-[220px]">
        {bgOverlayId === "none" ? (
          <div className="flex min-h-[220px] flex-col justify-center rounded-xl border border-dashed border-slate-200/90 bg-slate-50/80 px-4 py-6 text-center">
            <p className="text-xs font-medium text-slate-500">
              Choose Solid, Linear, Radial, or Mesh to set colors and opacity. None keeps the overlay off.
            </p>
          </div>
        ) : (
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
  legend = "Accent",
  groupAriaLabel = "Accent color",
}: {
  options: AccentPreset[];
  value: string;
  onChange: (id: string) => void;
  legend?: string;
  groupAriaLabel?: string;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">{legend}</legend>
      <div
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        role="radiogroup"
        aria-label={groupAriaLabel}
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
  preview = "heading",
  legend = "Font",
  groupAriaLabel = "Font",
}: {
  options: FontPreset[];
  value: string;
  onChange: (id: string) => void;
  /** Preview the heading stack (titles, CTAs) or body stack (paragraphs). */
  preview?: "heading" | "body";
  legend?: string;
  groupAriaLabel?: string;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">{legend}</legend>
      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3"
        role="radiogroup"
        aria-label={groupAriaLabel}
      >
        {options.map((p) => {
          const onSel = value === p.id;
          const previewStyle =
            preview === "body"
              ? { fontFamily: p.fontBody, fontWeight: p.bodyWeight as number }
              : { fontFamily: p.fontHeading, fontWeight: p.headingWeight as number };
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
                style={previewStyle}
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
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
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

export const ButtonStyleGrid = memo(function ButtonStyleGrid({
  options,
  value,
  onChange,
}: {
  options: ButtonStylePreset[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Button shape</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Button styles">
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={onSel}
              aria-label={p.labelEn}
              className={`${chipBase} ${chipSelected(onSel)} min-h-[72px]`}
              onClick={() => onChange(p.id)}
            >
              <SwatchCheck show={onSel} />
              <span
                className={`mx-auto h-8 w-[70%] border-2 border-[#1A2744] bg-[#1A2744]/10 ${buttonStylePreviewChipClass(p.id)}`}
              />
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">{p.labelEn}</span>
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
