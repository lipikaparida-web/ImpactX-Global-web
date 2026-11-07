export interface DiscordGalleryItem {
  id: string;
  title: string;
  category: 'general' | 'introductions' | 'announcements' | 'alumni';
  categoryLabel: string;
  imageSrc?: string;
  caption: string;
  details?: string;
  discordChannel?: string;
  isPlaceholder?: boolean;
}

export interface CoffeeChatHighlight {
  id: string;
  title: string;
  imageSrc: string;
  tag: string;
  description: string;
  quote?: {
    text: string;
    author: string;
  };
}

export interface CommunitySession {
  id: string;
  title: string;
  type: string;
  description: string;
  highlights: string[];
  status: 'active' | 'upcoming';
  imagePlaceholderText?: string;
}

// ─── Discord Gallery Items ───────────────────────────────────────────────────
// Categorised gallery of Discord activities and genuine community interactions.
// Placeholders are clearly marked for categories where specific screenshots are pending.
export const DISCORD_GALLERY_ITEMS: DiscordGalleryItem[] = [
  {
    id: 'voice-coffee-chats',
    title: 'The Coffee Chats — Live Voice & Video Gathering',
    category: 'alumni',
    categoryLabel: 'Alumni & Member Interactions',
    imageSrc: '/images/community/coffee-chats-voice-grid.jpg',
    discordChannel: '#The Coffee Chats',
    caption: '13+ interns and team members connecting live on video for open, cross-cohort exchange.',
    details: 'Unscripted conversations across specialisations — building peer rapport beyond project deliverables.',
  },
  {
    id: 'founders-reflection',
    title: 'Founders & Intern Reflection Exchange',
    category: 'alumni',
    categoryLabel: 'Alumni & Member Interactions',
    imageSrc: '/images/community/coffee-chats-founders-feedback.jpg',
    discordChannel: '#The Coffee Chats',
    caption: 'Real-time feedback and personal growth reflections shared during cohort coffee chats.',
    details: 'Transparent, two-way dialogue between leadership and interns reflecting on confidence gained through GENESIS.',
  },
  {
    id: 'screen-share-review',
    title: 'GENESIS Journey Retrospective & Live Presentation',
    category: 'general',
    categoryLabel: 'General Discussions',
    imageSrc: '/images/community/coffee-chats-screen-share.jpg',
    discordChannel: '#The Coffee Chats',
    caption: 'Interactive presentation recapping milestones, project learnings, and cohort achievements.',
    details: 'Live stream walkthrough where interns review progress, showcase deliverables, and celebrate growth.',
  },
  {
    id: 'member-reflections-chat',
    title: 'Live Chat Feedback & Real-World Impact',
    category: 'alumni',
    categoryLabel: 'Alumni & Member Interactions',
    imageSrc: '/images/community/coffee-chats-member-reflections.jpg',
    discordChannel: '#The Coffee Chats',
    caption: 'Interns sharing how solving real challenges transformed their confidence and problem-solving abilities.',
    details: 'Spontaneous messages from Sriya and Swetlina highlighting growth, teamwork, and mentor encouragement.',
  },
  {
    id: 'gratitude-cam-moment',
    title: 'Cohort Camaraderie & Closing Reflections',
    category: 'alumni',
    categoryLabel: 'Alumni & Member Interactions',
    imageSrc: '/images/community/coffee-chats-gratitude-moment.jpg',
    discordChannel: '#The Coffee Chats',
    caption: 'Celebrating shared effort, peer collaboration, and mutual encouragement across teams.',
    details: 'Smiles and genuine appreciation expressed as members reflect on working together on production architecture.',
  },

  // ─── Clearly labelled placeholders for unprovided categories ───────────────
  {
    id: 'pm-meeting-room-blueprint',
    title: 'Project Management Blueprint Review & Defense',
    category: 'general',
    categoryLabel: 'General Discussions',
    imageSrc: '/images/community/pm-meeting-room-presentation.jpg',
    discordChannel: '#PM Meeting Room',
    caption: 'Intern Arnav Jain presenting the Week 4 Final Project Management Blueprint to Co-Founder Lipika and cohort peers.',
    details: 'Live screen share and technical defense in domain-dedicated voice meeting rooms.',
  },
  {
    id: 'server-announcements-directory',
    title: 'Official Owl Post & Server Directory',
    category: 'announcements',
    categoryLabel: 'Announcements & Updates',
    imageSrc: '/images/community/server-channels-architecture.jpg',
    discordChannel: '#official-owl-post-announcements',
    caption: 'Official server architecture featuring the Ministry of Decrees, Great Hall Welcome, and specialized Domain Hubs.',
    details: 'Central announcement channels and decrees keeping the ImpactX community coordinated across cohorts.',
  },
];

