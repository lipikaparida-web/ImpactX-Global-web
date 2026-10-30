import React from 'react';
import { Hammer, Users, Award } from 'lucide-react';
import { motion } from 'motion/react';

const VALUE_PROPS = [
  {
    icon: Hammer,
    title: 'Real-World Projects',
    description:
      'Learn through meaningful contributions to practical work — not synthetic drills or artificial assignments.',
  },
  {
    icon: Users,
    title: 'Cross-Disciplinary Collaboration',
    description:
      'Collaborate with students across different interests, domains, and backgrounds to build something greater.',
  },
  {
    icon: Award,
    title: 'Verifiable Outcomes',
    description:
      'Build evidence of your contributions and experience that you can share and demonstrate.',
  },
];

export const WhyImpactX: React.FC = () => {
  return (
    <section
      id="why-us"
      className="py-16 sm:py-20 lg:py-24 relative bg-transparent border-t border-white/[0.04]"
      aria-labelledby="why-us-heading"
    >
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
            Why ImpactX Global
          </motion.span>
          <motion.h2
            id="why-us-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-sans-display font-bold text-[#F7F4EE] tracking-tight"
          >
            Built for Contribution.{' '}
            <span className="font-serif-editorial italic font-normal text-[#C8A96A]">
              Not Just Certificates.
            </span>
          </motion.h2>
        </div>

        {/* Value proposition cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {VALUE_PROPS.map((prop, i) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-7 rounded-2xl bg-[#0E0E13]/60 border border-white/[0.07] hover:border-[#C8A96A]/22 transition-all duration-300 text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#181820] border border-[#C8A96A]/20 group-hover:border-[#C8A96A]/40 transition-colors mb-5">
                  <Icon className="w-5 h-5 text-[#C8A96A]" />
                </div>
                <h3 className="text-base font-sans-display font-semibold text-white mb-3">
                  {prop.title}
                </h3>
                <p className="text-sm text-[#8E8E9A] leading-relaxed font-light">
                  {prop.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
