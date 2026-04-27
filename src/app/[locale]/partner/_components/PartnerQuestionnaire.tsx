"use client";

import { motion } from "framer-motion";
import {
  User,
  Layout,
  Image,
  Briefcase,
  Globe,
  Settings,
  Puzzle,
} from "lucide-react";

const SECTIONS = [
  { icon: User, title: "Who they are", desc: "Name, company, industry, target audience" },
  { icon: Layout, title: "What they want", desc: "Card or Studio? Which tier? Sites they admire? Specific features?" },
  { icon: Image, title: "Their content", desc: "Photos, logo, existing copy. Do they need professional copywriting?" },
  { icon: Briefcase, title: "Their business details", desc: "Services, testimonials, team, gallery, awards" },
  { icon: Globe, title: "Language", desc: "English or Georgian included. Additional language: 150₾ + translation" },
  { icon: Settings, title: "Technical needs", desc: "Payments? Booking? Multi-language? Custom domain?" },
  { icon: Puzzle, title: "Add-ons", desc: "Any additional modules from the Genezisi catalog (Studio clients only)" },
];

export function PartnerQuestionnaire() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            Your Selling System
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">
            You&apos;re not guessing. You have a system.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            When a client is interested, you walk them through our structured intake.
            It captures everything we need to build — no back-and-forth, no missing information.
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2">
          {SECTIONS.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{section.title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{section.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6 text-center text-sm text-emerald-300 font-semibold"
        >
          Fill in the fields, submit the Work Order in English, we build. Simple.
        </motion.p>
      </div>
    </section>
  );
}
