import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {
  en,
  hn,
  od,
  tel,
  tml,
  bng,
  mal,
  marathi,
  punjabi,
  gujarati,
} from './translations';

const resources = {
  en: {
    translation: en,
  },
  hn: {
    translation: hn,
  },
  tml: {
    translation: tml,
  },
  tel: {
    translation: tel,
  },
  bng: {
    translation: bng,
  },
  od: {
    translation: od,
  },
  mal: {
    translation: mal,
  },
  marathi: {
    translation: marathi,
  },
  punjabi: {
    translation: punjabi,
  },
  gujarati: {
    translation: gujarati,
  },
};

i18next.use(initReactI18next).init({
  debug: false,
  lng: 'en',
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  resources,
});

export default i18next;
