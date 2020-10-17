import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { createChangeFood, FoodSection, createRemoveFoodItem } from '../../store/modules/food/food';
import { IFoodListItem, IFoodList, FoodDatabase, IFood } from '../../model/IFood';
import { batchActions } from 'redux-batched-actions';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import { BlockHat } from '../../component/hat/BlockHat';
import { StyledButton, StyledButtonType, IconPositionType } from '../../component/button/StyledButton';
import { FavoritesIcom } from '../../component/icon/FavoritesIcon';
import { COLOR } from '../../constant/Color';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';
import { i18nGet } from '../../localisation/Translate';
import { SHADOW_OPTIONS } from '../../constant/ShadowOptions';
import { FoodCalculatorConnected, FoodCalculatorType } from '../../view/food/components/FoodCalculator';
import { PopupDirection, SuperPopup } from '../../component/popup/SuperPopup';
import { PopupHeader } from '../../component/popup/PopupHeader';
import { ArrowDirection, ArrowTaillessIcon } from '../../component/icon/ArrowTaillessIcon';
import { selectSelectedFoodItem } from '../../view/food/selectors/select-selected-food-item';
import { createAddProductAction } from '../../store/service/food/AddProductSaga';
import { createGetFoodItemByIdAction } from '../../store/service/food/GetFoodItemById';
import { Loader } from '../../component/loader/Loader';
import { createAddProductToFavoriteAction } from '../../store/service/food/AddProductToFavoriteSaga';
import { createRemoveProdcutFromFavoriteAction } from '../../store/service/food/RemoveProductFromFavoritesSaga';
import { appAnalytics } from '../../app/Analytics';

interface OwnProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface Props extends OwnProps {
  foodItem: IFoodListItem
  favoritesList: IFoodList
  foodId: string
  foodLoading: boolean
  addProductToFavoriteInDb: (foodId: string) => void
  addFoodItemToFavorites: (foodItem: IFoodListItem) => void
  removeFoodItemFromFavorites: (foodItem: IFoodListItem) => void
  removeProductFromFavoriteInDb: (foodIds: string[]) => void
  addToHistory: (foodItem: IFoodListItem) => void
  autoAddToDb: (foodItem: IFoodListItem) => void
  getFoodItemById: (foodId: string) => void
  unsetfoodId: () => void
}

