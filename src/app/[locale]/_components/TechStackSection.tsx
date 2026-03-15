"use client";

import { motion } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function TechStackSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const { tagline, label, items } = t.pointOneStack;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 pt-2 sm:px-6 relative">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
          {label}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-100 sm:text-3xl">
          {tagline}
        </h2>
      </div>
      <div 
        className="mt-8 flex flex-col gap-4 sm:mx-auto x-ray-zone group/xray"
        onMouseMove={handleMouseMove}
      >
        {items.map(
          (item: (typeof items)[number], i: number) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative isolate z-10 mb-4 flex flex-col gap-3 p-6 last:mb-0 md:flex-row md:items-start md:gap-6 overflow-hidden clay-card clay-card-hover border-emerald-500/40 shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2),0_0_30px_rgba(16,185,129,0.15)]"
          >
            {/* Background Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }}
            />
            
            {/* Mouse tracking radial highlight */}
            <div 
              className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover/xray:opacity-100"
              style={{
                background: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(16,185,129,0.12), transparent 40%)",
              }}
            />
            
            {/* Mouse tracking border highlight using CSS mask */}
            <div 
              className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/xray:opacity-100"
              style={{
                background: "radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(52,211,153,0.4), transparent 40%)",
                maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "1px",
              }}
            />

            <div className="md:w-[30%] md:shrink-0 relative z-10">
              <h3 className="font-bold text-emerald-400">{item.name}</h3>
            </div>
            <div className="min-w-0 md:w-[70%] max-w-[640px] mx-auto md:mx-0 relative z-10">
              <p className="mb-1.5 font-medium text-white">{item.headline}</p>
              {"sublabel" in item && item.sublabel && (
                <p className="mb-2 text-sm italic text-emerald-300/90">
                  {item.sublabel}
                </p>
              )}
              <p className="text-sm leading-relaxed text-slate-400">
                {item.body}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
