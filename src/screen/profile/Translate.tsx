import i18n from 'i18n-js';

export default function translate() {
  i18n.translations.en = {
    ...i18n.translations.en,
    profile: 'Profile',
    diabetes_profile: 'Diabetic profile',
    about_diabetes_profile: 'Adjust your settings and improve diabetes compensation',
    log_out: 'Logout',
    log_out_hint: 'To use your notes, you need to log in to your account again.',
    leave: 'Leave',

    go_to: 'Go to',
  };
  i18n.translations.ru = {
    ...i18n.translations.ru,
    profile: 'Профиль',
    diabetes_profile: 'Диабетический профиль',
    about_diabetes_profile: 'Настройте ваши параметры и улучшите компенсацию',

    log_out: 'Выйти из аккаунта',
    log_out_hint: 'Чтобы использовать ваши записи необходимо будет зайти снова в ваш аккаунт',
    leave: 'Выйти',

    go_to: 'Перейти',
  }
} 
