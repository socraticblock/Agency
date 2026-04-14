"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Check, Type, X } from "lucide-react";
import type {
  BodyTypographyPackId,
  CardTextScaleId,
  Lane1CustomizerState,
  Lane1StatePatch,
  TypographyPackId,
} from "../../lib/types";
import { FontPresetGrid } from "../StylePresetGrids";
import {
  BODY_TYPOGRAPHY_TO_LEGACY_FONT,
  resolveBodyTypographyPack,
  TYPOGRAPHY_PACK_PRESETS,
  TYPOGRAPHY_TO_LEGACY_FONT,
} from "../../lib/presets";
import { BodyTypographyPresetGrid } from "./BodyTypographyPresetGrid";
import { CardTextScaleRow } from "./CardTextScaleRow";
import { TypographyHexColorRow } from "./TypographyHexColorRow";
import { usePillOnboardingGlow } from "./usePillOnboardingGlow";
import { useMediaMinMd } from "../../lib/useMediaMinMd";
import { CardEditorMobileOverlay } from "../CardEditorMobileOverlay";

type TypoTab = "body" | "display" | "buttons";

export function TypographyManagerPanel({
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
  const [tab, setTab] = useState<TypoTab>("body");
  const [savingStatus, setSavingStatus] = useState<"idle" | "saving" | "saved">("idle");
  const shouldGlow = usePillOnboardingGlow("type", open);
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
    if (p.buttonTypographyPackId) {
      merged.typographyPackId = p.buttonTypographyPackId;
    }
    if (p.bodyTypographyPackId) {
      merged.fontId = BODY_TYPOGRAPHY_TO_LEGACY_FONT[p.bodyTypographyPackId];
    } else if (p.buttonTypographyPackId) {
      merged.fontId = TYPOGRAPHY_TO_LEGACY_FONT[p.buttonTypographyPackId];
    }
    /* ctaTypographyPackId: isolated — do not sync typographyPackId / legacy fontId */
    patch({ style: merged });
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
    };
  }, []);

  if (!editable) return null;

  const {
    bodyTypographyPackId,
    buttonTypographyPackId,
    ctaTypographyPackId,
    bodyTextHex,
    buttonTextHex,
    ctaTextHex,
    cardTextScaleId,
  } = state.style;

  const bodyResolved = resolveBodyTypographyPack(state.style);
  const bodyCaptionPreviewStyle: CSSProperties = {
    fontFamily: bodyResolved.fontBody,
    fontWeight: bodyResolved.bodyWeight,
    lineHeight: bodyResolved.bodyLineHeight,
    letterSpacing: bodyResolved.letterSpacing,
  };

  const tabBtn = (id: TypoTab, label: string) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide transition ${
        tab === id ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  const scrollAreaClass = (variant: "desktop" | "mobile") =>
    variant === "desktop"
      ? "max-h-[min(55vh,380px)] overflow-y-auto rounded-lg bg-white/95 p-3 text-slate-900 shadow-inner"
      : "min-h-0 flex-1 overflow-y-auto rounded-lg bg-white/95 p-3 text-slate-900 shadow-inner";

  const panelSurface = (variant: "desktop" | "mobile") => (
    <>
      <div className="mb-2 flex items-center justify-between gap-2 px-1">
        <p id={titleId} className="text-xs font-bold uppercase tracking-wide text-white/80">
          {useSecondary ? "ტიპოგრაფია" : "Type"}
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
            aria-label="Close type panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <CardTextScaleRow
        value={cardTextScaleId}
        onChange={(id: CardTextScaleId) => onStylePatch({ cardTextScaleId: id })}
        useSecondary={useSecondary}
      />
      <div className="mb-2 flex flex-wrap justify-center gap-1 rounded-full border border-white/15 bg-white/5 p-1">
        {tabBtn("body", useSecondary ? "სხეული" : "Body")}
        {tabBtn("display", useSecondary ? "ჩვენება" : "Display")}
        {tabBtn("buttons", useSecondary ? "ღილაკები" : "Buttons")}
      </div>
      <div className={scrollAreaClass(variant)}>
        {tab === "body" ? (
          <div className="[&_fieldset]:border-slate-200 [&_legend]:text-slate-700">
            <p className="start-caption mb-3" style={bodyCaptionPreviewStyle}>
              {useSecondary ? "აბზაცები და ძირითადი ტექსტი." : "Paragraphs and body copy."}
            </p>
            <BodyTypographyPresetGrid
              value={bodyTypographyPackId}
              onChange={(id: BodyTypographyPackId) => onStylePatch({ bodyTypographyPackId: id })}
              useSecondary={useSecondary}
            />
            <div className="mt-3">
              <TypographyHexColorRow
                label={useSecondary ? "ტექსტის ფერი (hex)" : "Text color (hex)"}
                value={bodyTextHex ?? ""}
                onChange={(v) => onStylePatch({ bodyTextHex: v })}
                useSecondary={useSecondary}
              />
            </div>
          </div>
        ) : null}
        {tab === "display" ? (
          <div className="[&_fieldset]:border-slate-200 [&_legend]:text-slate-700">
            <p className="start-caption mb-3">
              {useSecondary ? "სახელი, თანამდებობა და სექციების სათაურები." : "Your name, job title, and section headings."}
            </p>
            <FontPresetGrid
              options={TYPOGRAPHY_PACK_PRESETS}
              value={buttonTypographyPackId}
              preview="heading"
              legend={useSecondary ? "ჩვენების ფონტი" : "Display font"}
              groupAriaLabel={useSecondary ? "ჩვენების სათაურის ფონტი" : "Display heading font"}
              onChange={(id: string) =>
                onStylePatch({ buttonTypographyPackId: id as TypographyPackId })
              }
            />
            <div className="mt-3">
              <TypographyHexColorRow
                label={useSecondary ? "ტექსტის ფერი (hex)" : "Text color (hex)"}
                value={buttonTextHex ?? ""}
                onChange={(v) => onStylePatch({ buttonTextHex: v })}
                useSecondary={useSecondary}
              />
            </div>
          </div>
        ) : null}
        {tab === "buttons" ? (
          <div className="[&_fieldset]:border-slate-200 [&_legend]:text-slate-700">
            <p className="start-caption mb-3">
              {useSecondary
                ? "Call, WhatsApp, Share, Directions და Booking ღილაკების ტექსტი — არა სათაურები."
                : "Text on Call, WhatsApp, Share, directions, and booking — not headings."}
            </p>
            <FontPresetGrid
              options={TYPOGRAPHY_PACK_PRESETS}
              value={ctaTypographyPackId}
              preview="heading"
              legend={useSecondary ? "ღილაკების ტექსტი" : "Button labels"}
              groupAriaLabel={useSecondary ? "ღილაკის ფონტი" : "Button label font"}
              onChange={(id: string) =>
                onStylePatch({ ctaTypographyPackId: id as TypographyPackId })
              }
            />
            <div className="mt-3">
              <TypographyHexColorRow
                label={useSecondary ? "ტექსტის ფერი (hex)" : "Text color (hex)"}
                value={ctaTextHex ?? ""}
                onChange={(v) => onStylePatch({ ctaTextHex: v })}
                useSecondary={useSecondary}
              />
            </div>
          </div>
        ) : null}
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
        <Type className="h-4 w-4" />
        {useSecondary ? "ტიპოგრაფია" : "Type"}
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
