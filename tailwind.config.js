/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#080a0f',
          900: '#0d1117',
          800: '#111827',
          700: '#1c2333',
          600: '#21262d',
        },
        cyan: {
          glow: '#00d4ff',
          dim: '#0ea5e9',
          muted: '#164e63',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'flow': 'flow 2s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00d4ff30' },
          '100%': { boxShadow: '0 0 25px #00d4ff80, 0 0 50px #00d4ff20' },
        },
        flow: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0,212,255,0.3)',
        'cyan-glow-lg': '0 0 40px rgba(0,212,255,0.4)',
        'panel': '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}