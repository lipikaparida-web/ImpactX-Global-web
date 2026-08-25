import React from 'react';
import { APPLICATION_STEPS } from '../data/impactData';
import { ArrowRight, Compass } from 'lucide-react';

interface ApplicationJourneyProps {
  onOpenApply: () => void;
}

export const ApplicationJourney: React.FC<ApplicationJourneyProps> = ({ onOpenApply }) => {
  return (
    <section className="py-36 sm:py-48 relative bg-transparent border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 backdrop-blur-md">
            12. Application Pipeline
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans-display font-bold text-[#F7F4EE] tracking-tight max-w-3xl leading-tight">
            Simple. Transparent. Human. <br />
            <span className="font-serif-editorial italic font-normal text-[#C8A96A]">How You Join the Ecosystem.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9E9EA7] max-w-xl leading-relaxed font-light">
            No standardized test scores or arbitrary gatekeeping filters. We evaluate curiosity, commitment, and proof of passion.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {APPLICATION_STEPS.slice(0, 4).map((step) => (
            <div
              key={step.stepNumber}
              className="p-8 rounded-3xl bg-[#121215]/35 backdrop-blur-2xl border border-[#C8A96A]/15 hover:border-[#C8A96A]/35 transition-all duration-500 relative flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="w-9 h-9 rounded-full bg-[#C8A96A]/20 text-[#C8A96A] font-mono text-xs font-bold flex items-center justify-center border border-[#C8A96A]/30">
                    0{step.stepNumber}
                  </span>
                  <span className="text-[10px] font-mono text-[#9E9EA7]">
                    {step.estimatedDays}
                  </span>
                </div>

                <h3 className="font-sans-display font-bold text-[#F7F4EE] text-lg">
                  {step.title}
                </h3>
                <p className="text-xs text-[#C8A96A] font-mono mt-0.5">
                  {step.subtitle}
                </p>

                <p className="mt-4 text-xs sm:text-sm text-[#9E9EA7] leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA Banner */}
        <div className="mt-16 p-10 sm:p-14 rounded-3xl bg-[#121215]/40 backdrop-blur-2xl border border-[#C8A96A]/25 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="space-y-3 text-center md:text-left relative z-10">
            <h3 className="text-2xl sm:text-4xl font-sans-display font-bold text-[#F7F4EE] tracking-tight">
              Ready to Build What Matters?
            </h3>
            <p className="text-xs sm:text-base text-[#9E9EA7] max-w-xl font-light">
              Applications for our upcoming Global Cohort are now open. Takes less than 15 minutes to share your profile.
            </p>
          </div>

          <button
            disabled
            className="px-9 py-4 text-xs sm:text-sm font-semibold text-[#9E9EA7] bg-white/5 border border-white/10 rounded-full flex items-center gap-3 cursor-not-allowed shrink-0 relative z-10"
          >
            <span>Applications Closed</span>
          </button>
        </div>

      </div>
    </section>
  );
};
