import { useState } from "react";
import { CollapsibleSection } from "../CollapsibleSection";
import { Sparkles, Camera } from "lucide-react";
import { compressImageForLane1Storage } from "../../lib/image-compress";

import {
  PhotoEffectPresetGrid,
  PhotoOverlayPresetGrid,
  PhotoBorderPresetGrid,
} from "../StylePresetGrids";
import {
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
      patch({
        style: {
          ...state.style,
          photoZoom: 100,
          photoPositionX: 50,
          photoPositionY: 50,
        },
      });
      const { dataUrl, warnLargeOriginal } = await compressImageForLane1Storage(file);
      patch({ 
        photoDataUrl: dataUrl,
        style: {
          ...state.style,
          photoZoom: 100,
          photoPositionX: 50,
          photoPositionY: 50
        }
      });
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
      <p className="start-caption mb-4">
        Customize your identity photo. You can now **drag the photo directly** to position it, or **use the scroll wheel** to zoom in and out.
      </p>

      {state.photoDataUrl ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
          {/* Atmosphere & Motion Group */}
          <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <Sparkles className="h-3 w-3" /> Atmosphere & Motion
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


          </div>

          <button
            onClick={() => patch({ photoDataUrl: null })}
            className="w-full rounded-xl border border-red-100 bg-red-50/50 py-2.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-50"
          >
            Remove Photo
          </button>
        </div>
      ) : (
        <div 
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e) => onPhotoChange(e as any);
            input.click();
          }}
          className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-10 transition-all hover:bg-slate-50 group cursor-pointer"
        >
          <Camera className="h-8 w-8 text-slate-300 group-hover:text-slate-400 transition-colors" />
          <span className="text-xs font-bold text-slate-400 group-hover:text-slate-500">Click to upload photo</span>
        </div>
      )}
    </CollapsibleSection>
  );
}
