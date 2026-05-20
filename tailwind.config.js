/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#1a3a45',
        primary: '#c4ff0e',
        card: 'rgba(15,23,42,0.6)',
        foreground: '#ffffff',
        muted: '#9ca3af',
        border: '#1e3a4a',
        link: '#38bdf8',
        success: '#65a30d',
        warning: '#fb923c',
        danger: '#ef4444',
        zone1: '#22d3ee',
        zone2: '#4ade80',
        zone3: '#c4ff0e',
        zone4: '#fb923c',
        zone5: '#ef4444',
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
};
