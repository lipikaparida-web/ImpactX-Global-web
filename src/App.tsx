import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';

// ─── Core layout ──────────────────────────────────────────────────────────────
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// ─── Homepage sections (redesigned) ──────────────────────────────────────────
import { Hero } from './components/Hero';
import { OurStorySection } from './components/OurStorySection';
import { Programmes } from './components/Programmes';
import { HowItWorks } from './components/HowItWorks';
import { DomainsSection } from './components/DomainsSection';
import { WhyImpactX } from './components/WhyImpactX';
import { CommunitySection } from './components/CommunitySection';
import { ContactSection } from './components/ContactSection';

// ─── Dedicated sub-pages ──────────────────────────────────────────────────────
import { TestimonialsPage } from './components/TestimonialsPage';

// ─── Alumni system (preserved) ───────────────────────────────────────────────
import { AlumniCardStudio } from './components/alumni/AlumniCardStudio';
import { AlumniAuthModal } from './components/alumni/AlumniAuthModal';
import { ApplicationModal } from './components/ApplicationModal';
import { AlumniCardConfig } from './types';
import { ProgrammeTier } from './config/applicationConfig';

// ─── Ambient background (kept — but Hogwarts / magic cursor removed) ─────────
import { AcademyBackground } from './components/AcademyBackground';

type Page = 'home' | 'testimonials';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeSection, setActiveSection] = useState('hero');

  // Alumni card studio state (preserved from original)
  const [isCardStudioOpen, setIsCardStudioOpen] = useState(false);
  const [cardStudioPrefill, setCardStudioPrefill] = useState<Partial<AlumniCardConfig> | undefined>(undefined);
  const [isAlumniAuthOpen, setIsAlumniAuthOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<ProgrammeTier | undefined>(undefined);

  // Active section tracker via IntersectionObserver (only runs on home page)
  useEffect(() => {
    if (currentPage !== 'home') return;

    const sectionIds = [
      'hero',
      'story',
      'programmes',
      'how-it-works',
      'domains',
      'why-us',
      'community',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  // Page navigation handler
  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenApply = () => {
    setIsApplyModalOpen(true);
  };

  const handleOpenApplyTier = (tier: ProgrammeTier) => {
    setSelectedTier(tier);
    setIsApplyModalOpen(true);
  };

  const handleOpenCardStudio = (prefill?: Partial<AlumniCardConfig>) => {
    setCardStudioPrefill(prefill);
    setIsCardStudioOpen(true);
  };

  // ─── Testimonials dedicated page ─────────────────────────────────────────────
  if (currentPage === 'testimonials') {
    return (
      <div className="min-h-screen bg-[#03040C] text-[#F7F4EE] font-sans selection:bg-[#C8A96A]/30 selection:text-[#C8A96A] antialiased relative overflow-x-hidden">
        <AcademyBackground />
        <AnimatePresence mode="wait">
          <TestimonialsPage
            key="testimonials"
            onBack={() => handleNavigate('home')}
          />
        </AnimatePresence>
      </div>
    );
  }

  // ─── Home page ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#03040C] text-[#F7F4EE] font-sans selection:bg-[#C8A96A]/30 selection:text-[#C8A96A] antialiased relative overflow-x-hidden">

      {/* Ambient background layer */}
      <AcademyBackground />

      {/* Navigation */}
      <Navbar
        onOpenApply={handleOpenApply}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      {/* Main content */}
      <main className="relative z-10" id="main-content">

        {/* 01. Hero */}
        <Hero
          onOpenApply={handleOpenApply}
          onOpenDomains={() => {
            const el = document.getElementById('domains');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 02. Our Story */}
        <OurStorySection />

        {/* 03. Programme Tiers — most important section */}
        <Programmes onApplyTier={handleOpenApplyTier} />

        {/* 04. How It Works */}
        <HowItWorks />

        {/* 05. Specialised Domains */}
        <DomainsSection />

        {/* 06. Why ImpactX Global */}
        <WhyImpactX />

        {/* 07. Community */}
        <CommunitySection />

        {/* 08. Contact */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer onOpenApply={handleOpenApply} />

      {/* Alumni Card Studio (preserved) */}
      <AlumniCardStudio
        isOpen={isCardStudioOpen}
        onClose={() => setIsCardStudioOpen(false)}
        prefill={cardStudioPrefill}
      />

      {/* Alumni Auth Modal (preserved) */}
      <AlumniAuthModal
        isOpen={isAlumniAuthOpen}
        onClose={() => setIsAlumniAuthOpen(false)}
        onAuthSuccess={() => {
          setIsAlumniAuthOpen(false);
          setIsCardStudioOpen(true);
        }}
      />

      {/* Cohort Application Modal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

    </div>
  );
}
