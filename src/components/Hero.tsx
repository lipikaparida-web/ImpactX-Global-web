import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { getApplicationStatus, COHORT_CONFIG } from '../config/applicationConfig';

interface HeroProps {
  onOpenApply: () => void;
  onOpenDomains: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApply, onOpenDomains }) => {
  const appStatus = getApplicationStatus();

  const scrollToProgrammes = () => {
    const el = document.getElementById('programmes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center min-h-[92vh] pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-transparent z-10"
    >
      {/* Atmospheric background gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-gradient-radial from-[#C8A96A]/[0.04] via-[#1A1A2E]/[0.06] to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-gradient-radial from-[#0D1B4A]/[0.12] to-transparent blur-[100px]" />
        {/* Fine starfield */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.05,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

          {/* Brand label */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121218]/60 border border-[#C8A96A]/25 backdrop-blur-xl text-[10px] font-mono uppercase tracking-widest text-[#C8A96A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96A]" />
              IMPACTX GLOBAL
            </span>
          </motion.div>

          {/* Application status badge */}
          {appStatus === 'OPEN' && (
            <motion.button
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              onClick={scrollToProgrammes}
              className="mb-7 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-950/50 border border-emerald-500/25 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-300 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label="Cohort 3 applications are now open — go to programmes"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-emerald-300 tracking-wide">
                COHORT 3 APPLICATIONS OPEN · Closes {COHORT_CONFIG.deadlineDisplay}
              </span>
              <ChevronRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.button>
          )}

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5"
          >
            <h1 className="text-[2.6rem] sm:text-6xl lg:text-7xl font-sans-display font-bold text-[#F7F4EE] leading-[1.07] tracking-tight text-balance">
              <span className="sr-only">ImpactX Global — </span>
              Impact Starts{' '}
              <span className="font-serif-editorial italic font-normal text-[#C8A96A]">
                With You.
              </span>
            </h1>
          </motion.div>

          {/* Supporting headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[#C4B99A] font-medium leading-snug mb-4 max-w-2xl"
          >
            From curious learners to global builders — turn your ideas into meaningful impact.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-[#8E8E9A] font-light leading-relaxed mb-9 max-w-xl"
          >
            A student-driven ecosystem for building real-world projects, developing leadership,
            conducting research, and collaborating across disciplines.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full"
          >
            <button
              id="hero-cta-primary"
              onClick={scrollToProgrammes}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-semibold text-[#09090D] bg-[#C8A96A] hover:bg-[#DDBC7C] shadow-[0_0_24px_rgba(200,169,106,0.28)] hover:shadow-[0_0_36px_rgba(200,169,106,0.45)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Explore ImpactX Global Programmes"
            >
              <span>Explore Programmes</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-cta-secondary"
              onClick={scrollToStory}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-medium text-[#D1CBC0] bg-transparent border border-white/[0.12] hover:border-[#C8A96A]/40 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A]"
              aria-label="Discover the ImpactX Global Ecosystem"
            >
              Discover Our Ecosystem
            </button>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#03040C] to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
};
