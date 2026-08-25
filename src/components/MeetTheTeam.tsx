import React from 'react';
import { TEAM_MEMBERS } from '../data/impactData';
import { Linkedin, Github, Instagram, Quote } from 'lucide-react';

export const MeetTheTeam: React.FC = () => {
  return (
    <section id="team" className="py-36 sm:py-48 relative bg-transparent border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 backdrop-blur-md">
            08. Meet The Student Directors
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans-display font-bold text-[#F7F4EE] tracking-tight max-w-3xl leading-tight">
            Led by Builders, <br />
            <span className="font-serif-editorial italic font-normal text-[#C8A96A]">For Builders Everywhere.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9E9EA7] max-w-xl leading-relaxed font-light">
            ImpactX Global is entirely student-directed. Our leadership consists of active engineers, researchers, and project leads across global university chapters.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="mt-20 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 -mx-6 px-6 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="min-w-[85vw] sm:min-w-0 snap-center p-8 rounded-3xl bg-[#121215]/35 backdrop-blur-2xl border border-[#C8A96A]/15 hover:border-[#C8A96A]/35 transition-all duration-500 flex flex-col justify-between group shadow-2xl"
            >
              <div>
                {/* Member Avatar */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-[#C8A96A]/50 transition-colors">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <h3 className="text-xl font-sans-display font-bold text-[#F7F4EE] group-hover:text-[#C8A96A] transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-[#C8A96A] font-mono font-medium mt-0.5">
                  {member.role}
                </p>
                <p className="text-[11px] text-[#9E9EA7] font-mono mt-0.5">
                  {member.university} • {member.chapter}
                </p>

                <p className="mt-4 text-xs text-[#9E9EA7] leading-relaxed font-light">
                  {member.bio}
                </p>

                {/* Direct Quote Box */}
                <div className="mt-5 p-4 rounded-2xl bg-[#0D0D0F]/50 border border-white/[0.04] relative">
                  <Quote className="w-3.5 h-3.5 text-[#C8A96A] mb-1.5" />
                  <p className="text-xs text-[#F7F4EE] font-serif-editorial italic leading-relaxed">
                    "{member.quote}"
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-5 border-t border-white/[0.05] flex items-center gap-4 text-[#9E9EA7]">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#C8A96A] transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#C8A96A] transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#C8A96A] transition-colors"
                    aria-label="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4" />
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
