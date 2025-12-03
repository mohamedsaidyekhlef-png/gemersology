import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Trophy, Users } from 'lucide-react';

const trendingPlayers = [
  { id: 1, name: 'Nobru', game: 'Free Fire', rank: 'Grandmaster', kda: '6.8', winRate: '24%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nobru' },
  { id: 2, name: 'Bugha', game: 'Fortnite', rank: '#1 Global', kda: '5.2', winRate: '18%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bugha' },
  { id: 3, name: 'Shroud', game: 'PUBG', rank: 'Survivor', kda: '4.1', winRate: '15%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shroud' },
  { id: 4, name: 'TenZ', game: 'Valorant', rank: 'Radiant', kda: '1.4', winRate: '58%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TenZ' },
  { id: 5, name: 's1mple', game: 'CS2', rank: 'Global Elite', kda: '1.35', winRate: '51%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1mple' },
];

export const TrendingSection = () => {
  return (
    <section className="py-16 bg-brand-darker border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="text-brand-gold" />
            Trending Now
          </h2>
          <span className="text-sm text-gray-500 font-mono animate-pulse">● Live Updates</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {trendingPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-brand-surface border border-white/5 rounded-xl p-4 hover:border-brand-gold/30 transition-all group cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-full bg-brand-dark" />
                <div>
                  <h3 className="font-bold text-white group-hover:text-brand-gold transition-colors">{player.name}</h3>
                  <p className="text-xs text-gray-400">{player.game}</p>
                </div>
              </div>
              
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Rank</span>
                  <span className="text-brand-gold flex items-center gap-1 text-xs">
                    <Trophy className="w-3 h-3" /> {player.rank}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">K/D</span>
                  <span className="text-white">{player.kda}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Win %</span>
                  <span className="text-brand-purple-light">{player.winRate}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
