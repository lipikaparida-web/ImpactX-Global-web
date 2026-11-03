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
            className="text-3xl sm:text-4xl font-sans-display font-extrabold text-[#FFFFFF] tracking-tight"
          >
            From Curious to{' '}
            <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FCEAC5] via-[#E8C57D] to-[#D4A247]">
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
                className="relative p-6 rounded-2xl bg-[#12131C]/85 border border-white/[0.12] hover:border-[#E5C07B]/40 hover:shadow-[0_4px_28px_rgba(229,192,123,0.12)] transition-all duration-300 group"
              >
                {/* Connector line (desktop) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-6 h-px bg-gradient-to-r from-[#E5C07B]/40 to-transparent -translate-y-px" aria-hidden="true" />
                )}

                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-sans-display font-extrabold text-[#E5C07B]/45 leading-none select-none">
                    {step.number}
                  </span>
                  <div className="p-2 rounded-xl bg-[#1A1A26] border border-[#E5C07B]/25 group-hover:border-[#E5C07B]/50 transition-colors">
                    <Icon className="w-4 h-4 text-[#E5C07B]" />
                  </div>
                </div>

                <h3 className="text-base font-sans-display font-semibold text-white mb-2">
                  {step.label}
                </h3>
                <p className="text-xs sm:text-sm text-[#D4CEBF] leading-relaxed font-normal">
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
