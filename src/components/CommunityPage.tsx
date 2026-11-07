import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  MessageSquare,
  Users,
  Sparkles,
  Coffee,
  Calendar,
  ExternalLink,
  X,
  Maximize2,
  Hash,
  Layers,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { ImpactXLogo } from './ImpactXLogo';
import {
  DISCORD_GALLERY_ITEMS,
  COFFEE_CHATS_HIGHLIGHTS,
  COMMUNITY_SESSIONS,
  DiscordGalleryItem,
} from '../data/communityData';
import { DISCORD_INVITE_URL } from '../config/applicationConfig';

interface CommunityPageProps {
  onBack: () => void;
  onNavigateHomeSection?: (sectionId: string) => void;
}

type CategoryFilter = 'all' | 'general' | 'announcements' | 'alumni';

const CATEGORY_TABS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Activities' },
  { id: 'alumni', label: 'Alumni & Member Interactions' },
  { id: 'general', label: 'General Discussions' },
  { id: 'announcements', label: 'Announcements & Updates' },
];

export const CommunityPage: React.FC<CommunityPageProps> = ({ onBack, onNavigateHomeSection }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedImage, setSelectedImage] = useState<DiscordGalleryItem | null>(null);

  // Filter gallery items based on active category
  const filteredGallery = DISCORD_GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Handle ESC key for lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  return (
    <motion.div
      key="community-page"
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
      <main className="relative z-10 pt-28 sm:pt-32 pb-24 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 space-y-24 sm:space-y-32">

        {/* ─── 1. HERO SECTION: The People Behind ImpactX ─── */}
        <section className="text-center pt-6 sm:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5C07B] bg-[#E5C07B]/10 px-4 py-1.5 rounded-full border border-[#E5C07B]/25 mb-6 shadow-[0_2px_12px_rgba(229,192,123,0.1)]"
          >
            <Users className="w-3.5 h-3.5 text-[#E5C07B]" />
            Community & Culture
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-3.5xl sm:text-5xl lg:text-6xl font-sans-display font-extrabold text-[#FFFFFF] tracking-tight leading-[1.12] mb-6 text-balance"
          >
            The People Behind{' '}
            <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FCEAC5] via-[#E8C57D] to-[#D4A247] drop-shadow-[0_2px_16px_rgba(232,197,125,0.3)]">
              ImpactX
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="text-base sm:text-lg lg:text-xl text-[#DCD7CA] max-w-2xl mx-auto leading-relaxed font-normal mb-12 text-balance"
          >
            A community built on conversations, curiosity and collaboration.
          </motion.p>

          {/* Authentic Community Hero Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.22 }}
            className="relative rounded-3xl overflow-hidden border border-[#E5C07B]/25 bg-gradient-to-b from-[#141524]/90 via-[#0C0D17]/95 to-[#07080F] p-7 sm:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.7)] text-left"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-radial from-[#C8A96A]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Community ethos */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1B29] border border-[#E5C07B]/20 text-[11px] font-mono text-[#E5C07B]">
                  <Sparkles className="w-3 h-3" />
                  Real People • Real Conversations
                </div>

                <h2 className="text-xl sm:text-2xl font-sans-display font-bold text-white leading-snug">
                  Beyond projects and code repositories, ImpactX is the people who show up every day.
                </h2>

                <p className="text-sm sm:text-base text-[#D1CBC0] leading-relaxed">
                  Our digital campus lives on Discord. It’s where engineers pair with researchers, designers bounce ideas off product leads, and cohorts build lifelong friendships through late-night problem-solving and weekly Coffee Chats.
                </p>

                {/* Micro indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#0F101A] border border-white/[0.08]">
                    <div className="text-lg font-bold text-[#E5C07B] font-mono">10 Domains</div>
                    <div className="text-xs text-[#9F998E]">Interdisciplinary pods</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0F101A] border border-white/[0.08]">
                    <div className="text-lg font-bold text-[#E5C07B] font-mono">Weekly</div>
                    <div className="text-xs text-[#9F998E]">Coffee Chats on voice</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0F101A] border border-white/[0.08] col-span-2 sm:col-span-1">
                    <div className="text-lg font-bold text-[#E5C07B] font-mono">3 Batches</div>
                    <div className="text-xs text-[#9F998E]">Genesis, Odyssey, Aether</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Mini Discord Live Preview Banner */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-[#E5C07B]/30 bg-[#0A0B12] shadow-2xl group cursor-pointer"
                  onClick={() => {
                    const voiceItem = DISCORD_GALLERY_ITEMS.find((it) => it.id === 'voice-coffee-chats');
                    if (voiceItem) setSelectedImage(voiceItem);
                  }}
                >
                  <img
                    src="/images/community/coffee-chats-voice-grid.jpg"
                    alt="The Coffee Chats voice call with 13 members"
                    className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070E] via-transparent to-black/20" />
                  
                  {/* Overlay badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-[#090A14]/90 backdrop-blur-md border border-[#E5C07B]/20">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono font-medium text-white">#The Coffee Chats</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#E5C07B] flex items-center gap-1">
                      <Maximize2 className="w-3 h-3" /> View Call
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── 2. INSIDE OUR DISCORD: Screenshot Gallery ─── */}
        <section className="space-y-10" id="discord-gallery">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5C07B] bg-[#E5C07B]/10 px-4 py-1.5 rounded-full border border-[#E5C07B]/25">
              <MessageSquare className="w-3.5 h-3.5 text-[#E5C07B]" />
              Digital Campus
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans-display font-extrabold text-[#FFFFFF] tracking-tight">
              Inside Our{' '}
              <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FCEAC5] via-[#E8C57D] to-[#D4A247]">
                Discord
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#DCD7CA] leading-relaxed">
              More than a server. A space to connect, exchange ideas, ask questions and grow together.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#E5C07B] text-[#0A0B10] font-bold shadow-[0_0_20px_rgba(229,192,123,0.35)]'
                      : 'bg-[#12131C] text-[#C4BEB1] border border-white/[0.08] hover:border-[#E5C07B]/30 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredGallery.map((item, index) => {
              if (item.isPlaceholder) {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="rounded-2xl border border-dashed border-[#E5C07B]/25 bg-[#0C0D17]/70 p-6 flex flex-col justify-between hover:border-[#E5C07B]/50 transition-colors group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#E5C07B] bg-[#E5C07B]/10 px-2.5 py-1 rounded-full border border-[#E5C07B]/20">
                          <Hash className="w-3 h-3" />
                          {item.discordChannel || 'discord-channel'}
                        </span>
                        <span className="text-[10px] uppercase font-mono text-[#8C867B] tracking-wider">
                          Placeholder
                        </span>
                      </div>

                      <div className="h-40 rounded-xl bg-[#141524]/60 border border-white/[0.04] flex flex-col items-center justify-center text-center p-4 mb-4">
                        <MessageSquare className="w-8 h-8 text-[#E5C07B]/40 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-semibold text-white mb-1">{item.title}</span>
                        <span className="text-[11px] text-[#A8A196]">Archive placeholder for upcoming captures</span>
                      </div>

                      <p className="text-xs text-[#CBC5B6] leading-relaxed mb-3">
                        {item.caption}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-[#8C867B]">
                      {item.details}
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setSelectedImage(item)}
                  className="rounded-2xl border border-white/[0.12] bg-[#12131C]/90 overflow-hidden hover:border-[#E5C07B]/45 hover:shadow-[0_8px_32px_rgba(229,192,123,0.12)] transition-all duration-300 group cursor-pointer flex flex-col"
                >
                  {/* Image with zoom on hover */}
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-black/40">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12131C] via-transparent to-black/20" />

                    {/* Channel badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-white bg-[#0A0B14]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/[0.15]">
                        <Hash className="w-3 h-3 text-[#E5C07B]" />
                        {item.discordChannel}
                      </span>
                    </div>

                    {/* Expand icon pill */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#0A0B10] bg-[#E5C07B] px-3 py-1 rounded-full font-semibold shadow-lg">
                        <Maximize2 className="w-3 h-3" /> Expand
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#E5C07B] mb-1.5">
                        {item.categoryLabel}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-[#FCEAC5] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#D1CBC0] leading-relaxed line-clamp-3 mb-4">
                        {item.caption}
                      </p>
                    </div>

                    {item.details && (
                      <div className="pt-3 border-t border-white/[0.08] text-[11px] text-[#A69E90] flex items-center justify-between">
                        <span className="truncate pr-2">{item.details}</span>
                        <span className="text-[#E5C07B] shrink-0 text-xs">Click to view &rarr;</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ─── 3. COFFEE CHATS: Conversations Beyond Work ─── */}
        <section className="space-y-12" id="coffee-chats">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5C07B] bg-[#E5C07B]/10 px-4 py-1.5 rounded-full border border-[#E5C07B]/25">
              <Coffee className="w-3.5 h-3.5 text-[#E5C07B]" />
              Weekly Ritual
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans-display font-extrabold text-[#FFFFFF] tracking-tight">
              Coffee Chats
            </h2>
            <p className="text-base sm:text-lg text-[#F7F4EE] italic font-serif-editorial max-w-xl mx-auto leading-relaxed">
              “Not every conversation needs an agenda. Sometimes, the best ideas start over coffee.”
            </p>
            <p className="text-sm text-[#CBC5B6] max-w-2xl mx-auto">
              Our signature voice and video channel where interns, leads, and founders meet weekly. A relaxed space for candid dialogue, reflections, shared struggles, and genuine human connection.
            </p>
          </div>

          {/* Coffee Chats Highlight Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {COFFEE_CHATS_HIGHLIGHTS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-[#E5C07B]/20 bg-gradient-to-b from-[#131422] to-[#0B0C15] overflow-hidden flex flex-col group hover:border-[#E5C07B]/50 hover:shadow-[0_8px_32px_rgba(229,192,123,0.14)] transition-all duration-300"
              >
                {/* Image */}
                <div
                  className="relative h-52 overflow-hidden cursor-pointer"
                  onClick={() => {
                    const matched = DISCORD_GALLERY_ITEMS.find((it) => it.imageSrc === item.imageSrc);
                    if (matched) setSelectedImage(matched);
                  }}
                >
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C15] via-transparent to-black/30" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-mono text-[#E5C07B] bg-[#0A0B14]/85 px-3 py-1 rounded-full border border-[#E5C07B]/25">
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[11px] font-mono text-[#0A0B10] bg-[#E5C07B] px-3 py-1 rounded-full font-semibold">
                      View
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D1CBC0] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.quote && (
                    <div className="p-3.5 rounded-xl bg-[#1A1B29] border border-[#E5C07B]/20 space-y-1.5">
                      <p className="text-xs text-[#FCEAC5] italic font-serif-editorial leading-relaxed">
                        “{item.quote.text}”
                      </p>
                      <div className="text-[10px] font-mono text-[#A8A196]">
                        — {item.quote.author}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── 4. SESSIONS & COMMUNITY MOMENTS ─── */}
        <section className="space-y-10" id="community-sessions">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5C07B] bg-[#E5C07B]/10 px-4 py-1.5 rounded-full border border-[#E5C07B]/25">
              <Calendar className="w-3.5 h-3.5 text-[#E5C07B]" />
              Interaction Formats
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans-display font-extrabold text-[#FFFFFF] tracking-tight">
              Sessions & Community{' '}
              <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FCEAC5] via-[#E8C57D] to-[#D4A247]">
                Moments
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#DCD7CA] leading-relaxed">
              Every interaction is an opportunity to learn something, share something or build something together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMMUNITY_SESSIONS.map((sess, idx) => (
              <motion.div
                key={sess.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 sm:p-7 rounded-2xl bg-[#10111B]/90 border border-white/[0.12] hover:border-[#E5C07B]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#E5C07B] bg-[#E5C07B]/10 px-3 py-1 rounded-full border border-[#E5C07B]/25">
                      {sess.type}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full ${
                        sess.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {sess.status === 'active' ? 'Active Format' : 'Upcoming Intake'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FCEAC5] transition-colors">
                    {sess.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#CBC5B6] leading-relaxed mb-5">
                    {sess.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {sess.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-[#DCD7CA]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5C07B] shrink-0 mt-1.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {sess.imagePlaceholderText && (
                  <div className="pt-4 border-t border-white/[0.08] text-[11px] font-mono text-[#8C867B] italic">
                    {sess.imagePlaceholderText}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── 5. JOIN THE COMMUNITY (Closing CTA) ─── */}
        <section className="text-center pt-8 pb-12">
          <div className="relative rounded-3xl overflow-hidden border border-[#E5C07B]/30 bg-gradient-to-b from-[#161729] via-[#0E0F1A] to-[#07080F] p-8 sm:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-gradient-radial from-[#C8A96A]/15 via-transparent to-transparent pointer-events-none rounded-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C07B]/10 border border-[#E5C07B]/30 text-xs font-mono text-[#E5C07B]">
                <Sparkles className="w-3.5 h-3.5 text-[#E5C07B]" />
                Join the Ecosystem
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans-display font-extrabold text-white tracking-tight leading-tight">
                Your Next Conversation{' '}
                <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FCEAC5] via-[#E8C57D] to-[#D4A247]">
                  Starts Here.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#DCD7CA] leading-relaxed">
                Connect with curious minds, exchange ideas and be part of a community that believes in learning, building and growing together.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={DISCORD_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F0D59D] via-[#E5C07B] to-[#C99C4B] text-[#0A0B10] font-bold text-sm hover:shadow-[0_0_30px_rgba(229,192,123,0.5)] transition-all duration-300 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#0A0B10]" />
                  Join Our Discord
                  <ExternalLink className="w-4 h-4 ml-0.5" />
                </a>

                <button
                  type="button"
                  onClick={onBack}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#12131C] border border-[#E5C07B]/30 text-white font-medium text-sm hover:border-[#E5C07B]/60 transition-colors cursor-pointer"
                >
                  Back to Main Site
                  <ArrowRight className="w-4 h-4 text-[#E5C07B]" />
                </button>
              </div>

              <p className="text-xs text-[#8C867B] font-mono pt-2">
                Open to students, creators & builders across all disciplines.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* ─── Lightbox Modal ─── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key="lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-[#0A0B14] border border-[#E5C07B]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#12131F] border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E5C07B] bg-[#E5C07B]/10 px-3 py-1 rounded-full border border-[#E5C07B]/25">
                    <Hash className="w-3.5 h-3.5" />
                    {selectedImage.discordChannel || 'Discord Activity'}
                  </span>
                  <span className="text-xs font-semibold text-white truncate max-w-md hidden sm:inline">
                    {selectedImage.title}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                  aria-label="Close image modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Container */}
              <div className="flex-1 overflow-auto bg-black flex items-center justify-center p-2 sm:p-4">
                <img
                  src={selectedImage.imageSrc}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[68vh] object-contain rounded-lg"
                />
              </div>

              {/* Caption Footer */}
              <div className="p-4 sm:p-5 bg-[#0C0D17] border-t border-white/[0.08]">
                <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                  {selectedImage.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#D1CBC0] leading-relaxed">
                  {selectedImage.caption}
                </p>
                {selectedImage.details && (
                  <p className="text-xs text-[#A69E90] mt-1.5 font-mono">
                    {selectedImage.details}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

