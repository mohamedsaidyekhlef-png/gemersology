import React, { useState } from 'react';
import { Map, Share2, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

const MAPS = [
  { id: 'kings-canyon', name: "King's Canyon", image: 'https://images.unsplash.com/photo-1548502669-5f9953f33669?auto=format&fit=crop&q=80&w=800&h=600' },
  { id: 'worlds-edge', name: "World's Edge", image: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&q=80&w=800&h=600' },
  { id: 'olympus', name: "Olympus", image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800&h=600' },
];

export const LootMatrix = () => {
  const [selectedMap, setSelectedMap] = useState(MAPS[0]);
  const [generating, setGenerating] = useState(false);
  const [route, setRoute] = useState<number | null>(null);

  const handleGenerate = () => {
    setGenerating(true);
    setRoute(null);
    setTimeout(() => {
      setGenerating(false);
      setRoute(Math.random());
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {MAPS.map(map => (
          <button
            key={map.id}
            onClick={() => { setSelectedMap(map); setRoute(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${selectedMap.id === map.id ? 'bg-brand-gold text-brand-dark' : 'bg-brand-darker border border-white/10 text-gray-400'}`}
          >
            {map.name}
          </button>
        ))}
      </div>

      <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10 group">
        <img 
          src={selectedMap.image} 
          alt={selectedMap.name} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
        />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        {/* Generated Route Overlay */}
        {route && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path
              d={`M 100 100 Q 200 50 300 150 T 500 200 T 700 100`}
              fill="none"
              stroke="#FFD700"
              strokeWidth="4"
              strokeDasharray="10 5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.circle cx="100" cy="100" r="6" fill="#FFD700" initial={{ scale: 0 }} animate={{ scale: 1 }} />
            <motion.circle cx="700" cy="100" r="6" fill="#FF0000" initial={{ scale: 0 }} animate={{ scale: 1 }} delay={2} />
            
            {/* Loot Markers */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
               <circle cx="300" cy="150" r="15" fill="rgba(157, 0, 255, 0.5)" />
               <text x="300" y="150" textAnchor="middle" dy="4" fill="white" fontSize="10" fontWeight="bold">T3</text>
            </motion.g>
          </svg>
        )}

        {generating && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
              <span className="text-brand-gold font-mono text-sm animate-pulse">CALCULATING OPTIMAL PATH...</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button onClick={handleGenerate} className="flex-1" icon={<Map className="w-4 h-4" />}>
          Generate Loot Route
        </Button>
        <Button variant="secondary" icon={<Share2 className="w-4 h-4" />} disabled={!route}>
          Share
        </Button>
      </div>
    </div>
  );
};
