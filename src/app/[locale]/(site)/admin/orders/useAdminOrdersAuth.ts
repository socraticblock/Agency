"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

export function useAdminOrdersAuth() {
  const [sessionLoading, setSessionLoading] = useState(true);
  const [serverConfigured, setServerConfigured] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/session", { credentials: "include" })
      .then(async (r) => {
        if (cancelled) return;
        if (r.status === 503) {
          setServerConfigured(false);
          setAuthed(false);
          return;
        }
        const data = (await r.json().catch(() => ({}))) as { ok?: boolean; configured?: boolean };
        if (data.configured === false) {
          setServerConfigured(false);
          setAuthed(false);
          return;
        }
        setServerConfigured(true);
        if (data.ok) setAuthed(true);
      })
      .finally(() => {
        if (!cancelled) setSessionLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = useCallback(async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setAuthed(false);
  }, []);

  const handleLogin = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setAuthError(false);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password: passwordInput }),
    });
    if (res.ok) {
      setAuthed(true);
      setPasswordInput("");
      return;
    }
    if (res.status === 503) {
      setServerConfigured(false);
      return;
    }
    setAuthError(true);
  }, [passwordInput]);

  return {
    sessionLoading,
    serverConfigured,
    authed,
    setAuthed,
    passwordInput,
    setPasswordInput,
    authError,
    handleLogin,
    handleLogout,
  };
}
