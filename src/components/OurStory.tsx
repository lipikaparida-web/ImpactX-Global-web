import React from 'react';
import { ShieldAlert, CheckCircle2, Compass, Wand2, Terminal, Sparkles, FolderKanban, Award, Globe, Target } from 'lucide-react';

export const OurStory: React.FC = () => {
  const wizardOutcomes = [
    {
      step: '01',
      title: 'Production Experience',
      icon: Terminal,
      tag: 'Production-Ready',
      desc: 'Real-world codebases, live product deployments, and published research—never synthetic drills or throwaway tickets.'
    },
    {
      step: '02',
      title: 'Unshakeable Confidence',
      icon: Sparkles,
      tag: 'Battle-Tested',
      desc: 'Conquering imposter syndrome through high-stakes execution, real responsibility, and direct expert mentorship.'
    },
    {
      step: '03',
      title: 'Verifiable Portfolio',
      icon: FolderKanban,
      tag: 'Public Proof',
      desc: 'A permanent digital footprint featuring live demo URLs, open GitHub repositories, and quantifiable impact metrics.'
    },
    {
      step: '04',
      title: 'Squad Leadership',
      icon: Award,
      tag: 'End-to-End Ownership',
      desc: 'Directing cross-functional agile squads, presenting to industry leaders, and driving architectural accountability.'
    },
    {
      step: '05',
      title: 'Global Peer & Mentor Network',
      icon: Globe,
      tag: '38+ Nations',
      desc: 'Lifelong relationships with elite builders, venture partners, and distinguished domain advisors across 38+ countries.'
    },
    {
      step: '06',
      title: 'High-Leverage Purpose',
      icon: Target,
      tag: 'Real-World Scale',
      desc: 'Directing engineering craftsmanship toward solving grand global challenges in AI, deeptech, health, and climate.'
    }
  ];

  return (
    <section id="story" className="pt-4 sm:pt-8 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Eyebrow & Title */}
        <div className="flex flex-col items-start space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 backdrop-blur-md">
            02. Our Story
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans-display font-bold text-[#F7F4EE] tracking-tight max-w-4xl leading-tight">
            Students Don't Need Another Certificate. <br />
            <span className="font-serif-editorial italic font-normal text-[#C8A96A]">They Need a Chance to Create Impact.</span>
          </h2>
        </div>

        {/* Narrative Grid */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-[#9E9EA7] text-base sm:text-lg leading-relaxed font-light">
            <p className="text-[#F7F4EE] font-normal text-xl sm:text-2xl leading-relaxed">
              For too long, internships have been reduced to attendance sheets, repetitive tasks, and certificates that are forgotten the moment they're downloaded. Students leave with proof that they participated, but not proof that they contributed.
            </p>
            <p className="text-[#C8A96A] font-serif-editorial italic text-xl font-medium">
              ImpactXGlobal was founded to change that.
            </p>
            <p>
              We believe learning happens when students are trusted with real responsibility, challenged by meaningful work, and surrounded by people who inspire growth. Every internship is built around collaboration, innovation, leadership, and execution—not observation.
            </p>
            <p>
              When an ImpactXGlobal builder completes their journey, they don't simply leave with another certificate.
            </p>
            <p className="text-[#F7F4EE] font-medium border-l-2 border-[#C8A96A] pl-4 py-1">
              They leave with experience that speaks for itself, skills that create opportunities, and an impact that lasts far beyond the internship.
            </p>
          </div>

          {/* Guarantee Glass Card - Translucent Charcoal */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-[#121215]/40 backdrop-blur-2xl border border-[#C8A96A]/20 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#4A1E28]/20 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#9E9EA7] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#C8A96A]" />
              <span>The ImpactX Standard</span>
            </h3>

            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#0D0D0F]/50 border border-white/[0.04] space-y-1.5">
                <span className="text-xs text-[#9E9EA7] font-mono uppercase tracking-wider">Conventional Internship</span>
                <p className="text-sm text-[#9E9EA7] font-light">Theoretical assignments, superficial feedback, and zero lasting impact.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#C8A96A]/10 border border-[#C8A96A]/25 space-y-1.5">
                <span className="text-xs text-[#C8A96A] font-mono flex items-center gap-1.5 uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5 text-[#C8A96A]" /> The ImpactX Track
                </span>
                <p className="text-sm text-[#F7F4EE] font-medium leading-relaxed">
                  Production codebases, published research papers, and verifiable global impact.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* What Every ImpactX Wizard Leaves With - Redesigned Grid */}
        <div className="mt-28 pt-20 border-t border-white/[0.06] relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C8A96A] mb-2">
                <Wand2 className="w-4 h-4" />
                <span>Wizard Transformation</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-sans-display font-bold text-[#F7F4EE] tracking-tight">
                What Every ImpactX Wizard Leaves With
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#9E9EA7] max-w-md font-light">
              Beyond generic attendance credentials—concrete, battle-tested assets that elevate ambitious students into world-class innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {wizardOutcomes.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx} 
                  className="group relative p-8 rounded-3xl bg-[#121215]/50 backdrop-blur-2xl border border-[#C8A96A]/15 hover:border-[#C8A96A]/45 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle Corner Glow on Hover */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#C8A96A]/10 rounded-full blur-2xl group-hover:bg-[#C8A96A]/20 transition-all duration-500 pointer-events-none" />

                  <div>
                    {/* Top Header Row: Step Number & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono font-bold text-[#C8A96A]/60 group-hover:text-[#C8A96A] transition-colors">
                        {item.step}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8A96A] bg-[#C8A96A]/10 px-2.5 py-1 rounded-full border border-[#C8A96A]/20">
                        {item.tag}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#0D0D0F] border border-[#C8A96A]/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-[#C8A96A]/50 transition-all duration-300">
                        <IconComp className="w-5 h-5 text-[#C8A96A]" />
                      </div>
                      <h4 className="font-sans-display font-semibold text-[#F7F4EE] text-lg sm:text-xl group-hover:text-[#C8A96A] transition-colors">
                        {item.title}
                      </h4>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#9E9EA7] leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Indicator */}
                  <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-[#9E9EA7]/70 group-hover:text-[#F7F4EE] transition-colors">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A96A]" />
                      Verified Outcome
                    </span>
                    <span className="text-[#C8A96A] opacity-0 group-hover:opacity-100 transition-opacity font-bold">→</span>
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

