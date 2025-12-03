import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, ArrowRight, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const AIInsight = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-brand-surface to-brand-dark border border-brand-purple/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6 border border-brand-gold/20">
                <BrainCircuit className="w-4 h-4" />
                AI Coach Beta
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stop guessing. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-purple">Start improving.</span>
              </h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Our AI analyzes your last 20 matches and found that 
                <span className="text-white font-semibold"> Fortnite players like you improve 18% faster</span> with specific vertical aim drills.
              </p>
              <Link to="/pro">
                <Button icon={<Zap className="w-4 h-4" />}>
                  Get My Personalized Drill
                </Button>
              </Link>
            </div>

            <div className="relative">
              {/* Mock Chart/Analysis Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-brand-darker border border-white/10 rounded-xl p-6 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-mono text-sm text-gray-400">AIM ANALYSIS</h3>
                  <span className="text-red-400 text-xs font-bold">-12% vs Avg</span>
                </div>
                
                {/* Radar Chart Mockup */}
                <div className="relative h-48 w-full flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border border-white/10 rounded-full" />
                    <div className="w-16 h-16 border border-white/10 rounded-full absolute" />
                  </div>
                  {/* Simulated polygon */}
                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible opacity-80">
                    <path d="M50 10 L90 40 L80 80 L20 80 L10 40 Z" fill="rgba(255, 215, 0, 0.2)" stroke="#FFD700" strokeWidth="2" />
                  </svg>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Suggested Drill:</span>
                    <Link to="/pro" className="text-brand-gold font-semibold flex items-center gap-1 cursor-pointer hover:underline">
                      Vertical Tracking V2 <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
