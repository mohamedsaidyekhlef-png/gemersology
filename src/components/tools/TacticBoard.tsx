import React, { useState } from 'react';
import { MousePointer2, Eye, Shield, Crosshair } from 'lucide-react';

export const TacticBoard = () => {
  const [markers, setMarkers] = useState<{x: number, y: number, type: string}[]>([]);
  const [selectedTool, setSelectedTool] = useState('smoke');

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMarkers([...markers, { x, y, type: selectedTool }]);
  };

  const TOOLS = [
    { id: 'smoke', icon: Shield, color: 'text-gray-400', bg: 'bg-gray-500' },
    { id: 'flash', icon: Eye, color: 'text-yellow-400', bg: 'bg-yellow-500' },
    { id: 'peek', icon: Crosshair, color: 'text-red-400', bg: 'bg-red-500' },
    { id: 'move', icon: MousePointer2, color: 'text-blue-400', bg: 'bg-blue-500' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4">
        {TOOLS.map(tool => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`p-3 rounded-lg border transition-all ${selectedTool === tool.id ? 'bg-white/10 border-brand-gold scale-110' : 'bg-transparent border-white/10 hover:bg-white/5'}`}
          >
            <tool.icon className={`w-5 h-5 ${tool.color}`} />
          </button>
        ))}
        <button onClick={() => setMarkers([])} className="px-4 py-2 text-xs text-red-400 hover:text-red-300">Clear</button>
      </div>

      <div 
        className="aspect-video bg-gray-900 rounded-xl relative overflow-hidden cursor-crosshair border border-white/10"
        onClick={handleMapClick}
      >
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800&h=450" 
          alt="Tactical Map" 
          className="w-full h-full object-cover opacity-50"
        />
        
        {/* Markers */}
        {markers.map((m, i) => {
          const tool = TOOLS.find(t => t.id === m.type);
          return (
            <div 
              key={i}
              className={`absolute w-6 h-6 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-lg ${tool?.bg}`}
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
            >
              {tool && <tool.icon className="w-3 h-3 text-white" />}
            </div>
          );
        })}
      </div>
      
      <div className="text-center text-xs text-gray-500">
        Click on map to place marker. Drag to adjust (Pro feature).
      </div>
    </div>
  );
};
