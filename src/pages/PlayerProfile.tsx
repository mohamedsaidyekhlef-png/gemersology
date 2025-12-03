import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Crosshair, Target, Clock, TrendingUp, Share2, AlertCircle, CheckCircle2, XCircle, BrainCircuit, Goal, Skull } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { generatePlayerStats, PlayerStats } from '../lib/mockData';
import { PerformanceChart } from '../components/charts/PerformanceChart';
import { RadarChart } from '../components/charts/RadarChart';

export const PlayerProfile = () => {
  const { game, player } = useParams();
  const navigate = useNavigate();
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate API delay
    const timer = setTimeout(() => {
      if (game && player) {
        setStats(generatePlayerStats(game, player));
      }
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [game, player]);

  const handleAnalyzeClick = () => {
    navigate(`/track/${game}/${player}/analysis`);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="text-brand-gold font-mono animate-pulse">RETRIEVING PROFILE DATA...</p>
        </div>
      </div>
    );
  }

  if (!stats) return <div>Player not found</div>;

  // Dynamic Labels based on Game Type
  const isRocketLeague = stats.game === 'Rocket League';
  const isPokemon = stats.game === 'Pokémon Unite';
  
  const kdaLabel = isRocketLeague ? 'Goals/Saves' : isPokemon ? 'KOs/Assists' : 'K/D Ratio';
  const kdaValue = isRocketLeague ? `${stats.kdRatio} G/M` : stats.kdRatio;
  const damageLabel = isRocketLeague ? 'Score' : 'Damage';

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Header / Banner */}
      <div className="bg-brand-surface/80 backdrop-blur-md border-b border-brand-purple/20 pb-8 pt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-gold to-brand-purple p-1 shadow-glow">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${stats.username}`} 
                  alt="Avatar" 
                  className="w-full h-full rounded-xl bg-brand-dark"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-4xl font-bold text-white">{stats.username}</h1>
                  <span className="px-2 py-1 rounded bg-white/10 text-xs font-mono text-gray-300 uppercase">{stats.game}</span>
                </div>
                <p className="text-brand-gold font-mono text-lg flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> {stats.rank}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <Button variant="outline" icon={<Share2 className="w-4 h-4" />}>Share</Button>
              <Button 
                icon={<BrainCircuit className="w-4 h-4" />} 
                className="shadow-glow animate-pulse hover:animate-none"
                onClick={handleAnalyzeClick}
              >
                Full AI Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Main Stats */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: kdaLabel, value: kdaValue, icon: isRocketLeague ? Goal : Crosshair, color: 'text-brand-gold' },
              { label: 'Win Rate', value: `${stats.winRate}%`, icon: Trophy, color: 'text-brand-purple-light' },
              { label: isRocketLeague ? 'Shot %' : 'Headshot %', value: `${stats.headshotPct}%`, icon: Target, color: 'text-red-400' },
              { label: 'Matches', value: stats.matchesPlayed.toLocaleString(), icon: Clock, color: 'text-green-400' },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-brand-surface/50 backdrop-blur border border-white/5 p-6 rounded-xl hover:border-brand-gold/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold font-mono">{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Deep Dive Analysis Section (New) */}
          <div className="grid md:grid-cols-2 gap-6">
             {/* Strengths & Weaknesses */}
             <div className="bg-brand-surface/50 backdrop-blur border border-white/5 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-brand-gold" />
                  Combat Analysis
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {stats.strengths.map(str => (
                        <span key={str} className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {str}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Weaknesses</h4>
                    <div className="flex flex-wrap gap-2">
                      {stats.weaknesses.map(weak => (
                        <span key={weak} className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded border border-red-500/20 flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> {weak}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
             </div>

             {/* Playstyle Narrative */}
             <div className="bg-brand-surface/50 backdrop-blur border border-white/5 rounded-xl p-6 flex flex-col">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-brand-purple-light" />
                  Playstyle Archetype
                </h3>
                <div className="flex-1">
                   <div className="inline-block px-3 py-1 rounded-full bg-brand-purple/20 text-brand-purple-light text-sm font-bold mb-3 border border-brand-purple/30">
                     {stats.playStyleTags[0]}
                   </div>
                   <p className="text-gray-400 text-sm leading-relaxed">
                     {stats.playStyle}
                   </p>
                   <div className="mt-4 pt-4 border-t border-white/5">
                     <p className="text-xs text-gray-500">
                       AI Confidence: <span className="text-brand-gold">94%</span>
                     </p>
                   </div>
                </div>
             </div>
          </div>

          {/* Rank Progression */}
          <div className="bg-brand-surface/50 backdrop-blur border border-white/5 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-gold" />
              Rank Rating (Last 7 Days)
            </h3>
            <div className="h-64 w-full">
              <PerformanceChart data={stats.chartData} />
            </div>
          </div>

          {/* Match History */}
          <div className="bg-brand-surface/50 backdrop-blur border border-white/5 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-lg font-bold">Recent Matches</h3>
              <span className="text-xs text-gray-500 font-mono">LAST 20 MATCHES</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-white/5 text-gray-400 font-mono text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3">Result</th>
                    <th className="px-6 py-3">Mode/Map</th>
                    <th className="px-6 py-3">{isRocketLeague ? 'G / S / A' : 'K / D / A'}</th>
                    <th className="px-6 py-3">{damageLabel}</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {stats.recentMatches.map((match) => (
                    <tr key={match.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`font-bold ${
                          match.result === 'Victory' || match.result === 'Top 10' ? 'text-brand-gold' : 
                          match.result === 'Defeat' ? 'text-red-500' : 'text-brand-purple-light'
                        }`}>
                          {match.result}
                        </span>
                        <div className="text-xs text-gray-500">{match.agentOrHero}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{match.map}</td>
                      <td className="px-6 py-4 font-mono">
                        <span className="text-white">{match.kills}</span>
                        <span className="text-gray-600 mx-1">/</span>
                        <span className="text-red-400">{match.deaths}</span>
                        <span className="text-gray-600 mx-1">/</span>
                        <span className="text-gray-400">{match.assists}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 font-mono">{match.damage.toLocaleString()}</td>
                      <td className="px-6 py-4 text-gray-500">{match.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Analysis & Ads */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* AI Analysis Radar */}
          <div className="bg-brand-surface/50 backdrop-blur border border-white/5 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-gold" />
              Skill Analysis
            </h3>
            <div className="h-64 relative">
              <RadarChart data={stats.radarData} />
            </div>
            <div className="mt-4 p-4 bg-brand-darker rounded-lg border border-white/5">
              <h4 className="text-sm font-bold text-brand-gold mb-2 flex items-center gap-2">
                <AlertCircle className="w-3 h-3" /> AI Coach Tip
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Your <span className="text-white">headshot percentage</span> is in the top 15%, but your <span className="text-white">utility usage</span> is below average for {stats.rank}. Try our "Utility Usage" drill.
              </p>
              <Button variant="outline" size="sm" className="w-full mt-3 text-xs" onClick={handleAnalyzeClick}>Start Drill</Button>
            </div>
          </div>

          {/* Shop Ad */}
          <div className="bg-gradient-to-br from-brand-purple/20 to-brand-dark border border-brand-purple/30 rounded-xl p-6 text-center">
            <h3 className="text-white font-bold mb-2">Play Like {stats.username}</h3>
            <img 
              src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=300&h=300" 
              alt="Headset" 
              className="w-32 h-32 object-contain mx-auto mb-4 mix-blend-luminosity hover:mix-blend-normal transition-all" 
            />
            <p className="text-sm text-gray-400 mb-4">Logitech G Pro X Wireless</p>
            <Button size="sm" className="w-full">View Setup</Button>
          </div>

        </div>
      </div>
    </div>
  );
};
