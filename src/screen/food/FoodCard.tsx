import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { createChangeFood, FoodSection, createRemoveFoodItem } from '../../store/modules/food/food';
import { IFoodListItem, IFoodList } from '../../model/IFood';
import { batchActions } from 'redux-batched-actions';
import { Text, View, StyleSheet, Image } from 'react-native';
import { BlockHat } from '../../component/hat/BlockHat';
import { StyledButton, StyledButtonType, IconPositionType } from '../../component/button/StyledButton';
import { FavoritesIcom } from '../../component/icon/FavoritesIcon';
import { COLOR } from '../../constant/Color';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';
import { i18nGet } from '../../localisation/Translate';

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

  return (
    <View>
      <BlockHat
        title={foodItem.name}
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
      <Image
        style={styles.image}
        source={{ uri: foodItem.image }}
      />
      <View style={styles.view}>
        <Text style={styles.genericTitle}>
          {foodItem.genericName}
        </Text>
        <Text style={styles.nutrientsTitle}>
          {i18nGet('for_100g_of_product')}:
        </Text>
        <View style={styles.nutrientsItem}>
          <Text style={styles.nutrientItemTitle}>
            {i18nGet('food_proteins')}
          </Text>
          <Text style={styles.nutrientItemValue}>
            {foodItem.nutrients.proteins}
          </Text>
        </View>
        <View style={styles.nutrientsItem}>
          <Text style={styles.nutrientItemTitle}>
            {i18nGet('food_fat')}
          </Text>
          <Text style={styles.nutrientItemValue}>
            {foodItem.nutrients.fat}
          </Text>
        </View>
        <View style={styles.nutrientsItem}>
          <Text style={styles.nutrientItemTitle}>
            {i18nGet('food_carbohydrates')}
          </Text>
          <Text style={styles.nutrientItemValue}>
            {foodItem.nutrients.carbohydrates}
          </Text>
        </View>
      </View>
    </View>
  );
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
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: "contain",
  },
  genericTitle: {
    fontSize: 19,
    color: COLOR.TEXT_DARK_GRAY,
    marginTop: 16,
  },
  nutrientsTitle: {
    fontSize: 16,
    color: COLOR.TEXT_DARK_GRAY,
    marginTop: 12,
  },
  nutrientsItem: {
    paddingTop: 4,
    flexDirection: 'row',
  },
  nutrientItemTitle: {
    fontSize: 17,
    color: COLOR.TEXT_BLACK,
  },
  nutrientItemValue: {
    fontSize: 17,
    color: COLOR.TEXT_BLACK,
    paddingLeft: 4,
  }
})
