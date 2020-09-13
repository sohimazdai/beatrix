import React from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Text } from 'react-native';
import { IFoodList } from '../../../../model/IFood';
import { i18nGet } from '../../../../localisation/Translate';
import { IStorage } from '../../../../model/IStorage';
import { FoodList } from '../FoodList';
import { FoodSection } from '../../../../store/modules/food/food';
import { COLOR } from '../../../../constant/Color';

interface Props {
  goToFoodCard: (foodId: string) => void
  historyList: IFoodList
};

function HistoryContent(props: Props) {
  const { historyList, goToFoodCard } = props;
  const isListEmpty = Object.values(historyList).length > 0;

  return (
    <View style={styles.view}>
      {
        isListEmpty
          ? <FoodList section={FoodSection.HISTORY} goToFoodCard={goToFoodCard} />
          : <Text style={styles.text}>{i18nGet('you_are_have_not_history')}</Text>
      }
    </View >
  );
}

export const HistoryContentConnected = connect(
  (state: IStorage) => ({
    historyList: state.food.history,
  }),
  null
)(HistoryContent);

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
