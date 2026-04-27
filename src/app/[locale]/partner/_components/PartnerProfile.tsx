"use client";

import { motion } from "framer-motion";
import { UserCheck, Globe2, Flame, MessageCircle, TrendingUp, Phone } from "lucide-react";

const REQUIREMENTS = [
  {
    icon: Globe2,
    text: "Are Georgian, fluent in English — you are the bridge between Georgian businesses and our English-language build process",
  },
  {
    icon: UserCheck,
    text: "Have a professional network in Georgia OR are willing to build one from scratch",
  },
  {
    icon: Flame,
    text: "Are motivated, driven, and willing to hustle — cold-call, visit stores, attend events, be creative",
  },
  {
    icon: MessageCircle,
    text: "Communicate with confidence and take pride in presenting premium products",
  },
  {
    icon: TrendingUp,
    text: "Want to build long-term recurring income, not quick one-off commissions",
  },
  {
    icon: Phone,
    text: "Are comfortable selling face-to-face and over the phone",
  },
];

export function PartnerProfile() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            Who We&apos;re Looking For
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">
            This is not for everyone.
          </h2>
          <p className="mt-3 text-lg text-slate-400">
            We deliberately keep our Partner network small.
          </p>
        </motion.div>

        <div className="space-y-4">
          {REQUIREMENTS.map((req, idx) => {
            const Icon = req.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.07 }}
                className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm text-slate-300 leading-relaxed pt-1">{req.text}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 text-center"
        >
          <p className="text-sm text-slate-200 leading-relaxed sm:text-base">
            If you&apos;re selected, you&apos;ll receive a{" "}
            <span className="text-emerald-300 font-semibold">complete onboarding kit</span> —
            product guide, full price sheet, questionnaire template, and our direct support.
            We invest in you because you invest in us.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
