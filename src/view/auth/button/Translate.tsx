import i18n from 'i18n-js';

export default function translate() {
  i18n.translations.en = {
    ...i18n.translations.en,
    sign_in_with_google: 'Sign in with Google',
  };
  i18n.translations.ru = {
    ...i18n.translations.ru,
    sign_in_with_google: 'Войти с Google',
  }
} 
