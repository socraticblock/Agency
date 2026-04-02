"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { MagneticButton } from "./MagneticButton";
import { motion, AnimatePresence } from "framer-motion";
import { acquireBodyScrollLock } from "@/lib/bodyScrollLock";

export function Navbar({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    return acquireBodyScrollLock("default");
  }, [open]);

  const close = () => setOpen(false);

  const navLinks = [
    { href: `/${locale}/pricing`, label: "Pricing", highlight: false },
    { href: `/${locale}/architect`, label: "Start Building", highlight: true },
  ];

  return (
    <>
      <header 
        className={`sticky top-0 z-[100] border-b border-white/5 bg-slate-950/80 backdrop-blur-xl pt-[env(safe-area-inset-top,0px)] transition-opacity duration-300 ${open ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href={`/${locale}`}
            className="group flex items-center gap-2 text-xl font-black tracking-tighter text-white"
            onClick={close}
          >
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-cyan-300 transition-all">
              GENEZISI
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold transition-colors ${
                  link.highlight ? "text-emerald-400" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white lg:hidden border border-white/10"
            aria-label="Open menu"
          >
            <Menu size={22} className="stroke-[2.5]" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex flex-col bg-slate-950 pt-[env(safe-area-inset-top,0px)] lg:hidden"
          >
            {/* Overlay Header with its own Logo & Close Trigger */}
            <div className="flex h-16 items-center justify-between px-6 border-b border-white/5">
              <span className="text-xl font-black tracking-tighter text-white/20">GENEZISI</span>
              <button
                onClick={close}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white border border-white/20"
                aria-label="Close menu"
              >
                <X size={22} className="stroke-[2.5]" />
              </button>
            </div>

            {/* Links area - Generous padding-top (32) to clear the header area completely */}
            <div className="flex-1 overflow-y-auto px-10 pt-24 pb-20">
              <div className="flex flex-col gap-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      className={`block text-5xl font-black tracking-tight transition-all active:scale-95 ${
                        link.highlight ? "text-emerald-400 shadow-emerald-500/10" : "text-white/80"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

              </div>
            </div>

            <div className="p-10 text-center opacity-40">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                © {new Date().getFullYear()} Genezisi Digital
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


