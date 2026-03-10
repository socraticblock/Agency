"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, animate, useMotionValueEvent } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const SCRAMBLE_CHARS = "#*0X";
const SCRAMBLE_DURATION_MS = 800;
const SCRAMBLE_INTERVAL_MS = 50;
const SCANNING_DURATION_MS = 2500;

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
  const [scanning, setScanning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(finalTitle);
  const [businessName, setBusinessName] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [targetRevenue, setTargetRevenue] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const progressMotion = useMotionValue(0);
  const [displayPercent, setDisplayPercent] = useState(0);

  useMotionValueEvent(progressMotion, "change", (v) => setDisplayPercent(Math.round(v)));

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

  useEffect(() => {
    if (!scanning) return;
    progressMotion.set(0);
    setDisplayPercent(0);
    const controls = animate(progressMotion, 100, {
      duration: SCANNING_DURATION_MS / 1000,
      ease: [0.22, 1, 0.36, 1],
    });
    const timeout = setTimeout(() => {
      setScanning(false);
      setSubmitted(true);
    }, SCANNING_DURATION_MS);
    return () => {
      controls.stop();
      clearTimeout(timeout);
    };
  }, [scanning, progressMotion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep((s) => s + 1);
      return;
    }
    setScanning(true);
  };

  const goBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const showForm = !scanning && !submitted;
  const showScanning = scanning;
  const showThanks = submitted;

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
        {showForm && (
          <motion.form
            key="form"
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
                <motion.button
                  type="button"
                  onClick={goBack}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -2 }}
                  className="text-sm text-slate-400 transition hover:text-slate-200"
                >
                  ← {t.apply.back}
                </motion.button>
              )}
              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -2 }}
                className="rounded-xl bg-emerald-500/20 px-6 py-3 font-medium text-emerald-200 transition hover:bg-emerald-500/30"
              >
                {step < 4 ? t.apply.next : t.apply.submit}
              </motion.button>
            </div>
          </motion.form>
        )}

        {showScanning && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-10 space-y-4"
          >
            <p className="text-slate-300">{t.apply.scanningMessage}</p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className="h-full rounded-full bg-emerald-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: SCANNING_DURATION_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="text-2xl font-semibold text-emerald-400 tabular-nums">
              {displayPercent}%
            </p>
          </motion.div>
        )}

        {showThanks && (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 space-y-6"
          >
            <div className="flex justify-center">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-emerald-400"
                aria-hidden
              >
                <motion.path
                  d="M12 32l14 14 26-28"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ pathLength: { duration: 0.5, ease: "easeOut" } }}
                />
              </svg>
            </div>
            <p className="text-slate-300">{t.apply.thanks}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
