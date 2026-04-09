"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Layers2, X } from "lucide-react";
import type { Lane1CustomizerState, Lane1StatePatch } from "../../lib/types";
import { BackgroundBaseControls, BackgroundOverlayControls } from "../StylePresetGrids";
import { TextureEffectControls } from "../StartCustomizer/TextureEffectControls";
import { BackgroundMotionControls } from "./BackgroundMotionControls";

type BgTab = "base" | "overlay" | "texture" | "motion";

export function BackgroundManagerPanel({
  editable,
  state,
  patch,
}: {
  editable: boolean;
  state: Lane1CustomizerState;
  patch: (p: Lane1StatePatch) => void;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<BgTab>("base");
  const [savingStatus, setSavingStatus] = useState<"idle" | "saving" | "saved">("idle");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const savingDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedToIdleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onStylePatch = (p: Partial<Lane1CustomizerState["style"]>) => {
    if (savingDebounceRef.current) clearTimeout(savingDebounceRef.current);
    if (savedToIdleRef.current) clearTimeout(savedToIdleRef.current);
    setSavingStatus("saving");
    patch({ style: p });
    savingDebounceRef.current = setTimeout(() => {
      setSavingStatus("saved");
      savedToIdleRef.current = setTimeout(() => setSavingStatus("idle"), 900);
    }, 260);
  };

  useEffect(() => {
    if (!open) return;
    const handleOutsidePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (rootRef.current?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => window.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, [open]);

  useEffect(() => {
    return () => {
      if (savingDebounceRef.current) clearTimeout(savingDebounceRef.current);
      if (savedToIdleRef.current) clearTimeout(savedToIdleRef.current);
    };
  }, []);

  if (!editable) return null;

  const tabBtn = (id: BgTab, label: string) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide transition ${
        tab === id ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div ref={rootRef} className="business-card-template-print-skip relative z-[120] flex w-full justify-center px-4 pb-3 pt-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/75"
      >
        <Layers2 className="h-4 w-4" />
        Background
      </button>
      {open ? (
        <div className="absolute bottom-full left-1/2 mb-2 w-[min(100%,320px)] -translate-x-1/2 rounded-xl border border-white/20 bg-black/85 p-2 text-white shadow-2xl backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between gap-2 px-1">
            <p className="text-xs font-bold uppercase tracking-wide text-white/80">Background</p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-white/70">
                {savingStatus === "saving" ? <span className="animate-pulse">Saving...</span> : null}
                {savingStatus === "saved" ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-300" />
                    <span className="text-emerald-200">Saved</span>
                  </>
                ) : null}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Close background panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mb-2 flex flex-wrap justify-center gap-1 rounded-full border border-white/15 bg-white/5 p-1">
            {tabBtn("base", "Base")}
            {tabBtn("overlay", "Overlay")}
            {tabBtn("texture", "Texture")}
            {tabBtn("motion", "Motion")}
          </div>
          <div className="max-h-[min(55vh,380px)] overflow-y-auto rounded-lg bg-white/95 p-3 text-slate-900 shadow-inner">
            {tab === "base" ? (
              <>
                <BackgroundBaseControls state={state} onPatch={onStylePatch} />
              </>
            ) : null}
            {tab === "overlay" ? <BackgroundOverlayControls state={state} onPatch={onStylePatch} /> : null}
            {tab === "texture" ? (
              <div className="[&_fieldset]:border-slate-200 [&_legend]:text-slate-700">
                <TextureEffectControls state={state} onPatch={onStylePatch} />
              </div>
            ) : null}
            {tab === "motion" ? (
              <div className="[&_fieldset]:border-slate-200 [&_legend]:text-slate-700">
                <BackgroundMotionControls state={state} onPatch={onStylePatch} />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
