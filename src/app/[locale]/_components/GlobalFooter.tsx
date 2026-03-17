"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function GlobalFooter({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const [deployedDate, setDeployedDate] = useState("");

  useEffect(() => {
    setDeployedDate(new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }));
  }, []);
  const ctaX = useMotionValue(0);
  const ctaY = useMotionValue(0);
  const springX = useSpring(ctaX, { stiffness: 300, damping: 26 });
  const springY = useSpring(ctaY, { stiffness: 300, damping: 26 });

  const handleCtaMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    const strength = 10;
    ctaX.set(relX * strength);
    ctaY.set(relY * strength);
  };

  const handleCtaLeave = () => {
    ctaX.set(0);
    ctaY.set(0);
  };

  return (
    <footer id="contact" className="relative flex min-h-[60vh] flex-col items-center justify-center bg-[#050505] px-4 py-20 text-center">
      <p className="text-3xl font-semibold text-slate-100 sm:text-4xl md:text-5xl">
        {t.footer.headline}
      </p>
      {t.footer.subheadline && (
        <p className="mt-4 max-w-xl text-lg text-slate-400">
          {t.footer.subheadline}
        </p>
      )}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-10"
      >
        <motion.a
          href={`/${locale}/apply`}
          onMouseMove={handleCtaMove}
          onMouseLeave={handleCtaLeave}
          style={{ x: springX, y: springY }}
          whileTap={{ scale: 0.98 }}
          whileHover={{ y: -2 }}
          className="group relative inline-block overflow-hidden rounded-full border border-emerald-400/60 bg-emerald-500/10 px-8 py-3 text-sm font-semibold text-emerald-100 shadow-[0_0_40px_rgba(16,185,129,0.25)] transition-colors hover:bg-emerald-500/20"
        >
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.4),_transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative z-10">{t.footer.cta}</span>
        </motion.a>
        {t.footer.disclaimer && (
          <p className="mt-6 text-sm text-slate-500 max-w-sm mx-auto">
            {t.footer.disclaimer}
          </p>
        )}
      </motion.div>
      {/* Performance Widget */}
      <div className="absolute bottom-6 left-0 right-0 border-t border-white/5 pt-4 px-4 w-full">
        <div className="grid grid-cols-3 max-w-4xl mx-auto text-[10px] font-mono text-slate-500/80">
          <div className="flex items-center justify-center gap-1.5 border-r border-white/5">
            <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
            <span>Network: Vercel Edge (Tbilisi)</span>
          </div>
          <div className="flex items-center justify-center border-r border-white/5">
            <span>Stack: Next.js 19 / Tailwind 4</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <a href="https://t.me/socraticblock" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider">
              t.me/socraticblock
            </a>
          </div>
        </div>
        <p className="mt-2 text-center text-[7px] font-mono text-slate-500/30 uppercase tracking-widest gap-1 flex items-center justify-center">
          Infrastructure Status: <span className="text-emerald-500/50">Active</span> <span className="text-slate-500/20">|</span> Last Deployment: <span className="text-slate-500/60">{deployedDate}</span>
        </p>
      </div>
    </footer>
  );
}
