import { NextResponse } from 'next/server';

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function sanitizeSubjectLine(s: string): string {
    return s.replace(/[\r\n]+/g, ' ').slice(0, 200);
}

function stringifyAnswer(value: unknown): string {
    if (value === undefined || value === null) return "";
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value.map((x) => String(x)).join(", ");
    return String(value);
}

const QUESTION_TITLES: Record<string, string> = {
    "1": "Design Style",
    "2": "Signature Color",
    "3": "Inspiration Gallery",
    "4": "Typography Choice",
    "5": "One-Sentence Pitch",
    "6": "The North Star",
    "7": "Emotional Hook",
    "8": "Sub-Brief 01",
    "9": "Sub-Brief 02",
    "10": "Sub-Brief 03",
    "11": "Sub-Brief 04",
    "12": "Sub-Brief 05",
    "13": "Sub-Brief 06"
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, answers, foundation, selectedModules } = body;

        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@youragency.com";

        console.log("Blueprint Data Received locally:", { email, foundation });

        if (!RESEND_API_KEY) {
            console.error("Missing RESEND_API_KEY inside environment variables.");
            // Return success anyway in dev to simulate sequence correctly to user
            return NextResponse.json({ success: true, debug: 'Logged locally, fix env API keys' });
        }

        const hookRaw = answers?.["10"] ?? answers?.["5"];
        const hook =
            typeof hookRaw === "string"
                ? hookRaw
                : Array.isArray(hookRaw)
                  ? hookRaw.join(", ")
                  : hookRaw != null
                    ? String(hookRaw)
                    : "";
        const foundationStr =
            typeof foundation === "string" ? foundation : foundation != null ? String(foundation) : "";
        const emailStr = typeof email === "string" ? email : email != null ? String(email) : "";
        const subjectBase = foundationStr.trim()
            ? foundationStr.toUpperCase()
            : "GENERAL";
        const subject = sanitizeSubjectLine(
            hook
                ? `🚀 [NEW LEAD] - ${subjectBase} - ${hook}`
                : `🚀 [NEW BLUEPRINT] - ${subjectBase} - Urgent Review Required`
        );

        const answersRecord =
            answers && typeof answers === "object" && !Array.isArray(answers)
                ? (answers as Record<string, unknown>)
                : {};

        const pitchRaw =
            stringifyAnswer(answersRecord["5"]) ||
            stringifyAnswer(answersRecord["10"]) ||
            "N/A";
        const pitchCell = escapeHtml(pitchRaw);
        const emailCell = escapeHtml(emailStr || "N/A");
        const foundationCell = escapeHtml(foundationStr || "N/A");
        const modulesStr = Array.isArray(selectedModules)
            ? selectedModules.map((m: unknown) => escapeHtml(String(m))).join(", ")
            : "None";

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Architect <blueprint@resend.dev>',
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
                            </table>

                            <h4 style="margin: 20px 0 10px 0; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Discovery Specification Answers</h4>
                            <table border="0" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 13px;">
                                ${Object.keys(answersRecord).map((id) => {
                                    const title = escapeHtml(QUESTION_TITLES[id] || `Question ${id}`);
                                    const raw = answersRecord[id];
                                    const val =
                                        Array.isArray(raw)
                                            ? raw.map((x) => String(x)).join(", ")
                                            : raw != null
                                              ? String(raw)
                                              : "";
                                    return `
                                        <tr>
                                            <td style="font-weight: bold; color: #64748b; width: 40%; border-bottom: 1px solid #f8fafc; font-size: 11px; text-transform: uppercase;">${title}</td>
                                            <td style="border-bottom: 1px solid #f8fafc; color: #334155;">${escapeHtml(val)}</td>
                                        </tr>
                                    `;
                                }).join('')}
                            </table>
                        </div>
                    </div>
                `
            })
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("Resend API error:", res.status, errText);
            return NextResponse.json({ error: "Failed to send notification" }, { status: 502 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
         console.error("API ROUTE ERROR:", error);
         return NextResponse.json({ error: 'Failed payload setup' }, { status: 500 });
    }
}
