export type ProgramId = 'internship' | 'leadership' | 'research' | 'chapters' | 'global-impact';

export interface Program {
  id: ProgramId;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  commitment: string;
  format: 'Remote' | 'Hybrid' | 'Global Chapter';
  keyTakeaways: string[];
  idealFor: string;
  iconName: string;
  badge?: string;
  comingSoon?: boolean;
}

export type DomainId = 
  | 'research' 
  | 'hr' 
  | 'entrepreneurship' 
  | 'marketing' 
  | 'web-dev' 
  | 'project-mgmt' 
  | 'social-media' 
  | 'graphic-design';

export interface Domain {
  id: DomainId;
  name: string;
  tagline: string;
  purpose: string;
  skills: string[];
  mentorRole: string;
  outcomes: string[];
  activeProjectsCount: number;
  featuredProjects: string[];
}

export interface RealProject {
  id: string;
  title: string;
  domainId: DomainId;
  category: string;
  summary: string;
  impactMetrics: { label: string; value: string }[];
  deliverables: string[];
  toolsUsed: string[];
  studentLeads: { name: string; role: string; avatar: string; university: string }[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  caseStudy: string;
}

export interface JourneyStage {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  responsibilities: string[];
  unlockedPerks: string[];
  timeframe: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  chapter: string;
  university: string;
  bio: string;
  quote: string;
  avatar: string;
  linkedin: string;
  github?: string;
  instagram?: string;
  domain: string;
}

export interface CommunityHub {
  id: string;
  title: string;
  type: 'Discord' | 'Events' | 'Workshops' | 'Book Clubs' | 'Research' | 'Office Hours' | 'Hackathons';
  description: string;
  cadence: string;
  participants: string;
  icon: string;
  actionText: string;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  currentOrganization?: string;
  avatar: string;
  quote: string;
  growthStory: string;
  portfolioUrl?: string;
  linkedinUrl: string;
  domain: string;
  cohortYear: string;
}

export interface ApplicationStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  estimatedDays: string;
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Application' | 'Commitment' | 'Outcomes';
  question: string;
  answer: string;
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  university: string;
  yearOfStudy: string;
  primaryDomain: DomainId;
  secondaryDomain?: string;
  portfolioUrl: string;
  linkedinUrl: string;
  whyImpactX: string;
  weeklyCommitmentHours: string;
  agreeToTerms: boolean;
}
