import React from 'react';
import { TESTIMONIALS } from '../data/impactData';
import { Quote, Linkedin, ExternalLink, Compass } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-36 sm:py-48 relative bg-transparent border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 backdrop-blur-md">
            11. Alumni Trajectories
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans-display font-bold text-[#F7F4EE] tracking-tight max-w-3xl leading-tight">
            Where Are They Now? <br />
            <span className="font-serif-editorial italic font-normal text-[#C8A96A]">Real Stories from Alumni Builders.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9E9EA7] max-w-xl leading-relaxed font-light">
            Our alumni go on to found seed-backed startups, build core infrastructure at tier-1 technology firms, and publish research worldwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-[#121215]/35 backdrop-blur-2xl border border-[#C8A96A]/15 hover:border-[#C8A96A]/35 transition-all duration-500 flex flex-col justify-between group shadow-2xl"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-sans-display font-bold text-[#F7F4EE] text-base group-hover:text-[#C8A96A] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#C8A96A] font-medium">
                      {item.role} @ <span className="text-[#F7F4EE] font-semibold">{item.currentOrganization}</span>
                    </p>
                    <span className="text-[10px] text-[#9E9EA7] font-mono">
                      {item.cohortYear} • {item.domain}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="w-5 h-5 text-[#C8A96A] mb-3 opacity-60" />
                  <p className="text-sm text-[#F7F4EE] leading-relaxed font-serif-editorial italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Growth Trajectory Story */}
                <div className="mt-6 p-4 rounded-2xl bg-[#0D0D0F]/50 border border-white/[0.04]">
                  <span className="text-[10px] font-mono uppercase text-[#C8A96A] flex items-center gap-1.5 mb-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#C8A96A]" /> ImpactX Trajectory
                  </span>
                  <p className="text-xs text-[#9E9EA7] leading-relaxed font-light">
                    {item.growthStory}
                  </p>
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-8 pt-5 border-t border-white/[0.05] flex items-center justify-between">
                <a
                  href={item.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#9E9EA7] hover:text-[#C8A96A] flex items-center gap-1.5 transition-colors font-mono"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>Verified Profile</span>
                </a>

                {item.portfolioUrl && (
                  <a
                    href={item.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#C8A96A] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Portfolio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
