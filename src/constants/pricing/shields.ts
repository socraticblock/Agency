import type { ShieldTier } from './types';
import { MODULES } from './modules';

export const SHIELD_TIERS: ShieldTier[] = [
  {
    id: 0,
    name: 'Reputation Scout',
    priceGEL: 120,
    level: 'Basic',
    risk: 'High',
    perks: [
      { title: 'SSL monitoring', desc: 'Your site always shows the secure padlock — visitors never see "Not Secure".' },
      { title: 'Blacklist monitoring', desc: 'Daily checks to keep your domain out of email spam lists.' },
      { title: 'Backup with every change', desc: 'We back up your site whenever we make changes — your site is never lost.' },
      { title: 'Domain included', desc: 'We buy your .ge domain for you. It is always yours — if you leave us, we transfer it to your name.' },
    ],
    description: 'The bare minimum to exist safely on the web.'
  },
  {
    id: 1,
    name: 'Micro Shield',
    priceGEL: 500,
    level: 'Proactive',
    risk: 'Medium',
    isRecommended: true,
    perks: [
      { title: 'Global content delivery', desc: 'Instant loading for visitors anywhere in Georgia.' },
      { title: '60-second uptime checks', desc: 'We know within a minute if your site goes down.' },
      { title: 'Daily backups (30-day rollback)', desc: 'Restore any version of your site from the last 30 days.' },
      { title: 'Database speed optimisation', desc: 'Keeps your site fast over time.' },
      { title: 'Security patching', desc: 'Critical software lock downs against bots.' },
    ],
    description: 'Protects 100/100 speeds from natural performance decay.'
  },
  {
    id: 2,
    name: 'Active Shield',
    priceGEL: 1500,
    level: 'Guardian',
    risk: 'Low',
    perks: [
      { title: 'Malware Shield Pro', desc: 'Real-time brute force armour hardening for login surfaces.' },
      { title: 'Enterprise Speed Turbo', desc: 'Advanced server-side tuning to maintain 90+ PageSpeed scores.' },
      { title: 'Priority Support', desc: 'VIP placement in the development and modification queue.' },
      { title: 'Conversion Audits', desc: 'Bi-weekly traffic insights to suggest sales improvements.' },
    ],
    description: 'A developer on-call to optimise your layout as your audience grows.'
  },
  {
    id: 3,
    name: 'Enterprise Shield',
    priceGEL: 3000,
    level: 'Immune',
    risk: 'None',
    perks: [
      { title: '4-Hour SLA', desc: 'Critical failure response guarantee within 4 hours.' },
      { title: 'AI-Sentinel Triage', desc: 'Automated error-resolution for soft timeouts and API lags.' },
      { title: 'Algorithm Immunity', desc: 'Shielding for Instagram/Bank APIs against platform shifts.' },
      { title: '1% Threshold Tracker', desc: 'Automated alerts to protect your Micro-Business tax status.' },
    ],
    description: 'Defenders of revenue against bank outages, algorithm shifts, and tax penalties.'
  }
];

export function getAccessibleModuleIdsByFoundation(
  foundationId: string | null | undefined
): string[] {
  if (!foundationId) return [];
  if (foundationId === "ecomm") return MODULES.map((m) => m.id);

  if (foundationId === "cms") {
    return MODULES.filter((m) =>
      (m.category === "Marketing" || m.category === "Creative") && m.id !== "extra-page"
    ).map((m) => m.id);
  }

  if (foundationId === "saas") {
    const commandExcluded = new Set(["ai-sprint", "course-tracking", "listing-portal"]);
    return MODULES.filter((m) => !commandExcluded.has(m.id)).map((m) => m.id);
  }

  return MODULES.map((m) => m.id);
}
