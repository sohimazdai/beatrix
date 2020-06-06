import i18n from 'i18n-js';

export default function translate() {
  i18n.translations.en = {
    ...i18n.translations.en,
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
  };

  i18n.translations.ru = {
    ...i18n.translations.ru,
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
  }
} 
