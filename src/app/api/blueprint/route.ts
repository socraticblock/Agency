import { NextResponse } from "next/server";
import { DISCOVERY_QUESTION_LABELS } from "@/lib/discovery/discoveryQuestionLabels";
import {
  STANDARD_QUESTIONS,
  UPGRADE_QUESTIONS,
  FOUNDATION_SPECIFIC_MAP,
  MODULE_QUESTIONS_MAP,
} from "@/lib/discovery/discoveryDefinitions";

const allQuestions = [
  ...STANDARD_QUESTIONS,
  ...UPGRADE_QUESTIONS,
  ...Object.values(FOUNDATION_SPECIFIC_MAP).flat(),
  ...Object.values(MODULE_QUESTIONS_MAP).flat(),
];

const QUESTION_TITLES: Record<string, string> = {
  ...DISCOVERY_QUESTION_LABELS,
};
allQuestions.forEach((q: any) => {
  if (q && q.id && q.title) {
    QUESTION_TITLES[q.id] = q.title;
  }
});

const MAX_BODY_CHARS = 256_000;
const MAX_CELL_CHARS = 4_000;
const MAX_EMAIL_LEN = 320;
const MAX_BLUEPRINT_ID_LEN = 32;
const MAX_LEAD_NAME_LEN = 120;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeSubjectLine(s: string): string {
  return s.replace(/[\r\n]+/g, " ").slice(0, 200);
}

function stringifyAnswer(value: unknown): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map((x) => String(x)).join(", ");
  return String(value);
}

function truncateCell(s: string, max = MAX_CELL_CHARS): string {
  if (s.length <= max) return s;
  return `${s.slice(0, max)}…`;
}

function pickHookText(answersRecord: Record<string, unknown>): string {
  const priority = ["pitch", "emotional_hook", "north_star", "hero_offer", "pain_point"];
  for (const k of priority) {
    const s = stringifyAnswer(answersRecord[k]).trim();
    if (s) return truncateCell(s, 180);
  }
  for (const v of Object.values(answersRecord)) {
    const s = stringifyAnswer(v).trim();
    if (s) return truncateCell(s, 180);
  }
  return "";
}

