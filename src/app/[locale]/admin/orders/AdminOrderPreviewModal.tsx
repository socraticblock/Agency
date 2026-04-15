"use client";

import { useEffect, useState } from "react";
import { BusinessCardTemplate } from "@/app/[locale]/start/components/BusinessCardTemplate";
import type { Lane1CustomizerState } from "@/app/[locale]/start/lib/types";

export type AdminOrderRow = {
  id: string;
  slug: string | null;
  publishSlug: string | null;
  requestedDomain: string | null;
  domainStatus: string;
  tier: string;
  status: "pending" | "published";
  name: string | null;
  company: string | null;
  createdAt: number;
};

type Props = {
  order: AdminOrderRow | null;
  state: Lane1CustomizerState | undefined;
  loading: boolean;
  onClose: () => void;
  onSaved: () => void;
  onSessionExpired: () => void;
  showToast: (msg: string, ok?: boolean) => void;
};

const DOMAIN_OPTIONS = ["none", "requested", "awaiting_dns", "connected", "live"] as const;

export function AdminOrderPreviewModal({
  order,
  state,
  loading,
  onClose,
  onSaved,
  onSessionExpired,
  showToast,
}: Props) {
  const [mapHost, setMapHost] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setMapHost("");
  }, [order?.id]);

  if (order === null) return null;

  const patchDomain = async (body: { domainStatus?: string; mapHost?: string }) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        onSessionExpired();
        showToast("Session expired — sign in again", false);
        return;
      }
      if (!res.ok) {
        showToast(data.error ?? "Update failed", false);
      } else {
        showToast("Saved");
        onSaved();
      }
    } catch {
      showToast("Network error", false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">
          <div>
            <p className="font-bold text-slate-900">{order.name ?? "—"}</p>
            <p className="text-xs text-slate-500">
              {order.company ?? "—"} · {order.tier} · {order.status}
            </p>
            <p className="mt-1 font-mono text-[10px] text-slate-500">
              Publish slug: {order.publishSlug ?? "—"} · Live slug: {order.slug ?? "—"}
            </p>
            {order.requestedDomain ? (
              <p className="text-[10px] text-slate-600">Requested domain: {order.requestedDomain}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="shrink-0 space-y-2 border-b border-slate-100 px-4 py-3 text-xs">
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-slate-700">Domain status</span>
            <select
              className="rounded border border-slate-200 px-2 py-1.5"
              value={order.domainStatus}
              disabled={saving}
              onChange={(e) => patchDomain({ domainStatus: e.target.value })}
            >
              {DOMAIN_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={mapHost}
              onChange={(e) => setMapHost(e.target.value)}
              placeholder="Map custom host (e.g. card.client.ge)"
              className="min-w-0 flex-1 rounded border border-slate-200 px-2 py-1.5"
            />
            <button
              type="button"
              disabled={saving || !mapHost.trim()}
              onClick={() => patchDomain({ mapHost: mapHost.trim() })}
              className="shrink-0 rounded bg-slate-800 px-2 py-1.5 text-white disabled:opacity-50"
            >
              Map
            </button>
          </div>
          <p className="text-[10px] text-slate-500">
            After DNS points to Vercel, add the hostname here so the card loads on that domain.
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-100">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-200 border-t-[#1A2744]" />
            </div>
          ) : state ? (
            <div className="p-4">
              <BusinessCardTemplate
                state={state}
                previewLang="primary"
                homeHref="/"
                ownerName={order.name ?? order.company ?? "Card"}
                layoutMode="mobile"
                hideBranding={false}
              />
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">
              <p className="text-sm">Card state not available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
