import { 
  Program, 
  Domain, 
  RealProject, 
  JourneyStage, 
  TeamMember, 
  CommunityHub, 
  ImpactStat, 
  Testimonial, 
  ApplicationStep, 
  FAQItem 
} from '../types';

export const HERO_STATS = [
  { label: 'Active Countries', value: '38+' },
  { label: 'Projects Shipped', value: '140+' },
  { label: 'Student Leaders', value: '2,400+' },
  { label: 'Mentorship Hours', value: '18,500+' }
];

export const PHILOSOPHY_PRINCIPLES = [
  {
    number: '01',
    title: 'Learn by Building',
    subtitle: 'Execution over Theory',
    description: 'We reject passive lectures and artificial assignments. You learn software architecture by shipping code, research by publishing findings, and strategy by managing real campaigns.',
    icon: 'Hammer'
  },
  {
    number: '02',
    title: 'Ownership over Observation',
    subtitle: 'Accountability from Day One',
    description: 'You are never sitting on the sidelines taking meeting notes for someone else. You own outcomes, make key architectural decisions, and lead multidisciplinary teams.',
    icon: 'ShieldCheck'
  },
  {
    number: '03',
    title: 'Impact over Certificates',
    subtitle: 'Proof of Mastery',
    description: 'A piece of paper says you attended; a live production system or published whitepaper proves you delivered value. We optimize for tangible portfolio proof.',
    icon: 'Award'
  },
  {
    number: '04',
    title: 'Community over Competition',
    subtitle: 'Elevating Together',
    description: 'The global tech ecosystem is built on collaboration. Our chapters operate as high-trust, peer-driven networks where senior members actively coach new builders.',
    icon: 'Users'
  },
  {
    number: '05',
    title: 'Leadership through Responsibility',
    subtitle: 'Leading by Example',
    description: 'Leadership is earned by taking responsibility when things get challenging, mentoring peers, and holding your team to uncompromising standards of excellence.',
    icon: 'Compass'
  }
];

export const COMPARISON_ITEMS = [
  {
    aspect: 'Project Scope',
    typical: 'Synthetic case studies, dummy spreadsheets, and repetitive data entry.',
    impactX: 'Live production web apps, real market campaigns, and peer-reviewed research papers.'
  },
  {
    aspect: 'Mentorship',
    typical: '15-minute weekly check-in with an overburdened supervisor.',
    impactX: 'Dedicated 1:1 guidance from industry leads and senior student mentors.'
  },
  {
    aspect: 'Team Dynamics',
    typical: 'Isolated work or pairing with other clueless interns on trivial tasks.',
    impactX: 'Multidisciplinary squads (Developers, Designers, PMs, Researchers) working together.'
  },
  {
    aspect: 'Proof of Work',
    typical: 'A generic PDF certificate of completion stating dates attended.',
    impactX: 'A public proof-of-work portfolio with live demo links, code repositories, and measurable metrics.'
  },
  {
    aspect: 'Career Outcome',
    typical: 'Resume keyword buffer without true confidence or technical depth.',
    impactX: 'Direct pathways to tech founding, fellowship placements, and tier-1 startup hires.'
  }
];

