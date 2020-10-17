import { FoodCalculatorKey } from '../components/FoodCalculator';

export function focusCalculatorTextInput(selectedKey: FoodCalculatorKey) {
  const newKeyValue = selectedKey === FoodCalculatorKey.WEIGHT
    ? this.currentRelation * 100
    : selectedKey === FoodCalculatorKey.BREAD_UNITS
      ? this.currentRelation * this.originalXeIn100Gramm
      : this.currentRelation * this.foodItem.nutrients[selectedKey];

  this.setState({
    keyValue: newKeyValue,
    selectedKey,
    trailingDot: false,
    isValueEmpty: false,
  });
}
