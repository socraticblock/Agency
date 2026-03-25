"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const phases = [
  {
    title: "Phase 1: Discovery & Strategy",
    desc: "We analyze your current social media workflow, identify bottlenecks, and map out a site structure designed specifically to automate your biggest headaches.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    ),
  },
  {
    title: "Phase 2: Custom Design & UX",
    desc: "No cheap templates. We craft a professional, mobile-first design that elevates your brand identity and builds immediate trust with visitors.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
    ),
  },
  {
    title: "Phase 3: Integration & Automations",
    desc: "We wire up the magic: payment gateways, automated booking forms, email marketing lists, and CRM connections.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ),
  },
  {
    title: "Phase 4: Launch & Handover",
    desc: "We launch your new business hub, ensure proper SEO indexing, and teach you how to easily manage your new digital real estate.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.98 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
};

export function RoadmapTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  /* Direct mapping avoids spring RAF work that can jank real touch devices. */
  const scaleY = useTransform(scrollYProgress, (v) => v);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto overflow-hidden">
      {/* Absolute Ambient Background Noise Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3F%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      />

      <motion.div 
        className="text-center max-w-3xl mx-auto mb-16"
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold border border-emerald-500/20 px-2 py-0.5 rounded-full bg-emerald-500/5 mb-2 inline-block">Strategist Active</span>
        <h2 className="text-4xl font-black text-slate-100 mb-3 tracking-tight font-space">Your Roadmap to Independence</h2>
        <p className="text-base text-slate-400">
          Moving off rented land and onto your own platform is a 4-step process. Here is how we make it seamless.
        </p>
      </motion.div>

      <div className="relative max-w-3xl mx-auto">
        {/* Continuous Absolute Vertical Scroll Path Nodes */}
        <div className="absolute left-[13px] sm:left-[17px] top-4 bottom-4 w-0.5 bg-slate-800/80 rounded-full" />
        <motion.div 
          className="absolute left-[13px] sm:left-[17px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-full origin-top shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
          style={{ scaleY, willChange: "transform" }}
        />

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -12% 0px", amount: 0.08 }}
          className="relative flex flex-col gap-10"
        >
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex gap-5 sm:gap-8 group"
            >
              <div className="relative flex flex-col items-center z-10">
                <motion.div
                  className="w-7 h-7 rounded-xl bg-[#0b0b0b] border border-emerald-500/30 flex items-center justify-center font-mono text-[11px] font-black text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.1)] group-hover:scale-110 group-hover:border-emerald-400 transition-all duration-300"
                >
                  {i + 1}
                </motion.div>
                <div className="absolute top-0 w-7 h-7 rounded-xl bg-emerald-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="flex-grow glass-card backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] group-hover:bg-white/[0.01]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-slate-400 group-hover:text-emerald-400 transition-colors">
                    {phase.icon}
                  </div>
                  <h3 className="text-base font-black text-slate-100 tracking-tight font-space group-hover:text-emerald-300 transition-colors">
                    {phase.title}
                  </h3>
                </div>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed font-medium">
                  {phase.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
