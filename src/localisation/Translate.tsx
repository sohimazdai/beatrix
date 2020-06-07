import i18n from 'i18n-js';

export default function translate() {
  i18n.translations.en = {
    // AUTH
    looking_for_active_session: 'Looking for active session',
    continue_as: 'Continue as:',
    sign_in_with_google: 'Sign in with Google',
    sign_in: 'Sign in',

    // NOTES
    notes: 'Notes',
    today: 'Today',
    yesterday: 'Yesterday',

    january: 'january',
    february: 'february',
    march: 'march',
    april: 'april',
    may: 'may',
    june: 'june',
    jule: 'jule',
    august: 'august',
    september: 'september',
    october: 'october',
    november: 'november',
    december: 'december',

    january_capital_infinitive: 'January',
    february_capital_infinitive: 'February',
    march_capital_infinitive: 'March',
    april_capital_infinitive: 'April',
    may_capital_infinitive: 'May',
    june_capital_infinitive: 'June',
    jule_capital_infinitive: 'July',
    august_capital_infinitive: 'August',
    september_capital_infinitive: 'September',
    october_capital_infinitive: 'October',
    november_capital_infinitive: 'November',
    december_capital_infinitive: 'December',

    january_capital_short: 'Jan',
    february_capital_short: 'Feb',
    march_capital_short: 'Mar',
    april_capital_short: 'Apr',
    may_capital_short: 'May',
    june_capital_short: 'Jun',
    jule_capital_short: 'Jul',
    august_capital_short: 'Aug',
    september_capital_short: 'Sep',
    october_capital_short: 'Oct',
    november_capital_short: 'Nov',
    december_capital_short: 'Dec',

    show_more: 'Show more',
    notes_not_found: 'Notes not found... Lets write a new one!',

    fill_out_your_diabetes_profile_for_recommendations: 'Fill out your diabetes profile for recommendations',
    enter_blood_glucose_value_to_get_recommendation: 'Enter blood glucose value to get recommendation',
    insulin_is_not_recommended: 'Insulin is not recommended',
    inject_insulin_after_meal: 'Inject insulin after meals. \n Recommended insulin value',
    restore_your_glucose_level_first: 'First restore your glucose level to normal',
    recommended_insulin_value: 'Recommended insulin value',

    add: 'Add',

    glucose: 'Blood sugar',
    breadUnits: 'Carbohydrates',
    insulin: 'Short-acting',
    longInsulin: 'Long-acting',
    comment: 'Comment',

    rewrite: 'Rewrite',
    write: 'Write',
    fill_at_least_one_parameter: 'Fill at least one parameter',
    delete: 'Delete',

    // CHARTS
    charts: 'Charts',
    chart_period_day: 'Day',
    chart_period_month: 'Month',
    chart_period_three_month: 'Three month',
    chart_today: 'Today',
    chart_yesterday: 'Yesterday',
    chart_period: 'Period',
    chart_period_3_month: '3 month',
    chart_update_date: 'Update date',

    info_day_chart: 'Day chart',
    info_month_chart: 'Month chart',
    info_three_month_chart: 'Three month chart',

    info_day_chart_part_1: 'Charts visualize the spreading of blood sugar, insulin and carbohydrates throughout the day. ' +
      "As you know, blood sugar increases with food intake and decreases with insulin.",
    info_day_chart_part_2: 'The graph of blood glucose (in the middle) is an indicator of the correctness of the selected dose for each specific time of day. ' +
      'If you notice systematically repeated spikes in blood sugar, consult your doctor to adjust your dose of short or long-acting insulin.',
    info_day_chart_part_3: "The graph of insulin (above) approximately reflects the distribution of short insulin in the body during the day. If 4 hours have not passed since the last injection, the mechanism of summation of the injected insulin can be observed. " +
      "When summarizing active insulins, the risk of hypoclycemia increases! In addition, find out the maximum permissible dose of insulin from the endocrinologist and try not to exceed it, including in cases of summation.",
    info_day_chart_part_4: 'The insulin graph values are directed downward, reflecting the opposite direction with the carbohydrate graph.',
    info_day_chart_part_5: 'The graph of carbohydrates (bottom) is an average picture of the absorption of carbohydrates in the blood. Ask your endocrinologist about your maximum portion of carbohydrates and always try to keep within the prescribed limits.',

    info_month_chart_part_1: "On the monthly chart, the dots show the average levels of blood sugar, insulin and carbohydrates for the corresponding day.",
    info_month_chart_part_2: "Red vertical lines indicate the weekend. You can notice a systematic increase and decrease in sugar on different days of the week and analyze the cause of such jumps.",

    info_three_month_chart_part_1: 'Points are average values per unit of time. On a three-month chart, the unit of time is a week.',
    info_three_month_chart_part_2: 'Keep track of the seasonal distribution of blood glucose. You can determine the systematic jumps in sugar and correlate with a certain period of life. For example, vacation, illness, diet, or any specific period of life. Next time you may be better prepared for the same situation.',

    // PROFILE
    profile: 'Profile',
    diabetic_profile: 'Diabetic profile',
    about_diabetes_profile: 'Adjust your settings and improve diabetes compensation',
    log_out: 'Logout',
    log_out_hint: 'To use your notes, you need to log in to your account again.',
    leave: 'Leave',

    ['mg/dL']: 'mg/dL',
    ['mg/dL_long']: 'milligrams per deciliter',
    ['mmol/L']: 'mmol/L',
    ['mmol/L_long']: 'millimole per liter',

    go_to: 'Go to',

    target_glycemia: 'Target glycemia',
    target_glycemia_description: 'Enter your blood sugar target',

    glycemia_unit: 'Glycemia unit',
    glycemia_unit_description: 'Indicate which blood sugar measurement system you use',

    shedule_since: 'Since(h)',
    shedule_until: 'Until(h)',
    shedule_value: 'Value',

    shedule_change: 'Change',
    shedule_add: 'Add',
    shedule_clear: 'Clear',

    insulin_sensitivity_factor: 'Insulin sensitivity factor (ISF)',
    insulin_sensitivity_factor_description: 'Insulin sensitivity factor, or correction factor, refers to the number of %glycemia_type% by which blood sugar levels fall when a person takes 1 unit of insulin.',
    insulin_sensitivity_factor_hint: 'Define IFS for various time periods',

    insulin_to_carb_rate: 'Insulin-to-carb ratio',
    insulin_to_carb_rate_description: 'The insulin-to-carb ratio means you will take 1 unit of insulin for a certain amount of carbohydrate.',
    insulin_to_carb_rate_hint: 'Define insulin-ration-carb for various time periods',

    // GENERAL
    cancel: 'Cancel',
    not_selected: 'not selected',
    are_you_sure: 'Are you sure?',
    ok: 'OK',
  };
  i18n.translations.ru = {
    // AUTH
    looking_for_active_session: 'Поиск активной сессии',
    continue_as: 'Продолжить как:',
    sign_in_with_google: 'Войти с Google',
    sign_in: 'Авторизация',

    // NOTES
    notes: 'Записи',
    today: 'Сегодня',
    yesterday: 'Вчера',

    january: 'января',
    february: 'февраля',
    march: 'марта',
    april: 'апреля',
    may: 'мая',
    june: 'июня',
    jule: 'июля',
    august: 'августа',
    september: 'сентября',
    october: 'октября',
    november: 'ноября',
    december: 'декабря',

    january_capital_infinitive: 'Январь',
    february_capital_infinitive: 'Февраль',
    march_capital_infinitive: 'Март',
    april_capital_infinitive: 'Апрель',
    may_capital_infinitive: 'Май',
    june_capital_infinitive: 'Июнь',
    jule_capital_infinitive: 'Июль',
    august_capital_infinitive: 'Август',
    september_capital_infinitive: 'Сентябрь',
    october_capital_infinitive: 'Октябрь',
    november_capital_infinitive: 'Ноябрь',
    december_capital_infinitive: 'Декабрь',

    january_capital_short: 'Янв',
    february_capital_short: 'Фев',
    march_capital_short: 'Мар',
    april_capital_short: 'Апр',
    may_capital_short: 'Май',
    june_capital_short: 'Июн',
    jule_capital_short: 'Июл',
    august_capital_short: 'Авг',
    september_capital_short: 'Сен',
    october_capital_short: 'Окт',
    november_capital_short: 'Нояб',
    december_capital_short: 'Дек',

    show_more: 'Показать больше',
    notes_not_found: 'Записей не найдено... Давайте добавим!',

    fill_out_your_diabetes_profile_for_recommendations: 'Заполните диабетический профиль для получения рекомендаций',
    enter_blood_glucose_value_to_get_recommendation: 'Введите значение глюкозы, чтобы получить рекомендацию',
    insulin_is_not_recommended: 'Вводить инсулин не рекомендуется',
    inject_insulin_after_meal: 'Введите инсулин после еды. \nРекомендуемое значение инсулина',
    restore_your_glucose_level_first: 'Сначала восстановите свой уровень глюкозы',
    recommended_insulin_value: 'Рекомендуемое значение инсулина',

    add: 'Добавить',

    glucose: 'Глюкоза',
    breadUnits: 'ХЕ',
    shortInsulin: 'Короткий',
    longInsulin: 'Длинный',
    comment: 'Комментарий',

    write: 'Записать',
    rewrite: 'Перезаписать',
    fill_at_least_one_parameter: 'Введите хотя бы один параметр',
    delete: 'Удалить',

    //CHARTS
    charts: 'Графики',
    chart_period_day: 'День',
    chart_period_month: 'Месяц',
    chart_period_three_month: 'Три месяца',
    chart_today: 'Сегодня',
    chart_yesterday: 'Вчера',
    chart_period: 'Период',
    chart_period_3_month: '3 месяца',
    chart_update_date: 'Обновить дату',

    info_day_chart: 'Дневной график',
    info_month_chart: 'Месячный график',
    info_three_month_chart: 'Трехмесячный график',

    info_day_chart_part_1: "Графики визуализируют распределение сахара крови, инсулина и ХЕ в течение дня. " +
      "Как известно, сахар крови повышается с принятием пищи и понижается с введением инсулина.",
    info_day_chart_part_2: "График глюкозы крови(посередине) является показателем корректности подобранной дозы для каждого конкретного времени дня. " +
      "Если вы замечаете систематически повторяющиеся скачки сахара крови - обратитесь к врачу для корректировки дозы короткого или пролонгированного инсулина.",
    info_day_chart_part_3: "График инсулина(сверху) приблизительно отражает распределение короткого инсулина в организме в течение дня. В случае, когда с последней инъекции не прошло 4 часов, вы можете наблюдать механизм наложения введенного инсулина. " +
      "При наложении действующих инсулинов повышается опасность возникновения гипокликемии! Так же узнайте у врача-эндокринолога вашу максимально приемлемую дозировку инсулина и старайтесь не превышать её, в том числе, в случая наложения.",
    info_day_chart_part_4: 'Значения графика инсулина отложены вниз, что отражает противонаправленность с графиком хлебных единиц',
    info_day_chart_part_5: 'График хлебных единиц(снизу) является усредненной картиной всасывания углеводов в кровь. Узнайте у врача-эндокринолога вашу максимальную порцию углеводов и старайтесь всегда укладываться в заданные рамки.',

    info_month_chart_part_1: "На месячном графике точками показаны средние показатели сахара крови, иснулина и ХЕ за соотвествующий день.",
    info_month_chart_part_2: "Красными вертикальными линиями показаны выходные дни. Вы можете заметить систематические повышения и снижения сахара в различные дни недели и проанализировать причину таких скачков.",

    info_three_month_chart_part_1: 'Точки - средние значения за единицу времени. На трехмесячном графике единицей времени является неделя.',
    info_three_month_chart_part_2: 'Наблюдайте за сезонным харакетром распределения глюкозы в крови. Вы можете определить систематические скачки сахара и соотнести с определенным периодом жизни. Например, отпуском, болезнью, диетой или любым специфическим периодом жизни. В следующий раз вы сможете быть подготовленным к такой же ситуации немного лучше.',

    // PROFILE
    profile: 'Профиль',
    diabetic_profile: 'Диабетический профиль',
    about_diabetes_profile: 'Настройте ваши параметры и улучшите компенсацию',

    log_out: 'Выйти из аккаунта',
    log_out_hint: 'Чтобы использовать ваши записи необходимо будет зайти снова в ваш аккаунт',
    leave: 'Выйти',

    ['mg/dL']: 'мг/дл',
    ['mg/dL_long']: 'миллиграмм на децилитр',
    ['mmol/L']: 'ммоль/л',
    ['mmol/L_long']: 'миллимоль на литр',

    go_to: 'Перейти',

    target_glycemia: 'Целевая гликемия',
    target_glycemia_description: "Укажите целевое значение сахара крови",

    glycemia_unit: 'Система измерений глюкометра',
    glycemia_unit_description: 'Укажите какой системой измерений сахара крови вы пользуетесь',

    shedule_since: 'С(часов)',
    shedule_until: 'До(часов)',
    shedule_value: 'Значение',

    shedule_change: 'Изменить',
    shedule_add: 'Добавить',
    shedule_clear: 'Стереть',

    insulin_sensitivity_factor: 'Фактор чувствительности к инсулину (ФЧИ)',
    insulin_sensitivity_factor_description: 'Показывает, насколько понизит число %glycemia_type% 1 ед. ультракороткого инсулина',
    insulin_sensitivity_factor_hint: 'Укажите ФЧИ для различных промежутков времени',

    insulin_to_carb_rate: 'Углеводный коэффициент (УК)',
    insulin_to_carb_rate_description: 'Показывает количество единиц инсулина необходимого для усвоения %breadUnits_type%',
    insulin_to_carb_rate_hint: 'Укажите ваш УК для различных промежутков времени',

    // GENERAL
    cancel: 'Отмена',
    not_selected: 'не выбрано',
    are_you_sure: 'Вы уверены?',
    ok: 'OK',
  }
} 
