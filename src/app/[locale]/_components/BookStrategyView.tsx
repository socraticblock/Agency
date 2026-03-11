"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function BookStrategyView({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  return (
    <div className="mx-auto max-w-3xl text-white">
      <Link
        href={`/${locale}/audit-results`}
        className="mb-8 inline-block text-sm text-slate-400 transition hover:text-slate-200"
      >
        ← {t.bookStrategy.back}
      </Link>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold tracking-tight sm:text-4xl"
      >
        {t.bookStrategy.title}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-10 min-h-[400px] rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      >
        <p className="text-sm text-slate-500">
          Calendly / Cal.com embed placeholder. Replace this block with your
          booking iframe or integration.
        </p>
      </motion.div>
    </div>
  );
}
