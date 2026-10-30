import React from 'react';
import { motion } from 'motion/react';
import { TEAM_MEMBERS } from '../data/impactData';

export const OurStorySection: React.FC = () => {
  return (
    <section
      id="story"
      className="py-16 sm:py-20 lg:py-24 relative bg-transparent border-t border-white/[0.04]"
      aria-labelledby="story-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-gradient-radial from-[#1A1A2E]/[0.15] to-transparent blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: narrative */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 mb-5"
            >
              Our Story
            </motion.span>

            <motion.h2
              id="story-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-3xl sm:text-4xl font-sans-display font-bold text-[#F7F4EE] tracking-tight leading-tight mb-6"
            >
              A community built on{' '}
              <span className="font-serif-editorial italic font-normal text-[#C8A96A]">
                meaningful work.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 text-sm sm:text-base text-[#9E9EA7] leading-relaxed font-light"
            >
              <p>
                ImpactX Global began with a straightforward belief: students deserve more than
                passive observation. They deserve the opportunity to contribute to real work,
                collaborate across disciplines, and develop the kind of experience that actually
                matters.
              </p>
              <p>
                We are a student-driven interdisciplinary ecosystem. Our members build real
                projects, conduct research, develop leadership, and connect across fields —
                guided by the conviction that meaningful impact starts with deliberate effort.
              </p>
              <p>
                Headquartered in India and open to students worldwide, ImpactX Global is
                shaping an environment where curiosity has the courage to act.
              </p>
            </motion.div>
          </div>

          {/* Right: founder cards */}
          <div className="space-y-4">
            {TEAM_MEMBERS.slice(0, 2).map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#0E0E13]/60 border border-white/[0.07] hover:border-[#C8A96A]/20 transition-all duration-300"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#C8A96A]/20 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1A1A22&color=C8A96A&size=48`;
                  }}
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{member.name}</p>
                  <p className="text-xs text-[#C8A96A] font-mono mb-2">{member.role}</p>
                  <p className="text-xs text-[#8E8E9A] leading-relaxed font-light italic">
                    "{member.quote}"
                  </p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-2 text-[10px] font-mono text-[#C8A96A]/70 hover:text-[#C8A96A] transition-colors"
                    >
                      LinkedIn →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
