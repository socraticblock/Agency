/**
 * Server-side admin auth for order/publish APIs.
 * Set `ADMIN_PASSWORD` in Vercel env (no default in production).
 */

export function verifyAdminPassword(request: Request): boolean {
  const sent = request.headers.get("x-admin-password") ?? "";
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected?.trim()) {
    return false;
  }
  return sent === expected;
}
