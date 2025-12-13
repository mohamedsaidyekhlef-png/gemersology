import React, { useState, useEffect } from 'react';
import { ArrowRightLeft } from 'lucide-react';

// Precise Yaw Values for 1:1 conversion
// Formula: (360 / (DPI * Sens * Yaw)) * 2.54 = cm/360
const GAMES = [
  { id: 'valorant', name: 'Valorant', yaw: 0.07 },
  { id: 'apex', name: 'Apex Legends', yaw: 0.022 },
  { id: 'cs2', name: 'CS2 / Source', yaw: 0.022 },
  { id: 'overwatch', name: 'Overwatch 2', yaw: 0.0066 },
  { id: 'fortnite', name: 'Fortnite (Slider)', yaw: 0.5555 }, // Approx for slider % (varies by config, using standard slider logic)
  { id: 'cod', name: 'Call of Duty', yaw: 0.022 },
  { id: 'r6', name: 'Rainbow Six Siege', yaw: 0.00572 }, // Default multiplier
];

export const SensConverter = () => {
  const [sourceGame, setSourceGame] = useState('valorant');
  const [targetGame, setTargetGame] = useState('fortnite');
  const [sourceSens, setSourceSens] = useState<number | string>(0.35);
  const [dpi, setDpi] = useState<number | string>(800);
  
  const [result, setResult] = useState({ sens: 0, cm360: 0 });

  useEffect(() => {
    const sSens = parseFloat(sourceSens.toString()) || 0;
    const sDpi = parseFloat(dpi.toString()) || 800;
    
    const sourceYaw = GAMES.find(g => g.id === sourceGame)?.yaw || 0.022;
    const targetYaw = GAMES.find(g => g.id === targetGame)?.yaw || 0.022;

    // 1. Calculate True Rotation (Degrees per count)
    // Total Degrees = Sens * DPI * Yaw (Not exactly, Yaw is deg per dot)
    // Correct logic:
    // cm/360 = 360 / (Sens * DPI * Yaw) * 2.54
    
    // To convert Sens A to Sens B:
    // SensA * YawA = SensB * YawB
    // SensB = (SensA * YawA) / YawB
    
    const targetSens = (sSens * sourceYaw) / targetYaw;
    
    // Calculate cm/360
    // Avoid divide by zero
    const cm = (sSens > 0 && sDpi > 0) ? (360 * 2.54) / (sSens * sDpi * sourceYaw) : 0;

    setResult({
      sens: parseFloat(targetSens.toFixed(4)),
      cm360: parseFloat(cm.toFixed(2))
    });

  }, [sourceGame, targetGame, sourceSens, dpi]);

  return (
    <div className="space-y-8 font-mono">
      <div className="bg-brand-surface border border-white/10 rounded-xl p-6 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Source */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-blue-400 uppercase tracking-wider">Input (Source)</label>
            <select 
              value={sourceGame}
              onChange={(e) => setSourceGame(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
            >
              {GAMES.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
            <div className="relative">
              <input 
                type="number" 
                value={sourceSens}
                onChange={(e) => setSourceSens(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none text-xl font-bold"
                placeholder="0.00"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">SENS</span>
            </div>
          </div>

          {/* Target */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-green-400 uppercase tracking-wider">Output (Target)</label>
            <select 
              value={targetGame}
              onChange={(e) => setTargetGame(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-green-500 outline-none"
            >
              {GAMES.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
            <div className="w-full bg-green-500/10 border border-green-500/30 rounded-lg p-3 flex items-center justify-between h-[54px]">
              <span className="text-2xl font-bold text-green-400">{result.sens}</span>
              <span className="text-xs text-green-500/50 font-bold">CONVERTED</span>
            </div>
          </div>
        </div>

        {/* DPI Input */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-bold text-gray-500 uppercase">Mouse DPI</label>
            <span className="text-xs text-gray-500">Required for cm/360 calculation</span>
          </div>
          <div className="flex gap-2">
            {[400, 800, 1600, 3200].map(val => (
              <button 
                key={val}
                onClick={() => setDpi(val)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${dpi === val ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-gray-400 hover:bg-white/5'}`}
              >
                {val}
              </button>
            ))}
            <input 
              type="number" 
              value={dpi}
              onChange={(e) => setDpi(e.target.value)}
              className="w-20 bg-black border border-white/10 rounded-lg px-2 text-center text-white focus:border-white outline-none"
              placeholder="Custom"
            />
          </div>
        </div>
      </div>

      {/* Results Footer */}
      <div className="flex items-center justify-between bg-black/50 rounded-xl p-4 border border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
            <ArrowRightLeft className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase">360° Distance</div>
            <div className="text-xl font-bold text-white">{result.cm360} <span className="text-sm text-gray-500 font-normal">cm</span></div>
          </div>
        </div>
        <div className="text-right">
           <div className="text-xs text-gray-500 uppercase">eDPI (Source)</div>
           <div className="text-xl font-bold text-white">{Math.round(parseFloat(sourceSens.toString()) * parseFloat(dpi.toString()))}</div>
        </div>
      </div>
    </div>
  );
};
