import React from 'react';
import { Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../lib/blogData';
import { SEO } from '../components/utils/SEO';

export const BlogPage = () => {
  const featuredPost = BLOG_POSTS.find(post => post.featured) || BLOG_POSTS[0];
  const otherPosts = BLOG_POSTS.filter(post => post.id !== featuredPost.id);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark">
      <SEO 
        title="Meta Science Blog | Fortnite, Valorant & Apex Insights"
        description="Deep dive into the latest gaming meta, patch notes, and pro strategies. Data-backed analysis for competitive players."
        canonical="/blog"
      />
      
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

        {/* Featured Post */}
        <div className="mb-16">
          <Link to={`/blog/${featuredPost.slug}`} className="group relative block rounded-2xl overflow-hidden border border-white/10 hover:border-brand-gold/50 transition-all">
            <div className="grid md:grid-cols-2">
              <div className="aspect-video md:aspect-auto relative overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-brand-gold text-brand-dark px-3 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Featured
                </div>
              </div>
              <div className="p-8 md:p-12 bg-brand-surface flex flex-col justify-center">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {featuredPost.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {featuredPost.date}</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 group-hover:text-brand-gold transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <Button variant="primary" className="self-start">
                  Read Full Guide <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Posts Grid */}
        <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map(post => (
            <article key={post.id} className="bg-brand-surface border border-white/5 rounded-xl overflow-hidden group hover:border-brand-gold/30 transition-all flex flex-col">
              <Link to={`/blog/${post.slug}`} className="block aspect-video overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur px-3 py-1 rounded text-xs font-bold text-brand-gold uppercase tracking-wider">
                  {post.category}
                </div>
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                </div>
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-brand-gold transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.slug}`}>
                  <Button variant="ghost" size="sm" className="pl-0 hover:pl-2 transition-all">
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
