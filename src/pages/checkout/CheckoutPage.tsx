import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, CreditCard, Lock, CheckCircle2, ArrowLeft, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';

export const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const planType = searchParams.get('plan') || 'coaching';

  const plans = {
    coaching: {
      name: 'AI Coaching Plan',
      price: 9.00,
      period: '/ month',
      features: ['Weekly Aim Routines', 'VOD Analysis', 'Rank Prediction']
    },
    pro: {
      name: 'Gamersology Pro',
      price: 4.99,
      period: '/ month',
      features: ['Ad-Free Experience', 'Unlimited History', 'Pro Badge']
    }
  };

  const selectedPlan = plans[planType as keyof typeof plans] || plans.coaching;
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Success

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 2000);
  };

  if (step === 2) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-gold/5 z-0" />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-brand-surface border border-brand-gold/30 p-8 rounded-2xl max-w-md w-full text-center relative z-10 shadow-glow"
        >
          <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
          <p className="text-gray-400 mb-8">
            Your subscription to <span className="text-brand-gold">{selectedPlan.name}</span> is now active.
          </p>
          <div className="space-y-3">
            <Link to="/developer">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="w-full">Back to Home</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/services" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
          </Link>
          
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left: Payment Form */}
            <div className="lg:col-span-7">
              <div className="bg-brand-surface border border-white/5 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-bold">Secure Checkout</h1>
                  <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                    <ShieldCheck className="w-3 h-3" /> SSL Encrypted
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <input type="email" required placeholder="Email Address" className="w-full bg-brand-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" required placeholder="First Name" className="bg-brand-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all" />
                        <input type="text" required placeholder="Last Name" className="bg-brand-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 mt-8">Payment Method</h3>
                    
                    {/* Card Visual */}
                    <div className="mb-6 p-4 border border-brand-gold/20 bg-brand-gold/5 rounded-xl flex items-center gap-4">
                        <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                            <CreditCard className="text-brand-gold w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Credit or Debit Card</p>
                            <p className="text-xs text-gray-400">Powered by Stripe (Simulated)</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input type="text" required placeholder="Card Number" maxLength={19} className="w-full bg-brand-darker border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all font-mono" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" required placeholder="MM / YY" maxLength={5} className="bg-brand-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all font-mono text-center" />
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input type="text" required placeholder="CVC" maxLength={3} className="w-full bg-brand-darker border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all font-mono text-center" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full mt-8 shadow-glow" 
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Pay $${selectedPlan.price.toFixed(2)}`}
                  </Button>
                  <p className="text-xs text-center text-gray-500 mt-4">
                    By clicking "Pay", you agree to our Terms of Service. This is a secure 256-bit SSL encrypted payment.
                  </p>
                </form>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5">
                <div className="bg-brand-surface/50 backdrop-blur border border-brand-gold/20 rounded-2xl p-8 sticky top-32">
                    <h3 className="text-lg font-bold mb-6">Order Summary</h3>
                    
                    <div className="flex items-start gap-4 mb-6 pb-6 border-b border-white/10">
                        <div className="w-16 h-16 bg-brand-darker rounded-lg border border-white/10 flex items-center justify-center">
                            <Zap className="w-8 h-8 text-brand-gold" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">{selectedPlan.name}</h4>
                            <p className="text-sm text-gray-400">Monthly Subscription</p>
                        </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                        {selectedPlan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                <Star className="w-4 h-4 text-brand-purple-light fill-current" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span>${selectedPlan.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Tax (Estimated)</span>
                            <span>$0.00</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-white/10">
                            <span>Total</span>
                            <span className="text-brand-gold">${selectedPlan.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
