import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Default language requested by user
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      // we only want to detect initially, but the user explicitly requested to start originally in english.
      // So we can set fallbackLng to 'en', but if we want it to literally start in english regardless of browser,
      // we can set lng: 'en'. But using detector is better, we'll set order so it detects from localStorage first.
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

// Keep <html lang> in sync for screen readers and translation tools
document.documentElement.lang = i18n.resolvedLanguage ?? 'en';
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
