"use client";

import type { AdminOrderRow } from "./AdminOrderPreviewModal";

function formatDate(ts: number): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ts));
}

function tierLabel(tier: string): string {
  if (tier === "subdomain") return "Subdomain";
  if (tier === "professional") return "Professional";
  if (tier === "executive") return "Executive";
  return tier;
}

function statusBadge(status: string): string {
  if (status === "published")
    return "bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-xs font-semibold";
  return "bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs font-semibold";
}

type Props = {
  filtered: AdminOrderRow[];
  loading: boolean;
  filter: "all" | "pending" | "published";
  publishing: string | null;
  onPreview: (order: AdminOrderRow) => void;
  onPublish: (order: AdminOrderRow) => void;
};

export function AdminOrdersTable({
  filtered,
  loading,
  filter,
  publishing,
  onPreview,
  onPublish,
}: Props) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-200 border-t-[#1A2744]" />
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-slate-500">
        No {filter === "all" ? "" : filter} orders yet
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 text-left">
            <th className="px-3 py-3 font-semibold text-slate-700">Order ID</th>
            <th className="px-3 py-3 font-semibold text-slate-700">Publish slug</th>
            <th className="px-3 py-3 font-semibold text-slate-700">Domain</th>
            <th className="px-3 py-3 font-semibold text-slate-700">Name</th>
            <th className="px-3 py-3 font-semibold text-slate-700">Tier</th>
            <th className="px-3 py-3 font-semibold text-slate-700">Status</th>
            <th className="px-3 py-3 font-semibold text-slate-700">Dom</th>
            <th className="px-3 py-3 font-semibold text-slate-700">Date</th>
            <th className="px-3 py-3 font-semibold text-slate-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((order) => (
            <tr key={order.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
              <td className="px-3 py-3 font-mono text-[10px] text-slate-600">{order.id}</td>
              <td className="max-w-[120px] truncate px-3 py-3 font-mono text-xs text-slate-800">
                {order.publishSlug ?? "—"}
              </td>
              <td className="max-w-[140px] truncate px-3 py-3 text-xs text-slate-600">
                {order.requestedDomain ?? "—"}
              </td>
              <td className="px-3 py-3 font-medium text-slate-900">{order.name ?? "—"}</td>
              <td className="px-3 py-3 text-slate-700">{tierLabel(order.tier)}</td>
              <td className="px-3 py-3">
                <span className={statusBadge(order.status)}>{order.status}</span>
              </td>
              <td className="px-3 py-3 text-xs text-slate-600">{order.domainStatus}</td>
              <td className="px-3 py-3 text-slate-500">{formatDate(order.createdAt)}</td>
              <td className="px-3 py-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onPreview(order)}
                    className="rounded-lg border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Preview
                  </button>
                  {order.status === "pending" && (
                    <button
                      type="button"
                      disabled={publishing === order.id}
                      onClick={() => onPublish(order)}
                      className="rounded-lg bg-emerald-600 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                    >
                      {publishing === order.id ? "Publishing..." : "Publish"}
                    </button>
                  )}
                  {order.status === "published" && order.slug && (
                    <a
                      href={`/en/c/${order.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-[#1A2744] px-2 py-1 text-xs font-semibold text-white hover:bg-[#243552]"
                    >
                      View live
                    </a>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
