"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_INTAKE } from "@/constants/content";
import { Menu, MessageCircle, X } from "lucide-react";

const START_OVERLAY_OPEN_EVENT = "genezisi:start-overlay-open";
const waHref = `https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE,
)}`;

export function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const hideForRoute = pathname?.endsWith("/start/preview") ?? false;
  const isStartRoute = pathname?.endsWith("/start") ?? false;

  useEffect(() => {
    if (hideForRoute) return;
    lastScrollYRef.current = window.scrollY;
    setIsNavVisible(true);

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;

      if (currentY <= 24) {
        setIsNavVisible(true);
      } else if (delta > 6) {
        setIsNavVisible(false);
      } else if (delta < -6) {
        setIsNavVisible(true);
      }
      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideForRoute, pathname]);

  const navLinks = [
    { href: `/${locale}/work`, label: "Work" },
    { href: `/${locale}/pricing`, label: "Packages" },
    { href: `/${locale}#process`, label: "Process" },
    { href: `/${locale}/pricing#pricing-faq`, label: "FAQ" },
    { href: `/${locale}/start`, label: "Digital Card" },
  ];

  const openStartOverlay = (view: "welcome" | "pricing" | "faq") => {
    if (!isStartRoute || typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent(START_OVERLAY_OPEN_EVENT, {
        detail: { view },
      }),
    );
  };

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    const hrefPath = href.split("#")[0];
    return pathname === hrefPath;
  };

  if (hideForRoute) return null;

  return (
    <header
      className={`sticky top-0 z-[100] border-b border-white/10 bg-[#030812]/85 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl transition-transform duration-300 ${
        isNavVisible ? "translate-y-0" : "-translate-y-[115%]"
      }`}
    >
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="font-space shrink-0 text-lg font-black uppercase tracking-[0.34em] text-emerald-300 transition hover:text-cyan-300 sm:text-xl sm:tracking-[0.48em]"
        >
          Genezisi
        </Link>

        {isStartRoute ? (
          <div className="absolute left-1/2 flex max-w-[min(100vw-5rem,28rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-6">
            <button
              type="button"
              onClick={() => openStartOverlay("welcome")}
              className="text-xs font-bold text-emerald-400 transition-colors hover:text-emerald-300 sm:text-sm"
            >
              Card welcome
            </button>
            <button
              type="button"
              onClick={() => openStartOverlay("pricing")}
              className="text-xs font-bold text-emerald-400 transition-colors hover:text-emerald-300 sm:text-sm"
            >
              Pricing card
            </button>
            <button
              type="button"
              onClick={() => openStartOverlay("faq")}
              className="text-xs font-bold text-emerald-400 transition-colors hover:text-emerald-300 sm:text-sm"
            >
              Questions?
            </button>
          </div>
        ) : (
          <div className="hidden items-center gap-10 text-sm font-bold text-slate-200 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap transition-colors ${
                    active
                      ? "text-emerald-400 underline decoration-emerald-500/60 underline-offset-4"
                      : "text-slate-200 hover:text-emerald-300"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 text-sm font-black text-slate-950 shadow-[0_0_28px_rgba(16,185,129,0.28)] transition hover:scale-[1.02] sm:px-5"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Discuss my website</span>
          </a>
          {!isStartRoute && (
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </nav>
      {!isStartRoute && menuOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold text-slate-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
