import React from 'react';
import { ArrowRight, ChevronRight, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenApply: () => void;
  onOpenDomains: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApply, onOpenDomains }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-36 pb-32 overflow-hidden bg-transparent z-10">
      
      {/* Center-Aligned Container with Generous Spacing */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10 my-auto">
        
        <div className="max-w-[840px] mx-auto text-center flex flex-col items-center space-y-8">
          
          {/* Status Eyebrow Badge */}
          <motion.button 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={onOpenApply}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#121215]/50 border border-[#C8A96A]/25 backdrop-blur-xl shadow-xl hover:border-[#C8A96A]/50 transition-all duration-500 group cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#C8A96A]" />
            <span className="text-xs font-mono text-[#9E9EA7] tracking-widest uppercase">
              Fall Applications are closed
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#C8A96A] group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>

          {/* Main Headline */}
          <div className="space-y-2 overflow-hidden">
            <motion.h1 
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-sans-display font-bold text-[#F7F4EE] leading-[1.08] tracking-tight text-balance"
            >
              <span className="sr-only">ImpactX Global - </span>
              Impact Starts{' '}
              <span className="font-serif-editorial italic font-normal text-[#C8A96A] block sm:inline">
                With You.
              </span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-[#9E9EA7] font-light leading-relaxed text-balance max-w-2xl mx-auto"
          >
            Empowering tomorrow's wizards through real-world internships that turn ideas into impact.
          </motion.p>

          {/* Action CTAs — symmetrical row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            
            {/* Primary CTA: Apply Now */}
            <button
              onClick={onOpenApply}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold text-[#0D0D0F] bg-[#F7F4EE] hover:bg-white transition-all duration-500 shadow-[0_4px_24px_rgba(247,244,238,0.18)] hover:shadow-[0_8px_36px_rgba(200,169,106,0.38)] hover:-translate-y-0.5 flex items-center justify-center gap-3 group cursor-pointer"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 text-[#0D0D0F] transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA: Explore Domains */}
            <button
              onClick={onOpenDomains}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-medium text-[#F7F4EE] bg-[#121215]/40 hover:bg-[#18181C]/70 border border-[#C8A96A]/30 hover:border-[#C8A96A]/60 backdrop-blur-xl transition-all duration-500 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#C8A96A]" />
              <span>Explore Domains</span>
            </button>

          </motion.div>

        </div>

      </div>

    </section>
  );
};
