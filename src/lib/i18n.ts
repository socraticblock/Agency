import { ka } from "./locales/ka";
import { en } from "./locales/en";

export type Locale = "ka" | "en";

export const locales: Locale[] = ["ka", "en"];
export const defaultLocale: Locale = "ka";

export const messages: Record<Locale, typeof en> = {
  ka,
  en,
};

export function getMessages(locale: Locale) {
  return messages[locale] ?? messages[defaultLocale];
}
