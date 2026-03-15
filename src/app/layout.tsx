import "./globals.css";
import { inter, notoGeorgian, spaceGrotesk } from "@/fonts";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AmbientGlow } from "./[locale]/_components/AmbientGlow";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ka">
      <body
        className={`${inter.variable} ${notoGeorgian.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#050505] text-foreground`}
      >
        <div className="relative min-h-screen overflow-hidden">
          <AmbientGlow />
          <div className="noise-overlay" aria-hidden />
          <div className="relative z-10">
            <LenisProvider>{children}</LenisProvider>
            <CustomCursor />
          </div>
        </div>
      </body>
    </html>
  );
}
