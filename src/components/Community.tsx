import React from 'react';
import { COMMUNITY_HUBS } from '../data/impactData';
import { MessageSquare, Code, Microscope, Calendar, Zap, Users, ArrowUpRight, Heart, MessageCircle } from 'lucide-react';

export const Community: React.FC = () => {
  const getHubIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-[#C8A96A]" />;
      case 'Code': return <Code className="w-5 h-5 text-[#C8A96A]" />;
      case 'Microscope': return <Microscope className="w-5 h-5 text-[#C8A96A]" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-[#C8A96A]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#C8A96A]" />;
      case 'Heart': return <Heart className="w-5 h-5 text-[#C8A96A]" />;
      case 'MessageCircle': return <MessageCircle className="w-5 h-5 text-[#C8A96A]" />;
      default: return <Users className="w-5 h-5 text-[#C8A96A]" />;
    }
  };

  return (
    <section className="py-36 sm:py-48 relative bg-transparent border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 backdrop-blur-md">
            09. The Global Campus
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans-display font-bold text-[#F7F4EE] tracking-tight max-w-3xl leading-tight">
            A 24/7 Peer Ecosystem. <br />
            <span className="font-serif-editorial italic font-normal text-[#C8A96A]">Where Builders Connect & Flourish.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9E9EA7] max-w-xl leading-relaxed font-light">
            Our digital hubs host live code reviews, research symposia, alumni office hours, and monthly global hackathons.
          </p>
        </div>

        {/* Hubs Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMMUNITY_HUBS.map((hub) => (
            <div
              key={hub.id}
              className="p-8 sm:p-10 rounded-3xl bg-[#121215]/35 backdrop-blur-2xl border border-[#C8A96A]/15 hover:border-[#C8A96A]/35 transition-all duration-500 flex flex-col justify-between group shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 rounded-2xl bg-[#0D0D0F]/60 border border-[#C8A96A]/20">
                    {getHubIcon(hub.icon)}
                  </div>
                  <span className="text-[10px] font-mono text-[#9E9EA7] bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/[0.06]">
                    {hub.cadence}
                  </span>
                </div>

                <h3 className="text-xl font-sans-display font-bold text-[#F7F4EE] group-hover:text-[#C8A96A] transition-colors">
                  {hub.title}
                </h3>

                <p className="mt-4 text-xs sm:text-sm text-[#9E9EA7] leading-relaxed font-light">
                  {hub.description}
                </p>
              </div>



            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
