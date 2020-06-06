import i18n from 'i18n-js';

export default function translate() {
  i18n.translations.en = {
    ...i18n.translations.en,
    sign_in: 'Sign in',
  };
  i18n.translations.ru = {
    ...i18n.translations.ru,
    sign_in: 'Авторизация',
  }
}