export const PROGRAMS: Program[] = [
  {
    id: 'internship',
    title: 'Global Builder Internship',
    subtitle: 'Real Project Execution Squads',
    description: 'Immerse yourself in a 4-week intensive project squad. Build production-ready software, execute multi-channel growth campaigns, or direct product development for real open initiatives.',
    duration: '4 Weeks',
    commitment: '12-15 hrs/week',
    format: 'Remote',
    idealFor: 'Students looking to build a tier-1 proof-of-work portfolio before graduation.',
    iconName: 'Code2',
    keyTakeaways: [
      'Direct ownership of 2 major production deliverables',
      'Weekly peer design & architecture code reviews',
      'Verified GitHub / portfolio artifacts and recommendations'
    ],
    badge: 'Most Popular'
  },
  {
    id: 'leadership',
    title: 'Student Leadership Accelerator',
    subtitle: 'Managing Teams & Ecosystems',
    description: 'Step into managerial and director roles. Lead cross-functional chapters, manage project pipelines, oversee budget allocation, and mentor incoming builder cohorts.',
    duration: '6 Months',
    commitment: '10-12 hrs/week',
    format: 'Hybrid',
    idealFor: 'Proven builders ready to transition into product leadership, management, and chapter founders.',
    iconName: 'Crown',
    keyTakeaways: [
      'Hands-on experience running 15+ person multidisciplinary teams',
      'Crisis management and stakeholder communication framing',
      'Direct access to global non-profit leadership summits'
    ],
    badge: 'Coming Soon',
    comingSoon: true
  },
  {
    id: 'research',
    title: 'Impact Research Fellowship',
    subtitle: 'Publishing Applied Insights',
    description: 'Conduct deep-dive research into generative AI ethics, climate technology, decentralized governance, and socio-economic innovation alongside university professors and researchers.',
    duration: '4 Weeks',
    commitment: '10-12 hrs/week',
    format: 'Remote',
    idealFor: 'Passionate researchers, policy enthusiasts, and graduate-bound scholars.',
    iconName: 'BookOpenCheck',
    keyTakeaways: [
      'Co-authorship on peer-reviewed research papers and policy briefs',
      'Data synthesis using Python, R, and modern AI analysis models',
      'Presentation at international student symposiums'
    ],
    badge: 'Coming Soon',
    comingSoon: true
  },
  {
    id: 'chapters',
    title: 'Country Chapter Initiative',
    subtitle: 'Localizing Global Ecosystems',
    description: 'Found or lead an ImpactX chapter in your country or university. Mobilize local student talent, organize regional hackathons, and connect with regional innovation hubs.',
    duration: 'Ongoing',
    commitment: '8-10 hrs/week',
    format: 'Global Chapter',
    idealFor: 'Ecosystem builders and community architects eager to create localized impact.',
    iconName: 'Globe2',
    keyTakeaways: [
      'Official ImpactX Chapter Charter and operational toolkit',
      'Funding grants for local student hackathons & workshops',
      'Direct seat on the Global ImpactX Leadership Council'
    ]
  },
  {
    id: 'global-impact',
    title: 'Global Impact Projects',
    subtitle: 'Solving Real Community Challenges',
    description: 'Cross-border initiatives tackling clean water monitoring, accessible open education platforms, micro-finance tools, and non-profit digital transformation.',
    duration: '4 Weeks',
    commitment: '10-15 hrs/week',
    format: 'Remote',
    idealFor: 'Purpose-driven engineers, designers, and strategists seeking high social leverage.',
    iconName: 'Sparkles',
    keyTakeaways: [
      'Direct collaboration with verified international non-profits',
      'Deploying code to active end-users in developing regions',
      'Documented social impact metrics and testimonial reports'
    ]
  }
];

