import React, { useState } from 'react';
import { PROGRAMS } from '../data/impactData';
import { Program } from '../types';
import { Code2, Crown, BookOpenCheck, Globe2, Compass, Clock, Calendar, Check, ArrowRight, X } from 'lucide-react';

interface ProgramsProps {
  onSelectProgramToApply: (programId: string) => void;
}

export const Programs: React.FC<ProgramsProps> = ({ onSelectProgramToApply }) => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const getProgramIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-6 h-6 text-[#C8A96A]" />;
      case 'Crown': return <Crown className="w-6 h-6 text-[#C8A96A]" />;
      case 'BookOpenCheck': return <BookOpenCheck className="w-6 h-6 text-[#C8A96A]" />;
      case 'Globe2': return <Globe2 className="w-6 h-6 text-[#C8A96A]" />;
      case 'Sparkles': return <Compass className="w-6 h-6 text-[#C8A96A]" />;
      default: return <Code2 className="w-6 h-6 text-[#C8A96A]" />;
    }
  };

  return (
    <section id="programs" className="py-36 sm:py-48 relative bg-transparent border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 backdrop-blur-md">
            05. Core Programs
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans-display font-bold text-[#F7F4EE] tracking-tight max-w-3xl leading-tight">
            Tailored Pathways for Every <br />
            <span className="font-serif-editorial italic font-normal text-[#C8A96A]">Stage of Student Growth.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9E9EA7] max-w-xl leading-relaxed font-light">
            Select the track aligned with your ambition—whether you want to ship software, direct multidisciplinary teams, or author policy papers.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="mt-20 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 -mx-6 px-6 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-10">
          {PROGRAMS.map((program) => (
            <div
              key={program.id}
              className="min-w-[85vw] sm:min-w-0 snap-center p-8 sm:p-10 rounded-3xl bg-[#121215]/35 backdrop-blur-2xl border border-[#C8A96A]/15 hover:border-[#C8A96A]/35 shadow-2xl transition-all duration-500 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 rounded-2xl bg-[#0D0D0F]/60 border border-[#C8A96A]/20">
                    {getProgramIcon(program.iconName)}
                  </div>
                  {program.badge && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0D0D0F] bg-[#C8A96A] px-3.5 py-1 rounded-full shadow-md">
                      {program.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-sans-display font-bold text-[#F7F4EE] group-hover:text-[#C8A96A] transition-colors">
                  {program.title}
                </h3>
                <p className="text-xs text-[#C8A96A] font-mono mt-1.5">
                  {program.subtitle}
                </p>

                <p className="mt-5 text-xs sm:text-sm text-[#9E9EA7] leading-relaxed font-light">
                  {program.description}
                </p>

                {/* Key Details Pills */}
                <div className="mt-8 flex flex-wrap gap-2.5 text-xs font-mono text-[#9E9EA7]">
                  <span className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#C8A96A]" /> {program.duration}
                  </span>
                  <span className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#C8A96A]" /> {program.commitment}
                  </span>
                </div>

                {/* Key Takeaways Checklist */}
                <div className="mt-8 pt-6 border-t border-white/[0.05] space-y-3">
                  {(program.keyTakeaways || []).map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#9E9EA7] font-light">
                      <Check className="w-4 h-4 text-[#C8A96A] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 pt-6 border-t border-white/[0.05] flex items-center gap-3">
                <button
                  onClick={() => setSelectedProgram(program)}
                  className="flex-1 py-3 px-4 text-xs font-medium text-[#F7F4EE] bg-[#121215]/50 hover:bg-[#18181C] border border-[#C8A96A]/20 rounded-full transition-all cursor-pointer"
                >
                  View Details
                </button>
                <button
                  disabled
                  className="py-3 px-5 text-xs font-semibold rounded-full flex items-center gap-2 transition-all bg-white/5 text-[#9E9EA7] cursor-not-allowed border border-white/10"
                >
                  <span>Applications Closed</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0D0F]/85 backdrop-blur-xl">
          <div className="w-full max-w-2xl bg-[#121215]/95 border border-[#C8A96A]/30 rounded-3xl p-8 sm:p-10 max-h-[90vh] overflow-y-auto relative shadow-2xl backdrop-blur-2xl">
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-[#9E9EA7] hover:text-[#F7F4EE] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-[#0D0D0F] border border-[#C8A96A]/20">
                {getProgramIcon(selectedProgram.iconName)}
              </div>
              <div>
                <h3 className="text-2xl font-sans-display font-bold text-[#F7F4EE]">
                  {selectedProgram.title}
                </h3>
                <span className="text-xs font-mono text-[#C8A96A]">
                  {selectedProgram.subtitle} • {selectedProgram.format}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#9E9EA7] leading-relaxed font-light mb-8">
              {selectedProgram.description}
            </p>

            <div className="p-5 rounded-2xl bg-[#0D0D0F]/80 border border-white/[0.06] mb-8 space-y-2">
              <h4 className="text-xs font-mono uppercase text-[#C8A96A] tracking-wider">Target Profile</h4>
              <p className="text-xs sm:text-sm text-[#F7F4EE] font-light">
                {selectedProgram.idealFor}
              </p>
            </div>

            <h4 className="text-xs font-mono uppercase text-[#9E9EA7] tracking-wider mb-4">Key Takeaways</h4>
            <div className="space-y-3 mb-10">
              {(selectedProgram?.keyTakeaways || []).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <Check className="w-4 h-4 text-[#C8A96A] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#9E9EA7] font-light">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/[0.06]">
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-6 py-2.5 text-xs font-medium text-[#9E9EA7] hover:text-[#F7F4EE]"
              >
                Close
              </button>
              <button
                disabled
                className="px-8 py-3 text-xs font-semibold rounded-full flex items-center gap-2 transition-all bg-white/5 text-[#9E9EA7] cursor-not-allowed border border-white/10"
              >
                <span>Applications Closed</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
