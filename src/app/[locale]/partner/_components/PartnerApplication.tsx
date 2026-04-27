"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

const NETWORK_OPTIONS = [
  "Lawyers & Legal",
  "Boutiques & Retail",
  "Restaurants & Hospitality",
  "Tech & Startups",
  "Creative & Media",
  "Medical & Wellness",
  "Real Estate",
  "Other",
];

export function PartnerApplication() {
  const id = useId();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [networkSectors, setNetworkSectors] = useState<string[]>([]);
  const [otherSector, setOtherSector] = useState("");
  const [experience, setExperience] = useState("");
  const [whyGenezisi, setWhyGenezisi] = useState("");
  const [clientPlan, setClientPlan] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleSector = (sector: string) => {
    setNetworkSectors((prev) =>
      prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !phone.trim() || !email.trim() || !whyGenezisi.trim() || !clientPlan.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/partner-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          networkSectors: networkSectors.includes("Other")
            ? [...networkSectors.filter((s) => s !== "Other"), otherSector.trim()].filter(Boolean)
            : networkSectors,
          experience: experience.trim(),
          whyGenezisi: whyGenezisi.trim(),
          clientPlan: clientPlan.trim(),
          resumeLink: resumeLink.trim(),
          referralSource: referralSource.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100 placeholder-slate-500 backdrop-blur-xl focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition";

  const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            Explore This Opportunity
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">
            Become a Genezisi Partner
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Full name */}
              <div>
                <label htmlFor={`${id}-name`} className={labelClass}>
                  Full name <span className="text-emerald-400">*</span>
                </label>
                <input
                  id={`${id}-name`}
                  type="text"
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); setError(null); }}
                  placeholder="Your full name"
                  className={inputClass}
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor={`${id}-phone`} className={labelClass}>
                  Phone / WhatsApp <span className="text-emerald-400">*</span>
                </label>
                <input
                  id={`${id}-phone`}
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setError(null); }}
                  placeholder="+995 ..."
                  className={inputClass}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor={`${id}-email`} className={labelClass}>
                  Email <span className="text-emerald-400">*</span>
                </label>
                <input
                  id={`${id}-email`}
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  placeholder="you@example.com"
                  className={inputClass}
                  required
                />
              </div>

              {/* Network sectors */}
              <div>
                <p className={labelClass}>Your professional network</p>
                <div className="flex flex-wrap gap-2">
                  {NETWORK_OPTIONS.map((sector) => (
                    <button
                      key={sector}
                      type="button"
                      onClick={() => toggleSector(sector)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                        networkSectors.includes(sector)
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-white/[0.04] text-slate-400 border border-white/[0.08] hover:text-white"
                      }`}
                    >
                      {sector}
                    </button>
                  ))}
                </div>
                {networkSectors.includes("Other") && (
                  <input
                    type="text"
                    value={otherSector}
                    onChange={(e) => setOtherSector(e.target.value)}
                    placeholder="Specify..."
                    className={`${inputClass} mt-2`}
                  />
                )}
              </div>

              {/* Experience */}
              <div>
                <label htmlFor={`${id}-exp`} className={labelClass}>
                  Your experience
                </label>
                <textarea
                  id={`${id}-exp`}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Tell us about your sales, business development, or client management experience..."
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Why Genezisi */}
              <div>
                <label htmlFor={`${id}-why`} className={labelClass}>
                  Why Genezisi? <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  id={`${id}-why`}
                  value={whyGenezisi}
                  onChange={(e) => { setWhyGenezisi(e.target.value); setError(null); }}
                  placeholder="Why do you want to become a Genezisi Partner, and why should we choose you?"
                  rows={3}
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>

              {/* Client plan */}
              <div>
                <label htmlFor={`${id}-plan`} className={labelClass}>
                  Your plan <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  id={`${id}-plan`}
                  value={clientPlan}
                  onChange={(e) => { setClientPlan(e.target.value); setError(null); }}
                  placeholder="How do you plan to find and close clients? Walk us through your approach."
                  rows={3}
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>

              {/* Resume / LinkedIn */}
              <div>
                <label htmlFor={`${id}-resume`} className={labelClass}>
                  Resume / LinkedIn <span className="text-slate-500 text-xs">(optional)</span>
                </label>
                <input
                  id={`${id}-resume`}
                  type="url"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className={inputClass}
                />
              </div>

              {/* Referral source */}
              <div>
                <label htmlFor={`${id}-ref`} className={labelClass}>
                  How did you hear about us? <span className="text-slate-500 text-xs">(optional)</span>
                </label>
                <input
                  id={`${id}-ref`}
                  type="text"
                  value={referralSource}
                  onChange={(e) => setReferralSource(e.target.value)}
                  placeholder="Friend, social media, etc."
                  className={inputClass}
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500/20 px-6 py-3.5 text-base font-semibold text-emerald-200 transition hover:bg-emerald-500/30 disabled:pointer-events-none disabled:opacity-50 border border-emerald-500/30"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Apply to Become a Partner
                  </>
                )}
              </motion.button>

              <p className="text-center text-xs text-slate-500">
                We review every application personally. If there&apos;s a fit, we&apos;ll reach out within 3 working days.
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center"
            >
              <p className="text-lg font-semibold text-emerald-200">
                Thank you for your application.
              </p>
              <p className="mt-2 text-sm text-slate-400">
                We review every submission personally and will be in touch within 3 working days.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
