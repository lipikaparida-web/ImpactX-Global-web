import React from 'react';
import { Check, ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import {
  PROGRAMME_TIERS,
  COHORT_CONFIG,
  getApplicationStatus,
  type ProgrammeTier,
} from '../config/applicationConfig';

// ─── ProgrammeCard ────────────────────────────────────────────────────────────

interface ProgrammeCardProps {
  tier: ProgrammeTier;
  index: number;
  appStatus: 'OPEN' | 'CLOSED';
  onApplyTier?: (tier: ProgrammeTier) => void;
}

const ProgrammeCard: React.FC<ProgrammeCardProps> = ({ tier, index, appStatus, onApplyTier }) => {
  const isOpen = appStatus === 'OPEN';

  const handleApply = () => {
    if (!isOpen) return;
    if (tier.applyUrl) {
      window.open(tier.applyUrl, '_blank', 'noopener,noreferrer');
    } else if (onApplyTier) {
      onApplyTier(tier);
    } else {
      // Application URL not yet configured — scroll to contact section
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden group ${
        tier.isFeatured
          ? 'bg-[#151420]/90 border-[#E5C07B]/50 shadow-[0_0_40px_rgba(229,192,123,0.14)] hover:border-[#E5C07B]/70 hover:shadow-[0_0_60px_rgba(229,192,123,0.22)]'
          : 'bg-[#12131A]/85 border-white/[0.12] hover:border-[#E5C07B]/35 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
      }`}
    >
      {/* Featured accent top bar */}
      {tier.isFeatured && (
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#E5C07B] to-transparent" />
      )}

      {/* Featured badge */}
      {tier.isFeatured && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E5C07B]/20 border border-[#E5C07B]/50 text-[10px] font-mono uppercase tracking-widest text-[#F5D898] shadow-sm">
            <Star className="w-2.5 h-2.5 fill-[#F5D898]" />
            {tier.badgeLabel || 'Most Preferred'}
          </span>
        </div>
      )}

      <div className="p-6 sm:p-7 flex flex-col flex-1">
        {/* Name + tagline */}
        <div className="mb-5">
          <h3 className="text-xl font-sans-display font-bold text-white mb-1">
            {tier.name}
          </h3>
          <p className="text-xs font-mono text-[#E5C07B] tracking-wide font-medium">
            {tier.tagline}
          </p>
        </div>

        {/* Price */}
        <div className="mb-5">
          <div className="flex items-baseline gap-1">
            <span className={`text-3xl font-sans-display font-extrabold ${tier.priceNumeric === 0 ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]' : 'text-[#F5D898] drop-shadow-[0_0_12px_rgba(245,216,152,0.25)]'}`}>
              {tier.price}
            </span>
            {tier.priceNumeric === 0 && (
              <span className="text-xs font-mono text-emerald-400 font-semibold ml-1">FREE</span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.08] mb-5" />

        {/* Description */}
        <p className="text-sm text-[#D8D2C4] leading-relaxed font-normal mb-5 flex-1">
          {tier.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2.5 mb-7">
          {tier.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-[#EAE6DD] font-medium">
              <Check className="w-3.5 h-3.5 text-[#E5C07B] shrink-0 mt-0.5" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <button
          id={`programme-cta-${tier.id}`}
          onClick={handleApply}
          disabled={!isOpen}
          aria-label={
            isOpen
              ? `Apply for ${tier.name} — ${tier.price}`
              : `${tier.name} applications are currently closed`
          }
          className={`w-full py-3.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C07B] ${
            isOpen
              ? tier.isFeatured
                ? 'bg-gradient-to-r from-[#F5D898] via-[#E5C07B] to-[#D8B066] text-[#09090D] hover:brightness-110 cursor-pointer shadow-[0_2px_20px_rgba(229,192,123,0.35)] hover:shadow-[0_4px_28px_rgba(229,192,123,0.5)]'
                : 'bg-[#191924] text-[#F7F4EE] border border-[#E5C07B]/30 hover:border-[#E5C07B]/60 hover:bg-[#20202E] cursor-pointer'
              : 'bg-[#141418] text-[#6E6E7A] border border-white/[0.06] cursor-not-allowed'
          }`}
        >
          <span>{isOpen ? tier.ctaLabel : tier.closedLabel}</span>
          {isOpen && <ArrowRight className="w-3.5 h-3.5" />}
        </button>

        {/* Note if URL not configured */}
        {isOpen && !tier.applyUrl && (
          <p className="mt-2 text-center text-[10px] text-[#A6A298] font-mono">
            Fast-track Cohort 3 Application
          </p>
        )}
      </div>
    </motion.div>
  );
};

// ─── Programmes Section ───────────────────────────────────────────────────────

interface ProgrammesProps {
  onApplyTier?: (tier: ProgrammeTier) => void;
}

export const Programmes: React.FC<ProgrammesProps> = ({ onApplyTier }) => {
  const appStatus = getApplicationStatus();

  return (
    <section
      id="programmes"
      className="py-16 sm:py-20 lg:py-24 relative bg-transparent border-t border-white/[0.04]"
      aria-labelledby="programmes-heading"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-[#C8A96A]/[0.025] to-transparent blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Application status banner */}
            {appStatus === 'OPEN' ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/70 border border-emerald-400/40 shadow-[0_0_24px_rgba(52,211,153,0.18)] mb-5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
                <span className="text-xs font-mono text-emerald-300 uppercase tracking-widest font-semibold">
                  {COHORT_CONFIG.name} — Applications Open
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A20]/80 border border-white/[0.12] mb-5">
                <span className="w-2 h-2 rounded-full bg-[#9E9EA7]" />
                <span className="text-xs font-mono text-[#D4CEBF] uppercase tracking-widest">
                  Applications Closed
                </span>
              </div>
            )}

            <h2
              id="programmes-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-sans-display font-extrabold text-[#FFFFFF] tracking-tight mb-4"
            >
              Three Programme Tiers.{' '}
              <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FCEAC5] via-[#E8C57D] to-[#D4A247]">
                One Ecosystem.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#D4CEBF] max-w-xl mx-auto leading-relaxed font-normal">
              Choose the programme that best matches where you are and where you want to go.
            </p>

            {appStatus === 'OPEN' && (
              <p className="mt-3 text-xs font-mono text-emerald-400 font-semibold tracking-wide">
                Applications close on {COHORT_CONFIG.deadlineDisplay} (India Standard Time).
              </p>
            )}
          </motion.div>
        </div>

        {/* Cards grid — 3 columns desktop, 1 column mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PROGRAMME_TIERS.map((tier, index) => (
            <ProgrammeCard
              key={tier.id}
              tier={tier}
              index={index}
              appStatus={appStatus}
              onApplyTier={onApplyTier}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
