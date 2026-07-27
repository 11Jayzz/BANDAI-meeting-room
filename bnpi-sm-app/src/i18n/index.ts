import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { APP_CONFIG } from '@/config/app.config';
import { defaultNS, resources } from '@/i18n/resources';

void i18n.use(initReactI18next).init({
  resources,
  lng: APP_CONFIG.defaultLocale,
  fallbackLng: APP_CONFIG.defaultLocale,
  defaultNS,
  ns: ['common', 'nav', 'home'],
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

export { i18n };
export default i18n;
