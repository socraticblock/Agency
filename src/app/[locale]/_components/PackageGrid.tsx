"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { SOVEREIGN_PACKAGES, type SovereignPackageId } from "@/lib/packages";
import { getCheckoutUrl } from "@/lib/payments/checkout";
import { KineticText } from "./KineticText";
import { generateWhatsAppLink } from "@/utils/routing";
import { StandalonePaymentCard } from "@/components/sections/StandalonePayments";
import { LegalRoadmap } from "@/components/modals/LegalRoadmap";

type SelectedPackage = (typeof SOVEREIGN_PACKAGES)[number] | null;

export function PackageGrid({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const [selected, setSelected] = useState<SelectedPackage>(null);
  const [selectedTier, setSelectedTier] = useState<"tech" | "glove">("tech");
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);

  const [isDeploying, setIsDeploying] = useState<string | null>(null);

  const handleDeploy = (pkg: any) => {
    setIsDeploying(pkg.id);
    setTimeout(() => {
      const price = pkg.id === "checkout" && selectedTier === "glove" ? "₾2,500+" : pkg.initFee;
      window.location.href = generateWhatsAppLink(pkg.name, price);
    }, 300);
  };

  const handleEmpireContact = (pkg: any) => {
    setIsDeploying(pkg.id);
    setTimeout(() => {
      const price = pkg.id === "checkout" && selectedTier === "glove" ? "₾2,500+" : pkg.initFee;
      window.location.href = generateWhatsAppLink(pkg.name, price);
    }, 300);
  };

  const websites = SOVEREIGN_PACKAGES.filter((p) => p.category === "website");
  const services = SOVEREIGN_PACKAGES.filter((p) => p.category === "service");

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
          {t.packages?.sectionLabel ?? "Choose your path"}
        </p>
        <p className="mt-3 text-base text-white/70 sm:text-lg">
          {t.packages?.sectionSubheading ??
            "Select the foundation that best fits your current stage of growth. We're here to help you build a business you truly own."}
        </p>
      </div>

      <div className="mt-16">
        <KineticText
          text="Core Digital Infrastructure"
          splitBy="word"
          delay={0.1}
          className="mb-8 w-full justify-center text-center text-sm font-semibold uppercase tracking-[0.3em] text-white"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {websites.map((pkg) => (
            <motion.article
              key={pkg.id}
              layoutId={pkg.id}
              onClick={() => setSelected(pkg)}
              className={`relative cursor-pointer p-6 text-left transition-all hover:-translate-y-1 group clay-card clay-card-hover ${pkg.isPopular
                ? "border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)] md:scale-105 z-10"
                : ""
                }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black shadow-lg z-20">
                  Most Popular
                </div>
              )}
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                {pkg.name}
              </h3>
              <p className="mt-4 text-2xl font-bold text-white">
                {pkg.initFee}
              </p>
              <p className="mt-1 text-xs text-slate-400">{pkg.mrr}</p>
              <button className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 hover:text-white">
                See what's included →
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <KineticText
          text="Standalone Services"
          splitBy="word"
          delay={0.1}
          className="mb-8 w-full justify-center text-center text-sm font-semibold uppercase tracking-[0.3em] text-white"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((pkg) => (
            pkg.id === "checkout" ? (
              <StandalonePaymentCard key={pkg.id} onLearnMore={(tier) => { setSelected(pkg); setSelectedTier(tier); }} onShowRoadmap={() => setIsRoadmapOpen(true)} />
            ) : (
              <motion.article
                key={pkg.id}
                layoutId={pkg.id}
                onClick={() => setSelected(pkg)}
                className="relative cursor-pointer p-6 text-left transition-all hover:-translate-y-1 clay-card clay-card-hover"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
                  {pkg.name}
                </h3>
                <p className="mt-4 text-2xl font-bold text-white">
                  {pkg.initFee}
                </p>
                <p className="mt-1 text-xs text-slate-400">{pkg.mrr}</p>
                <button className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 hover:text-white">
                  See what's included →
                </button>
              </motion.article>
            )
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              layoutId={selected.id}
              className="relative w-full max-w-xl rounded-3xl bg-[#0a0a0a] border border-white/10 p-10 shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-6 top-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-200"
              >
                Close [X]
              </button>
              <h2 className="text-3xl font-space font-black uppercase tracking-tight text-white sm:text-4xl">
                {selected.name}
              </h2>
              <p className="mt-1 text-xs text-slate-400">{selected.mrr}</p>
              <div className="mt-6 space-y-5 text-sm text-slate-200">
                {/* Legal Roadmap Section */}
                {selected.id === "checkout" && selectedTier === "glove" && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">
                      🗺️ The Launch sequence (How it works)
                    </p>
                    {[
                      "Legal Protocol: We provide the specialized POA template and legal briefing. You sign; we finalize the administrative file.",
                      "Authentication: We coordinate the Notary and Apostille verification to satisfy the strict security compliance of Georgian banks.",
                      "Agency Representation: Our legal team physically submits your application to TBC/BoG and manages the technical back-and-forth until your Merchant ID is issued.",
                      "Digital Handover: We wire the secure API keys into your Next.js infrastructure and push the native GEL checkout to live production."
                    ].map((line) => (
                      <div key={line} className="flex items-start gap-2 font-mono text-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1 flex-shrink-0" />
                        <span className="leading-relaxed">
                          <span className="font-bold text-white">{line.split(":")[0]}:</span>
                          {line.substring(line.indexOf(":"))}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Deliverables Section */}
                <div className={`space-y-2 ${selected.id === "checkout" && selectedTier === "glove" ? "pt-4 border-t border-white/5" : ""}`}>
                  {selected.id === "checkout" && selectedTier === "glove" && (
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">
                      📦 Custom Deliverables
                    </p>
                  )}
                  {(selected.id === "checkout" && selectedTier === "glove"
                    ? [
                      "Full Administrative Concierge: We physically handle bank visits, KYC (Know Your Customer) interviews, and document filing at TBC/BoG.",
                      "Legal Infrastructure: Custom drafting of a bank-vetted Power of Attorney (POA) for authorized merchant representation.",
                      "Direct API Implementation: Native TBC/BoG Checkout integration via React 19 Server Actions (Zero-latency).",
                      "RS.ge Alignment: Automated receipting logic designed to simplify your 1% Micro-Business tax compliance.",
                      "Instant GEL Settlement: Secure, direct-to-bank transactions without third-party middlemen or holding periods.",
                      "Tri-lingual Flow: Localized checkout interface (KA/EN/RU) to capture both local and international markets."
                    ]
                    : selected.bullets
                  ).map((line) => (
                    <div key={line} className="flex items-start gap-2 font-mono text-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1 flex-shrink-0" />
                      <span className="leading-relaxed">
                        {line.includes(":") ? (
                          <>
                            <span className="font-bold text-white">{line.split(":")[0]}:</span>
                            {line.substring(line.indexOf(":"))}
                          </>
                        ) : line}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 flex items-end justify-between border-t border-white/10 pt-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                    One-time setup
                  </p>
                  <p className="mt-1 text-3xl font-bold text-white">
                    {selected.id === "checkout" && selectedTier === "glove" ? "₾2,500+" : selected.initFee}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    animate={isDeploying === selected.id ? { scale: [1, 1.05, 0.9, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -1 }}
                    onClick={() =>
                      selected.id === "scale"
                        ? handleEmpireContact(selected)
                        : handleDeploy(selected)
                    }
                    className="rounded-full bg-emerald-500 px-7 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-black shadow-[0_0_35px_rgba(16,185,129,0.7)] transition hover:bg-emerald-400"
                  >
                    {selected.id === "scale"
                      ? "Let's talk about your project"
                      : "Get started"}
                  </motion.button>
                  <p className="text-[9px] font-medium text-slate-400 text-right max-w-[200px] mt-1 opacity-70">
                    Notice: This button uses our Smart Routing logic to skip forms and start the sale instantly.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

