export type InefficiencyInputs = {
  audience: number;
  averageOrderValue: number;
  monthlyDMs: number;
};

export function calculateAnnualLeak({
  audience,
  averageOrderValue,
  monthlyDMs,
}: InefficiencyInputs): number {
  const safeAudience = Math.max(0, audience || 0);
  const safeAov = Math.max(0, averageOrderValue || 0);
  const safeDMs = Math.max(0, monthlyDMs || 0);

  const algorithmTax = safeAudience * safeAov * 0.2;
  const dmFriction = safeDMs * safeAov * 0.15 * 12;

  return algorithmTax + dmFriction;
}

