import type { Viewport } from "next";
import type { Locale } from "@/lib/i18n";
import { HOME_HTML_LANG, isHomeLocale } from "@/lib/home-i18n";
import { LangSetter } from "@/components/providers/LangSetter";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Document language for this subtree.
 *
 * EN/KA keep the values they have always had here. `nl` is the homepage-only
 * addition, and it needs the region subtag: the same word is spelled
 * differently in Belgium and the Netherlands.
 */
function contentLanguage(locale: string | undefined): string {
  if (locale && isHomeLocale(locale) && locale === "nl") return HOME_HTML_LANG.nl;
  return normalizeLegacyLocale(locale);
}

function normalizeLegacyLocale(locale: string | undefined): Locale {
  if (locale && (locale === "en" || locale === "ka")) return locale;
  return "en";
}

/**
 * Sitewide legacy metadata used to live here. It moved into the `(site)` route
 * group so that the V2 homepage can own its metadata outright — otherwise the
 * homepage inherited a second, contradictory canonical and a second
 * organization graph. Nothing about legacy pages changed.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = contentLanguage(locale);

  return (
    <>
      <LangSetter lang={lang} />
      <div id="main-content" lang={lang} className={`locale-${lang}`} tabIndex={-1}>
        {children}
      </div>
    </>
  );
}
