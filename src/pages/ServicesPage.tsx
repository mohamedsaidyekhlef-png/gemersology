import React from 'react';
import { Check, Zap, Code, BarChart } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'API Access',
    price: 'Free',
    period: '/ month',
    description: 'For developers and hobbyists.',
    features: ['2,000 calls / day', 'Basic player stats', 'Match history (last 20)', 'Community support'],
    icon: Code,
    cta: 'Get API Key',
    link: '/developer',
    popular: false
  },
  {
    name: 'AI Coaching',
    price: '$9',
    period: '/ month',
    description: 'Personalized improvement plan.',
    features: ['Weekly aim routines', 'VOD Analysis (5/mo)', 'Rank prediction', 'Priority support'],
    icon: Zap,
    cta: 'Start Training',
    link: '/checkout?plan=coaching',
    popular: true
  },
  {
    name: 'White Label',
    price: '$49',
    period: '/ month',
    description: 'Embed stats on your own site.',
    features: ['Unlimited API calls', 'Custom widget branding', 'No "Gamersology" logo', 'Dedicated account manager'],
    icon: BarChart,
    cta: 'Contact Sales',
    link: '/contact?subject=Partnership',
    popular: false
  }
];

export const ServicesPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4">Services & Pricing</h1>
          <p className="text-gray-400 text-lg">Whether you're a player looking to improve or a developer building the next big thing.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative bg-brand-surface border rounded-2xl p-8 flex flex-col ${
                plan.popular ? 'border-brand-gold shadow-glow' : 'border-white/5'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-dark px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                  <plan.icon className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-brand-gold shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to={plan.link} className="w-full">
                <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
