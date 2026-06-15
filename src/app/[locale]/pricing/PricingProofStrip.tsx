import { CheckCircle2, Quote } from "lucide-react";

const proofPoints = [
  "Written ownership transfer",
  "Clear delivery window",
  "Warranty included",
];

export function PricingProofStrip() {
  return (
    <section
      aria-label="Trust signals"
      className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent px-6 py-8 sm:px-10"
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
        <div className="max-w-prose">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400/90">
            Built for serious local businesses
          </p>
          <p className="mt-2 text-lg font-black text-white sm:text-xl">
            Clinics, studios, coaches, shops, consultants, and service teams get a website they own, not rented template space.
          </p>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-400">
            Typical delivery windows are listed per package. You always get written ownership transfer,
            warranty terms, and revision rounds in plain language before we ship.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <div
                key={point}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-bold text-slate-200"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                {point}
              </div>
            ))}
          </div>
        </div>
        <blockquote className="relative max-w-prose border-l-2 border-emerald-500/50 pl-5">
          <Quote className="absolute -left-1 -top-1 h-5 w-5 text-emerald-500/40" aria-hidden />
          <p className="text-sm font-medium italic leading-relaxed text-slate-200">
            &ldquo;Finally a team that spoke plainly about scope, timeline, and what we actually own when
            the project ends.&rdquo;
          </p>
          <footer className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-500">
            - Service business owner, Tbilisi
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
