import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";

type Body = {
  session_id: string;
  form_data: Record<string, string>;
  step: number;
};

export async function POST(request: Request) {
  if (!supabaseServer) {
    return NextResponse.json(
      { error: "Onboarding storage not configured" },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = await request.json();
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
  const { error } = await supabaseServer
    .from("onboarding_submissions")
    .upsert(
      {
        session_id,
        form_data: form_data ?? {},
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
