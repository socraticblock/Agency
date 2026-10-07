import type { OrderValidationIssue } from "../lib/order-validation";

export function StartOrderReviewIssues({
  title,
  issues,
  variant,
}: {
  title: string;
  issues: OrderValidationIssue[];
  variant: "blocking" | "advisory";
}) {
  if (issues.length === 0) return null;
  const border =
    variant === "blocking" ? "border-amber-200/80 bg-amber-50/90" : "border-slate-200/90 bg-slate-50/80";
  return (
    <div className={`rounded-xl border p-4 text-left ${border}`}>
      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#64748b]">{title}</p>
      <ul className="space-y-4">
        {issues.map((issue) => (
          <li key={issue.id} className="text-sm text-slate-800">
            <p className="font-semibold text-slate-900">{issue.title}</p>
            <p className="mt-1 text-[#64748b]">{issue.why}</p>
            <p className="mt-2 text-xs font-medium text-emerald-800">{issue.action}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
