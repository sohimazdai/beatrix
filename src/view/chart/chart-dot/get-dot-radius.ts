import { ChartValueType } from '../../../model/IChart';

export default function getDotRadius(type: ChartValueType, radius: number) {
  switch (type) {
    case ChartValueType.INSULIN:
    case ChartValueType.BREAD_UNITS:
      return radius * 0.9;
    default: return radius
  }
}
