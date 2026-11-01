import { Inter } from "next/font/google";
import { Navbar } from "../../_components/Navbar";
import type { Locale } from "@/lib/i18n";
import "./start-shell.css";

/**
 * Inter is rendered by the /start preset tiles and the card preview
 * (presets.ts fontBody/fontHeading -> var(--font-inter)). The root layout
 * declares the same font with preload:false so the homepages never fetch it;
 * re-declaring it here, with preload on, preloads the faces on this route group
 * only. Same family, same weights, same variable, same display strategy - no
 * typography change, just an earlier request where it is actually used.
 */
const interPreload = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

function normalizeLocale(locale: string | undefined): Locale {
  if (locale && (locale === "en" || locale === "ka")) return locale;
  return "en";
}

export default async function StartLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = normalizeLocale(locale);

  return (
    <>
      <Navbar locale={lang} />
      <div className={`start-shell min-h-screen font-sans antialiased ${interPreload.variable}`}>{children}</div>
    </>
  );
}
