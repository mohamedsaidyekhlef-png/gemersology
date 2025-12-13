import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const EDPICalculator = () => {
  const [sens, setSens] = useState(0.35);
  const [dpi, setDpi] = useState(800);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase">Sensitivity</label>
          <input 
            type="number" 
            value={sens}
            onChange={(e) => setSens(parseFloat(e.target.value))}
            className="w-full bg-brand-darker border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase">DPI</label>
          <input 
            type="number" 
            value={dpi}
            onChange={(e) => setDpi(parseFloat(e.target.value))}
            className="w-full bg-brand-darker border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold outline-none"
          />
        </div>
      </div>

      <div className="bg-brand-surface border border-brand-gold/30 rounded-xl p-6 text-center">
        <div className="text-xs text-brand-gold uppercase font-bold mb-2">Effective DPI</div>
        <div className="text-5xl font-mono font-bold text-white tracking-tighter">
          {Math.round(sens * dpi)}
        </div>
        <div className="text-xs text-gray-500 mt-2">Standard eDPI</div>
      </div>
      
      <div className="text-xs text-gray-400 bg-brand-darker p-4 rounded-lg border border-white/5">
        <p className="mb-2"><strong className="text-white">Pro Average:</strong> 200-400 eDPI (Valorant)</p>
        <p><strong className="text-white">High Sens:</strong> 400+ eDPI</p>
      </div>
    </div>
  );
};
