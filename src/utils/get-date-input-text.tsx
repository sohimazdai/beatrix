import { i18nGet } from '../localisation/Translate';
import { ChartPeriodType } from '../model/IChart';
import { StatisticsPeriod } from '../model/IStatistics';
import { DateHelper } from './DateHelper';

export const getDateInputText = (
  selectedPeriod: ChartPeriodType | StatisticsPeriod,
  date: Date
) => {
  switch (selectedPeriod) {
    case StatisticsPeriod.SEASON:
      switch (date.getMonth()) {
        case 11:
        case 0:
        case 1:
          return `${i18nGet('statistics_season_winter')} ${new Date(date.getFullYear(), date.getMonth() - 3, date.getDate()).getFullYear()}-${new Date(date.getFullYear(), date.getMonth() + 3, date.getDate()).getFullYear()}`;
        case 2:
        case 3:
        case 4:
          return `${i18nGet('statistics_season_spring')} ${date.getFullYear()}`;
        case 5:
        case 6:
        case 7:
          return `${i18nGet('statistics_season_summer')} ${date.getFullYear()}`;
        case 8:
        case 9:
        case 10:
          return `${i18nGet('statistics_season_autumn')} ${date.getFullYear()}`;
      }
    case ChartPeriodType.THREE_MONTH:
      const currentYear = new Date().getFullYear();
      let endPostfix = currentYear === date.getFullYear() &&
        new Date(DateHelper.getDiffMonth(date, -2)).getFullYear() === date.getFullYear() ?
        '' : ' ' + String(date.getFullYear()).slice(2);
      let startPostfix = currentYear === new Date(DateHelper.getDiffMonth(date, -2)).getFullYear() &&
        new Date(DateHelper.getDiffMonth(date, -2)).getFullYear() === date.getFullYear() ?
        '' : ' ' + String(new Date(DateHelper.getDiffMonth(date, -2)).getFullYear()).slice(2);
      return endPostfix && startPostfix && endPostfix !== startPostfix ?
        DateHelper.getMonthStringCommonShort(date.getMonth() - 2 >= 0 ?
          date.getMonth() - 2 :
          date.getMonth() + 10
        ) + (startPostfix === endPostfix ? '' : startPostfix) + ' - ' + DateHelper.getMonthStringCommonShort(date.getMonth()) + endPostfix
        :
        DateHelper.getMonthStringCommon(date.getMonth() - 2 >= 0 ?
          date.getMonth() - 2 :
          date.getMonth() + 10
        ) + (startPostfix === endPostfix ? '' : startPostfix) + ' - ' + DateHelper.getMonthStringCommon(date.getMonth()) + endPostfix
    case StatisticsPeriod.MONTH:
    case ChartPeriodType.MONTH:
      return DateHelper.getMonthStringCommon(date.getMonth()) + ' ' + date.getFullYear();
    case StatisticsPeriod.YEAR:
      return date.getFullYear();
    default:
      let text = '';
      if (DateHelper.isToday(date)) {
        text = i18nGet('today')
      } else if (DateHelper.isYesterday(date)) {
        text = i18nGet('yesterday')
      } else {
        const displayDate = date.getDate() > 9 ? date.getDate() : ('0' + date.getDate());
        const displayMonth = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
        const displayYear = date.getFullYear().toString()[2] + date.getFullYear().toString()[3];
        text = displayDate + '.' + displayMonth + '.' + displayYear
      }
      return text;
  }
}
