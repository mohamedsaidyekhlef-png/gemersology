import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Gamepad2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GAMES } from '../lib/mockData';

export const TrackPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState('fortnite');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/track/${selectedGame}/${searchQuery}`);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Stats</h1>
          <p className="text-gray-400 mb-12 text-lg">Search for any player across supported titles to view detailed AI-powered analytics.</p>

          {/* Redesigned Search Box for Track Page */}
          <div className="relative bg-brand-surface/50 backdrop-blur border border-white/10 rounded-2xl p-3 md:p-6 shadow-2xl mb-16">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              {/* Custom Select */}
              <div className="relative md:w-1/3">
                <select 
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="w-full h-14 appearance-none bg-brand-darker text-white px-4 py-3 rounded-xl border border-white/10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none cursor-pointer transition-all font-medium"
                >
                  {Object.entries(GAMES).map(([key, data]) => (
                    <option key={key} value={key}>{data.label}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <Gamepad2 className="w-5 h-5" />
                </div>
              </div>

              {/* Search Input */}
              <div className="flex-1 relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-gold transition-colors">
                  <Search className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  placeholder="Enter Player Name / Riot ID..." 
                  className="w-full h-14 bg-brand-darker text-white pl-12 pr-4 py-3 rounded-xl border border-white/10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none placeholder-gray-600 transition-all font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button type="submit" className="md:w-32 h-14" icon={<ArrowRight className="w-4 h-4" />}>Search</Button>
            </form>
          </div>

          {/* Feature Grid - Mobile Friendly */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-brand-surface/30 p-6 rounded-xl border border-white/5 hover:border-brand-gold/30 transition-colors group">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 transition-colors">
                <Users className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-bold mb-2 text-lg">Compare Pros</h3>
              <p className="text-sm text-gray-400 leading-relaxed">See how your stats stack up against the world's best players in real-time.</p>
            </div>
            <div className="bg-brand-surface/30 p-6 rounded-xl border border-white/5 hover:border-brand-purple/30 transition-colors group">
              <div className="w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-purple/20 transition-colors">
                <Gamepad2 className="w-6 h-6 text-brand-purple-light" />
              </div>
              <h3 className="font-bold mb-2 text-lg">Multi-Game Support</h3>
              <p className="text-sm text-gray-400 leading-relaxed">One profile for all your games. Unified tracking across platforms.</p>
            </div>
            <div className="bg-brand-surface/30 p-6 rounded-xl border border-white/5 hover:border-green-500/30 transition-colors group">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <Search className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-bold mb-2 text-lg">Deep Insights</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Go beyond K/D. Analyze positioning, utility usage, and more.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
