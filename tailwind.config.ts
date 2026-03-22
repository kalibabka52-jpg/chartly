import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          400: '#a78bfa',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#4f46e5',
          900: '#1e1b4b',
        },
        surface: '#f8f7ff',
        crypto: { DEFAULT: '#ec4899', light: '#f9a8d4' },
        teal:   { DEFAULT: '#0d9488', light: '#99f6e4' },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: { tight: '-0.03em' },
      lineHeight:    { relaxed: '1.7' },
      boxShadow: {
        brand:    '0 4px 16px rgba(124,58,237,0.08), 0 1px 4px rgba(124,58,237,0.04)',
        'brand-lg': '0 8px 32px rgba(124,58,237,0.14), 0 2px 8px rgba(124,58,237,0.06)',
        card:     '0 2px 12px rgba(30,27,75,0.06), 0 1px 3px rgba(30,27,75,0.04)',
      },
    },
  },
  plugins: [],
}
export default config
