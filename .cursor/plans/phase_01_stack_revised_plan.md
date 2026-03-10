# Revised Plan: The 0.1% Stack (Funnel Seal + Row Layout)

## Critical rules (absolute)

1. **Zero external links (Funnel Seal)**  
   No `url` in data. No `<a>`, no `<Link>`. All 7 items are **static motion.div** rows only. We do not send leads to external docs.

2. **0.1% row layout (glassmorphism rows, not text stack)**  
   Each item is one **glassmorphism row**: `bg-white/5`, `border border-white/10`, `backdrop-blur-md`, `rounded-2xl`, `p-6`.  
   - **Desktop (md):** Left ~30% = Tech Name (`text-emerald-400 font-bold`). Right ~70% = Headline + Body.  
   - **Mobile:** Stack inside the card (tech name above, then headline + body).  
   - **Motion:** `whileHover={{ scale: 1.01, x: 4, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(16,185,129,0.3)" }}` on the whole row.

3. **No placeholder translations in ka.ts**  
   Add the full `pointOneStack` structure in ka.ts with proper keys. User will supply exact Georgian strings in the next step (use empty strings `""` for each value so the app runs until then).

---

## Data structure (no url)

**en.ts / ka.ts**

```ts
pointOneStack: {
  tagline: "Elite Technology. Engineered for Growth.",
  label: "The 0.1% Stack",
  items: [
    { name: "Next.js 16 & React 19", headline: "Instant Sales.", body: "In 2026..." },
    { name: "Vercel & The Edge", headline: "Unbreakable Reliability.", body: "Your site is hosted..." },
    // ... 5 more (Tailwind CSS 4, Framer Motion 11, Lenis Smooth Scroll, Structured Data (Schema), Local SEO Strategy)
  ]
}
```

No `url` property anywhere.

---

## TechStackSection.tsx – final corrected structure

- Section wrapper: same as today (max-w-5xl, px-4, pb-16, pt-2, sm:px-6).
- Header: `label` (small) then `tagline` (main headline). No links.
- List: single column of 7 rows. Each row:
  - **Outer:** `motion.div` with glass classes and `whileHover` as above. **Not** `<a>` or `<Link>`.
  - **Desktop (md):** flex or grid so left column ~30% (tech name), right column ~70% (headline + body).
  - **Mobile:** flex-col so tech name, then headline, then body stack inside the card.
- Staggered `whileInView` on the container is optional; keep if desired.
- All copy from `t.pointOneStack`.

---

## ka.ts

Add `pointOneStack` with the same keys as en. Use empty strings for every value so the structure is in place; user will provide exact Georgian strings in the next step.

---

## Final TechStackSection.tsx component structure

```tsx
"use client";

import { motion } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function TechStackSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const { tagline, label, items } = t.pointOneStack;

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 pt-2 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-emerald-400/90">
          {label}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-100 sm:text-3xl">
          {tagline}
        </h2>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-8 flex flex-col gap-4 sm:mx-auto"
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            variants={rowVariants}
            whileHover={{
              scale: 1.01,
              x: 4,
              backgroundColor: "rgba(255,255,255,0.08)",
              borderColor: "rgba(16,185,129,0.3)",
            }}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:flex-row md:items-start md:gap-6"
          >
            <div className="md:w-[30%] md:shrink-0">
              <h3 className="font-bold text-emerald-400">{item.name}</h3>
            </div>
            <div className="md:w-[70%] md:min-w-0">
              <p className="font-semibold text-slate-100">{item.headline}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300 sm:text-base">
                {item.body}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

- No `url`; no `<a>` or `<Link>`.
- Each row is a single `motion.div` with glass styles and the specified `whileHover`.
- Desktop: 30% tech name (left), 70% headline + body (right). Mobile: stacked inside the same card.
