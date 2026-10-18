import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Problem } from '../types';

interface ProblemDetailViewProps {
  problem: Problem;
}

export const ProblemDetailView: React.FC<ProblemDetailViewProps> = ({ problem }) => {
  const {
    confirmEvidenceItem,
    joinBlockerMission,
    toggleBookmarkProblem,
    userProfile,
    setIsAddEvidenceModalOpen,
    showToast,
  } = useApp();

  const isBookmarked = userProfile.bookmarkedProblemIds.includes(problem.id);
  const isJoinedMission = userProfile.joinedSquadIds.includes(problem.id);
  const [confirmedLedger, setConfirmedLedger] = useState(false);

  const handleConfirmLedger = () => {
    if (!confirmedLedger) {
      setConfirmedLedger(true);
      confirmEvidenceItem(problem.id, 'ev-1', 25);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    showToast('Problem dossier link copied to clipboard', undefined, 'info');
  };

  return (
    <div className="flex flex-col w-full pb-32 gap-y-4 max-w-4xl mx-auto animate-fadeIn">
      {/* 1. Metadata & Venture Header Block (Image 1) */}
      <div className="flex flex-col bg-[#1c2028] border border-[#262a33] rounded-xl p-4 sm:p-5 shadow-sm gap-y-3">
        <div className="flex items-center justify-between gap-x-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#31353e] text-[#acedff] border border-[#424754]/40 font-semibold tracking-wider">
              {problem.sector}
            </span>
            <span className="font-mono text-[10px] text-[#8c909f]">·</span>
            <span className="font-mono text-[10px] text-[#c2c6d6]">{problem.date}</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#00a572]/20 border border-[#00a572]/40 text-[#4edea3]">
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span className="font-mono text-[10px] uppercase font-semibold">
              Impact: {problem.impact}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <h2 className="font-headline text-[22px] sm:text-[26px] font-bold text-[#dfe2ee] tracking-tight leading-tight">
            {problem.title}
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#c2c6d6] leading-relaxed">
            {problem.description}
          </p>
        </div>

        {/* Telemetry Badges Strip */}
        <div className="flex items-center gap-2 pt-1 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#181c24] border border-[#262a33]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]"></span>
            <span className="font-mono text-[10px] text-[#c2c6d6]">
              {problem.gateLabel || 'Gate 02/08 Active'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#181c24] border border-[#262a33]">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[14px]">group</span>
            <span className="font-mono text-[10px] text-[#4cd7f6] font-medium">
              {problem.quorumPercentage}% Quorum
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#181c24] border border-[#ffb4ab]/20">
            <span className="material-symbols-outlined text-[#ffb4ab] text-[14px]">
              crisis_alert
            </span>
            <span className="font-mono text-[10px] text-[#ffb4ab] font-medium">
              {problem.systemicBlockersCount} Systemic Blocker
            </span>
          </div>
        </div>
      </div>

      {/* 2. Pipeline Stepper Track (Image 1) */}
      <div className="flex flex-col bg-[#1c2028] border border-[#262a33] rounded-xl p-4 shadow-sm gap-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#8c909f] font-semibold">
            Validation Progression
          </span>
          <span className="font-mono text-[10px] text-[#acedff] font-medium">
            Phase 2: Validation Gate
          </span>
        </div>

        {/* Stepper Scrollable Track */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {/* Step 1: Validated */}
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-lg bg-[#262a33] border border-[#00a572]/40">
            <span className="w-4 h-4 rounded-full bg-[#00a572] text-[#00311f] flex items-center justify-center font-mono text-[10px] font-bold">
              ✓
            </span>
            <span className="font-mono text-[11px] text-[#dfe2ee] font-semibold">
              1 Real Problem
            </span>
          </div>

          <span className="font-mono text-[10px] text-[#424754] shrink-0">→</span>

          {/* Step 2: Current Active */}
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-lg bg-[#4d8eff] text-[#002e6a] shadow-[0_0_16px_rgba(77,142,255,0.35)]">
            <span className="w-4 h-4 rounded-full bg-[#0a0e16] text-[#adc6ff] flex items-center justify-center font-mono text-[10px] font-bold">
              2
            </span>
            <span className="font-mono text-[11px] font-bold">Community Val.</span>
          </div>

          <span className="font-mono text-[10px] text-[#424754] shrink-0">→</span>

          {/* Step 3: Blockers */}
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-lg bg-[#181c24] border border-[#262a33]">
            <span className="w-4 h-4 rounded-full bg-[#1c2028] text-[#8c909f] flex items-center justify-center font-mono text-[10px]">
              3
            </span>
            <span className="font-mono text-[11px] text-[#c2c6d6]">Blockers</span>
          </div>

          <span className="font-mono text-[10px] text-[#424754] shrink-0">→</span>

          {/* Step 4: Proposals */}
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-lg bg-[#181c24] border border-[#262a33] opacity-60">
            <span className="w-4 h-4 rounded-full bg-[#1c2028] text-[#8c909f] flex items-center justify-center font-mono text-[10px]">
              4
            </span>
            <span className="font-mono text-[11px] text-[#8c909f]">Proposals</span>
          </div>

          <span className="font-mono text-[10px] text-[#424754] shrink-0">→</span>

          {/* Step 5: Pilot */}
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-lg bg-[#181c24] border border-[#262a33] opacity-60">
            <span className="w-4 h-4 rounded-full bg-[#1c2028] text-[#8c909f] flex items-center justify-center font-mono text-[10px]">
              5
            </span>
            <span className="font-mono text-[11px] text-[#8c909f]">Pilot</span>
          </div>
        </div>

        {/* Stepper Metric Bar */}
        <div className="flex flex-col gap-y-1.5 pt-1">
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-[#c2c6d6]">
              {problem.confirmationsCount} of 24 Verified Trade Confirmations
            </span>
            <span className="text-[#4cd7f6] font-medium">{problem.quorumPercentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#0a0e16] rounded-full overflow-hidden border border-[#262a33]">
            <div
              className="h-full bg-gradient-to-r from-[#4d8eff] to-[#4cd7f6] rounded-full transition-all duration-700"
              style={{ width: `${problem.quorumPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 3. Key Differentiator: Blocker Diagnosis Section (Image 1) */}
      {problem.blocker && (
        <div className="flex flex-col bg-[#1c2028] border border-[#262a33] rounded-xl p-4 shadow-sm gap-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ffb4ab]"></span>
              <h3 className="font-headline text-[16px] font-bold text-[#dfe2ee]">
                Blocker Diagnosis
              </h3>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#93000a]/30 border border-[#ffb4ab]/30 text-[#ffb4ab] font-medium uppercase">
              {problem.blocker.severity} Severity
            </span>
          </div>

          {/* Unresolved Blocker Focus Card */}
          <div className="flex flex-col bg-[#181c24] border border-[#262a33] rounded-xl p-3.5 sm:p-4 gap-y-3 shadow-inner">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#93000a]/30 border border-[#ffb4ab]/30 flex items-center justify-center shrink-0 text-[#ffb4ab]">
                <span className="material-symbols-outlined text-[18px]">lock_open</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="text-[14px] sm:text-[15px] font-semibold text-[#dfe2ee]">
                  {problem.blocker.title}
                </h4>
                <span className="font-mono text-[10px] text-[#8c909f] mt-0.5">
                  Diagnosed by {problem.blocker.diagnosedBy} · Needs Solution Proposals
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-y-1 bg-[#1c2028] border border-[#262a33] rounded-lg p-3">
              <span className="font-mono text-[10px] uppercase tracking-wide text-[#4cd7f6] font-semibold">
                Identified Root Cause
              </span>
              <p className="text-[12px] sm:text-[13px] text-[#c2c6d6] leading-relaxed">
                {problem.blocker.rootCause}
              </p>
            </div>

            {/* Sub-challenges tags */}
            <div className="flex flex-col gap-y-1.5 pt-1">
              <span className="font-mono text-[10px] text-[#8c909f] uppercase tracking-wider font-semibold">
                Sub-Challenges to Solve
              </span>
              <div className="flex flex-wrap gap-1.5">
                {problem.blocker.subChallenges.map((sc) => (
                  <div
                    key={sc.id}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#262a33] border border-[#424754]/40 text-[#c2c6d6]"
                  >
                    <span className="material-symbols-outlined text-[13px] text-[#adc6ff]">
                      {sc.iconName}
                    </span>
                    <span className="font-mono text-[10px] font-medium">{sc.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Evidence & Community Corroboration (Image 1) */}
      <div className="flex flex-col bg-[#1c2028] border border-[#262a33] rounded-xl p-4 shadow-sm gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">
              verified_user
            </span>
            <h3 className="font-headline text-[16px] font-bold text-[#dfe2ee]">
              Verified Evidence Ledger
            </h3>
          </div>
          <span className="font-mono text-[10px] text-[#8c909f]">
            {problem.evidenceItems.length} Entries
          </span>
        </div>

        {/* Evidence Item 1 (Weigh-scale Receipts) */}
        {problem.evidenceItems[0] && (
          <div className="flex flex-col bg-[#181c24] border border-[#262a33] rounded-xl p-3.5 sm:p-4 gap-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-[18px]">
                  receipt_long
                </span>
                <span className="text-[13px] sm:text-[14px] font-semibold text-[#dfe2ee]">
                  {problem.evidenceItems[0].title}
                </span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#00a572]/20 border border-[#00a572]/40 text-[#4edea3] font-semibold">
                {problem.evidenceItems[0].verifiedBadge}
              </span>
            </div>

            <p className="text-[12px] text-[#c2c6d6] leading-relaxed">
              {problem.evidenceItems[0].description}
            </p>

            {problem.evidenceItems[0].images && (
              <div className="flex items-center gap-2 pt-1">
                {problem.evidenceItems[0].images.map((imgSrc, i) => (
                  <div
                    key={i}
                    className="w-20 h-14 rounded-lg overflow-hidden border border-[#262a33] bg-[#0a0e16] shrink-0"
                  >
                    <img
                      src={imgSrc}
                      alt="Evidence receipt documentation"
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
                <div className="flex items-center justify-center w-16 h-14 bg-[#262a33] border border-[#424754]/40 rounded-lg text-[#c2c6d6] font-mono text-[10px]">
                  {problem.evidenceItems[0].docCountNotice || '+6 docs'}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Evidence Item 2 (Route Survey) */}
        {problem.evidenceItems[1] && (
          <div className="flex flex-col bg-[#181c24] border border-[#262a33] rounded-xl p-3.5 sm:p-4 gap-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">route</span>
                <span className="text-[13px] sm:text-[14px] font-semibold text-[#dfe2ee]">
                  {problem.evidenceItems[1].title}
                </span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#03b5d3]/20 border border-[#03b5d3]/40 text-[#acedff] font-semibold">
                {problem.evidenceItems[1].verifiedBadge}
              </span>
            </div>
            <p className="text-[12px] text-[#c2c6d6] leading-relaxed">
              {problem.evidenceItems[1].description}
            </p>
          </div>
        )}

        {/* Evidence Item 3 (AI Hypothesis Badge) */}
        {problem.evidenceItems[2] && (
          <div className="flex flex-col bg-[#181c24] border border-[#262a33] rounded-xl p-3.5 sm:p-4 gap-y-2 shadow-inner">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#adc6ff] text-[16px]">
                  auto_awesome
                </span>
                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#4d8eff]/20 border border-[#4d8eff]/30 text-[#d8e2ff] font-semibold">
                  AI Synthesis
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#8c909f]">Confidence 88%</span>
            </div>
            <p className="text-[12px] text-[#c2c6d6] leading-relaxed">
              {problem.evidenceItems[2].description}
            </p>
          </div>
        )}

        {/* Corroboration Interactive Trigger (Image 1) */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleConfirmLedger}
            disabled={confirmedLedger}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border transition-all cursor-pointer font-medium text-xs ${
              confirmedLedger
                ? 'bg-[#00a572]/20 border-[#00a572] text-[#4edea3]'
                : 'bg-[#262a33] hover:bg-[#31353e] border-[#424754]/40 text-[#dfe2ee]'
            }`}
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${
                confirmedLedger ? 'text-[#4edea3]' : 'text-[#4edea3]'
              }`}
            >
              {confirmedLedger ? 'check' : 'thumb_up'}
            </span>
            <span>{confirmedLedger ? 'Confirmed (+25 cr added)' : 'Confirm (+25 cr)'}</span>
          </button>

          <button
            onClick={() => setIsAddEvidenceModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#262a33] hover:bg-[#31353e] border border-[#424754]/40 hover:border-[#4cd7f6]/60 transition-all text-[#dfe2ee] font-medium text-xs cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">
              add_circle
            </span>
            <span>Add Evidence</span>
          </button>
        </div>
      </div>

      {/* 5. Active Quests & Competing Proposals Preview (Image 1) */}
      <div className="flex flex-col bg-[#1c2028] border border-[#262a33] rounded-xl p-4 shadow-sm gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">explore</span>
            <h3 className="font-headline text-[16px] font-bold text-[#dfe2ee]">
              Active Quests & Proposals
            </h3>
          </div>
          <span className="font-mono text-[10px] text-[#acedff] font-semibold">
            {problem.proposals.length} Drafts
          </span>
        </div>

        {/* Squad Mission Card */}
        {problem.activeQuests[0] && (
          <div className="flex flex-col bg-[#181c24] border border-[#262a33] rounded-xl p-3.5 sm:p-4 gap-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#4cd7f6] uppercase tracking-wider font-semibold">
                  {problem.activeQuests[0].categoryTag}
                </span>
                <h4 className="text-[13px] sm:text-[14px] font-semibold text-[#dfe2ee] mt-0.5">
                  {problem.activeQuests[0].title}
                </h4>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#00a572]/20 border border-[#00a572]/40 text-[#4edea3] font-mono text-[11px] font-semibold shrink-0">
                +{problem.activeQuests[0].rewardCredits} cr
              </div>
            </div>

            <p className="text-[12px] text-[#c2c6d6] leading-relaxed">
              {problem.activeQuests[0].description}
            </p>

            {/* Squad Capacity */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1.5 overflow-hidden">
                  {problem.activeQuests[0].squadMembers.slice(0, 3).map((m, idx) => (
                    <div
                      key={idx}
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-[#181c24] bg-[#31353e] flex items-center justify-center font-mono text-[9px] font-bold text-[#dfe2ee]"
                    >
                      {m.initials}
                    </div>
                  ))}
                  <div className="inline-flex h-6 w-6 rounded-full bg-[#262a33] items-center justify-center font-mono text-[9px] text-[#c2c6d6] ring-2 ring-[#181c24]">
                    +1
                  </div>
                </div>
                <span className="font-mono text-[10px] text-[#c2c6d6] pl-1">
                  {problem.activeQuests[0].spotsFilled} of {problem.activeQuests[0].spotsTotal} Spots Filled
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#ffb4ab] font-semibold">
                1 Seat Open
              </span>
            </div>
          </div>
        )}

        {/* Proposals Snapshot Strip */}
        <div className="flex flex-col gap-y-2 pt-1">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#8c909f] uppercase px-1 font-semibold">
            <span>Under Peer Review</span>
            <span>Lead Architect</span>
          </div>

          {problem.proposals.map((prop) => (
            <div
              key={prop.id}
              className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-[#181c24] border border-[#262a33] hover:border-[#4d8eff]/30 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[16px] shrink-0">
                  description
                </span>
                <span className="text-[12px] sm:text-[13px] text-[#dfe2ee] font-medium truncate">
                  {prop.title}
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#c2c6d6] shrink-0 ml-2">
                {prop.leadArchitect}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Bottom Sticky Action Quick Bar (Image 1) */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-[#0f131c]/90 backdrop-blur-md border-t border-[#1c2028] z-40 flex items-center gap-2 max-w-xl mx-auto shadow-2xl">
        <button
          onClick={() => toggleBookmarkProblem(problem.id)}
          className={`p-2.5 rounded-lg border transition-colors flex items-center justify-center shrink-0 cursor-pointer ${
            isBookmarked
              ? 'bg-[#4d8eff]/20 border-[#4d8eff] text-[#adc6ff]'
              : 'bg-[#262a33] hover:bg-[#31353e] border-[#424754]/40 text-[#dfe2ee]'
          }`}
          type="button"
          aria-label="Bookmark problem"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
          >
            bookmark
          </span>
        </button>

        <button
          onClick={handleShare}
          className="p-2.5 rounded-lg bg-[#262a33] hover:bg-[#31353e] border border-[#424754]/40 text-[#dfe2ee] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          type="button"
          aria-label="Share problem dossier"
        >
          <span className="material-symbols-outlined text-[20px]">share</span>
        </button>

        <button
          onClick={() => joinBlockerMission(problem.id)}
          className={`flex-1 py-2.5 px-4 rounded-lg font-headline text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-98 ${
            isJoinedMission
              ? 'bg-[#00a572] text-[#00311f]'
              : 'bg-[#4d8eff] hover:bg-[#3b82f6] text-[#002e6a]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
          <span>{isJoinedMission ? 'Mission Enlisted ✓' : 'Join Blocker Mission'}</span>
        </button>
      </div>
    </div>
  );
};
