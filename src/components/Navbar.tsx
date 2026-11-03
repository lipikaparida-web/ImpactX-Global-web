import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { ImpactXLogo } from './ImpactXLogo';
import { getApplicationStatus, COHORT_CONFIG } from '../config/applicationConfig';

interface NavbarProps {
  onOpenApply: () => void;
  activeSection: string;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'Our Story', href: '#story' },
  { label: 'Programmes', href: '#programmes' },
  { label: 'Domains', href: '#domains' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Community', href: '#community' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenApply, activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const appStatus = getApplicationStatus();

  // Scroll behaviour — hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 30);
      if (currentY < 60) {
        setVisible(true);
      } else if (currentY - lastScrollY.current > 8 && !menuOpen) {
        setVisible(false);
      } else if (lastScrollY.current - currentY > 8) {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  // Escape key closes menu
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  // Lock body scroll while menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Smooth navigation handler that works reliably across all browsers & devices
  const handleNavClick = (href: string) => {
    // 1. Immediately close the drawer
    setMenuOpen(false);
    // 2. Immediately unlock body overflow so scrolling works
    document.body.style.overflow = '';

    const id = href.replace('#', '');

    if (!id || id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 3. Small timeout to allow DOM and body overflow unlock to settle before scrolling
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const navOffset = 75;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      } else {
        window.location.hash = href;
      }
    }, 60);
  };

  return (
    <>
      <header
        role="banner"
        style={{
          transform: !visible && !menuOpen ? 'translateY(-110%)' : 'translateY(0)',
          opacity: !visible && !menuOpen ? 0 : 1,
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease',
        }}
        className="fixed top-0 left-0 right-0 z-40"
      >
        <div className={`transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              ref={menuRef}
              className={`flex items-center justify-between px-4 py-2.5 sm:px-5 rounded-2xl transition-all duration-300 ${
                isScrolled
                  ? 'bg-[#09090D]/92 backdrop-blur-2xl border border-[#C8A96A]/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
                  : 'bg-[#09090D]/70 backdrop-blur-xl border border-white/[0.06]'
              }`}
            >
              {/* Logo — Company name in same font, same way, in one line */}
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#hero');
                }}
                className="flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] py-1"
                aria-label="ImpactX Global — Return to top"
              >
                <div className="w-8 h-8 rounded-full bg-[#0D0D0F] border border-[#C8A96A]/30 flex items-center justify-center shrink-0 shadow-inner">
                  <ImpactXLogo className="w-8 h-8" />
                </div>
                <span className="font-sans-display font-bold text-base sm:text-lg tracking-tight text-white whitespace-nowrap">
                  ImpactX Global
                </span>
              </a>

              {/* Desktop inline nav links */}
              <nav
                className="hidden lg:flex items-center gap-1 xl:gap-2"
                aria-label="Site navigation"
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] ${
                        isActive
                          ? 'text-[#C8A96A] bg-[#C8A96A]/12 font-semibold border border-[#C8A96A]/20'
                          : 'text-[#D1CBC0] hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              {/* Right side: CTA + hamburger */}
              <div className="flex items-center gap-2">
                {/* Desktop CTA */}
                <a
                  href="#programmes"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#programmes');
                  }}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-[#C8A96A] text-[#09090D] hover:bg-[#E2C78E] transition-all duration-200 shadow-[0_2px_12px_rgba(200,169,106,0.3)] hover:shadow-[0_4px_20px_rgba(200,169,106,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                >
                  Explore Programmes
                </a>

                {/* Hamburger button */}
                <button
                  type="button"
                  id="nav-hamburger"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-nav-panel"
                  aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-[#141418] border border-[#C8A96A]/20 hover:border-[#C8A96A]/45 text-[#D1CBC0] hover:text-white transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] gap-[5px] px-2.5"
                >
                  <span
                    className={`block w-full h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                      menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
                    }`}
                  />
                  <span
                    className={`block w-full h-[1.5px] bg-current rounded-full transition-all duration-300 ${
                      menuOpen ? 'opacity-0 scale-x-0' : ''
                    }`}
                  />
                  <span
                    className={`block w-full h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                      menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation panel overlay — rendered outside transformed header for flawless positioning & hit-testing */}
      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#03040C]/80 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          className={`absolute top-[72px] right-4 left-4 sm:left-auto sm:w-80 sm:right-6 rounded-2xl bg-[#0F0F14]/98 border border-[#C8A96A]/25 backdrop-blur-3xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 ${
            menuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-3 scale-95'
          }`}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A]">
              Navigation
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-1.5 rounded-lg text-[#9E9EA7] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav links */}
          <nav aria-label="Site navigation drawer" className="p-3">
            <ul className="space-y-0.5" role="list">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(item.href)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] text-left ${
                        isActive
                          ? 'bg-[#C8A96A]/12 text-[#C8A96A] border border-[#C8A96A]/20'
                          : 'text-[#D1CBC0] hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Panel footer CTA */}
          <div className="px-4 pb-4 pt-1 border-t border-white/[0.05] space-y-2">
            {appStatus === 'OPEN' ? (
              <div className="flex items-center gap-1.5 mb-2 px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-medium">
                  {COHORT_CONFIG.shortName} Applications Open • Till Nov 4
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 mb-2 px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96A]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9E9EA7]">
                  Applications Closed
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={() => handleNavClick('#programmes')}
              className="w-full py-3 px-4 text-xs font-semibold text-[#09090D] bg-[#C8A96A] hover:bg-[#E2C78E] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Explore Programmes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
