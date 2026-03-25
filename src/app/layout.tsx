import type { Viewport } from "next";
import "./globals.css";
import { inter, notoGeorgian, spaceGrotesk } from "@/fonts";
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
      <body
        className={`${inter.variable} ${notoGeorgian.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}
      >
        <div className="relative min-h-screen min-w-0">
          <div className="noise-overlay" aria-hidden />
          <MotionPreferences>{children}</MotionPreferences>
        </div>
      </body>
    </html>
  );
}
