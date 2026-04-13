"use client";

import { useEffect, useState } from "react";
import { BusinessCardTemplate } from "@/app/[locale]/start/components/BusinessCardTemplate";
import type { Lane1CustomizerState } from "@/app/[locale]/start/lib/types";

const ADMIN_PASSWORD = "Jeftax12!";
const SESSION_KEY = "genezisi_admin_auth";

interface Order {
  id: string;
  slug: string | null;
  tier: string;
  status: "pending" | "published";
  name: string | null;
  company: string | null;
  phone: string | null;
  email: string | null;
  createdAt: number;
  publishedAt: number | null;
}

interface CardDetail extends Order {
  state?: Lane1CustomizerState;
}

type Filter = "all" | "pending" | "published";

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

export default function AdminOrdersPage() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [previewCard, setPreviewCard] = useState<CardDetail | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [publishing, setPublishing] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === ADMIN_PASSWORD) {
      setAuthed(true);
    }
  }, []);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchOrders = () => {
    setLoading(true);
    fetch("/api/orders", {
      headers: { "x-admin-password": ADMIN_PASSWORD },
    })
      .then((r) => {
        if (r.status === 401) {
          sessionStorage.removeItem(SESSION_KEY);
          setAuthed(false);
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data?.cards) setOrders(data.cards);
      })
      .catch(() => showToast("Failed to load orders", false))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (authed) fetchOrders();
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, ADMIN_PASSWORD);
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const openPreview = async (order: Order) => {
    setPreviewLoading(true);
    setPreviewCard({ ...order, state: undefined });
    try {
      const res = await fetch(`/api/cards/${order.slug ?? order.id}`);
      if (res.ok) {
        const data = await res.json();
        setPreviewCard({ ...order, state: data.state });
      } else {
        setPreviewCard({ ...order, state: undefined });
      }
    } catch {
      setPreviewCard({ ...order, state: undefined });
    } finally {
      setPreviewLoading(false);
    }
  };

  const publish = async (order: Order) => {
    const slug =
      order.slug ??
      (order.name ?? "card").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") ??
      "card";
    if (!window.confirm(`Publish card for "${order.name ?? order.id}" as /c/${slug}?`)) return;
    setPublishing(order.id);
    try {
      const res = await fetch(`/api/cards/${slug}/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": ADMIN_PASSWORD,
        },
        body: JSON.stringify({ id: order.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error ?? "Publish failed", false);
      } else {
        showToast(`Published! URL: ${data.url}`);
        fetchOrders();
      }
    } catch {
      showToast("Network error", false);
    } finally {
      setPublishing(null);
    }
  };

  const filtered = orders.filter((o) => {
    if (filter === "pending") return o.status === "pending";
    if (filter === "published") return o.status === "published";
    return true;
  });

  // ---- Login screen ----
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <h1 className="mb-1 text-xl font-bold text-slate-900">Genezisi Admin</h1>
          <p className="mb-6 text-sm text-slate-500">Enter your admin password</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Admin password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#1A2744] focus:outline-none focus:ring-1 focus:ring-[#1A2744]"
            />
            {authError && (
              <p className="text-sm text-red-600">Incorrect password</p>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#1A2744] py-2 text-sm font-semibold text-white hover:bg-[#243552]"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg ${
            toast.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-slate-900">Genezisi Orders</h1>
              <p className="text-sm text-slate-500">{orders.length} total orders</p>
            </div>
            <button
              onClick={fetchOrders}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Refresh
            </button>
          </div>

          {/* Filter tabs */}
          <div className="mt-4 flex gap-2">
            {(["all", "pending", "published"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
                  filter === f
                    ? "bg-[#1A2744] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mx-auto max-w-5xl px-6 py-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-200 border-t-[#1A2744]" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-slate-500">
            No {filter === "all" ? "" : filter} orders yet
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left">
                  <th className="px-4 py-3 font-semibold text-slate-700">Order ID</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Name</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Company</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Tier</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Date</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{order.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{order.name ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-700">{order.company ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-700">{tierLabel(order.tier)}</td>
                    <td className="px-4 py-3">
                      <span className={statusBadge(order.status)}>{order.status}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openPreview(order)}
                          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          Preview
                        </button>
                        {order.status === "pending" && (
                          <button
                            disabled={publishing === order.id}
                            onClick={() => publish(order)}
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                          >
                            {publishing === order.id ? "Publishing..." : "Publish"}
                          </button>
                        )}
                        {order.status === "published" && order.slug && (
                          <a
                            href={`/c/${order.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-[#1A2744] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#243552]"
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
        )}
      </div>

      {/* Preview Modal */}
      {previewCard !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setPreviewCard(null)}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">
              <div>
                <p className="font-bold text-slate-900">{previewCard.name ?? "—"}</p>
                <p className="text-xs text-slate-500">{previewCard.company ?? "—"} · {tierLabel(previewCard.tier)}</p>
              </div>
              <button
                onClick={() => setPreviewCard(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto bg-slate-100">
              {previewLoading ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-200 border-t-[#1A2744]" />
                </div>
              ) : previewCard.state ? (
                <div className="p-4">
                  <BusinessCardTemplate
                    state={previewCard.state}
                    previewLang="primary"
                    homeHref="/"
                    ownerName={previewCard.name ?? previewCard.company ?? "Card"}
                    layoutMode="mobile"
                    hideBranding={false}
                  />
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500">
                  <p className="text-sm">Card state not available.</p>
                  <p className="mt-1 text-xs">The card may not be published yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
