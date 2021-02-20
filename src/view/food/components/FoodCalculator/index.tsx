import React from 'react';
import { KeyboardTypeOptions, StyleSheet, View } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { connect } from 'react-redux';
import { numberizeAndFix } from '../../../../api/helper/numberize-and-fix';
import { StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import { COLOR } from '../../../../constant/Color';
import { Measures } from '../../../../localisation/Measures';
import { i18nGet } from '../../../../localisation/Translate';
import { IFoodListItem, IFoodNutrients } from '../../../../model/IFood';
import { IStorage } from '../../../../model/IStorage';
import { CarbsMeasuringType, IUserDiabetesProperties } from '../../../../model/IUserDiabetesProperties';
import { NavigatorEntities } from '../../../../navigator/modules/NavigatorEntities';
import { selectSelectedFoodItem } from '../../selectors/select-selected-food-item';
import { FoodCreationInput } from '../FoodCreationInput';

export enum FoodCalculatorKey {
  WEIGHT = 'weight',
  BREAD_UNITS = 'breadUnits',

  CALORIES = 'calories',
  ENERGY = 'energy',
  CARBOHYDRATES = 'carbohydrates',
  PROTEINS = 'proteins',
  FATS = 'fats',
}

export enum FoodCalculatorType {
  FOOD_ADDING = "food_adding",
  QUICK_FOOD = 'quick-food',
}

interface Props {
  food?: IFoodListItem
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
  isEditing?: boolean

  type: FoodCalculatorType
  userDiabetesProperties: IUserDiabetesProperties
  withPadding?: boolean
  sourceFood?: IFoodListItem
  quickAdd?: (foodNutrients: IFoodNutrients) => void
  quickRemove?: () => void
};

interface State {
  selectedKey: FoodCalculatorKey,
  keyValue: string,
  isErrored: boolean,
  trailingDot: boolean,
  isValueEmpty: boolean,
}

class FoodCalculator extends React.Component<Props, State> {
  state = {
    selectedKey: FoodCalculatorKey.WEIGHT,
    keyValue: (
      this.props.food?.nutrients?.weight ||
      this.props.navigation?.getParam('foodItem')?.nutrients?.weight ||
      '100'
    ),
    isErrored: false,
    trailingDot: false,
    isValueEmpty: false,
  }

  get sourceFood(): IFoodListItem {
    const { sourceFood } = this.props;

    return sourceFood;
  }

  get currentRelation() {
    const { selectedKey, keyValue } = this.state;

    const selectedKeyValueFor100gram = selectedKey === FoodCalculatorKey.WEIGHT
      ? 100
      : selectedKey === FoodCalculatorKey.BREAD_UNITS
        ? this.sourceFood.nutrients.carbohydrates / this.xeWeight
        : this.sourceFood.nutrients[selectedKey];

    return keyValue / selectedKeyValueFor100gram;
  };

  get calculatedNutrients(): IFoodNutrients {
    const { calories, energy, carbohydrates, fats, proteins } = this.sourceFood.nutrients;

    return {
      calories: numberizeAndFix(calories * this.currentRelation),
      energy: numberizeAndFix(energy * this.currentRelation),
      carbohydrates: numberizeAndFix(carbohydrates * this.currentRelation),
      fats: numberizeAndFix(fats * this.currentRelation),
      proteins: numberizeAndFix(proteins * this.currentRelation),
    };
  }

  get XE(): boolean {
    const { userDiabetesProperties } = this.props;
    const carbsMeasuringType =
      Measures.getDefaultCarbsMeasuringType(userDiabetesProperties.carbsMeasuringType);

    const isNeedToCalculateXE = carbsMeasuringType === CarbsMeasuringType.BREAD_UNITS;

    return isNeedToCalculateXE;
  }

  get xeWeight(): number {
    const { userDiabetesProperties } = this.props;
    const carbsMeasuringType =
      Measures.getDefaultCarbsUnitWeightType(userDiabetesProperties.carbsUnitWeightType);

    return carbsMeasuringType;
  }

  get originalXeIn100Gramm() {
    return numberizeAndFix(this.sourceFood.nutrients.carbohydrates / this.xeWeight, 10)
  }

  get calculatedXe(): number {
    const { carbohydrates } = this.calculatedNutrients

    return numberizeAndFix(carbohydrates / this.xeWeight);
  }

  get wrapStyles() {
    const { withPadding } = this.props;

    return withPadding
      ? { ...styles.wrap, ...styles.totalPadding }
      : styles.wrap;
  }

  onTextInputValueChange = (text: string) => {
    if (!text) {
      this.setState({
        keyValue: '0',
        trailingDot: false,
        isValueEmpty: true,
      });

      return;
    }

    if (text.replace(/[^.]/g, '').length > 1 && text.slice(-1) === '.') {
      this.setState({
        keyValue: text.slice(0, -1),
        isValueEmpty: false,
      });

      return;
    }

    if (text.slice(-1) === '.') {
      this.setState({
        keyValue: text,
        trailingDot: true,
        isValueEmpty: false,
      });

      return;
    }

    if (text.slice(1, 2) !== '.' && text.slice(0, 1) == '0') {
      this.setState({
        keyValue: text.slice(1),
        trailingDot: false,
        isValueEmpty: false,
      });

      return;
    }

    this.setState({
      keyValue: text,
      trailingDot: false,
      isValueEmpty: false,
    });
  }

  onTextInputFocus = (selectedKey: FoodCalculatorKey) => {
    const newKeyValue = selectedKey === FoodCalculatorKey.WEIGHT
      ? this.currentRelation * 100
      : selectedKey === FoodCalculatorKey.BREAD_UNITS
        ? this.currentRelation * this.originalXeIn100Gramm
        : this.currentRelation * this.sourceFood.nutrients[selectedKey];

    this.setState({
      keyValue: String(numberizeAndFix(newKeyValue)),
      selectedKey,
      trailingDot: false,
      isValueEmpty: false,
    });
  }


  onMealAdd = () => {
    const { isValueEmpty } = this.state;
    const { navigation, type, quickAdd } = this.props;

    if (isValueEmpty) {
      this.setState({ isErrored: true });

      return;
    } else {
      this.setState({ isErrored: false });
    }

    if (type === FoodCalculatorType.QUICK_FOOD) {
      quickAdd({
        ...this.calculatedNutrients,
        weight: this.currentRelation * 100,
      })

      return;
    }

    const foodForNote: IFoodListItem = {
      ...this.sourceFood,
      nutrients: {
        ...this.calculatedNutrients,
        weight: this.currentRelation * 100,
      },
    };

    navigation.navigate(
      NavigatorEntities.NOTE_EDITOR,
      {
        foodForNote,
      },
    );
  }

  onMealRemove = () => {
    const { navigation, type, quickRemove } = this.props;

    if (type === FoodCalculatorType.QUICK_FOOD) {
      quickRemove();

      return;
    }

    navigation.navigate(
      NavigatorEntities.NOTE_EDITOR,
      {
        foodIdToRemove: this.sourceFood.id,
        isEditing: false,
      },
    );
  }


  render() {
    const { type, isEditing } = this.props;
    const { isErrored, keyValue, selectedKey, trailingDot, isValueEmpty } = this.state;
    const { calories, energy, fats, proteins, carbohydrates } = this.calculatedNutrients;

    const postfix = (key: FoodCalculatorKey) => {
      return key === selectedKey && trailingDot ? '.' : '';
    }

    const isEmpty = (key: FoodCalculatorKey): boolean => {
      return key === selectedKey && isValueEmpty
    }

    const breadUntis = numberizeAndFix(this.currentRelation * this.originalXeIn100Gramm);

    const keyboardType: KeyboardTypeOptions = "decimal-pad";

    if (type === FoodCalculatorType.QUICK_FOOD) {
      return (
        <View style={this.wrapStyles}>
          <View style={{ ...styles.rowSection, ...styles.rowSectionFirst }}>
            <FoodCreationInput
              label={`${i18nGet('weight_of_product')}(${i18nGet('gram')})`}
              isFormWithError={isErrored}
              isRequired
              onTextChange={this.onTextInputValueChange}
              value={
                isEmpty(FoodCalculatorKey.WEIGHT)
                  ? ""
                  : numberizeAndFix(this.currentRelation * 100) + postfix(FoodCalculatorKey.WEIGHT)
              }
              autoFocus={!this.XE}
              onFocus={() => this.onTextInputFocus(FoodCalculatorKey.WEIGHT)}
              type={keyboardType}
              withoutMarginTop
            />
            <View style={styles.space} />
            {this.XE && (
              <>
                <FoodCreationInput
                  label={`${i18nGet('breadUnits')}`}
                  isFormWithError={isErrored}
                  isRequired
                  onTextChange={this.onTextInputValueChange}
                  value={
                    isEmpty(FoodCalculatorKey.BREAD_UNITS)
                      ? ""
                      : breadUntis + postfix(FoodCalculatorKey.BREAD_UNITS)
                  }
                  autoFocus
                  onFocus={() => this.onTextInputFocus(FoodCalculatorKey.BREAD_UNITS)}
                  type={keyboardType}
                  disabled={!this.sourceFood.nutrients.carbohydrates}
                  withoutMarginTop
                />
              </>
            )}
            <View style={styles.space} />
            <FoodCreationInput
              label={`${i18nGet('food_creation_carbohydrates')}(${i18nGet('gram')})`}
              onTextChange={this.onTextInputValueChange}
              value={
                isEmpty(FoodCalculatorKey.CARBOHYDRATES)
                  ? ""
                  : carbohydrates + postfix(FoodCalculatorKey.CARBOHYDRATES)
              }
              type={keyboardType}
              isFormWithError={isErrored}
              onFocus={() => this.onTextInputFocus(FoodCalculatorKey.CARBOHYDRATES)}
              disabled={!numberizeAndFix(this.sourceFood.nutrients[FoodCalculatorKey.CARBOHYDRATES])}
              isRequired
              withoutMarginTop
            />
          </View>
          <View style={styles.buttons}>
            {isEditing && <>
              <StyledButton
                label={i18nGet('remove_racion')}
                onPress={this.onMealRemove}
                style={StyledButtonType.DELETE}
              />
              <View style={styles.space} />
            </>}
            <StyledButton
              label={isEditing ? i18nGet('rewrite') : i18nGet('add_racion')}
              onPress={this.onMealAdd}
              style={StyledButtonType.PRIMARY}
              disabled={!keyValue}
              fluid
            />
          </View>
        </View>
      );
    }

    if (type === FoodCalculatorType.FOOD_ADDING) {
      return (
        <View style={this.wrapStyles}>
          <View style={{ ...styles.rowSection, ...styles.rowSectionFirst }}>
            <FoodCreationInput
              label={`${i18nGet('weight_of_product')}(${i18nGet('gram')})`}
              isFormWithError={isErrored}
              isRequired
              onTextChange={this.onTextInputValueChange}
              value={
                isEmpty(FoodCalculatorKey.WEIGHT)
                  ? ""
                  : numberizeAndFix(this.currentRelation * 100) + postfix(FoodCalculatorKey.WEIGHT)
              }
              autoFocus={!this.XE}
              onFocus={() => this.onTextInputFocus(FoodCalculatorKey.WEIGHT)}
              type={keyboardType}
            />
            {this.XE && (
              <>
                <View style={styles.space} />
                <FoodCreationInput
                  label={`${i18nGet('breadUnits')}`}
                  isFormWithError={isErrored}
                  isRequired
                  onTextChange={this.onTextInputValueChange}
                  value={
                    isEmpty(FoodCalculatorKey.BREAD_UNITS)
                      ? ""
                      : breadUntis + postfix(FoodCalculatorKey.BREAD_UNITS)
                  }
                  autoFocus
                  onFocus={() => this.onTextInputFocus(FoodCalculatorKey.BREAD_UNITS)}
                  type={keyboardType}
                  disabled={!this.sourceFood.nutrients.carbohydrates}
                />
              </>
            )}
          </View>
          <View style={styles.rowSection}>
            <FoodCreationInput
              label={`${i18nGet('food_creation_calories')}(${i18nGet('kcal')})`}
              onTextChange={this.onTextInputValueChange}
              value={
                isEmpty(FoodCalculatorKey.CALORIES)
                  ? ""
                  : calories + postfix(FoodCalculatorKey.CALORIES)
              }
              type={keyboardType}
              isFormWithError={isErrored}
              onFocus={() => this.onTextInputFocus(FoodCalculatorKey.CALORIES)}
              isRequired
              disabled={!numberizeAndFix(this.sourceFood.nutrients[FoodCalculatorKey.CALORIES])}
              withoutMarginTop
            />
            <View style={styles.space} />
            <FoodCreationInput
              label={`${i18nGet('food_creation_energy')}(${i18nGet('kJ')})`}
              onTextChange={this.onTextInputValueChange}
              value={
                isEmpty(FoodCalculatorKey.ENERGY)
                  ? ""
                  : energy + postfix(FoodCalculatorKey.ENERGY)
              }
              type={keyboardType}
              isFormWithError={isErrored}
              onFocus={() => this.onTextInputFocus(FoodCalculatorKey.ENERGY)}
              isRequired
              disabled={!numberizeAndFix(this.sourceFood.nutrients[FoodCalculatorKey.ENERGY])}
              withoutMarginTop
            />
          </View>
          <View style={styles.rowSection}>
            <FoodCreationInput
              label={`${i18nGet('food_creation_proteins')}(${i18nGet('gram')})`}
              onTextChange={this.onTextInputValueChange}
              value={
                isEmpty(FoodCalculatorKey.PROTEINS)
                  ? ""
                  : proteins + postfix(FoodCalculatorKey.PROTEINS)
              }
              type={keyboardType}
              isFormWithError={isErrored}
              onFocus={() => this.onTextInputFocus(FoodCalculatorKey.PROTEINS)}
              isRequired
              disabled={!numberizeAndFix(this.sourceFood.nutrients[FoodCalculatorKey.PROTEINS])}
              withoutMarginTop
            />
            <View style={styles.space} />
            <FoodCreationInput
              label={`${i18nGet('food_creation_fats')}(${i18nGet('gram')})`}
              onTextChange={this.onTextInputValueChange}
              value={
                isEmpty(FoodCalculatorKey.FATS)
                  ? ""
                  : fats + postfix(FoodCalculatorKey.FATS)
              }
              type={keyboardType}
              isFormWithError={isErrored}
              onFocus={() => this.onTextInputFocus(FoodCalculatorKey.FATS)}
              isRequired
              disabled={!numberizeAndFix(this.sourceFood.nutrients[FoodCalculatorKey.FATS])}
              withoutMarginTop
            />
            <View style={styles.space} />
            <FoodCreationInput
              label={`${i18nGet('food_creation_carbohydrates')}(${i18nGet('gram')})`}
              onTextChange={this.onTextInputValueChange}
              value={
                isEmpty(FoodCalculatorKey.CARBOHYDRATES)
                  ? ""
                  : carbohydrates + postfix(FoodCalculatorKey.CARBOHYDRATES)
              }
              type={keyboardType}
              isFormWithError={isErrored}
              onFocus={() => this.onTextInputFocus(FoodCalculatorKey.CARBOHYDRATES)}
              disabled={!numberizeAndFix(this.sourceFood.nutrients[FoodCalculatorKey.CARBOHYDRATES])}
              isRequired
              withoutMarginTop
            />
          </View>
          <View style={styles.buttons}>
            {isEditing && <>
              <StyledButton
                label={i18nGet('remove_racion')}
                onPress={this.onMealRemove}
                style={StyledButtonType.DELETE}
              />
              <View style={styles.space} />
            </>}
            <StyledButton
              label={isEditing ? i18nGet('rewrite') : i18nGet('add_racion')}
              onPress={this.onMealAdd}
              style={StyledButtonType.PRIMARY}
              disabled={!keyValue}
              fluid
            />
          </View>
        </View>
      );
    }
  }
}

export const FoodCalculatorConnected = connect(
  (state: IStorage, ownProps: Partial<Props>) => ({
    userDiabetesProperties: state.userDiabetesProperties,
    sourceFood: ownProps.food || selectSelectedFoodItem(state, ownProps.navigation?.getParam('foodId')),
    isEditing: ownProps.navigation?.getParam('isEditing') || ownProps.isEditing
  })
)(FoodCalculator);

const styles = StyleSheet.create({
  wrap: {
  },
  totalPadding: {
    padding: 16,
  },
  rowSection: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  rowSectionFirst: {
    marginTop: 0,
  },
  hint: {
    marginTop: 4,
    fontSize: 14,
    color: COLOR.TEXT_DIMGRAY,
  },
  nutrientsRow: {
  },
  nutrient: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  nutrientKey: {

  },
  nutrientValue: {

  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 16,
  },
  space: {
    paddingLeft: 4,
  }
});
