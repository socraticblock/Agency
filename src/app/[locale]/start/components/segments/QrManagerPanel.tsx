"use client";

import { useEffect, useRef, useState } from "react";
import { Check, QrCode, X } from "lucide-react";
import type { Lane1CustomizerState, Lane1StatePatch, QrStyle } from "../../lib/types";

export function QrManagerPanel({
  editable,
  state,
  patch,
}: {
  editable: boolean;
  state: Lane1CustomizerState;
  patch: (p: Lane1StatePatch) => void;
}) {
  const [open, setOpen] = useState(false);
  const [savingStatus, setSavingStatus] = useState<"idle" | "saving" | "saved">("idle");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const savingDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedToIdleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onPatch = (p: Partial<Lane1CustomizerState>) => {
    if (savingDebounceRef.current) clearTimeout(savingDebounceRef.current);
    if (savedToIdleRef.current) clearTimeout(savedToIdleRef.current);
    setSavingStatus("saving");
    patch(p);
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
    <div ref={rootRef} className="business-card-template-print-skip relative z-[120] flex w-full justify-center px-4 pb-2 pt-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/75"
      >
        <QrCode className="h-4 w-4" />
        QR
      </button>
      {open ? (
        <div className="absolute bottom-full left-1/2 mb-2 w-[min(100%,320px)] -translate-x-1/2 rounded-xl border border-white/20 bg-black/85 p-2 text-white shadow-2xl backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between gap-2 px-1">
            <p className="text-xs font-bold uppercase tracking-wide text-white/80">QR card</p>
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
                aria-label="Close QR panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="max-h-[min(58vh,420px)] overflow-y-auto rounded-lg bg-white/95 p-3 text-slate-900 shadow-inner">
            <label className="mb-3 flex cursor-pointer items-center gap-3 text-sm font-medium text-[#1e293b]">
              <input
                type="checkbox"
                className="h-4 w-4"
                style={{ accentColor: "var(--accent)" }}
                checked={state.showQrOnCard}
                onChange={(e) => onPatch({ showQrOnCard: e.target.checked })}
              />
              Show QR on card
            </label>

            <label className="start-label mb-1.5 block">
              Display mode
              <select
                className="start-field mt-1.5 w-full"
                value={state.qrDisplayMode}
                onChange={(e) => onPatch({ qrDisplayMode: e.target.value as "static" | "dropdown" })}
              >
                <option value="static">Static</option>
                <option value="dropdown">Dropdown</option>
              </select>
            </label>

            <label className="start-label mb-1.5 block">
              QR shape
              <select
                className="start-field mt-1.5 w-full"
                value={state.qrStyle}
                onChange={(e) => onPatch({ qrStyle: e.target.value as QrStyle })}
              >
                <option value="square">Square</option>
                <option value="rounded">Rounded</option>
                <option value="dots">Soft (rounded+)</option>
              </select>
            </label>

            <label className="start-label mb-1.5 block">
              Foreground (modules)
              <div className="mt-1.5 flex gap-2">
                <input
                  type="color"
                  value={state.qrForegroundColor}
                  onChange={(e) => onPatch({ qrForegroundColor: e.target.value })}
                  className="h-10 w-10 cursor-pointer rounded border border-slate-200"
                />
                <input
                  className="start-field w-full"
                  value={state.qrForegroundColor}
                  onChange={(e) => onPatch({ qrForegroundColor: e.target.value })}
                  placeholder="#111827"
                />
              </div>
            </label>

            <label className="start-label mb-1.5 block">
              Background
              <div className="mt-1.5 flex gap-2">
                <input
                  type="color"
                  value={state.qrBackgroundColor === "transparent" ? "#ffffff" : state.qrBackgroundColor}
                  onChange={(e) => onPatch({ qrBackgroundColor: e.target.value })}
                  className="h-10 w-10 cursor-pointer rounded border border-slate-200"
                />
                <input
                  className="start-field w-full"
                  value={state.qrBackgroundColor}
                  onChange={(e) => onPatch({ qrBackgroundColor: e.target.value })}
                  placeholder="#ffffff or transparent"
                />
              </div>
            </label>

            <label className="mt-3 flex cursor-pointer items-center gap-3 text-sm font-medium text-[#1e293b]">
              <input
                type="checkbox"
                className="h-4 w-4"
                style={{ accentColor: "var(--accent)" }}
                checked={state.showQrLogo}
                onChange={(e) => onPatch({ showQrLogo: e.target.checked })}
              />
              Show QR logo
            </label>
          </div>
        </div>
      ) : null}
    </div>
  );
}
