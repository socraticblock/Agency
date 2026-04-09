"use client";

import { useEffect, useRef, useState } from "react";
import { Check, SquareRoundCorner, X } from "lucide-react";
import type { CardShadowId, Lane1CustomizerState, Lane1StatePatch } from "../../lib/types";

export function CardSurfaceManagerPanel({
  editable,
  state,
  patch,
  useSecondary,
}: {
  editable: boolean;
  state: Lane1CustomizerState;
  patch: (p: Lane1StatePatch) => void;
  useSecondary: boolean;
}) {
  const [open, setOpen] = useState(false);
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

  return (
    <div ref={rootRef} className="business-card-template-print-skip relative z-[120] flex w-full justify-center px-4 pb-3 pt-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/75"
      >
        <SquareRoundCorner className="h-4 w-4" />
        {useSecondary ? "ზედაპირი" : "Surface"}
      </button>
      {open ? (
        <div className="absolute bottom-full left-1/2 mb-2 w-[min(100%,320px)] -translate-x-1/2 rounded-xl border border-white/20 bg-black/85 p-2 text-white shadow-2xl backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between gap-2 px-1">
            <p className="text-xs font-bold uppercase tracking-wide text-white/80">{useSecondary ? "ბარათის ზედაპირი" : "Card surface"}</p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-white/70">
                {savingStatus === "saving" ? <span className="animate-pulse">{useSecondary ? "ინახება..." : "Saving..."}</span> : null}
                {savingStatus === "saved" ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-300" />
                    <span className="text-emerald-200">{useSecondary ? "შენახულია" : "Saved"}</span>
                  </>
                ) : null}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Close card surface panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="max-h-[min(55vh,360px)] overflow-y-auto rounded-lg bg-white/95 p-3 text-slate-900 shadow-inner">
            <p className="start-caption mb-3">{useSecondary ? "ბარათის ფორმა და ჩრდილი." : "Shape and elevation for the card shell."}</p>
            <label className="start-label mb-1.5 block">
              {useSecondary ? "კუთხის რადიუსი" : "Corner radius"} ({state.style.cardRadiusPx}px)
              <input
                type="range"
                min={8}
                max={40}
                value={state.style.cardRadiusPx}
                onChange={(e) => onStylePatch({ cardRadiusPx: Number(e.target.value) })}
                className="mt-1 w-full accent-[#1A2744]"
              />
            </label>
            <label className="start-label mb-1.5 block">
              {useSecondary ? "ჩრდილი" : "Shadow"}
              <select
                className="start-field mt-1.5 w-full"
                value={state.style.cardShadowId}
                onChange={(e) => onStylePatch({ cardShadowId: e.target.value as CardShadowId })}
              >
                <option value="none">{useSecondary ? "არცერთი" : "None"}</option>
                <option value="soft">{useSecondary ? "რბილი" : "Soft"}</option>
                <option value="elevated">{useSecondary ? "ამოწეული" : "Elevated"}</option>
                <option value="luxury">{useSecondary ? "ლუქსი" : "Luxury"}</option>
              </select>
            </label>
          </div>
        </div>
      ) : null}
    </div>
  );
}
