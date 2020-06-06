import i18n from 'i18n-js';

export default function translate() {
  i18n.translations.en = {
    ...i18n.translations.en,
    add: 'Add'
  };
  i18n.translations.ru = {
    ...i18n.translations.ru,
    add: 'Добавить'
  }
} 
