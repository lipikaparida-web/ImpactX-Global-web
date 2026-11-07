import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Sparkles,
  Users,
  Target,
  Rocket,
  Compass,
  ArrowRight,
  Milestone,
  CheckCircle2,
} from 'lucide-react';
import { ImpactXLogo } from './ImpactXLogo';

interface OurStoryPageProps {
  onBack: () => void;
}

const TIMELINE_BATCHES = [
  {
    batch: 'GENESIS',
    tag: 'Batch 01',
    description: 'The beginning of the ImpactX journey.',
    highlight: 'Foundation',
  },
  {
    batch: 'ODYSSEY',
    tag: 'Batch 02',
    description: 'The next chapter of learning and collaboration.',
    highlight: 'Expansion',
  },
  {
    batch: 'AETHER',
    tag: 'Batch 03',
    description: 'The next chapter, focused on exploring possibilities through experiential learning.',
    highlight: 'Current Chapter',
    current: true,
  },
];

const BELIEFS = [
  {
    title: 'Learn through experience.',
    description: 'Knowledge comes alive when tested against real challenges rather than passive theory.',
    icon: Sparkles,
  },
  {
    title: 'Build through collaboration.',
    description: 'Great ideas grow exponentially when interdisciplinary minds work together towards shared goals.',
    icon: Users,
  },
  {
    title: 'Lead with ownership.',
    description: 'True leadership begins with taking responsibility for outcomes and supporting teammates.',
    icon: Target,
  },
  {
    title: 'Create meaningful impact.',
    description: 'Every project should aim beyond personal achievement to make a genuine, lasting difference.',
    icon: Rocket,
  },
];

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onBack }) => {
  return (
    <motion.div
      key="our-story-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#03040C] text-[#F7F4EE] relative overflow-x-hidden font-sans"
    >
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-radial from-[#C8A96A]/[0.05] via-[#2A1E5C]/[0.06] to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[500px] bg-gradient-radial from-[#1E3A8A]/[0.08] to-transparent blur-[130px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[450px] bg-gradient-radial from-[#C8A96A]/[0.04] to-transparent blur-[120px]" />
      </div>

      {/* Fixed top mini-header */}
      <header className="fixed top-0 left-0 right-0 z-40 py-3">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#09090D]/90 backdrop-blur-2xl border border-[#C8A96A]/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            {/* Logo */}
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] py-1 cursor-pointer group"
              aria-label="Back to main site"
            >
              <div className="w-7 h-7 rounded-full bg-[#0D0D0F] border border-[#C8A96A]/30 flex items-center justify-center shrink-0 shadow-inner">
                <ImpactXLogo className="w-7 h-7" />
              </div>
              <span className="font-sans-display font-bold text-sm text-white whitespace-nowrap">
                ImpactX Global
              </span>
            </button>

            {/* Back button */}
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-[#141418] border border-[#C8A96A]/20 text-[#D1CBC0] hover:text-white hover:border-[#C8A96A]/45 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A]"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 pt-28 sm:pt-32 pb-24 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 space-y-24 sm:space-y-32">

        {/* ─── 1. HERO SECTION ─── */}
        <section className="text-center pt-6 sm:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5C07B] bg-[#E5C07B]/10 px-4 py-1.5 rounded-full border border-[#E5C07B]/25 mb-6"
          >
            <Compass className="w-3.5 h-3.5 text-[#E5C07B]" />
            Our Origins & Mission
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-3.5xl sm:text-5xl lg:text-6xl font-sans-display font-extrabold text-[#FFFFFF] tracking-tight leading-[1.12] mb-6 text-balance"
          >
            Every Impact Begins{' '}
            <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FCEAC5] via-[#E8C57D] to-[#D4A247] drop-shadow-[0_2px_16px_rgba(232,197,125,0.3)]">
              With an Idea.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="text-base sm:text-lg lg:text-xl text-[#DCD7CA] max-w-2xl mx-auto leading-relaxed font-normal mb-12 text-balance"
          >
            The story of ImpactX Global — building people, empowering ideas, and creating meaningful impact.
          </motion.p>

          {/* Subtle Premium Cosmic Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.22 }}
            className="relative max-w-3xl mx-auto h-48 sm:h-56 rounded-3xl overflow-hidden border border-[#E5C07B]/25 bg-gradient-to-b from-[#141524]/80 via-[#0C0D17]/90 to-[#07080F]/95 p-6 flex flex-col items-center justify-center shadow-[0_12px_48px_rgba(0,0,0,0.7)]"
          >
            {/* Subtle inner concentric orbital glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full border border-[#E5C07B]/10 animate-pulse" />
              <div className="absolute w-44 h-44 rounded-full border border-[#E5C07B]/20" />
              <div className="absolute w-20 h-20 rounded-full bg-gradient-radial from-[#E5C07B]/15 to-transparent blur-md" />
            </div>

            <div className="relative z-10 text-center space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5C07B]">
                ImpactX Global Digital Headquarters
              </span>
              <p className="font-serif-editorial italic text-2xl sm:text-3xl text-white font-normal">
                Curiosity has the courage to act.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ─── 2. HOW IT STARTED ─── */}
        <section className="relative">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65 }}
            className="p-8 sm:p-12 rounded-3xl bg-[#12131C]/85 border border-white/[0.12] hover:border-[#E5C07B]/35 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all relative overflow-hidden"
          >
            <div className="h-[2px] w-full absolute top-0 left-0 bg-gradient-to-r from-transparent via-[#E5C07B]/60 to-transparent" />

            <div className="max-w-3xl">
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#E5C07B] mb-4">
                Origin Story
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans-display font-extrabold text-white tracking-tight mb-6">
                It Started With a Vision.
              </h2>

              <div className="space-y-5 text-sm sm:text-base text-[#DCD7CA] leading-relaxed font-normal">
                <p>
                  ImpactX Global was built around a simple belief: learning should go beyond textbooks, certificates, and theoretical knowledge. People grow when they get opportunities to explore ideas, take ownership, collaborate, solve problems, and turn knowledge into meaningful work.
                </p>
                <p>
                  What began as an ambition to create more meaningful learning opportunities has evolved into a growing community focused on experiential learning, collaboration, and real-world exposure.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── 3. OUR JOURNEY (VISUAL TIMELINE) ─── */}
        <section className="relative">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#E5C07B] bg-[#E5C07B]/10 px-4 py-1.5 rounded-full border border-[#E5C07B]/25 mb-4">
              Cohort Timeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans-display font-extrabold text-white tracking-tight">
              Our Journey.
            </h2>
          </div>

          <div className="relative">
            {/* Vertical timeline spine */}
            <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-[#E5C07B]/40 via-[#E5C07B]/20 to-transparent -translate-x-1/2 hidden sm:block" />

            <div className="space-y-8 sm:space-y-12">
              {TIMELINE_BATCHES.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={item.batch}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                      isEven ? 'sm:flex-row-reverse' : ''
                    } gap-6 sm:gap-12`}
                  >
                    {/* Content Card */}
                    <div className="w-full sm:w-1/2">
                      <div
                        className={`p-6 sm:p-7 rounded-2xl bg-[#12131C]/90 border transition-all duration-300 ${
                          item.current
                            ? 'border-[#E5C07B]/60 shadow-[0_0_32px_rgba(229,192,123,0.18)]'
                            : 'border-white/[0.12] hover:border-[#E5C07B]/35'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="text-[11px] font-mono text-[#E5C07B] uppercase tracking-widest font-semibold">
                            {item.tag}
                          </span>
                          <span
                            className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                              item.current
                                ? 'bg-emerald-950/60 border-emerald-400/40 text-emerald-300'
                                : 'bg-white/[0.04] border-white/10 text-[#A6A298]'
                            }`}
                          >
                            {item.highlight}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-sans-display font-bold text-white mb-2 tracking-tight">
                          {item.batch}
                        </h3>

                        <p className="text-sm text-[#DCD7CA] leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Node Center Marker */}
                    <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#0D0D15] border-2 border-[#E5C07B] shadow-[0_0_16px_rgba(229,192,123,0.4)] shrink-0 z-10">
                      {item.current ? (
                        <span className="w-3 h-3 rounded-full bg-[#E5C07B] animate-ping" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-[#E5C07B]" />
                      )}
                    </div>

                    {/* Spacer for symmetry on desktop */}
                    <div className="hidden sm:block w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 4. WHAT WE BELIEVE ─── */}
        <section className="relative">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#E5C07B] bg-[#E5C07B]/10 px-4 py-1.5 rounded-full border border-[#E5C07B]/25 mb-4">
              Core Tenets
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans-display font-extrabold text-white tracking-tight">
              What We Believe.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {BELIEFS.map((belief, i) => {
              const Icon = belief.icon;

              return (
                <motion.div
                  key={belief.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="p-7 rounded-2xl bg-[#12131C]/85 border border-white/[0.12] hover:border-[#E5C07B]/45 hover:shadow-[0_6px_28px_rgba(229,192,123,0.12)] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1A1A26] border border-[#E5C07B]/30 flex items-center justify-center mb-5 group-hover:border-[#E5C07B]/60 transition-colors">
                    <Icon className="w-5 h-5 text-[#E5C07B]" />
                  </div>

                  <h3 className="text-lg font-sans-display font-bold text-white mb-2 tracking-tight">
                    {belief.title}
                  </h3>

                  <p className="text-sm text-[#CBC5B6] leading-relaxed font-normal">
                    {belief.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ─── 5. WHERE WE ARE TODAY ─── */}
        <section className="relative">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65 }}
            className="p-8 sm:p-12 rounded-3xl bg-[#12131C]/85 border border-white/[0.12] hover:border-[#E5C07B]/35 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all relative overflow-hidden"
          >
            <div className="h-[2px] w-full absolute top-0 left-0 bg-gradient-to-r from-transparent via-[#E5C07B]/60 to-transparent" />

            <div className="max-w-3xl">
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#E5C07B] mb-4">
                Current State
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans-display font-extrabold text-white tracking-tight mb-6">
                Where We Are Today.
              </h2>

              <div className="space-y-5 text-sm sm:text-base text-[#DCD7CA] leading-relaxed font-normal">
                <p>
                  ImpactX Global continues to create opportunities for learners to explore their interests, work on meaningful projects, collaborate with others, and develop through practical experiences.
                </p>
                <p>
                  Our growing community brings together people with different backgrounds, ideas, and ambitions, united by a shared willingness to learn, build, and contribute.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── 6. LOOKING AHEAD ─── */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65 }}
            className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#151625]/90 via-[#10111D]/90 to-[#0A0A12]/95 border border-[#E5C07B]/35 shadow-[0_12px_48px_rgba(0,0,0,0.7)]"
          >
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#E5C07B] mb-4">
              The Future
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans-display font-extrabold text-white tracking-tight mb-6">
              The Journey Is Still Unfolding.
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[#DCD7CA] max-w-2xl mx-auto leading-relaxed font-normal mb-10 text-balance">
              We are building towards a future where more learners can access meaningful opportunities, discover their potential, collaborate across disciplines, and turn their ideas into action.
            </p>

            {/* Closing Tagline */}
            <div className="inline-block p-4 sm:p-6 rounded-2xl bg-[#09090E] border border-[#E5C07B]/30 shadow-[0_0_24px_rgba(229,192,123,0.12)]">
              <p className="text-base sm:text-lg lg:text-xl font-mono text-[#F3D088] font-bold tracking-wide">
                Learn → Build → Lead → Create Impact.
              </p>
            </div>

            {/* Return Button */}
            <div className="mt-12">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold rounded-full bg-[#E5C07B] text-[#09090D] hover:bg-[#F3D088] transition-all duration-200 cursor-pointer shadow-[0_2px_16px_rgba(229,192,123,0.35)] hover:shadow-[0_4px_24px_rgba(229,192,123,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Home
              </button>
            </div>
          </motion.div>
        </section>

      </main>
    </motion.div>
  );
};

