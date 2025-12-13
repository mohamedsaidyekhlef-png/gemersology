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
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
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
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            h1: { color: theme('colors.white') },
            h2: { color: theme('colors.white') },
            h3: { color: theme('colors.white') },
            h4: { color: theme('colors.white') },
            strong: { color: theme('colors.brand.gold') },
            a: { color: theme('colors.brand.gold'), '&:hover': { color: theme('colors.white') } },
            blockquote: { borderLeftColor: theme('colors.brand.gold'), color: theme('colors.gray.400') },
            code: { color: theme('colors.brand.purple-light') },
            'thead th': { color: theme('colors.brand.gold') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
