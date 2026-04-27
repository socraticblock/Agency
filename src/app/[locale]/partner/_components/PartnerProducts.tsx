"use client";

import { motion } from "framer-motion";
import { CreditCard, Monitor } from "lucide-react";

const CARD_TIERS = [
  { name: "Subdomain", price: 150 },
  { name: "Professional", price: 250 },
  { name: "Executive", price: 350 },
];

const STUDIO_TIERS = [
  { name: "Professional", price: 999 },
  { name: "Command Center", price: 1999 },
  { name: "E-Commerce HQ", price: 3999, plus: true },
];

export function PartnerProducts() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            What You&apos;ll Be Selling
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">
            Two products. One partnership.
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Digital Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">The Digital Business Card</h3>
                <p className="text-sm text-slate-400">Premium. Instant. Shareable.</p>
              </div>
            </div>

            {/* Card preview placeholder */}
            <div className="mb-6 flex items-center justify-center rounded-xl border border-white/[0.06] bg-black/40 p-8">
              <div className="h-48 w-28 rounded-xl bg-gradient-to-br from-emerald-900/40 to-slate-900/60 border border-emerald-500/20 shadow-lg shadow-emerald-500/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-emerald-500/30 border border-emerald-500/40" />
                  <div className="h-2 w-14 mx-auto rounded bg-white/20 mb-1" />
                  <div className="h-1.5 w-10 mx-auto rounded bg-white/10" />
                </div>
              </div>
            </div>

            <p className="mb-5 text-sm text-slate-300 leading-relaxed">
              A premium digital card that replaces paper, lives on a link, and costs less than a month of Facebook ads.
            </p>

            <div className="space-y-2">
              {CARD_TIERS.map((tier) => (
                <div key={tier.name} className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                  <span className="text-sm font-medium text-slate-300">{tier.name}</span>
                  <span className="text-sm font-bold text-emerald-400">{tier.price}₾</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs font-semibold text-emerald-300/80">
              A 10-minute sell. They see it, they want it.
            </p>
          </motion.div>

          {/* Studio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <Monitor className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">The Studio</h3>
                <p className="text-sm text-slate-400">Custom Online Headquarters</p>
              </div>
            </div>

            {/* Studio preview placeholder */}
            <div className="mb-6 flex items-center justify-center rounded-xl border border-white/[0.06] bg-black/40 p-6">
              <div className="w-full max-w-xs rounded-lg border border-white/[0.08] bg-slate-900/60 overflow-hidden">
                <div className="h-3 bg-slate-800/80 flex items-center px-2 gap-1">
                  <div className="h-1 w-1 rounded-full bg-red-400/60" />
                  <div className="h-1 w-1 rounded-full bg-yellow-400/60" />
                  <div className="h-1 w-1 rounded-full bg-green-400/60" />
                </div>
                <div className="p-3 space-y-2">
                  <div className="h-3 w-3/4 rounded bg-emerald-500/20" />
                  <div className="h-2 w-full rounded bg-white/[0.06]" />
                  <div className="h-2 w-5/6 rounded bg-white/[0.04]" />
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    <div className="h-6 rounded bg-white/[0.04]" />
                    <div className="h-6 rounded bg-white/[0.04]" />
                    <div className="h-6 rounded bg-white/[0.04]" />
                  </div>
                </div>
              </div>
            </div>

            <p className="mb-5 text-sm text-slate-300 leading-relaxed">
              A full bespoke website — payments, bookings, CMS — built from scratch for businesses that have outgrown social media.
            </p>

            <div className="space-y-2">
              {STUDIO_TIERS.map((tier) => (
                <div key={tier.name} className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                  <span className="text-sm font-medium text-slate-300">{tier.name}</span>
                  <span className="text-sm font-bold text-emerald-400">{tier.price.toLocaleString()}₾{tier.plus ? "+" : ""}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs font-semibold text-emerald-300/80">
              High-ticket. You qualify the client, we build everything.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
