import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { activeToast } = useApp();

  if (!activeToast) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#1c2028] border border-[#4d8eff]/50 shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex items-center gap-3 animate-bounce-short max-w-sm w-full mx-auto">
      <div className="w-7 h-7 rounded-lg bg-[#00a572]/20 border border-[#00a572]/40 flex items-center justify-center text-[#4edea3] shrink-0">
        <span className="material-symbols-outlined text-[16px]">verified</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-[#dfe2ee] leading-tight truncate">
          {activeToast.message}
        </p>
      </div>

      {activeToast.creditsEarned && (
        <span className="font-mono text-xs font-bold text-[#4edea3] bg-[#00a572]/20 px-2 py-0.5 rounded border border-[#00a572]/30 shrink-0">
          +{activeToast.creditsEarned} PTS
        </span>
      )}
    </div>
  );
};
