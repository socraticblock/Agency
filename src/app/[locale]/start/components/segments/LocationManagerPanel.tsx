"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, MapPinned, X } from "lucide-react";
import type { Lane1CustomizerState, MobileButtonId } from "../../lib/types";
import { usePillOnboardingGlow } from "./usePillOnboardingGlow";

function swapOrder(order: MobileButtonId[], a: MobileButtonId, b: MobileButtonId): MobileButtonId[] {
  const next = [...order];
  const ia = next.indexOf(a);
  const ib = next.indexOf(b);
  if (ia === -1 || ib === -1) return order;
  [next[ia], next[ib]] = [next[ib], next[ia]];
  return next;
}

export function LocationManagerPanel({
  editable,
  state,
  patch,
  useSecondary,
}: {
  editable: boolean;
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  useSecondary: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const shouldGlow = usePillOnboardingGlow("location", open);
  if (!editable) return null;

  const order = state.mobileButtonOrder?.length
    ? state.mobileButtonOrder
    : (["map-preview", "get-directions"] as MobileButtonId[]);

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

  const move = (id: MobileButtonId, dir: -1 | 1) => {
    const idx = order.indexOf(id);
    const nextIdx = idx + dir;
    if (idx === -1 || nextIdx < 0 || nextIdx >= order.length) return;
    patch({ mobileButtonOrder: swapOrder(order, id, order[nextIdx]) });
  };

  return (
    <div ref={rootRef} className="business-card-template-print-skip relative z-[120] flex justify-end px-4 pb-2 font-sans">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex min-w-40 items-center justify-center gap-2 rounded-full border border-white/25 bg-black/65 px-3 py-1.5 text-center text-xs font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/75 ${
          shouldGlow ? "business-card-pill-attention" : ""
        }`}
      >
        <MapPinned className="h-4 w-4" />
        {useSecondary ? "მდებარეობა" : "Location"}
      </button>
      {open ? (
        <div className="absolute right-4 top-full mt-2 w-[280px] rounded-xl border border-white/20 bg-black/85 p-3 text-white shadow-2xl backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-white/80">{useSecondary ? "მდებარეობის UI" : "Location UI"}</p>
            <button type="button" onClick={() => setOpen(false)} className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white" aria-label="Close location manager">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-3 border-b border-white/10 pb-2.5">
            <label className="flex cursor-pointer items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-white/90">
                {useSecondary ? "Google Maps ინტეგრაცია" : "Google Maps Integration"}
              </span>
              <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <input
                  type="checkbox"
                  checked={state.addGoogleMap}
                  onChange={(e) => patch({ addGoogleMap: e.target.checked })}
                  className="peer absolute h-full w-full opacity-0"
                />
                <span className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${state.addGoogleMap ? "translate-x-4 bg-emerald-400" : "translate-x-1"}`} />
              </div>
            </label>
          </div>

          <div className={`space-y-1.5 transition-opacity ${state.addGoogleMap ? "opacity-100" : "opacity-40"}`}>
            {order.map((id, index) => {
              const isMap = id === "map-preview";
              const checked = isMap ? state.showMapPreview : state.showGetDirectionsButton;
              const title = isMap
                ? useSecondary ? "რუკის გადახედვის ჩვენება" : "Show map preview"
                : useSecondary ? '„მიმართულების მიღება“ ღილაკის ჩვენება' : 'Show "Get Directions"';
              const inputId = `location-toggle-${id}`;
              return (
                <div
                  key={id}
                  className={`flex items-center justify-between rounded-lg border border-white/10 px-2.5 py-2 text-xs ${
                    checked && state.addGoogleMap ? "bg-white/10" : "bg-white/[0.03]"
                  }`}
                >
                  <label htmlFor={inputId} className="flex min-w-0 flex-1 cursor-pointer items-center gap-2">
                    <input
                      id={inputId}
                      type="checkbox"
                      disabled={!state.addGoogleMap}
                      checked={checked && state.addGoogleMap}
                      onChange={(e) =>
                        patch(isMap ? { showMapPreview: e.target.checked } : { showGetDirectionsButton: e.target.checked })
                      }
                      className="h-3.5 w-3.5"
                    />
                    <span className="min-w-0">{title}</span>
                  </label>
                  <div className="ml-2 flex items-center gap-1">
                    <button
                      type="button"
                      disabled={!state.addGoogleMap || index === 0}
                      onClick={() => move(id, -1)}
                      className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
                      aria-label={`Move ${title} up`}
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={!state.addGoogleMap || index === order.length - 1}
                      onClick={() => move(id, 1)}
                      className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
                      aria-label={`Move ${title} down`}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
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
