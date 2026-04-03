"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { acquireBodyScrollLock } from "@/lib/bodyScrollLock";
import type { Locale } from "@/lib/i18n";
import type { Lane1CustomizerState, SectorId } from "../lib/types";
import { defaultLane1State } from "../lib/types";
import { loadLane1State, saveLane1State } from "../lib/customizer-store";
import { getSectorPlaceholder } from "../lib/placeholders";
import { BusinessCardTemplate } from "./BusinessCardTemplate";
import { SectorGrid } from "./SectorGrid";
import { StartCustomizer } from "./StartCustomizer";

function mergeSectorPlaceholder(
  base: Lane1CustomizerState,
  sectorId: SectorId,
): Lane1CustomizerState {
  const p = getSectorPlaceholder(sectorId);
  return {
    ...base,
    sectorId,
    name: p.name,
    title: p.title,
    phone: p.phone,
    email: p.email,
    address: p.address,
    hours: p.hours,
    practiceHeading: p.practiceHeading,
    serviceAreas: [...p.serviceAreas] as [string, string, string, string],
    serviceCount: p.serviceCount,
  };
}

export function StartPageClient({ locale }: { locale: Locale }) {
  const [state, setState] = useState<Lane1CustomizerState>(defaultLane1State);
  const [hydrated, setHydrated] = useState(false);
  const [phase, setPhase] = useState<"pick" | "customize">("pick");
  const [previewLang, setPreviewLang] = useState<"primary" | "secondary">("primary");
  const [mobileEditorOpen, setMobileEditorOpen] = useState(false);

  useEffect(() => {
    const loaded = loadLane1State();
    setState({ ...loaded, primaryLang: "en" });
    if (loaded.sectorId) setPhase("customize");
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

  const homeHref = `/${locale}`;

  function onSector(id: SectorId) {
    setState((s) => mergeSectorPlaceholder(s, id));
    setPhase("customize");
    setPreviewLang("primary");
  }

  function onBackToSectors() {
    setPhase("pick");
    setMobileEditorOpen(false);
  }

  const title = "Digital business card — start here";

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-amber-950">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <header className="mb-10 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800/70">
            Genezisi
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-amber-950 md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-amber-900/80 md:text-base">
            Pick a sector, fill in your details (any language), and see a live preview. Order via
            WhatsApp.
          </p>
        </header>

        {phase === "pick" ? (
          <SectorGrid onSelect={onSector} />
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center gap-3 lg:hidden">
              {state.secondaryMode === "self" ? (
                <div className="flex rounded-full border border-amber-900/20 bg-white/80 p-1 text-xs font-semibold">
                  <button
                    type="button"
                    className={`rounded-full px-3 py-1 ${
                      previewLang === "primary"
                        ? "bg-amber-800 text-white"
                        : "text-amber-900/70"
                    }`}
                    onClick={() => setPreviewLang("primary")}
                  >
                    Primary
                  </button>
                  <button
                    type="button"
                    className={`rounded-full px-3 py-1 ${
                      previewLang === "secondary"
                        ? "bg-amber-800 text-white"
                        : "text-amber-900/70"
                    }`}
                    onClick={() => setPreviewLang("secondary")}
                  >
                    2nd
                  </button>
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => setMobileEditorOpen(true)}
                className="ml-auto min-h-[44px] rounded-full bg-amber-900 px-5 py-2 text-sm font-bold text-amber-50"
              >
                Edit
              </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
              <div className="space-y-4">
                <div className="hidden flex-wrap items-center gap-3 lg:flex">
                  {state.secondaryMode === "self" ? (
                    <div className="flex rounded-full border border-amber-900/20 bg-white/80 p-1 text-xs font-semibold">
                      <button
                        type="button"
                        className={`rounded-full px-3 py-1 ${
                          previewLang === "primary"
                            ? "bg-amber-800 text-white"
                            : "text-amber-900/70"
                        }`}
                        onClick={() => setPreviewLang("primary")}
                      >
                        Primary
                      </button>
                      <button
                        type="button"
                        className={`rounded-full px-3 py-1 ${
                          previewLang === "secondary"
                            ? "bg-amber-800 text-white"
                            : "text-amber-900/70"
                        }`}
                        onClick={() => setPreviewLang("secondary")}
                      >
                        2nd
                      </button>
                    </div>
                  ) : null}
                </div>
                <div className="overflow-hidden rounded-2xl border border-amber-900/15 bg-white shadow-md">
                  <BusinessCardTemplate
                    state={state}
                    previewLang={
                      state.secondaryMode === "self" ? previewLang : "primary"
                    }
                    homeHref={homeHref}
                    ownerName={state.name}
                  />
                </div>
              </div>

              <div className="hidden lg:block">
                <StartCustomizer
                  state={state}
                  setState={setState}
                  onBackToSectors={onBackToSectors}
                />
              </div>
            </div>

            <AnimatePresence>
              {mobileEditorOpen ? (
                <motion.div
                  className="fixed inset-0 z-[200] flex flex-col bg-black/40 lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileEditorOpen(false)}
                >
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Editor"
                    className="mt-auto max-h-[88vh] overflow-y-auto rounded-t-2xl bg-[#FAF6F0] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 28, stiffness: 320 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-amber-900/20" />
                    <StartCustomizer
                      state={state}
                      setState={setState}
                      onBackToSectors={() => {
                        onBackToSectors();
                        setMobileEditorOpen(false);
                      }}
                    />
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
