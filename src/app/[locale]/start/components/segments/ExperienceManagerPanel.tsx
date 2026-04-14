"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Waves, X } from "lucide-react";
import type { Lane1CustomizerState, Lane1StatePatch } from "../../lib/types";
import { VibePresetGrid, AnimationPresetGrid } from "../StylePresetGrids";
import { VIBE_PRESETS, ANIMATION_PRESETS } from "../../lib/presets";
import { Phase5ExperienceControls } from "../StartCustomizer/Phase5ExperienceControls";
import { usePillOnboardingGlow } from "./usePillOnboardingGlow";
import { useMediaMinMd } from "../../lib/useMediaMinMd";
import { CardEditorMobileOverlay } from "../CardEditorMobileOverlay";

/** Vibe, motion, tilt, and hover — card atmosphere (on-card, same family as Look / Type). */
export function ExperienceManagerPanel({
  editable,
  state,
  patch,
  useSecondary,
  onAnimationPreviewReplay,
}: {
  editable: boolean;
  state: Lane1CustomizerState;
  patch: (p: Lane1StatePatch) => void;
  useSecondary: boolean;
  onAnimationPreviewReplay?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [savingStatus, setSavingStatus] = useState<"idle" | "saving" | "saved">("idle");
  const shouldGlow = usePillOnboardingGlow("experience", open);
  const mdUp = useMediaMinMd();
  const titleId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const savingDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedToIdleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const replayDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onStylePatch = (p: Partial<Lane1CustomizerState["style"]>) => {
    if (savingDebounceRef.current) clearTimeout(savingDebounceRef.current);
    if (savedToIdleRef.current) clearTimeout(savedToIdleRef.current);
    setSavingStatus("saving");
    patch({ style: p });
    if ((p.animationId !== undefined || p.animationSpeed !== undefined) && onAnimationPreviewReplay) {
      if (replayDebounceRef.current) clearTimeout(replayDebounceRef.current);
      replayDebounceRef.current = setTimeout(() => onAnimationPreviewReplay(), 180);
    }
    savingDebounceRef.current = setTimeout(() => {
      setSavingStatus("saved");
      savedToIdleRef.current = setTimeout(() => setSavingStatus("idle"), 900);
    }, 260);
  };

  useEffect(() => {
    if (!open || !mdUp) return;
    const handleOutsidePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (rootRef.current?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => window.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, [open, mdUp]);

  useEffect(() => {
    return () => {
      if (savingDebounceRef.current) clearTimeout(savingDebounceRef.current);
      if (savedToIdleRef.current) clearTimeout(savedToIdleRef.current);
      if (replayDebounceRef.current) clearTimeout(replayDebounceRef.current);
    };
  }, []);

  if (!editable) return null;

  const scrollAreaClass = (variant: "desktop" | "mobile") =>
    variant === "desktop"
      ? "max-h-[min(62vh,480px)] overflow-y-auto rounded-lg bg-white/95 p-3 text-slate-900 shadow-inner"
      : "min-h-0 flex-1 overflow-y-auto rounded-lg bg-white/95 p-3 text-slate-900 shadow-inner";

  const panelSurface = (variant: "desktop" | "mobile") => (
    <>
      <div className="mb-2 flex items-center justify-between gap-2 px-1">
        <p id={titleId} className="text-xs font-bold uppercase tracking-wide text-white/80">
          {useSecondary ? "გამოცდილება" : "Experience"}
        </p>
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
            aria-label="Close experience panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className={scrollAreaClass(variant)}>
        <p className="start-caption mb-3">
          {useSecondary
            ? "ვიბე, მოძრაობა და ჰოვერი — ბარათის შეგრძნება (ღილაკების სტილისთვის გამოიყენე სტილი)."
            : "Vibe, motion, and hover — how the card feels, not button shapes (use Look for those)."}
        </p>
        <div className="[&_fieldset]:border-slate-200 [&_legend]:text-slate-700">
          <VibePresetGrid
            options={VIBE_PRESETS}
            value={state.style.vibeId}
            onChange={(id: string) => onStylePatch({ vibeId: id })}
          />
          <div className="mt-4">
            <AnimationPresetGrid
              options={ANIMATION_PRESETS}
              value={state.style.animationId}
              onChange={(id: string) => onStylePatch({ animationId: id })}
            />
          </div>
          <Phase5ExperienceControls state={state} patch={patch} onStylePatch={onStylePatch} useSecondary={useSecondary} />
        </div>
      </div>
    </>
  );

  return (
    <div ref={rootRef} className="relative z-[120] flex justify-center font-sans">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex min-w-40 items-center justify-center gap-2 rounded-full border border-white/25 bg-black/65 px-3 py-1.5 text-center text-xs font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/75 ${
          shouldGlow ? "business-card-pill-attention" : ""
        }`}
      >
        <Waves className="h-4 w-4" />
        {useSecondary ? "გამოცდილება" : "Experience"}
      </button>
      {open && mdUp ? (
        <div className="absolute bottom-full left-1/2 mb-2 w-[min(92vw,320px)] -translate-x-1/2 rounded-xl border border-white/20 bg-black/85 p-2 text-white shadow-2xl backdrop-blur-md">
          {panelSurface("desktop")}
        </div>
      ) : null}
      {open && !mdUp ? (
        <CardEditorMobileOverlay onClose={() => setOpen(false)} titleId={titleId}>
          {panelSurface("mobile")}
        </CardEditorMobileOverlay>
      ) : null}
    </div>
  );
}
