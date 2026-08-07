import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OurStory } from './components/OurStory';
import { OurPhilosophy } from './components/OurPhilosophy';
import { Comparison } from './components/Comparison';
import { Programs } from './components/Programs';
import { Domains } from './components/Domains';
import { Journey } from './components/Journey';
import { MeetTheTeam } from './components/MeetTheTeam';
import { Community } from './components/Community';
import { ImpactStats } from './components/ImpactStats';
import { ApplicationJourney } from './components/ApplicationJourney';
import { FAQ } from './components/FAQ';
import { ContactAndNewsletter } from './components/ContactAndNewsletter';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { HogwartsCastleBackground } from './components/HogwartsCastleBackground';
import { HogwartsTrainBackground } from './components/HogwartsTrainBackground';
import { MagicWandCursor } from './components/MagicWandCursor';
import { PlatformGateway } from './components/PlatformGateway';
import { ThemePlayer } from './components/ThemePlayer';
import { DomainId } from './types';

export default function App() {
  const [showPlatformGateway, setShowPlatformGateway] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [preselectedDomain, setPreselectedDomain] = useState<DomainId | string>('research');
  const [activeSection, setActiveSection] = useState('hero');

  // Active section tracker on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['story', 'philosophy', 'programs', 'domains', 'journey', 'team', 'impact', 'faq'];
      const scrollPos = window.scrollY + 200;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenApplyWithDomain = (domainId: DomainId | string) => {
    window.open('https://forms.gle/kzvZpQh5o4UP6tzXA', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#03040C] text-[#F7F4EE] font-sans selection:bg-[#C8A96A]/30 selection:text-[#C8A96A] antialiased relative overflow-x-hidden">

      {/* Platform 9¾ Pre-loader & Entry Gateway */}
      {showPlatformGateway && (
        <PlatformGateway onEnterWebsite={() => {
          setShowPlatformGateway(false);
          // Play the magical theme song as they enter
          window.dispatchEvent(new Event('start-theme-music'));
        }} />
      )}

      {/* ── Magic Wand Cursor — golden dust + spell bursts ── */}
      <MagicWandCursor />
      
      <ThemePlayer />

      {/* ── Layer 0: Hogwarts Castle — immersive fixed background ── */}
      <HogwartsCastleBackground />

      {/* ── Layer 1: Hogwarts Express Train — runs across ALL sections ── */}
      <HogwartsTrainBackground />

      {/* Floating Glass Header Navigation */}
      <Navbar
        onOpenApply={() => handleOpenApplyWithDomain('research')}
        activeSection={activeSection}
      />

      {/* Main Cinematic Storytelling Sections */}
      <main className="relative z-10">

        {/* 01. Hero */}
        <Hero
          onOpenApply={() => handleOpenApplyWithDomain('research')}
          onOpenDomains={() => {
            const el = document.getElementById('domains');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 02. Our Story */}
        <OurStory />

        {/* 03. Our Philosophy */}
        <OurPhilosophy />

        {/* 04. What Makes Us Different */}
        <Comparison />

        {/* 05. Core Programs */}
        <Programs
          onSelectProgramToApply={(programId) => handleOpenApplyWithDomain(programId)}
        />

        {/* 06. Domains */}
        <Domains
          onSelectDomainForApply={(domainId) => handleOpenApplyWithDomain(domainId)}
        />

        {/* 07. Builder Journey */}
        <Journey />

        {/* 08. Meet The Team */}
        <MeetTheTeam />

        {/* 09. Community */}
        <Community />

        {/* 10. Impact Stats */}
        <ImpactStats
          onOpenApply={() => handleOpenApplyWithDomain('research')}
        />

        {/* 12. Application Journey */}
        <ApplicationJourney
          onOpenApply={() => handleOpenApplyWithDomain('research')}
        />

        {/* 13. FAQ */}
        <FAQ />

        {/* 14. Contact & Dispatch */}
        <ContactAndNewsletter />

      </main>

      {/* 15. Footer */}
      <Footer onOpenApply={() => handleOpenApplyWithDomain('research')} />

      {/* Application Cohort Modal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        preselectedDomain={preselectedDomain}
      />

    </div>
  );
}
