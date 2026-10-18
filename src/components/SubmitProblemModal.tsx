import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const SubmitProblemModal: React.FC = () => {
  const { isSubmitModalOpen, setIsSubmitModalOpen, submitNewProblem } = useApp();

  const [title, setTitle] = useState('');
  const [sector, setSector] = useState('Civic & Infrastructure');
  const [description, setDescription] = useState('');
  const [rootFriction, setRootFriction] = useState('');
  const [impact, setImpact] = useState<'High' | 'Moderate' | 'Critical'>('High');

  if (!isSubmitModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    submitNewProblem({
      title,
      sector,
      description,
      rootFriction:
        rootFriction.trim() ||
        'Operational minimum scale or regulatory clearance threshold locks out small distributed actors.',
      impact,
    });

    setTitle('');
    setDescription('');
    setRootFriction('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0e16]/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#1c2028] border border-[#262a33] rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#262a33] mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4d8eff]/20 border border-[#4d8eff]/40 flex items-center justify-center text-[#adc6ff]">
              <span className="material-symbols-outlined text-[18px]">add_task</span>
            </div>
            <div>
              <h3 className="font-headline text-[16px] font-bold text-[#dfe2ee]">
                Submit Real-World Problem
              </h3>
              <p className="font-mono text-[10px] text-[#4cd7f6]">
                Gate 01 Intake · Earn +100 Credits
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSubmitModalOpen(false)}
            className="text-[#8c909f] hover:text-[#dfe2ee] p-1 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sector selection */}
          <div>
            <label className="block font-mono text-[11px] uppercase text-[#c2c6d6] font-semibold mb-1.5">
              Industry Sector
            </label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full bg-[#181c24] border border-[#262a33] focus:border-[#4d8eff] rounded-lg px-3 py-2 text-xs text-[#dfe2ee] focus:outline-none transition-colors"
            >
              <option value="Civic & Infrastructure">Civic & Infrastructure</option>
              <option value="Regulatory & Access">Regulatory & Access</option>
              <option value="Marine & Materials">Marine & Materials</option>
              <option value="HVAC & Clean Heat">HVAC & Clean Heat</option>
              <option value="Agri-Food Logistics">Agri-Food Logistics</option>
              <option value="Industrial Energy">Industrial Energy</option>
            </select>
          </div>

          {/* Problem Title */}
          <div>
            <label className="block font-mono text-[11px] uppercase text-[#c2c6d6] font-semibold mb-1.5">
              Systemic Problem Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Commercial Grease Trap Waste Surcharges for Independent Diners"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#181c24] border border-[#262a33] focus:border-[#4d8eff] rounded-lg px-3 py-2 text-xs text-[#dfe2ee] placeholder-[#8c909f]/60 focus:outline-none transition-colors"
            />
          </div>

          {/* Real-world Description */}
          <div>
            <label className="block font-mono text-[11px] uppercase text-[#c2c6d6] font-semibold mb-1.5">
              Observed Field Friction (What is happening on the ground?)
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe the exact friction, who experiences it, and the empirical waste or loss occurring..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#181c24] border border-[#262a33] focus:border-[#4d8eff] rounded-lg px-3 py-2 text-xs text-[#dfe2ee] placeholder-[#8c909f]/60 focus:outline-none transition-colors"
            />
          </div>

          {/* Root Cause Blocker Hypothesis */}
          <div>
            <label className="block font-mono text-[11px] uppercase text-[#c2c6d6] font-semibold mb-1.5">
              Unresolved Blocker Hypothesis (Why has no one solved this yet?)
            </label>
            <input
              type="text"
              placeholder="e.g. Municipal hauling licenses mandate $5M general liability policies..."
              value={rootFriction}
              onChange={(e) => setRootFriction(e.target.value)}
              className="w-full bg-[#181c24] border border-[#262a33] focus:border-[#4d8eff] rounded-lg px-3 py-2 text-xs text-[#dfe2ee] placeholder-[#8c909f]/60 focus:outline-none transition-colors"
            />
          </div>

          {/* Impact Level */}
          <div>
            <label className="block font-mono text-[11px] uppercase text-[#c2c6d6] font-semibold mb-1.5">
              Severity / Systemic Impact
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Moderate', 'High', 'Critical'] as const).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setImpact(lvl)}
                  className={`py-2 px-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                    impact === lvl
                      ? lvl === 'Critical'
                        ? 'bg-[#93000a]/40 border-[#ffb4ab] text-[#ffb4ab]'
                        : lvl === 'High'
                        ? 'bg-[#00a572]/30 border-[#4edea3] text-[#4edea3]'
                        : 'bg-[#4d8eff]/30 border-[#adc6ff] text-[#adc6ff]'
                      : 'bg-[#181c24] border-[#262a33] text-[#8c909f]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#262a33]">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-[#c2c6d6] text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#4d8eff] hover:bg-[#3b82f6] text-[#002e6a] font-headline font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
              <span>Submit & Earn +100 cr</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
