import React from 'react';
import { Crown, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ProPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-gold/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-gold/20 to-brand-purple/20 border border-brand-gold/30 text-brand-gold font-bold uppercase tracking-wider text-sm mb-8">
            <Crown className="w-4 h-4" /> Gamersology Pro
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Unlock Your Full Potential
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get ad-free browsing, advanced analytics, and AI-powered coaching that adapts to your playstyle daily.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto bg-brand-surface/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Why Go Pro?</h3>
            <ul className="space-y-4">
              {[
                'Ad-free experience across the entire platform',
                'Unlimited match history storage',
                'Advanced AI pattern recognition',
                'Priority queue for stat updates',
                'Exclusive "Pro" badge on your profile',
                'Monthly gear giveaways entry'
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-brand-darker border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 to-transparent" />
            <h4 className="text-lg text-gray-400 mb-2 relative z-10">Pro Membership</h4>
            <div className="flex items-center justify-center gap-1 mb-6 relative z-10">
              <span className="text-5xl font-bold text-white">$4.99</span>
              <span className="text-gray-500 self-end mb-2">/mo</span>
            </div>
            <Button className="w-full mb-4 relative z-10" size="lg" icon={<Sparkles className="w-4 h-4" />}>
              Upgrade Now
            </Button>
            <p className="text-xs text-gray-500 relative z-10">Cancel anytime. Secure payment via Stripe.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