export const DOMAINS: Domain[] = [
  {
    id: 'research',
    name: 'Research & Documentation',
    tagline: 'Transforming complex data into actionable whitepapers and policy frameworks.',
    purpose: 'Provide high-grade empirical foundation and analytical rigor for all ImpactX technology & social ventures.',
    skills: ['Qualitative & Quantitative Synthesis', 'Data Analysis (Python/R)', 'Policy Drafting', 'Academic Editing'],
    mentorRole: 'Senior Academic Fellows & Industry Policy Analysts',
    outcomes: ['Published Open-Access Research Papers', 'Interactive Data Dashboards', 'Impact Briefs'],
    activeProjectsCount: 18,
    featuredProjects: ['AI Ethics in Education Framework', 'Micro-Grid Energy Adoption Study']
  },
  {
    id: 'project-mgmt',
    name: 'Project Management & Strategy',
    tagline: 'Orchestrating cross-functional teams to deliver production systems on schedule.',
    purpose: 'Bridge visionary product ideas with disciplined execution, agile sprints, and clear stakeholder alignment.',
    skills: ['Agile & Scrum Methodologies', 'Sprint Planning & Backlog Refinement', 'Risk Mitigation', 'Resource Allocation'],
    mentorRole: 'Technical Product Managers & Startup Operations Leads',
    outcomes: ['Shipped Products', 'Comprehensive System Documentation', 'Sprint Velocity Analytics'],
    activeProjectsCount: 24,
    featuredProjects: ['ImpactX Platform v3.0 Sprint', 'Global Chapter Deployment Pipeline']
  },
  {
    id: 'marketing',
    name: 'Marketing & Communications',
    tagline: 'Crafting compelling, hype-free brand narratives that inspire global adoption.',
    purpose: 'Amplify student achievements, position ImpactX as the premier builder ecosystem, and drive applicant growth.',
    skills: ['Editorial Content Strategy', 'SEO & Organic Growth', 'Brand Architecture', 'Performance Analytics'],
    mentorRole: 'Head of Growth & Brand Strategists from Tech Unicorns',
    outcomes: ['Viral Editorial Case Studies', 'Global Press Releases', 'Cohort Recruitment Funnels'],
    activeProjectsCount: 15,
    featuredProjects: ['Build What Matters Campaign', 'Global Student Storytelling Series']
  },
  {
    id: 'hr',
    name: 'Human Resources & Talent',
    tagline: 'Nurturing student potential and structuring high-trust team dynamics.',
    purpose: 'Architect cohort onboarding, conduct candidate interviews, evaluate peer feedback, and cultivate community health.',
    skills: ['Behavioral Interviewing', 'Onboarding Experience Design', 'Conflict Resolution', 'Talent Analytics'],
    mentorRole: 'People Operations Directors & Executive Coaches',
    outcomes: ['Streamlined Cohort Onboarding', 'Peer Mentorship Frameworks', 'Talent Directory'],
    activeProjectsCount: 12,
    featuredProjects: ['Inclusive Selection Framework', 'Global Mentor Matching Algorithm']
  },
  {
    id: 'social-media',
    name: 'Social Media & Community Brand',
    tagline: 'Building meaningful digital spaces and thought leadership content.',
    purpose: 'Turn student outputs into engaging visual design, insightful threads, and authentic community discussions.',
    skills: ['Visual Storytelling', 'Short-form Video Editing', 'Community Engagement', 'Content Operations'],
    mentorRole: 'Creative Directors & Community Managers',
    outcomes: ['Multi-platform Educational Content', 'Community Growth Campaigns', 'Visual Asset Libraries'],
    activeProjectsCount: 19,
    featuredProjects: ['Behind The Build Series', 'Student Spotlight Reels']
  },
  {
    id: 'entrepreneurship',
    name: 'Entrepreneurship & Innovation',
    tagline: 'Incubating high-impact student ventures from prototype to seed traction.',
    purpose: 'Empower student founders with lean methodology, pitch validation, business models, and advisor networks.',
    skills: ['Customer Discovery', 'Financial Modeling', 'Pitch Deck Architecture', 'Go-To-Market Execution'],
    mentorRole: 'Venture Partners & Serial Founders',
    outcomes: ['Validated MVP Prototypes', 'Investor Pitch Decks', 'Pilot Partnerships'],
    activeProjectsCount: 22,
    featuredProjects: ['EcoTrack Carbon Ledger', 'EduAccess Offline Mesh App']
  }
];

