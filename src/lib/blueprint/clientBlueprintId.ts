/**
 * Client-only blueprint id: one stable `KV-XXXXXX` per browser tab session
 * (sessionStorage). No server blob — email/WhatsApp carry the human-visible id.
 */
export const BLUEPRINT_SESSION_STORAGE_KEY = "genezisi_architect_blueprint_id";

function generateBlueprintId(): string {
  const chars = "1234567890ABCDEFGHJKLMNPQRSTUVWXYZ";
  let raw = "";
  for (let i = 0; i < 6; i++) {
    raw += chars[Math.floor(Math.random() * chars.length)];
  }
  return `GN-${raw}`;
}

/** Reuse id for this tab until session ends or `clearBlueprintSessionId` (e.g. full reset). */
export function getOrCreateBlueprintId(): string {
  if (typeof window === "undefined") return generateBlueprintId();
  try {
    const existing = sessionStorage.getItem(BLUEPRINT_SESSION_STORAGE_KEY);
    if (existing && /^GN-[0-9A-Z]{6}$/.test(existing)) {
      return existing;
    }
    const id = generateBlueprintId();
    sessionStorage.setItem(BLUEPRINT_SESSION_STORAGE_KEY, id);
    return id;
  } catch {
    return generateBlueprintId();
  }
}

export function clearBlueprintSessionId(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(BLUEPRINT_SESSION_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
