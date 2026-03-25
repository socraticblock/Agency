"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { MagneticButton } from "./MagneticButton";

export function Navbar({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = panelRef.current?.querySelector<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    focusable?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  const navLinks = (
    <>
      <Link
        href={`/${locale}/architect`}
        onClick={close}
        className="flex min-h-11 items-center rounded-lg px-3 text-sm font-bold text-emerald-400 transition-colors hover:bg-white/5 hover:text-emerald-300 lg:min-h-0 lg:px-0 lg:text-sm"
      >
        Start Building
      </Link>
      <a
        href="#footprint"
        onClick={close}
        className="flex min-h-11 items-center rounded-lg px-3 text-sm text-white/90 transition-colors hover:bg-white/5 hover:text-white lg:min-h-0 lg:px-0"
      >
        {t.nav.footprint}
      </a>
      <a
        href="#contact"
        onClick={close}
        className="flex min-h-11 items-center rounded-lg px-3 text-sm text-white/90 transition-colors hover:bg-white/5 hover:text-white lg:min-h-0 lg:px-0"
      >
        {t.nav.contact}
      </a>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-md pt-[env(safe-area-inset-top,0px)]">
      <nav
        className="relative z-50 mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Main"
      >
        <Link
          href={`/${locale}`}
          className="text-lg font-bold text-white"
          onClick={close}
        >
          Genezisi
        </Link>

        <div className="hidden items-center gap-6 lg:flex">{navLinks}</div>

        <div className="hidden items-center gap-4 lg:flex">
          <MagneticButton
            as={Link}
            href={`/${locale}/apply`}
            magneticStrength={10}
            textStrength={5}
            className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-200 transition-colors hover:bg-emerald-500/30"
          >
            {t.nav.cta}
          </MagneticButton>
        </div>

        <div className="relative z-[60] flex items-center gap-2 lg:hidden">
          <MagneticButton
            as={Link}
            href={`/${locale}/apply`}
            magneticStrength={6}
            textStrength={3}
            className="rounded-full bg-emerald-500/20 px-3 py-2 text-xs font-semibold text-emerald-200 transition-colors hover:bg-emerald-500/30"
          >
            {t.nav.cta}
          </MagneticButton>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative z-[60] inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-[55] touch-manipulation bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={close}
          />
          <div
            ref={panelRef}
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-y-0 right-0 z-[60] flex w-[min(100vw,20rem)] flex-col border-l border-white/10 bg-[#0f172a]/98 py-4 pl-4 pr-[max(1rem,env(safe-area-inset-right))] pt-[max(1rem,calc(env(safe-area-inset-top)+0.5rem))] shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
              {navLinks}
            </div>
            <p className="mt-auto pb-[max(1rem,env(safe-area-inset-bottom))] pt-6 text-xs text-slate-500">
              Genezisi Digital
            </p>
          </div>
        </>
      )}
    </header>
  );
}
