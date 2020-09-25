import React from 'react';
import { connect } from 'react-redux';

import { FoodSection } from '../../../../store/modules/food/food';
import { IStorage } from '../../../../model/IStorage';
import { IFoodList, IFoodListItem } from '../../../../model/IFood';
import FoodItem from '../FoodItem';
import { FlatList } from 'react-native-gesture-handler';
import NoteFoodItem from '../../../note-editor/components/NoteFoodItem';

interface Props {
  section?: FoodSection
  foodList: IFoodList
  cutTo?: number
  reversible?: boolean
  goToFoodCard: (foodId: string) => void
  sortBy?: string
  forNote?: boolean
}

export function FoodListComponent(props: Props) {
  const { foodList, sortBy, goToFoodCard, reversible, cutTo, forNote } = props;
  let foods: IFoodListItem[] = Object.values(foodList);

  if (sortBy) {
    foods = Object.values(foodList).sort((food1, food2) => food1[sortBy] - food2[sortBy]);
  }

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
          forNote
            ? (
              <NoteFoodItem
                key={item.id}
                item={item}
                goToFoodCard={goToFoodCard}
              />
            ) : (
              <FoodItem
                key={item.id}
                item={item}
                goToFoodCard={goToFoodCard}
              />
            )
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
