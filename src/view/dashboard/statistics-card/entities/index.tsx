export enum StatisticsType {
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  LAST_MONTH = 'last-month',
  LAST_THREE_MONTH = 'last-three-month',
}

export enum StatisticsValueType {
  HYPO = 'hypoglycemia_count',
  HYPER = 'hyperglycemia_count',
  NORMAL = 'normalglycemia_count',
}

export enum StatisticsViewType {
  ABS = 'abs',
  PERCENT = 'percent',
}

export enum PieColors {
  hypoglycemia_count = '#B6AFFF',
  hyperglycemia_count = "#FFACAC",
  normalglycemia_count = '#B8FFC7',
}
