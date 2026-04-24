import type { Viewport } from "next";
import "./globals.css";
import {
  inter,
  merriweather,
  notoGeorgian,
  playfairDisplay,
  sourceSans3,
  spaceGrotesk,
} from "@/fonts";
import { MotionPreferences } from "@/components/providers/MotionPreferences";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#060c22",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://stream.mux.com" />
        <link rel="preconnect" href="https://image.mux.com" />
      </head>
      <body
        className={`${inter.variable} ${notoGeorgian.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable} ${merriweather.variable} ${sourceSans3.variable} font-sans antialiased bg-background text-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-emerald-500 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          Skip to content
        </a>
        <div className="relative min-h-screen min-w-0">
          <div className="noise-overlay" aria-hidden />
          <MotionPreferences>{children}</MotionPreferences>
        </div>
      </body>
    </html>
  );
}
