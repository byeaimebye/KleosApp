/**
 * theme.ts — Design system compartido
 * Tipografía, radios, sombras y efectos reutilizables en toda la app.
 * Los colores viven en colors.ts — importar desde allí.
 */

import { StyleSheet } from 'react-native';
import { colors } from './colors';

// ─── Border radius ───────────────────────────────────────────────────────────
export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 32,
  full: 9999,
} as const;

// ─── Tipografía ──────────────────────────────────────────────────────────────
export const typography = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.foreground,
  },
  subheading: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.foreground,
  },
  body: {
    fontSize: 15,
    color: colors.foreground,
  },
  caption: {
    fontSize: 12,
    color: colors.muted,
  },
  link: {
    fontSize: 13,
    color: colors.link,
  },
  error: {
    fontSize: 12,
    color: colors.danger,
  },
});

// ─── Sombras ─────────────────────────────────────────────────────────────────
export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.75,
    shadowRadius: 24,
    elevation: 20,
  },
  glowGreen: {
    shadowColor: colors.gradientTo,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 10,
  },
} as const;
