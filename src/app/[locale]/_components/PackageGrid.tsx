"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { SOVEREIGN_PACKAGES, type SovereignPackageId } from "@/lib/packages";
import { getCheckoutUrl } from "@/lib/payments/checkout";
import { KineticText } from "./KineticText";

type SelectedPackage = (typeof SOVEREIGN_PACKAGES)[number] | null;

export function PackageGrid({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const [selected, setSelected] = useState<SelectedPackage>(null);

  const handleDeploy = (id: SovereignPackageId) => {
    const url = getCheckoutUrl(id);
    if (!url) return;
    window.location.href = url;
  };

  const handleEmpireContact = () => {
    window.location.href = `/${locale}/book-strategy`;
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
              className={`relative cursor-pointer rounded-2xl glass-card p-6 text-left transition-all hover:-translate-y-1 group ${
                pkg.isPopular
                  ? "border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)] md:scale-105 z-10"
                  : "hover:border-emerald-400/40 hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)]"
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
            <motion.article
              key={pkg.id}
              layoutId={pkg.id}
              onClick={() => setSelected(pkg)}
              className="relative cursor-pointer rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-left transition-all hover:-translate-y-1 hover:border-emerald-500/20 hover:bg-white/[0.04]"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
                {pkg.name}
              </h3>
              <p className="mt-4 text-2xl font-bold text-white">
                {pkg.initFee}
              </p>
              <p className="mt-1 text-xs text-slate-400">{pkg.mrr}</p>
              <button className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 hover:text-white">
                Learn more →
              </button>
            </motion.article>
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
              <div className="mt-6 space-y-2 text-sm text-slate-200">
                {selected.bullets.map((line) => (
                  <div
                    key={line}
                    className="flex items-center gap-2 font-mono text-xs"
                  >
                    <span className="h-1 w-4 rounded-full bg-emerald-400" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex items-end justify-between border-t border-white/10 pt-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                    One-time setup
                  </p>
                  <p className="mt-1 text-3xl font-bold text-white">
                    {selected.initFee}
                  </p>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -1 }}
                  onClick={() =>
                    selected.id === "scale"
                      ? handleEmpireContact()
                      : handleDeploy(selected.id)
                  }
                  className="rounded-full bg-emerald-500 px-7 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-black shadow-[0_0_35px_rgba(16,185,129,0.7)] transition hover:bg-emerald-400"
                >
                  {selected.id === "scale"
                    ? "Let's talk about your project"
                    : "Get started"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

