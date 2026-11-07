import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Linkedin, Instagram, Users, Sparkles } from 'lucide-react';
import { ImpactXLogo } from './ImpactXLogo';
import { TEAM_MEMBERS, TeamMember } from '../data/teamData';

interface TeamPageProps {
  onBack: () => void;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const hasSocials = Boolean(member.linkedinUrl || member.instagramUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl bg-[#0F101A]/90 border border-white/[0.12] hover:border-[#E5C07B]/50 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-[0_12px_40px_rgba(229,192,123,0.14)]"
    >
      {/* Photo Container - fixed aspect ratio to maintain consistency without distortion */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#141524]">
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt={member.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#161726] text-[#A69E90]">
            <Users className="w-12 h-12 text-[#E5C07B]/30" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0F101A] via-transparent to-black/10" />

        {/* Social Icons Overlay (Bottom Right of Photo) */}
        {hasSocials && (
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="p-2 rounded-full bg-[#0A0B12]/85 backdrop-blur-md border border-white/[0.15] text-[#C4BEB1] hover:text-[#0077B5] hover:border-[#0077B5]/60 hover:bg-[#0A0B12] transition-all duration-200 cursor-pointer shadow-md"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            {member.instagramUrl && (
              <a
                href={member.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on Instagram`}
                className="p-2 rounded-full bg-[#0A0B12]/85 backdrop-blur-md border border-white/[0.15] text-[#C4BEB1] hover:text-[#E4405F] hover:border-[#E4405F]/60 hover:bg-[#0A0B12] transition-all duration-200 cursor-pointer shadow-md"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Profile Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-sans-display font-bold text-white group-hover:text-[#FCEAC5] transition-colors leading-snug mb-1">
            {member.name}
          </h3>
          <p className="text-xs font-mono uppercase tracking-wider text-[#E5C07B]">
            {member.designation}
          </p>
          {member.bio && (
            <p className="text-xs text-[#CBC5B6] leading-relaxed mt-2.5 line-clamp-3">
              {member.bio}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const TeamPage: React.FC<TeamPageProps> = ({ onBack }) => {
  return (
    <motion.div
      key="team-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#03040C] text-[#F7F4EE] relative overflow-x-hidden font-sans"
    >
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-radial from-[#C8A96A]/[0.06] via-[#2A1E5C]/[0.06] to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[500px] bg-gradient-radial from-[#1E3A8A]/[0.08] to-transparent blur-[130px]" />
        <div className="absolute bottom-1/4 left-0 w-[550px] h-[450px] bg-gradient-radial from-[#C8A96A]/[0.05] to-transparent blur-[120px]" />
      </div>

      {/* ─── Fixed Top Mini-Header ─── */}
      <header className="fixed top-0 left-0 right-0 z-40 py-3">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#09090D]/90 backdrop-blur-2xl border border-[#C8A96A]/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            {/* Logo */}
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] py-1 cursor-pointer group"
              aria-label="Back to home"
            >
              <div className="w-7 h-7 rounded-full bg-[#0D0D0F] border border-[#C8A96A]/30 flex items-center justify-center shrink-0 shadow-inner">
                <ImpactXLogo className="w-7 h-7" />
              </div>
              <span className="font-sans-display font-bold text-sm text-white whitespace-nowrap">
                ImpactX Global
              </span>
            </button>

            {/* Back button */}
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-[#141418] border border-[#C8A96A]/20 text-[#D1CBC0] hover:text-white hover:border-[#C8A96A]/45 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A]"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main Content Container ─── */}
      <main className="relative z-10 pt-28 sm:pt-32 pb-24 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 space-y-16 sm:space-y-24">

        {/* ─── Hero Section ─── */}
        <section className="text-center pt-6 sm:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5C07B] bg-[#E5C07B]/10 px-4 py-1.5 rounded-full border border-[#E5C07B]/25 mb-6 shadow-[0_2px_12px_rgba(229,192,123,0.1)]"
          >
            <Users className="w-3.5 h-3.5 text-[#E5C07B]" />
            Leadership & Core Team
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-3.5xl sm:text-5xl lg:text-6xl font-sans-display font-extrabold text-[#FFFFFF] tracking-tight leading-[1.12] mb-6 text-balance"
          >
            The People Behind{' '}
            <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FCEAC5] via-[#E8C57D] to-[#D4A247] drop-shadow-[0_2px_16px_rgba(232,197,125,0.3)]">
              ImpactX Global
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="text-base sm:text-lg lg:text-xl text-[#DCD7CA] max-w-2xl mx-auto leading-relaxed font-normal mb-8 text-balance"
          >
            Meet the people, ideas and minds working together to build ImpactX Global.
          </motion.p>
        </section>

        {/* ─── Team Profile Gallery ─── */}
        <section className="space-y-8">
          {TEAM_MEMBERS.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto p-10 sm:p-12 rounded-3xl border border-[#E5C07B]/20 bg-gradient-to-b from-[#121320] via-[#0D0E18] to-[#07080F] text-center shadow-[0_12px_48px_rgba(0,0,0,0.6)]"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#1A1B29] border border-[#E5C07B]/30 flex items-center justify-center mx-auto mb-5 shadow-inner">
                <Sparkles className="w-5 h-5 text-[#E5C07B]" />
              </div>
              <h3 className="text-xl font-bold font-sans-display text-white mb-3">
                Team Profiles Coming Soon
              </h3>
              <p className="text-sm text-[#CBC5B6] leading-relaxed max-w-md mx-auto">
                Our leadership and core team profiles are currently being curated. Check back shortly as we introduce the minds driving ImpactX Global.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {TEAM_MEMBERS.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </section>

        {/* ─── Back to Home CTA ─── */}
        <section className="text-center pt-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#12131C] border border-[#E5C07B]/30 text-white font-medium text-sm hover:border-[#E5C07B]/60 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#E5C07B]" />
            Return to Main Site
          </button>
        </section>

      </main>
    </motion.div>
  );
};
