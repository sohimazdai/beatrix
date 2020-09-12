import React from 'react';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { createChangeFood, FoodSection, createRemoveFoodItem } from '../../store/modules/food/food';
import { IFoodListItem, IFoodList } from '../../model/IFood';
import { batchActions } from 'redux-batched-actions';
import { Text, View, ImageBackground, StyleSheet, Image } from 'react-native';
import { BlockHat } from '../../component/hat/BlockHat';
import { StyledButton, StyledButtonType, IconPositionType } from '../../component/button/StyledButton';
import { FavoritesIcom } from '../../component/icon/FavoritesIcon';
import { COLOR } from '../../constant/Color';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';

interface OwnProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface Props extends OwnProps {
  foodItem: IFoodListItem
  addFoodItemToFavorites: (foodItem: IFoodListItem) => void
  addToHistory: (foodItem: IFoodListItem) => void
}

function FoodCardComponent(props: Props) {
  const { foodItem, addToHistory, addFoodItemToFavorites, navigation } = props;

  const onBack = () => {
    const selectedFoodPage = navigation.getParam('selectedFoodPage') || null;
    navigation.navigate(NavigatorEntities.FOOD_PAGE, { selectedFoodPage });
  };

  console.log('🤖🤖🤖🤖 image', foodItem.image);
  return (
    <View>
      <BlockHat
        rightSideSlot={<StyledButton
          style={StyledButtonType.EMPTY}
          onPress={() => addFoodItemToFavorites(foodItem)}
          iconPosition={IconPositionType.LEFT}
          icon={<FavoritesIcom height={25} width={25} fill={COLOR.PRIMARY_WHITE} />} //TODO: change colors and handlers for already liked food 
          withoutPadding
        />}
        title={foodItem.name || foodItem.genericName}
        onBackPress={onBack}
      />
      <View>
        <Image
          style={styles.image}
          source={{ uri: foodItem.image }}
        />
        <Text>
          {foodItem.genericName || foodItem.name}
        </Text>
      </View>
    </View>
  );
}

export const FoodCard = connect(
  (state: IStorage, ownProps: OwnProps) => ({
    foodItem: ownProps.navigation.getParam('foodItem') || null,
  }),
  (dispatch) => ({
    addFoodItemToFavorites: (foodItem: IFoodListItem) => {
      dispatch(batchActions([
        createChangeFood(FoodSection.FAVORITES, { [foodItem.id]: foodItem }),
        createRemoveFoodItem(FoodSection.HISTORY, foodItem.id),
      ]));
    },
    addToHistory: (foodItem: IFoodListItem) => {
      dispatch(createChangeFood(FoodSection.HISTORY, { [foodItem.id]: foodItem }));
    },
  })
)(FoodCardComponent)

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 100,
    height: 50,
    resizeMode: "contain",
    justifyContent: "center"
  }
})
