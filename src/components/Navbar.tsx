import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Sparkles, 
  Compass, 
  BookOpen, 
  Users, 
  Globe, 
  Award, 
  Terminal, 
  GraduationCap, 
  HelpCircle, 
  Mail, 
  Layers, 
  CreditCard,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ImpactXLogo } from './ImpactXLogo';

interface NavbarProps {
  onOpenApply: () => void;
  activeSection: string;
}

interface NavItem {
  label: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApply, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>('about');
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const navGroups: NavGroup[] = [
    {
      id: 'about',
      label: 'About',
      items: [
        {
          label: 'Our Story',
          href: '#story',
          description: 'The 6 builder outcomes & proof-of-work mission',
          icon: Terminal,
        },
        {
          label: 'Our Philosophy',
          href: '#philosophy',
          description: '5 foundational tenets: learn by shipping real code',
          icon: Sparkles,
        },
        {
          label: 'Why ImpactX',
          href: '#why-us',
          description: 'Proof-of-work vs traditional internship comparison',
          icon: ShieldCheck,
        },
        {
          label: 'Leadership & Team',
          href: '#team',
          description: 'Student directors, engineers & council fellows',
          icon: Users,
        },
      ],
    },
    {
      id: 'programs',
      label: 'Programs',
      items: [
        {
          label: 'Flagship Programs',
          href: '#programs',
          description: '4 core tracks: Builder, Leadership, Research & Impact',
          icon: Award,
        },
        {
          label: 'Focus Domains',
          href: '#domains',
          description: '9 specialized departments (AI, Systems, Fintech, Cyber...)',
          icon: Layers,
        },
        {
          label: 'Builder Journey',
          href: '#journey',
          description: '12-week roadmap & sprint milestones',
          icon: Compass,
        },
        {
          label: 'Admissions Pipeline',
          href: '#admissions',
          description: 'Transparent 4-step selection process',
          icon: CheckCircle2,
          tag: 'Closed',
        },
      ],
    },
    {
      id: 'community',
      label: 'Community',
      items: [
        {
          label: 'Global Chapters',
          href: '#chapters',
          description: 'Headquartered in India with international chapters',
          icon: Globe,
        },
        {
          label: '3D Chapter Map',
          href: '#impact',
          description: 'Interactive globe & active chapter network',
          icon: Compass,
        },
        {
          label: 'Campus Hubs',
          href: '#community',
          description: 'Hackathons, Discord, WhatsApp & 1:1 mentorship',
          icon: BookOpen,
        },
        {
          label: 'Alumni Network',
          href: '#alumni',
          description: 'Graduate credentials & verified alumni cards',
          icon: CreditCard,
        },
      ],
    },
    {
      id: 'resources',
      label: 'Resources',
      items: [
        {
          label: 'Frequently Asked Questions',
          href: '#faq',
          description: 'Answers on commitment, eligibility & outcomes',
          icon: HelpCircle,
        },
        {
          label: 'Contact & Dispatch',
          href: '#contact',
          description: 'Email, hotline, newsletter & social channels',
          icon: Mail,
        },
      ],
    },
  ];

  // Scroll detection & header elevation
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const delta = currentY - lastScrollY.current;

          setIsScrolled(currentY > 30);

