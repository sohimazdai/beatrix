import i18n from 'i18n-js';

export default function translate() {
  i18n.translations.en = {
    ...i18n.translations.en,
    charts: 'Charts',
    chart_period_day: 'Day',
    chart_period_month: 'Month' ,
    chart_period_three_month: 'Three month',
    chart_today: 'Today',
    chart_yesterday: 'Yesterday',
  };

  i18n.translations.ru = {
    ...i18n.translations.ru,
    charts: 'Графики',
    chart_period_day: 'День',
    chart_period_month: 'Месяц' ,
    chart_period_three_month: 'Три месяца',
    chart_today: 'Сегодня',
    chart_yesterday: 'Вчера',

  }
} 
