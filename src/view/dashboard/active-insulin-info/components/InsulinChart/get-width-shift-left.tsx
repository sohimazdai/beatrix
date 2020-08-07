import { IChartConfiguration } from '../../../../../model/IChart';

export const getWidthShiftLeft = (
  duration: number,
  oldestDate: number,
  cfg: IChartConfiguration,
): number => {
  const widthRelativity = duration / 24;

  const offsetInMinutes = new Date(oldestDate).getMinutes();
  const offsetInSteps = offsetInMinutes / cfg.timeStepMinutes;

  const offsetrelativeToDay = offsetInSteps / 60 / 24 / 5;

  const shift = offsetrelativeToDay / widthRelativity - offsetrelativeToDay;

  const shiftLeft = cfg.boxWidth * shift;
  const paddingShift = cfg.basicPadding / widthRelativity - cfg.basicPadding;

  return shiftLeft + paddingShift;
}
