"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Sparkles, X } from "lucide-react";
import type { BottomPillPanelProps } from "../../lib/bottom-card-pill";
import type { ButtonStyleId, Lane1CustomizerState, Lane1StatePatch } from "../../lib/types";
import { ButtonStyleGrid } from "../StylePresetGrids";
import { ACCENT_PRESETS, BUTTON_STYLE_PRESETS } from "../../lib/presets";
import { TypographyHexColorRow } from "./TypographyHexColorRow";
import { usePillOnboardingGlow } from "./usePillOnboardingGlow";
import { useMediaMinMd } from "../../lib/useMediaMinMd";
import { CardEditorMobileOverlay } from "../CardEditorMobileOverlay";

/** Accent + action-button chrome — one surface (“how actions look”). */
export function LookManagerPanel({
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
  const [savingStatus, setSavingStatus] = useState<"idle" | "saving" | "saved">("idle");
  const shouldGlow = usePillOnboardingGlow("look", isOpen);
  const mdUp = useMediaMinMd();
  const titleId = useId();
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

  const presetAccentHex =
    ACCENT_PRESETS.find((p) => p.id === state.style.accentId)?.accent ??
    ACCENT_PRESETS.find((p) => p.id === "indigo")!.accent;
  const accentPickerValue =
    state.style.accentId === "custom" && (state.style.accentCustomPrimary ?? "").trim()
      ? (state.style.accentCustomPrimary ?? "").trim()
      : presetAccentHex;

  const onAccentColorChange = (v: string) => {
    const t = v.trim();
    if (!t) {
      onStylePatch({ accentId: "indigo", accentCustomPrimary: "", secondaryAccentId: "indigo" });
      return;
    }
    const match = ACCENT_PRESETS.find((p) => p.accent.toLowerCase() === t.toLowerCase());
    if (match) {
      onStylePatch({ accentId: match.id, accentCustomPrimary: "", secondaryAccentId: match.id });
      return;
    }
    if (/^#[0-9A-Fa-f]{6}$/i.test(t)) {
      onStylePatch({ accentId: "custom", accentCustomPrimary: t, secondaryAccentId: "custom" });
    }
  };

  const scrollAreaClass = (variant: "desktop" | "mobile") =>
    variant === "desktop"
      ? "max-h-[min(58vh,420px)] overflow-y-auto rounded-lg bg-white/95 p-3 text-slate-900 shadow-inner"
      : "min-h-0 flex-1 overflow-y-auto rounded-lg bg-white/95 p-3 text-slate-900 shadow-inner";

  const panelSurface = (variant: "desktop" | "mobile") => (
    <>
      <div className="mb-2 flex items-center justify-between gap-2 px-1">
        <p id={titleId} className="text-xs font-bold uppercase tracking-wide text-white/80">
          {useSecondary ? "აქცენტი და ღილაკები" : "Brand &amp; actions"}
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
            aria-label="Close look panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className={scrollAreaClass(variant)}>
        <div className="[&_fieldset]:border-slate-200 [&_legend]:text-slate-700">
          <p className="start-caption mb-3">
            {useSecondary
              ? "აქცენტი მართავს შევსებულ ღილაკებს და მონიშვნებს."
              : "Accent drives filled buttons and highlights; borders and gradients use the paired tone from the same preset."}
          </p>
          <TypographyHexColorRow
            label={useSecondary ? "აქცენტის ფერი" : "Accent color"}
            value={accentPickerValue}
            onChange={onAccentColorChange}
            useSecondary={useSecondary}
          />
          <p className="start-caption mt-2">
            {useSecondary
              ? "ზუსტი ფერი პრესეტზე გადართავს; სხვა hex ინახება როგორც მორგებული."
              : "Matching a preset swatch switches to that preset; any other hex is saved as a custom accent."}
          </p>
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
        <Sparkles className="h-4 w-4" />
        {useSecondary ? "სტილი" : "Look"}
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
