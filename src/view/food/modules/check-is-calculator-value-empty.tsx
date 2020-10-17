import { FoodCalculatorKey } from '../components/FoodCalculator';

export function checkIsCalculatorValueEmpty(key: FoodCalculatorKey): boolean {
  const { selectedKey, isValueEmpty } = this.state;

  return key === selectedKey && isValueEmpty
}
