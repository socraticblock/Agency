export const GENEZISI_LEAD_KEY = "genezisi_lead" as const;

export type ApplyLeadSession = {
  source: "apply";
  businessName: string;
  taxStatus: string;
  bankChoice: string;
  websiteUrl: string;
  locale: string;
};

export type ToolLeadSession = {
  source: "lead-tool";
  toolName: string;
  painPoint: string;
  locale: string;
  email?: string;
  phone?: string;
  capturedAt: string;
};

export type LeadSessionPayload = ApplyLeadSession | ToolLeadSession;

export function parseLeadSession(raw: string | null): LeadSessionPayload | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as unknown;
    if (!data || typeof data !== "object") return null;
    const o = data as Record<string, unknown>;
    if (o.source === "lead-tool" && typeof o.toolName === "string") {
      return {
        source: "lead-tool",
        toolName: o.toolName,
        painPoint: typeof o.painPoint === "string" ? o.painPoint : "",
        locale: typeof o.locale === "string" ? o.locale : "en",
        email: typeof o.email === "string" ? o.email : undefined,
        phone: typeof o.phone === "string" ? o.phone : undefined,
        capturedAt:
          typeof o.capturedAt === "string"
            ? o.capturedAt
            : new Date().toISOString(),
      };
    }
    if (o.source === "apply" || o.businessName !== undefined) {
      return {
        source: "apply",
        businessName: typeof o.businessName === "string" ? o.businessName : "",
        taxStatus: typeof o.taxStatus === "string" ? o.taxStatus : "",
        bankChoice: typeof o.bankChoice === "string" ? o.bankChoice : "",
        websiteUrl: typeof o.websiteUrl === "string" ? o.websiteUrl : "",
        locale: typeof o.locale === "string" ? o.locale : "en",
      };
    }
    return null;
  } catch {
    return null;
  }
}
