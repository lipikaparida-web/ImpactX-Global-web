import React, { useState } from 'react';
import { Mail, MessageSquare, Linkedin, Instagram, ArrowRight, CheckCircle2, Compass } from 'lucide-react';

export const ContactAndNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-36 sm:py-48 relative bg-transparent border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Newsletter / Dispatch */}
          <div className="lg:col-span-7 p-10 sm:p-12 rounded-3xl bg-[#121215]/35 backdrop-blur-2xl border border-[#C8A96A]/20 shadow-2xl relative overflow-hidden">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 backdrop-blur-md">
              ImpactX Monthly Dispatch
            </span>

            <h3 className="text-2xl sm:text-4xl font-sans-display font-bold text-[#F7F4EE] tracking-tight mt-5">
              Stay Connected with the Global Builder Ecosystem.
            </h3>

            <p className="mt-3 text-xs sm:text-base text-[#9E9EA7] leading-relaxed font-light">
              Curated student research whitepapers, open software launches, and upcoming masterclass announcements delivered once a month.
            </p>

            {subscribed ? (
              <div className="mt-8 p-5 rounded-2xl bg-[#C8A96A]/10 border border-[#C8A96A]/30 flex items-center gap-3 text-xs sm:text-sm text-[#F7F4EE]">
                <CheckCircle2 className="w-5 h-5 text-[#C8A96A]" />
                <span>You are subscribed to the ImpactX Global Dispatch. Welcome aboard!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your university or personal email..."
                  className="flex-1 px-5 py-4 bg-[#0D0D0F]/60 border border-[#C8A96A]/20 rounded-full text-xs sm:text-sm text-[#F7F4EE] placeholder-[#9E9EA7]/60 focus:outline-none focus:border-[#C8A96A]/60 transition-colors"
                />
                <button
                  type="submit"
                  className="py-4 px-8 text-xs sm:text-sm font-semibold text-[#0D0D0F] bg-[#F7F4EE] hover:bg-white rounded-full transition-all shadow-[0_4px_24px_rgba(247,244,238,0.18)] hover:shadow-[0_8px_32px_rgba(200,169,106,0.35)] flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Social & Contact Channels */}
          <div className="lg:col-span-5 space-y-5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#9E9EA7]">
              14. Direct Communication Channels
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <a
                href="mailto:impactxglobal26@gmail.com"
                className="col-span-2 p-5 rounded-2xl bg-[#121215]/35 backdrop-blur-2xl border border-[#C8A96A]/15 hover:border-[#C8A96A]/35 transition-all flex items-center gap-4 group shadow-xl"
              >
                <div className="p-3 rounded-xl bg-[#0D0D0F]/60 text-[#C8A96A]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#F7F4EE] group-hover:text-[#C8A96A] transition-colors block">Email Us</span>
                  <span className="text-[10px] text-[#9E9EA7] font-mono leading-tight block">impactxglobal26@gmail.com</span>
                  <span className="text-[10px] text-[#9E9EA7] font-mono leading-tight block">join.impactx.team@gmail.com</span>
                </div>
              </a>



              <a
                href="https://www.linkedin.com/company/135644013"
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-2xl bg-[#121215]/35 backdrop-blur-2xl border border-[#C8A96A]/15 hover:border-[#C8A96A]/35 transition-all flex items-center gap-3.5 group shadow-xl"
              >
                <div className="p-3 rounded-xl bg-[#0D0D0F]/60 text-[#C8A96A]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#F7F4EE] group-hover:text-[#C8A96A] transition-colors block">LinkedIn</span>
                  <span className="text-[10px] text-[#9E9EA7] font-mono">Network</span>
                </div>
              </a>

              <a
                href="https://www.instagram.com/impactxglobal?igsh=Mm44MTRsamQ5dWls&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-2xl bg-[#121215]/35 backdrop-blur-2xl border border-[#C8A96A]/15 hover:border-[#C8A96A]/35 transition-all flex items-center gap-3.5 group shadow-xl"
              >
                <div className="p-3 rounded-xl bg-[#0D0D0F]/60 text-[#C8A96A]">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#F7F4EE] group-hover:text-[#C8A96A] transition-colors block">Instagram</span>
                  <span className="text-[10px] text-[#9E9EA7] font-mono">Highlights</span>
                </div>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
