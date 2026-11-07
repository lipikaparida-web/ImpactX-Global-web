// ─── ImpactX Global — Application Configuration ─────────────────────────────
// This is the SINGLE SOURCE OF TRUTH for application status, cohort info,
// and programme tier pricing.
//
// HOW TO UPDATE APPLICATION STATUS:
//   1. Change `status` to 'OPEN' or 'CLOSED'
//   2. Update `deadlineIST` with the correct deadline date in IST
//   3. Update programme `applyUrl` fields when form links are ready
//
// ─────────────────────────────────────────────────────────────────────────────

export type ApplicationStatus = 'OPEN' | 'CLOSED';

export interface CohortConfig {
  name: string;              // e.g. "Winter Intake 2026 — Cohort 3"
  shortName: string;         // e.g. "Cohort 3"
  status: ApplicationStatus;
  // Deadline in IST (Asia/Kolkata). Used for display only.
  // The `status` field above is the authoritative control.
  deadlineIST: string;       // ISO 8601 date string, e.g. "2026-11-02T23:59:59+05:30"
  deadlineDisplay: string;   // Human-readable, e.g. "2 November 2026"
}

export const COHORT_CONFIG: CohortConfig = {
  name: 'Winter Intake 2026 — Cohort 3',
  shortName: 'Cohort 3',
  status: 'OPEN',                           // <- Change to 'CLOSED' when intake ends
  deadlineIST: '2026-11-04T23:59:59+05:30', // 4 November 2026 at 11:59 PM IST
  deadlineDisplay: '4 November 2026, 11:59 PM',
};

const APPLICATION_FORM_URL = 'https://forms.gle/z4KPrBuhWxk1XfjR7';

// ─── Discord Community Configuration ──────────────────────────────────────────
// Single configurable URL for the ImpactX Global Discord server invitation.
export const DISCORD_INVITE_URL = 'https://discord.gg/impactx';

// ─── Programme Tier Configuration ─────────────────────────────────────────────
// Each tier can use its own form URL or share the cohort application form.

export interface ProgrammeTier {
  id: 'free-community' | 'explorer' | 'accelerator';
  name: string;
  price: string;           // e.g. '₹0', '₹699', '₹999'
  priceNumeric: number;    // 0, 699, 999
  tagline: string;
  description: string;
  highlights: string[];
  ctaLabel: string;        // Button label when OPEN
  closedLabel: string;     // Button label when CLOSED
  applyUrl: string;
  isFeatured?: boolean;
  badgeLabel?: string;
}

export const PROGRAMME_TIERS: ProgrammeTier[] = [
  {
    id: 'free-community',
    name: 'Free Community',
    price: '₹0',
    priceNumeric: 0,
    tagline: 'Explore. Connect. Begin.',
    description:
      'For students who want to discover ImpactX Global, connect with other builders, and explore available opportunities.',
    highlights: [
      'Community access and networking',
      'Updates about events and opportunities',
      'Participation in community activities',
    ],
    ctaLabel: 'Apply for Free',
    closedLabel: 'Applications Closed',
    applyUrl: APPLICATION_FORM_URL,
  },
  {
    id: 'explorer',
    name: 'Explorer',
    price: '₹699',
    priceNumeric: 699,
    tagline: 'Discover your direction.',
    description:
      'For students who want to explore interdisciplinary projects, develop their interests, and understand how the ImpactX ecosystem works.',
    highlights: [
      'Access to interdisciplinary projects',
      'Domain exploration across specialisations',
      'Guided onboarding and orientation',
    ],
    ctaLabel: 'Apply — ₹699',
    closedLabel: 'Applications Closed',
    applyUrl: APPLICATION_FORM_URL,
  },
  {
    id: 'accelerator',
    name: 'Accelerator',
    price: '₹999',
    priceNumeric: 999,
    tagline: 'Build. Lead. Create impact.',
    description:
      'For students ready to take greater ownership of projects, collaborate with teams, and develop practical experience.',
    highlights: [
      'Full project ownership and collaboration',
      'Cross-disciplinary team participation',
      'Practical experience and verifiable outcomes',
    ],
    ctaLabel: 'Apply — ₹999',
    closedLabel: 'Applications Closed',
    applyUrl: APPLICATION_FORM_URL,
    isFeatured: true,
    badgeLabel: 'Most Preferred',
  },
];

// ─── Helper: Resolve current status ──────────────────────────────────────────
// Returns the current application status.
// Checks the manual override first. If status is OPEN, also verifies the deadline
// has not passed (in IST) as a safety guard.
export function getApplicationStatus(): ApplicationStatus {
  if (COHORT_CONFIG.status === 'CLOSED') return 'CLOSED';

  // Safety: auto-close if deadline has passed
  const now = new Date();
  const deadline = new Date(COHORT_CONFIG.deadlineIST);
  if (now > deadline) return 'CLOSED';

  return 'OPEN';
}
