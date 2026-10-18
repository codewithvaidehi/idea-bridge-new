import React from 'react';
import { useApp } from '../context/AppContext';

export const QuestsView: React.FC = () => {
  const { problems, acceptQuest, userProfile, setSelectedProblemId } = useApp();

  const allQuests = problems.flatMap((p) =>
    p.activeQuests.map((q) => ({
      ...q,
      problemTitle: p.title,
      sector: p.sector,
    }))
  );

  return (
    <div className="flex flex-col w-full pb-28 space-y-4">
      {/* Header */}
      <div className="bg-[#1c2028] border border-[#262a33] p-4 rounded-xl flex items-center justify-between">
        <div>
          <h2 className="font-headline text-[18px] font-bold text-[#dfe2ee]">
            Validation Quests & Bounties
          </h2>
          <p className="font-mono text-[11px] text-[#8c909f]">
            Solve targeted empirical blocker sub-challenges to unlock venture milestones
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[#4edea3] bg-[#00a572]/20 px-3 py-1.5 rounded-lg border border-[#00a572]/30">
          <span className="material-symbols-outlined text-[16px]">monetization_on</span>
          <span>Earn Credit Bounties</span>
        </div>
      </div>

      {/* Quest Cards */}
      <div className="space-y-3">
        {allQuests.map((quest) => {
          const isClaimed = userProfile.claimedQuestIds.includes(quest.id);

          return (
            <div
              key={quest.id}
              className="bg-[#1c2028] border border-[#262a33] rounded-xl p-4 sm:p-5 shadow-sm hover:border-[#4d8eff]/40 transition-colors flex flex-col space-y-3"
            >
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#31353e] text-[#4cd7f6] font-semibold">
                      {quest.categoryTag}
                    </span>
                    <span className="font-mono text-[10px] text-[#8c909f]">·</span>
                    <span className="font-mono text-[10px] text-[#8c909f]">{quest.sector}</span>
                  </div>
                  <h3 className="font-headline text-[15px] sm:text-[16px] font-bold text-[#dfe2ee]">
                    {quest.title}
                  </h3>
                </div>

                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#00a572]/20 border border-[#00a572]/40 text-[#4edea3] font-mono text-xs font-bold">
                  +{quest.rewardCredits} Credits
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-[#c2c6d6] leading-relaxed">
                {quest.description}
              </p>

              {/* Linked Problem */}
              <div
                onClick={() => setSelectedProblemId(quest.problemId)}
                className="p-2.5 rounded-lg bg-[#181c24] border border-[#262a33] flex items-center justify-between text-xs cursor-pointer hover:border-[#4d8eff]/30"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[16px] text-[#adc6ff]">
                    crisis_alert
                  </span>
                  <span className="text-[#dfe2ee] font-medium truncate">
                    For: {quest.problemTitle}
                  </span>
                </div>
                <span className="text-[#4cd7f6] font-mono text-[11px] shrink-0">Inspect →</span>
              </div>

              {/* Squad & Action */}
              <div className="flex items-center justify-between pt-1 border-t border-[#262a33]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[#8c909f]">
                    Squad: {quest.spotsFilled} of {quest.spotsTotal} filled
                  </span>
                  {quest.spotsFilled === quest.spotsTotal ? (
                    <span className="font-mono text-[10px] text-[#8c909f]">(Full)</span>
                  ) : (
                    <span className="font-mono text-[10px] text-[#ffb4ab]">
                      ({quest.spotsTotal - quest.spotsFilled} seat open)
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  disabled={isClaimed}
                  onClick={() => acceptQuest(quest.id, quest.rewardCredits)}
                  className={`px-3 py-1.5 rounded-lg font-headline text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isClaimed
                      ? 'bg-[#00a572]/20 text-[#4edea3] border border-[#00a572]/40'
                      : 'bg-[#4d8eff] hover:bg-[#3b82f6] text-[#002e6a] shadow-sm'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {isClaimed ? 'check_circle' : 'north_east'}
                  </span>
                  <span>{isClaimed ? 'Active Bounty' : 'Accept Quest'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
