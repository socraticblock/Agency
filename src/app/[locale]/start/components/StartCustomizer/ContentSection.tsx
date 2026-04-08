import { CollapsibleSection } from "../CollapsibleSection";
import type { PrimaryLang } from "../../lib/types";
import { type SectionProps, fieldClass, labelClass } from "./types";

export function ContentSection({
  state,
  patch,
  isOpen,
  onToggle,
}: SectionProps) {
  return (
    <CollapsibleSection
      id="content"
      title="Content"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <p className="start-caption">
        Phone and address are managed here. For all other text, simply **click directly on the card** to edit.
      </p>

      <div className="space-y-4 pt-2">
        <label className={labelClass}>
          Phone Number
          <input
            className={fieldClass}
            value={state.phone}
            onChange={(e) => patch({ phone: e.target.value })}
            inputMode="tel"
            placeholder="+995 ..."
            onFocus={(e) => e.target.select()}
          />
        </label>

        <label className={labelClass}>
          Business Address (EN)
          <textarea
            className="start-field start-field-textarea mt-1.5 w-full"
            rows={2}
            value={state.address}
            onChange={(e) => patch({ address: e.target.value })}
            placeholder="Search or enter address..."
            onFocus={(e) => e.target.select()}
          />
        </label>

        {state.secondaryMode === "self" && (
          <label className={labelClass}>
            Business Address (GE)
            <textarea
              className="start-field start-field-textarea mt-1.5 w-full"
              rows={2}
              value={state.addressSecondary}
              onChange={(e) => patch({ addressSecondary: e.target.value })}
              placeholder="მისამართი ქართულად"
              onFocus={(e) => e.target.select()}
            />
          </label>
        )}
      </div>
    </CollapsibleSection>
  );
}
