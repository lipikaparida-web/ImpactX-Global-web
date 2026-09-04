import React, { useState } from 'react';
import { DomainId } from '../types';
import { ArrowRight, BookOpen, Users, Rocket, Megaphone, Code, Layers, Share2, Palette, Check, Compass } from 'lucide-react';

interface DomainsProps {
  onSelectDomainForApply: (domainId: DomainId) => void;
}

interface DepartmentData {
  id: DomainId;
  number: string;
  title: string;
  subtitle: string;
  philosophy: string;
  youWillBuild: string[];
  skills: string[];
  mentors: string[];
  ctaText: string;
}

const DEPARTMENTS: DepartmentData[] = [
  {
    id: 'research',
    number: '01',
    title: 'Research & Documentation',
    subtitle: 'Knowledge Architecture',
    philosophy: 'We transform knowledge into action through research, policy, and evidence-driven innovation.',
    youWillBuild: ['Research Papers', 'Policy Reports', 'AI Documentation', 'Whitepapers', 'Technical Blogs'],
    skills: ['Academic Writing', 'Data Analysis', 'Scientific Communication', 'Critical Thinking', 'Documentation Systems'],
    mentors: ['Industry Researchers', 'Academic Fellows', 'Policy Experts', 'Domain Advisors'],
    ctaText: 'Join Research Department',
  },
  {
    id: 'hr',
    number: '02',
    title: 'Human Resources & People',
    subtitle: 'People Operations',
    philosophy: 'We structure high-trust team dynamics, nurture student potential, and architect thriving communities.',
    youWillBuild: ['Selection Frameworks', 'Onboarding Systems', 'Talent Directories', 'Mentorship Programs', 'Culture Playbooks'],
    skills: ['People Analytics', 'Talent Operations', 'Behavioral Interviewing', 'Culture Architecture', 'Leadership Coaching'],
    mentors: ['People Operations Directors', 'Talent Leads', 'Executive Coaches'],
    ctaText: 'Join Human Resources Department',
  },
  {
    id: 'entrepreneurship',
    number: '03',
    title: 'Entrepreneurship & Innovation',
    subtitle: 'Innovation Lab',
    philosophy: 'We incubate venture-scale ideas from initial thesis to validated prototype and market traction.',
    youWillBuild: ['MVP Prototypes', 'Investor Pitch Decks', 'Financial Models', 'Go-To-Market Plans', 'Pilot Studies'],
    skills: ['Lean Startup Methodology', 'Financial Modeling', 'Customer Discovery', 'Venture Strategy', 'Product Pitching'],
    mentors: ['Venture Partners', 'Serial Founders', 'Product Leads'],
    ctaText: 'Join Entrepreneurship Department',
  },
  {
    id: 'marketing',
    number: '04',
    title: 'Marketing & Communications',
    subtitle: 'Brand Strategy',
    philosophy: 'We craft compelling, hype-free narratives that position ideas for global adoption and authority.',
    youWillBuild: ['Brand Toolkits', 'Editorial Case Studies', 'Growth Funnels', 'Press Releases', 'Content Strategies'],
    skills: ['Editorial Strategy', 'SEO & Content Architecture', 'Growth Analytics', 'Brand Positioning', 'Copywriting'],
    mentors: ['Head of Growth', 'Brand Strategists', 'Creative Directors'],
    ctaText: 'Join Marketing Department',
  },
  {
    id: 'web-dev',
    number: '05',
    title: 'Web Development',
    subtitle: 'Digital Engineering',
    philosophy: 'We engineer resilient digital platforms, open infrastructure, and high-performance web systems.',
    youWillBuild: ['Production Web Applications', 'Open-Source Libraries', 'API Gateways', 'Design Systems', 'Interactive Platforms'],
    skills: ['Full-Stack Engineering', 'TypeScript & React', 'System Architecture', 'API Design', 'Performance Optimization'],
    mentors: ['Principal Engineers', 'Full-Stack Leads', 'Open Source Contributors'],
    ctaText: 'Join Web Development Department',
  },
  {
    id: 'project-mgmt',
    number: '06',
    title: 'Project Management',
    subtitle: 'Execution Systems',
    philosophy: 'We orchestrate cross-functional teams to translate ambitious vision into disciplined execution.',
    youWillBuild: ['Sprint System Frameworks', 'Product Roadmaps', 'Execution Dashboards', 'Resource Models', 'Operations Logs'],
    skills: ['Agile & Scrum Methodologies', 'Sprint Operations', 'Risk Management', 'Stakeholder Alignment', 'Product Analytics'],
    mentors: ['Technical Product Managers', 'Operations Directors', 'Scrum Masters'],
    ctaText: 'Join Project Management Department',
  },
  {
    id: 'social-media',
    number: '07',
    title: 'Social Media',
    subtitle: 'Community Growth',
    philosophy: 'We expand brand presence and cultivate authentic engagement across global digital networks.',
    youWillBuild: ['Content Ecosystems', 'Visual Storytelling Reels', 'Thought Leadership Series', 'Community Handbooks', 'Campaign Strategy'],
    skills: ['Community Architecture', 'Visual Storytelling', 'Audience Growth', 'Content Operations', 'Analytics & Insights'],
    mentors: ['Creative Directors', 'Head of Community', 'Growth Managers'],
    ctaText: 'Join Social Media Department',
  },
  {
    id: 'graphic-design',
    number: '08',
    title: 'Graphic & UI/UX Design',
    subtitle: 'Visual Architecture',
    philosophy: 'We design intuitive interfaces, iconic brand identities, and editorial visual experiences.',
    youWillBuild: ['Design Systems', 'Interface Mockups', 'Brand Identity Toolkits', 'Vector Artworks', 'Interactive Prototypes'],
    skills: ['Figma & Interface Architecture', 'Typography & Layout', 'Design Systems', 'User Research', 'Visual Identity'],
    mentors: ['Design Directors', 'UI/UX Architects', 'Brand Identity Designers'],
    ctaText: 'Join Graphic Design Department',
  },
];

