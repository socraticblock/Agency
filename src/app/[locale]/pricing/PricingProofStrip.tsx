import { Quote } from "lucide-react";

export function PricingProofStrip() {
  return (
    <section
      aria-label="Trust signals"
      className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent px-6 py-8 sm:px-10"
    >
      <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
        <div className="max-w-prose">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400/90">
            Built for Georgia
          </p>
          <p className="mt-2 text-lg font-black text-white sm:text-xl">
            Local payments, RS.ge-ready commerce, and code you own — not a rental.
          </p>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-400">
            Typical delivery windows are listed per package. You always get written ownership transfer,
            warranty terms, and revision rounds in plain language before we ship.
          </p>
        </div>
        <blockquote className="relative max-w-prose border-l-2 border-emerald-500/50 pl-5">
          <Quote className="absolute -left-1 -top-1 h-5 w-5 text-emerald-500/40" aria-hidden />
          <p className="text-sm font-medium italic leading-relaxed text-slate-200">
            &ldquo;Finally a team that spoke plainly about scope, timeline, and what we actually own when
            the project ends.&rdquo;
          </p>
          <footer className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-500">
            — Service business owner, Tbilisi
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
