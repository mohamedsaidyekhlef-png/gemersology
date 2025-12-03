import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Copy, Check, BarChart2, Shield, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

export const DeveloperPage = () => {
  const [apiKey, setApiKey] = useState('gm_live_8x92m... (hidden)');
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleReveal = () => {
    if (!isRevealed) {
      setApiKey('gm_live_8x92m93kd92001ks83jd92');
      setIsRevealed(true);
    } else {
      setApiKey('gm_live_8x92m... (hidden)');
      setIsRevealed(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('gm_live_8x92m93kd92001ks83jd92');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Terminal className="text-brand-gold" /> Developer Portal
              </h1>
              <p className="text-gray-400">Manage your API keys and monitor usage.</p>
            </div>
            <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                    System Operational
                </span>
                <Link to="/help">
                    <Button variant="outline" size="sm">Docs</Button>
                </Link>
            </div>
          </div>

          {/* API Key Section */}
          <div className="bg-brand-surface border border-white/10 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold mb-6">API Credentials</h2>
            <div className="bg-brand-darker border border-white/5 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 w-full">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Public Key</label>
                    <div className="font-mono text-lg text-white bg-black/30 px-4 py-3 rounded-lg border border-white/5 flex items-center justify-between">
                        <span>{apiKey}</span>
                        <div className="flex gap-2">
                            <button onClick={handleReveal} className="text-xs text-brand-gold hover:underline">
                                {isRevealed ? 'Hide' : 'Reveal'}
                            </button>
                        </div>
                    </div>
                </div>
                <Button 
                    onClick={handleCopy} 
                    variant="secondary" 
                    icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                >
                    {copied ? 'Copied' : 'Copy Key'}
                </Button>
            </div>
            <div className="mt-4 flex gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Rate Limit: 2,000 req/day</span>
                <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Auto-rotation: Disabled</span>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-brand-surface/50 border border-white/5 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-400">Total Requests</h3>
                    <BarChart2 className="w-5 h-5 text-brand-purple-light" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">14,205</div>
                <div className="text-xs text-green-400">+12% from last week</div>
            </div>
            <div className="bg-brand-surface/50 border border-white/5 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-400">Error Rate</h3>
                    <Shield className="w-5 h-5 text-red-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">0.02%</div>
                <div className="text-xs text-gray-500">Within operational limits</div>
            </div>
            <div className="bg-brand-surface/50 border border-white/5 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-400">Avg Latency</h3>
                    <RefreshCw className="w-5 h-5 text-brand-gold" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">45ms</div>
                <div className="text-xs text-green-400">Optimal performance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
