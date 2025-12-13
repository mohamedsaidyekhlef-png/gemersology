import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Crosshair, TrendingUp, ChevronRight, Sparkles, Gamepad2, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { GAMES } from '../../lib/mockData';

export const Hero = () => {
  const featuredGames = Object.entries(GAMES).slice(0, 5).map(([key, data]) => ({
    id: key,
    label: data.label
  }));

  const [activeGame, setActiveGame] = useState(featuredGames[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/track/${activeGame}/${searchQuery}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[85vh] flex flex-col justify-center">
      
      {/* Static Background Elements (Restored) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-purple/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default"
          >
            <Sparkles className="w-3 h-3 text-brand-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
              AI-Powered <span className="text-brand-gold">Performance Engine</span>
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[1.1]"
          >
            TRACK. IMPROVE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-purple animate-gradient-x">
              DOMINATE.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            The world's most advanced gaming analytics platform. 
            Get real-time stats, AI coaching, and meta insights for your favorite competitive games.
          </motion.p>

          {/* THE SEARCH BOX - Creative & Hooking */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-3xl mx-auto"
          >
            {/* Outer Glow */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-brand-gold via-brand-purple to-brand-gold rounded-2xl blur opacity-25 transition-opacity duration-500 ${isFocused ? 'opacity-50' : ''}`} />

            <div className="relative bg-[#0F0518] border border-white/10 rounded-xl p-2 shadow-2xl flex flex-col md:flex-row items-center gap-2">
              
              {/* Game Selector Dropdown (Visual) */}
              <div className="relative w-full md:w-auto z-20">
                <select 
                  value={activeGame}
                  onChange={(e) => setActiveGame(e.target.value)}
                  className="w-full md:w-48 h-14 appearance-none bg-white/5 hover:bg-white/10 text-white font-bold pl-12 pr-8 rounded-lg border border-transparent focus:border-brand-gold/50 focus:ring-0 cursor-pointer transition-all outline-none"
                >
                  {featuredGames.map(g => <option key={g.id} value={g.id} className="bg-brand-dark text-gray-300">{g.label}</option>)}
                </select>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gold">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              </div>

              {/* Input Field */}
              <div className="flex-1 w-full relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-purple-light transition-colors">
                  <Search className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  placeholder={`Enter ${GAMES[activeGame as keyof typeof GAMES]?.label || 'Player'} Username...`}
                  className="w-full h-14 bg-transparent text-white pl-12 pr-4 text-lg font-medium placeholder-gray-600 border-none focus:ring-0 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </div>

              {/* Action Button */}
              <Button 
                size="lg" 
                className="w-full md:w-auto h-14 px-8 rounded-lg shadow-glow hover:shadow-glow-hover transition-all"
                onClick={handleSearch}
              >
                TRACK
              </Button>
            </div>

            {/* Floating "Live" Badge */}
            <div className="absolute -top-3 right-4 bg-brand-dark border border-brand-gold/30 text-brand-gold text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              LIVE API
            </div>

          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500"
          >
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <TrendingUp className="w-4 h-4 text-brand-gold" /> Trending: <span className="text-white underline decoration-brand-gold/50">Mongraal</span>
            </span>
            <span className="hidden md:inline text-gray-700">•</span>
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Crosshair className="w-4 h-4 text-brand-purple-light" /> Pro Sensitivities
            </span>
            <span className="hidden md:inline text-gray-700">•</span>
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Target className="w-4 h-4 text-green-400" /> Meta Loadouts
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
