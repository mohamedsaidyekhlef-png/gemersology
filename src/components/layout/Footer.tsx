import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Youtube, Twitch, Database, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img 
                src="https://i.postimg.cc/Df5sxZM9/Chat-GPT-Image-Nov-5-2025-07-13-29-PM-(1).png" 
                alt="Gamersology Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-lg font-bold tracking-tight text-white">
                GAMERS<span className="text-brand-gold">OLOGY</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              The AI radar for every gamer. Track stats, improve mechanics, and find the best gear.
            </p>
            {/* Authority Links (Trust Signals) */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              <a href="https://tracker.gg" target="_blank" rel="dofollow" className="hover:text-brand-gold transition-colors flex items-center gap-1">
                <Database className="w-3 h-3" /> Tracker Network
              </a>
              <a href="https://liquipedia.net" target="_blank" rel="dofollow" className="hover:text-brand-gold transition-colors flex items-center gap-1">
                <Globe className="w-3 h-3" /> Liquipedia
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/track" className="hover:text-brand-gold transition-colors">Player Tracker</Link></li>
              <li><Link to="/tools" className="hover:text-brand-gold transition-colors">AI Tools Suite</Link></li>
              <li><Link to="/blog" className="hover:text-brand-gold transition-colors">Meta Science Blog</Link></li>
              <li><Link to="/shop" className="hover:text-brand-gold transition-colors">Gear Shop</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/help" className="hover:text-brand-gold transition-colors">Help Center</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-gold transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Social</h4>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-dark transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-dark transition-all">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-dark transition-all">
                <Twitch className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2025 Gamersology Inc. All rights reserved.</p>
          <p className="flex gap-4">
            <span>FTC Disclosure: Contains affiliate links.</span>
            <span>Not affiliated with Riot Games, Epic Games, or Valve.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
