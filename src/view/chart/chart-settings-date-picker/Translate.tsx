import i18n from 'i18n-js';

export default function translate() {
  i18n.translations.en = {
    ...i18n.translations.en,
    chart_update_date: 'Update date',
    chart_period_3_month: '3 month',
  };

  i18n.translations.ru = {
    ...i18n.translations.ru,
    chart_update_date: 'Обновить дату',
    chart_period_3_month: '3 месяца',
  }
} 
