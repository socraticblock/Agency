import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";

const MAX_BODY_CHARS = 128_000;
const MAX_FORM_KEYS = 80;
const MAX_VALUE_LEN = 8_000;

type Body = {
  session_id: string;
  form_data: Record<string, string>;
  step: number;
};

function clampFormData(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Record<string, string> = {};
  const entries = Object.entries(raw as Record<string, unknown>).slice(
    0,
    MAX_FORM_KEYS
  );
  for (const [k, v] of entries) {
    const key = String(k).slice(0, 120);
    if (!key) continue;
    out[key] = String(v ?? "").slice(0, MAX_VALUE_LEN);
  }
  return out;
}

export async function POST(request: Request) {
  if (!supabaseServer) {
    return NextResponse.json(
      { error: "Onboarding storage not configured" },
      { status: 503 }
    );
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Expected application/json" }, { status: 415 });
  }

  const text = await request.text();
  if (text.length > MAX_BODY_CHARS) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  let body: Body;
  try {
    body = JSON.parse(text) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { session_id, form_data, step } = body;
  if (!session_id || typeof session_id !== "string" || session_id.length > 512) {
    return NextResponse.json(
      { error: "Valid session_id required" },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const safeForm = clampFormData(form_data);

  const { error } = await supabaseServer
    .from("onboarding_submissions")
    .upsert(
      {
        session_id,
        form_data: safeForm,
        step: typeof step === "number" ? step : 0,
        updated_at: now,
      },
      { onConflict: "session_id" }
    );

  if (error) {
    console.error("Onboarding upsert error:", error);
    return NextResponse.json(
      { error: "Failed to save onboarding data" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
