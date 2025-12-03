import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

const posts = [
  {
    id: 1,
    title: "Valorant Patch 8.04: Viper Nerfs Explained",
    excerpt: "The latest update shakes up the controller meta. Here is how it affects your ranked games and win rates.",
    category: "Meta Science",
    author: "Tactical_Tim",
    date: "2 days ago",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=400"
  },
  {
    id: 2,
    title: "Top 5 Aim Routines Used by Pros in 2025",
    excerpt: "We analyzed 50 pro players' warm-up routines. The results might surprise you—it's not just Gridshot.",
    category: "Pro Scene",
    author: "AimLab_Official",
    date: "4 days ago",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800&h=400"
  },
  {
    id: 3,
    title: "Is the Wooting 60HE Still Worth It?",
    excerpt: "Rapid trigger keyboards are everywhere now. Does the original king still hold the crown? Our detailed benchmark.",
    category: "Gear Lab",
    author: "TechSteve",
    date: "1 week ago",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800&h=400"
  }
];

export const BlogPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Meta Science Blog</h1>
            <p className="text-gray-400">Data-driven insights, patch analysis, and gear reviews.</p>
          </div>
          <div className="hidden md:flex gap-2">
            {['All', 'Meta Science', 'Pro Scene', 'Gear Lab'].map(cat => (
              <button key={cat} className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm transition-colors">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <article key={post.id} className="bg-brand-surface border border-white/5 rounded-xl overflow-hidden group hover:border-brand-gold/30 transition-all">
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur px-3 py-1 rounded text-xs font-bold text-brand-gold uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                </div>
                <h2 className="text-xl font-bold mb-3 group-hover:text-brand-gold transition-colors">{post.title}</h2>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">{post.excerpt}</p>
                <Button variant="ghost" size="sm" className="pl-0 hover:pl-2 transition-all">
                  Read Article <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
