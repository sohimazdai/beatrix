import React from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Text } from 'react-native';
import { i18nGet } from '../../../../localisation/Translate';
import { FoodList } from '../FoodList';
import { FoodSection } from '../../../../store/modules/food/food';
import { COLOR } from '../../../../constant/Color';
import { IStorage } from '../../../../model/IStorage';
import { IFoodList } from '../../../../model/IFood';
import { StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';

interface Props {
  favoritesList: IFoodList
  goToFoodCard: (foodId: string) => void
  goToFoodCardCreation: () => void
};

function FavoritesContent(props: Props) {
  const { goToFoodCard, goToFoodCardCreation, favoritesList } = props;

  const thereAreFoods = Object.values(favoritesList).length > 0;
  return (
    <View style={styles.view}>
      <View style={styles.buttonView}>
        <StyledButton
          style={StyledButtonType.PRIMARY}
          label={i18nGet('create_food_card')}
          onPress={goToFoodCardCreation}
        />
      </View>
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
  buttonView: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: COLOR.BUTTON_STROKE_LIGHT_GRAY,
  },
  text: {
    padding: 16,
    fontSize: 17,
    color: COLOR.TEXT_DIMGRAY,
  },
})
