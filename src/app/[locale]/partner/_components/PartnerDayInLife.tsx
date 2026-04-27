"use client";

import { motion } from "framer-motion";
import { Coffee, Smartphone, Bell } from "lucide-react";

const MOMENTS = [
  {
    icon: Smartphone,
    text: "You visit a law firm on Rustaveli. 15 minutes. You show them the card builder on your phone. They type their name. They watch it appear on a premium digital card. They say yes. You walk out with a 350₾ sale.",
  },
  {
    icon: Coffee,
    text: "Over coffee, you message a boutique owner you met last week. They've been thinking about it. You answer their one question. They say yes. Another 250₾.",
  },
  {
    icon: Bell,
    text: "In the evening, you get a notification: last month's client just renewed their Shield. You didn't do anything. The money just arrived.",
  },
];

export function PartnerDayInLife() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            Not Abstract. Real.
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">
            A Tuesday in May
          </h2>
        </motion.div>

        <div className="space-y-6">
          {MOMENTS.map((moment, idx) => {
            const Icon = moment.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-base text-slate-300 leading-relaxed pt-1.5 sm:text-lg">
                  {moment.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center text-lg font-semibold text-white sm:text-xl"
        >
          That&apos;s the model. <span className="text-emerald-400">You sell. We build. The income compounds.</span>
        </motion.p>
      </div>
    </section>
  );
}