export const REAL_PROJECTS: RealProject[] = [
  {
    id: 'project-1',
    title: 'EduAccess: Offline-First Mesh Education',
    domainId: 'entrepreneurship',
    category: 'Full-Stack Web App & P2P Protocol',
    summary: 'A lightweight WebApp providing offline video modules and interactive quizzes over local peer-to-peer Wi-Fi networks in low-connectivity rural schools.',
    impactMetrics: [
      { label: 'Students Reached', value: '14,200+' },
      { label: 'Rural Schools', value: '28' },
      { label: 'Data Saved', value: '1.2 TB' }
    ],
    deliverables: [
      'Progressive Web App with offline IndexedDB sync',
      'Localized P2P Wi-Fi distribution protocol',
      'Teacher content management dashboard'
    ],
    toolsUsed: ['React', 'TypeScript', 'IndexedDB', 'Tailwind CSS', 'Node.js'],
    studentLeads: [
      { name: 'Aarav Patel', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', university: 'IIT Delhi' },
      { name: 'Elena Rostova', role: 'UI/UX Lead', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', university: 'Technical University of Munich' }
    ],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    demoUrl: 'https://demo.impactx.org/eduaccess',
    githubUrl: 'https://github.com/impactx-global/eduaccess',
    caseStudy: 'In many rural areas across South Asia and Sub-Saharan Africa, reliable internet access remains a barrier to digital learning. The EduAccess squad designed an architecture that leverages a single localized gateway node in a school to cache curriculum content, distributing it smoothly to student tablets without requiring active cellular data.'
  },
  {
    id: 'project-2',
    title: 'Global Youth AI Ethics Whitepaper & Assessment Tool',
    domainId: 'research',
    category: 'Research Paper & Interactive Framework',
    summary: 'Comprehensive peer-reviewed investigation into algorithmic bias in automated grading and scholarship selection, paired with an open-source evaluation suite.',
    impactMetrics: [
      { label: 'Academic Citations', value: '42' },
      { label: 'Download Count', value: '8,500+' },
      { label: 'Policy Adoptions', value: '3 Universities' }
    ],
    deliverables: [
      '38-page peer-reviewed policy whitepaper',
      'Interactive Algorithmic Bias Audit Web Tool',
      'Executive Summary for University Deans'
    ],
    toolsUsed: ['Python', 'Pandas', 'Scikit-learn', 'React', 'D3.js'],
    studentLeads: [
      { name: 'Marcus Chen', role: 'Lead Researcher', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', university: 'NUS Singapore' },
      { name: 'Amara Diop', role: 'Policy Analyst', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200', university: 'University of Cape Town' }
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    caseStudy: 'As universities increasingly turn to automated screening software, hidden historical bias can unfairly penalize candidates from non-traditional backgrounds. The ImpactX Research squad gathered data across 12 countries to quantify these discrepancies and built a free testing suite for admissions teams.'
  },
  {
    id: 'project-3',
    title: 'EcoTrack: Community Carbon & Waste Intelligence',
    domainId: 'project-mgmt',
    category: 'IoT & Environmental Analytics Platform',
    summary: 'A multi-campus telemetry system collecting real-time energy usage and waste metric data from student housing to gamify sustainable campus habits.',
    impactMetrics: [
      { label: 'Carbon Reduction', value: '18%' },
      { label: 'Campuses Deployed', value: '12' },
      { label: 'Monthly Energy Saved', value: '45 MWh' }
    ],
    deliverables: [
      'Real-time IoT sensor data ingestion service',
      'Campus Sustainability Leaderboard App',
      'Automated Energy Anomaly Alerts'
    ],
    toolsUsed: ['TypeScript', 'Express', 'Tailwind', 'Recharts', 'PostgreSQL'],
    studentLeads: [
      { name: 'Sophia Tanaka', role: 'Product Manager', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', university: 'University of Tokyo' },
      { name: 'Liam O’Connor', role: 'Backend Dev', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', university: 'Trinity College Dublin' }
    ],
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800',
    demoUrl: 'https://demo.impactx.org/ecotrack',
    githubUrl: 'https://github.com/impactx-global/ecotrack',
    caseStudy: 'EcoTrack transformed passive campus energy reports into a dynamic, transparent leaderboard. By giving students real-time visibility into their residence hall energy consumption, dorms competed to cut peak loads, resulting in significant cost and carbon savings.'
  },
  {
    id: 'project-4',
    title: 'Build What Matters: Global Storytelling & Campaign',
    domainId: 'marketing',
    category: 'Brand Architecture & Content Engine',
    summary: 'An editorial series highlighting student builders from 25 countries, reaching 1.2M organic impressions across LinkedIn and YouTube.',
    impactMetrics: [
      { label: 'Total Impressions', value: '1.2M+' },
      { label: 'Applicant Inflow', value: '+340%' },
      { label: 'Press Features', value: '8 Media Outlets' }
    ],
    deliverables: [
      '12 Mini-Documentary Video Episodes',
      'Interactive Storytelling Hub',
      'Brand Styleguide and Press Kit'
    ],
    toolsUsed: ['Figma', 'Premiere Pro', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    studentLeads: [
      { name: 'Chloe Dubois', role: 'Creative Director', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', university: 'Sciences Po Paris' },
      { name: 'David Kim', role: 'Growth Strategist', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', university: 'Yonsei University' }
    ],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    caseStudy: 'To cut through standard recruitment noise, the marketing squad produced documentary-style deep dives into real student projects. Instead of showing staged smiling headshots, the campaign showcased raw late-night coding sessions, design iterations, and tangible product launches.'
  }
];

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    step: 1,
    title: 'Explorer',
    subtitle: 'Discovering Purpose',
    description: 'You join public workshops, attend open research sessions, and explore squad project repos to understand how ImpactX operates.',
    responsibilities: ['Participate in open community events', 'Review sample project architectures', 'Submit cohort application'],
    unlockedPerks: ['Access to Discord global lounge', 'Invitation to monthly masterclasses'],
    timeframe: 'Pre-Internship'
  },
  {
    step: 2,
    title: 'Intern Builder',
    subtitle: 'Building Foundations',
    description: 'Selected into a specialized domain squad. Assigned a dedicated industry mentor and given clear sprint deliverables.',
    responsibilities: ['Commit 12-15 hours/week to project tasks', 'Attend weekly squad standups', 'Submit pull requests / design reviews'],
    unlockedPerks: ['1:1 Mentor access', 'Internal documentation wiki', 'Domain tool licenses'],
    timeframe: 'Week 1 — Week 2'
  },
  {
    step: 3,
    title: 'Contributor',
    subtitle: 'Autonomous Execution',
    description: 'You take full ownership of major product features, research sections, or marketing funnels with minimal supervision.',
    responsibilities: ['Review peer code & design work', 'Present sprint updates to chapter leads', 'Author project documentation'],
    unlockedPerks: ['Public attribution on projects', 'ImpactX Builder Credential badge'],
    timeframe: 'Week 3 — Week 4'
  },
  {
    step: 4,
    title: 'Specialist',
    subtitle: 'Mastery & Refinement',
    description: 'Recognized for technical or domain excellence. You advise other squads on architecture, security, or strategy.',
    responsibilities: ['Architect complex system features', 'Conduct domain quality audits', 'Lead specialized workshops'],
    unlockedPerks: ['Direct referral network access', 'Priority sponsorship for hackathons'],
    timeframe: 'Month 3+'
  },
  {
    step: 5,
    title: 'Squad Lead',
    subtitle: 'Managing Teams',
    description: 'Stepping into leadership. You direct a multidisciplinary team of 6-10 builders, managing sprint velocity and quality.',
    responsibilities: ['Set project roadmaps', 'Facilitate team retrospectives', 'Ensure on-time production deployment'],
    unlockedPerks: ['Executive leadership coaching', 'Direct stipend grants for project expenses'],
    timeframe: 'Month 6+'
  },
  {
    step: 6,
    title: 'Mentor',
    subtitle: 'Paying It Forward',
    description: 'Guide incoming intern cohorts. Shares hard-earned learnings, conducts portfolio reviews, and helps students navigate career paths.',
    responsibilities: ['Hold bi-weekly 1:1 office hours', 'Evaluate cohort final deliverables', 'Provide honest career feedback'],
    unlockedPerks: ['Mentor Hall of Fame listing', 'VIP invitation to annual summits'],
    timeframe: 'Month 9+'
  },
  {
    step: 7,
    title: 'Chapter Leader',
    subtitle: 'Ecosystem Architect',
    description: 'Found or expand an ImpactX chapter at your university or regional hub, organizing local cohorts and industry partnerships.',
    responsibilities: ['Represent ImpactX locally', 'Secure university & sponsor backing', 'Host regional demo days'],
    unlockedPerks: ['Chapter Operational Grant', 'Official delegate seat at international events'],
    timeframe: 'Year 1+'
  },
  {
    step: 8,
    title: 'Alumni Fellow',
    subtitle: 'Lifelong Global Network',
    description: 'Graduated builders thriving as founders, engineers, researchers, and venture partners at leading institutions worldwide.',
    responsibilities: ['Angel invest in student startups', 'Provide job referrals to active builders', 'Guest lecture at masterclasses'],
    unlockedPerks: ['Permanent ImpactX Global Alumni Pass', 'Access to seed venture syndicate'],
    timeframe: 'Post-Graduation'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Ms. Reetika Lenka',
    role: 'Founder & Vision Architect',
    chapter: 'Global HQ',
    university: 'ImpactX Global',
    bio: 'Built on the belief that ambitious students deserve opportunities to solve meaningful global challenges—not just earn certificates. Envisioning and shaping the long-term direction of ImpactX.',
    quote: "Movements aren't built by followers. They're built by people willing to take the first step.",
    avatar: '/founder-ritika.png',
    linkedin: 'https://linkedin.com/in/reetikalenka',
    instagram: 'https://www.instagram.com/ritika_lenka_20?igsh=aTc3amJwbDNmNDlq',
    domain: 'Executive Leadership'
  },
  {
    id: 'team-2',
    name: 'Ms. Lipika Parida',
    role: 'Co-Founder & Strategy Lead',
    chapter: 'Global HQ',
    university: 'ImpactX Global',
    bio: 'Leading organizational strategy, digital experiences, ecosystem growth, and cross-functional execution to transform ambitious ideas into reality. Transforming ideas into scalable initiatives that empower students to build real-world impact across disciplines.',
    quote: 'Innovation begins when curiosity is given the courage to act.',
    avatar: '/people-lipika.jpg',
    linkedin: 'https://www.linkedin.com/in/lipikaparida3',
    instagram: 'https://instagram.com/lipikaprda',
    domain: 'Strategy & Growth'
  },
  {
    id: 'team-3',
    name: 'Ms. Snehasikta Prusty',
    role: 'People & Culture Lead',
    chapter: 'Global HQ',
    university: 'ImpactX Global',
    bio: 'Designing recruitment, community engagement, onboarding experiences, and a culture that enables every member to contribute meaningfully. Building a community where talented individuals collaborate, grow, and thrive through trust, purpose, and shared ambition.',
    quote: 'Great organizations are remembered not only for what they build, but for how they make people grow.',
    avatar: '/people-snehasikta.jpg',
    linkedin: 'https://www.linkedin.com/in/sneha-prusty-877aa2362?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    instagram: 'https://www.instagram.com/sneha_prusty?igsh=b3Exd3luaW1wcnhi',
    domain: 'People & Culture'
  },
  {
    id: 'team-4',
    name: 'Mr. Sourav Panda',
    role: 'Core Management Lead',
    chapter: 'Global HQ',
    university: 'ImpactX Global',
    bio: 'Coordinating operations, project workflows, execution systems, and organizational management to ensure seamless collaboration across every initiative. Driving operational excellence by transforming vision into structured execution and measurable outcomes.',
    quote: 'Execution is where vision earns its credibility.',
    avatar: '/people-sourav.png',
    linkedin: 'https://www.linkedin.com/in/sourav-panda-896620307?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    instagram: 'https://www.instagram.com/sourav_panda14?igsh=djB0Zml4ems2eGk=',
    domain: 'Core Management'
  }
];

export const COMMUNITY_HUBS: CommunityHub[] = [
  {
    id: 'hub-1',
    title: 'Global Builder Discord',
    type: 'Discord',
    description: 'Our primary 24/7 digital campus. 4,500+ student developers, designers, PMs, and researchers sharing code snippets and design critiques.',
    cadence: 'Always Active',
    participants: '4,500+ Members',
    icon: 'MessageSquare',
    actionText: 'Join Discord Campus'
  },
  {
    id: 'hub-2',
    title: 'Friday Architecture & Code Reviews',
    type: 'Workshops',
    description: 'Live interactive teardowns of student pull requests, UI component architecture, and database schemas with tech leads.',
    cadence: 'Weekly on Fridays',
    participants: '150+ Attendees/Session',
    icon: 'Code',
    actionText: 'View Next Schedule'
  },
  {
    id: 'hub-3',
    title: 'Deep Research Symposia',
    type: 'Research',
    description: 'Presentation of preliminary findings from our research fellows in AI ethics, climate Tech, and decentralization.',
    cadence: 'Bi-Weekly',
    participants: 'Open Public Entry',
    icon: 'Microscope',
    actionText: 'Explore Symposia'
  },
  {
    id: 'hub-4',
    title: 'Founder & Alumni Office Hours',
    type: 'Office Hours',
    description: '1:1 video slots with ImpactX alumni currently working at OpenAI, Vercel, Stripe, or running seed-backed startups.',
    cadence: 'Weekly Slots',
    participants: 'Bookable 1:1',
    icon: 'Calendar',
    actionText: 'Book Mentor Slot'
  },
  {
    id: 'hub-5',
    title: 'ImpactX Hackathons',
    type: 'Hackathons',
    description: 'Rapid prototyping sprints tackling urgent open-source challenges sponsored by non-profit partners.',
    cadence: 'Quarterly',
    participants: '30+ Squads',
    icon: 'Zap',
    actionText: 'Register for Next Sprint'
  },
  {
    id: 'hub-6',
    title: 'Impact Challenge',
    type: 'Impact',
    description: 'Spread awareness and make a real impact in society by planting trees, helping the underserved, spending time at orphanages, and visiting senior citizens.',
    cadence: 'Monthly',
    participants: 'All Chapters',
    icon: 'Heart',
    actionText: 'Join Next Challenge'
  },
  {
    id: 'hub-7',
    title: 'Global WhatsApp Community',
    type: 'Community',
    description: 'Instant updates, casual networking, and rapid problem-solving with peers globally right on your phone.',
    cadence: 'Always Active',
    participants: '2,000+ Members',
    icon: 'MessageCircle',
    actionText: 'Join WhatsApp Group'
  }
];

export const IMPACT_STATS: ImpactStat[] = [
  { id: 'countries', label: 'Active Countries', value: 38, suffix: '+', description: 'Student-led chapters across 6 continents' },
  { id: 'projects', label: 'Real Projects Shipped', value: 142, suffix: '', description: 'Production web apps, research papers & campaigns' },
  { id: 'students', label: 'Students Transformed', value: 2450, suffix: '+', description: 'Graduates now building impactful careers' },
  { id: 'hours', label: 'Mentorship Hours', value: 18500, suffix: 'h+', description: 'Dedicated 1:1 engineering & strategy guidance' },
  { id: 'research', label: 'Published Papers', value: 24, suffix: '', description: 'Peer-reviewed studies on ethics & technology' },
  { id: 'placement', label: 'Industry Placement', value: 92, suffix: '%', description: 'Alumni hired by top-tier firms or funding startups' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Maya Lin',
    role: 'Software Engineer',
    currentOrganization: 'Stripe',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    quote: 'During university, every interview asked for real experience. My ImpactX project was a live app used by 10,000 students. That portfolio carried me into Stripe.',
    growthStory: 'Started as a timid sophomore contributor in the EduAccess squad; grew into lead architect managing 8 developers across 3 timezones.',
    portfolioUrl: 'https://mayalin.dev',
    linkedinUrl: 'https://linkedin.com',
    domain: 'Software Engineering',
    cohortYear: '2023 Cohort'
  },
  {
    id: 'test-2',
    name: 'Tariq Hassan',
    role: 'Founder & CEO',
    currentOrganization: 'SolarGrid AI (Y Combinator W24)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    quote: 'ImpactX taught me how to take an idea from napkin sketch to production deployment. I met my co-founder right here in the research squad.',
    growthStory: 'Joined ImpactX as an Entrepreneurship Fellow, launched EcoTrack IoT, and leveraged the project traction to raise a $1.8M seed round.',
    portfolioUrl: 'https://solargrid.ai',
    linkedinUrl: 'https://linkedin.com',
    domain: 'Entrepreneurship',
    cohortYear: '2022 Cohort'
  },
  {
    id: 'test-3',
    name: 'Elena Rostova',
    role: 'Product Designer',
    currentOrganization: 'Linear',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    quote: 'The design rigor at ImpactX is insane. You don’t just make Figma concepts; you collaborate with real engineers who push your component design systems into production code.',
    growthStory: 'Redesigned the entire ImpactX Global component system and established accessibility standards for 12 chapter websites.',
    portfolioUrl: 'https://elena.design',
    linkedinUrl: 'https://linkedin.com',
    domain: 'Product Design',
    cohortYear: '2023 Cohort'
  }
];

export const APPLICATION_STEPS: ApplicationStep[] = [
  {
    stepNumber: 1,
    title: 'Submission',
    subtitle: 'Share Your Proof of Passion',
    description: 'Fill out our minimal application form. Show us what you have tried to build, write, or design—even unfinished projects or GitHub repos.',
    estimatedDays: '15 Minutes'
  },
  {
    stepNumber: 2,
    title: 'Portfolio Review',
    subtitle: 'Domain Lead Evaluation',
    description: 'Our student domain leads evaluate your commitment, curiosity, and execution potential. No standardized test scores required.',
    estimatedDays: '3-5 Days'
  },
  {
    stepNumber: 3,
    title: 'Conversational Interview',
    subtitle: 'Peer-to-Peer Alignment',
    description: 'A 25-minute video discussion with an active squad lead. We discuss your motivations, domain preferences, and weekly availability.',
    estimatedDays: '2 Days'
  },
  {
    stepNumber: 4,
    title: 'Squad Selection',
    subtitle: 'Matching Skills to Real Projects',
    description: 'You receive an official invitation detailing your assigned squad, mentor, and specific project objectives for the upcoming cohort.',
    estimatedDays: '48 Hours'
  },
  {
    stepNumber: 5,
    title: 'Onboarding & Immersion',
    subtitle: 'Setting Up Your Tooling',
    description: 'Get provisioned with Discord access, team repos, squad Notion workspaces, and attend the global kickoff orientation.',
    estimatedDays: 'Day 1'
  },
  {
    stepNumber: 6,
    title: 'Mentorship & Sprints',
    subtitle: 'The 12-Week Building Journey',
    description: 'Execute bi-weekly sprints, participate in code/design reviews, receive 1:1 mentorship, and ship real product features.',
    estimatedDays: 'Weeks 1-12'
  },
  {
    stepNumber: 7,
    title: 'Global Demo Day & Graduation',
    subtitle: 'Showcasing Impact',
    description: 'Present your completed project live to industry mentors, partners, and the global student community. Receive your verified proof-of-work portfolio badge.',
    estimatedDays: 'Final Week'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'Is ImpactX Global completely free for students?',
    answer: 'Yes, 100% free. ImpactX is a global non-profit organization funded by university grants, philanthropy, and industry partners. We will never charge students a single cent to join, learn, or build.'
  },
  {
    id: 'faq-2',
    category: 'General',
    question: 'How is ImpactX different from a traditional internship?',
    answer: 'In traditional internships, students often spend months doing repetitive synthetic tasks or watching from the sidelines. At ImpactX, you own real production systems, work in multidisciplinary squads with dedicated mentors, and leave with verifiable proof-of-work rather than just a attendance certificate.'
  },
  {
    id: 'faq-3',
    category: 'Commitment',
    question: 'What is the required weekly time commitment?',
    answer: 'Most programs require 10 to 15 hours per week. Because we operate with asynchronous workflows and clear sprint objectives, you can balance your university classes alongside your ImpactX squad deliverables.'
  },
  {
    id: 'faq-4',
    category: 'Application',
    question: 'Do I need prior technical experience or a high GPA to apply?',
    answer: 'No. We look for curiosity, ownership mindset, and a willingness to learn by doing. Whether you are a beginner looking to write your first production lines of code or an experienced developer, we match you with the right squad level.'
  },
  {
    id: 'faq-5',
    category: 'Outcomes',
    question: 'What do I leave with after completing my cohort?',
    answer: 'You leave with a live, production-ready portfolio piece (complete with code repository, demo URL, and impact metrics), a verified digital credential, a personal reference from your mentor, and direct access to our global alumni network.'
  },
  {
    id: 'faq-6',
    category: 'Application',
    question: 'Can I start an ImpactX chapter at my university?',
    answer: 'Absolutely! If your university does not yet have an active chapter, you can apply through our Country & Chapter Leaders program. We provide the operational playbook, brand charter, and seed funding grants.'
  }
];
