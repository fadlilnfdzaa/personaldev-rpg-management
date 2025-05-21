/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6C63FF', // Solo Leveling purple
          dark: '#5046E5',
          light: '#8A84FF',
        },
        secondary: {
          DEFAULT: '#00D7FE', // Solo Leveling blue
          dark: '#00B8D9',
          light: '#66E9FF',
        },
        accent: {
          DEFAULT: '#FF5757', // Solo Leveling red
          dark: '#E03C3C',
          light: '#FF8080',
        },
        background: {
          DEFAULT: '#0A0E1A', // Dark blue-black
          light: '#151C33', // Slightly lighter blue-black
          dark: '#050812', // Very dark blue-black
          card: 'rgba(21, 28, 51, 0.7)', // Transparent card background
        },
        text: {
          DEFAULT: '#E2E8F0', // Light gray
          muted: '#94A3B8', // Medium gray
          bright: '#F8FAFC', // Almost white
          glow: '#00D7FE', // Glowing blue text
        },
        status: {
          hp: '#FF5757', // Health
          mp: '#00D7FE', // Mana
          xp: '#6C63FF', // Experience
          strength: '#FF5757', // Strength stat
          agility: '#00D7FE', // Agility stat
          intelligence: '#6C63FF', // Intelligence stat
        },
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'glow': '0 0 10px rgba(79, 70, 229, 0.5), 0 0 20px rgba(79, 70, 229, 0.3)',
        'glow-blue': '0 0 10px rgba(0, 215, 254, 0.5), 0 0 20px rgba(0, 215, 254, 0.3)',
        'glow-red': '0 0 10px rgba(255, 87, 87, 0.5), 0 0 20px rgba(255, 87, 87, 0.3)',
        'quest': '0 0 15px rgba(16, 185, 129, 0.5)',
        'status-window': '0 0 0 1px rgba(108, 99, 255, 0.3), 0 0 15px rgba(108, 99, 255, 0.2)',
        'inner-border': 'inset 0 0 0 1px rgba(108, 99, 255, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'border-flow': 'border-flow 3s linear infinite',
        'status-bar': 'status-bar 1s ease-out forwards',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { opacity: 0.5, boxShadow: '0 0 5px rgba(0, 215, 254, 0.3)' },
          '100%': { opacity: 1, boxShadow: '0 0 15px rgba(0, 215, 254, 0.8)' }
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '400% 0%' }
        },
        'status-bar': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--value)' }
        }
      },
    },
  },
  plugins: [],
}