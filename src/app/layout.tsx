import "./globals.css";
import { inter, notoGeorgian } from "@/fonts";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ka">
      <body
        className={`${inter.variable} ${notoGeorgian.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
