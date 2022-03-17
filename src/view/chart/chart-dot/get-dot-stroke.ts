import { COLOR } from '../../../constant/Color';
import { IChartConfiguration, IChartDot } from '../../../model/IChart';

export default function getDotStroke(
  selectedDotId: number,
  dotData: IChartDot,
  config: IChartConfiguration,
) {
  if (selectedDotId == dotData.id) {
    if (config.isAlone) {
      return COLOR.RED_BASE;
    }

    return config.dotStrokeColorActive;
  }

  if (config.dotStrokeColor) {
    return config.dotStrokeColor;
  }

  return COLOR.TRANSPARENT;
}