function FoodCardComponent(props: Props) {
  const {
    foodItem,
    addToHistory,
    autoAddToDb,
    addProductToFavoriteInDb,
    addFoodItemToFavorites,
    removeProductFromFavoriteInDb,
    removeFoodItemFromFavorites,
    navigation,
    favoritesList,
    foodId
  } = props;

  const [popupOpen, setPopupOpen] = React.useState(true);
  const isForNote = navigation.getParam('isForNote');

  useEffect(() => {
    addToHistory(foodItem);
    autoAddToDb(foodItem);

    appAnalytics.sendEventWithProps(
      appAnalytics.events.FOOD_CARD_SEEN,
      { dbId: foodItem.dbId, isForNote }
    )
  }, []);

  const onBack = () => {
    const backPage = navigation.getParam('backPage');
    if (backPage) {
      navigation.navigate(backPage);

      return;
    }

    const selectedFoodPage = navigation.getParam('selectedFoodPage') || null;
    navigation.navigate(NavigatorEntities.FOOD_PAGE, { selectedFoodPage });
  };

  const isSelected = favoritesList && !!favoritesList[foodId];
  const handler = isSelected
    ? () => {
      removeFoodItemFromFavorites(foodItem);
      removeProductFromFavoriteInDb([foodId]);
    } : () => {
      addFoodItemToFavorites(foodItem);
      addProductToFavoriteInDb(foodId);
    };

  const isEditing: boolean = navigation.getParam('isEditing');
  const popupBodyStyles = isEditing
    ? { ...styles.popup, ...styles.editingBg }
    : styles.popup;
  const popupStickerStyles = isEditing
    ? { ...styles.openPopupSticker, ...styles.editingBg }
    : styles.openPopupSticker;

  return (
    <View style={styles.wrap}>
      <BlockHat
        title={i18nGet('food_card')}
        onBackPress={onBack}
        rightSideSlot={<StyledButton
          style={StyledButtonType.EMPTY}
          onPress={handler}
          iconPosition={IconPositionType.LEFT}
          icon={<FavoritesIcom
            height={25}
            width={25}
            fill={isSelected ? COLOR.RED : COLOR.PRIMARY_WHITE}
          />}
          withoutPadding
        />}
      />
      <View style={styles.view}>
        {!!foodItem.image && (
          <View style={styles.imageWrap}>
            <Image
              style={styles.image}
              source={{ uri: foodItem.image }}
            />
          </View>
        )}
        <Text style={styles.title}>
          {foodItem.name}
        </Text>
        {!!foodItem.brandName && (
          <Text style={styles.brandName}>
            {`${i18nGet('food_brand_name')}: ${foodItem.brandName}`}
          </Text>
        )}
        <Text style={styles.nutrientsTitle}>
          {i18nGet('for_100g_of_product')}
        </Text>
        <View style={styles.nutritionTable}>
          <View style={styles.nutrientsKeyColumn}>
            <Text style={styles.nutrientItemTitle}>
              {i18nGet('food_proteins')}
            </Text>
            <Text style={styles.nutrientItemTitle}>
              {i18nGet('food_fat')}
            </Text>
            <Text style={styles.nutrientItemTitle}>
              {i18nGet('food_carbohydrates')}
            </Text>
            <Text style={styles.nutrientItemTitle}>
              {i18nGet('food_energy')}
            </Text>
            <Text style={styles.nutrientItemTitle}>
              {i18nGet('food_calories')}
            </Text>
          </View>
          <View style={styles.nutrientsValueColumn}>
            <Text style={styles.nutrientItemValue}>
              {foodItem.nutrients.proteins || 0}
            </Text>
            <Text style={styles.nutrientItemValue}>
              {foodItem.nutrients.fats || 0}
            </Text>
            <Text style={styles.nutrientItemValue}>
              {foodItem.nutrients.carbohydrates || 0}
            </Text>
            <Text style={styles.nutrientItemValue}>
              {foodItem.nutrients.energy || 0}
              {` ${i18nGet('kJ')}`}
            </Text>
            <Text style={styles.nutrientItemValue}>
              {foodItem.nutrients.calories || 0}
              {` ${i18nGet('kcal')}`}
            </Text>
          </View>
        </View>
        <View style={styles.source}>
          <Text style={styles.sourceKey}>
            {`${i18nGet('food_source')}: `}
          </Text>
          <Text style={styles.sourceValue}>
            {getDbName(foodItem.dbId)}
          </Text>
        </View>
      </View>
      {isForNote && !popupOpen && (
        <View style={popupStickerStyles}>
          <StyledButton
            icon={<ArrowTaillessIcon width={20} height={20} fill={COLOR.PRIMARY} direction={ArrowDirection.UP} />}
            onPress={() => setPopupOpen(true)}
            style={StyledButtonType.EMPTY}
            iconPosition={IconPositionType.LEFT}
          />
        </View>
      )}
      <SuperPopup direction={PopupDirection.BOTTOM_TOP} hidden={!isForNote || !popupOpen}>
        <View style={popupBodyStyles}>
          <PopupHeader
            title={i18nGet('indicate_portion')}
            rightSlot={
              <StyledButton
                icon={<ArrowTaillessIcon direction={ArrowDirection.DOWN} width={20} height={20} fill={COLOR.PRIMARY} />}
                style={StyledButtonType.EMPTY}
                onPress={() => setPopupOpen(false)}
              />
            }
          />
          <FoodCalculatorConnected type={FoodCalculatorType.FOOD_ADDING} navigation={navigation} />
        </View>
      </SuperPopup>
    </View>
  );
}

function getDbName(dbId: number | string) {
  switch (dbId) {
    case FoodDatabase.FAT_SECRET_US:
    case String(FoodDatabase.FAT_SECRET_US):
      return i18nGet('food_db_fat_secret');
    case FoodDatabase.OPEN_FOOD_FACTS:
    case String(FoodDatabase.OPEN_FOOD_FACTS):
      return i18nGet('food_db_off');
    case FoodDatabase.USDA_SR_27_PORTNOV:
    case String(FoodDatabase.USDA_SR_27_PORTNOV):
      return i18nGet('food_db_usda_27_portnov');
    case FoodDatabase.USERS_DB:
    case String(FoodDatabase.USERS_DB):
      return i18nGet('food_db_users_db');
    default: return i18nGet('food_db_unknown');
  }
}

