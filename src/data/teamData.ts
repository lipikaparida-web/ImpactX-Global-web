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
  {
    id: 'lipika-parida',
    name: 'Ms. Lipika Parida',
    designation: 'Co-Founder & CSO',
    photoUrl: '/images/team/lipika-parida.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/lipikaparida3/',
  },
  {
    id: 'sourav-panda',
    name: 'Mr. Sourav Panda',
    designation: 'Chief Operating Officer (COO)',
    photoUrl: '/images/team/sourav-panda.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/sourav-panda-896620307',
  },
  {
    id: 'snehasikta-prusty',
    name: 'Ms. Snehasikta Prusty',
    designation: 'Chief People Officer (CPO)',
    photoUrl: '/images/team/snehasikta-prusty.jpg',
  },
];

