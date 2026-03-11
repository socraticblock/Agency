"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const locales: { code: Locale; label: string }[] = [
  { code: "ka", label: "ქართ" },
  { code: "en", label: "EN" },
];

export function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = getMessages(locale);

  const basePath = pathname?.replace(/^\/(ka|en)/, "") || "/";
  const switchTo = (newLocale: Locale) => {
    router.push(`/${newLocale}${basePath}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-md">
      <nav className="relative z-50 mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={`/${locale}`} className="text-lg font-bold text-white">
          Kvali
        </Link>
        <div className="flex items-center gap-6">
          <a href="#footprint" className="text-sm text-white/90 hover:text-white">
            {t.nav.footprint}
          </a>
          <a href="#contact" className="text-sm text-white/90 hover:text-white">
            {t.nav.contact}
          </a>
          <div className="flex rounded-full bg-[#0f172a]/80 p-0.5">
            {locales.map(({ code, label }: { code: Locale; label: string }) => (
              <motion.button
                key={code}
                type="button"
                onClick={() => switchTo(code)}
                className="relative rounded-full px-3 py-1.5 text-sm font-medium text-white/80"
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -2 }}
              >
                {locale === code && (
                  <motion.span
                    layoutId="locale-pill"
                    className="pointer-events-none absolute inset-0 rounded-full bg-[#10b981]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    locale === code ? "text-white" : "text-white/70"
                  }`}
                >
                  {label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
