"use client";

import { motion } from "framer-motion";
import { SHIELD_TIERS } from "@/constants/pricing";
import { Shield, Check } from "lucide-react";

export function PartnerShield() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            Where Passive Income Begins
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">
            The Sovereign Shield
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400 leading-relaxed sm:text-lg">
            Every website needs a Shield to stay online, secure, and fast. Shields renew yearly.
            As a Partner, you earn <span className="text-emerald-300 font-semibold">30% on every renewal</span> —
            for as long as your client stays with Genezisi.
          </p>
        </motion.div>

        {/* Shield tier cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SHIELD_TIERS.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-5 ${
                tier.isRecommended
                  ? "border-emerald-500/40 bg-emerald-500/[0.06] shadow-[0_0_30px_rgba(16,185,129,0.08)]"
                  : "border-white/[0.08] bg-white/[0.03]"
              }`}
            >
              {tier.isRecommended && (
                <span className="absolute -top-2.5 left-4 rounded-full bg-emerald-400 px-2.5 py-0.5 text-[10px] font-black text-black uppercase tracking-wider">
                  Recommended
                </span>
              )}

              <div className="mb-3 flex items-center gap-2">
                <Shield className={`h-4 w-4 ${tier.isRecommended ? "text-emerald-400" : "text-slate-500"}`} />
                <h3 className="text-sm font-bold text-white">{tier.name}</h3>
              </div>

              <p className="mb-3 text-xl font-bold text-emerald-400">
                {tier.priceGEL.toLocaleString()}₾<span className="text-xs font-normal text-slate-500">/yr</span>
              </p>

              <p className="mb-3 text-xs text-slate-400 leading-relaxed">{tier.description}</p>

              <div className="mt-auto space-y-1.5">
                {tier.perks.slice(0, 3).map((perk, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                    <span className="text-[11px] text-slate-300 leading-snug">{perk.title}</span>
                  </div>
                ))}
                {tier.perks.length > 3 && (
                  <p className="text-[10px] text-slate-500 pl-4">+{tier.perks.length - 3} more features</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compounding message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 sm:p-8"
        >
          <p className="text-sm text-slate-200 leading-relaxed sm:text-base">
            The better you serve your clients, the more they grow. Growing businesses{" "}
            <span className="text-emerald-300 font-semibold">upgrade their Shield</span>. Every upgrade increases your
            recurring income — without selling anything new.
          </p>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed sm:text-base">
            When a client upgrades their website, adds features, or expands their platform — you earn{" "}
            <span className="text-emerald-300 font-semibold">30% on every new investment</span>. Your relationship compounds.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
