"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_INTAKE } from "@/constants/content";
import { Menu, MessageCircle, X } from "lucide-react";

const contactHref = `https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;

export function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const hideForPreview = pathname?.endsWith("/start/preview") ?? false;

  useEffect(() => {
    if (hideForPreview) return;
    lastScrollYRef.current = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;
      if (currentY <= 24 || delta < -6) setIsNavVisible(true);
      else if (delta > 6) setIsNavVisible(false);
      lastScrollYRef.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideForPreview, pathname]);

  const links = [
    { href: `/${locale}`, label: locale === "ka" ? "მთავარი" : "Home" },
    { href: `/${locale}/work`, label: locale === "ka" ? "ნამუშევრები" : "Work" },
    { href: `/${locale}/pricing`, label: locale === "ka" ? "სერვისები" : "Services" },
  ];

  if (hideForPreview) return null;
  return (
    <header className={`sticky top-0 z-[100] border-b border-white/10 bg-[#030812]/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl transition-transform duration-300 ${isNavVisible ? "translate-y-0" : "-translate-y-[115%]"}`}>
      <nav aria-label={locale === "ka" ? "მთავარი ნავიგაცია" : "Main navigation"} className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="font-space shrink-0 text-lg font-black uppercase tracking-[0.24em] text-emerald-300 transition hover:text-cyan-300 sm:text-xl sm:tracking-[0.4em]">Genezisi</Link>
        <div className="hidden items-center gap-8 text-sm font-semibold text-slate-200 lg:flex">
          {links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className="transition hover:text-emerald-300">{link.label}</Link>)}
        </div>
        <div className="flex items-center gap-3">
          <a href={contactHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 text-sm font-black text-slate-950 sm:px-5">
            <MessageCircle className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">{locale === "ka" ? "პროექტის განხილვა" : "Discuss a project"}</span>
            <span className="sr-only sm:hidden">{locale === "ka" ? "მოგვწერეთ WhatsApp-ზე" : "Contact on WhatsApp"}</span>
          </a>
          <button type="button" aria-controls="genezisi-mobile-nav" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white lg:hidden">
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <nav id="genezisi-mobile-nav" aria-label={locale === "ka" ? "მობილური ნავიგაცია" : "Mobile navigation"} className="border-t border-white/10 bg-slate-950/95 px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {links.map(link => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold text-slate-200">{link.label}</Link>)}
          </div>
        </nav>
      )}
    </header>
  );
}
