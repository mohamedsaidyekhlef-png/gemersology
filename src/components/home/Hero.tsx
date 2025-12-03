import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Crosshair, TrendingUp, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { GAMES } from '../../lib/mockData';

export const Hero = () => {
  // Get first 8 games for the tabs to keep it clean, or all if needed
  const featuredGames = Object.entries(GAMES).slice(0, 8).map(([key, data]) => ({
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
    <section className="relative pt-28 pb-16 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
              <Sparkles className="w-3 h-3" />
              AI-Powered Analytics 2.0
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Track. Improve. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-purple animate-gradient-x">Dominate.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              The professional grade tracker for Fortnite, Valorant, and more. Get real-time stats and AI coaching in one click.
            </p>
          </motion.div>

          {/* Search Component - Command Center Style */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative max-w-3xl mx-auto px-2 md:px-0"
          >
            {/* Glowing Border Effect */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-brand-gold via-brand-purple to-brand-gold rounded-2xl blur opacity-30 transition duration-1000 ${isFocused ? 'opacity-70' : 'opacity-30'}`} />
            
            <div className="relative bg-brand-surface/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 shadow-2xl">
              
              {/* Game Tabs - Scrollable on Mobile */}
              <div className="flex gap-2 overflow-x-auto pb-4 md:pb-4 no-scrollbar mask-linear-fade scroll-smooth">
                {featuredGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => setActiveGame(game.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 border ${
                      activeGame === game.id 
                        ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-glow font-bold' 
                        : 'bg-brand-darker/50 text-gray-400 border-transparent hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {game.label}
                  </button>
                ))}
                <button 
                  onClick={() => navigate('/track')}
                  className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap text-brand-gold hover:bg-brand-gold/10 transition-all flex-shrink-0 border border-brand-gold/20"
                >
                  + View All
                </button>
              </div>

              {/* Input Area */}
              <div className={`relative flex flex-col md:flex-row gap-2 bg-brand-darker rounded-xl p-2 border transition-colors duration-300 ${isFocused ? 'border-brand-gold/50' : 'border-white/10'}`}>
                <div className="flex-1 flex items-center pl-3 md:pl-4 h-12 md:h-14">
                  <Search className={`w-5 h-5 transition-colors ${isFocused ? 'text-brand-gold' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 h-full text-base md:text-lg font-medium px-3 md:px-4"
                    placeholder={`Search ${featuredGames.find(g => g.id === activeGame)?.label} Player...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </div>
                <Button 
                  size="lg" 
                  className="w-full md:w-auto rounded-lg shadow-none h-12 md:h-auto text-base" 
                  onClick={handleSearch}
                  icon={<ChevronRight className="w-4 h-4" />}
                >
                  Track
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats / Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-gray-400 text-sm font-mono"
          >
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <Crosshair className="w-4 h-4 text-brand-gold" />
              <span>15,204,992 Players Tracked</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <TrendingUp className="w-4 h-4 text-brand-purple" />
              <span>12 Supported Games</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
