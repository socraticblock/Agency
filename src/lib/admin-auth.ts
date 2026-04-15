/**
 * Server-only admin auth: signed HttpOnly session cookie (password never in client bundle).
 * Set `ADMIN_PASSWORD` in Vercel env.
 */

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "genezisi_admin_session";
const MAX_AGE_SEC = 60 * 60 * 24 * 7;

function adminSecret(): string {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

/** Create signed session token (HMAC over payload JSON). */
export function createAdminSessionToken(): string | null {
  const secret = adminSecret();
  if (!secret) return null;
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SEC;
  const payload = JSON.stringify({ exp });
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export function verifyAdminSessionToken(token: string): boolean {
  const secret = adminSecret();
  if (!secret) return false;
  try {
    const dot = token.indexOf(".");
    if (dot <= 0) return false;
    const payloadB64 = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const payload = Buffer.from(payloadB64, "base64url").toString("utf8");
    const expected = createHmac("sha256", secret).update(payload).digest("hex");
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
    const { exp } = JSON.parse(payload) as { exp: number };
    return Date.now() / 1000 < exp;
  } catch {
    return false;
  }
}

/** True if valid admin session cookie is present. */
export async function verifyAdminRequest(): Promise<boolean> {
  if (!adminSecret()) return false;
  const store = await cookies();
  const raw = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (!raw) return false;
  return verifyAdminSessionToken(raw);
}

export function adminPasswordConfigured(): boolean {
  return adminSecret().length > 0;
}
