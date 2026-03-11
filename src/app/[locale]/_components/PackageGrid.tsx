"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { SOVEREIGN_PACKAGES, type SovereignPackageId } from "@/lib/packages";
import { getCheckoutUrl } from "@/lib/payments/checkout";

type SelectedPackage = (typeof SOVEREIGN_PACKAGES)[number] | null;

export function PackageGrid({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<SelectedPackage>(null);

  const handleDeploy = (id: SovereignPackageId) => {
    const url = getCheckoutUrl(id);
    if (!url) return;
    window.location.href = url;
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Sovereign Revenue Matrix
        </p>
        <p className="mt-3 text-base text-white/70 sm:text-lg">
          Choose the grade of sovereignty that matches your current ambition.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {SOVEREIGN_PACKAGES.map((pkg) => (
          <motion.article
            key={pkg.id}
            layoutId={pkg.id}
            onClick={() => setSelected(pkg)}
            className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl transition hover:border-emerald-400/40"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
              {pkg.name}
            </h3>
            <p className="mt-4 text-2xl font-bold text-white">
              {pkg.initFee}
            </p>
            <p className="mt-1 text-xs text-slate-400">{pkg.mrr}</p>
            <button className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 hover:text-white">
              View Infrastructure →
            </button>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={selected.id}
              className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#020617] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-6 top-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-200"
              >
                Close [X]
              </button>
              <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
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
                    Initialization Fee
                  </p>
                  <p className="mt-1 text-3xl font-bold text-white">
                    {selected.initFee}
                  </p>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -1 }}
                  onClick={() => handleDeploy(selected.id)}
                  className="rounded-full bg-emerald-500 px-7 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-black shadow-[0_0_35px_rgba(16,185,129,0.7)] transition hover:bg-emerald-400"
                >
                  Deploy Now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

