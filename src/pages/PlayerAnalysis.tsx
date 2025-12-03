import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, Target, Crosshair, Activity, ArrowLeft, Zap, Map } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { generatePlayerStats, PlayerStats } from '../lib/mockData';
import { RadarChart } from '../components/charts/RadarChart';

export const PlayerAnalysis = () => {
  const { game, player } = useParams();
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (game && player) {
        const data = generatePlayerStats(game, player);
        setStats(data);
        setLoading(false);
      }
    }, 1500); // Longer load for "Analysis" effect
    return () => clearTimeout(timer);
  }, [game, player]);

  // Typing effect for AI summary
  useEffect(() => {
    if (!loading && stats) {
      const text = `Analysis complete for ${stats.username}. Combat efficiency is ${stats.kdRatio > 2 ? 'optimal' : 'sub-optimal'}. Detected high proficiency in ${stats.strengths[0].toLowerCase()} but critical weakness in ${stats.weaknesses[0].toLowerCase()}. Recommended immediate drill intervention.`;
      let i = 0;
      const typeTimer = setInterval(() => {
        setTypedText(text.substring(0, i + 1));
        i++;
        if (i === text.length) clearInterval(typeTimer);
      }, 30);
      return () => clearInterval(typeTimer);
    }
  }, [loading, stats]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark/90 z-10" />
        <div className="z-20 flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 border-t-4 border-brand-gold rounded-full animate-spin" />
            <div className="w-16 h-16 border-t-4 border-brand-purple rounded-full animate-spin absolute top-4 left-4 direction-reverse" />
            <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-8 h-8 animate-pulse" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-widest">NEURAL LINK ESTABLISHED</h2>
            <p className="text-brand-gold font-mono text-sm animate-pulse">PROCESSING COMBAT TELEMETRY...</p>
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mt-4">
              <motion.div 
                className="h-full bg-brand-gold"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return <div>Player not found</div>;

  return (
    <div className="min-h-screen pt-24 pb-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={`/track/${game}/${player}`}>
            <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>Back to Profile</Button>
          </Link>
          <div className="h-8 w-[1px] bg-white/20" />
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BrainCircuit className="text-brand-gold" />
            AI Tactical Report <span className="text-gray-500 text-sm font-normal font-mono">#{stats.username.toUpperCase()}_001</span>
          </h1>
        </div>

        {/* AI Summary Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-brand-darker to-brand-surface border border-brand-gold/30 rounded-xl p-6 mb-8 relative overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.1)]"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold" />
          <div className="flex gap-4">
            <div className="mt-1">
              <div className="w-3 h-3 bg-brand-gold rounded-full animate-pulse shadow-glow" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-brand-gold uppercase tracking-wider">AI Coach Insight</h3>
              <p className="font-mono text-gray-300 text-lg leading-relaxed min-h-[3.5rem]">
                {typedText}<span className="animate-pulse">_</span>
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Col: Radar & Core Stats */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-brand-surface/50 backdrop-blur border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-brand-purple-light" />
                Performance Shape
              </h3>
              <div className="h-72 relative">
                <RadarChart data={stats.radarData} />
                {/* Overlay Stats */}
                <div className="absolute -bottom-2 left-0 text-xs font-mono text-gray-500">
                  OVR: <span className="text-white font-bold text-lg">{Math.round(stats.radarData.reduce((a,b)=>a+b,0)/6)}</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-brand-surface/50 backdrop-blur border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold mb-4">Playstyle DNA</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {stats.playStyleTags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-brand-purple/20 text-brand-purple-light text-sm font-bold rounded border border-brand-purple/30">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-white/10 pl-4">
                {stats.playStyle}
              </p>
            </motion.div>
          </div>

          {/* Middle Col: Aim & Mechanics Deep Dive */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-brand-surface/50 backdrop-blur border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-red-400" />
                Aim Mechanics
              </h3>
              
              <div className="space-y-6">
                {[
                  { label: 'Flicking Speed', value: stats.aimMetrics.flicking, color: 'bg-red-500' },
                  { label: 'Tracking Accuracy', value: stats.aimMetrics.tracking, color: 'bg-blue-500' },
                  { label: 'Micro-Adjustments', value: stats.aimMetrics.microAdjust, color: 'bg-green-500' },
                  { label: 'Crosshair Placement', value: stats.aimMetrics.crosshairPlacement, color: 'bg-brand-gold' },
                ].map((metric, i) => (
                  <div key={metric.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">{metric.label}</span>
                      <span className="font-mono font-bold">{metric.value}/100</span>
                    </div>
                    <div className="h-2 bg-brand-darker rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                        className={`h-full ${metric.color} shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Map Performance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-brand-surface/50 backdrop-blur border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Map className="w-5 h-5 text-green-400" />
                Map Mastery
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.mapStats.map((map) => (
                  <div key={map.map} className="bg-brand-darker p-3 rounded-lg border border-white/5">
                    <div className="text-sm font-bold mb-1 truncate">{map.map}</div>
                    <div className="flex justify-between items-end">
                      <span className={`text-xl font-bold font-mono ${map.winRate > 50 ? 'text-green-400' : 'text-red-400'}`}>
                        {map.winRate}%
                      </span>
                      <span className="text-xs text-gray-500">{map.matches} games</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Col: Action Plan */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-b from-brand-surface to-brand-darker border border-brand-gold/20 rounded-xl p-6 h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl" />
              
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-gold" />
                Recommended Drills
              </h3>

              <div className="space-y-4 relative z-10">
                <div className="bg-brand-dark/50 border border-brand-gold/30 rounded-lg p-4 hover:bg-brand-gold/5 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white group-hover:text-brand-gold transition-colors">Microshot Speed</h4>
                    <span className="px-2 py-0.5 bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase rounded">Aim</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">Improve your {stats.aimMetrics.flicking < 60 ? 'poor' : 'average'} flicking speed detected in recent matches.</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Zap className="w-3 h-3" /> 10 mins / day
                  </div>
                </div>

                <div className="bg-brand-dark/50 border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white">Utility Timing</h4>
                    <span className="px-2 py-0.5 bg-brand-purple/10 text-brand-purple-light text-[10px] font-bold uppercase rounded">Sense</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">Analysis shows late usage of abilities in 40% of engagements.</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Zap className="w-3 h-3" /> VOD Review
                  </div>
                </div>

                <div className="bg-brand-dark/50 border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white">Crosshair Placement</h4>
                    <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 text-[10px] font-bold uppercase rounded">Mech</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">Your crosshair is often too low when peeking angles.</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Zap className="w-3 h-3" /> Deathmatch Focus
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <Button className="w-full shadow-glow animate-pulse">Start Training Session</Button>
                <p className="text-xs text-gray-500 mt-3">Syncs with AimLab & KovaaK's</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};
