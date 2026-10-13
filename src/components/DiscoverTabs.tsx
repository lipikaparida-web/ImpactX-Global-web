import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OurStory } from './OurStory';
import { OurPhilosophy } from './OurPhilosophy';
import { Comparison } from './Comparison';
import { MeetTheTeam } from './MeetTheTeam';

export const DiscoverTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'philosophy' | 'comparison' | 'team'>('story');

  const tabs = [
    { id: 'story', label: 'Our Story', hash: '#story' },
    { id: 'philosophy', label: 'Our Philosophy', hash: '#philosophy' },
    { id: 'comparison', label: 'Why Us', hash: '#why-us' },
    { id: 'team', label: 'Leadership & Team', hash: '#team' },
  ] as const;

  // Sync active tab with window hash on load and hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'story') setActiveTab('story');
      else if (hash === 'philosophy') setActiveTab('philosophy');
      else if (hash === 'why-us' || hash === 'comparison') setActiveTab('comparison');
      else if (hash === 'team') setActiveTab('team');
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const selectTab = (tabId: 'story' | 'philosophy' | 'comparison' | 'team') => {
    setActiveTab(tabId);
    const targetHash = tabId === 'comparison' ? '#why-us' : `#${tabId}`;
    if (window.location.hash !== targetHash) {
      window.history.replaceState(null, '', targetHash);
    }
  };

  return (
    <section id="discover" className="relative z-10 w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center border-t border-white/[0.04]">
      {/* Invisible anchor points to preserve external deep links */}
      <span id="story" className="sr-only" />
      <span id="philosophy" className="sr-only" />
      <span id="why-us" className="sr-only" />
      <span id="team" className="sr-only" />

      {/* Tab Navigation Pill Bar */}
      <div className="w-full max-w-2xl mx-auto mb-10 sm:mb-12">
        <div className="flex justify-center items-center p-1 bg-[#121215]/80 backdrop-blur-xl rounded-full border border-[#C8A96A]/20 shadow-xl overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => selectTab(tab.id)}
                className={`relative flex-1 py-2.5 px-3 sm:px-5 text-xs sm:text-sm font-medium transition-colors duration-200 rounded-full z-10 whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] ${
                  isActive ? 'text-[#0D0D0F] font-semibold' : 'text-[#9E9EA7] hover:text-[#F7F4EE]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicatorDiscover"
                    className="absolute inset-0 bg-[#C8A96A] rounded-full -z-10 shadow-[0_0_15px_rgba(200,169,106,0.35)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Panel */}
      <div className="w-full max-w-7xl mx-auto min-h-[500px] relative">
        <AnimatePresence mode="wait">
          {activeTab === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <OurStory />
            </motion.div>
          )}

          {activeTab === 'philosophy' && (
            <motion.div
              key="philosophy"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <OurPhilosophy />
            </motion.div>
          )}

          {activeTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Comparison />
            </motion.div>
          )}

          {activeTab === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <MeetTheTeam embedded={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
