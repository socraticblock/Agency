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
      preference,
      skipAdmin,
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

    const preferenceStr = typeof preference === "string" ? preference.trim() : "whatsapp";

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@youragency.com";

    const emailStr =
      typeof email === "string" ? email.trim().slice(0, MAX_EMAIL_LEN) : "";
    if (emailStr && !EMAIL_RE.test(emailStr)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    console.log("Blueprint Data Received locally:", { email: emailStr, foundation });

    // Skip Switch removed to ensure Admin notifications fire regardless of empty email condition layout setup accurately concise benchmarks.

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
    const subject = sanitizeSubjectLine(`Your Genezisi Discovery Dossier: ${leadCompanyStr || "Project Grid"}`);

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
        from: "Architect | Genezisi <architect@genezisi.com>",
        to: skipAdmin === true ? [emailStr] : [emailStr || ADMIN_EMAIL],
        bcc: skipAdmin === true ? [] : ["architect@genezisi.com", "socraticblock@gmail.com"],
        ...(emailStr.includes("@") ? { reply_to: emailStr.slice(0, 320) } : {}),
        subject,
        html: `
<div style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: auto; background-color: #09090b; color: #fafafa; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; padding: 24px;">
    <!-- Executive Greeting -->
    <div style="margin-bottom: 32px; border-bottom: 1px solid #27272a; padding-bottom: 16px;">
        <h1 style="color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.025em; margin: 0;">CONFIGURATION SECURED</h1>
        <p style="color: #a1a1aa; font-size: 13px; margin: 4px 0 0 0;">Thank you for your configuration, ${leadNameCell || "Candidate"}. I am currently performing a technical audit of your digital infrastructure nodes for indexation.</p>
    </div>

    <div style="display: table; width: 100%; border-spacing: 0; border-collapse: separate;">
        <!-- Cluster 1: BRAND STRATEGY -->
        <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <!-- Directorial Alert Prepend -->
            <div style="background-color: #ef4444; color: #ffffff; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 8px; border-radius: 6px; display: inline-block; margin-bottom: 12px;">
                🚨 PRIMARY COMMUNICATION: ${preferenceStr.toUpperCase()}
            </div>
            <div style="color: #10b981; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">01 // BRAND STRATEGY</div>
            <p style="color: #ffffff; font-size: 14px; font-weight: 600; font-style: italic; margin: 0 0 8px 0; border-left: 2px solid #10b981; padding-left: 8px;">&quot;${pitchCell}&quot;</p>
            <div style="font-size: 12px; color: #a1a1aa;">
                <strong>Company:</strong> ${leadCompanyCell}<br/>
                <strong>Email:</strong> ${emailCell}<br/>
                <strong>Preference:</strong> ${preferenceStr.toUpperCase()}
            </div>
        </div>

        <!-- Cluster 2: TECHNICAL SPEC -->
        <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
            <div style="color: #10b981; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">02 // TECHNICAL SPECIFICATIONS</div>
            <table border="0" cellpadding="4" cellspacing="0" style="width: 100%; font-size: 12px; color: #fafafa;">
                <tr><td style="color: #a1a1aa; width: 40%;">Blueprint ID</td><td style="font-family: monospace; font-weight: bold; color: #10b981;">${blueprintCell}</td></tr>
                <tr><td style="color: #a1a1aa;">Foundation</td><td style="text-transform: uppercase; font-weight: bold;">${foundationCell}</td></tr>
                <tr><td style="color: #a1a1aa;">Shield Tier</td><td>${shieldStr}</td></tr>
            </table>
        </div>

        <!-- Cluster 3: LOGIC NODES & FORECAST -->
        <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
            <div style="color: #10b981; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">03 // LOGIC NODES & FORECAST</div>
            <div style="font-size: 12px; color: #e4e4e7; margin-bottom: 12px;"><strong>Modules:</strong> ${modulesStr || "Standard Frame"}</div>
            <div style="background-color: #09090b; border: 1px solid #27272a; border-radius: 8px; padding: 12px; font-family: monospace;">
                <div style="color: #10b981; font-size: 16px; font-weight: bold;">${oneTimeStr} ₾ <span style="font-size: 10px; color: #a1a1aa;">ONE-TIME</span></div>
                <div style="color: #34d399; font-size: 14px; font-weight: bold; margin-top: 4px;">+ ${monthlyStr} ₾/mo <span style="font-size: 10px; color: #a1a1aa;">RECURRING</span></div>
            </div>
        </div>

        <!-- Cluster 4: DISCOVERY ANSWERS -->
        <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 16px;">
            <div style="color: #a1a1aa; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">EXTENDED AUDIT DETAILS</div>
            <table border="0" cellpadding="6" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 12px; color: #e4e4e7;">
                ${answerRows}
            </table>
        </div>
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
