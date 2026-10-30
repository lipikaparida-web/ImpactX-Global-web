import React from 'react';
import { Search, FileText, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const STEPS = [
  {
    number: '01',
    label: 'Choose',
    icon: Search,
    description: 'Find the programme that best matches your interests and goals.',
  },
  {
    number: '02',
    label: 'Apply',
    icon: FileText,
    description: 'Submit the application through the relevant application form.',
  },
  {
    number: '03',
    label: 'Connect',
    icon: Users,
    description: 'Complete the applicable review and onboarding process.',
  },
  {
    number: '04',
    label: 'Build',
    icon: Zap,
    description: 'Participate, collaborate, and work towards meaningful outcomes.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 lg:py-24 relative bg-transparent border-t border-white/[0.04]"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 mb-5"
          >
            How It Works
          </motion.span>
          <motion.h2
            id="how-it-works-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-sans-display font-bold text-[#F7F4EE] tracking-tight"
          >
            From Curious to{' '}
            <span className="font-serif-editorial italic font-normal text-[#C8A96A]">
              Contributing.
            </span>
          </motion.h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-6 rounded-2xl bg-[#0E0E13]/60 border border-white/[0.07] hover:border-[#C8A96A]/20 transition-all duration-300 group"
              >
                {/* Connector line (desktop) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-6 h-px bg-gradient-to-r from-[#C8A96A]/30 to-transparent -translate-y-px" aria-hidden="true" />
                )}

                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-sans-display font-bold text-[#C8A96A]/25 leading-none select-none">
                    {step.number}
                  </span>
                  <div className="p-2 rounded-xl bg-[#1A1A22] border border-[#C8A96A]/15 group-hover:border-[#C8A96A]/35 transition-colors">
                    <Icon className="w-4 h-4 text-[#C8A96A]" />
                  </div>
                </div>

                <h3 className="text-base font-sans-display font-semibold text-white mb-2">
                  {step.label}
                </h3>
                <p className="text-xs sm:text-sm text-[#8E8E9A] leading-relaxed font-light">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
