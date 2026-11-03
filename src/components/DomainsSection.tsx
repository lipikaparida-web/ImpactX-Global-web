import React from 'react';
import { motion } from 'motion/react';
import {
  BrainCircuit,
  BookOpen,
  Users,
  Rocket,
  Megaphone,
  Code,
  Layers,
  Share2,
  Palette,
  Database,
} from 'lucide-react';

interface DomainItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DOMAINS: DomainItem[] = [
  {
    id: 'ai-ml',
    title: 'AI / ML',
    description: 'Build intelligent systems, predictive models, and AI-driven solutions.',
    icon: BrainCircuit,
  },
  {
    id: 'research',
    title: 'Research & Documentation',
    description: 'Transform complex data into actionable whitepapers, reports, and frameworks.',
    icon: BookOpen,
  },
  {
    id: 'hr',
    title: 'Human Resources & Talent Acquisition',
    description: 'Nurture student potential, architect team dynamics, and drive community health.',
    icon: Users,
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship & Innovation',
    description: 'Incubate high-impact ideas from prototype to validated market traction.',
    icon: Rocket,
  },
  {
    id: 'marketing',
    title: 'Marketing & Communications',
    description: 'Craft compelling brand narratives and drive authentic engagement.',
    icon: Megaphone,
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Build production-ready web applications, systems, and developer tooling.',
    icon: Code,
  },
  {
    id: 'project-mgmt',
    title: 'Project Management',
    description: 'Orchestrate cross-functional teams and deliver initiatives with discipline.',
    icon: Layers,
  },
  {
    id: 'social-media',
    title: 'Social Media',
    description: 'Build meaningful digital spaces and create thought-leadership content.',
    icon: Share2,
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Create visual identities, UI assets, and design systems for real products.',
    icon: Palette,
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Extract actionable insights from complex datasets, engineer predictive analytics, and drive evidence-based solutions.',
    icon: Database,
  },
];

export const DomainsSection: React.FC = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="domains"
      className="py-16 sm:py-20 lg:py-24 relative bg-transparent border-t border-white/[0.04]"
      aria-labelledby="domains-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-radial from-[#0D1B4A]/[0.1] to-transparent blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 mb-5"
          >
            Ten Specialised Domains
          </motion.span>
          <motion.h2
            id="domains-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-sans-display font-bold text-[#F7F4EE] tracking-tight mb-4"
          >
            Find Your{' '}
            <span className="font-serif-editorial italic font-normal text-[#C8A96A]">
              Specialisation.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base text-[#8E8E9A] max-w-xl mx-auto leading-relaxed font-light"
          >
            ImpactX Global operates across ten specialised domains. Explore the area
            most aligned with your interests and skills.
          </motion.p>
        </div>

        {/* Domain grid — 3-column desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {DOMAINS.map((domain, i) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#0E0E13]/60 border border-white/[0.07] hover:border-[#C8A96A]/22 hover:bg-[#131318]/70 transition-all duration-300 group cursor-default"
              >
                <div className="shrink-0 p-2.5 rounded-xl bg-[#181820] border border-[#C8A96A]/15 group-hover:border-[#C8A96A]/35 transition-colors">
                  <Icon className="w-4 h-4 text-[#C8A96A]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-sans-display font-semibold text-white mb-1.5 leading-snug">
                    {domain.title}
                  </h3>
                  <p className="text-xs text-[#8E8E9A] leading-relaxed font-light">
                    {domain.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Learn more nudge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <button
            onClick={scrollToContact}
            className="text-xs font-mono text-[#9E9EA7] hover:text-[#C8A96A] transition-colors cursor-pointer underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] rounded"
          >
            Have questions about a specific domain? Contact us →
          </button>
        </motion.div>

      </div>
    </section>
  );
};
