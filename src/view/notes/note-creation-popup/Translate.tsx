import i18n from 'i18n-js';

export default function translate() {
  i18n.translations.en = {
    ...i18n.translations.en,
    glucose: 'Blood sugar',
    breadUnits: 'Carbohydrates',
    shortInsulin: 'Short-acting',
    longInsulin: 'Long-acting',
    comment: 'Comment',

    rewrite: 'Rewrite',
    write: 'Write',
    fill_at_least_one_parameter: 'Fill at least one parameter',
    delete: 'Delete',

    cancel: 'Cancel',
    not_selected: 'not selected',
    are_you_sure: 'Are you sure?',
    ok: 'OK',
  };
  i18n.translations.ru = {
    ...i18n.translations.ru,
    glucose: 'Глюкоза',
    breadUnits: 'ХЕ',
    shortInsulin: 'Короткий',
    longInsulin: 'Длинный',
    comment: 'Комментарий',

    write: 'Записать',
    rewrite: 'Перезаписать',
    fill_at_least_one_parameter: 'Введите хотя бы один параметр',
    delete: 'Удалить',

    cancel: 'Отмена',
    not_selected: 'не выбрано',
    are_you_sure: 'Вы уверены?',
    ok: 'OK',
  }
} 
