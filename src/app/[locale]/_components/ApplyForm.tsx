"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const SCRAMBLE_CHARS = "#*0X";
const SCRAMBLE_DURATION_MS = 800;
const SCRAMBLE_INTERVAL_MS = 50;

function scrambleString(len: number): string {
  let s = "";
  for (let i = 0; i < len; i++) {
    s += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
  }
  return s;
}

export function ApplyForm({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const finalTitle = t.apply.title;

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(finalTitle);
  const [businessName, setBusinessName] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [targetRevenue, setTargetRevenue] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  useEffect(() => {
    const len = finalTitle.length;
    setDisplayTitle(scrambleString(len));
    const deadline = Date.now() + SCRAMBLE_DURATION_MS;
    const id = setInterval(() => {
      if (Date.now() >= deadline) {
        clearInterval(id);
        setDisplayTitle(finalTitle);
        return;
      }
      setDisplayTitle(scrambleString(len));
    }, SCRAMBLE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [finalTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep((s) => s + 1);
      return;
    }
    setSubmitted(true);
  };

  const goBack = () => {
    if (step > 1) setStep((s) => s - 1);
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
        {displayTitle}
      </h1>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >
            {step === 1 && (
              <div>
                <label
                  htmlFor="businessName"
                  className="block text-sm font-medium text-slate-300"
                >
                  {t.apply.step1Label}
                </label>
                <input
                  id="businessName"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder={t.apply.placeholder1}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder-slate-500 backdrop-blur-xl focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                />
              </div>
            )}
            {step === 2 && (
              <div>
                <label
                  htmlFor="bottleneck"
                  className="block text-sm font-medium text-slate-300"
                >
                  {t.apply.step2Label}
                </label>
                <textarea
                  id="bottleneck"
                  value={bottleneck}
                  onChange={(e) => setBottleneck(e.target.value)}
                  rows={3}
                  placeholder={t.apply.placeholder2}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder-slate-500 backdrop-blur-xl focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                />
              </div>
            )}
            {step === 3 && (
              <div>
                <label
                  htmlFor="targetRevenue"
                  className="block text-sm font-medium text-slate-300"
                >
                  {t.apply.step3Label}
                </label>
                <input
                  id="targetRevenue"
                  type="text"
                  inputMode="numeric"
                  value={targetRevenue}
                  onChange={(e) => setTargetRevenue(e.target.value)}
                  placeholder={t.apply.placeholder3}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder-slate-500 backdrop-blur-xl focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                />
              </div>
            )}
            {step === 4 && (
              <div>
                <label
                  htmlFor="websiteUrl"
                  className="block text-sm font-medium text-slate-300"
                >
                  {t.apply.step4Label}
                </label>
                <input
                  id="websiteUrl"
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder={t.apply.placeholder4}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder-slate-500 backdrop-blur-xl focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="text-sm text-slate-400 transition hover:text-slate-200"
                >
                  ← {t.apply.back}
                </button>
              )}
              <button
                type="submit"
                className="rounded-xl bg-emerald-500/20 px-6 py-3 font-medium text-emerald-200 transition hover:bg-emerald-500/30"
              >
                {step < 4 ? t.apply.next : t.apply.submit}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.p
            key="thanks"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 text-slate-300"
          >
            {t.apply.thanks}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}
