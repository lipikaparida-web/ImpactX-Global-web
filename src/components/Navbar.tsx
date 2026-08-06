import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Compass } from 'lucide-react';
import { ImpactXLogo } from './ImpactXLogo';

interface NavbarProps {
  onOpenApply: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApply, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Hide on scroll down, show on scroll up (standard pattern)
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const delta = currentY - lastScrollY.current;

          if (currentY < 60) {
            // Always show at top of page
            setVisible(true);
          } else if (delta > 6) {
            // Scrolling DOWN — hide
            setVisible(false);
            setMobileMenuOpen(false);
          } else if (delta < -6) {
            // Scrolling UP — show
            setVisible(true);
          }

          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Programs', href: '#programs' },
    { label: 'Domains', href: '#domains' },
    { label: 'Journey', href: '#journey' },
    { label: 'Team', href: '#team' },
    { label: 'Impact', href: '#impact' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-500 pointer-events-none"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-110%)',
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">

        {/* Brand Logo - Floating Glass Capsule */}
        <a
          href="#"
          className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#121215]/70 backdrop-blur-2xl border border-[#C8A96A]/20 shadow-2xl hover:border-[#C8A96A]/40 transition-all duration-300 group shrink-0"
        >
          <div className="w-7 h-7 rounded-full bg-[#0D0D0F] border border-[#C8A96A]/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <ImpactXLogo className="w-4 h-4 text-[#C8A96A]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-sans-display font-bold text-sm tracking-tight text-[#F7F4EE] whitespace-nowrap">
              IMPACTX
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-2 py-0.5 rounded-full border border-[#C8A96A]/20 uppercase whitespace-nowrap">
              GLOBAL
            </span>
          </div>
        </a>

        {/* Center: Floating Navigation Capsule */}
        <nav className="pointer-events-auto hidden xl:flex items-center gap-0.5 bg-[#121215]/70 backdrop-blur-2xl px-3 py-2 rounded-full border border-[#C8A96A]/20 shadow-2xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'text-[#C8A96A] bg-[#C8A96A]/15 border border-[#C8A96A]/30 shadow-sm'
                    : 'text-[#9E9EA7] hover:text-[#F7F4EE] hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-3 shrink-0">
          <a
            href="#domains"
            className="text-xs font-medium text-[#9E9EA7] hover:text-[#F7F4EE] transition-colors px-3 py-2 whitespace-nowrap"
          >
            Explore Domains
          </a>
          <button
            onClick={onOpenApply}
            className="px-5 py-2.5 text-xs font-semibold text-[#0D0D0F] bg-[#F7F4EE] hover:bg-white rounded-full shadow-[0_4px_20px_rgba(247,244,238,0.15)] hover:shadow-[0_6px_28px_rgba(200,169,106,0.35)] transition-all duration-300 transform hover:scale-[1.02] cursor-pointer whitespace-nowrap"
          >
            Apply for Cohort
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="pointer-events-auto xl:hidden flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenApply}
            className="sm:hidden px-3.5 py-1.5 text-xs font-semibold text-[#0D0D0F] bg-[#F7F4EE] rounded-full shadow-md whitespace-nowrap"
          >
            Apply
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full bg-[#121215]/70 border border-[#C8A96A]/20 backdrop-blur-xl text-[#9E9EA7] hover:text-[#F7F4EE] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto xl:hidden max-w-md mx-auto mt-3 px-4">
          <div className="bg-[#121215]/95 backdrop-blur-2xl border border-[#C8A96A]/20 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 text-xs font-medium text-[#9E9EA7] hover:text-[#F7F4EE] rounded-xl hover:bg-white/[0.05] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply();
              }}
              className="w-full py-3 px-4 text-xs font-semibold text-[#0D0D0F] bg-[#F7F4EE] rounded-full text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Apply for Global Cohort</span>
              <ArrowUpRight className="w-4 h-4 text-[#0D0D0F]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
