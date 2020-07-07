import i18n from 'i18n-js';

export function setLocale(countryCode) {
  i18n.locale = countryCode === 'ru' ? 'ru' : 'en';
}

export function i18nGet(key: string) {
  return i18n.t(key);
}

export default function translate() {
  /* 🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENGLISH */
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
    july: 'july',
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
    july_capital_infinitive: 'July',
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
    july_capital_short: 'Jul',
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

    carb_gram: 'grams',
    carbs_units: 'units',

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
    glycemia_unit_description: 'Select which blood sugar measurement system you use',

    carb_unit_title: 'Carbohydrates unit',
    carb_unit_description: 'Indicate which carbohydrate counting system you use',

    breadUnits_measuring: 'Carbs unit (10-12 grams)',
    carbohydrates_measuring: 'Carbohydrates in grams',

    carb_unit_weight_title: 'Amount of carbohydrates in carbs unit',
    carb_unit_weight_description: 'Select the weight of the carbs unit of the system you are using',

    shedule_since: 'Since(h)',
    shedule_until: 'Until(h)',
    shedule_value: 'Value',

    shedule_change: 'Change',
    shedule_add: 'Add',
    shedule_clear: 'Clear',

    insulin_sensitivity_factor: 'Insulin sensitivity factor (ISF)',
    insulin_sensitivity_factor_description: 'Insulin sensitivity factor, or correction factor, refers to the number of %glycemia_type% by which blood sugar levels fall when a person takes 1 unit of insulin',
    insulin_sensitivity_factor_hint: 'Define IFS for various time periods',

    insulin_to_carb_rate: 'Insulin-to-carb ratio',
    insulin_to_carb_rate_description: 'The coefficient shows the amount of %breadUnits_type% absorbed by 1 unit of insulin',
    insulin_to_carb_rate_hint: 'Define insulin-to-carb for various time periods',
    carbohydrates_parent_case: 'carbohydrates',
    breadUnits_parent_case: 'carbs units',

    since: 'since',
    until: 'until',
    save: 'Save',
    need_to_fill_time_period: 'Time gaps required',

    profile_change: 'Change',
    profile_apply: 'Apply',

    glycemia_settings: 'Glycemia settings',
    glycemia_settings_description: 'Change your target glycemia and type of measurement for your meter',
    carbohydrates_settings: 'Carbs settings',
    carbohydrates_settings_description: 'Indicate how you count carbohydrates',
    insulin_settings: 'Insulin parameters',
    insulin_settings_description: "Fill out and use your doctor's recommended dosage of insulin when creating notes",

    we_will_recalculating_your_notes: 'App will recalculate your data',
    its_need_to_fit: 'It is need to fit the new measurement system',
    please_do_not_close_app: 'Please do not close the application! It does not take much time',

    // GENERAL
    cancel: 'Cancel',
    not_selected: 'not selected',
    are_you_sure: 'Are you sure?',

    ok: 'OK',
    yes: 'Yes',
    got_it: 'Ok. Got it',

    active_network_needed: 'You need to connect to the internet',
    server_is_not_available_try_to_restart_app: 'Server is currently unavailable. Try restarting the application.',
    no_data_for_the_period: 'There is no data for the period',

    //ERROR
    user_properties_changing_error: 'Error changing user settings',
    shedule_sync_error: 'Error synchronizing schedule with server',
    sync_error: 'Error synchronizing with server',
    note_updating_error: 'Error updating record on server',
    notes_sync_error: 'Error synchronizing records with the server',
    notes_deleting_error: 'Error deleting record from server',
    notes_creating_error: 'Error creating server record',
    google_auth_error: 'Login failed',

    // DASHBOARD
    compensation: 'Compensation',
    last_notes: 'Recent notes',
    no_recent_notes_today: 'No notes yet today',
    glucose_chart: 'Glucose chart',
    rest_active_insulin: 'Active insulin',
    expires_in: 'Expires in',
    minutes_short: 'min',
    hours_short: 'h',
    statistics_today: 'Today',
    statistics_yesterday: 'Yesterday',
    statistics_last_month: 'Last month',
    statistics_last_three_month: 'Last three month',

    breadUnits_long: 'Carbs units',
    carbohydrates_long: 'Carbohydrates',
    one_bread_unit_contents: 'Carbs unit contents %number% grams of carbohydrates.',

    hypoglycemia_count: 'Hypoglycemia',
    hyperglycemia_count: 'Hyperglycemia',
    normalglycemia_count: 'Normal sugar',

    glucose_icon_tooltip: 'Blood glucose. Measured in %measure%.\nTarget glycemia is %target% %measure%.\nNormal sugar is between %min% and %max%.',
    breadunits_icon_tooltip: '%type%.\n%for_bu%',
    note_date_and_time: 'Note time',
    short_insulin_icon_tooltip: 'Ultra short-acting Insulin',
    long_insulin_icon_tooltip: 'Long-acting insulin',

    your_hba1c: 'HbA1c',
    glycated_hemoglobin: 'Glycated hemoglobin',
    calculated_days: 'Calculated days',
    calculate: 'Calculate',
    too_little_data_for_advanced_analys: 'Too little data for accurate analysis.',
    glucose_not_found_for_diagram: 'No glucose data to display diagram',

    // EXPORT
    export_data: 'Data export',
    export_data_description: 'Create report about your diabetes in the .XLSX extention. Open it with EXCEL',
    export_error: 'Export error',
    export_data_settings: 'Export settings',
    export_data_create_xlsx: 'Create xlsx file',

  };
  /* 🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿 */

  /* 🇷🇺 ESPANOL*/
  i18n.translations.es = {
    // AUTH
    looking_for_active_session: 'Buscando sesión activa',
    continue_as: 'Continuar como:',
    sign_in_with_google: 'Entrar con Google',
    sign_in: 'Iniciar sesión',

    // NOTES
    notes: 'Notas',
    today: 'Hoy',
    yesterday: 'Ayer',

    january: 'enero',
    february: 'febrero',
    march: 'marzo',
    april: 'abril',
    may: 'mayo',
    june: 'junio',
    jule: 'julio',
    august: 'agosto',
    september: 'septiembre',
    october: 'octubre',
    november: 'noviembre',
    december: 'diciembre',

    january_capital_infinitive: 'Enero',
    february_capital_infinitive: 'Febrero',
    march_capital_infinitive: 'Marzo',
    april_capital_infinitive: 'Abril',
    may_capital_infinitive: 'Mayo',
    june_capital_infinitive: 'Junio',
    jule_capital_infinitive: 'Julio',
    august_capital_infinitive: 'Agosto',
    september_capital_infinitive: 'Septiembre',
    october_capital_infinitive: 'Octubre',
    november_capital_infinitive: 'Noviembre',
    december_capital_infinitive: 'Diciembre',

    january_capital_short: 'ene',
    february_capital_short: 'feb',
    march_capital_short: 'mar',
    april_capital_short: 'abr',
    may_capital_short: 'may',
    june_capital_short: 'jun',
    jule_capital_short: 'jul',
    august_capital_short: 'ago',
    september_capital_short: 'sept',
    october_capital_short: 'oct',
    november_capital_short: 'nov',
    december_capital_short: 'dic',

    show_more: 'Mostrar más',
    notes_not_found: 'Sin notas',

    fill_out_your_diabetes_profile_for_recommendations: 'Complete su perfil de diabetes para obtener recomendaciones',
    enter_blood_glucose_value_to_get_recommendation: 'Ingrese el valor de glucosa para obtener la recomendación',
    insulin_is_not_recommended: 'No se recomienda inyectar insulina',
    inject_insulin_after_meal: 'Inyecta insulina después de la comida. \nValor recomendado de insulina',
    restore_your_glucose_level_first: 'Primero restaure su nivel de glucosa',
    recommended_insulin_value: 'Valor recomendado de insulina',

    add: 'Añadir',

    glucose: 'Glucosa',
    breadUnits: 'Racion de HC',
    insulin: 'Insulina ultra rápida',
    longInsulin: 'Insulina prolongada',
    comment: 'Сomentarios',

    write: 'Escribir',
    rewrite: 'Sobrescribir',
    fill_at_least_one_parameter: 'Ingrese al menos un parámetro',
    delete: 'Eliminar',

    carb_gram: 'gramos',
    carbs_units: 'Racion de HC',

    //CHARTS
    charts: 'Gráficos',
    chart_period_day: 'Día',
    chart_period_month: 'Mes',
    chart_period_three_month: 'Tres meses',
    chart_today: 'Hoy',
    chart_yesterday: 'Ayer',
    chart_period: 'Período',
    chart_period_3_month: '3 meses',
    chart_update_date: 'Cambiar fecha',

    info_day_chart: 'Gráfico del dia',
    info_month_chart: 'Gráfico del mes',
    info_three_month_chart: 'Gráfico de tres meses',

    info_day_chart_part_1: "Los gráficos visualizan la distribución de azúcar en sangre, insulina y Racion de HC a lo largo del día. " +
      "Como saben, el azúcar en la sangre aumenta con la ingesta de alimentos y disminuye con la insulina..",
    info_day_chart_part_2: "El gráfico de glucosa en sangre (en el medio) es un indicador de la exactitud de la dosis seleccionada para cada momento específico del día. " +
      "Si nota un aumento sistemático repetido en el azúcar en la sangre, consulte a su médico para ajustar la dosis de insulina corta o larga.",
    info_day_chart_part_3: "El gráfico de insulina (arriba) refleja aproximadamente la distribución de insulina corta en el cuerpo durante el día. En el caso de que no hayan pasado 4 horas desde la última inyección, puede observar el mecanismo de aplicación de insulina." +
      "Al aplicar insulinas activas, ¡aumenta el riesgo de hipoclucemia! También solicite a su endocrinólogo la dosis máxima aceptable de insulina y trate de no excederla, incluso en el caso de la aplicación.",
    info_day_chart_part_4: 'Los valores del gráfico de insulina se presionan hacia abajo, lo que refleja la dirección opuesta con el gráfico de unidades de pan',
    info_day_chart_part_5: 'El gráfico de Racion de HC (abajo) muestra promedio de la absorción de carbohidratos en la sangre.Consulte con su endocrinólogo cuál es la porción máxima de carbohidratos y siempre trate de mantenerse dentro de los límites prescritos',

    info_month_chart_part_1: "En el gráfico mensual, los puntos muestran el promedio de azúcar en sangre, isulina y Racion de HC para el día correspondiente.",
    info_month_chart_part_2: "Las líneas verticales rojas indican los fines de semana. Puede notar aumentos y disminuciones sistemáticos de azúcar en diferentes días de la semana y analizar la causa de tales saltos.",

    info_three_month_chart_part_1: 'Los puntos son valores promedio por unidad de tiempo. En un gráfico de tres meses, la unidad de tiempo es una semana.',
    info_three_month_chart_part_2: 'Observe el patrón estacional de distribución de glucosa en sangre. Puede determinar los saltos sistemáticos en el azúcar y correlacionarlos con un cierto período de vida. Por ejemplo, vacaciones, enfermedad, dieta o cualquier período específico de la vida. La próxima vez puede estar un poco mejor preparado para la misma situación.',

    // PROFILE
    profile: 'Perfil',
    diabetic_profile: 'Perfil diabético',
    about_diabetes_profile: 'Ajuste su configuración y mejore la compensación',

    log_out: 'Cerrar sesión',
    log_out_hint: 'Para usar sus notas, deberá iniciar sesión nuevamente en su cuenta.',
    leave: 'Salir',

    ['mg/dL']: 'mg/dL',
    ['mg/dL_long']: 'miligramo por decilitro',
    ['mmol/L']: 'ммоль/л',//TODO:!!!
    ['mmol/L_long']: 'milimoles por litro',

    go_to: 'ir',

    target_glycemia: 'Glucemia objetivo',
    target_glycemia_description: "Indica tu objetivo de azúcar en sangre",


    glycemi_unit: 'Unidad de glucemia',
    glycemia_unit_description: 'Indique qué sistema de medición de azúcar en la sangre usa.',

    carb_unit_title: 'Sistema de conteo de carbohidratos',
    carb_unit_description: 'Indique qué sistema de conteo de carbohidratos usa',

    carb_unit_weight_title: 'Cantidad de carbohidratos en Racion de HC',
    carb_unit_weight_description: 'Especifique la cantidad de carbohidratos en Racion de HC que usa al calcular',

    breadUnits_measuring: 'Racion de HC',
    carbohydrates_measuring: 'carbohidratos en gramos',

    shedule_since: 'De (horas)',
    shedule_until: 'Hasta (horas)',
    shedule_value: 'Valor:',

    shedule_change: 'Editar',
    shedule_add: 'Añadir',
    shedule_clear: 'Borrar',

    insulin_sensitivity_factor: 'Factor de sensibilidad a la insulina (FSI)',
    insulin_sensitivity_factor_description: 'Muestra cuántos  %glycemia_type%  de glucosa en sangre disminuirá con la introducción de 1 unidad. insulina ultrarrápida ',
    insulin_sensitivity_factor_hint: 'Especifique el FSI para varios períodos de tiempo',

    insulin_to_carb_rate: 'Relación insulina a carbohidratos',
    insulin_to_carb_rate_description: 'Muestra la cantidad de %breadUnits_type% absorbidos por 1 unidad de insulina.',
    insulin_to_carb_rate_hint: 'Indique su relación insulina a carbohidratos durante varios períodos de tiempo.',
    carbohydrates_parent_case: 'carbohidratos',
    breadUnits_parent_case: 'Racion de HC',

    since: 'de',
    until: 'antes de',
    save: 'Guardar',
    need_to_fill_time_period: 'Rellene los espacios de tiempo',

    profile_change: 'Editar',
    profile_apply: 'Aplicar',

    glycemia_settings: 'Configuraciones de glucemia',
    glycemia_settings_description: 'Cambie su glucemia objetivo y el tipo de medida para su medidor',
    carbohydrates_settings: 'Сonfiguraciones de contabilidad de carbohidratos',
    carbohydrates_settings_description: 'Indica como cuentas los carbohidratos',
    insulin_settings: 'Parámetros de insulina',
    insulin_settings_description: 'Indica su insulina recomendada "para bajar el azúcar en la sangre" и "cantidad para comer"',

    we_will_recalculating_your_notes: 'Contamos sus datos',
    its_need_to_fit: 'Esto es necesario para cumplir con el nuevo sistema de medición.',
    please_do_not_close_app: '¡Por favor no cierre la aplicación! No toma mucho tiempo',
    // GENERAL
    cancel: 'Cancelar',
    not_selected: 'No seleccionado',
    are_you_sure: 'Está seguro?',

    ok: 'OK',
    yes: 'Si',
    got_it: 'Entendido',

    active_network_needed: 'se necesita red activa',
    server_is_not_available_try_to_restart_app: ' El servidor no está disponible actualmente. Intenta reiniciar la aplicación.',

    //ERROR
    user_properties_changing_error: 'Error al cambiar la configuración del usuario',
    shedule_sync_error: 'Error al sincronizar la programación con el servidor',
    sync_error: 'Error al sincronizar con el servidor',
    note_updating_error: 'Error al actualizar el registro en el servidor',
    notes_sync_error: 'Error al sincronizar registros con el servidor',
    notes_deleting_error: 'Error al eliminar el registro del servidor',
    notes_creating_error: 'Error al crear el registro del servidor',
    google_auth_error: 'Error de inicio de sesion',

    // DASHBOARD
    compensation: 'Компенсация',
    last_notes: 'Последние записи',
    no_recent_notes_today: 'Нет записей за сегодняшний день',
    glucose_chart: 'График глюкозы',
    rest_active_insulin: 'Действующий инсулин',
    expires_in: 'Истекает через',
    minutes_short: 'мин',
    hours_short: 'ч',
    statistics_today: 'Сегодня',
    statistics_yesterday: 'Вчера',
    statistics_last_month: 'Последний месяц',
    statistics_last_three_month: 'Последние три месяца',

    breadUnits_long: 'Хлебные единицы',
    carbohydrates_long: 'Углеводы',
    one_bread_unit_contents: 'Одна ХЕ содержит %number% грамм углеводов.',

    hypoglycemia_count: 'Гипогликемия',
    hyperglycemia_count: 'Гипергликемия',
    normalglycemia_count: 'Норма',

    glucose_icon_tooltip: 'Глюкоза крови. Измеряется в %measure%.\nЦелевая гликемия указана как %target% %measure%.\nНорма в пределах от %min% до %max%.',
    breadunits_icon_tooltip: '%type%.\n%for_bu%',
    note_date_and_time: 'Время записи',
    short_insulin_icon_tooltip: 'Инсулин ультракороткого действия',
    long_insulin_icon_tooltip: 'Инсулин пролонгированного действия',

    your_hba1c: 'HbA1c',
    glycated_hemoglobin: 'Гликированный гемоглобин',
    calculated_days: 'Количество дней',
    calculate: 'Рассчитать',
    too_little_data_for_advanced_analys: 'Слишком мало данных для точного анализа.',
    glucose_not_found_for_diagram: 'Нет данных для глюкозы, чтобы отобразить диаграмму',
  }
  /* ES */

  /* 🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺🇷🇺 */

  /* 🇷🇺 RUSSO*/
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
    july: 'июля',
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
    july_capital_infinitive: 'Июль',
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
    july_capital_short: 'Июл',
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
    insulin: 'Короткий',
    longInsulin: 'Длинный',
    comment: 'Комментарий',

    write: 'Записать',
    rewrite: 'Перезаписать',
    fill_at_least_one_parameter: 'Введите хотя бы один параметр',
    delete: 'Удалить',

    carb_gram: 'грамм',
    carbs_units: 'ХЕ',



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

    carb_unit_title: 'Система подсчета углеводов',
    carb_unit_description: 'Укажите какой системой подсчета углеводов вы пользуетесь',

    carb_unit_weight_title: 'Количество углеводов в ХЕ',
    carb_unit_weight_description: 'Укажите количество углеводов в ХЕ, которые вы используете при подсчете',

    breadUnits_measuring: 'ХЕ',
    carbohydrates_measuring: 'Углеводы в граммах',

    shedule_since: 'С(часов)',
    shedule_until: 'До(часов)',
    shedule_value: 'Значение',

    shedule_change: 'Изменить',
    shedule_add: 'Добавить',
    shedule_clear: 'Стереть',

    insulin_sensitivity_factor: 'Фактор чувствительности к инсулину (ФЧИ)',
    insulin_sensitivity_factor_description: 'Показывает, на сколько %glycemia_type% понизится глюкоза крови при введении 1 ед. ультракороткого инсулина',
    insulin_sensitivity_factor_hint: 'Укажите ФЧИ для различных промежутков времени',

    insulin_to_carb_rate: 'Углеводный коэффициент (УК)',
    insulin_to_carb_rate_description: 'Показывает количество %breadUnits_type%, усваиваемых 1 единицей инсулина',
    insulin_to_carb_rate_hint: 'Укажите ваш УК для различных промежутков времени',
    carbohydrates_parent_case: 'углеводов',
    breadUnits_parent_case: 'ХЕ',

    since: 'с',
    until: 'до',
    save: 'Сохранить',
    need_to_fill_time_period: 'Необходимо заполнить временные промежутки',

    profile_change: 'Изменить',
    profile_apply: 'Применить',

    glycemia_settings: 'Настройки сахара крови',
    glycemia_settings_description: 'Измените целевую гликемию и тип измерений вашего глюкометра',
    carbohydrates_settings: 'Параметры учета углеводов',
    carbohydrates_settings_description: 'Укажите как вы считаете углеводы',
    insulin_settings: 'Параметры инсулина',
    insulin_settings_description: 'Укажите ваш рекомендуемый инсулин "на понижение" и "на еду"',

    we_will_recalculating_your_notes: 'Мы пересчитаем ваши данные',
    its_need_to_fit: 'Это необходимо для соответствия новой системе измерений',
    please_do_not_close_app: 'Пожалуйста, не закрывайте приложение! Это не займет много времени',

    // GENERAL
    cancel: 'Отмена',
    not_selected: 'не выбрано',
    are_you_sure: 'Вы уверены?',

    ok: 'OK',
    yes: 'Да',
    got_it: 'Ок, понятно',

    active_network_needed: 'Необходимо интернет-соединение',
    server_is_not_available_try_to_restart_app: 'В данный момент сервер недоступен. Попробуйте перезапустить приложение.',
    no_data_for_the_period: 'Нет данных за данный период',

    //ERROR
    user_properties_changing_error: 'Ошибка при изменении параметров пользователя',
    shedule_sync_error: 'Ошибка синхронизации расписания с сервером',
    sync_error: 'Ошибка при синхронизации с сервером',
    note_updating_error: 'Ошибка обновления записи на сервере',
    notes_sync_error: 'Ошибка синхронизации записей с сервером',
    notes_deleting_error: 'Ошибка удаления записи с сервера',
    notes_creating_error: 'Ошибка создания записи на сервер',
    google_auth_error: 'Войти не удалось',

    // DASHBOARD
    compensation: 'Компенсация',
    last_notes: 'Последние записи',
    no_recent_notes_today: 'Нет записей за сегодняшний день',
    glucose_chart: 'График глюкозы',
    rest_active_insulin: 'Действующий инсулин',
    expires_in: 'Истекает через',
    minutes_short: 'мин',
    hours_short: 'ч',
    statistics_today: 'Сегодня',
    statistics_yesterday: 'Вчера',
    statistics_last_month: 'Последний месяц',
    statistics_last_three_month: 'Последние три месяца',

    breadUnits_long: 'Хлебные единицы',
    carbohydrates_long: 'Углеводы',
    one_bread_unit_contents: 'Одна ХЕ содержит %number% грамм углеводов.',

    hypoglycemia_count: 'Гипогликемия',
    hyperglycemia_count: 'Гипергликемия',
    normalglycemia_count: 'Норма',

    glucose_icon_tooltip: 'Глюкоза крови. Измеряется в %measure%.\nЦелевая гликемия указана как %target% %measure%.\nНорма в пределах от %min% до %max%.',
    breadunits_icon_tooltip: '%type%.\n%for_bu%',
    note_date_and_time: 'Время записи',
    short_insulin_icon_tooltip: 'Инсулин ультракороткого действия',
    long_insulin_icon_tooltip: 'Инсулин пролонгированного действия',

    your_hba1c: 'HbA1c',
    glycated_hemoglobin: 'Гликированный гемоглобин',
    calculated_days: 'Количество дней',
    calculate: 'Рассчитать',
    too_little_data_for_advanced_analys: 'Слишком мало данных для точного анализа.',
    glucose_not_found_for_diagram: 'Нет данных для глюкозы, чтобы отобразить диаграмму',

    // EXPORT
    export_data: 'Экспорт данных',
    export_data_description: 'Создавайте отчеты о записях в формате .XLSX. Открывайте их в EXCEL',
    export_error: 'Ошибка экспорта',
    export_data_settings: 'Настройки экспорта',
    export_data_create_xlsx: 'Создать файл',

  }
  /* 🇷🇺 */
}
