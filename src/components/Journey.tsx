import React, { useState } from 'react';
import { JOURNEY_STAGES } from '../data/impactData';
import { CheckCircle2, ShieldCheck, Train, Calendar } from 'lucide-react';

// 4-week internship timeline weeks
const INTERNSHIP_WEEKS = [
  {
    week: 'Week 1',
    title: 'Onboarding & Orientation',
    color: '#C8A96A',
    tasks: ['Meet your squad & mentor', 'Set up dev / design environment', 'Review project brief & scope'],
  },
  {
    week: 'Week 2',
    title: 'Foundation Sprints',
    color: '#D4AF37',
    tasks: ['Begin core deliverable work', 'Daily standups & check-ins', 'Mid-sprint peer review'],
  },
  {
    week: 'Week 3',
    title: 'Deep Build & Iteration',
    color: '#E6B566',
    tasks: ['Full ownership of feature / deliverable', 'Client / stakeholder feedback loop', 'Portfolio documentation'],
  },
  {
    week: 'Week 4',
    title: 'Launch & Showcase',
    color: '#F5E6C8',
    tasks: ['Final deliverable submission', 'Public portfolio publish', 'Demo day & cohort showcase'],
  },
];

export const Journey: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const currentStage = JOURNEY_STAGES.find(s => s.step === activeStep) || JOURNEY_STAGES[0];

  return (
    <section id="journey" className="py-36 sm:py-48 relative bg-transparent border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-start space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 backdrop-blur-md">
            07. The Builder Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans-display font-bold text-[#FFFFFF] tracking-tight max-w-3xl leading-tight">
            From Curious Explorer to <br />
            <span className="font-serif-editorial italic font-normal text-[#C8A96A]">Global Ecosystem Leader.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#D1CBC0] max-w-xl leading-loose font-light">
            An eight-stage progression framework supporting you from initial application to lifelong alumni leverage.
          </p>
        </div>

        {/* ── 4-Week Internship Timeline ── */}
        <div className="mt-20">
          {/* Timeline header label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8A96A]/10 border border-[#C8A96A]/20">
              <Train className="w-3.5 h-3.5 text-[#C8A96A]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A] font-semibold">
                Internship Timeline · 1 Month · 4 Weeks
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-[#D1CBC0]">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D1CBC0]" />
              <span>All domain internships are 4 weeks long</span>
            </div>
          </div>

          {/* Four-week cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INTERNSHIP_WEEKS.map((wk, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-[#121215]/40 backdrop-blur-xl border border-white/[0.06] hover:border-[#C8A96A]/25 transition-all duration-300 group overflow-hidden"
              >
                {/* Subtle gradient top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${wk.color}60, transparent)` }}
                />

                {/* Week badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-mono font-bold px-2.5 py-1 rounded-full border"
                    style={{
                      color: wk.color,
                      borderColor: `${wk.color}40`,
                      backgroundColor: `${wk.color}10`,
                    }}
                  >
                    {wk.week}
                  </span>
                  <span className="text-xs font-mono text-[#D1CBC0]">{idx + 1}/4</span>
                </div>

                <h4 className="font-sans-display font-semibold text-[#FFFFFF] text-sm mb-4 group-hover:text-[#C8A96A] transition-colors">
                  {wk.title}
                </h4>

                <ul className="space-y-2">
                  {wk.tasks.map((task, ti) => (
                    <li key={ti} className="flex items-start gap-2 text-sm text-[#D1CBC0] font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96A]/60 shrink-0 mt-2" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>

                {/* Connector arrow (except last) */}
                {idx < 3 && (
                  <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-5 h-5 rounded-full bg-[#0D0D0F] border border-[#C8A96A]/30 z-10">
                    <span className="text-[#C8A96A] text-xs">›</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Timeline progress bar */}
          <div className="mt-6 flex items-center gap-0 rounded-full overflow-hidden h-1.5 bg-white/[0.04] border border-white/[0.04]">
            {INTERNSHIP_WEEKS.map((wk, idx) => (
              <div
                key={idx}
                className="h-full flex-1 transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${wk.color}80, ${wk.color}40)` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {INTERNSHIP_WEEKS.map((wk, idx) => (
              <span key={idx} className="text-[10px] sm:text-xs font-mono text-[#D1CBC0]">{wk.week}</span>
            ))}
          </div>
        </div>

        {/* ── Step Progression Bar ── */}
        <div className="mt-20 overflow-x-auto pb-6">
          <div className="flex items-center min-w-[800px] justify-between relative px-6">
            
            {/* Background Line */}
            <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-white/[0.06] -translate-y-1/2 z-0" />

            {JOURNEY_STAGES.map((stage) => {
              const isActive = stage.step === activeStep;
              const isPast = stage.step < activeStep;

              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStep(stage.step)}
                  className="relative z-10 flex flex-col items-center gap-3 group cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-500 ${
                    isActive
                      ? 'bg-[#C8A96A] text-[#0D0D0F] scale-110 shadow-[0_4px_24px_rgba(200,169,106,0.4)] ring-4 ring-[#C8A96A]/20'
                      : isPast
                      ? 'bg-[#4A1E28] text-[#FFFFFF] border border-[#C8A96A]/40'
                      : 'bg-[#121215] text-[#D1CBC0] border border-white/10 group-hover:border-white/30'
                  }`}>
                    {stage.step}
                  </div>
                  <span className={`text-sm font-sans-display font-medium whitespace-nowrap transition-colors ${
                    isActive ? 'text-[#FFFFFF]' : 'text-[#D1CBC0]'
                  }`}>
                    {stage.title}
                  </span>
                </button>
              );
            })}

          </div>
        </div>

        {/* ── Active Stage Detail Card ── */}
        <div className="mt-10 p-8 sm:p-12 rounded-3xl bg-[#121215]/40 backdrop-blur-2xl border border-[#C8A96A]/20 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Stage Summary */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#0D0D0F] bg-[#C8A96A] px-3 py-1 rounded-full">
                  STAGE 0{currentStage.step}
                </span>
                <span className="text-xs font-mono text-[#C8A96A]">
                  TIMEFRAME: {currentStage.timeframe}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-sans-display font-bold text-[#FFFFFF] tracking-tight">
                {currentStage.title}
              </h3>
              <p className="text-base text-[#C8A96A] font-serif-editorial italic">
                — {currentStage.subtitle}
              </p>

              <p className="text-base sm:text-lg text-[#D1CBC0] leading-loose font-light">
                {currentStage.description}
              </p>
            </div>

            {/* Responsibilities & Perks */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Responsibilities Box */}
              <div className="p-6 rounded-2xl bg-[#0D0D0F]/60 border border-white/[0.05] space-y-3">
                <h4 className="text-xs font-mono uppercase text-[#C8A96A] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C8A96A]" /> Key Deliverables
                </h4>
                <ul className="space-y-3">
                  {(currentStage.responsibilities || []).map((resp, idx) => (
                    <li key={idx} className="text-sm text-[#D1CBC0] flex items-start gap-2 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96A] shrink-0 mt-2" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Perks Box */}
              <div className="p-6 rounded-2xl bg-[#C8A96A]/10 border border-[#C8A96A]/20 space-y-3">
                <h4 className="text-xs font-mono uppercase text-[#FFFFFF] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A96A]" /> Stage Milestones
                </h4>
                <ul className="space-y-3">
                  {(currentStage.unlockedPerks || []).map((perk, idx) => (
                    <li key={idx} className="text-sm text-[#FFFFFF] flex items-start gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96A] shrink-0 mt-2" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
