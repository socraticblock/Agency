"use client";

import Link from "next/link";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { WHATSAPP_INTAKE, WHATSAPP_DEFAULT_MESSAGE } from "@/constants/content";
import { MessageSquare } from "lucide-react";

/** Shared legacy footer, distinct from the approved homepage footer. */
export function GlobalFooter({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const contact = `https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;
  return (
    <footer id="contact" className="relative flex min-h-[45vh] flex-col items-center justify-center bg-[#050505] px-4 py-16 pb-[max(4rem,env(safe-area-inset-bottom))] text-center">
      <p className="max-w-2xl text-3xl font-semibold text-slate-100 sm:text-4xl">{t.footer.headline}</p>
      {t.footer.subheadline && <p className="mt-4 max-w-xl text-lg text-slate-400">{t.footer.subheadline}</p>}
      <nav aria-label="Footer navigation" className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-400">
        <Link href={`/${locale}`} className="hover:text-emerald-300">{locale === "ka" ? "მთავარი" : "Home"}</Link>
        <Link href={`/${locale}/work`} className="hover:text-emerald-300">{locale === "ka" ? "ნამუშევრები" : "Work"}</Link>
        <Link href={`/${locale}/pricing`} className="hover:text-emerald-300">{locale === "ka" ? "სერვისები" : "Services"}</Link>
      </nav>
      <a href={contact} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-400/50 px-6 text-sm font-semibold text-emerald-300 hover:border-emerald-300 hover:text-emerald-200">
        <MessageSquare className="h-4 w-4" aria-hidden />
        {locale === "ka" ? "კონტაქტი WhatsApp-ზე" : "Contact on WhatsApp"}
      </a>
      <p className="mt-9 text-xs text-slate-500">© Genezisi</p>
    </footer>
  );
}
