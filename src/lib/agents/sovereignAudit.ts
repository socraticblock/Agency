export type SovereignAuditResult = {
  handle: string;
  estimatedFriction: number;
  recoveredMonthlyGEL: number;
};

// Placeholder for future backend or agency-agents integration.
// The UI currently simulates this behaviour on the client.
export async function runSovereignAudit(
  handle: string,
): Promise<SovereignAuditResult> {
  const sanitized = handle.trim().replace(/^@/, "") || "unknown";
  const base = 3400;
  const variance = Math.floor(Math.random() * 800);

  return {
    handle: sanitized,
    estimatedFriction: 0.142,
    recoveredMonthlyGEL: base + variance,
  };
}

