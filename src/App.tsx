import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DiscoverTabs } from './components/DiscoverTabs';
import { PathwaysTabs } from './components/PathwaysTabs';
import { ExperienceTabs } from './components/ExperienceTabs';
import { ImpactStats } from './components/ImpactStats';
import { Community } from './components/Community';
import { AlumniNetwork } from './components/AlumniNetwork';
import { FAQ } from './components/FAQ';
import { ContactAndNewsletter } from './components/ContactAndNewsletter';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { HogwartsCastleBackground } from './components/HogwartsCastleBackground';
import { HogwartsTrainBackground } from './components/HogwartsTrainBackground';
import { MagicWandCursor } from './components/MagicWandCursor';
import { PlatformGateway } from './components/PlatformGateway';
import { AlumniCardStudio } from './components/alumni/AlumniCardStudio';
import { AlumniAuthModal } from './components/alumni/AlumniAuthModal';
import { DomainId, AlumniCardConfig } from './types';

export default function App() {
  const [showPlatformGateway, setShowPlatformGateway] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [preselectedDomain, setPreselectedDomain] = useState<DomainId | string>('research');
  const [activeSection, setActiveSection] = useState('hero');

  // Alumni card studio state
  const [isCardStudioOpen, setIsCardStudioOpen] = useState(false);
  const [cardStudioPrefill, setCardStudioPrefill] = useState<Partial<AlumniCardConfig> | undefined>(undefined);

  // Alumni auth modal state
  const [isAlumniAuthOpen, setIsAlumniAuthOpen] = useState(false);

  // Active section tracker via IntersectionObserver (zero scroll event overhead)
  useEffect(() => {
    const sections = [
      'hero',
      'discover',
      'story',
      'philosophy',
      'why-us',
      'team',
      'pathways',
      'programs',
      'domains',
      'experience',
      'journey',
      'admissions',
      'impact',
      'chapters',
      'community',
      'alumni',
      'faq',
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
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleOpenApplyWithDomain = (domainId: DomainId | string) => {
    setPreselectedDomain(domainId);
    window.open('https://forms.gle/n4QQ2xfUNDmXSbQEA', '_blank', 'noopener,noreferrer');
  };

  const handleOpenCardStudio = (prefill?: Partial<AlumniCardConfig>) => {
    setCardStudioPrefill(prefill);
    setIsCardStudioOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#03040C] text-[#F7F4EE] font-sans selection:bg-[#C8A96A]/30 selection:text-[#C8A96A] antialiased relative overflow-x-hidden">

      {/* Platform 9¾ Pre-loader & Entry Gateway */}
      {showPlatformGateway && (
        <PlatformGateway onEnterWebsite={() => {
          setShowPlatformGateway(false);
        }} />
      )}

      {/* ── Magic Wand Cursor — golden dust + spell bursts ── */}
      <MagicWandCursor />

      {/* ── Layer 0: Hogwarts Castle — immersive fixed background ── */}
      <HogwartsCastleBackground />

      {/* ── Layer 1: Hogwarts Express Train — runs across ALL sections ── */}
      <HogwartsTrainBackground />

      {/* Floating Glass Header Navigation with Professional Dropdowns */}
      <Navbar
        onOpenApply={() => handleOpenApplyWithDomain('research')}
        activeSection={activeSection}
      />

      {/* Main Cinematic Storytelling Sections (Consolidated into 7 Crisp Hubs) */}
      <main className="relative z-10">

        {/* 01. Hero & Real-Time Intake Status */}
        <Hero
          onOpenApply={() => handleOpenApplyWithDomain('research')}
          onOpenDomains={() => {
            const el = document.getElementById('domains') || document.getElementById('pathways');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 02. Discover ImpactX Hub (Our Story, Philosophy, Why Us, Leadership & Team) */}
        <DiscoverTabs />

        {/* 03. Learning Pathways Hub (Flagship Programs + 9 Specialized Domains) */}
        <PathwaysTabs
          onSelectProgramToApply={(programId) => handleOpenApplyWithDomain(programId)}
          onSelectDomainForApply={(domainId) => handleOpenApplyWithDomain(domainId)}
        />

        {/* 04. Student Experience Hub (12-Week Builder Journey + Admissions Pipeline) */}
        <ExperienceTabs
          onOpenApply={() => handleOpenApplyWithDomain('research')}
        />

        {/* 05. International Movement & Chapters (3D Interactive Globe + Ecosystem Pillars) */}
        <ImpactStats
          onOpenApply={() => handleOpenApplyWithDomain('research')}
        />

        {/* 06. Global Campus Community & Alumni Network */}
        <Community />
        <AlumniNetwork
          onOpenCardStudio={handleOpenCardStudio}
        />

        {/* 07. Knowledge Base & Direct Connect */}
        <FAQ />
        <ContactAndNewsletter />

      </main>

      {/* Compact, Organized Footer Matching Navbar Architecture */}
      <Footer onOpenApply={() => handleOpenApplyWithDomain('research')} />

      {/* Application Cohort Modal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        preselectedDomain={preselectedDomain}
      />

      {/* Alumni Card Studio Modal */}
      <AlumniCardStudio
        isOpen={isCardStudioOpen}
        onClose={() => setIsCardStudioOpen(false)}
        prefill={cardStudioPrefill}
      />

      {/* Alumni Auth Modal */}
      <AlumniAuthModal
        isOpen={isAlumniAuthOpen}
        onClose={() => setIsAlumniAuthOpen(false)}
        onAuthSuccess={() => {
          setIsAlumniAuthOpen(false);
          setIsCardStudioOpen(true);
        }}
      />

    </div>
  );
}
