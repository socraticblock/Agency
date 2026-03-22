import "./globals.css";
import { inter, notoGeorgian, spaceGrotesk } from "@/fonts";
import { MotionPreferences } from "@/components/providers/MotionPreferences";

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
            <MotionPreferences>
              {children}
            </MotionPreferences>
        </div>
      </body>
    </html>
  );
}
