"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Share2, X } from "lucide-react";
import type {
  Lane1CustomizerState,
  SocialIconColorMode,
  SocialIconSize,
  SocialIconStyle,
  SocialPlatformId,
} from "../../lib/types";
import { SocialManagerRow } from "./SocialManagerRow";
import { SocialSelect } from "./SocialSelect";

function swapInOrder(order: SocialPlatformId[], a: SocialPlatformId, b: SocialPlatformId): SocialPlatformId[] {
  const next = [...order];
  const ia = next.indexOf(a);
  const ib = next.indexOf(b);
  if (ia === -1 || ib === -1) return order;
  [next[ia], next[ib]] = [next[ib], next[ia]];
  return next;
}

export function SocialManagerPanel({
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
  const [savingStatus, setSavingStatus] = useState<"idle" | "saving" | "saved">("idle");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const savingDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedToIdleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  if (!editable) return null;

  const orderedActive = state.socialPlatformOrder.filter((id) => state.activeSocialPlatforms.includes(id));

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

  const toggle = (id: SocialPlatformId) => {
    if (state.activeSocialPlatforms.includes(id)) {
      const nextActive = state.activeSocialPlatforms.filter((x) => x !== id);
      const orderWithout = state.socialPlatformOrder.filter((x) => x !== id);
      const nextOrder = [...orderWithout, id];
      runPatchedUpdate(
        { activeSocialPlatforms: nextActive, socialPlatformOrder: nextOrder },
        true,
      );
      return;
    }
    const nextActive = [...state.activeSocialPlatforms, id];
    const orderWithout = state.socialPlatformOrder.filter((x) => x !== id);
    const activeCountBeforeInsert = orderWithout.filter((x) =>
      state.activeSocialPlatforms.includes(x),
    ).length;
    const nextOrder = [
      ...orderWithout.slice(0, activeCountBeforeInsert),
      id,
      ...orderWithout.slice(activeCountBeforeInsert),
    ];
    runPatchedUpdate(
      { activeSocialPlatforms: nextActive, socialPlatformOrder: nextOrder },
      true,
    );
  };

  const move = (id: SocialPlatformId, dir: -1 | 1) => {
    const idx = orderedActive.indexOf(id);
    const nextIdx = idx + dir;
    if (idx === -1 || nextIdx < 0 || nextIdx >= orderedActive.length) return;
    const other = orderedActive[nextIdx];
    const nextOrder = swapInOrder(state.socialPlatformOrder, id, other);
    const changed = nextOrder.some((value, index) => value !== state.socialPlatformOrder[index]);
    runPatchedUpdate({ socialPlatformOrder: nextOrder }, changed);
  };


  return (
    <div ref={rootRef} className="business-card-template-print-skip relative z-[120] flex justify-end px-4 pb-2 font-sans">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/75"
      >
        <Share2 className="h-4 w-4" />
        {useSecondary ? "სოციალური" : "Social"}
      </button>
      {open ? (
        <div className="absolute bottom-full right-4 mb-2 w-[300px] rounded-xl border border-white/20 bg-black/85 p-3 text-white shadow-2xl backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-white/80">{useSecondary ? "სოციალური განლაგება" : "Social layout"}</p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-white/70">
                {savingStatus === "saving" ? <span className="animate-pulse">{useSecondary ? "ინახება..." : "Saving..."}</span> : null}
                {savingStatus === "saved" ? <><Check className="h-3 w-3 text-emerald-300" /><span className="text-emerald-200">{useSecondary ? "შენახულია" : "Saved"}</span></> : null}
              </span>
              <button type="button" onClick={() => setOpen(false)} className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white" aria-label="Close social manager">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            {state.socialPlatformOrder.map((id) => {
              const on = state.activeSocialPlatforms.includes(id);
              const activeIndex = orderedActive.indexOf(id);
              const canMoveUp = on && activeIndex > 0;
              const canMoveDown = on && activeIndex !== -1 && activeIndex < orderedActive.length - 1;
              return (
                <SocialManagerRow
                  key={id}
                  id={id}
                  checked={on}
                  canMoveUp={canMoveUp}
                  canMoveDown={canMoveDown}
                  value={state.social[id]}
                  onToggle={() => toggle(id)}
                  onMove={(dir) => move(id, dir)}
                  onChangeUrl={(platformId, value) =>
                    patch({ social: { ...state.social, [platformId]: value } })
                  }
                  useSecondary={useSecondary}
                />
              );
            })}
          </div>

          <div className="mt-3 border-t border-white/10 pt-2 text-xs">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/60">
              {useSecondary ? "ხატის პარამეტრები" : "Social icon UI"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <SocialSelect
                value={state.socialIconStyle}
                onChange={(next) => patch({ socialIconStyle: next as SocialIconStyle })}
                options={[
                  { value: "filled", label: useSecondary ? "შევსებული" : "Filled" },
                  { value: "outlined", label: useSecondary ? "შემოხაზული" : "Outlined" },
                  { value: "rounded", label: useSecondary ? "მომრგვალებული" : "Rounded" },
                  { value: "minimal", label: useSecondary ? "მინიმალური" : "Minimal" },
                ]}
              />
              <SocialSelect
                value={state.socialIconSize}
                onChange={(next) => patch({ socialIconSize: next as SocialIconSize })}
                options={[
                  { value: "small", label: useSecondary ? "პატარა" : "Small" },
                  { value: "medium", label: useSecondary ? "საშუალო" : "Medium" },
                  { value: "large", label: useSecondary ? "დიდი" : "Large" },
                ]}
              />
              <SocialSelect
                value={state.socialIconColorMode}
                onChange={(next) => patch({ socialIconColorMode: next as SocialIconColorMode })}
                options={[
                  { value: "accent", label: useSecondary ? "აქცენტი" : "Accent" },
                  { value: "text", label: useSecondary ? "ძირითადი ტექსტი" : "Body text" },
                  { value: "custom", label: useSecondary ? "მორგებული" : "Custom" },
                ]}
              />
              <label className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-2 py-1.5">
                <input type="checkbox" checked={state.showSocialLabels} onChange={(e) => patch({ showSocialLabels: e.target.checked })} />
                <span>{useSecondary ? "ეტიკეტები" : "Labels"}</span>
              </label>
            </div>
            {state.socialIconColorMode === "custom" ? (
              <div className="mt-2 grid grid-cols-[40px_1fr] gap-2">
                <input
                  type="color"
                  value={state.socialIconCustomHex}
                  onChange={(e) => patch({ socialIconCustomHex: e.target.value })}
                  className="h-8 w-10 cursor-pointer rounded border border-white/20 bg-white/10 p-0.5"
                  aria-label="Social icon custom color"
                />
                <input
                  type="text"
                  value={state.socialIconCustomHex}
                  onChange={(e) => patch({ socialIconCustomHex: e.target.value })}
                  placeholder="#C5A55A"
                  className="h-8 rounded-md border border-white/20 bg-white/10 px-2 py-1.5 text-xs text-white placeholder:text-white/35 focus:outline-none focus:ring-1 focus:ring-white/30"
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
