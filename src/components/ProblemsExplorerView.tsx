import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ProblemsExplorerView: React.FC = () => {
  const { problems, setSelectedProblemId, setIsSubmitModalOpen } = useApp();
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const sectors = ['All', 'Civic & Infrastructure', 'Regulatory & Access', 'Marine & Materials'];

  const filtered = problems.filter((p) => {
    const matchSector = selectedSector === 'All' || p.sector === selectedSector;
    const matchSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchSector && matchSearch;
  });

  return (
    <div className="flex flex-col w-full pb-28 space-y-4">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1c2028] border border-[#262a33] p-4 rounded-xl">
        <div>
          <h2 className="font-headline text-[18px] font-bold text-[#dfe2ee]">
            Systemic Problems Explorer
          </h2>
          <p className="font-mono text-[11px] text-[#8c909f]">
            Verified operational frictions across the 8-stage venture chain
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#4d8eff] hover:bg-[#3b82f6] text-[#002e6a] font-headline text-xs font-semibold shadow-sm cursor-pointer self-start sm:self-auto"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Log Real Problem</span>
        </button>
      </div>

      {/* Search & Sector Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#8c909f] text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search problems, root causes, or trade sectors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#181c24] border border-[#262a33] focus:border-[#4d8eff] rounded-xl text-xs text-[#dfe2ee] placeholder-[#8c909f]/60 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 rounded-lg font-mono text-[11px] whitespace-nowrap transition-colors cursor-pointer border ${
                selectedSector === sec
                  ? 'bg-[#4d8eff] text-[#002e6a] font-semibold border-transparent'
                  : 'bg-[#262a33] text-[#c2c6d6] hover:text-[#dfe2ee] border-[#424754]/30'
              }`}
              type="button"
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Problem Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((prob) => (
          <div
            key={prob.id}
            onClick={() => setSelectedProblemId(prob.id)}
            className="rounded-xl bg-[#1c2028] border border-[#262a33] p-4 shadow-sm hover:border-[#4d8eff]/50 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#31353e] text-[#acedff] font-semibold">
                  {prob.sector}
                </span>
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 rounded font-semibold ${
                    prob.impact === 'Critical'
                      ? 'bg-[#93000a]/30 text-[#ffb4ab]'
                      : 'bg-[#00a572]/20 text-[#4edea3]'
                  }`}
                >
                  {prob.impact} Impact
                </span>
              </div>

              <h3 className="font-headline text-[15px] font-bold text-[#dfe2ee] group-hover:text-[#4cd7f6] transition-colors leading-snug">
                {prob.title}
              </h3>

              <p className="text-xs text-[#c2c6d6] line-clamp-3 leading-relaxed">
                {prob.description}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#262a33]">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#4cd7f6]">{prob.gateLabel}</span>
                <span className="text-[#4edea3]">{prob.confirmationsCount} Confirmations</span>
              </div>

              <div className="w-full h-1 bg-[#0a0e16] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4cd7f6] rounded-full"
                  style={{ width: `${prob.quorumPercentage}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-[10px] text-[#8c909f]">
                  {prob.evidenceCount} verified evidence items
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-[#adc6ff] font-semibold group-hover:translate-x-1 transition-transform">
                  <span>View Dossier</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
