/**
 * Homepage-only localization registry.
 *
 * `src/lib/i18n.ts` (`Locale = "en" | "ka"`) stays untouched: the legacy routes
 * behind it were never translated, and widening it would let old callers render
 * English under a Dutch locale. Only the V2 homepage speaks three languages, so
 * it gets its own narrow, exhaustive registry instead.
 */
export const HOME_LOCALES = ["en", "ka", "nl"] as const;

export type HomeLocale = (typeof HOME_LOCALES)[number];

export const HOME_DEFAULT_LOCALE: HomeLocale = "en";

/** `<link rel="alternate" hreflang>` value per homepage language. */
export const HOME_HREFLANG: Record<HomeLocale, string> = {
  en: "en",
  ka: "ka-GE",
  nl: "nl-BE",
};

/** Language of the homepage content itself (the `lang` attribute). */
export const HOME_HTML_LANG: Record<HomeLocale, string> = {
  en: "en",
  ka: "ka-GE",
  nl: "nl-BE",
};

/** `og:locale` value per homepage language. */
export const HOME_OG_LOCALE: Record<HomeLocale, string> = {
  en: "en_US",
  ka: "ka_GE",
  nl: "nl_BE",
};

/** Visible language-switcher labels, in switcher order. */
export const HOME_LOCALE_LABEL: Record<HomeLocale, string> = {
  en: "EN",
  ka: "KA",
  nl: "NL",
};

export function isHomeLocale(value: string): value is HomeLocale {
  return (HOME_LOCALES as readonly string[]).includes(value);
}
