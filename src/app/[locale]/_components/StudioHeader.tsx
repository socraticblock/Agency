"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function StudioHeader({ locale }: { locale: string }) {
  return (
    <header className="sticky top-0 z-[100] border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl pt-[env(safe-area-inset-top,0px)]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-2 text-xl font-black tracking-tighter text-white"
        >
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-cyan-300 transition-all">
            GENEZISI
          </span>
          <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 border-l border-white/10 pl-4 ml-2">
            Architect Studio
          </span>
        </Link>

        <Link
          href={`/${locale}`}
          className="flex h-10 items-center gap-2 rounded-full bg-white/5 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all hover:bg-white/10 hover:text-white border border-white/10"
        >
          <span>Exit Studio</span>
          <X size={14} className="stroke-[3]" />
        </Link>
      </nav>
    </header>
  );
}
