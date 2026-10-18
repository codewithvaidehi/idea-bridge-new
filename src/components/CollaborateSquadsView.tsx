import React from 'react';
import { useApp } from '../context/AppContext';

export const CollaborateSquadsView: React.FC = () => {
  const { problems, userProfile, joinBlockerMission, showToast } = useApp();

  return (
    <div className="flex flex-col w-full pb-28 space-y-4">
      {/* Header */}
      <div className="bg-[#1c2028] border border-[#262a33] p-4 rounded-xl flex items-center justify-between">
        <div>
          <h2 className="font-headline text-[18px] font-bold text-[#dfe2ee]">
            Sprint Squads & Collaborative Taskforces
          </h2>
          <p className="font-mono text-[11px] text-[#8c909f]">
            Multidisciplinary syndicates solving systemic market failures together
          </p>
        </div>
        <span className="font-mono text-xs text-[#4edea3] bg-[#00a572]/20 px-3 py-1.5 rounded-lg border border-[#00a572]/30 hidden sm:inline">
          Stage 6 Squad Assembly
        </span>
      </div>

      {/* Squad Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {problems.map((prob) => {
          const quest = prob.activeQuests[0];
          if (!quest) return null;
          const isJoined = userProfile.joinedSquadIds.includes(prob.id);

          return (
            <div
              key={prob.id}
              className="bg-[#1c2028] border border-[#262a33] rounded-xl p-4 sm:p-5 shadow-sm hover:border-[#4d8eff]/40 transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#31353e] text-[#4cd7f6] font-semibold">
                    {prob.sector} Taskforce
                  </span>
                  <span className="font-mono text-[11px] text-[#4edea3] font-bold">
                    +{quest.rewardCredits} Credits Pool
                  </span>
                </div>

                <div>
                  <h3 className="font-headline text-[15px] font-bold text-[#dfe2ee] mb-1">
                    {quest.title}
                  </h3>
                  <p className="text-xs text-[#c2c6d6] leading-relaxed">
                    {quest.description}
                  </p>
                </div>

                {/* Squad Members Stack */}
                <div className="p-3 rounded-lg bg-[#181c24] border border-[#262a33] space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#8c909f]">
                    <span>Active Contributors</span>
                    <span className="text-[#4cd7f6]">
                      {quest.spotsFilled} / {quest.spotsTotal} Enlisted
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {quest.squadMembers.map((member, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-xs py-1 px-2 rounded bg-[#1c2028]"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#31353e] flex items-center justify-center font-mono text-[9px] font-bold text-[#dfe2ee]">
                            {member.initials}
                          </div>
                          <span className="text-[#dfe2ee] font-medium">{member.name}</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#8c909f]">
                          {member.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-[#262a33] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#ffb4ab]">
                  {quest.spotsTotal - quest.spotsFilled > 0
                    ? `${quest.spotsTotal - quest.spotsFilled} Open Seats Available`
                    : 'Sprint In Progress'}
                </span>

                <button
                  type="button"
                  onClick={() => joinBlockerMission(prob.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-headline text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                    isJoined
                      ? 'bg-[#00a572] text-[#00311f]'
                      : 'bg-[#4d8eff] hover:bg-[#3b82f6] text-[#002e6a]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {isJoined ? 'verified' : 'group_add'}
                  </span>
                  <span>{isJoined ? 'Enlisted in Squad ✓' : 'Enlist in Squad'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
