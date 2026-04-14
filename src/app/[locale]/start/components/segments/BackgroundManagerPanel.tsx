"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Layers2, X } from "lucide-react";
import type { BottomPillPanelProps } from "../../lib/bottom-card-pill";
import type { Lane1CustomizerState, Lane1StatePatch } from "../../lib/types";
import { BackgroundBaseControls, BackgroundOverlayControls } from "../StylePresetGrids";
import { TextureEffectControls } from "../StartCustomizer/TextureEffectControls";
import { BackgroundMotionControls } from "./BackgroundMotionControls";
import { usePillOnboardingGlow } from "./usePillOnboardingGlow";
import { useMediaMinMd } from "../../lib/useMediaMinMd";
import { CardEditorMobileOverlay } from "../CardEditorMobileOverlay";
import { PillSectionAccordion } from "../PillSectionAccordion";

type BgTab = "base" | "overlay" | "texture" | "motion";

export function BackgroundManagerPanel({
  editable,
  state,
  patch,
  useSecondary,
  isOpen,
  onToggle,
  onClose,
}: {
  editable: boolean;
  state: Lane1CustomizerState;
  patch: (p: Lane1StatePatch) => void;
  useSecondary: boolean;
} & BottomPillPanelProps) {
  const [tab, setTab] = useState<BgTab>("base");
  const [savingStatus, setSavingStatus] = useState<"idle" | "saving" | "saved">("idle");
  const shouldGlow = usePillOnboardingGlow("background", isOpen);
  const mdUp = useMediaMinMd();
  const titleId = useId();
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
    if (!isOpen || !mdUp) return;
    const handleOutsidePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (rootRef.current?.contains(target)) return;
      onClose();
    };
    window.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => window.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, [isOpen, mdUp, onClose]);

  useEffect(() => {
    return () => {
      if (savingDebounceRef.current) clearTimeout(savingDebounceRef.current);
      if (savedToIdleRef.current) clearTimeout(savedToIdleRef.current);
    };
  }, []);

  if (!editable) return null;

  const scrollAreaClass = (variant: "desktop" | "mobile") =>
    variant === "desktop"
      ? "max-h-[min(55vh,380px)] overflow-y-auto rounded-lg bg-white/95 p-3 text-slate-900 shadow-inner"
      : "min-h-0 flex-1 overflow-y-auto rounded-lg bg-white/95 p-3 text-slate-900 shadow-inner";

  const panelSurface = (variant: "desktop" | "mobile") => (
    <>
      <div className="mb-2 flex items-center justify-between gap-2 px-1">
        <p id={titleId} className="text-xs font-bold uppercase tracking-wide text-white/80">
          {useSecondary ? "ფონი" : "Background"}
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
            onClick={onClose}
            className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Close background panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <PillSectionAccordion
        openId={tab}
        onOpenChange={(id) => setTab(id as BgTab)}
        sections={
          useSecondary
            ? [
                { id: "base", label: "ბაზა" },
                { id: "overlay", label: "გადაფარვა" },
                { id: "texture", label: "ტექსტურა" },
                { id: "motion", label: "მოძრაობა" },
              ]
            : [
                { id: "base", label: "Base" },
                { id: "overlay", label: "Overlay" },
                { id: "texture", label: "Texture" },
                { id: "motion", label: "Motion" },
              ]
        }
      />
      <div className={scrollAreaClass(variant)}>
        {tab === "base" ? (
          <>
            <BackgroundBaseControls state={state} onPatch={onStylePatch} useSecondary={useSecondary} />
          </>
        ) : null}
        {tab === "overlay" ? <BackgroundOverlayControls state={state} onPatch={onStylePatch} useSecondary={useSecondary} /> : null}
        {tab === "texture" ? (
          <div className="[&_fieldset]:border-slate-200 [&_legend]:text-slate-700">
            <TextureEffectControls state={state} onPatch={onStylePatch} useSecondary={useSecondary} />
          </div>
        ) : null}
        {tab === "motion" ? (
          <div className="[&_fieldset]:border-slate-200 [&_legend]:text-slate-700">
            <BackgroundMotionControls state={state} onPatch={onStylePatch} useSecondary={useSecondary} />
          </div>
        ) : null}
      </div>
    </>
  );

  return (
    <div ref={rootRef} className="relative z-[120] flex justify-center font-sans">
      <button
        type="button"
        onClick={onToggle}
        className={`inline-flex min-w-40 items-center justify-center gap-2 rounded-full border border-white/25 bg-black/65 px-3 py-1.5 text-center text-xs font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/75 ${
          shouldGlow ? "business-card-pill-attention" : ""
        }`}
      >
        <Layers2 className="h-4 w-4" />
        {useSecondary ? "ფონი" : "Background"}
      </button>
      {isOpen && mdUp ? (
        <div className="absolute bottom-full left-1/2 mb-2 w-[min(92vw,320px)] -translate-x-1/2 rounded-xl border border-white/20 bg-black/85 p-2 text-white shadow-2xl backdrop-blur-md">
          {panelSurface("desktop")}
        </div>
      ) : null}
      {isOpen && !mdUp ? (
        <CardEditorMobileOverlay onClose={onClose} titleId={titleId}>
          {panelSurface("mobile")}
        </CardEditorMobileOverlay>
      ) : null}
    </div>
  );
}
