import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crosshair, MousePointer2, Map, Gamepad2, 
  Shirt, Calculator, Target, X, Sparkles, ArrowRight, Share2 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/utils/SEO';
import { EmbedModal } from '../components/tools/EmbedModal';

// Tool Components
import { SensConverter } from '../components/tools/SensConverter';
import { CrosshairGenerator } from '../components/tools/CrosshairGenerator';
import { LootMatrix } from '../components/tools/LootMatrix';
import { TrainingPack } from '../components/tools/TrainingPack';
import { SkinCombo } from '../components/tools/SkinCombo';
import { TacticBoard } from '../components/tools/TacticBoard';
import { EDPICalculator } from '../components/tools/EDPICalculator';

const TOOLS = [
  {
    id: 'sens-converter',
    name: 'Sens Converter AI',
    desc: 'Convert sensitivity perfectly between Fortnite, Valorant, Apex & more.',
    icon: MousePointer2,
    color: 'text-blue-400',
    component: SensConverter,
    stats: '90k/mo searches'
  },
  {
    id: 'crosshair-gen',
    name: 'Crosshair Generator',
    desc: 'Design pro-level crosshairs with AI suggestions and instant copy codes.',
    icon: Crosshair,
    color: 'text-green-400',
    component: CrosshairGenerator,
    stats: '110k/mo searches'
  },
  {
    id: 'loot-matrix',
    name: 'Apex Loot Matrix',
    desc: 'Live map scraping for optimal drop routes and crafting rotations.',
    icon: Map,
    color: 'text-red-400',
    component: LootMatrix,
    stats: '60k/mo searches'
  },
  {
    id: 'training-pack',
    name: 'RL Training AI',
    desc: 'Generate custom Rocket League training packs based on your rank.',
    icon: Gamepad2,
    color: 'text-orange-400',
    component: TrainingPack,
    stats: '75k/mo searches'
  },
  {
    id: 'skin-combo',
    name: 'Skin Combo AI',
    desc: 'Find the perfect backbling and pickaxe match for any Fortnite skin.',
    icon: Shirt,
    color: 'text-purple-400',
    component: SkinCombo,
    stats: '120k/mo searches'
  },
  {
    id: 'tactic-board',
    name: 'Tac-Board AI',
    desc: 'Interactive strategy board for Valorant lineups and team plays.',
    icon: Target,
    color: 'text-yellow-400',
    component: TacticBoard,
    stats: '45k/mo searches'
  },
  {
    id: 'edpi-calc',
    name: 'eDPI Calculator',
    desc: 'Universal effective DPI calculator with hardware correction.',
    icon: Calculator,
    color: 'text-white',
    component: EDPICalculator,
    stats: '150k/mo searches'
  }
];

export const ToolsPage = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [embedModalOpen, setEmbedModalOpen] = useState(false);

  const ActiveComponent = activeTool ? TOOLS.find(t => t.id === activeTool)?.component : null;
  const activeToolData = TOOLS.find(t => t.id === activeTool);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark relative overflow-hidden">
      <SEO 
        title="Free AI Gaming Tools | Crosshair Gen, Sens Converter & More"
        description="Access 7 free professional gaming tools including Valorant Crosshair Generator, Fortnite Sens Converter, and Apex Loot Matrix. Powered by AI."
        keywords="valorant crosshair generator, fortnite sensitivity converter, apex legends loot map, rocket league training packs, gaming tools"
        canonical="/tools"
      />

      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3 h-3" /> AI Powered Suite
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            The Gamer's <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-purple">Swiss Army Knife</span>
          </h1>
          <p className="text-xl text-gray-400">
            7 professional-grade tools to optimize your settings, strategy, and style. Powered by real-time data.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveTool(tool.id)}
              className="group bg-brand-surface/50 backdrop-blur border border-white/5 rounded-2xl p-6 cursor-pointer hover:border-brand-gold/30 hover:bg-brand-surface transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-brand-gold -rotate-45 group-hover:rotate-0 transition-transform" />
              </div>
              
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${tool.color}`}>
                <tool.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">{tool.desc}</p>
              
              <div className="flex items-center gap-2 text-xs font-mono text-gray-600 group-hover:text-brand-gold/70 transition-colors">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Updated
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tool Modal / Overlay */}
      <AnimatePresence>
        {activeTool && activeToolData && ActiveComponent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTool(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-brand-dark border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-brand-dark/95 backdrop-blur z-20">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${activeToolData.color}`}>
                    <activeToolData.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{activeToolData.name}</h2>
                    <p className="text-xs text-gray-400">AI Powered Tool v2.4</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    icon={<Share2 className="w-4 h-4" />}
                    onClick={() => setEmbedModalOpen(true)}
                    className="hidden md:flex"
                  >
                    Embed Tool
                  </Button>
                  <button 
                    onClick={() => setActiveTool(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Tool Content */}
              <div className="p-6 md:p-8">
                <ActiveComponent />
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-white/10 bg-brand-surface/30 text-center text-xs text-gray-500 flex justify-between items-center px-8">
                <span>Powered by Gamersology AI Engine</span>
                <span className="flex items-center gap-2">
                  Data Sources: 
                  <a href="https://developer.riotgames.com/" target="_blank" rel="dofollow" className="text-gray-400 hover:text-brand-gold">Riot API</a> • 
                  <a href="https://fortnite-api.com/" target="_blank" rel="dofollow" className="text-gray-400 hover:text-brand-gold">Epic API</a>
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Embed Modal */}
      {activeToolData && (
        <EmbedModal 
          isOpen={embedModalOpen} 
          onClose={() => setEmbedModalOpen(false)} 
          toolName={activeToolData.name}
          toolSlug={activeToolData.id}
        />
      )}
    </div>
  );
};
