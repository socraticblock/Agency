"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Sparkles, X } from "lucide-react";
import type { ButtonStyleId, Lane1CustomizerState, Lane1StatePatch } from "../../lib/types";
import { AccentPresetGrid, ButtonStyleGrid } from "../StylePresetGrids";
import { ACCENT_PRESETS, BUTTON_STYLE_PRESETS } from "../../lib/presets";

/** Accent + action-button chrome — one surface (“how actions look”). */
export function LookManagerPanel({
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
    const merged: Partial<Lane1CustomizerState["style"]> = { ...p };
    if (p.accentId != null) {
      merged.secondaryAccentId = p.accentId;
    }
    patch({ style: merged });
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
        <Sparkles className="h-4 w-4" />
        {useSecondary ? "სტილი" : "Look"}
      </button>
      {open ? (
        <div className="absolute bottom-full left-1/2 mb-2 w-[min(100%,320px)] -translate-x-1/2 rounded-xl border border-white/20 bg-black/85 p-2 text-white shadow-2xl backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between gap-2 px-1">
            <p className="text-xs font-bold uppercase tracking-wide text-white/80">{useSecondary ? "აქცენტი და ღილაკები" : "Brand &amp; actions"}</p>
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
                aria-label="Close look panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="max-h-[min(58vh,420px)] overflow-y-auto rounded-lg bg-white/95 p-3 text-slate-900 shadow-inner">
            <div className="[&_fieldset]:border-slate-200 [&_legend]:text-slate-700">
              <p className="start-caption mb-3">
                {useSecondary
                  ? "აქცენტი მართავს შევსებულ ღილაკებს და მონიშვნებს."
                  : "Accent drives filled buttons and highlights; borders and gradients use the paired tone from the same preset."}
              </p>
              <AccentPresetGrid
                options={ACCENT_PRESETS}
                value={state.style.accentId}
                onChange={(id: string) => onStylePatch({ accentId: id })}
                legend={useSecondary ? "აქცენტი" : "Accent"}
                groupAriaLabel={useSecondary ? "აქცენტის ფერი" : "Accent color"}
              />
            </div>
            <div className="my-4 border-t border-slate-200" aria-hidden />
            <div className="[&_fieldset]:border-slate-200 [&_legend]:text-slate-700">
              <p className="start-caption mb-3">
                {useSecondary
                  ? "დარეკვა, გაზიარება, მიმართულება და დაჯავშნა ერთ ღილაკის სტილს იყენებს."
                  : "Call, share, directions, and booking actions share this shape."}
              </p>
              <ButtonStyleGrid
                options={BUTTON_STYLE_PRESETS}
                value={state.style.buttonStyleId}
                onChange={(id: string) => onStylePatch({ buttonStyleId: id as ButtonStyleId })}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
