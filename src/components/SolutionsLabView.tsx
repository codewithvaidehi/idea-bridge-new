import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const SolutionsLabView: React.FC = () => {
  const { problems, setSelectedProblemId, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Peer Review' | 'Pilot Ready'>(
    'All'
  );

  const allProposals = problems.flatMap((p) =>
    p.proposals.map((prop) => ({
      ...prop,
      problemTitle: p.title,
      sector: p.sector,
    }))
  );

  const filteredProposals = allProposals.filter((p) => {
    if (selectedCategory === 'Peer Review') return p.status === 'Under Peer Review';
    if (selectedCategory === 'Pilot Ready') return p.status === 'Pilot Ready';
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-28 space-y-4">
      {/* Header */}
      <div className="bg-[#1c2028] border border-[#262a33] p-4 rounded-xl flex items-center justify-between">
        <div>
          <h2 className="font-headline text-[18px] font-bold text-[#dfe2ee]">
            Solutions & Feasibility Lab
          </h2>
          <p className="font-mono text-[11px] text-[#8c909f]">
            Peer-reviewed architectural blueprints and commercial pilot SOPs
          </p>
        </div>
        <span className="font-mono text-xs text-[#4cd7f6] bg-[#03b5d3]/10 px-3 py-1.5 rounded-lg border border-[#03b5d3]/30 hidden sm:inline">
          Stage 4 & 5 Feasibility Gate
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['All', 'Peer Review', 'Pilot Ready'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold border transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#4d8eff] text-[#002e6a] border-transparent shadow-sm'
                : 'bg-[#262a33] text-[#c2c6d6] hover:text-[#dfe2ee] border-[#424754]/30'
            }`}
            type="button"
          >
            {cat} ({allProposals.filter((p) => cat === 'All' || (cat === 'Peer Review' ? p.status === 'Under Peer Review' : p.status === 'Pilot Ready')).length})
          </button>
        ))}
      </div>

      {/* Proposals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProposals.map((prop) => (
          <div
            key={prop.id}
            className="bg-[#1c2028] border border-[#262a33] rounded-xl p-4 sm:p-5 shadow-sm hover:border-[#4d8eff]/40 transition-colors flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#31353e] text-[#acedff] font-semibold">
                  {prop.sector}
                </span>
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 rounded font-semibold ${
                    prop.status === 'Pilot Ready'
                      ? 'bg-[#00a572]/20 border border-[#00a572]/40 text-[#4edea3]'
                      : 'bg-[#4d8eff]/20 border border-[#4d8eff]/30 text-[#adc6ff]'
                  }`}
                >
                  {prop.status}
                </span>
              </div>

              <h3 className="font-headline text-[15px] font-bold text-[#dfe2ee] leading-snug">
                {prop.title}
              </h3>

              <p className="text-xs text-[#c2c6d6] leading-relaxed">
                {prop.description ||
                  'Systemic operational solution designed to dismantle institutional blockers.'}
              </p>

              {/* Feasibility Metric Bar */}
              {prop.feasibilityScore && (
                <div className="p-2.5 rounded-lg bg-[#181c24] border border-[#262a33] space-y-1">
                  <div className="flex justify-between items-center font-mono text-[10px]">
                    <span className="text-[#8c909f]">Business Feasibility Index</span>
                    <span className="text-[#4cd7f6] font-bold">{prop.feasibilityScore}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0a0e16] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#4d8eff] to-[#4edea3] rounded-full"
                      style={{ width: `${prop.feasibilityScore}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[#262a33] flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-[#8c909f]">
                Architect: <span className="text-[#dfe2ee] font-medium">{prop.leadArchitect}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProblemId(prop.problemId)}
                  className="px-2.5 py-1 rounded bg-[#262a33] hover:bg-[#31353e] text-[#adc6ff] text-xs font-semibold cursor-pointer border border-[#424754]/40"
                >
                  Dossier
                </button>
                <button
                  type="button"
                  onClick={() => showToast(`Review protocol opened for "${prop.title}"`, 10, 'info')}
                  className="px-3 py-1 rounded bg-[#4d8eff] hover:bg-[#3b82f6] text-[#002e6a] text-xs font-bold cursor-pointer shadow-sm"
                >
                  Peer Review
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
