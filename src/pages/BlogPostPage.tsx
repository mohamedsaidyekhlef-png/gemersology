import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { BLOG_POSTS } from '../lib/blogData';
import { SEO } from '../components/utils/SEO';

export const BlogPostPage = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-brand-dark flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <Link to="/blog">
          <Button icon={<ArrowLeft className="w-4 h-4" />}>Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark">
      <SEO 
        title={post.title}
        description={post.excerpt}
        image={post.image}
        type="article"
        canonical={`/blog/${post.slug}`}
      />

      {/* Hero Header */}
      <div className="relative h-[400px] w-full mb-12">
        <div className="absolute inset-0">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-12">
          <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-brand-gold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider border border-brand-gold/20">
              {post.category}
            </span>
            {post.featured && (
              <span className="px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple-light text-xs font-bold uppercase tracking-wider border border-brand-purple/20">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-4xl leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-brand-gold" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-a:text-brand-gold hover:prose-a:text-white prose-img:rounded-xl prose-img:border prose-img:border-white/10">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>
          
          {/* Footer / Share */}
          <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
            <div className="text-gray-400 text-sm">
              Tagged: <span className="text-brand-gold">#Fortnite #Meta #Guide</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Share Article</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
