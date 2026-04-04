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
  weight: ["300", "400", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  weight: ["400", "700"],
  variable: "--font-noto-georgian",
  display: "swap",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

export const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-source-sans",
  display: "swap",
});
