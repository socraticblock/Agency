"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

const START_OVERLAY_OPEN_EVENT = "genezisi:start-overlay-open";

export function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
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
    { href: `/${locale}/pricing`, label: "Pricing", highlight: false },
    { href: `/${locale}/start`, label: "Digital card", highlight: false },
    { href: `/${locale}/architect`, label: "Start Building", highlight: true },
  ];

  const openStartOverlay = (view: "pricing" | "faq") => {
    if (!isStartRoute || typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent(START_OVERLAY_OPEN_EVENT, {
        detail: { view },
      }),
    );
  };

  if (hideForRoute) return null;

  return (
    <header
      className={`sticky top-0 z-[100] border-b border-white/5 bg-slate-950/80 backdrop-blur-xl pt-[env(safe-area-inset-top,0px)] transition-transform duration-300 ${
        isNavVisible ? "translate-y-0" : "-translate-y-[115%]"
      }`}
    >
      <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href={`/${locale}`}
          className="group flex shrink-0 items-center gap-2 text-xl font-black tracking-tighter text-white"
        >
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent transition-all group-hover:from-emerald-300 group-hover:to-cyan-300">
            GENEZISI
          </span>
        </Link>

        {isStartRoute ? (
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => openStartOverlay("pricing")}
              className="text-xs font-bold text-white/70 transition-colors hover:text-white sm:text-sm"
            >
              Pricing card
            </button>
            <button
              type="button"
              onClick={() => openStartOverlay("faq")}
              className="text-xs font-bold text-white/70 transition-colors hover:text-white sm:text-sm"
            >
              Questions?
            </button>
          </div>
        ) : (
          <div className="flex max-w-[min(100%,28rem)] flex-wrap items-center justify-end gap-x-3 gap-y-1 sm:gap-x-6">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap text-xs font-bold transition-colors sm:text-sm ${
                    active
                      ? "text-emerald-400 underline decoration-emerald-500/60 underline-offset-4"
                      : link.highlight
                        ? "text-emerald-400/90 hover:text-emerald-300"
                        : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}
