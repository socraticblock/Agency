"use client";

/**
 * Operator runbook: same deployment for all tiers — DNS + Vercel + card_domains maps custom hosts to /en/c/{slug}.
 */
export function AdminOrdersRunbook() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-4">
      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-700 shadow-sm">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">What to do per tier</h2>
        <ul className="space-y-4">
          <li>
            <p className="font-semibold text-slate-900">Subdomain</p>
            <ol className="mt-1 list-decimal space-y-1 pl-5 text-[13px] leading-relaxed">
              <li>
                Internal target is saved as <strong>publish slug</strong> (customer hint or name-based). Live URL:{" "}
                <code className="rounded bg-white px-1 text-xs">genezisi.com/en/c/{"{slug}"}</code>.
              </li>
              <li>
                <strong>Preview</strong> pending order → <strong>Publish</strong> when ready → send the customer the live
                Genezisi link.
              </li>
              <li>
                Optional later: add a <strong>custom host</strong> in the preview modal after DNS points to Vercel (same
                card, no separate repo).
              </li>
            </ol>
          </li>
          <li>
            <p className="font-semibold text-slate-900">Professional</p>
            <ol className="mt-1 list-decimal space-y-1 pl-5 text-[13px] leading-relaxed">
              <li>
                Same Next.js app and DB — <strong>no separate GitHub repo</strong> per client. Their card is stored like
                every order; <strong>publish slug = order id</strong> (<code className="text-xs">gc-…</code>), so the
                internal live URL is always{" "}
                <code className="rounded bg-white px-1 text-xs">genezisi.com/en/c/{"{order id}"}</code>.
              </li>
              <li>
                Domain can be <strong>empty at order time</strong> — you WhatsApp them a <strong>guide to buy</strong> the
                domain and <strong>DNS settings</strong>; they are not blocked from ordering.
              </li>
              <li>
                When their domain exists: add it to <strong>Vercel</strong> (this project), set DNS in{" "}
                <strong>Cloudflare</strong> (or their registrar) to Vercel.
              </li>
              <li>
                In <strong>Preview</strong> for that order, use <strong>Map custom host</strong> (e.g.{" "}
                <code className="text-xs">card.client.ge</code>) so middleware routes that host to this card. Track status
                with <strong>Domain status</strong> (requested → awaiting_dns → connected → live).
              </li>
            </ol>
          </li>
          <li>
            <p className="font-semibold text-slate-900">Executive</p>
            <ol className="mt-1 list-decimal space-y-1 pl-5 text-[13px] leading-relaxed">
              <li>
                <strong>Same technical flow as Professional</strong> — one deployment, one DB; publish slug is still the{" "}
                <strong>order id</strong>. Difference is ops: you may <strong>buy or manage</strong> the domain for them.
              </li>
              <li>
                Optional <strong>preferred domain</strong> in the order helps planning; empty is fine — confirm on
                WhatsApp.
              </li>
              <li>
                After publish: Vercel + DNS + <strong>Map custom host</strong> in admin + domain status until{" "}
                <strong>live</strong>.
              </li>
            </ol>
          </li>
        </ul>
        <p className="mt-4 border-t border-slate-200 pt-3 text-[12px] text-slate-600">
          <strong>How custom domains work:</strong> traffic to their hostname hits your Vercel app; the{" "}
          <code className="rounded bg-white px-1">card_domains</code> row maps that host to their card. It is not a
          redirect from Genezisi to them — both <code className="rounded bg-white px-1">genezisi.com/en/c/…</code> and
          their domain can show the same card once mapped.
        </p>
      </div>
    </div>
  );
}
