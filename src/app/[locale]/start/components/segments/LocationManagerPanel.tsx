"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, MapPinned, X } from "lucide-react";
import type { Lane1CustomizerState, MobileButtonId } from "../../lib/types";

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
    <div ref={rootRef} className="business-card-template-print-skip relative z-[120] flex justify-end px-4 pb-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/75"
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
          {order.map((id, index) => {
            const isMap = id === "map-preview";
            const checked = isMap ? state.showMapPreview : state.showGetDirectionsButton;
            const title = isMap
              ? useSecondary ? "რუკის გადახედვის ჩვენება" : "Show map preview"
              : useSecondary ? '„მიმართულების მიღება“ ღილაკის ჩვენება' : 'Show "Get Directions"';
            return (
              <div key={id} className={`flex items-center justify-between rounded-md border border-white/20 bg-white/10 px-2 py-1.5 ${index === 0 ? "mb-1.5" : ""}`}>
                <span className="text-xs">{title}</span>
                <div className="flex items-center gap-1">
                  <button type="button" disabled={index === 0} onClick={() => move(id, -1)} className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30" aria-label={`Move ${title} up`}>
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" disabled={index === order.length - 1} onClick={() => move(id, 1)} className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30" aria-label={`Move ${title} down`}>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <input
                    type="checkbox"
                    disabled={!state.addGoogleMap}
                    checked={checked}
                    onChange={(e) =>
                      patch(isMap ? { showMapPreview: e.target.checked } : { showGetDirectionsButton: e.target.checked })
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
