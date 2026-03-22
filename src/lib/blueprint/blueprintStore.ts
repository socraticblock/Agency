import Redis from "ioredis";

let redisSingleton: Redis | null = null;
let redisConstructorFailed = false;
let devMemoryForced = false;

const devMemoryStore = new Map<string, string>();

function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

function getRedisUrl(): string | undefined {
  const u = process.env.REDIS_URL?.trim();
  return u || undefined;
}

function getRedisClient(): Redis | null {
  if (devMemoryForced || redisConstructorFailed) return null;
  const url = getRedisUrl();
  if (!url) return null;
  if (redisSingleton) return redisSingleton;
  try {
    redisSingleton = new Redis(url, {
      maxRetriesPerRequest: 1,
      retryStrategy: () => null,
    });
    return redisSingleton;
  } catch (e) {
    redisConstructorFailed = true;
    console.error("Redis client init failed:", e);
    return null;
  }
}

async function disposeRedisClient(): Promise<void> {
  const c = redisSingleton;
  redisSingleton = null;
  if (!c) return;
  try {
    c.disconnect();
  } catch {
    /* ignore */
  }
}

async function storeBlueprint(key: string, value: string): Promise<void> {
  if (devMemoryForced && isDev()) {
    devMemoryStore.set(key, value);
    return;
  }

  const redis = getRedisClient();
  if (redis) {
    try {
      await redis.set(key, value, "EX", 1209600);
      return;
    } catch (e) {
      console.error("Redis SET failed:", e);
      await disposeRedisClient();
      if (isDev()) {
        devMemoryForced = true;
        devMemoryStore.set(key, value);
        return;
      }
      throw new Error(
        "Could not save blueprint — check REDIS_URL and that Redis is reachable."
      );
    }
  }

  if (isDev()) {
    devMemoryStore.set(key, value);
    return;
  }

  throw new Error("Blueprint storage is not configured (set REDIS_URL).");
}

async function getBlueprint(key: string): Promise<string | null> {
  if (devMemoryForced && isDev()) {
    return devMemoryStore.get(key) ?? null;
  }

  const redis = getRedisClient();
  if (redis) {
    try {
      return await redis.get(key);
    } catch (e) {
      console.error("Redis GET failed:", e);
      await disposeRedisClient();
      if (isDev()) {
        devMemoryForced = true;
        return devMemoryStore.get(key) ?? null;
      }
      return null;
    }
  }

  if (isDev()) return devMemoryStore.get(key) ?? null;
  return null;
}

export type PersistBlueprintResult =
  | { success: true; blueprintId: string }
  | { success: false; error: string };

export type MergeLeadResult =
  | { success: true }
  | { success: false; error: string };

export async function persistBlueprintPayload(
  payload: unknown
): Promise<PersistBlueprintResult> {
  try {
    let data: unknown = payload;
    try {
      data = JSON.parse(JSON.stringify(payload));
    } catch {
      return {
        success: false,
        error: "Invalid blueprint payload (could not serialize).",
      };
    }

    const chars = "1234567890ABCDEFGHJKLMNPQRSTUVWXYZ";
    let rawId = "";
    for (let i = 0; i < 6; i++) {
      rawId += chars[Math.floor(Math.random() * chars.length)];
    }
    const id = `KV-${rawId}`;
    const key = `blueprint:${id}`;

    await storeBlueprint(
      key,
      JSON.stringify({
        status: "initialized",
        data,
        createdAt: new Date().toISOString(),
      })
    );

    return { success: true, blueprintId: id };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to secure architecture node.";
    console.error("persistBlueprintPayload error:", error);
    return { success: false, error: message };
  }
}

export async function mergeBlueprintLead(
  id: string,
  lead: { name: string; company: string; email: string }
): Promise<MergeLeadResult> {
  try {
    const key = `blueprint:${id}`;
    const existing = await getBlueprint(key);

    if (!existing) return { success: false, error: "Node expired." };

    const parsed =
      typeof existing === "string"
        ? (JSON.parse(existing) as Record<string, unknown>)
        : existing;
    parsed.lead = lead;
    parsed.status = "dispatched";

    await storeBlueprint(key, JSON.stringify(parsed));

    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Contact node sync failed.";
    console.error("mergeBlueprintLead error:", error);
    return { success: false, error: message };
  }
}
