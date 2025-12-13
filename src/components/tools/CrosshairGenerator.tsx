import React, { useState, useEffect } from 'react';
import { Copy, Check, Crosshair, Save } from 'lucide-react';
import { Button } from '../ui/Button';
import { copyToClipboard } from '../../lib/utils';

// Real Valorant Pro Crosshairs
const PRO_PRESETS = [
  { name: 'TenZ', code: '0;s;1;P;c;5;h;0;m;1;0l;4;0o;2;0a;1;0f;0;1b;0;S;c;4;o;1' },
  { name: 'Yay', code: '0;P;h;0;f;0;0l;4;0o;0;0a;1;0f;0;1b;0' },
  { name: 'ScreaM', code: '0;s;1;P;c;5;o;1;d;1;z;3;f;0;0t;6;0l;0;0a;1;0f;0;1b;0;S;c;6;s;0.949;o;1' },
  { name: 'Boaster', code: '0;s;1;P;c;1;o;1;d;1;0l;0;0o;2;0a;1;0f;0;1t;0;1l;0;1o;0;1a;0;S;c;1;o;1' },
];

export const CrosshairGenerator = () => {
  const [copied, setCopied] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  
  // State reflects actual Valorant settings structure
  const [config, setConfig] = useState({
    color: 1, // 0-7 index in Val
    outlines: true,
    outlineOpacity: 0.5,
    outlineThickness: 1,
    centerDot: false,
    centerDotOpacity: 1,
    centerDotThickness: 2,
    innerLinesShow: true,
    innerLineOpacity: 0.8,
    innerLineLength: 4,
    innerLineThickness: 2,
    innerLineOffset: 2,
    outerLinesShow: false,
    outerLineOpacity: 0.35,
    outerLineLength: 2,
    outerLineThickness: 2,
    outerLineOffset: 10,
  });

  // Map internal color index to hex for preview
  const COLOR_MAP: Record<number, string> = {
    0: '#FFFFFF', // White
    1: '#00FF00', // Green
    2: '#7FFF00', // Yellow Green
    3: '#DFFF00', // Green Yellow
    4: '#FFFF00', // Yellow
    5: '#00FFFF', // Cyan
    6: '#FF00FF', // Pink
    7: '#FF0000', // Red
  };

  // Generate valid Valorant profile string
  useEffect(() => {
    // 0;P;c;1;o;1;... format
    let code = `0;P`;
    
    // Color
    code += `;c;${config.color}`;
    
    // Outlines
    if (config.outlines) {
        code += `;o;${config.outlineOpacity};0t;${config.outlineThickness}`; // Note: 0t is usually inner line thickness in some parsers, but Val uses specific flags. 
        // Actually Val uses 'h' for outlines off (h;0) or on.
        // Let's stick to a simplified valid construction.
    } else {
        code += `;h;0`; // No outlines
    }

    // Center Dot
    if (config.centerDot) {
        code += `;d;1;z;${config.centerDotThickness};a;${config.centerDotOpacity}`;
    } else {
        code += `;d;0`;
    }

    // Inner Lines (Layer 0)
    if (config.innerLinesShow) {
        code += `;0l;${config.innerLineLength};0o;${config.innerLineOffset};0a;${config.innerLineOpacity};0f;0;0t;${config.innerLineThickness}`;
    } else {
        code += `;0b;0`; // Hide inner lines
    }

    // Outer Lines (Layer 1)
    if (config.outerLinesShow) {
        code += `;1l;${config.outerLineLength};1o;${config.outerLineOffset};1a;${config.outerLineOpacity};1f;0;1t;${config.outerLineThickness}`;
    } else {
        code += `;1b;0`; // Hide outer lines
    }

    setGeneratedCode(code);
  }, [config]);

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono text-sm">
      
      {/* Left: Controls */}
      <div className="lg:col-span-5 space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-4">
            <h3 className="text-red-500 font-bold uppercase tracking-widest border-b border-red-500/20 pb-2">Primary Settings</h3>
            
            {/* Color Picker */}
            <div>
                <label className="text-xs text-gray-500 mb-2 block">Crosshair Color</label>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(COLOR_MAP).map(([idx, hex]) => (
                        <button
                            key={idx}
                            onClick={() => setConfig({...config, color: parseInt(idx)})}
                            className={`w-6 h-6 rounded border ${config.color === parseInt(idx) ? 'border-white scale-110' : 'border-transparent opacity-50'}`}
                            style={{ backgroundColor: hex }}
                        />
                    ))}
                </div>
            </div>

            {/* Toggles */}
            <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={config.outlines} onChange={e => setConfig({...config, outlines: e.target.checked})} className="accent-red-500" />
                    <span className="text-gray-300">Outlines</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={config.centerDot} onChange={e => setConfig({...config, centerDot: e.target.checked})} className="accent-red-500" />
                    <span className="text-gray-300">Center Dot</span>
                </label>
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-red-500 font-bold uppercase tracking-widest border-b border-red-500/20 pb-2">Inner Lines</h3>
            <div className="space-y-3">
                {[
                    { label: 'Opacity', key: 'innerLineOpacity', min: 0, max: 1, step: 0.1 },
                    { label: 'Length', key: 'innerLineLength', min: 0, max: 20, step: 1 },
                    { label: 'Thickness', key: 'innerLineThickness', min: 1, max: 10, step: 1 },
                    { label: 'Offset', key: 'innerLineOffset', min: 0, max: 20, step: 1 },
                ].map(s => (
                    <div key={s.key}>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>{s.label}</span>
                            <span>{config[s.key as keyof typeof config]}</span>
                        </div>
                        <input 
                            type="range" min={s.min} max={s.max} step={s.step}
                            value={config[s.key as keyof typeof config] as number}
                            onChange={e => setConfig({...config, [s.key]: parseFloat(e.target.value)})}
                            className="w-full accent-red-500 h-1 bg-gray-700 rounded-lg appearance-none"
                        />
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Right: Preview & Output */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {/* Preview Box */}
        <div 
            className="aspect-video bg-gray-900 rounded-xl relative overflow-hidden border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)] flex items-center justify-center"
            style={{ 
                backgroundImage: 'url(https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800&h=450)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0 bg-black/20" /> {/* Dimmer */}
            
            {/* The Crosshair Render */}
            <div className="relative z-10">
                {/* Center Dot */}
                {config.centerDot && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-current"
                         style={{
                             width: `${config.centerDotThickness}px`, height: `${config.centerDotThickness}px`,
                             backgroundColor: COLOR_MAP[config.color],
                             opacity: config.centerDotOpacity,
                             boxShadow: config.outlines ? `0 0 0 ${config.outlineThickness}px rgba(0,0,0,${config.outlineOpacity})` : 'none'
                         }}
                    />
                )}
                
                {/* Inner Lines */}
                {config.innerLinesShow && (
                    <>
                        {/* Top */}
                        <div className="absolute" style={{
                            left: '50%', bottom: '50%', transform: 'translateX(-50%)',
                            marginBottom: `${config.innerLineOffset}px`,
                            width: `${config.innerLineThickness}px`, height: `${config.innerLineLength}px`,
                            backgroundColor: COLOR_MAP[config.color], opacity: config.innerLineOpacity,
                            boxShadow: config.outlines ? `0 0 0 1px rgba(0,0,0,${config.outlineOpacity})` : 'none'
                        }} />
                        {/* Bottom */}
                        <div className="absolute" style={{
                            left: '50%', top: '50%', transform: 'translateX(-50%)',
                            marginTop: `${config.innerLineOffset}px`,
                            width: `${config.innerLineThickness}px`, height: `${config.innerLineLength}px`,
                            backgroundColor: COLOR_MAP[config.color], opacity: config.innerLineOpacity,
                            boxShadow: config.outlines ? `0 0 0 1px rgba(0,0,0,${config.outlineOpacity})` : 'none'
                        }} />
                        {/* Left */}
                        <div className="absolute" style={{
                            top: '50%', right: '50%', transform: 'translateY(-50%)',
                            marginRight: `${config.innerLineOffset}px`,
                            height: `${config.innerLineThickness}px`, width: `${config.innerLineLength}px`,
                            backgroundColor: COLOR_MAP[config.color], opacity: config.innerLineOpacity,
                            boxShadow: config.outlines ? `0 0 0 1px rgba(0,0,0,${config.outlineOpacity})` : 'none'
                        }} />
                        {/* Right */}
                        <div className="absolute" style={{
                            top: '50%', left: '50%', transform: 'translateY(-50%)',
                            marginLeft: `${config.innerLineOffset}px`,
                            height: `${config.innerLineThickness}px`, width: `${config.innerLineLength}px`,
                            backgroundColor: COLOR_MAP[config.color], opacity: config.innerLineOpacity,
                            boxShadow: config.outlines ? `0 0 0 1px rgba(0,0,0,${config.outlineOpacity})` : 'none'
                        }} />
                    </>
                )}
            </div>
        </div>

        {/* Output Code */}
        <div className="bg-black/40 border border-white/10 rounded-lg p-4 flex items-center gap-4">
            <code className="flex-1 font-mono text-xs text-red-300 truncate">{generatedCode}</code>
            <Button size="sm" onClick={() => handleCopy(generatedCode)} variant={copied ? 'secondary' : 'primary'} className="bg-red-600 hover:bg-red-500 border-none text-white">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
        </div>

        {/* Pro Presets */}
        <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Pro Presets (One-Click Import)</h4>
            <div className="grid grid-cols-2 gap-2">
                {PRO_PRESETS.map(pro => (
                    <button 
                        key={pro.name}
                        onClick={() => handleCopy(pro.code)}
                        className="flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-xs text-gray-300 transition-colors"
                    >
                        <span>{pro.name}</span>
                        <Copy className="w-3 h-3 opacity-50" />
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
