import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import es from './locales/es.json';

const resources = {
  es: { translation: es },
};

// Detect device language
const deviceLanguage = Localization.getLocales()[0].languageCode || 'es';
const defaultLanguage = ['es', 'en'].includes(deviceLanguage) ? deviceLanguage : 'es';

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
