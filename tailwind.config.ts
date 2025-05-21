import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Indigo
          dark: '#3730A3',
          light: '#818CF8',
        },
        secondary: {
          DEFAULT: '#10B981', // Emerald
          dark: '#059669',
          light: '#34D399',
        },
        accent: {
          DEFAULT: '#F59E0B', // Amber
          dark: '#D97706',
          light: '#FBBF24',
        },
        background: {
          DEFAULT: '#0F172A', // Slate 900
          light: '#1E293B', // Slate 800
          dark: '#020617', // Slate 950
        },
        text: {
          DEFAULT: '#E2E8F0', // Slate 200
          muted: '#94A3B8', // Slate 400
          bright: '#F8FAFC', // Slate 50
        },
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'glow': '0 0 10px rgba(79, 70, 229, 0.5), 0 0 20px rgba(79, 70, 229, 0.3)',
        'quest': '0 0 15px rgba(16, 185, 129, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
