import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { createChangeFood, FoodSection, createRemoveFoodItem } from '../../store/modules/food/food';
import { IFoodListItem, IFoodList, FoodDatabase } from '../../model/IFood';
import { batchActions } from 'redux-batched-actions';
import { Text, View, StyleSheet, Image } from 'react-native';
import { BlockHat } from '../../component/hat/BlockHat';
import { StyledButton, StyledButtonType, IconPositionType } from '../../component/button/StyledButton';
import { FavoritesIcom } from '../../component/icon/FavoritesIcon';
import { COLOR } from '../../constant/Color';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';
import { i18nGet } from '../../localisation/Translate';
import { SHADOW_OPTIONS } from '../../constant/ShadowOptions';

interface OwnProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface Props extends OwnProps {
  foodItem: IFoodListItem
  favoritesList: IFoodList
  addFoodItemToFavorites: (foodItem: IFoodListItem) => void
  removeFoodItemFromFavorites: (foodItem: IFoodListItem) => void
  addToHistory: (foodItem: IFoodListItem) => void
}

function FoodCardComponent(props: Props) {
  const {
    foodItem,
    addToHistory,
    addFoodItemToFavorites,
    removeFoodItemFromFavorites,
    navigation,
    favoritesList,
  } = props;

  useEffect(() => addToHistory(foodItem), []);

  const onBack = () => {
    const selectedFoodPage = navigation.getParam('selectedFoodPage') || null;
    navigation.navigate(NavigatorEntities.FOOD_PAGE, { selectedFoodPage });
  };

  const isSelected = favoritesList[foodItem.id];
  const handler = isSelected
    ? () => removeFoodItemFromFavorites(foodItem)
    : () => addFoodItemToFavorites(foodItem);

  const energy = foodItem.nutrients.energy || foodItem.nutrients.calories
  return (
    <View>
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

export const FoodCard = connect(
  (state: IStorage, ownProps: OwnProps) => ({
    foodItem: ownProps.navigation.getParam('foodItem') || null,
    favoritesList: state.food.favorites,
  }),
  (dispatch) => ({
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
      dispatch(createChangeFood(FoodSection.HISTORY, { [foodItem.id]: foodItem }));
    },
  })
)(FoodCardComponent)

const styles = StyleSheet.create({
  view: {
    padding: 16,
  },
  imageWrap: {
    borderRadius: 10,
    backgroundColor: COLOR.PRIMARY_WHITE,
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
    marginTop: 16,
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
})
