import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AddEvidenceModal: React.FC = () => {
  const { isAddEvidenceModalOpen, setIsAddEvidenceModalOpen, addEvidenceToProblem, selectedProblemId } =
    useApp();

  const [title, setTitle] = useState('');
  const [evidenceType, setEvidenceType] = useState<'receipt' | 'survey' | 'document'>('receipt');
  const [description, setDescription] = useState('');

  if (!isAddEvidenceModalOpen || !selectedProblemId) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addEvidenceToProblem(selectedProblemId, {
      title,
      type: evidenceType,
      verifiedBadge: 'Pending Trade Audit',
      description,
      confirmCredits: 25,
      docCountNotice: '+1 document',
    });

    setTitle('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0e16]/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#1c2028] border border-[#262a33] rounded-2xl max-w-md w-full p-5 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#262a33] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#4cd7f6]">
              add_circle
            </span>
            <h3 className="font-headline text-[15px] font-bold text-[#dfe2ee]">
              Add Field Evidence Entry
            </h3>
          </div>
          <button
            onClick={() => setIsAddEvidenceModalOpen(false)}
            className="text-[#8c909f] hover:text-[#dfe2ee] p-1 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block font-mono text-[10px] uppercase text-[#c2c6d6] font-semibold mb-1">
              Evidence Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'receipt', label: 'Weigh Receipt' },
                { id: 'survey', label: 'Trade Survey' },
                { id: 'document', label: 'Permit / Log' },
              ].map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setEvidenceType(t.id as any)}
                  className={`py-1.5 px-2 rounded-lg border text-[11px] font-mono transition-colors ${
                    evidenceType === t.id
                      ? 'bg-[#4d8eff]/20 border-[#4d8eff] text-[#adc6ff] font-semibold'
                      : 'bg-[#181c24] border-[#262a33] text-[#8c909f]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase text-[#c2c6d6] font-semibold mb-1">
              Evidence Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. County Transfer Station Tonnage Penalty Bill"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#181c24] border border-[#262a33] focus:border-[#4d8eff] rounded-lg px-3 py-2 text-xs text-[#dfe2ee] placeholder-[#8c909f]/60 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase text-[#c2c6d6] font-semibold mb-1">
              Field Findings & Documentation Summary
            </label>
            <textarea
              required
              rows={3}
              placeholder="Details on tonnage, dollar surcharges, location, or trade contractor testimonials..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#181c24] border border-[#262a33] focus:border-[#4d8eff] rounded-lg px-3 py-2 text-xs text-[#dfe2ee] placeholder-[#8c909f]/60 focus:outline-none"
            />
          </div>

          <div className="p-3 rounded-lg bg-[#181c24] border border-dashed border-[#424754] text-center">
            <span className="material-symbols-outlined text-[20px] text-[#4cd7f6] mb-1">
              upload_file
            </span>
            <p className="text-[11px] text-[#c2c6d6]">
              Attach Weigh Ticket, Invoice Photo or Audio File
            </p>
            <span className="font-mono text-[9px] text-[#8c909f]">
              Auto-redacts contractor personal identifiable information
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#262a33]">
            <button
              type="button"
              onClick={() => setIsAddEvidenceModalOpen(false)}
              className="px-3 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-[#c2c6d6] text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#4d8eff] hover:bg-[#3b82f6] text-[#002e6a] font-headline font-bold text-xs flex items-center gap-1 shadow-md cursor-pointer"
            >
              <span>Submit (+50 cr)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
