"use client";

import { useEffect, useRef, useState } from "react";
import { UserRound } from "lucide-react";
import { ELITE_THEME_PRESETS } from "../../lib/elite-themes";
import { LEGACY_DISPLAY_TO_BODY_PACK, TYPOGRAPHY_TO_LEGACY_FONT } from "../../lib/presets";
import type { Lane1CustomizerState, Lane1StatePatch, StylePresetSelection, TypographyPackId } from "../../lib/types";
import { usePillOnboardingGlow } from "./usePillOnboardingGlow";

type Props = {
  editable: boolean;
  state: Lane1CustomizerState;
  patch: (p: Lane1StatePatch) => void;
};

const LEGACY_SAMPLE_VALUES = new Set([
  "Company Name",
  "Your Name",
  "Job title",
  "Your tagline here",
  "+995 5XX XX XX XX",
  "your@email.com",
  "123 Professional Ave, Tbilisi",
]);

function mergeThemeStyle(prev: StylePresetSelection, patch: Partial<StylePresetSelection>): StylePresetSelection {
  const next = { ...prev, ...patch };
  if (patch.accentId != null) {
    next.secondaryAccentId = patch.accentId;
  }
  if (patch.typographyPackId) {
    const pack = patch.typographyPackId as TypographyPackId;
    next.fontId = TYPOGRAPHY_TO_LEGACY_FONT[pack];
    next.buttonTypographyPackId = pack;
    next.ctaTypographyPackId = pack;
    next.bodyTypographyPackId = LEGACY_DISPLAY_TO_BODY_PACK[pack];
  }
  return next;
}

