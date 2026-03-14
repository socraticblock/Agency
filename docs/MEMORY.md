# Memory Index

- [001] Implemented 5 interactive lead generation tools with Server Actions for lead capture.
- [002] Deployed LeadGenHub on the homepage to replace the old InefficiencyCalculator.

# Detailed Observations

## [001]
- **Context:** Needed highly persuasive, interactive tools to replace old Audit/Chat tools for social-media-dependent businesses.
- **Decision:** Built 5 interactive client components (TrueAudienceVisualizer, LostWeekendCalculator, FrictionRaceSimulator, TimeDebtReceipt, PlatformRiskMeter) using Framer Motion for animations, feeding into a shared `LeadCaptureForm` that uses React 19 `useActionState` and Server Actions for data submission.
- **Impact:** Provides engaging, zero-refresh lead capture flows while maintaining token-efficient component isolation and leveraging Next.js 15 server capabilities.

## [002]
- **Context:** Needed a logical, non-overwhelming way to present all 5 new lead gen tools to first-time visitors on the homepage.
- **Decision:** Created a `LeadGenHub` tabbed interface component and swapped it in for the old `InefficiencyCalculator` on `src/app/[locale]/page.tsx`.
- **Impact:** Allows users to self-select their biggest pain point without cluttering the homepage with 5 stacked tools, maintaining a clean user journey right after the value propositions.