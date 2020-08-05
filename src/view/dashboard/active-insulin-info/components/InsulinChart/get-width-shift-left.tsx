import { IChartConfiguration } from '../../../../../model/IChart';

export const getWidthShiftLeft = (
  duration: number,
  oldestDate: number,
  cfg: IChartConfiguration,
): number => {
  const widthRelativity = duration / 24;
  const offsetInMinutesRelativeToDuration = new Date(oldestDate).getMinutes() / 60 / 24;

  const shift =
    offsetInMinutesRelativeToDuration / widthRelativity - offsetInMinutesRelativeToDuration;

  const shiftLeft = cfg.boxWidth * shift;
  const paddingShift = cfg.basicPadding / widthRelativity - cfg.basicPadding;

  return shiftLeft + paddingShift;
}
