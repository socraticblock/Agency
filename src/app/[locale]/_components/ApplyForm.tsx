"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function ApplyForm({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const [findAnswer, setFindAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Link
        href={`/${locale}`}
        className="mb-8 inline-block text-sm text-slate-400 transition hover:text-slate-200"
      >
        ← {t.apply.back}
      </Link>
      <h1 className="text-2xl font-semibold text-slate-100 sm:text-3xl">
        {t.apply.title}
      </h1>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >
            <div>
              <label
                htmlFor="find"
                className="block text-sm font-medium text-slate-300"
              >
                {t.apply.questionFind}
              </label>
              <textarea
                id="find"
                value={findAnswer}
                onChange={(e) => setFindAnswer(e.target.value)}
                rows={4}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder-slate-500 backdrop-blur-xl focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                placeholder={
                  locale === "en"
                    ? "e.g. When people search for my type of business in Tbilisi..."
                    : "მაგ. როცა ადამიანები ჩემი ტიპის ბიზნესს ეძებენ თბილისში..."
                }
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-500/20 py-3 font-medium text-emerald-200 transition hover:bg-emerald-500/30"
            >
              {t.apply.submit}
            </button>
          </motion.form>
        ) : (
          <motion.p
            key="thanks"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 text-slate-300"
          >
            {locale === "en"
              ? "Thanks. We'll be in touch."
              : "მადლობა. დაგიკავშირდებით."}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}
