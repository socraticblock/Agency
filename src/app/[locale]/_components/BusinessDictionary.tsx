"use client";

import { motion } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function BusinessDictionary({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  return (
    <section className="mx-auto max-w-4xl px-4 pb-24 pt-2 sm:px-6">
      <h2 className="text-center text-lg font-semibold text-slate-300 sm:text-xl">
        {t.dictionary.heading}
      </h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-8 flex flex-col gap-3"
      >
        {t.dictionary.rows.map((row, i) => (
          <motion.div
            key={i}
            variants={rowVariants}
            className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <dt className="font-medium text-emerald-400 sm:shrink-0 sm:basis-44">
              {row.tech}
            </dt>
            <dd className="text-slate-200">{row.result}</dd>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
