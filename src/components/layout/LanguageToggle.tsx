"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function LanguageToggle() {
  const pathname = usePathname();
  const router = useRouter();

  if (!pathname) return null;

  const segments = pathname.split("/");
  const currentLocale = segments[1];
  const isKa = currentLocale === "ka";

  const handleToggle = () => {
    const nextLocale = isKa ? "en" : "ka";
    segments[1] = nextLocale;
    const newPath = segments.join("/") || "/";
    router.push(newPath); // Instant client-side transition with next/navigation
  };

  return (
    <motion.button
      onClick={handleToggle}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs font-semibold backdrop-blur-md shadow-2xl hover:border-white/20 transition-all cursor-pointer group"
    >
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white group-hover:bg-emerald-500 group-hover:text-black transition-all">
        {isKa ? "KA" : "EN"}
      </div>
      <span className="text-slate-300 group-hover:text-white transition-colors">
        {isKa ? "Switch to English" : "ქართული"}
      </span>
    </motion.button>
  );
}
