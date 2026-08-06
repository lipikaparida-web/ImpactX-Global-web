import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/impactData';
import { ChevronDown, Search } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'General', 'Application', 'Commitment', 'Outcomes'];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-36 sm:py-48 relative bg-transparent border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 backdrop-blur-md">
            13. Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans-display font-bold text-[#F7F4EE] tracking-tight">
            Clear Answers for Ambitious Builders.
          </h2>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-16 space-y-5">
          <div className="relative">
            <Search className="w-4 h-4 text-[#9E9EA7] absolute left-5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or keywords..."
              className="w-full pl-12 pr-6 py-4 bg-[#121215]/40 border border-[#C8A96A]/20 rounded-full text-xs sm:text-sm text-[#F7F4EE] placeholder-[#9E9EA7]/60 focus:outline-none focus:border-[#C8A96A]/60 transition-colors backdrop-blur-2xl"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C8A96A] text-[#0D0D0F] font-semibold shadow-md'
                    : 'bg-[#121215]/40 text-[#9E9EA7] hover:text-[#F7F4EE] border border-white/[0.05] backdrop-blur-xl'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="mt-12 space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="p-10 text-center text-xs text-[#9E9EA7] font-mono">
              No matching questions found for "{searchQuery}".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-3xl bg-[#121215]/35 backdrop-blur-2xl border border-[#C8A96A]/15 overflow-hidden transition-all shadow-xl"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? '' : faq.id)}
                    className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-sans-display font-semibold text-[#F7F4EE] text-base sm:text-lg">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#9E9EA7] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#C8A96A]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 sm:px-7 pb-7 pt-0 text-xs sm:text-sm text-[#9E9EA7] leading-relaxed font-light border-t border-white/[0.04]">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
