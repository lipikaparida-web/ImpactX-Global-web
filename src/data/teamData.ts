// ─── ImpactX Global — Team Members Data ─────────────────────────────────────
// Add team members here as individual profiles are supplied.
// Keep empty until verified profiles are provided.
// ─────────────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photoUrl: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  bio?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'reetika-lenka',
    name: 'Ms. Reetika Lenka',
    designation: 'Founder & CEO',
    photoUrl: '/images/team/reetika-lenka.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/reetikalenka',
  },
];

