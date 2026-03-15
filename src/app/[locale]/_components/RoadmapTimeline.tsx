"use client";

import { motion } from "framer-motion";

const phases = [
  {
    title: "Phase 1: Discovery & Strategy",
    desc: "We analyze your current social media workflow, identify bottlenecks, and map out a site structure designed specifically to automate your biggest headaches.",
  },
  {
    title: "Phase 2: Custom Design & UX",
    desc: "No cheap templates. We craft a professional, mobile-first design that elevates your brand identity and builds immediate trust with visitors.",
  },
  {
    title: "Phase 3: Integration & Automations",
    desc: "We wire up the magic: payment gateways, automated booking forms, email marketing lists, and CRM connections.",
  },
  {
    title: "Phase 4: Launch & Handover",
    desc: "We launch your new business hub, ensure proper SEO indexing, and teach you how to easily manage your new digital real estate.",
  },
];

export function RoadmapTimeline() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold text-slate-100 mb-4">Your Roadmap to Independence</h2>
        <p className="text-lg text-slate-400">
          Moving off rented land (Instagram, Facebook, TikTok) and onto your own platform is a 4-step process. Here is how we make it seamless.
        </p>
      </div>

      <div className="max-w-3xl mx-auto py-12 px-6 sm:px-12 bg-slate-900/40 rounded-3xl shadow-2xl border border-slate-800/50">
        <div className="flex flex-col">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.15 }}
              className="flex gap-6 sm:gap-8"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.2, type: "spring" }}
                  className="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-slate-900 z-10 mt-1.5 flex-shrink-0"
                />
                {i !== phases.length - 1 && (
                  <div className="w-0.5 flex-grow bg-slate-800 my-2" />
                )}
              </div>
              <div className={`${i !== phases.length - 1 ? "pb-12" : ""}`}>
                <h3 className="text-xl font-bold text-emerald-400">{phase.title}</h3>
                <p className="mt-2 text-slate-300">{phase.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
