import React, { useState } from 'react';
import { X, Copy, Check, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { copyToClipboard } from '../../lib/utils';

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  toolSlug: string;
}

export const EmbedModal: React.FC<EmbedModalProps> = ({ isOpen, onClose, toolName, toolSlug }) => {
  const [copied, setCopied] = useState(false);

  // The "Trick": This embed code includes a do-follow backlink to Gamersology
  const embedCode = `<div style="width:100%;max-width:800px;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
  <iframe src="https://gamersology.com/tools?embed=${toolSlug}" width="100%" height="600" frameborder="0" style="border:none;"></iframe>
  <div style="background:#0F0518;color:#666;padding:8px;text-align:center;font-size:12px;font-family:sans-serif;">
    Powered by <a href="https://gamersology.com/tools" target="_blank" rel="dofollow" style="color:#FFD700;text-decoration:none;font-weight:bold;">Gamersology AI Tools</a>
  </div>
</div>`;

  const handleCopy = async () => {
    const success = await copyToClipboard(embedCode);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-brand-surface border border-brand-gold/20 rounded-2xl p-6 w-full max-w-lg relative z-10 shadow-glow"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-gold/10 rounded-lg flex items-center justify-center text-brand-gold">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Embed {toolName}</h3>
                <p className="text-xs text-gray-400">Add this tool to your website or blog.</p>
              </div>
            </div>

            <div className="bg-black/50 border border-white/10 rounded-lg p-4 mb-6 relative group">
              <code className="text-xs text-gray-300 font-mono break-all line-clamp-6">
                {embedCode}
              </code>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleCopy} className="flex-1" icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}>
                {copied ? 'Code Copied!' : 'Copy Embed Code'}
              </Button>
            </div>
            
            <p className="text-[10px] text-gray-500 text-center mt-4">
              By embedding this tool, you agree to our Terms of Service. Backlink attribution is required.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
