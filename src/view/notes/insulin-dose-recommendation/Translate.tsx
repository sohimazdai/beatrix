import i18n from 'i18n-js';

export default function translate() {
  i18n.translations.en = {
    ...i18n.translations.en,
    fill_out_your_diabetes_profile_for_recommendations: 'Fill out your diabetes profile for recommendations',
    enter_blood_glucose_value_to_get_recommendation: 'Enter blood glucose value to get recommendation',
    insulin_is_not_recommended: 'Insulin is not recommended',
    inject_insulin_after_meal: 'Inject insulin after meals. \n Recommended insulin value',
    restore_your_glucose_level_first: 'First restore your glucose level to normal',
    recommended_insulin_value: 'Recommended insulin value',

  };
  i18n.translations.ru = {
    ...i18n.translations.ru,
    fill_out_your_diabetes_profile_for_recommendations: 'Заполните диабетический профиль для получения рекомендаций',
    enter_blood_glucose_value_to_get_recommendation: 'Введите значение глюкозы, чтобы получить рекомендацию',
    insulin_is_not_recommended: 'Вводить инсулин не рекомендуется',
    inject_insulin_after_meal: 'Введите инсулин после еды. \nРекомендуемое значение инсулина',
    restore_your_glucose_level_first: 'Сначала восстановите свой уровень глюкозы',
    recommended_insulin_value: 'Рекомендуемое значение инсулина',

  }
} 
