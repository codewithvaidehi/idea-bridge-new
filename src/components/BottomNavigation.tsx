import React from 'react';
import { useApp, TabType } from '../context/AppContext';

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab, setSelectedProblemId, setIsSubmitModalOpen } = useApp();

  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'speed' },
    { id: 'problems', label: 'Problems', icon: 'radar' },
    { id: 'quests', label: 'Quests', icon: 'explore' },
    { id: 'solutions', label: 'Solutions', icon: 'science' },
    { id: 'collaborate', label: 'Collaborate', icon: 'hub' },
  ];

  return (
    <>
      {/* Floating Action Button: + Submit Problem (matching Image 3) */}
      <div className="fixed bottom-20 right-4 sm:right-6 lg:bottom-8 lg:right-8 z-40 pb-safe">
        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="flex items-center justify-center gap-2 h-12 px-5 rounded-xl bg-[#4d8eff] hover:bg-[#3b82f6] text-[#002e6a] font-headline font-semibold text-sm shadow-[0_4px_24px_rgba(77,142,255,0.4)] active:scale-95 transition-all cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px] font-bold">add</span>
          <span className="tracking-wide">Submit Problem</span>
        </button>
      </div>

      {/* Fixed Bottom Navigation (Mobile & Tablet) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe bg-[#0f131c]/90 backdrop-blur-xl border-t border-[#1c2028] shadow-[0_-2px_16px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center h-16 px-2 max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedProblemId(null);
                  setActiveTab(item.id);
                }}
                className={`flex flex-1 flex-col items-center justify-center h-14 min-w-[48px] gap-0.5 transition-colors ${
                  isActive ? 'text-[#adc6ff] font-semibold' : 'text-[#c2c6d6] hover:text-[#dfe2ee]'
                }`}
                type="button"
              >
                <span
                  className={`material-symbols-outlined text-[22px] transition-transform ${
                    isActive ? 'scale-110' : ''
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-mono text-[10px] tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
