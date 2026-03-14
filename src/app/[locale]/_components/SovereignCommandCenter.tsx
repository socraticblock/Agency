"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

const steps = [
  "Looking at your current online presence...",
  "Estimating how many customers you're missing each month...",
  "Calculating what a proper website could recover for you...",
];

export function SovereignCommandCenter({ locale }: Props) {
  const t = getMessages(locale);
  const [handle, setHandle] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [recovered, setRecovered] = useState<number | null>(null);

  const runSimulation = () => {
    if (!handle.trim()) return;
    setActiveStep(0);
    setRecovered(null);

    steps.forEach((_, index) => {
      setTimeout(() => {
        setActiveStep(index);
        if (index === steps.length - 1) {
          const base = 3400;
          const variance = Math.floor(Math.random() * 800);
          setRecovered(base + variance);
        }
      }, 800 * (index + 1));
    });
  };

  return (
    <section className="mx-auto max-w-5xl px-4 pb-20 pt-6 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
          {t.sovereign?.commandCenterTitle}
        </p>
        <p className="mt-3 text-base text-white/70 sm:text-lg">
          {t.sovereign?.commandCenterSubheading}
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-mono text-slate-400">
            checking @{handle || "your_business"}
          </span>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="flex-1 text-sm text-white/80">
            {t.sovereign?.commandInputLabel}
            <input
              type="text"
              className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-emerald-400/40 focus:ring-2"
              placeholder={t.sovereign?.commandPlaceholder}
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />
          </label>
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -1 }}
            onClick={runSimulation}
            className="mt-3 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-black shadow-[0_0_35px_rgba(16,185,129,0.7)] transition hover:bg-emerald-400 md:mt-6"
          >
            {t.sovereign?.commandRunLabel}
          </motion.button>
        </div>

        <div className="mt-6 min-h-[96px] rounded-2xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-emerald-100">
          <AnimatePresence mode="wait">
            {activeStep === null && (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-slate-400"
              >
                $ enter your handle above to get started...
              </motion.p>
            )}
            {activeStep !== null && (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="space-y-1"
              >
                {steps.slice(0, activeStep + 1).map((step, index) => (
                  <p key={index}>{`> ${step}`}</p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {recovered !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 flex flex-col items-start justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-50 md:flex-row md:items-center"
          >
            <p>
              {t.sovereign?.commandOutputLead}{" "}
              <span className="font-semibold">
                {recovered.toLocaleString("en-US")} ₾
              </span>{" "}
              {t.sovereign?.commandOutputTail}
            </p>
            <a
              href="#reality-check"
              className="inline-flex items-center justify-center rounded-full border border-emerald-400/70 bg-black/40 px-4 py-1.5 text-xs font-semibold text-emerald-100 hover:bg-emerald-500/20"
            >
              {t.sovereign?.commandCta}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}

