import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">404</p>
      <h1 className="text-2xl font-black text-white">Page not found</h1>
      <p className="text-sm text-slate-400">
        This URL does not exist or was moved. Try the home page, pricing, or the Architect Studio.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/en"
          className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400"
        >
          Home
        </Link>
        <Link
          href="/en/pricing"
          className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/5"
        >
          Pricing
        </Link>
        <Link
          href="/en/architect"
          className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/5"
        >
          Architect
        </Link>
      </div>
    </div>
  );
}
