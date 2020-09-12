import React from 'react';
import { connect } from 'react-redux';

import { FoodSection } from '../../../../store/modules/food/food';
import { IStorage } from '../../../../model/IStorage';
import { IFoodList, IFoodListItem } from '../../../../model/IFood';
import { View } from 'react-native';
import FoodItem from '../FoodItem';

const DEFAULT_ELEMENTS_ON_SCREEN_INITIAL = 10;

interface Props {
  section: FoodSection
  foodList: IFoodList
  elementsToShow?: number
  goToFoodCard: (foodId: string) => void
}

function FoodListComponent(props: Props) {
  const { foodList, elementsToShow, goToFoodCard } = props;
  const cutTo = elementsToShow || DEFAULT_ELEMENTS_ON_SCREEN_INITIAL;
  const foods = Object.values(foodList).slice(0, cutTo);

  return (
    <View>
      {foods.map((food: IFoodListItem) => (
        <FoodItem
          key={food.id}
          item={food}
          goToFoodCard={goToFoodCard}
        />
      ))}
    </View>
  );
}

export const FoodList = connect(
  (state: IStorage, ownProps: { section: FoodSection }) => ({
    foodList: state.food[ownProps.section] || {},
  })
)(FoodListComponent);
