import type { AwardItem, Lane1CustomizerState } from "../../../lib/types";
import { fieldClass, labelClass } from "../types";

function setA(
  list: [AwardItem, AwardItem, AwardItem, AwardItem],
  i: number,
  field: keyof AwardItem,
  v: string,
): [AwardItem, AwardItem, AwardItem, AwardItem] {
  const next = [...list] as [AwardItem, AwardItem, AwardItem, AwardItem];
  next[i] = { ...next[i], [field]: v };
  return next;
}

export function AwardsContentFields({
  state,
  patch,
}: {
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
}) {
  return (
    <fieldset className="space-y-3 border-t border-black/10 pt-4">
      <legend className="start-label font-semibold text-[#1e293b]">Awards (4)</legend>
      {state.awards.map((a, i) => (
        <div key={i} className="grid gap-2 sm:grid-cols-2">
          <label className={labelClass}>
            Title
            <input
              className={fieldClass}
              value={a.title}
              onChange={(e) => patch({ awards: setA(state.awards, i, "title", e.target.value) })}
            />
          </label>
          <label className={labelClass}>
            Issuer / year
            <input
              className={fieldClass}
              value={a.issuer}
              onChange={(e) => patch({ awards: setA(state.awards, i, "issuer", e.target.value) })}
            />
          </label>
        </div>
      ))}
    </fieldset>
  );
}
