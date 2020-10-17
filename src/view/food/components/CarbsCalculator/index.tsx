import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { numberizeAndFix } from '../../../../api/helper/numberize-and-fix';
import { StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import { Checkbox } from '../../../../component/checkbox/Checkbox';
import { ArrowDirection, ArrowTaillessIcon } from '../../../../component/icon/ArrowTaillessIcon';
import { PopupHeader } from '../../../../component/popup/PopupHeader';
import { COLOR } from '../../../../constant/Color';
import { i18nGet } from '../../../../localisation/Translate';
import { FoodDatabase, IFoodListItem, IFoodNutrients } from '../../../../model/IFood';
import { FoodCreationInput } from '../FoodCreationInput';
import { v1 as uuidv1 } from 'uuid';
import { ScrollView } from 'react-native-gesture-handler';
import { FoodCalculatorConnected, FoodCalculatorType } from '../FoodCalculator';

interface Props {
  food?: IFoodListItem
  onClose: () => void
  onAdd: (product: IFoodListItem) => void
  onRemove: (id: string) => void
};

interface State {
  carbohydrates: number,
  fats: number,
  proteins: number,
  energy: number,
  calories: number,

  weight: number,
  carbsInWeight: number,

  isMounted: boolean
  isAdditionalFilling: boolean,
  selectedInput: string
  currentFoodId: string,
}

const initialState: State = {
  carbohydrates: 0,
  fats: 0,
  proteins: 0,
  energy: 0,
  calories: 0,

  weight: 0,
  carbsInWeight: 0,

  isAdditionalFilling: false,
  isMounted: false,
  selectedInput: null,
  currentFoodId: null,
}

function getNutrientsFor100GFromProp(food: IFoodListItem): IFoodNutrients {
  if (food) {
    const { carbohydrates, fats, proteins, calories, energy, weight } = food?.nutrients;

    return {
      carbohydrates: numberizeAndFix(carbohydrates * 100 / weight),
      fats: numberizeAndFix(fats * 100 / weight),
      proteins: numberizeAndFix(proteins * 100 / weight),
      calories: numberizeAndFix(calories * 100 / weight),
      energy: numberizeAndFix(energy * 100 / weight),
      weight,
    }
  }

  return {};
}

export class CarbsCalculator extends React.Component<Props, State> {
  state = {
    ...initialState,
    ...getNutrientsFor100GFromProp(this.props.food)
  }

  get foodNutrients(): IFoodNutrients {
    const { carbohydrates, fats, proteins, calories, energy, weight } = this.state;

    return {
      calories,
      energy,
      fats,
      proteins,
      carbohydrates,
      weight,
    }
  }

  get sourceFood(): IFoodListItem {
    return {
      id: 'quick_food',
      sourceId: 'quick_food',
      dbId: FoodDatabase.USERS_FAST_LOCAL_DB,
      name: 'quick_food_name',
      nutrients: this.foodNutrients
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.food?.id !== state.currentFoodId) {
      return {
        ...state,
        ...getNutrientsFor100GFromProp(props.food),
        currentFoodId: props.food?.id
      }
    }

    return state;
  }

  componentDidMount() {
    this.setState({ isMounted: true })
  }

  changeText = (text: string) => {
    const { selectedInput } = this.state;
    let inputValue = text;

    if (
      selectedInput === 'carbohydrates' ||
      selectedInput === 'proteins' ||
      selectedInput === 'fats'
    ) {
      inputValue = Number(inputValue) > 100 ? '100' : inputValue;
    }

    this.setState({
      [selectedInput]: inputValue
    } as any)
  }

  addProduct = (foodNutrients: IFoodNutrients) => {
    const { onAdd } = this.props;

    const id = this.props.food
      ? this.props.food.id
      : uuidv1()

    const product: IFoodListItem = {
      id,
      sourceId: id,
      dbId: FoodDatabase.USERS_FAST_LOCAL_DB,
      name: i18nGet('unknown_product'),
      nutrients: foodNutrients,
    };
    onAdd(product);
  };

  removeProduct = () => {
    const { onClose, onRemove, food: { id } } = this.props;

    onRemove(id);
    this.setInitialState();
    onClose();
  }

  setInitialState = () => {
    this.setState({ ...initialState });
  }


  getInputValue = (key: string) => {
    const propsNutrients = getNutrientsFor100GFromProp(this.props.food);
    const keyValue = this.state[key];

    return keyValue && keyValue === propsNutrients[key]
      ? keyValue
      : ''
  }

  render() {
    const { onClose, food } = this.props;
    const {
      carbohydrates, fats, proteins, energy, calories, isAdditionalFilling, weight, carbsInWeight
    } = this.state;
    const propsNutrients = getNutrientsFor100GFromProp(food);

    return (
      <ScrollView style={styles.popupContent}>
        <PopupHeader
          title={i18nGet('carbs_calculator_popup_header')}
          rightSlot={<StyledButton
            style={StyledButtonType.EMPTY}
            icon={<ArrowTaillessIcon direction={ArrowDirection.DOWN} width={20} height={20} />}
            onPress={onClose}
          />}
        />
        <View style={styles.per100GrammCont}>
          <Text style={styles.blockTitleText}>
            {i18nGet('specify_nutrients_for_100g_of_product')}
          </Text>
          <View style={styles.inputRow}>
            <FoodCreationInput
              label={`${i18nGet('food_creation_carbohydrates')}(${i18nGet('gram')})`}
              onTextChange={this.changeText}
              value={carbohydrates || ""}
              autoFocus={!propsNutrients.carbohydrates}
              onFocus={() => this.setState({ selectedInput: 'carbohydrates' })}
              type="decimal-pad"
              withoutMarginTop
            />
            {isAdditionalFilling && (
              <>
                <View style={styles.space} />
                <FoodCreationInput
                  label={`${i18nGet('food_creation_proteins')}(${i18nGet('gram')})`}
                  onTextChange={this.changeText}
                  value={proteins || ""}
                  onFocus={() => this.setState({ selectedInput: 'proteins' })}
                  type="decimal-pad"
                  withoutMarginTop
                />
                <View style={styles.space} />
                <FoodCreationInput
                  label={`${i18nGet('food_creation_fats')}(${i18nGet('gram')})`}
                  onTextChange={this.changeText}
                  value={fats || ""}
                  onFocus={() => this.setState({ selectedInput: 'fats' })}
                  type="decimal-pad"
                  withoutMarginTop
                />
              </>
            )}
          </View>
          {isAdditionalFilling && (
            <View style={styles.inputRow}>
              <FoodCreationInput
                label={`${i18nGet('food_creation_calories')}(${i18nGet('kcal')})`}
                onTextChange={this.changeText}
                value={calories || ""}
                onFocus={() => this.setState({ selectedInput: 'calories' })}
                type="decimal-pad"
              />
              <View style={styles.space} />
              <FoodCreationInput
                label={`${i18nGet('food_creation_energy')}(${i18nGet('kJ')})`}
                onTextChange={this.changeText}
                value={energy || ""}
                onFocus={() => this.setState({ selectedInput: 'energy' })}
                type="decimal-pad"
              />
            </View>
          )}
          <View style={styles.checkBoxView}>
            <Checkbox
              isChecked={isAdditionalFilling}
              onCheck={() => this.setState({ isAdditionalFilling: !isAdditionalFilling })}
              label={i18nGet('indicate_fats_prots_and_other')}
            />
          </View>
        </View>
        <View style={styles.indicationPortionBlock}>
          <Text style={styles.blockTitleText}>
            {i18nGet('indicate_portion')}
          </Text>
          <FoodCalculatorConnected
            type={FoodCalculatorType.QUICK_FOOD}
            food={this.sourceFood}
            quickRemove={this.removeProduct}
            quickAdd={this.addProduct}
            isEditing={!!this.props.food}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  popupContent: {
    padding: 16,
    backgroundColor: COLOR.PRIMARY_WHITE,
  },
  per100GrammCont: {
    marginTop: 8,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.PRIMARY
  },
  blockTitleText: {
    marginBottom: 8,
    fontSize: 16,
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  space: {
    padding: 4,
  },
  checkBoxView: {
    width: '100%',
    marginTop: 8,
  },
  buttonsRow: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  indicationPortionBlock: {
    marginTop: 16,
  }
});
