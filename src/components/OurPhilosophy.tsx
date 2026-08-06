import React, { useState } from 'react';
import { PHILOSOPHY_PRINCIPLES } from '../data/impactData';
import { Hammer, ShieldCheck, Award, Users, Compass } from 'lucide-react';

export const OurPhilosophy: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hammer': return <Hammer className="w-6 h-6 text-[#C8A96A]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#C8A96A]" />;
      case 'Award': return <Award className="w-6 h-6 text-[#C8A96A]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#C8A96A]" />;
      case 'Compass': return <Compass className="w-6 h-6 text-[#C8A96A]" />;
      default: return <Hammer className="w-6 h-6 text-[#C8A96A]" />;
    }
  };

  return (
    <section id="philosophy" className="py-36 sm:py-48 relative bg-transparent border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 backdrop-blur-md">
            03. Our Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans-display font-bold text-[#F7F4EE] tracking-tight max-w-3xl leading-tight">
            Principles Over Policies. <br />
            <span className="font-serif-editorial italic font-normal text-[#C8A96A]">How We Build & Lead.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9E9EA7] max-w-xl leading-relaxed font-light">
            We don’t believe in rigid corporate bureaucracy. Instead, our global movement is guided by five foundational tenets.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Navigation Cards List */}
          <div className="lg:col-span-5 space-y-4">
            {PHILOSOPHY_PRINCIPLES.map((item, idx) => (
              <button
                key={item.number}
                onClick={() => setActivePrinciple(idx)}
                className={`w-full p-6 rounded-3xl text-left transition-all duration-500 flex items-center justify-between border cursor-pointer ${
                  activePrinciple === idx
                    ? 'bg-[#18181C]/70 border-[#C8A96A]/50 shadow-[0_8px_32px_rgba(200,169,106,0.20)] backdrop-blur-2xl'
                    : 'bg-[#121215]/30 border-white/[0.05] hover:bg-[#18181C]/40 hover:border-[#C8A96A]/30 backdrop-blur-xl'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full transition-colors ${
                    activePrinciple === idx ? 'bg-[#C8A96A] text-[#0D0D0F]' : 'bg-white/5 text-[#9E9EA7]'
                  }`}>
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-sans-display font-semibold text-[#F7F4EE] text-base sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#9E9EA7] mt-0.5 font-light">{item.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Principle Deep Dive Card */}
          <div className="lg:col-span-7 p-10 sm:p-14 rounded-3xl bg-[#121215]/40 backdrop-blur-2xl border border-[#C8A96A]/20 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8A96A]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-10">
                <div className="p-4 rounded-2xl bg-[#0D0D0F]/70 border border-[#C8A96A]/20">
                  {getIcon(PHILOSOPHY_PRINCIPLES[activePrinciple].icon)}
                </div>
                <span className="text-5xl font-mono font-bold text-white/10">
                  {PHILOSOPHY_PRINCIPLES[activePrinciple].number}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-sans-display font-bold text-[#F7F4EE] tracking-tight">
                {PHILOSOPHY_PRINCIPLES[activePrinciple].title}
              </h3>

              <p className="mt-2 text-sm text-[#C8A96A] font-mono">
                — {PHILOSOPHY_PRINCIPLES[activePrinciple].subtitle}
              </p>

              <p className="mt-8 text-base sm:text-xl text-[#9E9EA7] leading-relaxed font-light">
                {PHILOSOPHY_PRINCIPLES[activePrinciple].description}
              </p>
            </div>

            <div className="mt-14 pt-8 border-t border-white/[0.05] flex items-center justify-between text-xs text-[#9E9EA7] font-mono tracking-wider">
              <span>IMPACTX MANIFESTO</span>
              <span>PRINCIPLE {activePrinciple + 1} OF 5</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
