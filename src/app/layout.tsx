import "./globals.css";
import { inter, notoGeorgian, spaceGrotesk } from "@/fonts";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { MotionPreferences } from "@/components/providers/MotionPreferences";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${notoGeorgian.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}
      >
        <div className="relative min-h-screen overflow-hidden">
          <div className="noise-overlay" aria-hidden />
          <div className="relative z-10">
            <MotionPreferences>
              <LenisProvider>{children}</LenisProvider>
            </MotionPreferences>
            <CustomCursor />
          </div>
        </div>
      </body>
    </html>
  );
}
