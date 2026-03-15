"use client";

import { useEffect, useState, useActionState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { bookStrategyAction } from "@/app/actions/lead";

export function BookStrategyView({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const [leadData, setLeadData] = useState<any>(null);
  const [state, formAction, isPending] = useActionState(bookStrategyAction, null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("kvali_lead");
      if (stored) {
        setLeadData(JSON.parse(stored));
      }
    } catch {}
  }, []);

  if (state?.success) {
    return (
      <div className="mx-auto max-w-3xl text-white text-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-10"
        >
          <h2 className="text-3xl font-bold text-emerald-300 mb-4">
            {t.bookStrategy.successMsg}
          </h2>
          <p className="text-slate-300">
            {t.bookStrategy.nextStepsMsg}
          </p>
          <Link
            href={`/${locale}`}
            className="mt-8 inline-block rounded-full bg-white/10 px-6 py-2 text-sm font-medium hover:bg-white/20 transition"
          >
            {t.bookStrategy.back}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl text-white">
      <Link
        href={`/${locale}`}
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
        className="mt-10 grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
      >
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="leadData" value={leadData ? JSON.stringify(leadData) : ""} />
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {t.bookStrategy.nameLabel}
            </label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
              placeholder={t.bookStrategy.namePlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {t.bookStrategy.emailLabel}
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
              placeholder={t.bookStrategy.emailPlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {t.bookStrategy.whatsappLabel}
            </label>
            <input
              type="tel"
              name="whatsapp"
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
              placeholder={t.bookStrategy.whatsappPlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {t.bookStrategy.timeLabel}
            </label>
            <input
              type="text"
              name="time"
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
              placeholder={t.bookStrategy.timePlaceholder}
            />
          </div>
          {state?.error && (
            <p className="text-sm text-red-400">{state.error}</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-emerald-400 disabled:opacity-50"
          >
            {isPending ? t.bookStrategy.submittingBtn : t.bookStrategy.submitBtn}
          </button>
        </form>
        <div className="space-y-6 text-sm text-slate-300">
          {leadData && (
            <div className="rounded-xl border border-white/10 bg-black/40 p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">{t.bookStrategy.diagnosticTitle}</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><span className="text-slate-500">{t.bookStrategy.businessLabel}</span> {leadData.businessName || "N/A"}</li>
                <li><span className="text-slate-500">{t.bookStrategy.taxStatusLabel}</span> {leadData.taxStatus || "N/A"}</li>
                <li><span className="text-slate-500">{t.bookStrategy.bankChoiceLabel}</span> {leadData.bankChoice || "N/A"}</li>
                <li><span className="text-slate-500">{t.bookStrategy.websiteLabel}</span> {leadData.websiteUrl || "N/A"}</li>
              </ul>
            </div>
          )}
          <p className="font-mono text-xs text-emerald-300">
            {t.bookStrategy.scarcityMsg}
          </p>
          <p>
            {t.bookStrategy.nextStepsMsg}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
