import { IChartConfiguration } from '../../../../../model/IChart';

export const getWidthShiftLeft = (
  duration: number,
  oldestDate: number,
  cfg: IChartConfiguration,
): number => {
  console.log('🤖🤖🤖🤖 duration oldest', duration, oldestDate);
  const widthRelativity = duration / 24;

  const offsetInMinutes = new Date(oldestDate).getMinutes();
  const offsetInSteps = offsetInMinutes / cfg.timeStepMinutes;

  const offsetrelativeToDay = offsetInSteps / 60 / 24 / 5;

  const shift = offsetrelativeToDay / widthRelativity - offsetrelativeToDay;
  console.log('🤖🤖🤖🤖 shift', shift);
  const shiftLeft = cfg.boxWidth * shift;
  const paddingShift = cfg.basicPadding / widthRelativity - cfg.basicPadding;
  console.log('🤖🤖🤖🤖 shiftLeft paddingShift', shiftLeft, paddingShift);
  return shiftLeft + paddingShift;
}
