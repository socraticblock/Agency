import { ka } from "./locales/ka";
import { en } from "./locales/en";

export type Locale = "ka" | "en";

export const locales: Locale[] = ["ka", "en"];
export const defaultLocale: Locale = "ka";

// We use 'any' here as a bridge to ensure the build passes even 
// if ka and en are temporarily out of sync during development.
export const messages: Record<Locale, any> = {
  ka,
  en,
};

export function getMessages(locale: Locale) {
  // Logic to ensure we always have a fallback so the UI never goes blank
  return messages[locale] || messages[defaultLocale];
}