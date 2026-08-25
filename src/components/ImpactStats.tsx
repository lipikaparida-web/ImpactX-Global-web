import React, { useState } from 'react';
import { InteractiveGlobe, CountryNode } from './InteractiveGlobe';
import { Globe, ArrowRight, Compass, Users, Code2, GraduationCap, Building2 } from 'lucide-react';

interface ImpactStatsProps {
  onOpenApply?: () => void;
}

const ECOSYSTEM_PILLARS = [
  {
    icon: Users,
    title: 'Cross-Border Collaboration',
    description: 'Students and builders working across timezones on real-world production systems and research.',
  },
  {
    icon: Building2,
    title: 'India HQ & Global Chapters',
    description: 'Headquartered in India with international student leadership circles launching globally.',
  },
  {
    icon: Code2,
    title: 'Open Production Systems',
    description: 'Every cohort builds real software, open-source infrastructure, and published research papers.',
  },
  {
    icon: GraduationCap,
    title: 'Direct Industry Mentorship',
    description: '1:1 guidance from experienced engineers, founders, and research domain advisors.',
  },
];

export const ImpactStats: React.FC<ImpactStatsProps> = ({ onOpenApply }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryNode | null>(null);

  return (
    <section id="impact" className="py-36 sm:py-48 relative bg-transparent border-t border-white/[0.04] overflow-hidden">
      
      {/* Background Subtle Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-[#C8A96A]/08 via-[#4A1E28]/08 to-transparent blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Top Header & Intro Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 sm:mb-24">
          
          {/* Left Column: Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-[#C8A96A]" />
              <span>10. International Movement</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans-display font-bold text-[#F7F4EE] tracking-tight leading-[1.08]">
              Building a <br className="hidden sm:inline" />
              <span className="font-serif-editorial italic font-normal text-[#C8A96A]">
                Global Movement.
              </span>
            </h2>

            <p className="text-xl sm:text-2xl font-sans-display font-medium text-[#C8A96A] tracking-tight">
              Headquartered in India. Open to the World.
            </p>

            <p className="text-base sm:text-lg text-[#9E9EA7] leading-relaxed font-light">
              ImpactX Global is building an international ecosystem where students, researchers, engineers, and innovators collaborate across borders. Whether you are in India, Europe, North America, or beyond, you can join the community and contribute to real-world software, research, and policy.
            </p>
          </div>

          {/* Right Column: Global Announcement Callout Card */}
          <div className="lg:col-span-5">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#121215]/40 border border-[#C8A96A]/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden group hover:border-[#C8A96A]/40 transition-all duration-500">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C8A96A] animate-pulse" />
                <span className="text-xs font-mono font-semibold text-[#C8A96A] uppercase tracking-wider">
                  Global Admissions
                </span>
              </div>

              <h3 className="text-2xl font-sans-display font-bold text-[#F7F4EE] tracking-tight">
                Applications Open Worldwide
              </h3>

              <p className="text-sm text-[#9E9EA7] mt-3 leading-relaxed font-light">
                Students and professionals from every country are invited to apply. Current headquarters are in India while our international chapters and offices are launching globally.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  disabled
                  className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#9E9EA7] bg-white/5 border border-white/10 flex items-center justify-center gap-2.5 cursor-not-allowed"
                >
                  <span>Applications Closed</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Hero 3D Interactive Globe Section */}
        <div className="my-16 sm:my-20 p-8 sm:p-12 rounded-3xl bg-[#121215]/30 border border-[#C8A96A]/15 backdrop-blur-2xl relative overflow-hidden shadow-2xl">
          
          <div className="flex flex-col items-center text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9E9EA7] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#C8A96A]" />
              Interactive Global Chapter Map
            </span>
            <p className="text-xs text-[#9E9EA7] mt-1.5 font-mono">
              Drag to rotate globe • Click country marker to inspect chapter status
            </p>
          </div>

          {/* Interactive Globe Component */}
          <InteractiveGlobe
            onSelectCountry={(country) => setSelectedCountry(country)}
            onOpenApply={onOpenApply}
          />
        </div>

        {/* Ecosystem Pillars */}
        <div id="chapters" className="mt-20 sm:mt-24">
          <div className="text-center mb-10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#C8A96A]">
              Core Global Ecosystem Pillars
            </h3>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 -mx-6 px-6 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
            {ECOSYSTEM_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="min-w-[85vw] sm:min-w-0 snap-center p-8 rounded-3xl bg-[#121215]/35 border border-[#C8A96A]/15 hover:border-[#C8A96A]/35 transition-all duration-500 flex flex-col justify-between group backdrop-blur-2xl shadow-2xl"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#0D0D0F]/60 border border-[#C8A96A]/20 flex items-center justify-center mb-5 group-hover:border-[#C8A96A]/40 transition-colors">
                      <Icon className="w-5 h-5 text-[#C8A96A]" />
                    </div>
                    <h4 className="text-lg font-sans-display font-bold text-[#F7F4EE] tracking-tight group-hover:text-[#C8A96A] transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#9E9EA7] mt-3 leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
