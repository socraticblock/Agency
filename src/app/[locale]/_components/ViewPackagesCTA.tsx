"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function ViewPackagesCTA() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "ka";

  return (
    <div className="flex flex-col items-center justify-center text-center gap-5 max-w-4xl w-full px-6 py-8 mx-auto">
      <div className="flex items-center gap-3 shrink-0">
        <Link
          href={`/${locale}/architect`}
          className="bg-white text-black font-space font-bold px-6 py-2.5 rounded-sm flex items-center gap-2 text-xs sm:text-sm tracking-wider hover:bg-emerald-400 transition-all shadow-lg group"
        >
          BUILD YOUR INFRASTRUCTURE
          <ArrowRight className="h-4 w-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="max-w-md">
        <p className="text-sm sm:text-base font-medium text-white/90 leading-relaxed">
          Social media is rented land. We build the digital real estate you actually own.
        </p>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Premium websites for creators who mean business.
        </p>
      </div>
    </div>
  );
}
