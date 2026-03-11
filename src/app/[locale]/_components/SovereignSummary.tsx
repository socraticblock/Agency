"use client";

import { motion } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function SovereignSummary({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  return (
    <section className="mx-auto max-w-5xl px-4 pb-10 pt-4 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400">
          {t.sovereign?.summaryHeading}
        </p>
        <p className="mt-3 text-base text-white/70 sm:text-lg">
          {t.sovereign?.summarySubheading}
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-8 grid gap-4 md:grid-cols-3"
      >
        <motion.div
          variants={itemVariants}
          className="group relative isolate z-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_18px_45px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/90">
            {t.sovereign?.bridgeTitle}
          </div>
          <p className="mt-2 text-sm text-white/80">
            {t.sovereign?.bridgeBody}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="group relative isolate z-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_18px_45px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/90">
            {t.sovereign?.interceptTitle}
          </div>
          <p className="mt-2 text-sm text-white/80">
            {t.sovereign?.interceptBody}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="group relative isolate z-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_18px_45px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/90">
            {t.sovereign?.vaultTitle}
          </div>
          <p className="mt-2 text-sm text-white/80">
            {t.sovereign?.vaultBody}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

