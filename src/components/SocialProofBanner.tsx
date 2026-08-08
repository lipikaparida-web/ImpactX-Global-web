import React from 'react';
import { motion } from 'motion/react';

export const SocialProofBanner: React.FC = () => {
  return (
    <section className="relative z-10 w-full py-16 flex justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-[#C8A96A]/20 bg-[#0A0A0C]/80 backdrop-blur-md shadow-[0_8px_32px_rgba(200,169,106,0.15)] px-8 py-6 sm:px-10 sm:py-8 max-w-4xl w-full"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8A96A]/10 to-transparent opacity-50 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Avatars */}
          <div className="flex -space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="w-12 h-12 rounded-full border-2 border-[#0A0A0C] bg-[#1A1A1E] overflow-hidden shadow-lg"
              >
                <img 
                  src={`https://i.pravatar.cc/100?img=${i + 12}`} 
                  alt="Recent Applicant" 
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-2 border-[#0A0A0C] bg-[#C8A96A] flex items-center justify-center text-sm font-bold text-[#0D0D0F] shadow-lg z-10">
              +50
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-[#F7F4EE] leading-tight">
              Join 50+ visionary builders
            </h3>
            <p className="text-base text-[#9E9EA7] mt-1">
              who have already applied in the last <span className="text-[#C8A96A] font-medium">48 hours</span>. Spots are filling fast.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
