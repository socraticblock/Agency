import { NextResponse } from "next/server";
import {
  mergeBlueprintLead,
  persistBlueprintPayload,
} from "@/lib/blueprint/blueprintStore";

const MAX_BODY = 300_000;

export async function POST(req: Request) {
  const text = await req.text();
  if (text.length > MAX_BODY) {
    return NextResponse.json(
      { success: false as const, error: "Payload too large" },
      { status: 413 }
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { success: false as const, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const result = await persistBlueprintPayload(body);
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}

export async function PATCH(req: Request) {
  const text = await req.text();
  if (text.length > 16_000) {
    return NextResponse.json(
      { success: false as const, error: "Payload too large" },
      { status: 413 }
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { success: false as const, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { success: false as const, error: "Invalid body" },
      { status: 400 }
    );
  }

  const rec = body as Record<string, unknown>;
  const blueprintId =
    typeof rec.blueprintId === "string" ? rec.blueprintId.trim() : "";
  const lead = rec.lead;

  if (!blueprintId || !lead || typeof lead !== "object" || Array.isArray(lead)) {
    return NextResponse.json(
      { success: false as const, error: "Missing blueprintId or lead" },
      { status: 400 }
    );
  }

  const l = lead as Record<string, unknown>;
  const name = typeof l.name === "string" ? l.name : "";
  const company = typeof l.company === "string" ? l.company : "";
  const email = typeof l.email === "string" ? l.email : "";

  const result = await mergeBlueprintLead(blueprintId, { name, company, email });
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
