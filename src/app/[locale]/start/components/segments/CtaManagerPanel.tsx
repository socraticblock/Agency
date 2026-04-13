"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, MessageCircle, Phone, X } from "lucide-react";
import type { CtaChannelId, Lane1CustomizerState } from "../../lib/types";
import { usePillOnboardingGlow } from "./usePillOnboardingGlow";

function swapInOrder(order: CtaChannelId[], a: CtaChannelId, b: CtaChannelId): CtaChannelId[] {
  const next = [...order];
  const ia = next.indexOf(a);
  const ib = next.indexOf(b);
  if (ia === -1 || ib === -1) return order;
  [next[ia], next[ib]] = [next[ib], next[ia]];
  return next;
}

const ICONS: Record<CtaChannelId, typeof Phone> = { call: Phone, whatsapp: MessageCircle };

export function CtaManagerPanel({
  editable,
  state,
  patch,
  useSecondary,
  orderHighlightIssueIds,
}: {
  editable: boolean;
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  useSecondary: boolean;
  orderHighlightIssueIds?: ReadonlySet<string>;
}) {
  const [open, setOpen] = useState(false);
  const [savingStatus, setSavingStatus] = useState<"idle" | "saving" | "saved">("idle");
  const shouldGlow = usePillOnboardingGlow("cta", open);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const savingDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedToIdleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hl = orderHighlightIssueIds?.has("cta-buttons");

  const orderedActive = state.ctaChannelOrder.filter((id) => state.activeCtaChannels.includes(id));

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

  const runPatchedUpdate = (payload: Partial<Lane1CustomizerState>, changed: boolean) => {
    if (!changed) return;
    if (savingDebounceRef.current) clearTimeout(savingDebounceRef.current);
    if (savedToIdleRef.current) clearTimeout(savedToIdleRef.current);
    setSavingStatus("saving");
    patch(payload);
    savingDebounceRef.current = setTimeout(() => {
      setSavingStatus("saved");
      savedToIdleRef.current = setTimeout(() => setSavingStatus("idle"), 900);
    }, 260);
  };

  const label = (id: CtaChannelId) =>
    id === "call"
      ? useSecondary
        ? "ზარი"
        : "Call"
      : useSecondary
        ? "WhatsApp"
        : "WhatsApp";

  const toggle = (id: CtaChannelId) => {
    if (state.activeCtaChannels.includes(id)) {
      const nextActive = state.activeCtaChannels.filter((x) => x !== id);
      const orderWithout = state.ctaChannelOrder.filter((x) => x !== id);
      const nextOrder = [...orderWithout, id];
      runPatchedUpdate({ activeCtaChannels: nextActive, ctaChannelOrder: nextOrder }, true);
      return;
    }
    const nextActive = [...state.activeCtaChannels, id];
    const orderWithout = state.ctaChannelOrder.filter((x) => x !== id);
    const activeCountBeforeInsert = orderWithout.filter((x) => state.activeCtaChannels.includes(x)).length;
    const nextOrder = [
      ...orderWithout.slice(0, activeCountBeforeInsert),
      id,
      ...orderWithout.slice(activeCountBeforeInsert),
    ];
    runPatchedUpdate({ activeCtaChannels: nextActive, ctaChannelOrder: nextOrder }, true);
  };

  const move = (id: CtaChannelId, dir: -1 | 1) => {
    const idx = orderedActive.indexOf(id);
    const nextIdx = idx + dir;
    if (idx === -1 || nextIdx < 0 || nextIdx >= orderedActive.length) return;
    const other = orderedActive[nextIdx];
    const nextOrder = swapInOrder(state.ctaChannelOrder, id, other);
    const changed = nextOrder.some((value, index) => value !== state.ctaChannelOrder[index]);
    runPatchedUpdate({ ctaChannelOrder: nextOrder }, changed);
  };

  return (
    <div ref={rootRef} className="business-card-template-print-skip relative z-[120] flex justify-end px-4 pb-2 font-sans">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex min-w-40 items-center justify-center gap-2 rounded-full border border-white/25 bg-black/65 px-3 py-1.5 text-center text-xs font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/75 ${
          shouldGlow ? "business-card-pill-attention" : ""
        } ${hl ? "ring-2 ring-red-400/90 ring-offset-2 ring-offset-black/40" : ""}`}
      >
        <Phone className="h-4 w-4" />
        {useSecondary ? "ღილაკები" : "CTAs"}
      </button>
      {open ? (
        <div className="absolute bottom-full right-4 mb-2 w-[280px] rounded-xl border border-white/20 bg-black/85 p-3 text-white shadow-2xl backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-white/80">
              {useSecondary ? "ზარი / WhatsApp" : "Call / WhatsApp"}
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-white/70">
                {savingStatus === "saving" ? (
                  <span className="animate-pulse">{useSecondary ? "ინახება..." : "Saving..."}</span>
                ) : null}
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
                aria-label="Close CTA manager"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="space-y-1.5">
            {state.ctaChannelOrder.map((id) => {
              const on = state.activeCtaChannels.includes(id);
              const activeIndex = orderedActive.indexOf(id);
              const canMoveUp = on && activeIndex > 0;
              const canMoveDown = on && activeIndex !== -1 && activeIndex < orderedActive.length - 1;
              const Icon = ICONS[id];
              const inputId = `cta-toggle-${id}`;
              return (
                <div
                  key={id}
                  className={`rounded-lg border border-white/10 px-2.5 py-2 text-xs ${on ? "bg-white/10" : "bg-white/[0.03]"}`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      id={inputId}
                      type="checkbox"
                      checked={on}
                      onChange={() => toggle(id)}
                      className="h-3.5 w-3.5"
                    />
                    <label htmlFor={inputId} className="flex flex-1 cursor-pointer items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
                      {label(id)}
                    </label>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        disabled={!canMoveUp}
                        onClick={() => move(id, -1)}
                        className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
                        aria-label={`Move ${label(id)} up`}
                      >
                        <ChevronUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={!canMoveDown}
                        onClick={() => move(id, 1)}
                        className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
                        aria-label={`Move ${label(id)} down`}
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