function pickPitchForTable(answersRecord: Record<string, unknown>): string {
  const fromPitch = stringifyAnswer(answersRecord["pitch"]).trim();
  if (fromPitch) return fromPitch;
  const fromHook = pickHookText(answersRecord);
  if (fromHook) return fromHook;
  return "N/A";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Expected application/json" }, { status: 415 });
    }

    const text = await req.text();
    if (text.length > MAX_BODY_CHARS) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(text) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const {
      email,
      answers,
      foundation,
      selectedModules,
      moduleQuantities,
      shieldTier,
      oneTimeTotal,
      monthlyTotal,
      blueprintId: blueprintIdRaw,
      leadName: leadNameRaw,
      leadCompany: leadCompanyRaw,
      source,
    } = body;

    const blueprintIdStr =
      typeof blueprintIdRaw === "string"
        ? blueprintIdRaw.trim().slice(0, MAX_BLUEPRINT_ID_LEN)
        : "";
    const leadNameStr =
      typeof leadNameRaw === "string"
        ? leadNameRaw.trim().slice(0, MAX_LEAD_NAME_LEN)
        : "";
    const leadCompanyStr =
      typeof leadCompanyRaw === "string"
        ? leadCompanyRaw.trim().slice(0, MAX_LEAD_NAME_LEN)
        : "";

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@youragency.com";

    const emailStr =
      typeof email === "string" ? email.trim().slice(0, MAX_EMAIL_LEN) : "";
    if (emailStr && !EMAIL_RE.test(emailStr)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    console.log("Blueprint Data Received locally:", { email: emailStr, foundation });

    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY inside environment variables.");
      return NextResponse.json(
        { error: "Email dispatch is not configured. Try again later or contact us directly." },
        { status: 503 }
      );
    }

    const answersRecord =
      answers && typeof answers === "object" && !Array.isArray(answers)
        ? (answers as Record<string, unknown>)
        : {};

    const hook = pickHookText(answersRecord);
    const foundationStr =
      typeof foundation === "string"
        ? foundation
        : foundation != null
          ? String(foundation)
          : "";
    const subjectBase = foundationStr.trim() ? foundationStr.toUpperCase() : "GENERAL";
    const idPrefix = blueprintIdStr ? `${blueprintIdStr} — ` : "";
    const sourceStr = typeof source === "string" ? source.toUpperCase() : "";
    const sourceTag = sourceStr ? `[${sourceStr}] ` : "";
    const subject = sanitizeSubjectLine(
      hook
        ? `🚀 ${idPrefix}${sourceTag}[NEW LEAD] - ${subjectBase} - ${hook}`
        : `🚀 ${idPrefix}${sourceTag}[NEW BLUEPRINT] - ${subjectBase} - Urgent Review Required`
    );

    const pitchRaw = pickPitchForTable(answersRecord);
    const pitchCell = escapeHtml(truncateCell(pitchRaw));
    const blueprintCell = escapeHtml(blueprintIdStr || "—");
    const leadNameCell = escapeHtml(leadNameStr || "—");
    const leadCompanyCell = escapeHtml(leadCompanyStr || "—");
    const emailCell = escapeHtml(emailStr || "N/A");
    const foundationCell = escapeHtml(foundationStr || "N/A");
    const modulesStr = Array.isArray(selectedModules)
      ? selectedModules.map((m: unknown) => escapeHtml(String(m))).join(", ")
      : "None";

    const quantitiesStr =
      moduleQuantities && typeof moduleQuantities === "object" && !Array.isArray(moduleQuantities)
        ? Object.entries(moduleQuantities)
            .map(([id, qty]) => `${escapeHtml(String(id))}: ${escapeHtml(String(qty))}`)
            .join(", ")
        : "—";

    const shieldStr =
      typeof shieldTier === "number" && Number.isFinite(shieldTier)
        ? escapeHtml(String(shieldTier))
        : "—";
    const oneTimeStr =
      typeof oneTimeTotal === "number" && Number.isFinite(oneTimeTotal)
        ? escapeHtml(String(oneTimeTotal))
        : "—";
    const monthlyStr =
      typeof monthlyTotal === "number" && Number.isFinite(monthlyTotal)
        ? escapeHtml(String(monthlyTotal))
        : "—";

    const answerRows = Object.entries(answersRecord || {})
      .map(([id, rawVal]) => {
        const title = escapeHtml(QUESTION_TITLES[id] || `Question ${id}`);
        const val = truncateCell(stringifyAnswer(rawVal));
        if (!val.trim()) return "";
        return `
                                        <tr>
                                            <td style="font-weight: bold; color: #64748b; width: 40%; border-bottom: 1px solid #f8fafc; font-size: 11px; text-transform: uppercase;">${title}</td>
                                            <td style="border-bottom: 1px solid #f8fafc; color: #334155;">${escapeHtml(val)}</td>
                                        </tr>
                                    `;
      })
      .join("");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Architect <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        ...(emailStr.includes("@") ? { reply_to: emailStr.slice(0, 320) } : {}),
        subject,
        html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                        <div style="background: #09090b; color: white; padding: 20px; text-align: center;">
                            <h2 style="margin: 0; font-family: monospace; letter-spacing: 2px;">ARCHITECTURE BRIEF</h2>
                            <p style="margin: 4px 0 0 0; font-size: 12px; color: #a1a1aa;">Lead dispatch indexation</p>
                        </div>
                        <div style="padding: 20px;">
                            <table border="0" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                <tr style="background: #ffebee; color: #d50000; font-weight: bold; border-bottom: 2px solid #ffcdd2;">
                                    <td style="padding: 12px;">PRIMARY HOOK / PITCH</td>
                                    <td style="padding: 12px;">${pitchCell}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9;">Blueprint ID</td>
                                    <td style="border-bottom: 1px solid #f1f5f9; font-family: monospace; font-weight: bold;">${blueprintCell}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9;">Contact name</td>
                                    <td style="border-bottom: 1px solid #f1f5f9;">${leadNameCell}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9;">Company</td>
                                    <td style="border-bottom: 1px solid #f1f5f9;">${leadCompanyCell}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9;">Lead Email</td>
                                    <td style="border-bottom: 1px solid #f1f5f9; font-weight: bold;">${emailCell}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9;">Foundation</td>
                                    <td style="border-bottom: 1px solid #f1f5f9; text-transform: uppercase; font-weight: bold;">${foundationCell}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9;">Modules</td>
                                    <td style="border-bottom: 1px solid #f1f5f9;">${modulesStr || "None"}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9;">Module quantities</td>
                                    <td style="border-bottom: 1px solid #f1f5f9; font-size: 12px;">${quantitiesStr}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9;">Shield tier id</td>
                                    <td style="border-bottom: 1px solid #f1f5f9;">${shieldStr}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9;">One-time total (GEL)</td>
                                    <td style="border-bottom: 1px solid #f1f5f9;">${oneTimeStr}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9;">Monthly total (GEL)</td>
                                    <td style="border-bottom: 1px solid #f1f5f9;">${monthlyStr}</td>
                                </tr>
                            </table>

                            <h4 style="margin: 20px 0 10px 0; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Discovery Specification Answers</h4>
                            <table border="0" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 13px;">
                                ${answerRows}
                            </table>
                        </div>
                    </div>
                `,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend API error:", res.status, errText);
      return NextResponse.json({ error: "Failed to send notification" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API ROUTE ERROR:", error);
    return NextResponse.json({ error: "Failed payload setup" }, { status: 500 });
  }
}
