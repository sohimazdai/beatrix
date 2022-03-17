import { ChartValueType } from '../../../model/IChart';

export default function getDotColor(type: ChartValueType, fill: string) {
  switch (type) {
    case ChartValueType.INSULIN:
      return '#6759FF';
    case ChartValueType.BREAD_UNITS:
      return '#FFB359';
    default: return fill
  }
}
