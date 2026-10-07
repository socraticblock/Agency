"use client";

import { useEffect, useState, useCallback } from "react";
import type { Lane1CustomizerState } from "@/app/[locale]/start/lib/types";
import { AdminOrderPreviewModal, type AdminOrderRow } from "./AdminOrderPreviewModal";
import { AdminOrdersTable } from "./AdminOrdersTable";
import { AdminOrdersEnvMissing, AdminOrdersLogin } from "./AdminOrdersLogin";
import { AdminOrdersHeader } from "./AdminOrdersHeader";
import { AdminOrdersRunbook } from "./AdminOrdersRunbook";
import { useAdminOrdersAuth } from "./useAdminOrdersAuth";

type Filter = "all" | "pending" | "published";

export default function AdminOrdersPage() {
  const {
    sessionLoading,
    serverConfigured,
    authed,
    setAuthed,
    passwordInput,
    setPasswordInput,
    authError,
    handleLogin,
    handleLogout,
  } = useAdminOrdersAuth();

  const [orders, setOrders] = useState<AdminOrderRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [previewState, setPreviewState] = useState<Lane1CustomizerState | undefined>(undefined);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [publishing, setPublishing] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const previewOrder = previewId ? orders.find((o) => o.id === previewId) ?? null : null;

  const showToast = useCallback((msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const fetchOrders = useCallback(() => {
    setLoading(true);
    fetch("/api/orders", { credentials: "include" })
      .then((r) => {
        if (r.status === 401) {
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
  }, [showToast, setAuthed]);

  useEffect(() => {
    if (authed) fetchOrders();
  }, [authed, fetchOrders]);

  const openPreview = async (order: AdminOrderRow) => {
    setPreviewId(order.id);
    setPreviewState(undefined);
    setPreviewLoading(true);
    try {
      const res = await fetch(`/api/orders/${order.id}`, { credentials: "include" });
      if (res.status === 401) {
        setAuthed(false);
        setPreviewState(undefined);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPreviewState(data.state as Lane1CustomizerState);
      } else {
        setPreviewState(undefined);
      }
    } catch {
      setPreviewState(undefined);
    } finally {
      setPreviewLoading(false);
    }
  };

  const publish = async (order: AdminOrderRow) => {
    const slug = order.publishSlug ?? order.slug;
    if (!slug) {
      showToast("Missing publish slug for this order", false);
      return;
    }
    if (!window.confirm(`Publish card for "${order.name ?? order.id}" as /en/c/${slug}?`)) return;
    setPublishing(order.id);
    try {
      const res = await fetch(`/api/cards/${slug}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: order.id }),
      });
      const data = await res.json();
      if (res.status === 401) {
        setAuthed(false);
        showToast("Session expired — sign in again", false);
        return;
      }
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

  if (sessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#1A2744]" />
      </div>
    );
  }

  if (!serverConfigured) {
    return <AdminOrdersEnvMissing />;
  }

  if (!authed) {
    return (
      <AdminOrdersLogin
        passwordInput={passwordInput}
        authError={authError}
        onPasswordChange={setPasswordInput}
        onSubmit={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg ${
            toast.ok ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <AdminOrdersHeader
        ordersCount={orders.length}
        filter={filter}
        onFilter={setFilter}
        onRefresh={fetchOrders}
        onLogout={handleLogout}
      />

      <AdminOrdersRunbook />

      <div className="mx-auto max-w-5xl px-6 py-6">
        <AdminOrdersTable
          filtered={filtered}
          loading={loading}
          filter={filter}
          publishing={publishing}
          onPreview={openPreview}
          onPublish={publish}
        />
      </div>

      <AdminOrderPreviewModal
        order={previewOrder}
        state={previewState}
        loading={previewLoading}
        onClose={() => {
          setPreviewId(null);
          setPreviewState(undefined);
        }}
        onSaved={fetchOrders}
        onSessionExpired={() => setAuthed(false)}
        showToast={showToast}
      />
    </div>
  );
}
