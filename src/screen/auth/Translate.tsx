import i18n from 'i18n-js';

export default function translate() {
  i18n.translations.en = {
    ...i18n.translations.en,
    looking_for_active_session: 'Looking for active session',
  };
  i18n.translations.ru = {
    ...i18n.translations.ru,
    looking_for_active_session: 'Поиск активной сессии',
  }
} 
