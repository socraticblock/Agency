"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { WHATSAPP_INTAKE, WHATSAPP_DEFAULT_MESSAGE } from "@/constants/content";
import { MessageSquare } from "lucide-react";

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
    <footer
      id="contact"
      className="scroll-anchor-target relative flex min-h-[60vh] flex-col items-center justify-center bg-[#050505] px-4 py-20 pb-[max(5rem,env(safe-area-inset-bottom))] text-center"
    >
      <p className="text-3xl font-semibold text-slate-100 sm:text-4xl md:text-5xl">
        {t.footer.headline}
      </p>
      {t.footer.subheadline && (
        <p className="mt-4 max-w-xl text-lg text-slate-400">
          {t.footer.subheadline}
        </p>
      )}
      <nav
        aria-label="Footer navigation"
        className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-400"
      >
        <Link href={`/${locale}`} className="transition hover:text-emerald-300">
          Home
        </Link>
        <Link href={`/${locale}/pricing`} className="transition hover:text-emerald-300">
          Pricing
        </Link>
        <Link href={`/${locale}/blog`} className="transition hover:text-emerald-300">
          Blog
        </Link>
      </nav>
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
          <div className="flex items-center justify-center">
            <a 
              href={`https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-[0.2em] font-black group"
            >
              <MessageSquare className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
              <span>Contact on WhatsApp</span>
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
