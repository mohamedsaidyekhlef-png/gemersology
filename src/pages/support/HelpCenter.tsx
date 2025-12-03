import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: "Is Gamersology free to use?",
    a: "Yes! The core tracking features, basic stats, and match history are completely free. We offer a Pro subscription for advanced AI coaching, ad-free browsing, and deeper analytics."
  },
  {
    q: "How do I link my game account?",
    a: "You don't need to link your account to view public stats. Simply search for your username or Riot ID. To access personalized coaching, you can verify your account through our secure OAuth integration."
  },
  {
    q: "Which games are supported?",
    a: "We currently support Fortnite, Valorant, Apex Legends, League of Legends, PUBG, Free Fire, Call of Duty, Pokémon Unite, Rocket League, Overwatch 2, CS2, and Dota 2."
  },
  {
    q: "How accurate is the AI coaching?",
    a: "Our AI analyzes thousands of data points from pro matches to identify patterns. While no tool is perfect, our users typically see an 18-25% improvement in rank rating within 30 days of following the recommended drills."
  },
  {
    q: "Can I cancel my Pro subscription anytime?",
    a: "Absolutely. There are no long-term contracts. You can cancel your subscription at any time from your account settings."
  }
];

export const HelpCenter = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-gray-400">Frequently asked questions and support resources.</p>
        </div>

        <div className="bg-brand-surface border border-white/5 rounded-xl overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/5 last:border-0">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-white">{faq.q}</span>
                {openIndex === index ? <ChevronUp className="text-brand-gold" /> : <ChevronDown className="text-gray-500" />}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-400 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Still need help?</p>
          <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-brand-gold text-brand-gold rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-all font-bold">
            <HelpCircle className="w-4 h-4 mr-2" /> Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};
