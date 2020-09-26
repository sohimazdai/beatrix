import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { connect } from 'react-redux';
import { numberizeAndFix } from '../../../../api/helper/numberize-and-fix';
import { IconPositionType, StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import { AddNoteIcon } from '../../../../component/icon/AddNoteIcon';
import { COLOR } from '../../../../constant/Color';
import { Measures } from '../../../../localisation/Measures';
import { i18nGet } from '../../../../localisation/Translate';
import { IFoodListItem, IFoodNutrients } from '../../../../model/IFood';
import { IStorage } from '../../../../model/IStorage';
import { CarbsMeasuringType, IUserDiabetesProperties } from '../../../../model/IUserDiabetesProperties';
import { NavigatorEntities } from '../../../../navigator/modules/NavigatorEntities';
import { selectSelectedFoodItem } from '../../selectors/select-selected-food-item';
import { FoodCreationInput } from '../FoodCreationInput';

enum FoodCalculatorKey {
  WEIGHT = 'weight',
  BREAD_UNITS = 'breadUnits',

  CALORIES = 'calories',
  ENERGY = 'energy',
  CARBOHYDRATES = 'carbohydrates',
  PROTEINS = 'proteins',
  FATS = 'fats',
}

interface Props {
  userDiabetesProperties: IUserDiabetesProperties
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  withPadding?: boolean
  selectedFoodItem?: IFoodListItem
};

class FoodCalculator extends React.Component<Props> {
  state = {
    selectedKey: FoodCalculatorKey.WEIGHT,
    keyValue: (
      this.props.navigation.getParam('foodItem')?.nutrients?.weight ||
      '100'
    ),
    isErrored: false,
    trailingDot: false,
    isValueEmpty: false,
  }

  get foodItem(): IFoodListItem {
    const { selectedFoodItem } = this.props;

    return selectedFoodItem;
  }

  get currentRelation() {
    const { selectedKey, keyValue } = this.state;

    const selectedKeyValueFor100gram = selectedKey === FoodCalculatorKey.WEIGHT
      ? 100
      : selectedKey === FoodCalculatorKey.BREAD_UNITS
        ? numberizeAndFix(this.foodItem.nutrients.carbohydrates / this.xeWeight)
        : numberizeAndFix(this.foodItem.nutrients[selectedKey]);

    return numberizeAndFix(keyValue) / selectedKeyValueFor100gram;
  };

  get calculatedNutrients(): IFoodNutrients {
    const { calories, energy, carbohydrates, fats, proteins } = this.foodItem.nutrients;

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
    return numberizeAndFix(this.foodItem.nutrients.carbohydrates / this.xeWeight)
  }

  get calculatedXe(): number {
    const { carbohydrates } = this.calculatedNutrients;

    return numberizeAndFix(carbohydrates / this.xeWeight);
  }

  get wrapStyles() {
    const { withPadding } = this.props;

    return withPadding
      ? { ...styles.wrap, ...styles.totalPadding }
      : styles.wrap;
  }

  onTextInputFocus = (selectedKey: FoodCalculatorKey) => {
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
      })

      return;
    }

    if (text.slice(-1) === '.') {
      this.setState({
        keyValue: text,
        trailingDot: true,
        isValueEmpty: false,
      })

      return;
    }

    if (text.slice(1, 2) !== '.' && text.slice(0, 1) == '0') {
      this.setState({
        keyValue: text.slice(1),
        trailingDot: false,
        isValueEmpty: false,
      })

      return;
    }

    this.setState({
      keyValue: text,
      trailingDot: false,
      isValueEmpty: false,
    })
  }

  onMealAdd = () => {
    const { isValueEmpty } = this.state;
    const { navigation } = this.props;

    if (isValueEmpty) {
      this.setState({ isErrored: true });

      return;
    } else {
      this.setState({ isErrored: false });
    }

    const foodForNote: IFoodListItem = {
      ...this.foodItem,
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
    const { navigation } = this.props;

    navigation.navigate(
      NavigatorEntities.NOTE_EDITOR,
      {
        foodIdToRemove: this.foodItem.id,
        isEditing: false,
      },
    );
  }

  get isEditing() {
    return !!this.props.navigation.getParam('isEditing');
  }

  render() {
    const { isErrored, keyValue, selectedKey, trailingDot, isValueEmpty } = this.state;
    const { calories, energy, fats, proteins, carbohydrates } = this.calculatedNutrients;

    const postfix = (key: FoodCalculatorKey) => {
      return key === selectedKey && trailingDot ? '.' : '';
    }

    const isEmpty = (key: FoodCalculatorKey): boolean => {
      return key === selectedKey && isValueEmpty
    }

    const breadUntis = numberizeAndFix(this.currentRelation * this.originalXeIn100Gramm);

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
            autoFocus
            onFocus={() => this.onTextInputFocus(FoodCalculatorKey.WEIGHT)}
            type="decimal-pad"
            highlighted={selectedKey === FoodCalculatorKey.WEIGHT}
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
                type="decimal-pad"
                highlighted={selectedKey === FoodCalculatorKey.BREAD_UNITS}
                disabled={!this.foodItem.nutrients.carbohydrates}
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
            type="decimal-pad"
            isFormWithError={isErrored}
            onFocus={() => this.onTextInputFocus(FoodCalculatorKey.CALORIES)}
            isRequired
            highlighted={selectedKey === FoodCalculatorKey.CALORIES}
            disabled={!numberizeAndFix(this.foodItem.nutrients[FoodCalculatorKey.CALORIES])}
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
            type="decimal-pad"
            isFormWithError={isErrored}
            onFocus={() => this.onTextInputFocus(FoodCalculatorKey.ENERGY)}
            isRequired
            highlighted={selectedKey === FoodCalculatorKey.ENERGY}
            disabled={!numberizeAndFix(this.foodItem.nutrients[FoodCalculatorKey.ENERGY])}
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
            type="decimal-pad"
            isFormWithError={isErrored}
            onFocus={() => this.onTextInputFocus(FoodCalculatorKey.PROTEINS)}
            isRequired
            highlighted={selectedKey === FoodCalculatorKey.PROTEINS}
            disabled={!numberizeAndFix(this.foodItem.nutrients[FoodCalculatorKey.PROTEINS])}
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
            type="decimal-pad"
            isFormWithError={isErrored}
            onFocus={() => this.onTextInputFocus(FoodCalculatorKey.FATS)}
            isRequired
            highlighted={selectedKey === FoodCalculatorKey.FATS}
            disabled={!numberizeAndFix(this.foodItem.nutrients[FoodCalculatorKey.FATS])}
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
            type="decimal-pad"
            isFormWithError={isErrored}
            onFocus={() => this.onTextInputFocus(FoodCalculatorKey.CARBOHYDRATES)}
            highlighted={selectedKey === FoodCalculatorKey.CARBOHYDRATES}
            disabled={!numberizeAndFix(this.foodItem.nutrients[FoodCalculatorKey.CARBOHYDRATES])}
            isRequired
            withoutMarginTop
          />
        </View>
        <View style={styles.buttons}>
          {this.isEditing && <>
            <StyledButton
              label={i18nGet('remove_racion')}
              onPress={this.onMealRemove}
              style={StyledButtonType.DELETE}
            />
            <View style={styles.space} />
          </>}
          <StyledButton
            label={i18nGet('add_racion')}
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

export const FoodCalculatorConnected = connect(
  (state: IStorage, ownProps: Partial<Props>) => ({
    userDiabetesProperties: state.userDiabetesProperties,
    selectedFoodItem: selectSelectedFoodItem(state, ownProps.navigation?.getParam('foodItem')?.id)
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
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
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
