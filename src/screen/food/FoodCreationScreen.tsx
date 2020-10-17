import React from 'react';
import { connect } from 'react-redux';

import { Alert, CheckBox, StyleSheet, Text, View } from 'react-native';
import { BlockHat } from '../../component/hat/BlockHat';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { FoodDatabase, IFoodListItem } from '../../model/IFood';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';
import { getLocale, getRegion, i18nGet, LocaleType, RegionType } from '../../localisation/Translate';
import { ScrollView } from 'react-native-gesture-handler';
import { COLOR } from '../../constant/Color';
import { v4 as uuidv4 } from 'uuid';
import { FoodCreationInput } from '../../view/food/components/FoodCreationInput';
import { convertCaloriesToEnergy, convertEnergyToCalories } from '../../calculation-services/food-calculation-services/calories-energy-converter';
import { IconPositionType, StyledButton, StyledButtonType } from '../../component/button/StyledButton';
import { createAddProductAction } from '../../store/service/food/AddProductSaga';
import { AddNoteIcon } from '../../component/icon/AddNoteIcon';
import { numberizeAndFix } from '../../api/helper/numberize-and-fix';
import { v1 } from 'uuid';
import { appAnalytics } from '../../app/Analytics';
import { Checkbox } from '../../component/checkbox/Checkbox';
import { IStorage } from '../../model/IStorage';
import { IUser } from '../../model/IUser';

const foodToCreateId = uuidv4();

interface OwnProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface Props extends OwnProps {
  user: IUser
  addProduct: (food: IFoodListItem) => void
};

class FoodCreationScreen extends React.Component<Props> {
  state = {
    id: foodToCreateId,
    sourceId: foodToCreateId,
    dbId: FoodDatabase.USERS_DB,
    barcode: !!this.props.navigation.getParam('barcode')
      ? this.props.navigation.getParam('barcode')
      : '',
    name: '',
    brandName: '',
    calories: '',
    energy: '',
    proteins: '',
    fats: '',
    carbohydrates: '',

    isForPublishing: false,
    isErrored: false,
  }

  componentDidMount() {
    appAnalytics.sendEvent(appAnalytics.events.FOOD_CREATION_SEEN)
  }

  get locale() {
    return LocaleType[getLocale()];
  }

  get region() {
    return RegionType[getRegion()];
  }

  get product(): IFoodListItem {
    const { isErrored, calories, energy, proteins, fats, carbohydrates, ...product } = this.state;

    return {
      ...product,
      nutrients: {
        calories: Number(calories),
        energy: Number(energy),
        proteins: Number(proteins),
        fats: Number(fats),
        carbohydrates: Number(carbohydrates),
      }
    };
  }

  onBack = () => {
    const { navigation } = this.props;

    const backPage =
      navigation &&
      navigation.state &&
      navigation.state.params &&
      navigation.state.params.backPage;

    if (backPage) {
      navigation.navigate(backPage);
    } else {
      const selectedFoodPage = navigation.getParam('selectedFoodPage') || null;
      navigation.navigate(NavigatorEntities.FOOD_PAGE, { selectedFoodPage });
    }
  };

  onCaloriesChange = (text: string) => {
    this.setState({
      calories: text,
      energy: String(numberizeAndFix(convertCaloriesToEnergy(Number(text)))),
    })
  }

  onEnergyChange = (text: string) => {
    this.setState({
      energy: text,
      calories: String(numberizeAndFix(convertEnergyToCalories(Number(text)))),
    })
  }

  onAddFood = () => {
    const { name, isForPublishing } = this.state;
    const { user } = this.props;
    const { calories, proteins, fats, carbohydrates } = this.product.nutrients;

    const { addProduct, navigation } = this.props;
    const id = v1();

    if ((proteins + fats + carbohydrates) > 100) {
      Alert.alert(
        i18nGet('food_is_not_added'),
        i18nGet('in_100_gram_product_can_not_be_nutritients_more_than_100_gramm')
      );
      return;
    }

    if (
      !name ||
      (!calories && calories !== 0) ||
      (!proteins && proteins !== 0) ||
      (!fats && fats !== 0) ||
      (!carbohydrates && carbohydrates !== 0)
    ) {
      this.setState({ isErrored: true })
      return;
    }

    const product = {
      ...this.product,
      id,
      sourceId: id,
      userId: user.id,
      dbId: isForPublishing ? FoodDatabase.USERS_DB : FoodDatabase.USERS_LOCAL_DB,
    };

    addProduct(product);
    this.setState({ isErrored: false });

    setTimeout(() => {
      navigation.navigate(NavigatorEntities.FOOD_CARD, { foodId: id });
    }, 500);
  }

