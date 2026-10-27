import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

export const DemoDisclaimerBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#16361E] text-white text-xs py-2 px-4 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#C49A45] shrink-0" />
          <span className="text-white/90">
            <strong className="font-semibold text-white">Demonstration Prototype:</strong> This interface represents a comprehensive frontend design for Orbit Seeds (Pvt.) Ltd. (Vehari, Punjab). Seed catalog entries, lot numbers, and grower workflows utilize simulated records.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#F7F6F0]/80 hover:text-white p-1 transition-colors"
          aria-label="Dismiss disclaimer banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
