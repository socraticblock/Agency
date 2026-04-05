"use client";

import { memo } from "react";
import { Check, Plus, Image as ImageIcon, Trash2, Maximize2 } from "lucide-react";
import type { Lane1CustomizerState } from "../../lib/types";
import type { BackgroundPreset, TextColorPreset } from "../../lib/presets";
import { BACKGROUND_SOLID_PRESETS } from "../../lib/presets";
import { chipBase, chipSelected, SwatchCheck } from "./shared";

export const BackgroundSolidPresetGrid = memo(function BackgroundSolidPresetGrid({
  options, value, onChange,
}: { options: BackgroundPreset[]; value: string; onChange: (id: string) => void; }) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Solid backgrounds</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Solid backgrounds">
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button key={p.id} type="button" role="radio" aria-checked={onSel} aria-label={p.labelEn}
              onClick={() => onChange(p.id)} className={`${chipBase} ${chipSelected(onSel)} min-h-[72px] touch-manipulation`}>
              <SwatchCheck show={onSel} />
              <div className="h-11 w-full min-h-[44px] rounded-md border border-black/[0.06] shadow-inner sm:h-9" style={{ background: p.cssValue }} />
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">{p.labelEn}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});

export const BackgroundGradientPresetGrid = memo(function BackgroundGradientPresetGrid({
  options, value, onChange,
}: { options: BackgroundPreset[]; value: string; onChange: (id: string) => void; }) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Gradients</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Gradient backgrounds">
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button key={p.id} type="button" role="radio" aria-checked={onSel} aria-label={p.labelEn}
              onClick={() => onChange(p.id)} className={`${chipBase} ${chipSelected(onSel)} min-h-[88px] touch-manipulation`}>
              <SwatchCheck show={onSel} />
              <div className="h-14 w-full min-h-[56px] rounded-md border border-black/[0.06] shadow-inner sm:h-12" style={{ background: p.cssValue }} />
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">{p.labelEn}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});

export const TextColorPresetGrid = memo(function TextColorPresetGrid({
  options, value, onChange,
}: { options: TextColorPreset[]; value: string; onChange: (id: string) => void; }) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Text color</legend>
      <p className="start-caption -mt-1 mb-1">Only for light backgrounds. Dark solids and gradients set text automatically.</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Text color">
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button key={p.id} type="button" role="radio" aria-checked={onSel} aria-label={p.labelEn}
              onClick={() => onChange(p.id)} className={`${chipBase} ${chipSelected(onSel)} min-h-[72px] touch-manipulation`}>
              <SwatchCheck show={onSel} />
              <div className="h-11 w-11 min-h-[44px] min-w-[44px] rounded-full border border-black/10 shadow-inner sm:h-9 sm:w-9" style={{ backgroundColor: p.color }} />
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">{p.labelEn}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});
export const BackgroundBaseControls = memo(function BackgroundBaseControls({
  state,
  onPatch,
}: {
  state: Lane1CustomizerState;
  onPatch: (p: Partial<Lane1CustomizerState["style"]>) => void;
}) {
  const { bgBaseId, bgBaseColor, bgBaseImageDataUrl, bgBaseBlur } = state.style;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
        {(["solid", "image"] as const).map((t) => (
          <button
            key={t}
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
              const reader = new FileReader();
              reader.onload = (re) => {
                onPatch({ bgBaseImageDataUrl: re.target?.result as string });
              };
              reader.readAsDataURL(file);
            }} 
          />

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

export const BackgroundOverlayControls = memo(function BackgroundOverlayControls({
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
