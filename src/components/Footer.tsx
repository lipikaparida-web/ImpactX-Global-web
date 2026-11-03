import React from 'react';
import { Instagram, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';
import { ImpactXLogo } from './ImpactXLogo';

const FOOTER_LINKS = [
  { label: 'Programmes', href: '#programmes' },
  { label: 'Domains', href: '#domains' },
  { label: 'Our Story', href: '#story' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Community', href: '#community' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/impactxglobal?igsh=Mm44MTRsamQ5dWls&utm_source=qr',
    icon: Instagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/135644013',
    icon: Linkedin,
  },
  {
    label: 'Email',
    href: 'mailto:impactxglobal26@gmail.com',
    icon: Mail,
  },
  {
    label: 'Phone',
    href: 'tel:+918018949822',
    icon: Phone,
  },
];

interface FooterProps {
  onOpenApply?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative bg-transparent border-t border-white/[0.05] text-sm text-[#D1CBC0] overflow-hidden pt-12 pb-8"
      role="contentinfo"
    >
      {/* Background atmosphere */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-[#C8A96A]/[0.04] to-transparent blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/[0.05]">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); scrollToTop(); }}
              className="inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] rounded-lg"
              aria-label="ImpactX Global — Return to top"
            >
              <div className="w-9 h-9 rounded-full bg-[#0D0D0F] border border-[#C8A96A]/25 flex items-center justify-center shadow-inner">
                <ImpactXLogo className="w-9 h-9" />
              </div>
              <span className="font-sans-display font-bold text-base text-white tracking-tight whitespace-nowrap">
                ImpactX Global
              </span>
            </a>

            <p className="text-xs text-[#CBC5B6] leading-relaxed font-normal max-w-[220px]">
              A student-driven ecosystem connecting learners, builders, and innovators worldwide.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                    aria-label={social.label}
                    className="w-8 h-8 rounded-lg bg-[#141418] border border-white/[0.12] flex items-center justify-center text-[#CBC5B6] hover:text-[#E5C07B] hover:border-[#E5C07B]/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C07B]"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation links */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-xs text-[#CBC5B6] hover:text-[#E5C07B] transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C07B] rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-widest">
              Programmes
            </h3>
            <ul className="space-y-2.5">
              {['Free Community', 'Explorer', 'Accelerator'].map((p) => (
                <li key={p}>
                  <a
                    href="#programmes"
                    onClick={(e) => { e.preventDefault(); handleNavClick('#programmes'); }}
                    className="text-xs text-[#8E8E9A] hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] rounded"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-widest">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:impactxglobal26@gmail.com"
                  className="text-xs text-[#8E8E9A] hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] rounded"
                >
                  impactxglobal26@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918018949822"
                  className="text-xs text-[#8E8E9A] hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] rounded"
                >
                  +91 8018949822
                </a>
              </li>
              <li>
                <span className="text-xs text-[#6E6E7A] font-mono">
                  Headquartered in India
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-mono text-[#6E6E7A]">
            <span>© {new Date().getFullYear()} ImpactX Global. All rights reserved.</span>
            <span className="hidden sm:inline text-[#3A3A44]">·</span>
            <span>Privacy Policy</span>
            <span className="hidden sm:inline text-[#3A3A44]">·</span>
            <span>Terms &amp; Conditions</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141418] border border-white/[0.06] text-[10px] font-mono text-[#8E8E9A] hover:text-[#C8A96A] hover:border-[#C8A96A]/25 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};
