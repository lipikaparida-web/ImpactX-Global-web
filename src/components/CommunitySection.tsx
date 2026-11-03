import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, MessageCircle, Zap, Heart } from 'lucide-react';

const COMMUNITY_HIGHLIGHTS = [
  {
    icon: MessageSquare,
    title: 'Global Builder Discord',
    description: 'Our primary digital campus — connect with builders, share work, and collaborate.',
  },
  {
    icon: MessageCircle,
    title: 'Global WhatsApp Community',
    description: 'Instant updates, peer networking, and rapid problem-solving on your phone.',
  },
  {
    icon: Zap,
    title: 'ImpactX Hackathons',
    description: 'Rapid prototyping sprints tackling open-source and community challenges.',
  },
  {
    icon: Heart,
    title: 'Impact Challenge',
    description: 'Make a difference in society through community-driven social initiatives.',
  },
];

export const CommunitySection: React.FC = () => {
  return (
    <section
      id="community"
      className="py-16 sm:py-20 lg:py-24 relative bg-transparent border-t border-white/[0.04]"
      aria-labelledby="community-heading"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: text */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 mb-5"
            >
              Community
            </motion.span>
            <motion.h2
              id="community-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-3xl sm:text-4xl font-sans-display font-extrabold text-[#FFFFFF] tracking-tight leading-tight mb-6"
            >
              A community that{' '}
              <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FCEAC5] via-[#E8C57D] to-[#D4A247]">
                builds together.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base text-[#D4CEBF] leading-relaxed font-normal"
            >
              ImpactX Global brings students together across disciplines and borders.
              Whether through online collaboration or social impact initiatives, our
              community is active, engaged, and growing.
            </motion.p>
          </div>

          {/* Right: community highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COMMUNITY_HIGHLIGHTS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="p-5 rounded-2xl bg-[#12131C]/85 border border-white/[0.12] hover:border-[#E5C07B]/40 hover:shadow-[0_4px_24px_rgba(229,192,123,0.12)] transition-all duration-300 group"
                >
                  <div className="p-2 rounded-xl bg-[#1A1A26] border border-[#E5C07B]/25 group-hover:border-[#E5C07B]/50 transition-colors w-fit mb-3">
                    <Icon className="w-4 h-4 text-[#E5C07B]" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">{item.title}</h3>
                  <p className="text-xs text-[#CBC5B6] leading-relaxed font-normal">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
