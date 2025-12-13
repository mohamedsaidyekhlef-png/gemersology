import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Track', href: '/track' },
  { name: 'Tools', href: '/tools' }, // Added Tools
  { name: 'Blog', href: '/blog' },
  { name: 'Shop', href: '/shop' },
  { name: 'Services', href: '/services' },
  { name: 'Pro Tools', href: '/pro', isPremium: true },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-brand-dark/90 backdrop-blur-md border-brand-purple/20 py-3 shadow-lg" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group z-50 relative">
            <img 
              src="https://i.postimg.cc/Df5sxZM9/Chat-GPT-Image-Nov-5-2025-07-13-29-PM-(1).png" 
              alt="Gamersology Logo" 
              className="w-9 h-9 md:w-10 md:h-10 object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
            />
            <span className="text-lg md:text-xl font-bold tracking-tight text-white">
              GAMERS<span className="text-brand-gold drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]">OLOGY</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-gold relative group",
                  link.isPremium ? "text-brand-purple hover:text-brand-gold" : "text-gray-300"
                )}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/track" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <Search className="w-5 h-5" />
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm" icon={<User className="w-4 h-4" />}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-brand-dark/95 backdrop-blur-xl z-40 pt-24 px-4 md:hidden flex flex-col"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center justify-between py-4 border-b border-white/5 text-lg font-medium text-gray-300 hover:text-brand-gold hover:pl-2 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              ))}
            </div>
            
            <div className="mt-auto mb-8 space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-center h-12 text-base"
                onClick={() => {
                  navigate('/login');
                  setIsMobileMenuOpen(false);
                }}
              >
                Login
              </Button>
              <Button 
                variant="primary" 
                className="w-full justify-center h-12 text-base shadow-glow"
                onClick={() => {
                  navigate('/signup');
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign Up
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
