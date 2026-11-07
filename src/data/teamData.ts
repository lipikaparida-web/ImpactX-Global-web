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
  // Empty until actual profiles are supplied by the user
];
