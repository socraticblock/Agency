type ModuleCategory = {
  id: string;
  icon: string;
  name: string;
  moduleCount: number;
  fromPriceGEL: number;
  description: string;
  examples: string[];
};

const MODULE_SHOWCASE: ModuleCategory[] = [
  {
    id: "georgian-advantage",
    icon: "🇬🇪",
    name: "Georgian Advantage",
    moduleCount: 6,
    fromPriceGEL: 600,
    description:
      "Banking, compliance, and local-market workflows so your site matches how Georgia actually operates.",
    examples: ["Payment gateway alignment", "Grant and program paths", "Local SEO and language"],
  },
  {
    id: "marketing-seo",
    icon: "📈",
    name: "Marketing & SEO",
    moduleCount: 7,
    fromPriceGEL: 400,
    description:
      "Traffic and conversion modules: audits, structured data, and measurable funnel improvements.",
    examples: ["Technical SEO passes", "Analytics events", "Content structure"],
  },
  {
    id: "business-engines",
    icon: "⚙️",
    name: "Business Engines",
    moduleCount: 8,
    fromPriceGEL: 700,
    description:
      "Operational systems: bookings, CRM hooks, and automation that reduce manual follow-up.",
    examples: ["Scheduling logic", "CRM routing", "Operational dashboards"],
  },
  {
    id: "ai-automation",
    icon: "🤖",
    name: "AI & Automation",
    moduleCount: 5,
    fromPriceGEL: 800,
    description:
      "Assistant and workflow automation layered on top of your approved brand rules.",
    examples: ["Guided FAQs", "Routing rules", "Operational triggers"],
  },
  {
    id: "creative-extras",
    icon: "🎨",
    name: "Creative Extras",
    moduleCount: 6,
    fromPriceGEL: 300,
    description:
      "Extra motion, storytelling, and visual systems when the base build needs more depth.",
    examples: ["Motion systems", "Extra page packs", "Brand extensions"],
  },
  {
    id: "operations",
    icon: "🛡️",
    name: "Operations",
    moduleCount: 5,
    fromPriceGEL: 500,
    description:
      "Reliability, monitoring, and ongoing hardening beyond the launch window.",
    examples: ["Performance checks", "Security posture", "Backup paths"],
  },
];

export function PricingModuleShowcase() {
  return (
    <section className="border-y border-slate-200/80 bg-slate-50 px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
            Optional enhancements
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Add-on modules (not included in base packages)
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600 sm:text-base">
            Available as scoped add-ons. We help you pick what matters after your foundation is clear.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULE_SHOWCASE.map((category) => (
            <div
              key={category.id}
              role="article"
              className="cursor-default rounded-2xl border border-slate-300 bg-white p-5 shadow-sm"
            >
              <p className="text-2xl" aria-hidden>
                {category.icon}
              </p>
              <h3 className="mt-3 text-lg font-black text-slate-900">{category.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{category.description}</p>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
                {category.examples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm font-bold text-emerald-700">
                From {category.fromPriceGEL} ₾ · {category.moduleCount} modules in family
              </p>
              <div className="mt-4 border-t border-slate-200 pt-3 text-center">
                <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600">
                  Add-on service
                </span>
                <p className="mt-2 text-[11px] italic text-slate-500">
                  Not included in base packages · Priced per scope
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
