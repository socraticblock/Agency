import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import {
  inter,
  merriweather,
  notoGeorgian,
  playfairDisplay,
  sourceSans3,
  spaceGrotesk,
} from "@/fonts";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#060c22",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://genezisi.com"),
  // Bing Webmaster Tools ownership proof (added 2026-10-29). It has to stay: a
  // removed tag drops the site back to unverified, which makes every tool page in
  // WMT read "User is unauthorized to access the site."
  verification: {
    other: {
      "msvalidate.01": "2FBB284D9E12D4EE1C7293F92F118AA0",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Set by middleware from the first path segment, so the *initial* server HTML
  // carries the correct document language instead of always "en".
  const lang = (await headers()).get("x-doc-lang") ?? "en";
  return (
    <html lang={lang}>
      <body
        className={`${inter.variable} ${notoGeorgian.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable} ${merriweather.variable} ${sourceSans3.variable} font-sans antialiased bg-background text-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-cyan-200 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-100"
        >
          Skip to content
        </a>
        <div className="relative min-h-screen min-w-0">
          <div className="noise-overlay" aria-hidden />
          {children}
        </div>
      </body>
    </html>
  );
}
