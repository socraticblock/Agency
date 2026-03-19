"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { MagneticButton } from "./MagneticButton";

export function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = getMessages(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-md">
      <nav className="relative z-50 mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={`/${locale}`} className="text-lg font-bold text-white">
          Kvali
        </Link>
        <div className="flex items-center gap-6">
          <Link href={`/${locale}/architect`} className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
            Start Building
          </Link>
          <a href="#footprint" className="text-sm text-white/90 hover:text-white">
            {t.nav.footprint}
          </a>
          <a href="#contact" className="text-sm text-white/90 hover:text-white">
            {t.nav.contact}
          </a>

          <MagneticButton
            as={Link}
            href={`/${locale}/apply`}
            magneticStrength={10}
            textStrength={5}
            className="hidden rounded-full bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-200 transition-colors hover:bg-emerald-500/30 sm:block"
          >
            {t.nav.cta}
          </MagneticButton>
        </div>
      </nav>
    </header>
  );
}
