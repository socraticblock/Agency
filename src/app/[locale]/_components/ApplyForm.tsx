"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function ApplyForm({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [taxStatus, setTaxStatus] = useState("");
  const [bankChoice, setBankChoice] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep((s) => s + 1);
      return;
    }
    // Submit the form data
    try {
      sessionStorage.setItem(
        "genezisi_lead",
        JSON.stringify({
          source: "apply",
          businessName,
          taxStatus,
          bankChoice,
          websiteUrl,
          locale,
        })
      );
    } catch {
      // ignore storage errors
    }
    setSubmitted(true);
    // Redirect to success or book-strategy after a short delay
    setTimeout(() => {
      router.push(`/${locale}/book-strategy`);
    }, 2000);
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
        {t.apply.title}
      </h1>

      <div className="mt-8 flex items-center gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= step ? "bg-emerald-500" : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-500 uppercase tracking-widest">
        Step {step} of 4
      </p>

      <AnimatePresence mode="wait">
        {!submitted ? (
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
                  className="touch-form-control mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100 placeholder-slate-500 backdrop-blur-xl focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
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
                <input
                  id="taxStatus"
                  type="text"
                  value={taxStatus}
                  onChange={(e) => setTaxStatus(e.target.value)}
                  placeholder={t.apply.placeholder2}
                  className="touch-form-control mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100 placeholder-slate-500 backdrop-blur-xl focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                />
              </div>
            )}
            {step === 3 && (
              <div>
                <label
                  htmlFor="bankChoice"
                  className="block text-sm font-medium text-slate-300"
                >
                  {t.apply.step3Label}
                </label>
                <input
                  id="bankChoice"
                  type="text"
                  value={bankChoice}
                  onChange={(e) => setBankChoice(e.target.value)}
                  placeholder={t.apply.placeholder3}
                  className="touch-form-control mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100 placeholder-slate-500 backdrop-blur-xl focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
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
                  className="touch-form-control mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100 placeholder-slate-500 backdrop-blur-xl focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
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
                  className="min-h-11 px-2 text-sm text-slate-400 transition hover:text-slate-200"
                >
                  ← {t.apply.back}
                </motion.button>
              )}
              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -2 }}
                className="min-h-11 rounded-xl bg-emerald-500/20 px-6 py-3 text-base font-medium text-emerald-200 transition hover:bg-emerald-500/30"
              >
                {step < 4 ? t.apply.next : t.apply.submit}
              </motion.button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center"
          >
            <p className="text-lg font-semibold text-emerald-200">
              {t.apply.thanks}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Redirecting you to schedule a call...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
