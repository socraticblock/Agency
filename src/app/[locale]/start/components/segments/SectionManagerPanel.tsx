"use client";

import { useEffect, useRef, useState } from "react";
import { ListTree, ChevronUp, ChevronDown, X, Check } from "lucide-react";
import type { Lane1CustomizerState, SectionId } from "../../lib/types";

const SECTION_LABELS: Record<SectionId, string> = {
  about: "About",
  services: "Services",
  testimonials: "Testimonials",
  gallery: "Gallery",
  awards: "Awards",
  video: "Video",
  booking: "Booking",
};

function swapInOrder(order: SectionId[], a: SectionId, b: SectionId): SectionId[] {
  const next = [...order];
  const ia = next.indexOf(a);
  const ib = next.indexOf(b);
  if (ia === -1 || ib === -1) return order;
  [next[ia], next[ib]] = [next[ib], next[ia]];
  return next;
}

interface SectionManagerPanelProps {
  editable: boolean;
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  onStructureChange?: (sectionId: SectionId) => void;
}

export function SectionManagerPanel({ editable, state, patch, onStructureChange }: SectionManagerPanelProps) {
  const [open, setOpen] = useState(false);
  const [savingStatus, setSavingStatus] = useState<"idle" | "saving" | "saved">("idle");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const savingDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedToIdleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  if (!editable) return null;

  const orderedActive = state.sectionOrder.filter((id) => state.activeSections.includes(id));

  useEffect(() => {
    if (!open) return;
    const handleOutsidePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (rootRef.current?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => {
      window.removeEventListener("pointerdown", handleOutsidePointerDown);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (savingDebounceRef.current) clearTimeout(savingDebounceRef.current);
      if (savedToIdleRef.current) clearTimeout(savedToIdleRef.current);
    };
  }, []);

  const runPatchedUpdate = (
    payload: Partial<Lane1CustomizerState>,
    changed: boolean,
    sectionId?: SectionId,
  ) => {
    if (!changed) return;
    if (savingDebounceRef.current) clearTimeout(savingDebounceRef.current);
    if (savedToIdleRef.current) clearTimeout(savedToIdleRef.current);
    setSavingStatus("saving");
    patch(payload);
    if (sectionId) onStructureChange?.(sectionId);
    savingDebounceRef.current = setTimeout(() => {
      setSavingStatus("saved");
      savedToIdleRef.current = setTimeout(() => setSavingStatus("idle"), 900);
    }, 260);
  };

  const toggle = (id: SectionId) => {
    if (state.activeSections.includes(id)) {
      runPatchedUpdate({ activeSections: state.activeSections.filter((x) => x !== id) }, true, id);
      return;
    }
    runPatchedUpdate({ activeSections: [...state.activeSections, id] }, true, id);
  };

  const move = (id: SectionId, dir: -1 | 1) => {
    const idx = orderedActive.indexOf(id);
    const nextIdx = idx + dir;
    if (idx === -1 || nextIdx < 0 || nextIdx >= orderedActive.length) return;
    const other = orderedActive[nextIdx];
    const nextOrder = swapInOrder(state.sectionOrder, id, other);
    const changed = nextOrder.some((value, index) => value !== state.sectionOrder[index]);
    runPatchedUpdate({ sectionOrder: nextOrder }, changed, id);
  };

  return (
    <div ref={rootRef} className="business-card-template-print-skip relative z-[120] flex justify-end px-4 pb-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/75"
      >
        <ListTree className="h-4 w-4" />
        Sections
      </button>

      {open ? (
        <div className="absolute right-4 top-full mt-2 w-[280px] rounded-xl border border-white/20 bg-black/85 p-3 text-white shadow-2xl backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-white/80">Visible sections</p>
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
                aria-label="Close section manager"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            {state.sectionOrder.map((id) => {
              const on = state.activeSections.includes(id);
              return (
                <label
                  key={id}
                  className={`flex items-center gap-2 rounded-lg border border-white/10 px-2.5 py-2 text-xs ${
                    on ? "bg-white/10" : "bg-white/[0.03]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggle(id)}
                    className="h-3.5 w-3.5"
                  />
                  <span>{SECTION_LABELS[id]}</span>
                </label>
              );
            })}
          </div>

          <div className="mt-3 border-t border-white/10 pt-2">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/60">Order (active)</p>
            <div className="space-y-1.5">
              {orderedActive.map((id, i) => (
                <div key={id} className="flex items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-xs">
                  <span>{SECTION_LABELS[id]}</span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      disabled={i === 0}
                      onClick={() => move(id, -1)}
                      className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
                      aria-label={`Move ${SECTION_LABELS[id]} up`}
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={i === orderedActive.length - 1}
                      onClick={() => move(id, 1)}
                      className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
                      aria-label={`Move ${SECTION_LABELS[id]} down`}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
