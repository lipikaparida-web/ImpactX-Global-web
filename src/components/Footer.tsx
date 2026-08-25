import React from 'react';
import { ArrowUp, Instagram, Linkedin, Mail, ShieldCheck, Terminal, Compass } from 'lucide-react';
import { ImpactXLogo } from './ImpactXLogo';

interface FooterProps {
  onOpenApply?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenApply }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-transparent border-t border-white/[0.04] text-sm text-[#D1CBC0] overflow-hidden pt-20 pb-16">
      
      {/* Background Radial Atmosphere Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-t from-[#C8A96A]/08 via-[#4A1E28]/05 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Top Pre-Footer CTA Bar */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#121215]/40 border border-[#C8A96A]/20 backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-20 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8A96A] animate-pulse" />
              <span className="text-xs font-mono text-[#C8A96A] uppercase tracking-wider font-semibold">
                Global Cohort Applications Open
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-sans-display font-bold text-[#FFFFFF] tracking-tight">
              Ready to build real software & publish research?
            </h3>
            <p className="text-sm sm:text-base text-[#D1CBC0] font-light">
              Join students and innovators from 38+ countries in our upcoming Global Cohort.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {onOpenApply && (
              <button
                disabled
                className="px-6 py-3 rounded-full text-sm font-semibold text-[#9E9EA7] bg-white/5 border border-white/10 cursor-not-allowed flex items-center gap-2"
              >
                <span>Applications Closed</span>
              </button>
            )}
            <a
              href="#domains"
              className="px-5 py-3 rounded-full text-sm font-medium text-[#FFFFFF] bg-[#0D0D0F]/60 border border-[#C8A96A]/20 hover:border-[#C8A96A]/40 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-[#C8A96A]" />
              <span>Explore Domains</span>
            </a>
          </div>
        </div>

        {/* Main Footer Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/[0.05]">
          
          {/* Column 1: Brand & HQ Vision (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <a href="#" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-[#0D0D0F]/80 border border-[#C8A96A]/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-md">
                <ImpactXLogo className="w-5 h-5 text-[#C8A96A]" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans-display font-bold text-base tracking-tight text-[#FFFFFF] flex items-center gap-2">
                  IMPACTX <span className="text-[#C8A96A] font-mono text-[11px] tracking-widest uppercase bg-[#C8A96A]/10 px-2 py-0.5 rounded border border-[#C8A96A]/20">GLOBAL</span>
                </span>
                <span className="text-[11px] text-[#D1CBC0] font-mono tracking-widest uppercase">
                  Student Movement
                </span>
              </div>
            </a>

            <p className="text-sm sm:text-base text-[#D1CBC0] leading-relaxed max-w-sm font-light">
              ImpactX Global is an international student movement building software, publishing research, and empowering the next generation of builders worldwide.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#C8A96A] bg-[#0D0D0F]/60 px-3.5 py-2 rounded-full border border-[#C8A96A]/20 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8A96A]" />
              <span>Headquartered in India • Open Worldwide</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/impactxglobal?igsh=Mm44MTRsamQ5dWls&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#0D0D0F]/60 border border-white/10 flex items-center justify-center text-[#D1CBC0] hover:text-[#C8A96A] hover:border-[#C8A96A]/30 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/135644013"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#0D0D0F]/60 border border-white/10 flex items-center justify-center text-[#D1CBC0] hover:text-[#C8A96A] hover:border-[#C8A96A]/30 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:impactxglobal26@gmail.com"
                className="w-10 h-10 rounded-xl bg-[#0D0D0F]/60 border border-white/10 flex items-center justify-center text-[#D1CBC0] hover:text-[#C8A96A] hover:border-[#C8A96A]/30 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-sm font-semibold text-[#FFFFFF] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-[#D1CBC0]">
              <li><a href="#story" className="hover:text-[#FFFFFF] hover:translate-x-1 inline-block transform transition-all duration-300">Our Story</a></li>
              <li><a href="#philosophy" className="hover:text-[#FFFFFF] hover:translate-x-1 inline-block transform transition-all duration-300">Philosophy</a></li>
              <li><a href="#programs" className="hover:text-[#FFFFFF] hover:translate-x-1 inline-block transform transition-all duration-300">Programs</a></li>
              <li><a href="#domains" className="hover:text-[#FFFFFF] hover:translate-x-1 inline-block transform transition-all duration-300">Focus Domains</a></li>
              <li><a href="#journey" className="hover:text-[#FFFFFF] hover:translate-x-1 inline-block transform transition-all duration-300">Student Journey</a></li>
              <li><a href="#team" className="hover:text-[#FFFFFF] hover:translate-x-1 inline-block transform transition-all duration-300">Leadership & Team</a></li>
              <li><a href="#impact" className="hover:text-[#FFFFFF] hover:translate-x-1 inline-block transform transition-all duration-300">Global Movement</a></li>
              <li><a href="#faq" className="hover:text-[#FFFFFF] hover:translate-x-1 inline-block transform transition-all duration-300">Frequently Asked</a></li>
            </ul>
          </div>

          {/* Column 3: Global Chapters */}
          <div className="space-y-4">
            <h4 className="font-mono text-sm font-semibold text-[#FFFFFF] uppercase tracking-wider">
              Global Chapters
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-[#D1CBC0]">
              <li className="flex items-center gap-2 text-[#FFFFFF] font-medium">
                <span>🇮🇳 India</span>
                <span className="text-[11px] font-mono text-[#C8A96A] bg-[#C8A96A]/10 px-1.5 py-0.5 rounded border border-[#C8A96A]/20">HQ</span>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FFFFFF] transition-colors">
                <span>🇺🇸 United States</span>
                <span className="text-[11px] font-mono text-[#D1CBC0] opacity-60">Soon</span>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FFFFFF] transition-colors">
                <span>🇬🇧 United Kingdom</span>
                <span className="text-[11px] font-mono text-[#D1CBC0] opacity-60">Soon</span>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FFFFFF] transition-colors">
                <span>🇮🇹 Italy</span>
                <span className="text-[11px] font-mono text-[#D1CBC0] opacity-60">Soon</span>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FFFFFF] transition-colors">
                <span>🇷🇺 Russia</span>
                <span className="text-[11px] font-mono text-[#D1CBC0] opacity-60">Soon</span>
              </li>
              <li>
                <a href="#impact" className="text-[#C8A96A] hover:underline text-xs font-mono mt-2 inline-block">
                  View All 38+ Locations →
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Focus Domains & Governance */}
          <div className="space-y-4">
            <h4 className="font-mono text-sm font-semibold text-[#FFFFFF] uppercase tracking-wider">
              Specializations
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-[#D1CBC0]">
              <li><span className="hover:text-[#FFFFFF] transition-colors cursor-default">AI & Intelligent Systems</span></li>
              <li><span className="hover:text-[#FFFFFF] transition-colors cursor-default">Distributed Cloud Systems</span></li>
              <li><span className="hover:text-[#FFFFFF] transition-colors cursor-default">Quantitative Systems & Fintech</span></li>
              <li><span className="hover:text-[#FFFFFF] transition-colors cursor-default">Open Source Research</span></li>
            </ul>

            <h4 className="font-mono text-sm font-semibold text-[#FFFFFF] uppercase tracking-wider pt-3">
              Governance
            </h4>
            <ul className="space-y-2 text-sm font-sans text-[#D1CBC0]">
              <li><span className="hover:text-[#FFFFFF] transition-colors cursor-default">Student Manifesto</span></li>
              <li><span className="hover:text-[#FFFFFF] transition-colors cursor-default">Privacy & Terms</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Back to Top Row */}
        <div className="pt-10 flex flex-col gap-6 font-mono text-xs text-[#D1CBC0]">
          <div className="relative flex flex-col items-center justify-center gap-6 sm:gap-4">
            <div className="flex flex-col items-center gap-1 text-center">
              <span>Student-led Movement. Headquartered in India. Built for students worldwide.</span>
              <span className="text-white/40 text-[11px]">
                All content, trademarks, and user rights are strictly protected for safety and legal purposes.
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="sm:absolute sm:right-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D0D0F]/60 border border-white/10 hover:border-[#C8A96A]/40 text-[#FFFFFF] transition-all cursor-pointer hover:text-[#C8A96A]"
              title="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
          
          {/* Centered Copyright line */}
          <div className="pt-4 border-t border-white/10 w-full text-center">
            <span>© {new Date().getFullYear()} ImpactX Global. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
