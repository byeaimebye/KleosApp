/**
 * Predefined sports list — used in coach and athlete registration flows.
 * Add new sports here to extend the selection across all flows.
 */
export const SPORTS_LIST = [
  'Running',
  'Ciclismo',
  'Natación',
  'Triatlón',
  'Remo',
  'Gimnasio',
  'Funcional',
  'CrossFit',
  'Fútbol',
  'Tenis',
  'Yoga',
  'Pilates',
  'Boxeo',
  'MMA',
  'Escalada',
] as const;

export type Sport = (typeof SPORTS_LIST)[number];
