import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ValidationGateTracker } from './ValidationGateTracker';
import { Problem } from '../types';

export const DashboardView: React.FC = () => {
  const {
    problems,
    setSelectedProblemId,
    confirmProblemExperience,
    acceptQuest,
    triageFilter,
    setTriageFilter,
    showToast,
  } = useApp();

  const [confirmedUrgent, setConfirmedUrgent] = useState(false);

  // Filter problems based on triage selector
  const filteredProblems = problems.filter((prob) => {
    if (triageFilter.includes('Needs Evidence')) {
      return prob.evidenceCount <= 2 || prob.urgencyStatus === 'NEEDS FIELD CORROBORATION';
    }
    if (triageFilter.includes('Blockers Diagnosed')) {
      return prob.systemicBlockersCount > 0;
    }
    if (triageFilter.includes('Seeking Squad')) {
      return prob.activeQuests.some((q) => q.spotsFilled < q.spotsTotal);
    }
    return true; // All problems
  });

  const handleConfirmUrgentBanner = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirmedUrgent) {
      setConfirmedUrgent(true);
      confirmProblemExperience('problem-food-rescue', 45);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 space-y-4">
      {/* Top Telemetry Status Strip (Image 3) */}
      <div className="flex items-center justify-between px-1 pt-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
          </span>
          <span className="font-mono text-[10px] text-[#c2c6d6] uppercase tracking-wider">
            Telemetry Stream Active
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[#c2c6d6] font-mono text-[10px] bg-[#262a33] px-2 py-0.5 rounded border border-[#424754]/30">
          <span className="material-symbols-outlined text-[13px] text-[#4cd7f6]">database</span>
          <span>42 TRACKED</span>
        </div>
      </div>

      {/* Validation Pipeline Gate Tracker (Image 3) */}
      <ValidationGateTracker />

      {/* Urgent Action Banner: Field Corroboration (Image 3) */}
      <section className="rounded-xl bg-[#181c24] border border-[#ffb4ab]/20 p-4 shadow-md overflow-hidden relative">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#93000a]/30 border border-[#ffb4ab]/30 text-[#ffb4ab]">
            <span className="material-symbols-outlined text-[14px]">crisis_alert</span>
            <span className="font-mono text-[10px] font-semibold tracking-wide uppercase">
              Needs Field Corroboration
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#c2c6d6] bg-[#31353e] px-2 py-0.5 rounded border border-[#424754]/30">
            High Severity
          </span>
        </div>

        <h2 className="font-headline text-[16px] text-[#dfe2ee] font-semibold tracking-tight mb-1.5">
          University Dining Hall Nightly Cooked Food Dumping
        </h2>

        <p className="text-[13px] text-[#c2c6d6] line-clamp-2 mb-3 leading-relaxed">
          Over 180 lbs of warm proteins discarded post-dinner service across 3 campus quads due to liability panic, bypassing regional recovery shelters.
        </p>

        {/* Evidence Counter Bar */}
        <div className="flex items-center justify-between pt-1 pb-3 border-b border-[#262a33]">
          <div className="flex items-center gap-3 text-[#c2c6d6] font-mono text-[11px]">
            <span className="flex items-center gap-1 text-[#4cd7f6]">
              <span className="material-symbols-outlined text-[14px]">groups</span>
              <span className="font-semibold tabular-nums">{confirmedUrgent ? 65 : 64}</span> confirmations
            </span>
            <span className="text-[#424754]">·</span>
            <span className="flex items-center gap-1 text-[#adc6ff]">
              <span className="material-symbols-outlined text-[14px]">attach_file</span>
              <span className="font-semibold tabular-nums">3</span> field evidence files
            </span>
          </div>
        </div>

        {/* Action & Micro-CTA */}
        <div className="flex items-center justify-between gap-2 pt-3">
          <span className="font-mono text-[11px] text-[#4edea3] flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">verified</span>
            <span>+45 Credibility Pts</span>
          </span>

          <button
            onClick={handleConfirmUrgentBanner}
            disabled={confirmedUrgent}
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-headline text-xs font-semibold shadow-sm transition-all cursor-pointer ${
              confirmedUrgent
                ? 'bg-[#00a572] text-[#00311f]'
                : 'bg-[#4d8eff] hover:bg-[#3b82f6] text-[#002e6a] active:scale-95'
            }`}
            type="button"
          >
            {confirmedUrgent ? (
              <>
                <span className="material-symbols-outlined text-[16px]">check</span>
                <span>Corroborated!</span>
              </>
            ) : (
              <>
                <span>Confirm Experience</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Interactive Filter Matrix (Image 3) */}
      <section className="flex flex-col space-y-1.5 pt-1">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-[10px] text-[#c2c6d6] uppercase tracking-wider font-semibold">
            System Triage Filter
          </span>
          <span className="font-mono text-[10px] text-[#4cd7f6] font-medium">12 Urgent</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            'All Problems (42)',
            'Needs Evidence (12)',
            'Blockers Diagnosed (8)',
            'Seeking Squad (5)',
          ].map((filterLabel) => {
            const isSelected = triageFilter === filterLabel;
            return (
              <button
                key={filterLabel}
                onClick={() => setTriageFilter(filterLabel)}
                className={`px-3 py-1.5 rounded-full font-mono text-[11px] whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#4d8eff] text-[#002e6a] font-semibold border-transparent shadow-sm'
                    : 'bg-[#262a33] text-[#c2c6d6] hover:text-[#dfe2ee] hover:bg-[#31353e] border-[#424754]/40'
                }`}
                type="button"
              >
                {filterLabel}
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Problem Workspaces (Image 3) */}
      <section className="flex flex-col space-y-3 pt-1">
        <div className="flex items-center justify-between px-1">
          <span className="font-headline text-[16px] text-[#dfe2ee] font-bold">
            Active Problem Workspaces
          </span>
          <span className="font-mono text-[10px] text-[#adc6ff]">Sort: Corroboration Rate</span>
        </div>

        {filteredProblems.map((prob) => {
          const isMasonry = prob.id === 'problem-inert-masonry';
          const isFoodRescue = prob.id === 'problem-food-rescue';

          return (
            <div
              key={prob.id}
              className="rounded-xl bg-[#1c2028] border border-[#262a33] p-4 shadow-md flex flex-col space-y-3 relative hover:border-[#4d8eff]/40 transition-colors"
            >
              {/* Top Meta Badge Row */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#31353e] text-[#c2c6d6] font-mono text-[10px] uppercase border border-[#424754]/30">
                    {prob.sector}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#4cd7f6]/10 text-[#4cd7f6] font-mono text-[10px] border border-[#4cd7f6]/20">
                    <span className="w-1 h-1 rounded-full bg-[#4cd7f6]"></span>
                    Gathering Evidence
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#8c909f]">{prob.date}</span>
              </div>

              {/* Problem Image Snapshot with empirical pass badge */}
              {prob.imageUrl && (
                <div className="relative w-full h-36 rounded-lg overflow-hidden bg-[#0a0e16] border border-[#262a33]">
                  <img
                    src={prob.imageUrl}
                    alt={prob.title}
                    className="w-full h-full object-cover opacity-85 hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c2028] via-[#1c2028]/25 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#0a0e16]/90 backdrop-blur-sm text-[#4edea3] font-mono text-[10px] border border-[#4edea3]/30 shadow-sm">
                      <span className="material-symbols-outlined text-[12px]">verified_user</span>
                      <span>AI Empirical Pass {prob.empiricalPassRate || 94}%</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Title & Rigorous Friction Summary */}
              <div>
                <h3 className="font-headline text-[15px] sm:text-[16px] text-[#dfe2ee] font-semibold mb-1 leading-snug">
                  {prob.title}
                </h3>
                <p className="text-[12px] sm:text-[13px] text-[#c2c6d6] leading-relaxed line-clamp-3">
                  {prob.description}
                </p>
              </div>

              {/* Segmented Metrics Row */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#262a33] text-[#dfe2ee] font-mono text-[10px] border border-[#424754]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]"></span>
                  <span>{prob.confirmationsCount} Confirmations</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#262a33] text-[#dfe2ee] font-mono text-[10px] border border-[#424754]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#adc6ff]"></span>
                  <span>{prob.evidenceCount} Evidences</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#00a572]/20 border border-[#00a572]/30 text-[#4edea3] font-mono text-[10px] font-semibold">
                  <span className="material-symbols-outlined text-[12px]">lock_open</span>
                  <span>{prob.systemicBlockersCount} Blocker Diagnosed</span>
                </div>
              </div>

              {/* Diagnostic Friction Detail Box */}
              <div className="p-3 rounded-lg bg-[#181c24] border border-[#262a33] text-[#c2c6d6]">
                <div className="flex items-center gap-1 text-[#adc6ff] font-mono text-[10px] uppercase font-semibold mb-0.5">
                  <span className="material-symbols-outlined text-[13px]">psychology</span>
                  <span>Root Friction Unlocked</span>
                </div>
                <p className="text-[11px] sm:text-[12px] text-[#dfe2ee] leading-relaxed">
                  {prob.rootFrictionUnlocked}
                </p>
              </div>

              {/* Card Action Strip */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex -space-x-1.5 overflow-hidden">
                  {prob.contributors.map((c, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[9px] font-bold ring-2 ring-[#1c2028] ${c.bgClass}`}
                    >
                      {c.initials}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProblemId(prob.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-[#4cd7f6] font-headline text-xs font-semibold border border-[#4cd7f6]/30 hover:border-[#4cd7f6] transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <span>Details</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* Second Problem Card (Community Solution Path #4 / University Food Rescue SOP) */}
        <div className="rounded-xl bg-[#1c2028] border border-[#262a33] p-4 shadow-md flex flex-col space-y-3 relative hover:border-[#4d8eff]/40 transition-colors">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-[#31353e] text-[#c2c6d6] font-mono text-[10px] uppercase border border-[#424754]/30">
                Regulatory & Access
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#4d8eff]/10 text-[#adc6ff] font-mono text-[10px] border border-[#4d8eff]/20">
                Priority: Moderate
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#4edea3] flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[13px]">monetization_on</span>
              <span>+75 Credits</span>
            </span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#4cd7f6] mb-1">
              <span className="material-symbols-outlined text-[13px]">lightbulb</span>
              <span>Community Solution Path #4</span>
            </div>
            <h3 className="font-headline text-[15px] sm:text-[16px] text-[#dfe2ee] font-semibold mb-1">
              University Food Rescue Legal Framework & Pilot SOP
            </h3>
            <p className="text-[12px] sm:text-[13px] text-[#c2c6d6] leading-relaxed">
              Synthesize Bill Emerson Good Samaritan Act safe-harbor precedents and formulate a 1-page digital compliance sign-off for dining managers.
            </p>
          </div>

          {/* Metrics and Squad status */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#c2c6d6]">
              <span className="flex items-center gap-1 text-[#dfe2ee]">
                <span className="material-symbols-outlined text-[14px] text-[#4cd7f6]">group</span>
                <span>3 in Squad</span>
              </span>
              <span>·</span>
              <span className="text-[#adc6ff]">Need: Legal Researcher</span>
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center justify-end pt-1">
            <button
              onClick={() => {
                showToast('Joined University Food Rescue squad as Legal Researcher contributor!', 75, 'success');
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#262a33] hover:bg-[#31353e] text-[#adc6ff] hover:text-[#dfe2ee] font-headline text-xs font-semibold border border-[#4d8eff]/30 active:scale-98 transition-all cursor-pointer"
              type="button"
            >
              <span>Contribute / Join Squad</span>
              <span className="material-symbols-outlined text-[16px]">person_add</span>
            </button>
          </div>
        </div>
      </section>

      {/* Recommended Quests & Micro-Actions Carousel (Image 3) */}
      <section className="flex flex-col space-y-2 pt-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[16px]">explore</span>
            <span className="font-headline text-[16px] text-[#dfe2ee] font-bold">
              Active Quests & Bounties
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#c2c6d6]">2 Available</span>
        </div>

        {/* Mini Quest Card 1 */}
        <div className="p-4 rounded-xl bg-[#181c24] border border-[#262a33] shadow-sm flex flex-col space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#00a572]/20 border border-[#00a572]/30 text-[#4edea3] font-mono text-[10px] font-semibold">
              <span className="material-symbols-outlined text-[12px]">bolt</span>
              <span>Feasibility Task</span>
            </span>
            <span className="font-mono text-[11px] text-[#4edea3] font-semibold tabular-nums">
              +120 Credits
            </span>
          </div>

          <div>
            <h4 className="font-headline text-[14px] text-[#dfe2ee] font-semibold">
              Validate Transport Cost Assumptions
            </h4>
            <p className="text-[12px] text-[#c2c6d6] leading-relaxed mt-0.5">
              Call 2 commercial dry-bulk haulers within metro zone to verify per-ton hauling fees for crushed rock under 15 miles.
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#8c909f]">
              <span className="material-symbols-outlined text-[13px] text-[#4cd7f6]">groups</span>
              <span>5 peers in active squad</span>
            </div>
            <button
              onClick={() => acceptQuest('quest-transport-rates', 120)}
              className="px-3 py-1.5 rounded-lg bg-[#31353e] hover:bg-[#4d8eff] hover:text-[#002e6a] text-[#4cd7f6] font-headline text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-sm active:scale-95"
              type="button"
            >
              <span>Accept Quest</span>
              <span className="material-symbols-outlined text-[13px]">north_east</span>
            </button>
          </div>
        </div>

        {/* Second Quest Quick Bite */}
        <div className="p-4 rounded-xl bg-[#181c24] border border-[#262a33] shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#31353e] border border-[#424754]/40 flex items-center justify-center text-[#adc6ff] shrink-0">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline text-[13px] text-[#dfe2ee] font-semibold truncate">
                Corroborate Lab Spec #12
              </span>
              <span className="font-mono text-[10px] text-[#8c909f] truncate">
                Confirm moisture absorption rates
              </span>
            </div>
          </div>
          <button
            onClick={() => acceptQuest('quest-cold-chain', 60)}
            className="px-2.5 py-1 rounded bg-[#262a33] hover:bg-[#31353e] font-mono text-[11px] text-[#4edea3] shrink-0 font-semibold border border-[#00a572]/30 hover:border-[#4edea3] transition-colors cursor-pointer"
            type="button"
          >
            +60 PTS
          </button>
        </div>
      </section>

      {/* Evidence Legitimacy Legend Footer (Image 3) */}
      <section className="p-2.5 rounded-xl bg-[#0a0e16]/80 border border-[#1c2028] text-center flex items-center justify-around font-mono text-[10px] text-[#8c909f]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]"></span>
          <span>AI Hypothesis</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#adc6ff]"></span>
          <span>Community Evidence</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
          <span>Verified Impact</span>
        </div>
      </section>
    </div>
  );
};
