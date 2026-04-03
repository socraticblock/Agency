"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[locale] error boundary:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-6 px-6 py-20 text-center">
      <h1 className="text-2xl font-black text-white">Something went wrong</h1>
      <p className="text-sm text-slate-400">
        Please try again. If the problem continues, contact us on WhatsApp from the footer.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400"
        >
          Try again
        </button>
        <Link
          href="/en"
          className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/5"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