          if (currentY < 60) {
            setVisible(true);
          } else if (delta > 8 && !activeDropdown) {
            setVisible(false);
            setMobileMenuOpen(false);
          } else if (delta < -8) {
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
  }, [activeDropdown]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation & Escape-to-close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    // If target has an anchor ID, scroll smoothly
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isGroupActive = (group: NavGroup) => {
    return group.items.some(item => activeSection === item.href.replace('#', ''));
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none ${
        isScrolled ? 'py-2.5 sm:py-3' : 'py-3.5 sm:py-4'
      }`}
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-110%)',
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-auto flex items-center justify-between gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#121215]/85 backdrop-blur-2xl border border-[#C8A96A]/25 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">

          {/* ── Brand Logo Capsule ── */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 py-1 px-1.5 rounded-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A]"
            aria-label="ImpactX Global Home"
          >
            <div className="w-8 h-8 rounded-full bg-[#0D0D0F] border border-[#C8A96A]/35 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 shadow-inner">
              <ImpactXLogo className="w-4 h-4 text-[#C8A96A]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans-display font-bold text-sm sm:text-base tracking-tight text-[#FFFFFF] whitespace-nowrap">
                IMPACTX
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-2 py-0.5 rounded-full border border-[#C8A96A]/20 uppercase whitespace-nowrap hidden min-[360px]:inline-block">
                GLOBAL
              </span>
            </div>
          </a>

          {/* ── Desktop Navigation with Dropdowns ── */}
          <nav 
            className="hidden lg:flex items-center gap-1"
            aria-label="Main Navigation"
          >
            {navGroups.map((group) => {
              const isOpen = activeDropdown === group.id;
              const active = isGroupActive(group);

              return (
                <div key={group.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(isOpen ? null : group.id)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-controls={`dropdown-${group.id}`}
                    className={`flex items-center gap-1 px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] ${
                      isOpen
                        ? 'text-[#F7F4EE] bg-white/[0.08] shadow-sm'
                        : active
                        ? 'text-[#C8A96A] bg-[#C8A96A]/10 border border-[#C8A96A]/25'
                        : 'text-[#D1CBC0] hover:text-[#FFFFFF] hover:bg-white/[0.05]'
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown 
                      className={`w-3.5 h-3.5 transition-transform duration-200 opacity-70 ${
                        isOpen ? 'rotate-180 text-[#C8A96A]' : ''
                      }`} 
                    />
                  </button>

                  {/* Dropdown Menu Panel */}
                  {isOpen && (
                    <div
                      id={`dropdown-${group.id}`}
                      role="menu"
                      className="absolute top-full left-0 mt-2.5 w-72 rounded-2xl bg-[#0F0F13]/98 backdrop-blur-2xl border border-[#C8A96A]/25 shadow-[0_16px_48px_rgba(0,0,0,0.8)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                    >
                      <div className="space-y-1">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          const isItemActive = activeSection === item.href.replace('#', '');

                          return (
                            <a
                              key={item.href}
                              href={item.href}
                              role="menuitem"
                              onClick={(e) => {
                                e.preventDefault();
                                handleLinkClick(item.href);
                              }}
                              className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150 group/item focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] ${
                                isItemActive
                                  ? 'bg-[#C8A96A]/15 border border-[#C8A96A]/30'
                                  : 'hover:bg-white/[0.06]'
                              }`}
                            >
                              <div className="p-2 rounded-lg bg-[#16161C] border border-[#C8A96A]/20 text-[#C8A96A] group-hover/item:border-[#C8A96A]/40 transition-colors shrink-0 mt-0.5">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-semibold text-[#F7F4EE] group-hover/item:text-[#C8A96A] transition-colors">
                                    {item.label}
                                  </span>
                                  {item.tag && (
                                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#C8A96A]/20 text-[#C8A96A] border border-[#C8A96A]/30">
                                      {item.tag}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-[#9E9EA7] line-clamp-1 mt-0.5 font-light leading-tight">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Explore Link (Desktop) */}
            <a
              href="#domains"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#domains');
              }}
              className="hidden md:inline-flex text-xs font-medium text-[#D1CBC0] hover:text-[#FFFFFF] px-3 py-1.5 rounded-full hover:bg-white/[0.05] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A]"
            >
              Explore Domains
            </a>

            {/* Prominent CTA */}
            <button
              onClick={onOpenApply}
              className="px-4 py-2 sm:px-5 sm:py-2 text-xs font-semibold text-[#0D0D0F] bg-[#C8A96A] hover:bg-[#E2C78E] rounded-full cursor-pointer whitespace-nowrap transition-all duration-200 shadow-[0_2px_12px_rgba(200,169,106,0.3)] hover:shadow-[0_4px_16px_rgba(200,169,106,0.45)] active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Applications Closed
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-[#16161C] border border-[#C8A96A]/25 text-[#D1CBC0] hover:text-[#FFFFFF] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileMenuOpen && (
        <div 
          className="pointer-events-auto lg:hidden fixed inset-x-0 top-[68px] bottom-0 bg-[#03040C]/90 backdrop-blur-3xl z-40 px-4 py-3 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="max-w-md mx-auto bg-[#0F0F13] border border-[#C8A96A]/25 rounded-3xl p-5 shadow-2xl space-y-4">
            
            {/* Accordion Categories */}
            <div className="space-y-2">
              {navGroups.map((group) => {
                const isExpanded = mobileExpandedGroup === group.id;

                return (
                  <div 
                    key={group.id} 
                    className="border border-white/[0.06] rounded-2xl overflow-hidden bg-[#141419]/50"
                  >
                    <button
                      type="button"
                      onClick={() => setMobileExpandedGroup(isExpanded ? null : group.id)}
                      className="w-full flex items-center justify-between p-3.5 text-left text-sm font-semibold text-[#F7F4EE] hover:text-[#C8A96A] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96A]" />
                        {group.label}
                      </span>
                      <ChevronDown 
                        className={`w-4 h-4 text-[#9E9EA7] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[#C8A96A]' : ''
                        }`} 
                      />
                    </button>

                    {isExpanded && (
                      <div className="p-2 pt-0 space-y-1 border-t border-white/[0.04]">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          const active = activeSection === item.href.replace('#', '');

                          return (
                            <a
                              key={item.href}
                              href={item.href}
                              onClick={(e) => {
                                e.preventDefault();
                                handleLinkClick(item.href);
                              }}
                              className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors cursor-pointer ${
                                active 
                                  ? 'bg-[#C8A96A]/15 text-[#C8A96A] border border-[#C8A96A]/30' 
                                  : 'text-[#D1CBC0] hover:text-[#FFFFFF] hover:bg-white/[0.06]'
                              }`}
                            >
                              <div className="p-2 rounded-lg bg-[#0D0D0F] border border-[#C8A96A]/20 text-[#C8A96A] shrink-0">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-medium">
                                    {item.label}
                                  </span>
                                  {item.tag && (
                                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#C8A96A]/20 text-[#C8A96A]">
                                      {item.tag}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-[#9E9EA7] truncate">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Actions */}
            <div className="pt-2 border-t border-white/[0.08] space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                className="w-full py-3 px-4 text-xs font-semibold text-[#0D0D0F] bg-[#C8A96A] hover:bg-[#E2C78E] rounded-full flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
              >
                <span>Applications Closed</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
