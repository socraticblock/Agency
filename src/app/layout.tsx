import "./globals.css";
import { inter, notoGeorgian } from "@/fonts";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ka">
      <body
        className={`${inter.variable} ${notoGeorgian.variable} font-sans antialiased bg-[#050505] text-foreground`}
      >
        <div className="relative min-h-screen overflow-hidden">
          <div
            className="pointer-events-none fixed inset-0 z-0 opacity-40 mix-blend-overlay"
            style={{
              backgroundImage:
                "url(/noise.png), radial-gradient(circle at top, rgba(148,163,184,0.12), transparent 55%)",
              backgroundSize: "280px 280px, auto",
            }}
          />
          <div className="relative z-10">
            <LenisProvider>{children}</LenisProvider>
            <CustomCursor />
          </div>
        </div>
      </body>
    </html>
  );
}
