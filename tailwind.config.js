/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#FFD700',       // Primary Accent (The 'G')
          'gold-dim': '#B39700', // Dimmer gold for borders
          purple: '#9D00FF',     // Secondary Accent (Shield/Controller)
          'purple-light': '#B84DFF',
          dark: '#0F0518',       // Deep Void Background
          darker: '#05010A',     // Almost black
          surface: '#1A0B2E',    // Card background
          'surface-highlight': '#251040', // Card hover
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, rgba(15, 5, 24, 0) 0%, #0F0518 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(26, 11, 46, 0.8) 0%, rgba(26, 11, 46, 0.4) 100%)',
        'gold-purple': 'linear-gradient(to right, #FFD700, #9D00FF)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 215, 0, 0.15)',
        'glow-purple': '0 0 20px rgba(157, 0, 255, 0.2)',
        'glow-hover': '0 0 30px rgba(255, 215, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
