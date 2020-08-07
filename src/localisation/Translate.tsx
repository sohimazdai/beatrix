import i18n from 'i18n-js';
import { logger } from '../app/Logger';

export function setLocale(countryCode) {
  logger(`CountryCode is ${countryCode}`);

  switch (countryCode) {
    case 'es': i18n.locale = 'es';
      break;
    case 'ru': i18n.locale = 'ru';
      break;
    default: i18n.locale = 'en';
  }
}

export function getLocale() {
  console.log('🤖🤖🤖🤖 i18n.locale;', i18n.locale);
  return i18n.locale;
}

export function i18nGet(key: string) {
  return i18n.t(key);
}

export default function translate() {
  const translations = {};

  Object.keys(translateStore).map(phraseKey => {
    const phraseTranslations = translateStore[phraseKey];
    Object.keys(phraseTranslations).map(localeKey => {
      const localePhrase = phraseTranslations[localeKey];
      if (!translations[localeKey]) translations[localeKey] = {};
      translations[localeKey][phraseKey] = localePhrase;
    })
  });

  i18n.translations = translations;
}

const translateStore = {
  // AUTH
  looking_for_active_session: {
    en: 'Looking for active session',
    es: 'Buscando sesión activa',
    ru: 'Поиск активной сессии',
  },
  continue_as: {
    en: 'Continue as:',
    es: 'Continuar como:',
    ru: 'Продолжить как:',
  },
  sign_in_with_google: {
    en: 'Sign in with Google',
    es: 'Entrar con Google',
    ru: 'Войти с Google',
  },
  sign_in: {
    en: 'Sign in',
    es: 'Iniciar sesión',
    ru: 'Авторизация',

  },
  // NOTES
  notes: {
    en: 'Notes',
    es: 'Notas',
    ru: 'Записи',
  },

  today: {
    en: 'Today',
    es: 'Hoy',
    ru: 'Сегодня',
  },
  yesterday: {
    en: 'Yesterday',
    es: 'Ayer',
    ru: 'Вчера',
  },

  january: {
    en: 'january',
    es: 'enero',
    ru: 'января',
  },
  february: {
    en: 'february',
    es: 'febrero',
    ru: 'февраля',
  },
  march: {
    en: 'march',
    es: 'marzo',
    ru: 'марта',
  },
  april: {
    en: 'april',
    es: 'abril',
    ru: 'апреля',
  },
  may: {
    en: 'may',
    es: 'mayo',
    ru: 'мая',
  },
  june: {
    en: 'june',
    es: 'junio',
    ru: 'июня',
  },
  july: {
    en: 'july',
    es: 'julio',
    ru: 'июля',
  },
  august: {
    en: 'august',
    es: 'agosto',
    ru: 'августа',
  },
  september: {
    en: 'september',
    es: 'septiembre',
    ru: 'сентября',
  },
  october: {
    en: 'october',
    es: 'octubre',
    ru: 'октября',
  },
  november: {
    en: 'november',
    es: 'noviembre',
    ru: 'ноября',
  },
  december: {
    en: 'december',
    es: 'diciembre',
    ru: 'декабря',
  },

  january_capital_infinitive: {
    en: 'January',
    es: 'Enero',
    ru: 'Январь',
  },
  february_capital_infinitive: {
    en: 'February',
    es: 'Febrero',
    ru: 'Февраль',
  },
  march_capital_infinitive: {
    en: 'March',
    es: 'Marzo',
    ru: 'Март',
  },
  april_capital_infinitive: {
    en: 'April',
    es: 'Abril',
    ru: 'Апрель',
  },
  may_capital_infinitive: {
    en: 'May',
    es: 'Mayo',
    ru: 'Май',
  },
  june_capital_infinitive: {
    en: 'June',
    es: 'Junio',
    ru: 'Июнь',
  },
  july_capital_infinitive: {
    en: 'July',
    es: 'Julio',
    ru: 'Июль',
  },
  august_capital_infinitive: {
    en: 'August',
    es: 'Agosto',
    ru: 'Август',
  },
  september_capital_infinitive: {
    en: 'September',
    es: 'Septiembre',
    ru: 'Сентябрь',
  },
  october_capital_infinitive: {
    en: 'October',
    es: 'Octubre',
    ru: 'Октябрь',
  },
  november_capital_infinitive: {
    en: 'November',
    es: 'Noviembre',
    ru: 'Ноябрь',
  },
  december_capital_infinitive: {
    en: 'December',
    es: 'Diciembre',
    ru: 'Декабрь',
  },

  january_capital_short: {
    en: 'Jan',
    es: 'Ene',
    ru: 'Янв',
  },
  february_capital_short: {
    en: 'Feb',
    es: 'Feb',
    ru: 'Фев',
  },
  march_capital_short: {
    en: 'Mar',
    es: 'Mar',
    ru: 'Мар',
  },
  april_capital_short: {
    en: 'Apr',
    es: 'Abr',
    ru: 'Апр',
  },
  may_capital_short: {
    en: 'May',
    es: 'May',
    ru: 'Май',
  },
  june_capital_short: {
    en: 'Jun',
    es: 'Jun',
    ru: 'Июн',
  },
  july_capital_short: {
    en: 'Jul',
    es: 'Jul',
    ru: 'Июл',
  },
  august_capital_short: {
    en: 'Aug',
    es: 'Ago',
    ru: 'Авг',
  },
  september_capital_short: {
    en: 'Sep',
    es: 'Sep',
    ru: 'Сен',
  },
  october_capital_short: {
    en: 'Oct',
    es: 'Oct',
    ru: 'Окт',
  },
  november_capital_short: {
    en: 'Nov',
    es: 'Nov',
    ru: 'Нояб',
  },
  december_capital_short: {
    en: 'Dec',
    es: 'Dic',
    ru: 'Дек',
  },

  show_more: {
    en: 'Show more',
    es: 'Mostrar más',
    ru: 'Показать больше',
  },
  notes_not_found: {
    en: 'Notes not found... Lets write a new one!',
    es: 'Sin notas',
    ru: 'Записей не найдено... Давайте добавим!',
  },

  fill_out_your_diabetes_profile_for_recommendations: {
    en: 'Fill out your diabetes profile for recommendations',
    es: 'Complete su perfil de diabetes para obtener recomendaciones',
    ru: 'Заполните диабетический профиль для получения рекомендаций',
  },
  enter_blood_glucose_value_to_get_recommendation: {
    en: 'Enter blood glucose value to get recommendation',
    es: 'Ingrese el valor de glucosa para obtener la recomendación',
    ru: 'Введите значение глюкозы, чтобы получить рекомендацию',
  },
  insulin_is_not_recommended: {
    en: 'Insulin is not recommended',
    es: 'No se recomienda inyectar insulina',
    ru: 'Вводить инсулин не рекомендуется',
  },

  inject_insulin_after_meal: {
    en: 'Inject insulin after meals. \n Recommended insulin value',
    es: 'Inyecta insulina después de la comida. \nValor recomendado de insulina',
    ru: 'Введите инсулин после еды. \nРекомендуемое значение инсулина',
  },
  restore_your_glucose_level_first: {
    en: 'First restore your glucose level to normal',
    es: 'Primero restaure su nivel de glucosa',
    ru: 'Сначала восстановите свой уровень глюкозы',
  },
  recommended_insulin_value: {
    en: 'Recommended insulin value',
    es: 'Valor recomendado de insulina',
    ru: 'Рекомендуемое значение инсулина',
  },

  add: {
    en: 'Add',
    es: 'Añadir',
    ru: 'Добавить',
  },

  glucose: {
    en: 'Blood sugar',
    es: 'Glucosa',
    ru: 'Глюкоза',
  },
  breadUnits: {
    en: 'Carbohydrates',
    es: 'Racion de HC',
    ru: 'ХЕ',
  },
  insulin: {
    en: 'Short-acting',
    es: 'Insulina ultra rápida',
    ru: 'Короткий',
  },
  longInsulin: {
    en: 'Long-acting',
    es: 'Insulina prolongada',
    ru: 'Длинный',
  },
  comment: {
    en: 'Comment',
    es: 'Сomentarios',
    ru: 'Комментарий',
  },

  write: {
    en: 'Write',
    es: 'Escribir',
    ru: 'Записать',
  },
  rewrite: {
    en: 'Rewrite',
    es: 'Sobrescribir',
    ru: 'Перезаписать',
  },
  fill_at_least_one_parameter: {
    en: 'Fill at least one parameter',
    es: 'Ingrese al menos un parámetro',
    ru: 'Введите хотя бы один параметр',
  },
  delete: {
    en: 'Delete',
    es: 'Eliminar',
    ru: 'Удалить',
  },
  carb_gram: {
    en: 'grams',
    es: 'gramos',
    ru: 'грамм',
  },
  carbs_units: {
    en: 'units',
    es: 'Racion de HC',
    ru: 'ХЕ',
  },

  // CHARTS
  charts: {
    en: 'Charts',
    es: 'Gráficos',
    ru: 'Графики',
  },
  chart_period_day: {
    en: 'Day',
    es: 'Día',
    ru: 'День',
  },
  chart_period_month: {
    en: 'Month',
    es: 'Mes',
    ru: 'Месяц',
  },
  chart_period_three_month: {
    en: 'Three month',
    es: 'Tres meses',
    ru: 'Три месяца',
  },
  chart_today: {
    en: 'Today',
    es: 'Hoy',
    ru: 'Сегодня',
  },
  chart_yesterday: {
    en: 'Yesterday',
    es: 'Ayer',
    ru: 'Вчера',
  },
  chart_period: {
    en: 'Period',
    es: 'Período',
    ru: 'Период',
  },
  chart_period_3_month: {
    en: '3 month',
    es: '3 meses',
    ru: '3 месяца',
  },
  chart_update_date: {
    en: 'Update date',
    es: 'Cambiar fecha',
    ru: 'Обновить дату',
  },

  info_day_chart: {
    en: 'Day chart',
    es: 'Gráfico del dia',
    ru: 'Дневной график',
  },
  info_month_chart: {
    en: 'Month chart',
    es: 'Gráfico del mes',
    ru: 'Месячный график',
  },
  info_three_month_chart: {
    en: 'Three month chart',
    es: 'Gráfico de tres meses',
    ru: 'Трехмесячный график',
  },

  info_day_chart_part_1: {
    en: 'Charts visualize the spreading of blood sugar, insulin and carbohydrates throughout the day. ' +
      "As you know, blood sugar increases with food intake and decreases with insulin.",
    es: "Los gráficos visualizan la distribución de azúcar en sangre, insulina y Racion de HC a lo largo del día. " +
      "Como saben, el azúcar en la sangre aumenta con la ingesta de alimentos y disminuye con la insulina..",
    ru: "Графики визуализируют распределение сахара крови, инсулина и ХЕ в течение дня. " +
      "Как известно, сахар крови повышается с принятием пищи и понижается с введением инсулина.",
  },
  info_day_chart_part_2: {
    en: 'The graph of blood glucose (in the middle) is an indicator of the correctness of the selected dose for each specific time of day. ' +
      'If you notice systematically repeated spikes in blood sugar, consult your doctor to adjust your dose of short or long-acting insulin.',
    es: "El gráfico de glucosa en sangre (en el medio) es un indicador de la exactitud de la dosis seleccionada para cada momento específico del día. " +
      "Si nota un aumento sistemático repetido en el azúcar en la sangre, consulte a su médico para ajustar la dosis de insulina corta o larga.",
    ru: "График глюкозы крови(посередине) является показателем корректности подобранной дозы для каждого конкретного времени дня. " +
      "Если вы замечаете систематически повторяющиеся скачки сахара крови - обратитесь к врачу для корректировки дозы короткого или пролонгированного инсулина.",
  },
  info_day_chart_part_3: {
    en: "The graph of insulin (above) approximately reflects the distribution of short insulin in the body during the day. If 4 hours have not passed since the last injection, the mechanism of summation of the injected insulin can be observed. " +
      "When summarizing active insulins, the risk of hypoclycemia increases! In addition, find out the maximum permissible dose of insulin from the endocrinologist and try not to exceed it, including in cases of summation.",
    es: "El gráfico de insulina (arriba) refleja aproximadamente la distribución de insulina corta en el cuerpo durante el día. En el caso de que no hayan pasado 4 horas desde la última inyección, puede observar el mecanismo de aplicación de insulina." +
      "Al aplicar insulinas activas, ¡aumenta el riesgo de hipoclucemia! También solicite a su endocrinólogo la dosis máxima aceptable de insulina y trate de no excederla, incluso en el caso de la aplicación.",
    ru: "График инсулина(сверху) приблизительно отражает распределение короткого инсулина в организме в течение дня. В случае, когда с последней инъекции не прошло 4 часов, вы можете наблюдать механизм наложения введенного инсулина. " +
      "При наложении действующих инсулинов повышается опасность возникновения гипокликемии! Так же узнайте у врача-эндокринолога вашу максимально приемлемую дозировку инсулина и старайтесь не превышать её, в том числе, в случая наложения.",
  },
  info_day_chart_part_4: {
    en: 'The insulin graph values are directed downward, reflecting the opposite direction with the carbohydrate graph.',
    es: 'Los valores del gráfico de insulina se presionan hacia abajo, lo que refleja la dirección opuesta con el gráfico de unidades de pan',
    ru: 'Значения графика инсулина отложены вниз, что отражает противонаправленность с графиком хлебных единиц',
  },
  info_day_chart_part_5: {
    en: 'The graph of carbohydrates (bottom) is an average picture of the absorption of carbohydrates in the blood. Ask your endocrinologist about your maximum portion of carbohydrates and always try to keep within the prescribed limits.',
    es: 'El gráfico de Racion de HC (abajo) muestra promedio de la absorción de carbohidratos en la sangre.Consulte con su endocrinólogo cuál es la porción máxima de carbohidratos y siempre trate de mantenerse dentro de los límites prescritos',
    ru: 'График хлебных единиц(снизу) является усредненной картиной всасывания углеводов в кровь. Узнайте у врача-эндокринолога вашу максимальную порцию углеводов и старайтесь всегда укладываться в заданные рамки.',
  },

  info_month_chart_part_1: {
    en: "On the monthly chart, the dots show the average levels of blood sugar, insulin and carbohydrates for the corresponding day.",
    es: "En el gráfico mensual, los puntos muestran el promedio de azúcar en sangre, isulina y Racion de HC para el día correspondiente.",
    ru: "На месячном графике точками показаны средние показатели сахара крови, иснулина и ХЕ за соотвествующий день.",
  },
  info_month_chart_part_2: {
    en: "Red vertical lines indicate the weekend. You can notice a systematic increase and decrease in sugar on different days of the week and analyze the cause of such jumps.",
    es: "Las líneas verticales rojas indican los fines de semana. Puede notar aumentos y disminuciones sistemáticos de azúcar en diferentes días de la semana y analizar la causa de tales saltos.",
    ru: "Красными вертикальными линиями показаны выходные дни. Вы можете заметить систематические повышения и снижения сахара в различные дни недели и проанализировать причину таких скачков.",
  },

  info_three_month_chart_part_1: {
    en: 'Points are average values per unit of time. On a three-month chart, the unit of time is a week.',
    es: 'Los puntos son valores promedio por unidad de tiempo. En un gráfico de tres meses, la unidad de tiempo es una semana.',
    ru: 'Точки - средние значения за единицу времени. На трехмесячном графике единицей времени является неделя.',
  },
  info_three_month_chart_part_2: {
    en: 'Keep track of the seasonal distribution of blood glucose. You can determine the systematic jumps in sugar and correlate with a certain period of life. For example, vacation, illness, diet, or any specific period of life. Next time you may be better prepared for the same situation.',
    es: 'Observe el patrón estacional de distribución de glucosa en sangre. Puede determinar los saltos sistemáticos en el azúcar y correlacionarlos con un cierto período de vida. Por ejemplo, vacaciones, enfermedad, dieta o cualquier período específico de la vida. La próxima vez puede estar un poco mejor preparado para la misma situación.',
    ru: 'Наблюдайте за сезонным харакетром распределения глюкозы в крови. Вы можете определить систематические скачки сахара и соотнести с определенным периодом жизни. Например, отпуском, болезнью, диетой или любым специфическим периодом жизни. В следующий раз вы сможете быть подготовленным к такой же ситуации немного лучше.',
  },

  // PROFILE
  profile: {
    en: 'Profile',
    es: 'Perfil',
    ru: 'Профиль',
  },
  diabetic_profile: {
    en: 'Diabetic profile',
    es: 'Perfil diabético',
    ru: 'Диабетический профиль',
  },
  about_diabetes_profile: {
    en: 'Adjust your settings and improve diabetes compensation',
    es: 'Ajuste su configuración y mejore la compensación',
    ru: 'Настройте ваши параметры и улучшите компенсацию',
  },
  log_out: {
    en: 'Logout',
    es: 'Cerrar sesión',
    ru: 'Выйти из аккаунта',
  },
  log_out_hint: {
    en: 'To use your notes, you need to log in to your account again.',
    es: 'Para usar sus notas, deberá iniciar sesión nuevamente en su cuenta.',
    ru: 'Чтобы использовать ваши записи необходимо будет зайти снова в ваш аккаунт',
  },
  leave: {
    en: 'Leave',
    es: 'Salir',
    ru: 'Выйти',
  },

  ['mg/dL']: {
    en: 'mg\u2060/\u2060dL',
    es: 'mg\u2060/\u2060dL',
    ru: 'мг\u2060/\u2060дл',
  },
  ['mg/dL_long']: {
    en: 'milligrams per deciliter',
    es: 'miligramo por decilitro',
    ru: 'миллиграмм на децилитр',
  },
  ['mmol/L']: {
    en: 'mmol\u2060/\u2060L',
    es: 'mmol\u2060/\u2060l',
    ru: 'ммоль\u2060/\u2060л',
  },
  ['mmol/L_long']: {
    en: 'millimole per liter',
    es: 'milimoles por litro',
    ru: 'миллимоль на литр',
  },

  go_to: {
    en: 'Go to',
    es: 'ir',
    ru: 'Перейти',
  },

  target_glycemia: {
    en: 'Target glycemia',
    es: 'Glucemia objetivo',
    ru: 'Целевая гликемия',
  },
  target_glycemia_description: {
    en: 'Enter your blood sugar target',
    es: "Indica tu objetivo de azúcar en sangre",
    ru: "Укажите целевое значение сахара крови",
  },

  glycemia_unit: {
    en: 'Glycemia unit',
    es: 'Unidad de glucemia',
    ru: 'Система измерений глюкометра',
  },
  glycemia_unit_description: {
    en: 'Select which blood sugar measurement system you use',
    es: 'Indique qué sistema de medición de azúcar en la sangre usa.',
    ru: 'Укажите какой системой измерений сахара крови вы пользуетесь',
  },

  carb_unit_title: {
    en: 'Carbohydrates unit',
    es: 'Sistema de conteo de carbohidratos',
    ru: 'Система подсчета углеводов',
  },

  carb_unit_description: {
    en: 'Indicate which carbohydrate counting system you use',
    es: 'Indique qué sistema de conteo de carbohidratos usa',
    ru: 'Укажите какой системой подсчета углеводов вы пользуетесь',
  },

  breadUnits_measuring: {
    en: 'Carbs unit (10-12 grams)',
    es: 'Racion de HC(10-12 gramos)',
    ru: 'ХЕ',
  },
  carbohydrates_measuring: {
    en: 'Carbohydrates in grams',
    es: 'Carbohidratos en gramos',
    ru: 'Углеводы в граммах',
  },

  carb_unit_weight_title: {
    en: 'Amount of carbohydrates in carbs unit',
    es: 'Cantidad de carbohidratos en Racion de HC',
    ru: 'Количество углеводов в ХЕ',
  },
  carb_unit_weight_description: {
    en: 'Select the weight of the carbs unit of the system you are using',
    es: 'Especifique la cantidad de carbohidratos en Racion de HC que usa al calcular',
    ru: 'Укажите количество углеводов в ХЕ, которые вы используете при подсчете',
  },

  shedule_since: {
    en: 'Since(h)',
    es: 'De (horas)',
    ru: 'С(часов)',
  },
  shedule_until: {
    en: 'Until(h)',
    es: 'Hasta (horas)',
    ru: 'До(часов)',
  },
  shedule_value: {
    en: 'Value',
    es: 'Valor:',
    ru: 'Значение',
  },

  shedule_change: {
    en: 'Change',
    es: 'Editar',
    ru: 'Изменить',
  },
  shedule_add: {
    en: 'Add',
    es: 'Añadir',
    ru: 'Добавить',
  },
  shedule_clear: {
    en: 'Clear',
    es: 'Borrar',
    ru: 'Стереть',
  },

  insulin_sensitivity_factor: {
    en: 'Insulin sensitivity factor (ISF)',
    es: 'Factor de sensibilidad a la insulina (FSI)',
    ru: 'Фактор чувствительности к инсулину (ФЧИ)',
  },
  insulin_sensitivity_factor_description: {
    en: 'Insulin sensitivity factor, or correction factor, refers to the number of %glycemia_type% by which blood sugar levels fall when a person takes 1 unit of insulin',
    es: 'Muestra cuántos  %glycemia_type%  de glucosa en sangre disminuirá con la introducción de 1 unidad. insulina ultrarrápida ',
    ru: 'Показывает, на сколько %glycemia_type% понизится глюкоза крови при введении 1 ед. ультракороткого инсулина',
  },
  insulin_sensitivity_factor_hint: {
    en: 'Define IFS for various time periods',
    es: 'Especifique el FSI para varios períodos de tiempo',
    ru: 'Укажите ФЧИ для различных промежутков времени',
  },

  insulin_to_carb_rate: {
    en: 'Insulin-to-carb ratio',
    es: 'Relación insulina a carbohidratos',
    ru: 'Углеводный коэффициент (УК)',
  },
  insulin_to_carb_rate_description: {
    en: 'The coefficient shows the amount of %breadUnits_type% absorbed by 1 unit of insulin',
    es: 'Muestra la cantidad de %breadUnits_type% absorbidos por 1 unidad de insulina.',
    ru: 'Показывает количество %breadUnits_type%, усваиваемых 1 единицей инсулина',
  },
  insulin_to_carb_rate_hint: {
    en: 'Define insulin-to-carb for various time periods',
    es: 'Indique su relación insulina a carbohidratos durante varios períodos de tiempo.',
    ru: 'Укажите ваш УК для различных промежутков времени',
  },
  carbohydrates_parent_case: {
    en: 'carbohydrates',
    es: 'carbohidratos',
    ru: 'углеводов',
  },
  breadUnits_parent_case: {
    en: 'carbs units',
    es: 'Racion de HC',
    ru: 'ХЕ',
  },

  since: {
    en: 'since',
    es: 'de',
    ru: 'с',
  },
  until: {
    en: 'until',
    es: 'antes de',
    ru: 'до',
  },
  save: {
    en: 'Save',
    es: 'Guardar',
    ru: 'Сохранить',
  },
  need_to_fill_time_period: {
    en: 'Time gaps required',
    es: 'Rellene los espacios de tiempo',
    ru: 'Необходимо заполнить временные промежутки',
  },

  profile_change: {
    en: 'Change',
    es: 'Editar',
    ru: 'Изменить',
  },
  profile_apply: {
    en: 'Apply',
    es: 'Aplicar',
    ru: 'Применить',
  },

  glycemia_settings: {
    en: 'Glycemia settings',
    es: 'Configuraciones de glucemia',
    ru: 'Настройки сахара крови',
  },
  glycemia_settings_description: {
    en: 'Change your target glycemia and type of measurement for your meter',
    es: 'Cambie su glucemia objetivo y el tipo de medida para su medidor',
    ru: 'Измените целевую гликемию и тип измерений вашего глюкометра',
  },
  carbohydrates_settings: {
    en: 'Carbs settings',
    es: 'Сonfiguraciones de contabilidad de carbohidratos',
    ru: 'Параметры учета углеводов',
  },
  carbohydrates_settings_description: {
    en: 'Indicate how you count carbohydrates',
    es: 'Indica como cuentas los carbohidratos',
    ru: 'Укажите как вы считаете углеводы',
  },
  insulin_settings: {
    en: 'Insulin parameters',
    es: 'Parámetros de insulina',
    ru: 'Параметры инсулина',
  },

  insulin_settings_description: {
    en: "Fill out and use your doctor's recommended dosage of insulin when creating notes",
    es: 'Indica su insulina recomendada "para bajar el azúcar en la sangre" и "cantidad para comer"',
    ru: 'Укажите ваш рекомендуемый инсулин "на понижение" и "на еду"',
  },

  we_will_recalculating_your_notes: {
    en: 'App will recalculate your data',
    es: 'Contamos sus datos',
    ru: 'Мы пересчитаем ваши данные',
  },
  its_need_to_fit: {
    en: 'It is need to fit the new measurement system',
    es: 'Esto es necesario para cumplir con el nuevo sistema de medición.',
    ru: 'Это необходимо для соответствия новой системе измерений',
  },
  please_do_not_close_app: {
    en: 'Please do not close the application! It does not take much time',
    es: '¡Por favor no cierre la aplicación! No toma mucho tiempo',
    ru: 'Пожалуйста, не закрывайте приложение! Это не займет много времени',
  },

  // GENERAL
  cancel: {
    en: 'Cancel',
    es: 'Cancelar',
    ru: 'Отмена',
  },
  not_selected: {
    en: 'not selected',
    es: 'No seleccionado',
    ru: 'не выбрано',
  },
  are_you_sure: {
    en: 'Are you sure?',
    es: 'Está seguro?',
    ru: 'Вы уверены?',
  },

  ok: {
    en: 'OK',
    es: 'OK',
    ru: 'OK',
  },
  yes: {
    en: 'Yes',
    es: 'Si',
    ru: 'Да',
  },
  got_it: {
    en: 'Ok. Got it',
    es: 'Entendido',
    ru: 'Ок, понятно',
  },


  active_network_needed: {
    en: 'You need to connect to the internet',
    es: 'Se necesita red activa',
    ru: 'Необходимо интернет-соединение',
  },
  server_is_not_available_try_to_restart_app: {
    en: 'Server is currently unavailable. Try restarting the application.',
    es: 'El servidor no está disponible actualmente. Intenta reiniciar la aplicación.',
    ru: 'В данный момент сервер недоступен. Попробуйте перезапустить приложение.',
  },
  no_data_for_the_period: {
    en: 'There is no data for the period',
    es: 'No hay datos para el período',
    ru: 'Нет данных за данный период',
  },

  //ERROR
  user_properties_changing_error: {
    en: 'Error changing user settings',
    es: 'Error al cambiar la configuración del usuario',
    user_properties_changing_error: 'Ошибка при изменении параметров пользователя',
  },
  shedule_sync_error: {
    en: 'Error synchronizing schedule with server',
    es: 'Error al sincronizar la programación con el servidor',
    shedule_sync_error: 'Ошибка синхронизации расписания с сервером',
  },
  sync_error: {
    en: 'Error synchronizing with server',
    es: 'Error al sincronizar con el servidor',
    ru: 'Ошибка при синхронизации с сервером',
  },
  note_updating_error: {
    en: 'Error updating record on server',
    es: 'Error al actualizar el registro en el servidor',
    ru: 'Ошибка обновления записи на сервере',
  },

  notes_sync_error: {
    en: 'Error synchronizing records with the server',
    es: 'Error al sincronizar registros con el servidor',
    ru: 'Ошибка синхронизации записей с сервером',
  },
  notes_deleting_error: {
    en: 'Error deleting record from server',
    es: 'Error al eliminar el registro del servidor',
    ru: 'Ошибка удаления записи с сервера',
  },
  notes_creating_error: {
    en: 'Error creating server record',
    es: 'Error al crear el registro del servidor',
    ru: 'Ошибка создания записи на сервер',
  },
  google_auth_error: {
    en: 'Login failed',
    es: 'Error de inicio de sesion',
    ru: 'Войти не удалось',
  },
  export_error: {
    en: 'Export error',
    es: 'Error de exportación',
    ru: 'Ошибка экспорта',
  },
  onboarding_complete_error: {
    'en': 'An error occurred while saving the entered data. You can try again in settings. We apologize',
    'es': 'Se produjo un error al guardar los datos ingresados. Puedes volver a intentarlo en la configuración. Pedimos disculpas',
    'ru': 'Произошла ошибка при сохранении введенных данных. Вы можете повторить загрузку в настройках. Приносим свои извинения',
  },

  // DASHBOARD
  compensation: {
    en: 'Compensation',
    es: 'Сompensación',
    ru: 'Компенсация',
  },
  last_notes: {
    en: 'Recent notes',
    es: 'Ultimas notas',
    ru: 'Последние записи',
  },
  no_recent_notes_today: {
    en: 'No notes yet today',
    es: 'No hay registros para hoy',
    ru: 'Нет записей за сегодняшний день',
  },
  glucose_chart: {
    en: 'Glucose chart',
    es: 'Gráfico de glucosa',
    ru: 'График глюкозы',
  },
  rest_active_insulin: {
    en: 'Active insulin',
    es: 'Insulina activa',
    ru: 'Действующий инсулин',
  },
  expires_in: {
    en: 'Expires in',
    es: 'Expira en',
    ru: 'Истекает через',
  },
  minutes_short: {
    en: 'min',
    es: 'min',
    ru: 'мин',
  },
  hours_short: {
    en: 'h',
    es: 'h',
    ru: 'ч',
  },
  statistics_today: {
    en: 'Today',
    es: 'Hoy',
    ru: 'Сегодня',
  },
  statistics_yesterday: {
    en: 'Yesterday',
    es: 'Ayer',
    ru: 'Вчера',
  },
  statistics_last_month: {
    en: 'Last month',
    es: 'El mes pasado',
    ru: 'Последний месяц',
  },
  statistics_last_three_month: {
    en: 'Last three month',
    es: 'Últimos tres meses',
    ru: 'Последние три месяца',
  },

  breadUnits_long: {
    en: 'Carbs units',
    es: 'Racion de HC',
    ru: 'Хлебные единицы',
  },
  carbohydrates_long: {
    en: 'Carbohydrates',
    es: 'Carbohidratos',
    ru: 'Углеводы',
  },
  one_bread_unit_contents: {
    en: '.\nCarbs unit contents %number% grams of carbohydrates.',
    es: '.\n1 Racion de HC contiene %number% gramos de carbohidratos.',
    ru: '.\nОдна ХЕ содержит %number% грамм углеводов.',
  },

  hypoglycemia_count: {
    en: 'Hypoglycemia',
    es: 'Hipoglucemia',
    ru: 'Гипогликемия',
  },
  hyperglycemia_count: {
    en: 'Hyperglycemia',
    es: 'Hiperglucemia',
    ru: 'Гипергликемия',
  },
  normalglycemia_count: {
    en: 'Normal sugar',
    es: 'Norma',
    ru: 'Норма',
  },

  glucose_icon_tooltip: {
    en: 'Blood glucose. Measured in %measure%.\nTarget glycemia is %target% %measure%.\nNormal sugar is between %min% and %max%.',
    es: 'Glucosa en sangre.Se mide en %measure%.\nGlucemia objetivo indicada como %target% %measure%.\nNorma que va desde %min% hasta %max%.',
    ru: 'Глюкоза крови. Измеряется в %measure%.\nЦелевая гликемия указана как %target% %measure%.\nНорма в пределах от %min% до %max%.',
  },
  breadunits_icon_tooltip: {
    en: '%type%%for_bu%',
    es: '%type%%for_bu%',
    ru: '%type%%for_bu%',
  },
  note_date_and_time: {
    en: 'Note time',
    es: 'Tiempo de creación de nota',
    ru: 'Время записи',
  },
  short_insulin_icon_tooltip: {
    en: 'Ultra short-acting Insulin',
    es: 'Insulina de acción ultrarapida',
    ru: 'Инсулин ультракороткого действия',
  },
  long_insulin_icon_tooltip: {
    en: 'Long-acting insulin',
    es: 'Insulina de acción prolongada',
    ru: 'Инсулин пролонгированного действия',
  },

  your_hba1c: {
    en: 'HbA1c',
    es: 'HbA1c',
    ru: 'HbA1c',
  },
  glycated_hemoglobin: {
    en: 'Glycated hemoglobin',
    es: 'Hemoglobina glicada',
    ru: 'Гликированный гемоглобин',
  },
  calculated_days: {
    en: 'Calculated days',
    es: 'Cantidad de dias',
    ru: 'Количество дней',
  },
  calculate: {
    en: 'Calculate',
    es: 'Calcular',
    ru: 'Рассчитать',
  },
  too_little_data_for_advanced_analys: {
    en: 'Too little data for accurate analysis.',
    es: 'Muy pocos datos para un análisis preciso.',
    ru: 'Слишком мало данных для точного анализа.',
  },
  glucose_not_found_for_diagram: {
    en: 'No glucose data to display diagram',
    es: 'No hay datos de glucosa disponibles para mostrar el gráfico',
    ru: 'Нет данных для глюкозы, чтобы отобразить диаграмму',
  },

  // EXPORT
  export_data: {
    en: 'Data export',
    es: 'Exportación de datos',
    ru: 'Экспорт данных',
  },
  export_data_description: {
    en: 'Create report about your diabetes in the .XLSX extention. Open it with EXCEL',
    es: 'Crear informes de registros en formato .XLSX. Ábrelos en EXCEL',
    ru: 'Создавайте отчеты о записях в формате .XLSX. Открывайте их в EXCEL',
  },

  export_data_creating: {
    en: 'Creating export',
    es: 'Crear exportación',
    ru: 'Создание экспорта',
  },
  export_data_create_xlsx: {
    en: 'Create xlsx file',
    es: 'Crear reporte',
    ru: 'Создать файл',
  },
  export_data_date_period: {
    en: 'Period',
    es: 'Período',
    ru: 'Период',
  },
  export_data_date_from: {
    en: 'From',
    es: 'De',
    ru: 'С',
  },
  export_data_date_to: {
    en: 'To',
    es: '',
    ru: 'До',
  },
  export_titles_date: {
    en: 'Date',
    es: 'Fecha',
    ru: 'Дата',
  },
  export_titles_time: {
    en: 'Time',
    es: 'Tiempo',
    ru: 'Время',
  },
  export_titles_glucose: {
    en: 'Glucose (%type%)',
    es: 'Glucosa (%type%)',
    ru: 'Глюкоза (%type%)',
  },
  exports_titles_breadUnits: {
    en: '%type% %weight_if_bu%',
    es: '%type% %weight_if_bu%',
    ru: '%type% %weight_if_bu%',
  },
  exports_titles_insulin: {
    en: 'Rapid insulin',
    es: 'Insulina ultrarapida',
    ru: 'Короткий инсулин',
  },
  exports_titles_longInsulin: {
    en: 'Long insulin',
    es: 'Insulina prolongada',
    ru: 'Пролонгированный инсулин',
  },
  exports_titles_comment: {
    en: 'Comment',
    es: 'Comentario',
    ru: 'Комментарий',
  },
  export_data_titles_statistics_name: {
    en: "Name",
    es: 'Tipo',
    ru: "Название",
  },
  export_data_titles_statistics_name_value: {
    en: "Value",
    es: 'Valor',
    ru: "Значение",
  },
  export_data_titles_average_glucose: {
    en: 'Average daily glucose (%type%)',
    es: 'Glucosa diaria promedio(%type%)',
    ru: 'Средняя глюкоза (%type%)',
  },
  export_data_titles_average_breadUnits: {
    en: 'Average daily carbs. %type% %weight_if_bu%',
    es: 'Promedio de carbohidratos diarios. %type% %weight_if_bu%',
    ru: 'Среднесуточные углеводы. %type% %weight_if_bu%',
  },
  export_data_titles_average_insulin: {
    en: 'Average daily short insulin',
    es: 'Promedio diario de insulina ultrarapida',
    ru: 'Среднесуточный короткий инслуин',
  },
  export_data_titles_average_long_insulin: {
    en: 'Average daily long insulin',
    es: 'Promedio diario de insulina prolongada',
    ru: 'Среднесуточный пролонгированный инсулин',
  },
  export_data_titles_average_total_notes: {
    en: 'Total notes in report',
    es: 'Registros totales',
    ru: 'Всего записей',
  },
  export_data_titles_average_date_from: {
    en: 'Report start date',
    es: 'Fecha de inicio del informe',
    ru: 'Дата начала отчета',
  },
  export_data_titles_average_date_to: {
    en: 'Report end date',
    es: 'Fecha de finalización del informe',
    ru: 'Дата окончания отчета',
  },

  //ONBOARDING
  continue: {
    en: 'Continue',
    es: 'Continuar',
    ru: 'Продолжить',
  },
  skip: {
    en: 'Skip',
    es: 'Omitir',
    ru: 'Пропустить',
  },
  fill_information_about_yourself: {
    en: 'Fill in information about yourself',
    es: 'Complete la información sobre usted',
    ru: 'Заполните информацию о себе',
  },
  do_you_use_insulin: {
    'en': 'I use insulin',
    'es': 'Yo uso insulina',
    'ru': 'Я использую инсулин',
  },
  select_insulin_type_you_use: {
    'en': 'Choose the type of action of your insulin',
    'es': 'Elige el tipo de acción de tu insulina',
    'ru': 'Выберите тип действия вашего инсулина',
  },
  short_insulin: {
    'en': 'Short-acting insulin',
    'es': 'Insulina rápida',
    'ru': 'Инсулин короткого действия',
  },
  ultra_short_insulin: {
    'en': 'Rapid-acting insulin',
    'es': 'Insulina ultrarápida',
    'ru': 'Инсулин ультракороткого действия',
  },
  you_can_change_it_later: {
    'en': 'You can change these parameters later in the settings',
    'es': 'Puede cambiar estos parámetros más adelante en la configuración',
    'ru': 'Вы можете изменить эти параметры позже в настройках',
  },
  active_insulin_counter_description: {
    'en': 'Remaining insulin from the last injection. This is an approximate value',
    'es': 'Insulina restante de la última inyección. Este es un valor aproximado',
    'ru': 'Оставшийся инсулин после последней инъекции. Это приблизительное значение',
  },
  to_observe_your_active_insuline_select_your_short_insulin_type_please: {
    'en': 'To track insulin distribution over time, select your short insulin type',
    'es': 'Para rastrear la distribución de insulina a lo largo del tiempo, seleccione el tipo de insulina corta',
    'ru': 'Чтобы отслеживать распределение инсулина с течением времени, выберите короткий тип инсулина',
  },
  set_insulin_type: {
    'en': 'Specify type',
    'es': 'Especifique el tipo',
    'ru': 'Указать тип',
  },
  it_needs_to_show_charts_and_calculating_active_insulin: {
    'en': 'This is necessary for calculating active insulin and charts',
    'es': 'Esto es necesario para calcular la insulina activa y los gráficos',
    'ru': 'Это необходимо для расчета активного инсулина и графиков',
  },
  short_insulin_brief: {
    'en':
      'The onset of action is usually 30-60 minutes.\n' +
      'The maximum effect occurs in 2-4 hours.\n' +
      'The total duration of action is up to 6-8 hours',
    'es':
      'El inicio de acción suele ser de 30 a 60 minutos.\n' +
      'El efecto máximo ocurre en 2-4 horas.\n' +
      'La duración total de la acción es de hasta 6-8 horas.',
    'ru':
      'Начало действия обычно составляет 30-60 минут.\n' +
      'Максимальный эффект наступает через 2-4 часа.\n' +
      'Общая продолжительность действия до 6-8 часов',
  },
  ultra_short_insulin_brief: {
    'en':
      'The onset of action is usually 10-20 minutes.\n' +
      'The maximum effect occurs in 1-2 hours.\n' +
      'The total duration of action is up to 4-5 hours',
    'es':
      'El inicio de acción suele ser de 10 a 20 minutos.' +
      'El efecto máximo ocurre en 1-2 horas.' +
      'La duración total de la acción es de hasta 4-5 horas',
    'ru':
      'Начало действия обычно составляет 10-20 минут.\n' +
      'Максимальный эффект наступает через 1-2 часа.\n' +
      'Общая продолжительность действия до 4-5 часов',
  },
  default_selection: {
    'en': 'Default selection',
    'es': 'Selección predeterminada',
    'ru': 'Выбор по умолчанию',
  },
}
