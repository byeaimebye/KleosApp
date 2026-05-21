/**
 * Kleos Color Palette
 * Single source of truth for all colors used in the app
 * Synced with tailwind.config.js
 */

export const colors = {
  // Base palette
  background: '#1a3a45', // dark teal
  card: 'rgba(15,23,42,0.6)', // frosted glass
  primary: '#c4ff0e', // lime green - highlights
  foreground: '#ffffff', // white text
  muted: '#9ca3af', // gray text
  border: '#1e3a4a',
  link: '#38bdf8', // cyan blue

  // Semantic colors
  success: '#65a30d', // green
  warning: '#fb923c', // orange
  danger: '#ef4444', // red

  // Training zones
  zone1: '#22d3ee', // cyan
  zone2: '#4ade80', // green
  zone3: '#c4ff0e', // lime
  zone4: '#fb923c', // orange
  zone5: '#ef4444', // red

  // Gradients (referenced but use in className)
  gradientFrom: '#4ade80',
  gradientTo: '#a3e635',

  // Input/UI backgrounds
  inputBg: 'rgba(30,41,59,0.5)', // dark slate
  inputBorder: 'rgba(255,255,255,0.1)',
};
