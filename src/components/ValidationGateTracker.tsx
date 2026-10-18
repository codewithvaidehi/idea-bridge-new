import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ValidationStage } from '../types';

export const ValidationGateTracker: React.FC = () => {
  const { validationStages } = useApp();
  const [selectedStage, setSelectedStage] = useState<ValidationStage | null>(null);

  return (
    <section className="flex flex-col space-y-2">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-[#adc6ff] uppercase tracking-wider font-semibold">
            Validation Gates
          </span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#31353e] text-[#4cd7f6] font-medium border border-[#424754]/30">
            Stage 2/8
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#8c909f]">Gate Chain v2.4</span>
      </div>

      {/* Swipeable Horizontal Gate Track */}
      <div className="w-full overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-2 min-w-max px-1">
          {validationStages.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isActive = stage.status === 'active';

            return (
              <React.Fragment key={stage.id}>
                <button
                  type="button"
                  onClick={() => setSelectedStage(stage)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer text-left border ${
                    isActive
                      ? 'bg-[#1c2028] border-[#4d8eff]/60 shadow-[0_0_16px_rgba(77,142,255,0.25)]'
                      : isCompleted
                      ? 'bg-[#181c24] border-[#00a572]/40 shadow-sm'
                      : 'bg-[#0a0e16]/80 border-[#1c2028] opacity-75 hover:opacity-100'
                  }`}
                >
                  {/* Step Indicator */}
                  {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-[#00a572] flex items-center justify-center text-[#00311f] font-bold shrink-0">
                      <span className="material-symbols-outlined text-[13px] font-bold">check</span>
                    </div>
                  ) : isActive ? (
                    <div className="w-5 h-5 rounded-full bg-[#4d8eff] flex items-center justify-center text-[#002e6a] font-mono font-bold text-[11px] shrink-0">
                      2
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#31353e] flex items-center justify-center text-[#8c909f] font-mono text-[10px] shrink-0">
                      {stage.id}
                    </div>
                  )}

                  {/* Label & Subtitle */}
                  <div className="flex flex-col">
                    <span
                      className={`font-mono text-[11px] font-semibold whitespace-nowrap ${
                        isCompleted
                          ? 'text-[#4edea3]'
                          : isActive
                          ? 'text-[#adc6ff]'
                          : 'text-[#8c909f]'
                      }`}
                    >
                      {stage.shortName}
                    </span>
                    <span
                      className={`font-mono text-[9px] whitespace-nowrap ${
                        isActive
                          ? 'text-[#4cd7f6] animate-pulse font-medium'
                          : isCompleted
                          ? 'text-[#8c909f]'
                          : 'text-[#424754]'
                      }`}
                    >
                      {stage.passedDate || stage.metricLabel || `Gate 0${stage.id}`}
                    </span>
                  </div>
                </button>

                {/* Arrow connector between stages */}
                {idx < validationStages.length - 1 && (
                  <span
                    className={`material-symbols-outlined text-[14px] shrink-0 ${
                      idx === 0
                        ? 'text-[#4edea3]'
                        : idx === 1
                        ? 'text-[#424754]'
                        : 'text-[#424754]/40'
                    }`}
                  >
                    arrow_forward
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Drawer / Info Popover */}
      {selectedStage && (
        <div className="mt-2 p-3 bg-[#181c24] border border-[#262a33] rounded-xl flex items-start justify-between gap-3 animate-fadeIn">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#adc6ff] font-bold">
                Gate 0{selectedStage.id}: {selectedStage.name}
              </span>
              <span
                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                  selectedStage.status === 'completed'
                    ? 'bg-[#00a572]/20 text-[#4edea3]'
                    : selectedStage.status === 'active'
                    ? 'bg-[#4d8eff]/20 text-[#adc6ff]'
                    : 'bg-[#31353e] text-[#8c909f]'
                }`}
              >
                {selectedStage.status}
              </span>
            </div>
            <p className="text-xs text-[#c2c6d6] leading-relaxed">
              {selectedStage.description}
            </p>
          </div>
          <button
            onClick={() => setSelectedStage(null)}
            className="text-[#8c909f] hover:text-[#dfe2ee] p-1"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </section>
  );
};
