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
      { title: 'SSL Oversight', desc: 'Prevents "Not Secure" browser lockouts.' },
      { title: 'Blacklist Monitoring', desc: 'Stops your site/emails going to spam.' },
      { title: 'AWS Backup Node', desc: 'Basic off-site recovery points saving cycles.' }
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
      { title: 'CDN Configuration', desc: 'Global image edge caching frame routing.' },
      { title: 'Kinetic Uptime Pings', desc: 'Global pings every 60s to check fixes.' },
      { title: 'Time-Machine Backups', desc: 'Daily database restores if anything breaks.' },
      { title: 'Security Patching', desc: 'Critical software lock downs against bots.' },
      { title: 'Database Cleanup', desc: 'Remove clean index junk tables bloating speed.' }
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
      { title: 'Includes Micro Shield+', desc: 'All Tier 2 advantages included.' },
      { title: 'Malware Shield Pro', desc: 'Real-time brute force armor hardening defenses.' },
      { title: 'Enterprise Speed Turbo', desc: 'Hits 90+ Pagespeeds server-side rendering.' },
      { title: 'Priority Support Queue', desc: 'Guaranteed support queue placement.' },
      { title: 'Conversion Audits', desc: 'Bi-weekly suggests to increase sales.' }
    ],
    description: 'A developer on-call to optimize your layout as your audience grows.'
  },
  {
    id: 3,
    name: 'Enterprise Shield',
    priceGEL: 3000,
    level: 'Immune',
    risk: 'None',
    perks: [
      { title: 'Includes Active Shield+', desc: 'All Tier 3 advantages included.' },
      { title: '4-Hour SLA Guarantee', desc: 'Critical failure response inside 4 hours.' },
      { title: 'AI-Sentinel Triage', desc: 'Website auto-resolves soft load errors.' },
      { title: 'Algorithm Immunity', desc: 'Bypasses broken Instagram or bank APIs.' },
      { title: '1% Threshold Tracker', desc: 'Trigger alerts preserving tax status limits.' }
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
