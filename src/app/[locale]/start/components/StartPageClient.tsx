"use client";

import { useEffect, useState, useCallback, useMemo, type CSSProperties } from "react";
import { MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type {
  Lane1CustomizerState,
  Lane1StatePatch,
  SectorId,
  StylePresetSelection,
} from "../lib/types";
import { defaultLane1State } from "../lib/types";
import { loadLane1State, saveLane1State } from "../lib/customizer-store";
import { buildLane1WhatsAppUrl } from "../lib/whatsapp";
import { LANE1_BASE_GEL, computeLane1Total } from "../lib/lane1-pricing";
import { getLanguagePreviewMode } from "../lib/language-profile";
import { BusinessCardTemplate } from "./BusinessCardTemplate";
import { resolveStyleVariables } from "../lib/presets";

export function StartPageClient({ locale }: { locale: Locale }) {
  const [state, setState] = useState<Lane1CustomizerState>(defaultLane1State);
  const [hydrated, setHydrated] = useState(false);
  const [previewLang, setPreviewLang] = useState<"primary" | "secondary">("primary");
  const languageMode = getLanguagePreviewMode(state);

  const total = computeLane1Total({
    profileLanguageMode: state.profileLanguageMode,
    translationMethod: state.translationMethod,
    addGoogleMap: state.addGoogleMap,
  });
  const waUrl = buildLane1WhatsAppUrl(state);
  const vars = useMemo(() => resolveStyleVariables(state.style), [state.style]);

  useEffect(() => {
    const loaded = loadLane1State();
    setState(loaded);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const t = window.setTimeout(() => saveLane1State(state), 400);
    return () => window.clearTimeout(t);
  }, [state, hydrated]);

  useEffect(() => {
    if (languageMode.fixedPreview) setPreviewLang(languageMode.fixedPreview);
  }, [languageMode.fixedPreview]);

  const homeHref = `/${locale}`;

  const onPatch = useCallback((p: Lane1StatePatch) => {
    setState((s) => {
      if (p.style) {
        const { style: stylePatch, ...rest } = p;
        return {
          ...s,
          ...rest,
          style: { ...s.style, ...stylePatch } as StylePresetSelection,
        } as Lane1CustomizerState;
      }
      return { ...s, ...p } as Lane1CustomizerState;
    });
  }, []);

  const handlePreviewLangChange = useCallback((v: "primary" | "secondary") => {
    setPreviewLang(v);
  }, []);

  return (
    <div
      className="mx-auto max-w-4xl px-4 py-10 font-sans transition-colors duration-500 md:px-6 md:py-14"
      style={
        {
          /* Card preview sets its own tokens; keep accent in sync for page CTAs. */
          "--accent": (vars as Record<string, string | number>)["--accent"],
          "--accent-secondary": (vars as Record<string, string | number>)["--accent-secondary"],
        } as CSSProperties
      }
    >
      <header className="mb-10 text-center">
        <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#64748b]">
          Genezisi
        </p>
        <h1 className="start-page-title mb-2">Customize your card</h1>
        <p className="start-body text-[#64748b]">
          Preview updates as you edit. Order via WhatsApp.
        </p>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-3 lg:hidden">
        {languageMode.canToggle ? (
          <div className="start-glass-heavy flex rounded-full p-1 text-xs font-semibold">
            <button
              type="button"
              className={`rounded-full px-3 py-2 transition-colors duration-200 ${
                previewLang === "primary"
                  ? "bg-[#1A2744] text-white"
                  : "text-[#64748b]"
              }`}
              onClick={() => setPreviewLang("primary")}
            >
              EN
            </button>
            <button
              type="button"
              className={`rounded-full px-3 py-2 transition-colors duration-200 ${
                previewLang === "secondary"
                  ? "bg-[#1A2744] text-white"
                  : "text-[#64748b]"
              }`}
              onClick={() => setPreviewLang("secondary")}
            >
              GE
            </button>
          </div>
        ) : null}
      </div>

      <div className="space-y-5">
        <div className="hidden justify-center lg:flex">
          {languageMode.canToggle ? (
            <div className="start-glass-heavy flex rounded-full p-1 text-xs font-semibold">
              <button
                type="button"
                className={`rounded-full px-3 py-2 transition-colors duration-200 ${
                  previewLang === "primary"
                    ? "bg-[#1A2744] text-white"
                    : "text-[#64748b]"
                }`}
                onClick={() => setPreviewLang("primary")}
              >
                EN
              </button>
              <button
                type="button"
                className={`rounded-full px-3 py-2 transition-colors duration-200 ${
                  previewLang === "secondary"
                    ? "bg-[#1A2744] text-white"
                    : "text-[#64748b]"
                }`}
                onClick={() => setPreviewLang("secondary")}
              >
                GE
              </button>
            </div>
          ) : null}
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[var(--start-shadow-md)]">
          {/* No motion/key here: remounting was closing bottom float panels (Typography, Background) and replaying blur on every font/color tweak. */}
          <BusinessCardTemplate
            state={state}
            previewLang={languageMode.fixedPreview ?? previewLang}
            homeHref={homeHref}
            ownerName={state.name}
            onPatch={onPatch}
            onPreviewLangChange={languageMode.canToggle ? handlePreviewLangChange : undefined}
          />
        </div>
        <div className="start-glass-heavy space-y-4 p-4 md:p-6">
          <p className="start-body text-center">
            Total:{" "}
            <span className="start-cta-price">
              {total} ₾
            </span>{" "}
            <span className="text-[#64748b]">(one-time, base {LANE1_BASE_GEL} ₾ + add-ons)</span>
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="start-wa-cta mt-2 inline-flex w-full items-center justify-center gap-2"
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
            Order on WhatsApp
          </a>
        </div>
      </div>

      <div className="business-card-template-print-skip fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-[115] -translate-x-1/2">
        <div className="start-glass-heavy flex rounded-full p-1 shadow-[var(--start-shadow-lg)]">
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem("businessCardPreview", JSON.stringify(state));
              window.open(`/${locale}/start/preview`, "_blank");
            }}
            className="min-w-[9.5rem] rounded-full border border-emerald-200/55 bg-emerald-500/55 px-25 py-2 text-center text-sm font-semibold text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_18px_rgba(16,185,129,0.28)] backdrop-blur-xl transition hover:bg-emerald-400/60 opacity-70"
          >
            Live Preview
          </button>
        </div>
      </div>
    </div>
  );
}
