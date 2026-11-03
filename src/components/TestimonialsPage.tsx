import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronDown, ChevronUp, ArrowLeft, Users } from 'lucide-react';
import { TESTIMONIAL_BATCHES, type Batch, type Testimonial } from '../data/testimonialsData';
import { ImpactXLogo } from './ImpactXLogo';

// ─── Single Review Card ───────────────────────────────────────────────────────

interface ReviewCardProps {
  testimonial: Testimonial;
  index: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ testimonial, index }) => {
  const [expanded, setExpanded] = useState(false);

  // Split into paragraphs
  const paragraphs = testimonial.review
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  // Show first paragraph in collapsed state; show all when expanded
  const isLong = paragraphs.length > 1;
  const preview = paragraphs[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col rounded-2xl bg-[#12131C]/85 border border-white/[0.12] hover:border-[#E5C07B]/45 hover:shadow-[0_4px_32px_rgba(229,192,123,0.12)] transition-all duration-300 overflow-hidden group"
    >
      {/* Gold top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#E5C07B]/50 to-transparent" />

      <div className="p-6 flex flex-col flex-1">
        {/* Quote icon */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="p-2.5 rounded-xl bg-[#1A1A26] border border-[#E5C07B]/25 group-hover:border-[#E5C07B]/50 transition-colors shrink-0">
            <Quote className="w-3.5 h-3.5 text-[#E5C07B]" />
          </div>
        </div>

        {/* Review text */}
        <div className="flex-1 mb-5">
          {/* Always show preview paragraph */}
          <p className="text-sm text-[#DCD7CA] leading-relaxed font-normal">
            {preview}
          </p>

          {/* Remaining paragraphs — only when expanded */}
          <AnimatePresence initial={false}>
            {expanded && isLong && (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                {paragraphs.slice(1).map((para, i) => (
                  <p
                    key={i}
                    className="mt-4 text-sm text-[#DCD7CA] leading-relaxed font-normal"
                  >
                    {para}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Expand / collapse toggle */}
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="self-start mb-5 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#E5C07B] hover:text-[#F3D088] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C07B] rounded font-semibold"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                Read Less
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                Read More
              </>
            )}
          </button>
        )}

        {/* Author name */}
        <div className="pt-4 border-t border-white/[0.08]">
          <p className="text-sm font-sans-display font-bold text-white tracking-tight">
            {testimonial.name}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

// ─── Batch Section ────────────────────────────────────────────────────────────

interface BatchSectionProps {
  batch: Batch;
  batchIndex: number;
}

const BatchSection: React.FC<BatchSectionProps> = ({ batch, batchIndex }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: batchIndex * 0.1 }}
      className="mb-16 sm:mb-20"
    >
      {/* Batch label */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-[#C8A96A] bg-[#C8A96A]/10 border border-[#C8A96A]/20 px-3 py-1 rounded-full uppercase tracking-widest">
            Batch {batch.number}
          </span>
          <h2 className="text-xl sm:text-2xl font-sans-display font-bold text-[#F7F4EE] tracking-tight">
            {batch.shortName}
          </h2>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-[#C8A96A]/20 to-transparent" />
        <span className="text-xs font-mono text-[#5E5E6A] shrink-0">
          {batch.testimonials.length} {batch.testimonials.length === 1 ? 'Review' : 'Reviews'}
        </span>
      </div>

      {/* Reviews grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {batch.testimonials.map((t, i) => (
          <ReviewCard key={t.id} testimonial={t} index={i} />
        ))}
      </div>
    </motion.section>
  );
};

// ─── Testimonials Page ────────────────────────────────────────────────────────

interface TestimonialsPageProps {
  onBack: () => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onBack }) => {
  const totalReviews = TESTIMONIAL_BATCHES.reduce(
    (sum, b) => sum + b.testimonials.length,
    0
  );

  return (
    <motion.div
      key="testimonials-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#03040C] text-[#F7F4EE] relative overflow-x-hidden"
    >
      {/* Ambient gradient */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-radial from-[#C8A96A]/[0.03] to-transparent blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradient-radial from-[#0D1B4A]/[0.08] to-transparent blur-[120px]" />
      </div>

      {/* Fixed mini-header */}
      <header className="fixed top-0 left-0 right-0 z-40 py-3">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#09090D]/90 backdrop-blur-2xl border border-[#C8A96A]/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            {/* Logo */}
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] py-1 cursor-pointer group"
              aria-label="Back to main site"
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

      {/* Page content */}
      <main className="relative z-10 pt-28 pb-24 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Page hero */}
        <div className="text-center mb-14 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 mb-5"
          >
            <Users className="w-3 h-3" />
            Intern Experiences
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-sans-display font-bold text-[#F7F4EE] tracking-tight mb-5 text-balance"
          >
            Reviews &{' '}
            <span className="font-serif-editorial italic font-normal text-[#C8A96A]">
              Testimonials.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-sm sm:text-base text-[#8E8E9A] max-w-xl mx-auto leading-relaxed font-light"
          >
            Genuine experiences from interns across every cohort — in their own words, without edits.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center justify-center gap-6 mt-8 flex-wrap"
          >
            <div className="text-center">
              <p className="text-2xl font-sans-display font-bold text-[#C8A96A]">{TESTIMONIAL_BATCHES.length}</p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#5E5E6A] mt-0.5">Batches</p>
            </div>
            <div className="w-px h-8 bg-white/[0.08]" />
            <div className="text-center">
              <p className="text-2xl font-sans-display font-bold text-[#C8A96A]">{totalReviews}</p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#5E5E6A] mt-0.5">Reviews</p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C8A96A]/20 to-transparent mb-14" />

        {/* Batch sections */}
        {TESTIMONIAL_BATCHES.map((batch, i) => (
          <BatchSection key={batch.id} batch={batch} batchIndex={i} />
        ))}

        {/* Bottom note */}
        <div className="mt-8 pt-8 border-t border-white/[0.05] text-center">
          <p className="text-xs text-[#5E5E6A] font-mono leading-relaxed">
            All reviews are unedited, first-person accounts submitted voluntarily by programme participants.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-full bg-[#C8A96A] text-[#09090D] hover:bg-[#E2C78E] transition-all duration-200 cursor-pointer shadow-[0_2px_12px_rgba(200,169,106,0.3)] hover:shadow-[0_4px_20px_rgba(200,169,106,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </button>
        </div>
      </main>
    </motion.div>
  );
};

