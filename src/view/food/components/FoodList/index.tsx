import React from 'react';
import { connect } from 'react-redux';

import { FoodSection } from '../../../../store/modules/food/food';
import { IStorage } from '../../../../model/IStorage';
import { IFoodList, IFoodListItem } from '../../../../model/IFood';
import { View } from 'react-native';
import FoodItem from '../FoodItem';
import { FlatList } from 'react-native-gesture-handler';

const DEFAULT_ELEMENTS_ON_SCREEN_INITIAL = 10;

interface Props {
  section: FoodSection
  foodList: IFoodList
  elementsToShow?: number
  cutTo?: number
  reversible?: boolean
  goToFoodCard: (foodId: string) => void
}

function FoodListComponent(props: Props) {
  const { foodList, elementsToShow, goToFoodCard, reversible, cutTo } = props;
  let foods: IFoodListItem[] = Object.values(foodList);

  if (reversible) {
    foods = foods.reverse();
  }

  if (cutTo) {
    foods = foods.slice(0, cutTo);
  }

  return (
    <>
      <FlatList
        data={foods}
        renderItem={({ item }) => (
          <FoodItem
            key={item.id}
            item={item}
            goToFoodCard={goToFoodCard}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}

export const FoodList = connect(
  (state: IStorage, ownProps: { section: FoodSection }) => ({
    foodList: state.food[ownProps.section] || {},
  })
)(FoodListComponent);
