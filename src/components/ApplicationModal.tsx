import React, { useState } from 'react';
import { DomainId, ApplicationFormData } from '../types';
import { DOMAINS } from '../data/impactData';
import { X, CheckCircle2, ArrowRight, Compass } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDomain?: DomainId | string;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  preselectedDomain
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    university: '',
    yearOfStudy: '2nd Year',
    primaryDomain: (preselectedDomain as DomainId) || 'research',
    portfolioUrl: '',
    linkedinUrl: '',
    whyImpactX: '',
    weeklyCommitmentHours: '12-15 Hours/Week',
    agreeToTerms: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0D0F]/90 backdrop-blur-2xl overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#121215]/95 border border-[#C8A96A]/25 rounded-3xl p-6 sm:p-10 relative my-8 shadow-2xl backdrop-blur-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-[#0D0D0F]/80 border border-white/10 text-[#9E9EA7] hover:text-[#F7F4EE] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="space-y-2.5 mb-8 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 px-4 py-1.5 rounded-full border border-[#C8A96A]/20 backdrop-blur-md">
                Global Cohort Application
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans-display font-bold text-[#F7F4EE] pt-2">
                Apply for ImpactX Global
              </h2>
              <p className="text-xs sm:text-sm text-[#9E9EA7] font-light">
                Tell us about your background and what you want to build. No artificial standardized tests required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#9E9EA7] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-4 py-3 bg-[#0D0D0F]/80 border border-[#C8A96A]/20 rounded-2xl text-xs text-[#F7F4EE] focus:outline-none focus:border-[#C8A96A]/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#9E9EA7] mb-1.5">
                    University / Personal Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@university.edu"
                    className="w-full px-4 py-3 bg-[#0D0D0F]/80 border border-[#C8A96A]/20 rounded-2xl text-xs text-[#F7F4EE] focus:outline-none focus:border-[#C8A96A]/60 transition-colors"
                  />
                </div>
              </div>

              {/* University & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#9E9EA7] mb-1.5">
                    University or Institution *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    placeholder="e.g. Imperial College London"
                    className="w-full px-4 py-3 bg-[#0D0D0F]/80 border border-[#C8A96A]/20 rounded-2xl text-xs text-[#F7F4EE] focus:outline-none focus:border-[#C8A96A]/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#9E9EA7] mb-1.5">
                    Current Year of Study *
                  </label>
                  <select
                    value={formData.yearOfStudy}
                    onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0D0D0F]/80 border border-[#C8A96A]/20 rounded-2xl text-xs text-[#F7F4EE] focus:outline-none focus:border-[#C8A96A]/60 transition-colors"
                  >
                    <option value="1st Year">1st Year / Freshman</option>
                    <option value="2nd Year">2nd Year / Sophomore</option>
                    <option value="3rd Year">3rd Year / Junior</option>
                    <option value="4th Year+">4th Year / Senior</option>
                    <option value="Postgraduate">Postgraduate / Masters</option>
                  </select>
                </div>
              </div>

              {/* Primary Domain */}
              <div>
                <label className="block text-xs font-mono text-[#9E9EA7] mb-1.5">
                  Primary Domain Track *
                </label>
                <select
                  value={formData.primaryDomain}
                  onChange={(e) => setFormData({ ...formData, primaryDomain: e.target.value as DomainId })}
                  className="w-full px-4 py-3 bg-[#0D0D0F]/80 border border-[#C8A96A]/20 rounded-2xl text-xs text-[#F7F4EE] focus:outline-none focus:border-[#C8A96A]/60 transition-colors"
                >
                  {DOMAINS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Portfolio & LinkedIn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#9E9EA7] mb-1.5">
                    Portfolio / GitHub / Work Sample Link
                  </label>
                  <input
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    placeholder="https://github.com/yourusername"
                    className="w-full px-4 py-3 bg-[#0D0D0F]/80 border border-[#C8A96A]/20 rounded-2xl text-xs text-[#F7F4EE] focus:outline-none focus:border-[#C8A96A]/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#9E9EA7] mb-1.5">
                    LinkedIn Profile URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-3 bg-[#0D0D0F]/80 border border-[#C8A96A]/20 rounded-2xl text-xs text-[#F7F4EE] focus:outline-none focus:border-[#C8A96A]/60 transition-colors"
                  />
                </div>
              </div>

              {/* Statement */}
              <div>
                <label className="block text-xs font-mono text-[#9E9EA7] mb-1.5">
                  Why do you want to join ImpactX Global? *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.whyImpactX}
                  onChange={(e) => setFormData({ ...formData, whyImpactX: e.target.value })}
                  placeholder="Share what drive or project idea you bring to the ecosystem..."
                  className="w-full px-4 py-3 bg-[#0D0D0F]/80 border border-[#C8A96A]/20 rounded-2xl text-xs text-[#F7F4EE] focus:outline-none focus:border-[#C8A96A]/60 transition-colors resize-none"
                />
              </div>

              {/* Agreement */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  required
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="mt-1 rounded bg-[#0D0D0F] border-[#C8A96A]/30 text-[#C8A96A]"
                />
                <label htmlFor="agreeTerms" className="text-[11px] text-[#9E9EA7] font-light">
                  I commit to 10-15 hours/week for project sprints and agree to hold myself to high standards of team accountability and peer mentorship.
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs text-[#9E9EA7] hover:text-[#F7F4EE]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 text-xs font-semibold text-[#0D0D0F] bg-[#F7F4EE] hover:bg-white rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Submit Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation View */
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#C8A96A]/20 text-[#C8A96A] border border-[#C8A96A]/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#C8A96A]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-sans-display font-bold text-[#F7F4EE]">
                Application Received!
              </h3>
              <p className="text-xs sm:text-sm text-[#9E9EA7] max-w-md mx-auto font-light">
                Thank you, <strong className="text-[#F7F4EE]">{formData.fullName}</strong>. Your profile has been assigned to our <span className="text-[#C8A96A] font-mono">{formData.primaryDomain}</span> domain lead.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D0D0F]/80 border border-[#C8A96A]/20 text-left max-w-md mx-auto space-y-3 text-xs font-mono">
              <div className="flex justify-between text-[#9E9EA7]">
                <span>Status</span>
                <span className="text-[#C8A96A]">Portfolio Review in Progress</span>
              </div>
              <div className="flex justify-between text-[#9E9EA7]">
                <span>Estimated Response</span>
                <span className="text-[#F7F4EE]">3-5 Business Days</span>
              </div>
              <div className="flex justify-between text-[#9E9EA7]">
                <span>Target Cohort</span>
                <span className="text-[#C8A96A]">Global Cohort</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-8 py-3 text-xs font-semibold text-[#0D0D0F] bg-[#F7F4EE] hover:bg-white rounded-full transition-all cursor-pointer shadow-md"
            >
              Back to Digital Headquarters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
