import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, selectedProblemId, setSelectedProblemId, userProfile } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const isDetailView = selectedProblemId !== null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-safe bg-[#0f131c]/85 backdrop-blur-xl border-b border-[#1c2028] shadow-[0_1px_12px_rgba(0,0,0,0.45)]">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Left Zone: Brand / Title / Back Navigation */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {isDetailView ? (
            <button
              onClick={() => setSelectedProblemId(null)}
              className="w-10 h-10 -ml-1 rounded-lg flex items-center justify-center text-[#dfe2ee] hover:text-[#adc6ff] hover:bg-[#1c2028] transition-colors"
              type="button"
              aria-label="Back to dashboard"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setSelectedProblemId(null);
              }}
              className="flex items-center gap-2.5 text-left group"
              type="button"
            >
              {/* Idea Bridge Custom Geometric Logo */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4d8eff] to-[#03b5d3] p-[1.5px] shrink-0 shadow-[0_0_12px_rgba(77,142,255,0.3)]">
                <div className="w-full h-full bg-[#0f131c] rounded-[6.5px] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[19px] text-[#adc6ff] group-hover:scale-105 transition-transform">
                    hub
                  </span>
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[10px] text-[#adc6ff] uppercase tracking-widest font-semibold leading-tight">
                  IDEA BRIDGE
                </span>
                <span className="font-headline text-[15px] sm:text-[16px] font-bold text-[#dfe2ee] truncate leading-tight">
                  {activeTab === 'dashboard'
                    ? 'Dashboard'
                    : activeTab === 'problems'
                    ? 'Problems Explorer'
                    : activeTab === 'quests'
                    ? 'Quests & Bounties'
                    : activeTab === 'solutions'
                    ? 'Solutions Lab'
                    : 'Squad Collaboration'}
                </span>
              </div>
            </button>
          )}

          {isDetailView && (
            <div className="flex flex-col min-w-0">
              <span className="font-headline text-[16px] font-bold text-[#dfe2ee] truncate">
                Problem Detail
              </span>
              <span className="font-mono text-[10px] text-[#8c909f] hidden sm:inline">
                Gate Chain Review Stage
              </span>
            </div>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#181c24] p-1 rounded-xl border border-[#262a33]">
          {(
            [
              { id: 'dashboard', label: 'Dashboard', icon: 'speed' },
              { id: 'problems', label: 'Problems', icon: 'radar' },
              { id: 'quests', label: 'Quests', icon: 'explore' },
              { id: 'solutions', label: 'Solutions', icon: 'science' },
              { id: 'collaborate', label: 'Collaborate', icon: 'hub' },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.id && !isDetailView;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedProblemId(null);
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#4d8eff] text-[#002e6a] font-semibold shadow-sm'
                    : 'text-[#c2c6d6] hover:text-[#dfe2ee] hover:bg-[#1c2028]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Zone: Telemetry Credits & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Credits Counter Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#262a33] border border-[#424754]/40 shadow-[0_0_16px_rgba(78,222,163,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="font-mono text-xs font-semibold text-[#4edea3] tabular-nums">
              {userProfile.credits}
            </span>
            <span className="font-mono text-[10px] text-[#8c909f] uppercase tracking-wider hidden xs:inline">
              PTS
            </span>
          </div>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 rounded-lg flex items-center justify-center text-[#c2c6d6] hover:text-[#dfe2ee] hover:bg-[#1c2028] transition-colors"
              type="button"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#4cd7f6] ring-2 ring-[#0f131c]"></span>
            </button>

            {/* Notification Dropdown Flyout */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 p-3 bg-[#1c2028] border border-[#31353e] rounded-xl shadow-2xl z-50 text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#262a33]">
                  <span className="font-headline font-semibold text-[#dfe2ee]">
                    Live Telemetry Feeds
                  </span>
                  <span className="font-mono text-[10px] text-[#4cd7f6]">Real-Time</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-[#181c24] text-[11px] text-[#c2c6d6]">
                    <span className="text-[#4edea3] font-mono font-medium">+45 PTS:</span> Clean
                    haul verification recorded for Inert Masonry problem.
                  </div>
                  <div className="p-2 rounded-lg bg-[#181c24] text-[11px] text-[#c2c6d6]">
                    <span className="text-[#4cd7f6] font-mono font-medium">New Quest:</span> Food
                    Rescue Safe Harbor SOP squad has 1 seat open.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#424754]/70 shadow-sm shrink-0 bg-[#1c2028] flex items-center justify-center">
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#dfe2ee] leading-tight">
                {userProfile.name}
              </span>
              <span className="font-mono text-[10px] text-[#8c909f] leading-tight">
                {userProfile.handle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
