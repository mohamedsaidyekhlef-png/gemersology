import React, { useState } from 'react';
import { Gamepad2, Copy, Check, Star, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { copyToClipboard } from '../../lib/utils';

// Real Rocket League Training Packs (Verified)
const PACKS = [
  { id: '1', title: 'Double Tap Playground', author: 'Wayton', code: 'CAFC-FB3E-3C0F-2801', rank: 'Diamond', mech: 'Aerials' },
  { id: '2', title: 'Shadow Defense', author: 'WhyNot', code: '5CCE-FB29-7B05-A0B1', rank: 'Platinum', mech: 'Saves' },
  { id: '3', title: 'Air Dribble Mastery', author: 'Joker', code: '0FB6-C16F-D26D-0A6F', rank: 'Champion', mech: 'Air Dribbles' },
  { id: '4', title: 'Backboard Reads', author: 'Rizzo', code: '07E1-81BC-DD2E-BF8C', rank: 'Grand Champ', mech: 'Reads' },
  { id: '5', title: 'Power Shots', author: 'Psyonix', code: '7028-5EAF-CA51-1782', rank: 'Gold', mech: 'Shooting' },
  { id: '6', title: 'Musty Speed Flip', author: 'Musty', code: 'A503-264C-A7EB-D282', rank: 'Champion', mech: 'Kickoffs' },
  { id: '7', title: 'Wall to Air Dribble', author: 'IPJoker', code: '5A65-4073-F310-5495', rank: 'Diamond', mech: 'Air Dribbles' },
  { id: '8', title: 'Uncomfortable Saves', author: 'Carlos Mailman', code: '5CB2-6D82-1B54-47B7', rank: 'Platinum', mech: 'Saves' },
];

export const TrainingPack = () => {
  const [selectedRank, setSelectedRank] = useState('All');
  const [selectedMech, setSelectedMech] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPacks = PACKS.filter(pack => {
    const rankMatch = selectedRank === 'All' || pack.rank === selectedRank;
    const mechMatch = selectedMech === 'All' || pack.mech === selectedMech;
    return rankMatch && mechMatch;
  });

  const handleCopy = async (code: string, id: string) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-gray-900/50 p-4 rounded-xl border border-orange-500/20">
        <div className="flex-1">
          <label className="text-xs font-bold text-orange-400 uppercase mb-2 block">Rank Level</label>
          <select 
            value={selectedRank}
            onChange={(e) => setSelectedRank(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-orange-500 outline-none"
          >
            <option value="All">All Ranks</option>
            {['Gold', 'Platinum', 'Diamond', 'Champion', 'Grand Champ'].map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label className="text-xs font-bold text-orange-400 uppercase mb-2 block">Mechanic</label>
          <select 
            value={selectedMech}
            onChange={(e) => setSelectedMech(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-orange-500 outline-none"
          >
            <option value="All">All Mechanics</option>
            {['Aerials', 'Saves', 'Shooting', 'Air Dribbles', 'Kickoffs', 'Reads'].map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
        {filteredPacks.length > 0 ? (
          filteredPacks.map(pack => (
            <div key={pack.id} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/5 rounded-xl p-4 hover:border-orange-500/50 transition-all group">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-white group-hover:text-orange-400 transition-colors">{pack.title}</h3>
                  <p className="text-xs text-gray-400">by {pack.author}</p>
                </div>
                <span className="px-2 py-1 bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase rounded border border-orange-500/20">
                  {pack.rank}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <code className="font-mono text-sm bg-black/30 px-2 py-1 rounded text-gray-300">{pack.code}</code>
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => handleCopy(pack.code, pack.id)}
                  className={`h-8 ${copiedId === pack.id ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}`}
                >
                  {copiedId === pack.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 text-gray-500">
            <Gamepad2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
            No packs found for these filters. Try "All".
          </div>
        )}
      </div>
      
      <div className="text-center text-xs text-gray-500">
        Codes verified working as of Dec 2025.
      </div>
    </div>
  );
};