export function ProfileSetupManagerPanel({ editable, state, patch, useSecondary }: Props & { useSecondary: boolean }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const autoOpenedRef = useRef(false);
  const shouldGlow = usePillOnboardingGlow("profile-setup-v2", open);

  useEffect(() => {
    if (!editable || state.profileSetupCompleted || autoOpenedRef.current) return;
    autoOpenedRef.current = true;
    setOpen(true);
    patch({ profileSetupCompleted: true });
  }, [editable, patch, state.profileSetupCompleted]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]);

  if (!editable) return null;

  const displayValue = (value: string) => (LEGACY_SAMPLE_VALUES.has(value.trim()) ? "" : value);
  const selectAllOnFocus = (e: React.FocusEvent<HTMLInputElement>) => e.currentTarget.select();

  const setLangMode = (mode: Lane1CustomizerState["profileLanguageMode"]) => {
    if (mode === "both") {
      patch({
        profileLanguageMode: "both",
        translationMethod: state.translationMethod === "none" ? "self" : state.translationMethod,
        secondaryMode: state.translationMethod === "professional" ? "pro" : "self",
      });
      return;
    }
    patch({
      profileLanguageMode: mode,
      translationMethod: "none",
      secondaryMode: "none",
    });
  };

  const setTranslationMethod = (method: Lane1CustomizerState["translationMethod"]) => {
    patch({
      translationMethod: method,
      secondaryMode: method === "self" ? "self" : method === "professional" ? "pro" : "none",
      proTranslationAcknowledged: method === "professional",
    });
  };

  const applyThemePreset = (id: string) => {
    const selected = ELITE_THEME_PRESETS.find((theme) => theme.id === id);
    if (!selected) return;
    patch({ style: mergeThemeStyle(state.style, selected.stylePatch) });
  };

  return (
    <div ref={rootRef} className="business-card-template-print-skip pointer-events-none absolute inset-x-0 top-0 z-40 flex justify-center px-3 font-sans">
      <div className="pointer-events-auto w-full max-w-[min(96%,620px)]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`mx-auto flex min-h-10 w-40 items-center justify-center gap-2 rounded-full border border-white/25 bg-black/65 px-3 py-1.5 text-center text-xs font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/75 ${
            shouldGlow ? "business-card-pill-attention" : ""
          }`}
        >
          <UserRound className="h-3.5 w-3.5" />
          <span className="text-center">{useSecondary ? "პროფილის დაყენება" : "Profile setup"}</span>
        </button>
        {open ? (
          <div className="mt-2 rounded-2xl border border-white/20 bg-black/75 p-3 text-white shadow-2xl backdrop-blur-md">
            <div className="grid gap-2 md:grid-cols-2">
              <input className="rounded-lg bg-white/10 px-2 py-1.5 text-sm" value={displayValue(state.company)} placeholder={useSecondary ? "კომპანიის სახელი" : "Company Name"} onFocus={selectAllOnFocus} onChange={(e) => patch({ company: e.target.value })} />
              <input className="rounded-lg bg-white/10 px-2 py-1.5 text-sm" value={displayValue(state.name)} placeholder={useSecondary ? "შენი სახელი" : "Your Name"} onFocus={selectAllOnFocus} onChange={(e) => patch({ name: e.target.value })} />
              <input className="rounded-lg bg-white/10 px-2 py-1.5 text-sm" value={displayValue(state.title)} placeholder={useSecondary ? "სამუშაოს დასახელება" : "Job title"} onFocus={selectAllOnFocus} onChange={(e) => patch({ title: e.target.value })} />
              <input className="rounded-lg bg-white/10 px-2 py-1.5 text-sm" value={displayValue(state.tagline)} placeholder={useSecondary ? "თქვენი სლოგანი აქ" : "Your tagline here"} onFocus={selectAllOnFocus} onChange={(e) => patch({ tagline: e.target.value })} />
              <input className="rounded-lg bg-white/10 px-2 py-1.5 text-sm" value={displayValue(state.phone)} placeholder="+995 5XX XX XX XX" onFocus={selectAllOnFocus} onChange={(e) => patch({ phone: e.target.value })} />
              <input className="rounded-lg bg-white/10 px-2 py-1.5 text-sm" value={displayValue(state.email)} placeholder="your@email.com" onFocus={selectAllOnFocus} onChange={(e) => patch({ email: e.target.value })} />
            </div>
            <input className="mt-2 w-full rounded-lg bg-white/10 px-2 py-1.5 text-sm" value={displayValue(state.address)} placeholder={useSecondary ? "მისამართი" : "Address"} onFocus={selectAllOnFocus} onChange={(e) => patch({ address: e.target.value })} />

            <p className="mt-2 text-[11px] text-white/70">{useSecondary ? "ეს ინფორმაცია გამოიყენება მხოლოდ თქვენი ბარათის შინაარსის შესავსებად." : "This information is used only to fill your card content."}</p>
            <div className="mt-3">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-white/80">{useSecondary ? "ენა" : "Language"}</p>
              <div className="flex flex-wrap gap-2">
                {[
                  ["en_only", useSecondary ? "მხოლოდ ინგლისური" : "Only English"],
                  ["ka_only", useSecondary ? "მხოლოდ ქართული" : "Only Georgian"],
                  ["both", useSecondary ? "ორივე ენა" : "Both languages"],
                ].map(([id, label]) => (
                  <button key={id} type="button" onClick={() => setLangMode(id as Lane1CustomizerState["profileLanguageMode"])} className={`rounded-full px-3 py-1 text-xs ${state.profileLanguageMode === id ? "bg-white text-slate-900" : "bg-white/10 text-white"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {state.profileLanguageMode === "both" ? (
              <div className="mt-2 space-y-2">
                <div className="flex gap-2">
                  <button type="button" onClick={() => setTranslationMethod("self")} className={`rounded-full px-3 py-1 text-xs ${state.translationMethod === "self" ? "bg-white text-slate-900" : "bg-white/10 text-white"}`}>{useSecondary ? "თვითთარგმნა" : "Self-translate"}</button>
                  <button type="button" onClick={() => setTranslationMethod("professional")} className={`rounded-full px-3 py-1 text-xs ${state.translationMethod === "professional" ? "bg-white text-slate-900" : "bg-white/10 text-white"}`}>{useSecondary ? "პროფესიონალი (+150 ₾)" : "Professional (+150 ₾)"}</button>
                </div>
                {state.translationMethod === "self" ? (
                  <p className="text-[11px] text-white/70">
                    {useSecondary
                      ? "ენის გადართვა შეგიძლიათ ბარათის ზედა ნაწილში."
                      : "You can switch languages from the top of the card."}
                  </p>
                ) : null}
                {state.translationMethod === "professional" ? (
                  <div className="flex gap-2">
                    <button type="button" onClick={() => patch({ translationSourceLang: "en" })} className={`rounded-full px-3 py-1 text-xs ${state.translationSourceLang === "en" ? "bg-white text-slate-900" : "bg-white/10 text-white"}`}>EN to KA</button>
                    <button type="button" onClick={() => patch({ translationSourceLang: "ka" })} className={`rounded-full px-3 py-1 text-xs ${state.translationSourceLang === "ka" ? "bg-white text-slate-900" : "bg-white/10 text-white"}`}>KA to EN</button>
                  </div>
                ) : null}
              </div>
            ) : null}
            <div className="mt-3">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-white/80">{useSecondary ? "სწრაფი თემები" : "Quick themes"}</p>
              <div className="grid grid-cols-2 gap-2">
                {ELITE_THEME_PRESETS.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => applyThemePreset(theme.id)}
                    className="rounded-full bg-white/10 px-3 py-1 text-left text-xs text-white transition hover:bg-white/20"
                  >
                    {theme.labelEn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