// ─── Dedicated Coffee Chats Highlights ──────────────────────────────────────
export const COFFEE_CHATS_HIGHLIGHTS: CoffeeChatHighlight[] = [
  {
    id: 'cc-1',
    title: 'Informal, Unscripted Voice Sessions',
    imageSrc: '/images/community/coffee-chats-voice-grid.jpg',
    tag: 'Community Culture',
    description:
      'Every week, interns and mentors drop into The Coffee Chats channel with cameras on. No slide decks, no rigid agendas — just candid conversations about learning, setbacks, and ideas.',
  },
  {
    id: 'cc-2',
    title: 'Peer Mentorship & Honest Feedback',
    imageSrc: '/images/community/coffee-chats-founders-feedback.jpg',
    tag: 'Leadership Access',
    description:
      'Direct, approachable conversations with founders and leads. Interns get honest feedback, encouragement, and advice on navigating technical challenges and personal confidence.',
    quote: {
      text: 'Genesis taught me a lot of things, but the biggest thing I gained is confidence. It wasn’t just about work — it was about learning from people and making connections.',
      author: 'Intern Reflection during Live Coffee Chat',
    },
  },
  {
    id: 'cc-3',
    title: 'Shared Wins & Project Retrospectives',
    imageSrc: '/images/community/coffee-chats-screen-share.jpg',
    tag: 'Cohort Journey',
    description:
      'A space to showcase what you built, walk through architecture diagrams, talk about blockers overcome, and celebrate each teammate’s growth.',
  },
];

// ─── Sessions & Community Moments ───────────────────────────────────────────
export const COMMUNITY_SESSIONS: CommunitySession[] = [
  {
    id: 'sess-1',
    title: 'The Coffee Chats',
    type: 'Weekly Informal Voice Session',
    description:
      'Open voice and video channel for interns across all domains to connect casually, talk through challenges, and get to know each other beyond task boards.',
    highlights: [
      'Unstructured peer conversations',
      'Leadership & mentor check-ins',
      'Cross-domain knowledge sharing',
    ],
    status: 'active',
  },
  {
    id: 'sess-2',
    title: 'Milestone Demos & Retrospectives',
    type: 'Bi-Weekly Cohort Showcase',
    description:
      'Teams present their progress, demo live working features, and receive constructive critique from peers and leads.',
    highlights: [
      'Live code & architecture walkthroughs',
      'Constructive feedback loops',
      'Verifiable production deliverables',
    ],
    status: 'active',
  },
  {
    id: 'sess-3',
    title: 'Interdisciplinary Skill Exchanges',
    type: 'Interactive Workshops',
    description:
      'Peer-led micro-workshops where developers explain APIs to designers, and researchers teach frameworks to engineers.',
    highlights: [
      '10 specialised domains collaborating',
      'Hands-on technical tutorials',
      'Open Q&A with experienced batch alumni',
    ],
    status: 'active',
  },
  {
    id: 'sess-4',
    title: 'Cohort 3 Orientation & Welcome Mixer',
    type: 'Upcoming Intake Event',
    description:
      'Welcoming incoming Winter Intake 2026 interns to the ImpactX Discord campus, introducing mentors, and forming project pods.',
    highlights: [
      'Server orientation & role assignments',
      'Domain pod introductions',
      'First cohort icebreaker games',
    ],
    status: 'upcoming',
    imagePlaceholderText: 'Winter Intake 2026 Orientation — Coming Soon',
  },
];

