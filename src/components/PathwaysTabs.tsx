import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Programs } from './Programs';
import { Domains } from './Domains';
import { DomainId } from '../types';

interface PathwaysTabsProps {
  onSelectProgramToApply: (programId: string) => void;
  onSelectDomainForApply: (domainId: DomainId | string) => void;
}

export const PathwaysTabs: React.FC<PathwaysTabsProps> = ({ 
  onSelectProgramToApply, 
  onSelectDomainForApply 
}) => {
  const [activeTab, setActiveTab] = useState<'programs' | 'domains'>('programs');

  const tabs = [
    { id: 'programs', label: 'Flagship Programs (4 Tracks)', hash: '#programs' },
    { id: 'domains', label: 'Specialized Domains (9 Tracks)', hash: '#domains' },
  ] as const;

  // Sync with URL hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'programs') setActiveTab('programs');
      else if (hash === 'domains') setActiveTab('domains');
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const selectTab = (tabId: 'programs' | 'domains') => {
    setActiveTab(tabId);
    const targetHash = `#${tabId}`;
    if (window.location.hash !== targetHash) {
      window.history.replaceState(null, '', targetHash);
    }
  };

  return (
    <section id="pathways" className="relative z-10 w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center border-t border-white/[0.04]">
      {/* Invisible anchor points to preserve deep links */}
      <span id="programs" className="sr-only" />
      <span id="domains" className="sr-only" />

      {/* Tab Navigation Pill Bar */}
      <div className="w-full max-w-xl mx-auto mb-10 sm:mb-12">
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
                    layoutId="activeTabIndicatorPathways"
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
          {activeTab === 'programs' && (
            <motion.div
              key="programs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Programs 
                onSelectProgramToApply={onSelectProgramToApply}
                embedded={true} 
              />
            </motion.div>
          )}

          {activeTab === 'domains' && (
            <motion.div
              key="domains"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Domains 
                onSelectDomainForApply={onSelectDomainForApply}
                embedded={true} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
