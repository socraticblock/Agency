import { CollapsibleSection } from "../CollapsibleSection";
import { ServiceCountStepper } from "./ServiceCountStepper";
import { type SectionProps, fieldClass, labelClass } from "./types";

export function ServicesSection({
  state,
  setState,
  patch,
  isOpen,
  onToggle,
}: SectionProps) {

  function setServiceArea(i: number, v: string, secondary: boolean) {
    setState((s) => {
      if (secondary) {
        const next = [...s.serviceAreasSecondary] as [
          string,
          string,
          string,
          string,
        ];
        next[i] = v;
        return { ...s, serviceAreasSecondary: next };
      }
      const next = [...s.serviceAreas] as [string, string, string, string];
      next[i] = v;
      return { ...s, serviceAreas: next };
    });
  }

  function setServiceDescription(i: number, v: string, secondary: boolean) {
    setState((s) => {
      if (secondary) {
        const next = [...s.serviceDescriptionsSecondary] as [string, string, string, string];
        next[i] = v;
        return { ...s, serviceDescriptionsSecondary: next };
      }
      const next = [...s.serviceDescriptions] as [string, string, string, string];
      next[i] = v;
      return { ...s, serviceDescriptions: next };
    });
  }

  return (
    <CollapsibleSection
      id="services"
      title="Service areas"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <label className={`${labelClass} text-center`}>
        How many services (1–4)
        <ServiceCountStepper
          value={state.serviceCount}
          onChange={(n) => patch({ serviceCount: n })}
        />
      </label>
      {Array.from({ length: state.serviceCount }).map((_, i) => (
        <div key={i} className="mb-4 space-y-1.5 last:mb-0">
          <span className={labelClass}>{`Service ${i + 1} (EN)`}</span>
          <input
            className={fieldClass}
            placeholder="Title (e.g. Real Estate)"
            value={state.serviceAreas[i]}
            onChange={(e) => setServiceArea(i, e.target.value, false)}
          />
          <textarea
            className={`${fieldClass} h-16 min-h-[64px] resize-none pt-2 text-xs`}
            placeholder="Brief description (optional)..."
            value={state.serviceDescriptions[i]}
            onChange={(e) => setServiceDescription(i, e.target.value, false)}
          />
        </div>
      ))}

      {state.secondaryMode === "self" && (
        <>
          <div className="my-4 border-b border-slate-100" />
          {Array.from({ length: state.serviceCount }).map((_, i) => (
            <div key={`s-${i}`} className="mb-4 space-y-1.5 last:mb-0">
              <span className={labelClass}>{`Service ${i + 1} (GE)`}</span>
              <input
                className={fieldClass}
                placeholder="სათაური"
                value={state.serviceAreasSecondary[i]}
                onChange={(e) => setServiceArea(i, e.target.value, true)}
              />
              <textarea
                className={`${fieldClass} h-16 min-h-[64px] resize-none pt-2 text-xs`}
                placeholder="აღწერა (დამატებითი)..."
                value={state.serviceDescriptionsSecondary[i]}
                onChange={(e) => setServiceDescription(i, e.target.value, true)}
              />
            </div>
          ))}
        </>
      )}
    </CollapsibleSection>
  );
}
