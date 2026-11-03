import React from 'react';
import { Mail, Phone, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 relative bg-transparent border-t border-white/[0.04]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 mb-5"
          >
            Get in Touch
          </motion.span>
          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-sans-display font-extrabold text-[#FFFFFF] tracking-tight mb-4"
          >
            We'd love to{' '}
            <span className="font-serif-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FCEAC5] via-[#E8C57D] to-[#D4A247]">
              hear from you.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm text-[#D4CEBF] max-w-md mx-auto leading-relaxed font-normal"
          >
            Reach out with questions about programmes, domains, or collaborations.
          </motion.p>
        </div>

        {/* Contact channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

          <motion.a
            href="mailto:impactxglobal26@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-[#12131C]/85 border border-white/[0.12] hover:border-[#E5C07B]/45 hover:shadow-[0_4px_24px_rgba(229,192,123,0.12)] transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C07B]"
          >
            <div className="p-2.5 rounded-xl bg-[#1A1A26] border border-[#E5C07B]/25 group-hover:border-[#E5C07B]/50 transition-colors shrink-0">
              <Mail className="w-4 h-4 text-[#E5C07B]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white group-hover:text-[#E5C07B] transition-colors">
                Email
              </p>
              <p className="text-[11px] font-mono text-[#D4CEBF] truncate font-medium">
                impactxglobal26@gmail.com
              </p>
            </div>
          </motion.a>

          <motion.a
            href="tel:+918018949822"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-[#12131C]/85 border border-white/[0.12] hover:border-[#E5C07B]/45 hover:shadow-[0_4px_24px_rgba(229,192,123,0.12)] transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C07B]"
          >
            <div className="p-2.5 rounded-xl bg-[#1A1A26] border border-[#E5C07B]/25 group-hover:border-[#E5C07B]/50 transition-colors shrink-0">
              <Phone className="w-4 h-4 text-[#E5C07B]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white group-hover:text-[#E5C07B] transition-colors">
                Phone
              </p>
              <p className="text-[11px] font-mono text-[#D4CEBF] font-medium">
                +91 8018949822
              </p>
              <p className="text-[10px] text-[#A6A298] font-mono">Mon–Fri, 10 AM–6 PM IST</p>
            </div>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/company/135644013"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-[#12131C]/85 border border-white/[0.12] hover:border-[#E5C07B]/45 hover:shadow-[0_4px_24px_rgba(229,192,123,0.12)] transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C07B]"
          >
            <div className="p-2.5 rounded-xl bg-[#1A1A26] border border-[#E5C07B]/25 group-hover:border-[#E5C07B]/50 transition-colors shrink-0">
              <Linkedin className="w-4 h-4 text-[#E5C07B]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white group-hover:text-[#E5C07B] transition-colors">
                LinkedIn
              </p>
              <p className="text-[11px] font-mono text-[#D4CEBF] font-medium">ImpactX Global</p>
            </div>
          </motion.a>

          <motion.a
            href="https://www.instagram.com/impactxglobal?igsh=Mm44MTRsamQ5dWls&utm_source=qr"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-[#12131C]/85 border border-white/[0.12] hover:border-[#E5C07B]/45 hover:shadow-[0_4px_24px_rgba(229,192,123,0.12)] transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C07B]"
          >
            <div className="p-2.5 rounded-xl bg-[#1A1A26] border border-[#E5C07B]/25 group-hover:border-[#E5C07B]/50 transition-colors shrink-0">
              <Instagram className="w-4 h-4 text-[#E5C07B]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white group-hover:text-[#E5C07B] transition-colors">
                Instagram
              </p>
              <p className="text-[11px] font-mono text-[#D4CEBF] font-medium">@impactxglobal</p>
            </div>
          </motion.a>

        </div>

      </div>
    </section>
  );
};
