export default function LocaleLoading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 py-24">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500/30 border-t-emerald-400"
        aria-hidden
      />
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Loading…</p>
    </div>
  );
}
