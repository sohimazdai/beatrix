import i18n from 'i18n-js';

export default function translate() {
  i18n.translations.en = {
    ...i18n.translations.en,
    continue_as: 'Continue as:'
  };
  i18n.translations.ru = {
    ...i18n.translations.ru,
    continue_as: 'Продолжить как:'
  }
} 
