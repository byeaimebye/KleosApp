// Los mocks de módulos se manejan via moduleNameMapper en jest.config.js
// react-i18next y @/i18n se mockean acá porque necesitan estar disponibles globalmente

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'es' },
  }),
  initReactI18next: { type: '3rdParty', init: jest.fn() },
}));