function FoodCardLoader(props: Props) {
  const { foodItem, navigation, foodId, foodLoading, getFoodItemById } = props;

  const onBack = () => {
    const backPage = navigation.getParam('backPage');
    if (backPage) {
      navigation.navigate(backPage);

      return;
    }

    const selectedFoodPage = navigation.getParam('selectedFoodPage') || null;
    navigation.navigate(NavigatorEntities.FOOD_PAGE, { selectedFoodPage });
  };


  if (!foodItem) {
    useEffect(
      () => {
        getFoodItemById(foodId)
      },
      []
    );

    return (
      <View>
        <BlockHat
          onBackPress={onBack}
          title={i18nGet('food_card')}
        />
        {
          foodLoading
            ? (
              <View style={styles.foodCardLoaderContent}>
                <Text style={styles.foodLoadingStatusText}>
                  {i18nGet('food_loading_now')}
                </Text>
                <Loader isManaged isManagedLoading color={COLOR.PRIMARY} />
              </View>
            ) : (
              <View style={styles.foodCardLoaderContent}>
                <Text style={styles.foodLoadingStatusText}>
                  {i18nGet('food_not_loaded_we_are_sorry_try_later')}
                </Text>
              </View>
            )
        }
      </View>
    );
  }
  return <FoodCardComponent {...props} />
}

export const FoodCard = connect(
  (state: IStorage, ownProps: OwnProps) => ({
    foodItem: selectSelectedFoodItem(state, ownProps.navigation.getParam('foodId')),
    foodLoading: state.food.loading,
    favoritesList: state.food.favorites,
    foodId: ownProps.navigation.getParam('foodId'),
  }),
  (dispatch) => ({
    addProductToFavoriteInDb: (foodId: string) => dispatch(createAddProductToFavoriteAction(foodId)),
    removeProductFromFavoriteInDb: (foodIds: string[]) => dispatch(createRemoveProdcutFromFavoriteAction(foodIds)),
    addFoodItemToFavorites: (foodItem: IFoodListItem) => {
      dispatch(batchActions([
        createChangeFood(FoodSection.FAVORITES, { [foodItem.id]: foodItem }),
        createRemoveFoodItem(FoodSection.HISTORY, foodItem.id),
      ]));
    },
    removeFoodItemFromFavorites: (foodItem: IFoodListItem) => {
      dispatch(batchActions([
        createRemoveFoodItem(FoodSection.FAVORITES, foodItem.id),
        createChangeFood(FoodSection.HISTORY, { [foodItem.id]: foodItem }),
      ]));
    },
    addToHistory: (foodItem: IFoodListItem) => {
      dispatch(createChangeFood(
        FoodSection.HISTORY,
        {
          [foodItem.id]: { ...foodItem, dateAdded: new Date().getTime() }
        }
      ));
    },
    autoAddToDb: (foodItem: IFoodListItem) => {
      dispatch(createAddProductAction(foodItem, { auto: true }));
    },
    getFoodItemById: (foodId: string) => dispatch(createGetFoodItemByIdAction(foodId)),
  })
)(FoodCardLoader)

const styles = StyleSheet.create({
  wrap: {
    height: '100%',
  },
  view: {
    padding: 16,
  },
  imageWrap: {
    borderRadius: 10,
    backgroundColor: COLOR.PRIMARY_WHITE,
    marginBottom: 16,
    ...SHADOW_OPTIONS,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 19,
    color: COLOR.TEXT_DARK_GRAY,
  },
  brandName: {
    fontSize: 17,
    color: COLOR.TEXT_DARK_GRAY,
    marginTop: 4,
  },
  nutrientsTitle: {
    marginTop: 16,
    fontSize: 16,
    color: COLOR.TEXT_DARK_GRAY,
    borderBottomColor: COLOR.TEXT_DIMGRAY,
    borderBottomWidth: 1,
  },
  nutritionTable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  nutrientsKeyColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  nutrientsValueColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  nutrientsItem: {
    flexDirection: 'row',
  },
  nutrientItemTitle: {
    paddingTop: 4,
    fontSize: 17,
    color: COLOR.TEXT_BLACK,
  },
  nutrientItemValue: {
    paddingTop: 4,
    paddingLeft: 8,
    fontSize: 17,
    color: COLOR.TEXT_BLACK,
  },
  source: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'row',
  },
  sourceKey: {
    fontSize: 17,
    color: COLOR.TEXT_DIMGRAY,
  },
  sourceValue: {
    flex: 1,
    paddingLeft: 8,
    fontSize: 17,
    color: COLOR.TEXT_DIMGRAY,
  },
  popup: {
    backgroundColor: COLOR.BLUE_BASE,
    padding: 16,
  },
  openPopupSticker: {
    position: 'absolute',
    bottom: 0,
    right: 16,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 8,
    backgroundColor: COLOR.BLUE_BASE,
  },
  editingBg: {
    backgroundColor: COLOR.RED_BASE
  },
  foodCardLoaderContent: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  foodLoadingStatusText: {
    fontSize: 18,
    color: COLOR.PRIMARY,
    padding: 16,
  },
})
