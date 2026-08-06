import React from 'react';
import { COMPARISON_ITEMS } from '../data/impactData';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const Comparison: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-transparent border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">

        {/* ── Section Header — compact, side-by-side on wide screens ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 backdrop-blur-md inline-block">
              04. What Makes Us Different
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans-display font-bold text-[#F7F4EE] tracking-tight leading-tight">
              An Uncompromising Shift in{' '}
              <span className="font-serif-editorial italic font-normal text-[#C8A96A]">
                How Students Experience Work.
              </span>
            </h2>
          </div>
          <p className="text-sm text-[#9E9EA7] font-light max-w-xs leading-relaxed shrink-0">
            Every pillar of a typical internship, rebuilt from scratch for real impact.
          </p>
        </div>

        {/* ── Single Unified Comparison Box ── */}
        <div className="rounded-2xl bg-[#0C0C10]/60 backdrop-blur-2xl border border-[#C8A96A]/20 overflow-hidden shadow-2xl">

          {/* Column Header Row */}
          <div className="grid grid-cols-12 gap-0 px-5 py-3 border-b border-white/[0.06] bg-[#0D0D0F]/50">
            <div className="col-span-3 text-[10px] font-mono uppercase tracking-widest text-[#9E9EA7]">
              Pillar
            </div>
            <div className="col-span-4 pl-4 text-[10px] font-mono uppercase tracking-widest text-[#9E9EA7] flex items-center gap-1.5">
              <XCircle className="w-3 h-3 text-[#9E9EA7]/60" /> Typical Track
            </div>
            <div className="col-span-5 pl-4 text-[10px] font-mono uppercase tracking-widest text-[#C8A96A] flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-[#C8A96A]" /> The ImpactX Track
            </div>
          </div>

          {/* Comparison Rows — compact, dense, readable */}
          {COMPARISON_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-12 gap-0 transition-colors duration-200 hover:bg-[#C8A96A]/[0.03] ${
                idx < COMPARISON_ITEMS.length - 1 ? 'border-b border-white/[0.05]' : ''
              }`}
            >
              {/* Pillar Label */}
              <div className="col-span-3 px-5 py-4 flex items-center">
                <span className="font-sans-display font-semibold text-[#F7F4EE] text-sm leading-tight">
                  {item.aspect}
                </span>
              </div>

              {/* Typical Track */}
              <div className="col-span-4 px-4 py-4 border-l border-white/[0.04] flex items-center gap-2.5">
                <XCircle className="w-3.5 h-3.5 text-[#9E9EA7]/50 shrink-0" />
                <p className="text-xs text-[#9E9EA7] font-light leading-relaxed">
                  {condensed(item.typical)}
                </p>
              </div>

              {/* ImpactX Track */}
              <div className="col-span-5 px-4 py-4 border-l border-[#C8A96A]/10 bg-[#C8A96A]/[0.04] flex items-center gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A96A] shrink-0" />
                <p className="text-xs text-[#F7F4EE] font-medium leading-relaxed">
                  {condensed(item.impactX)}
                </p>
              </div>
            </div>
          ))}

          {/* Bottom CTA strip */}
          <div className="px-5 py-4 bg-[#C8A96A]/[0.06] border-t border-[#C8A96A]/20 flex items-center justify-between gap-4">
            <p className="text-xs text-[#9E9EA7] font-light">
              Ready to experience the ImpactX difference?
            </p>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#C8A96A] hover:text-[#F7F4EE] transition-colors"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

/**
 * Trims long strings to a max character count for table readability.
 * Words are never cut mid-way.
 */
function condensed(text: string, max = 110): string {
  if (text.length <= max) return text;
  const trimmed = text.substring(0, max);
  return trimmed.substring(0, trimmed.lastIndexOf(' ')) + '…';
}
