"use client";

import { useEffect, useState, useCallback, useMemo, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Pencil } from "lucide-react";
import { acquireBodyScrollLock } from "@/lib/bodyScrollLock";
import type { Locale } from "@/lib/i18n";
import type { Lane1CustomizerState, SectorId } from "../lib/types";
import { defaultLane1State } from "../lib/types";
import { loadLane1State, saveLane1State } from "../lib/customizer-store";
import { getSectorPlaceholder } from "../lib/placeholders";
import { buildLane1WhatsAppUrl } from "../lib/whatsapp";
import { LANE1_BASE_GEL, computeLane1Total } from "../lib/lane1-pricing";
import { BusinessCardTemplate } from "./BusinessCardTemplate";
import { StartCustomizer } from "./StartCustomizer";
import { resolveStyleVariables } from "../lib/presets";

export function StartPageClient({ locale }: { locale: Locale }) {
  const [state, setState] = useState<Lane1CustomizerState>(defaultLane1State);
  const [hydrated, setHydrated] = useState(false);
  const [previewLang, setPreviewLang] = useState<"primary" | "secondary">("primary");
  const [mobileEditorOpen, setMobileEditorOpen] = useState(false);
  const [fabPulse, setFabPulse] = useState(true);

  const total = computeLane1Total({
    secondaryMode: state.secondaryMode,
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
    if (!mobileEditorOpen) return;
    return acquireBodyScrollLock("default");
  }, [mobileEditorOpen]);

  useEffect(() => {
    const t = window.setTimeout(() => setFabPulse(false), 2000);
    return () => window.clearTimeout(t);
  }, []);

  const homeHref = `/${locale}`;

  const onPatch = useCallback((p: Partial<Lane1CustomizerState>) => {
    setState((s) => ({ ...s, ...p }));
  }, []);

  const handlePreviewLangChange = useCallback((v: "primary" | "secondary") => {
    setPreviewLang(v);
  }, []);

  return (
    <div
      className="mx-auto max-w-6xl px-4 py-10 font-sans transition-colors duration-500 md:px-6 md:py-14"
      style={
        {
          /* Card preview sets its own tokens; keep accent in sync for sidebar links & inputs */
          "--accent": (vars as Record<string, string | number>)["--accent"],
          "--accent-secondary": (vars as Record<string, string | number>)["--accent-secondary"],
        } as CSSProperties
      }
    >
      <header className="mb-10 max-w-2xl">
        <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#64748b]">
          Genezisi
        </p>
        <h1 className="start-page-title mb-2">Customize your card</h1>
        <p className="start-body text-[#64748b]">
          Preview updates as you edit. Order via WhatsApp.
        </p>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-3 lg:hidden">
        {state.secondaryMode === "self" ? (
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

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="space-y-4">
          <div className="hidden flex-wrap items-center gap-3 lg:flex">
            {state.secondaryMode === "self" ? (
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
            <AnimatePresence mode="wait">
              <motion.div
                key={
                  state.style.backgroundId +
                  state.style.vibeId +
                  state.style.fontId +
                  state.style.bodyTypographyPackId +
                  state.style.buttonTypographyPackId +
                  state.style.bodyTextHex +
                  state.style.buttonTextHex
                }
                initial={{ opacity: 0.8, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <BusinessCardTemplate
                  state={state}
                  previewLang={
                    state.secondaryMode === "self" ? previewLang : "primary"
                  }
                  homeHref={homeHref}
                  ownerName={state.name}
                  onPatch={onPatch}
                  onPreviewLangChange={
                    state.secondaryMode === "self"
                      ? handlePreviewLangChange
                      : undefined
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden lg:block">
          <StartCustomizer
            state={state}
            setState={setState}
          />
        </div>
      </div>

      <AnimatePresence>
        {mobileEditorOpen ? (
          <motion.div
            className="fixed inset-0 z-[200] flex flex-col bg-black/40 backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileEditorOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Editor"
              className="mt-auto flex max-h-[85vh] flex-col overflow-hidden rounded-t-2xl shadow-[var(--start-shadow-xl)]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "tween",
                duration: 0.35,
                ease: [0.32, 0.72, 0, 1],
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="start-glass-heavy flex min-h-10 shrink-0 cursor-pointer touch-manipulation items-start justify-center pt-2 pb-1 outline-none"
                onClick={() => setMobileEditorOpen(false)}
                aria-label="Close editor"
              >
                <div className="h-1 w-8 rounded-full bg-[#cbd5e1]" />
              </button>
              <div className="start-glass-heavy min-h-0 flex-1 overflow-y-auto px-4 pb-3">
                <StartCustomizer
                  showOrderFooter={false}
                  state={state}
                  setState={setState}
                />
              </div>
              <div className="start-glass-heavy shrink-0 border-t border-white/30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
                <p className="start-body mb-2 text-center">
                  Total:{" "}
                  <span className="start-cta-price">{total} ₾</span>{" "}
                  <span className="text-xs font-normal text-[#64748b]">
                    (base {LANE1_BASE_GEL} ₾ + add-ons)
                  </span>
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="start-wa-cta mt-1 inline-flex w-full items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                  Order on WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!mobileEditorOpen ? (
        <button
          type="button"
          className={`start-fab-pulse fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[100] flex h-14 w-14 touch-manipulation items-center justify-center rounded-full bg-[#1A2744] text-white shadow-[var(--start-shadow-lg)] transition hover:-translate-y-0.5 hover:shadow-[var(--start-shadow-xl)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A2744] active:translate-y-0 lg:hidden ${
            fabPulse ? "animate-[startFabPulse_2s_ease-in-out_1]" : ""
          }`}
          aria-label="Open editor"
          onClick={() => setMobileEditorOpen(true)}
        >
          <span className="absolute -right-1 -top-1 min-w-[2.25rem] rounded-full bg-white px-1.5 py-0.5 text-center text-[10px] font-bold leading-tight text-[#1A2744] shadow">
            {total}ᶚ
          </span>
          <Pencil className="h-6 w-6" strokeWidth={2} aria-hidden />
        </button>
      ) : null}

      <div className="business-card-template-print-skip fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-[115] -translate-x-1/2">
        <div className="start-glass-heavy flex rounded-full p-1 shadow-[var(--start-shadow-lg)]">
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem("businessCardPreview", JSON.stringify(state));
              window.open(`/${locale}/start/preview`, "_blank");
            }}
            className="rounded-full bg-[#1A2744] px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-110"
          >
            Live Preview
          </button>
        </div>
      </div>
    </div>
  );
}
