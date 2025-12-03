import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to home or profile
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[600px] bg-brand-purple/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-brand-surface/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <img 
                src="https://i.postimg.cc/Df5sxZM9/Chat-GPT-Image-Nov-5-2025-07-13-29-PM-(1).png" 
                alt="Logo" 
                className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] group-hover:scale-110 transition-transform"
              />
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm">Enter your credentials to access your pro stats.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-gold transition-colors" />
                <input 
                  type="email" 
                  required
                  className="w-full bg-brand-darker border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all"
                  placeholder="player@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs text-brand-gold hover:underline">Forgot?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-gold transition-colors" />
                <input 
                  type="password" 
                  required
                  className="w-full bg-brand-darker border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full shadow-glow" 
              disabled={isLoading}
              icon={isLoading ? undefined : <ArrowRight className="w-4 h-4" />}
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-brand-surface text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center py-2.5 border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/20 transition-all group">
                <Gamepad2 className="w-5 h-5 text-[#5865F2] group-hover:scale-110 transition-transform" />
              </button>
              <button className="flex items-center justify-center py-2.5 border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/20 transition-all group">
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm4.947 16.727h-1.566a.446.446 0 0 1-.44-.388c-.08-.64-.354-1.266-.786-1.795-.093-.114-.262-.127-.372-.036-.74.612-1.664.98-2.67.98-2.205 0-4-1.795-4-4s1.795-4 4-4c1.006 0 1.93.368 2.67.98.11.09.28.078.372-.036.432-.53.706-1.155.786-1.795a.446.446 0 0 1 .44-.388h1.566c.28 0 .493.25.447.526-.205 1.22-.775 2.318-1.584 3.196.808.878 1.38 1.976 1.584 3.196.046.276-.167.526-.447.526z"/></svg>
              </button>
              <button className="flex items-center justify-center py-2.5 border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/20 transition-all group">
                <svg className="w-5 h-5 text-[#EA4335] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
              </button>
            </div>

            <p className="text-center text-sm text-gray-400 mt-8">
              Don't have an account?{' '}
              <Link to="/signup" className="text-brand-gold font-bold hover:underline">
                Join the Squad
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
