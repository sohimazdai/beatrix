import { FoodCalculatorKey } from '../components/FoodCalculator';

export function checkCalculatorValuePostfix(key: FoodCalculatorKey) {
  const { selectedKey, trailingDot } = this.state;

  return key === selectedKey && trailingDot ? '.' : '';
}