const DepartmentArtwork: React.FC<{ id: DomainId }> = ({ id }) => {
  return (
    <div className="w-full h-40 sm:h-48 rounded-2xl bg-[#0D0D0F]/60 border border-[#C8A96A]/20 p-4 flex items-center justify-center relative overflow-hidden my-2">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0D0D0F] via-[#C8A96A]/5 to-[#4A1E28]/10" />
      <svg className="w-full h-full max-w-md text-[#C8A96A]/40" viewBox="0 0 400 200" fill="none">
        <path d="M20 180 Q 200 20 380 180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="200" cy="100" r="40" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="100" r="10" fill="currentColor" />
        <path d="M100 100 H300" stroke="currentColor" strokeWidth="1" />
        <path d="M200 20 V180" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
};

export const Domains: React.FC<DomainsProps> = ({ onSelectDomainForApply }) => {
  const [activeTab, setActiveTab] = useState<DomainId>('research');

  const activeDept = DEPARTMENTS.find((d) => d.id === activeTab) || DEPARTMENTS[0];

  const getDepartmentIcon = (id: DomainId) => {
    switch (id) {
      case 'research': return <BookOpen className="w-4 h-4" />;
      case 'hr': return <Users className="w-4 h-4" />;
      case 'entrepreneurship': return <Rocket className="w-4 h-4" />;
      case 'marketing': return <Megaphone className="w-4 h-4" />;
      case 'web-dev': return <Code className="w-4 h-4" />;
      case 'project-mgmt': return <Layers className="w-4 h-4" />;
      case 'social-media': return <Share2 className="w-4 h-4" />;
      case 'graphic-design': return <Palette className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <section id="domains" className="py-36 sm:py-48 relative bg-transparent border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 backdrop-blur-md">
            06. Specialized Domains
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans-display font-bold text-[#F7F4EE] tracking-tight max-w-3xl leading-tight">
            Eight Specialized Pillars. <br />
            <span className="font-serif-editorial italic font-normal text-[#C8A96A]">One Unified Global Ecosystem.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9E9EA7] max-w-xl leading-relaxed font-light">
            Every department operates with strict professional standards, hands-on leadership, and direct industry mentorship.
          </p>
        </div>

        {/* Master-Detail Layout */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Department List Buttons */}
          <div className="lg:col-span-5 flex flex-row overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-3 pb-4 lg:flex-col lg:overflow-x-visible lg:pb-0">
            {DEPARTMENTS.map((dept) => {
              const isActive = dept.id === activeTab;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveTab(dept.id)}
                  className={`w-full min-w-[75vw] sm:min-w-[50vw] lg:min-w-0 snap-center shrink-0 lg:shrink p-5 sm:p-6 rounded-3xl text-left transition-all duration-500 flex items-center justify-between border cursor-pointer ${
                    isActive
                      ? 'bg-[#18181C]/80 border-[#C8A96A]/50 shadow-[0_8px_32px_rgba(200,169,106,0.20)] backdrop-blur-2xl'
                      : 'bg-[#121215]/30 border-white/[0.05] hover:bg-[#18181C]/40 hover:border-[#C8A96A]/30 backdrop-blur-xl'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl border transition-colors ${
                      isActive ? 'bg-[#C8A96A] text-[#0D0D0F] border-[#C8A96A]' : 'bg-[#0D0D0F] text-[#9E9EA7] border-white/10'
                    }`}>
                      {getDepartmentIcon(dept.id)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#C8A96A] uppercase tracking-wider">
                          DEPT {dept.number}
                        </span>
                      </div>
                      <h3 className="font-sans-display font-semibold text-[#F7F4EE] text-base">
                        {dept.title}
                      </h3>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                    isActive ? 'text-[#C8A96A] translate-x-1' : 'text-[#9E9EA7] opacity-0 group-hover:opacity-100'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Department Detail Spotlight */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-[#121215]/40 backdrop-blur-2xl border border-[#C8A96A]/20 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8A96A]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2">
              <div className="text-xs font-mono text-[#C8A96A] uppercase tracking-widest flex items-center gap-2">
                <span>Department {activeDept.number}</span>
                <span className="text-white/20">•</span>
                <span>{activeDept.subtitle}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-sans-display font-bold text-[#F7F4EE] tracking-tight">
                {activeDept.title}
              </h3>

              <p className="text-sm sm:text-base text-[#C8A96A] font-serif-editorial italic leading-relaxed pt-1">
                "{activeDept.philosophy}"
              </p>
            </div>

            {/* ARTWORK: Abstract Editorial Illustration */}
            <DepartmentArtwork id={activeDept.id} />

            {/* YOU WILL BUILD */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono text-[#F7F4EE] uppercase tracking-widest font-semibold">
                You Will Build
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeDept.youWillBuild.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0D0D0F]/60 border border-[#C8A96A]/20 text-xs text-[#F7F4EE] font-light"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* SKILLS YOU'LL MASTER */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-[#9E9EA7] uppercase tracking-widest">
                Skills You'll Master
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeDept.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-[#9E9EA7] font-light"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* MENTORED BY */}
            <div className="pt-6 border-t border-white/[0.05] space-y-3">
              <h4 className="text-xs font-mono text-[#9E9EA7] uppercase tracking-widest">
                Mentored By
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                {activeDept.mentors.map((mentor, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-[#F7F4EE] bg-[#0D0D0F]/60 px-3.5 py-1 rounded-full border border-white/10"
                  >
                    {mentor}
                  </span>
                ))}
              </div>
            </div>

            {/* ELEGANT CTA BUTTON */}
            <div className="pt-4">
              <button
                onClick={() => onSelectDomainForApply(id)}
                className="w-full py-4 px-8 rounded-full text-xs sm:text-sm font-semibold text-[#0D0D0F] bg-[#C8A96A] hover:bg-[#E2C78E] shadow-[0_0_20px_rgba(200,169,106,0.2)] flex items-center justify-center gap-3 cursor-pointer transition-colors"
              >
                <span>Apply Now</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
