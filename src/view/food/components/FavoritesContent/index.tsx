import React, { useState } from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Text } from 'react-native';
import { i18nGet } from '../../../../localisation/Translate';
import { FoodListComponent } from '../FoodList';
import { COLOR } from '../../../../constant/Color';
import { IStorage } from '../../../../model/IStorage';
import { IFoodList } from '../../../../model/IFood';
import { StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import { BaseTextInput } from '../../../../component/input/BaseTextInput';
import findInTheList from './find-in-the-list';

interface Props {
  favoritesList: IFoodList
  goToFoodCard: (foodId: string) => void
  goToFoodCardCreation: () => void
};

function FavoritesContent(props: Props) {
  const { goToFoodCard, goToFoodCardCreation, favoritesList } = props;
  const [inputValue, setInputValue] = useState("");
  const filteredFavs = findInTheList(favoritesList, inputValue)

  const thereAreFoods = Object.values(favoritesList).length > 0;

  return (
    <View style={styles.view}>
      <View style={styles.optionsView}>
        <BaseTextInput
          placeholder={i18nGet('find_in_the_list')}
          onChangeText={setInputValue}
          value={inputValue}
          clearButtonMode={"while-editing"}
          clearable={!!inputValue}
          onClear={() => setInputValue('')}
        />
        <Text style={styles.optionsDividerText}>
          {i18nGet('or')}
        </Text>
        <StyledButton
          style={StyledButtonType.PRIMARY}
          label={i18nGet('create_food_card')}
          onPress={goToFoodCardCreation}
          small
        />
      </View>
      {
        thereAreFoods
          ? (
            <FoodListComponent
              foodList={filteredFavs}
              goToFoodCard={goToFoodCard}
              sortBy="foodAdded"
            />
          ) : (
            <Text style={styles.text}>
              {i18nGet('you_not_added_any_food_yet')}
            </Text>
          )
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
  optionsView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: COLOR.BUTTON_STROKE_LIGHT_GRAY,
  },
  inputView: {
    flex: 1,
    position: 'relative',
    backgroundColor: COLOR.PRIMARY_WHITE,
  },
  crossIcon: {
    position: 'absolute',
    right: 12,
    top: 4,
    display: 'flex',
    justifyContent: 'center',
  },
  optionsDividerText: {
    paddingHorizontal: 6,
    fontSize: 16,
    color: COLOR.TEXT_DIMGRAY,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
  text: {
    padding: 16,
    fontSize: 17,
    color: COLOR.TEXT_DIMGRAY,
  },
})
