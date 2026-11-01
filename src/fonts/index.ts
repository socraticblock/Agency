import {
  Inter,
  Merriweather,
  Noto_Sans_Georgian,
  Playfair_Display,
  Source_Sans_3,
  Space_Grotesk,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
  // Not used by any element on the homepages (measured 2026-11-01: the hero H1,
  // nav and body all resolve to the ui-sans-serif stack), but still referenced
  // by the /start card presets. Without preload the face is fetched only by the
  // routes that actually render it; the 49 KB download leaves the homepage
  // critical path. Typography is unchanged: no rendered element resolves to it.
  preload: false,
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-georgian",
  display: "swap",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
  display: "swap",
  preload: false,
});

export const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-source-sans",
  display: "swap",
  preload: false,
});
