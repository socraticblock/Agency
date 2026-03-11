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
        className="mt-10 grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Name
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              WhatsApp
            </label>
            <input
              type="tel"
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
              placeholder="+9955..."
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Preferred Time (Your Timezone)
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
              placeholder="e.g. Weekdays after 18:00"
            />
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-500 hover:text-white"
          >
            Request Implementation Call
          </button>
        </form>
        <div className="space-y-4 text-sm text-slate-300">
          <p className="font-mono text-xs text-emerald-300">
            We hold a maximum of two Sovereign build slots per quarter. This
            call is where we confirm fit and timeline—not a generic sales demo.
          </p>
          <p>
            After you submit, we&apos;ll reply with two concrete time options
            and a secure link. If you prefer, you can also reach out via
            WhatsApp using the Architect link in the header.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
