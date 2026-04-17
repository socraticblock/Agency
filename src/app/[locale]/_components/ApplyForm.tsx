"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

function isValidHttpUrl(s: string) {
  try {
    const u = new URL(s.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function ApplyForm({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const router = useRouter();
  const errId = useId();
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [taxStatus, setTaxStatus] = useState("");
  const [bankChoice, setBankChoice] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStepError(null);

    if (step === 1) {
      if (!businessName.trim()) {
        setStepError(t.apply.fieldRequired);
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!taxStatus.trim()) {
        setStepError(t.apply.fieldRequired);
        return;
      }
      setStep(3);
      return;
    }
    if (step === 3) {
      if (!bankChoice.trim()) {
        setStepError(t.apply.fieldRequired);
        return;
      }
      setStep(4);
      return;
    }

    if (!websiteUrl.trim() || !isValidHttpUrl(websiteUrl)) {
      setStepError(t.apply.invalidUrl);
      return;
    }

    setIsSubmitting(true);
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
    setTimeout(() => {
      router.push(`/${locale}/pricing`);
    }, 2000);
  };

  const goBack = () => {
    setStepError(null);
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
                  name="businessName"
                  autoComplete="organization"
                  value={businessName}
                  onChange={(e) => {
                    setStepError(null);
                    setBusinessName(e.target.value);
                  }}
                  placeholder={t.apply.placeholder1}
                  aria-invalid={step === 1 && !!stepError}
                  aria-describedby={step === 1 && stepError ? errId : undefined}
                  className="touch-form-control mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100 placeholder-slate-500 backdrop-blur-xl focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                />
              </div>
            )}
            {step === 2 && (
              <div>
                <label
                  htmlFor="taxStatus"
                  className="block text-sm font-medium text-slate-300"
                >
                  {t.apply.step2Label}
                </label>
                <input
                  id="taxStatus"
                  type="text"
                  name="taxStatus"
                  autoComplete="off"
                  value={taxStatus}
                  onChange={(e) => {
                    setStepError(null);
                    setTaxStatus(e.target.value);
                  }}
                  placeholder={t.apply.placeholder2}
                  aria-invalid={step === 2 && !!stepError}
                  aria-describedby={step === 2 && stepError ? errId : undefined}
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
                  name="bankChoice"
                  autoComplete="off"
                  value={bankChoice}
                  onChange={(e) => {
                    setStepError(null);
                    setBankChoice(e.target.value);
                  }}
                  placeholder={t.apply.placeholder3}
                  aria-invalid={step === 3 && !!stepError}
                  aria-describedby={step === 3 && stepError ? errId : undefined}
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
                  name="websiteUrl"
                  autoComplete="url"
                  inputMode="url"
                  value={websiteUrl}
                  onChange={(e) => {
                    setStepError(null);
                    setWebsiteUrl(e.target.value);
                  }}
                  placeholder={t.apply.placeholder4}
                  aria-invalid={step === 4 && !!stepError}
                  aria-describedby={step === 4 && stepError ? errId : undefined}
                  className="touch-form-control mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100 placeholder-slate-500 backdrop-blur-xl focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                />
              </div>
            )}

            {stepError && (
              <p id={errId} className="text-sm text-red-400" role="alert">
                {stepError}
              </p>
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
                disabled={isSubmitting}
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -2 }}
                className="min-h-11 rounded-xl bg-emerald-500/20 px-6 py-3 text-base font-medium text-emerald-200 transition hover:bg-emerald-500/30 disabled:pointer-events-none disabled:opacity-50"
              >
                {isSubmitting
                  ? t.apply.submitting
                  : step < 4
                    ? t.apply.next
                    : t.apply.submit}
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
