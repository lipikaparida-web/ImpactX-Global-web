import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OurStory } from './OurStory';
import { OurPhilosophy } from './OurPhilosophy';
import { Comparison } from './Comparison';

export const DiscoverTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'philosophy' | 'comparison'>('story');

  const tabs = [
    { id: 'story', label: 'Our Story' },
    { id: 'philosophy', label: 'Our Philosophy' },
    { id: 'comparison', label: 'Why Us' }
  ] as const;

  return (
    <section id="discover" className="relative z-10 w-full py-16 sm:py-24 px-6 flex flex-col items-center">
      {/* Tab Navigation */}
      <div className="w-full max-w-xl mx-auto mb-12">
        <div className="flex justify-center items-center p-1 bg-[#121215]/60 backdrop-blur-md rounded-full border border-[#C8A96A]/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 py-3 px-4 text-sm sm:text-base font-medium transition-colors duration-300 rounded-full z-10 ${
                activeTab === tab.id ? 'text-[#0D0D0F]' : 'text-[#9E9EA7] hover:text-[#F7F4EE]'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-[#C8A96A] rounded-full -z-10 shadow-[0_0_15px_rgba(200,169,106,0.4)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full max-w-7xl mx-auto min-h-[600px] relative">
        <AnimatePresence mode="wait">
          {activeTab === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <OurStory />
            </motion.div>
          )}
          {activeTab === 'philosophy' && (
            <motion.div
              key="philosophy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <OurPhilosophy />
            </motion.div>
          )}
          {activeTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <Comparison />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
