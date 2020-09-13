import React from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Text } from 'react-native';
import { BaseTextInput } from '../../../../component/input/BaseTextInput';
import { i18nGet } from '../../../../localisation/Translate';
import { createSearchProductByKeyAction } from '../../../../store/service/food/SearchProductByKeySaga';
import { FoodList } from '../FoodList';
import { FoodSection, foodReducer } from '../../../../store/modules/food/food';
import { SHADOW_OPTIONS } from '../../../../constant/ShadowOptions';
import { COLOR } from '../../../../constant/Color';
import { IStorage } from '../../../../model/IStorage';
import { IFoodList } from '../../../../model/IFood';

interface Props {
  favoritesList: IFoodList
  goToFoodCard: (foodId: string) => void
};

function FavoritesContent(props: Props) {
  const { goToFoodCard, favoritesList } = props;

  const thereAreFoods = Object.values(favoritesList).length > 0;
  return (
    <View style={styles.view}>
      {
        thereAreFoods
          ? <FoodList section={FoodSection.FAVORITES} goToFoodCard={goToFoodCard} />
          : <Text style={styles.text}>{i18nGet('you_not_added_any_food_yet')}</Text>
      }
    </View >
  );
}

export const FavoritesContentConnected = connect(
  (state: IStorage) => ({
    favoritesList: state.food.favorites,
  })
)(FavoritesContent);

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  text: {
    padding: 16,
    fontSize: 17,
    color: COLOR.TEXT_DARK_GRAY,
  },
})
