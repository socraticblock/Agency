import { useState } from "react";
import { CollapsibleSection } from "../CollapsibleSection";
import { ZoomIn, Move } from "lucide-react";
import { compressImageForLane1Storage } from "../../lib/image-compress";

import {
  PhotoShapePresetGrid,
  PhotoEffectPresetGrid,
  PhotoOverlayPresetGrid,
  PhotoBorderPresetGrid,
} from "../StylePresetGrids";
import {
  PHOTO_SHAPE_PRESETS,
  PHOTO_EFFECT_PRESETS,
  PHOTO_OVERLAY_PRESETS,
  PHOTO_BORDER_PRESETS,
} from "../../lib/presets";
import { type SectionProps, fieldClass } from "./types";

export function PhotoSection({ state, setState, patch, isOpen, onToggle }: SectionProps) {
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoHint, setPhotoHint] = useState<string | null>(null);

  async function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setPhotoHint(null);
    setPhotoBusy(true);
    try {
      const { dataUrl, warnLargeOriginal } = await compressImageForLane1Storage(file);
      patch({ photoDataUrl: dataUrl });
      setPhotoHint(
        warnLargeOriginal
          ? "Original file was over 2 MB — we compressed it for storage."
          : null,
      );
    } catch {
      setPhotoHint("Could not process this image. Try JPG or PNG.");
    } finally {
      setPhotoBusy(false);
    }
  }

  return (
    <CollapsibleSection
      id="photo"
      title="Photo"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <p className="start-caption">
        JPG or PNG, max 5 MB. We compress to ~200 KB for browser storage. 
      </p>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        disabled={photoBusy}
        onChange={onPhotoChange}
        className={`${fieldClass} cursor-pointer py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#1e293b] disabled:cursor-wait disabled:opacity-60`}
      />
      {photoHint ? (
        <p className="text-xs font-medium text-amber-800">{photoHint}</p>
      ) : null}

      {state.photoDataUrl && (
        <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-2">
          <PhotoShapePresetGrid
            options={PHOTO_SHAPE_PRESETS}
            value={state.style?.photoShape || "circle"}
            onChange={(id: string) => setState(s => ({ ...s, style: { ...s.style, photoShape: id as any } }))}
          />

          <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-1">
            {(["left", "center"] as const).map((pos) => (
              <button
                key={pos}
                onClick={() => setState(s => ({ ...s, style: { ...s.style, photoAlignment: pos } }))}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold capitalize transition-all ${
                  (state.style?.photoAlignment || "left") === pos
                    ? "bg-[#1A2744] text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Move className="h-3 w-3" />
                {pos === "left" ? "Split" : "Centered"}
              </button>
            ))}
          </div>

          <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
             <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
               <ZoomIn className="h-3 w-3" /> Framing & Zoom
             </div>
             
             <label className="block space-y-1.5">
               <div className="flex justify-between text-[11px] font-medium text-slate-500">
                 <span>Scale</span>
                 <span>{state.style?.photoZoom || 100}%</span>
               </div>
               <input
                 type="range"
                 min="100"
                 max="200"
                 step="1"
                 value={state.style?.photoZoom || 100}
                 onChange={(e) => setState(s => ({ ...s, style: { ...s.style, photoZoom: parseInt(e.target.value) } }))}
                 className="w-full transition-all accent-[#1A2744]"
               />
             </label>

             <div className="grid grid-cols-2 gap-4">
               <label className="block space-y-1.5">
                 <div className="text-[11px] font-medium text-slate-500">X Position</div>
                 <input
                   type="range"
                   min="0"
                   max="100"
                   step="1"
                   value={state.style?.photoPositionX ?? 50}
                   onChange={(e) => setState(s => ({ ...s, style: { ...s.style, photoPositionX: parseInt(e.target.value) } }))}
                   className="w-full accent-[#1A2744]"
                 />
               </label>
               <label className="block space-y-1.5">
                 <div className="text-[11px] font-medium text-slate-500">Y Position</div>
                 <input
                   type="range"
                   min="0"
                   max="100"
                   step="1"
                   value={state.style?.photoPositionY ?? 50}
                   onChange={(e) => setState(s => ({ ...s, style: { ...s.style, photoPositionY: parseInt(e.target.value) } }))}
                   className="w-full accent-[#1A2744]"
                 />
               </label>
             </div>
          </div>

          <PhotoEffectPresetGrid
            options={PHOTO_EFFECT_PRESETS}
            value={state.style?.photoEffect || "none"}
            onChange={(id: string) => setState(s => ({ ...s, style: { ...s.style, photoEffect: id as any } }))}
          />

          <PhotoOverlayPresetGrid
            options={PHOTO_OVERLAY_PRESETS}
            value={state.style?.photoOverlay || "none"}
            onChange={(id: string) => setState(s => ({ ...s, style: { ...s.style, photoOverlay: id as any } }))}
          />

          <PhotoBorderPresetGrid
            options={PHOTO_BORDER_PRESETS}
            value={state.style?.photoBorder || "none"}
            onChange={(id: string) => setState(s => ({ ...s, style: { ...s.style, photoBorder: id as any } }))}
          />

          <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#1e293b]">
            <input
              type="checkbox"
              className="h-4 w-4"
              style={{ accentColor: "var(--accent)" }}
              checked={Boolean(state.style?.photoKenBurns)}
              onChange={(e) =>
                setState((s) => ({ ...s, style: { ...s.style, photoKenBurns: e.target.checked } }))
              }
            />
            Ken Burns motion on photo (disabled when reduced motion is on)
          </label>
        </div>
      )}
    </CollapsibleSection>
  );
}