  render() {
    const {
      name, brandName, barcode, calories, energy,
      proteins, fats, carbohydrates, isErrored, isForPublishing,
    } = this.state;

    return (
      <View style={styles.view}>
        <BlockHat
          onBackPress={this.onBack}
          title={i18nGet('food_card_creation')}
        />
        <ScrollView style={styles.scrollView}>
          <FoodCreationInput
            label={i18nGet('food_creation_product_name')}
            onTextChange={(text: string) => this.setState({ name: text })}
            value={name}
            type="default"
            isFormWithError={isErrored}
            isRequired
          />
          <FoodCreationInput
            label={i18nGet('food_creation_brand_name')}
            onTextChange={(text: string) => this.setState({ brandName: text })}
            value={brandName}
            isFormWithError={isErrored}
            type="default"
          />
          <FoodCreationInput
            label={i18nGet('food_creation_barcode')}
            onTextChange={(text: string) => this.setState({ barcode: text })}
            value={barcode}
            isFormWithError={isErrored}
            type="default"
          />
          <View style={styles.rowSection}>
            <FoodCreationInput
              label={i18nGet('food_creation_calories')}
              onTextChange={this.onCaloriesChange}
              value={calories}
              type="decimal-pad"
              isFormWithError={isErrored}
              isRequired
            />
            <View style={styles.space} />
            <FoodCreationInput
              label={i18nGet('food_creation_energy')}
              onTextChange={this.onEnergyChange}
              value={energy}
              type="decimal-pad"
              isFormWithError={isErrored}
              isRequired
            />
          </View>
          <Text style={styles.hint}>
            {i18nGet('one_of_these_fields_is_required_at_least')}
          </Text>
          <View style={styles.rowSection}>
            <FoodCreationInput
              label={i18nGet('food_creation_proteins')}
              onTextChange={(text: string) => this.setState({ proteins: text })}
              value={proteins}
              isFormWithError={isErrored}
              type="decimal-pad"
              isRequired
            />
            <View style={styles.space} />
            <FoodCreationInput
              label={i18nGet('food_creation_fats')}
              onTextChange={(text: string) => this.setState({ fats: text })}
              value={fats}
              isFormWithError={isErrored}
              type="decimal-pad"
              isRequired
            />
            <View style={styles.space} />
            <FoodCreationInput
              label={i18nGet('food_creation_carbohydrates')}
              onTextChange={(text: string) => this.setState({ carbohydrates: text })}
              value={carbohydrates}
              isFormWithError={isErrored}
              type="decimal-pad"
              isRequired
            />
          </View>
          <Text style={styles.hint}>
            {i18nGet('type_zero_if_not_exists')}
          </Text>
          <View style={styles.checkbox}>
            <Checkbox
              onCheck={() => this.setState({ isForPublishing: !isForPublishing })}
              isChecked={isForPublishing}
              label={i18nGet('publish_to_whole_world')}
            />
          </View>
          <View style={styles.buttonBar}>
            <StyledButton
              label={i18nGet('create_food_card')}
              onPress={this.onAddFood}
              icon={<AddNoteIcon width={25} height={25} fill={COLOR.PRIMARY_WHITE} />}
              iconPosition={IconPositionType.RIGHT}
              style={StyledButtonType.PRIMARY}
            />
          </View>
        </ScrollView>
      </View >
    );
  }
}

export const FoodCreationScreenConnected = connect(
  (state: IStorage) => ({
    user: state.user,
  }),
  dispatch => ({
    addProduct: (product: IFoodListItem) => dispatch(createAddProductAction(product)),
  }),
)(FoodCreationScreen);

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
    paddingTop: 0,
  },
  rowSection: {
    // marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  hint: {
    marginTop: 4,
    fontSize: 14,
    color: COLOR.TEXT_DIMGRAY,
  },
  buttonBar: {
    marginTop: 24,
    paddingBottom: 16,
  },
  space: {
    padding: 2,
  },
  checkbox: {
    marginTop: 16,
  }
})
