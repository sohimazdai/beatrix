import { shortInsulinDistribution, shortInsulinDistributionStepNumber } from '../../../../../calculation-services/short-insulin-distribution';
import { ShortInsulinType } from '../../../../../model/IUserDiabetesProperties';
import { ChartConfig } from '../../../../../screen/chart/config/ChartConfig';

export default function calculateActiveInsulinTime(
  lastNoteDate: number,
  shortInsulinType: ShortInsulinType
) {
  const now = Date.now();

  const config = new ChartConfig().getConfigs().activeInsulin;

  const insulineDurationSteps = shortInsulinDistributionStepNumber[shortInsulinType];
  const durationMinutes = insulineDurationSteps * config.timeStepMinutes;

  const diff = (lastNoteDate + 1000 * 60 * durationMinutes) - now;

  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor(diff / 1000 / 60 / 60 % 24);

  return { minutes, hours };
}
