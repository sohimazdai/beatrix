import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Text } from 'react-native';
import { BaseTextInput } from '../../../../component/input/BaseTextInput';
import { i18nGet } from '../../../../localisation/Translate';
import { createSearchProductByKeyAction } from '../../../../store/service/food/SearchProductByKeySaga';
import { FoodList } from '../FoodList';
import { FoodSection, createReplaceFood } from '../../../../store/modules/food/food';
import { SHADOW_OPTIONS } from '../../../../constant/ShadowOptions';
import { COLOR } from '../../../../constant/Color';

interface Props {
  onType: (text: string) => void
  goToFoodCard: (foodId: string) => void
  clearSearch: () => void;
};

function SearchContent(props: Props) {
  const { onType, goToFoodCard, clearSearch } = props;
  const [typed, setTyped] = React.useState('');

  useEffect(() => {
    clearSearch();
  }, []);

  return (
    <View style={styles.view}>
      <View style={styles.inputView}>
        <BaseTextInput
          placeholder={i18nGet('type_food')}
          onChangeText={(text: string) => {
            !!text && onType(text);
            setTyped(text)
          }}
          defaultValue={''}
        />
      </View>
      {
        !!typed
          ? <FoodList section={FoodSection.SEARCH} goToFoodCard={goToFoodCard} />
          : <Text style={styles.text}>{i18nGet('food_search_tips_1')}</Text>
      }
    </View>
  );
}

export const SearchContentConnected = connect(
  null,
  (dispatch) => ({
    onType: (text: string) => dispatch(createSearchProductByKeyAction(text)),
    clearSearch: () => dispatch(createReplaceFood(FoodSection.SEARCH, {})),
  })
)(SearchContent);

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  inputView: {
    padding: 16,
    height: 84,
    backgroundColor: COLOR.PRIMARY_WHITE,
    ...SHADOW_OPTIONS,
    elevation: 2,
  },
  text: {
    padding: 16,
    fontSize: 15,
    color: COLOR.TEXT_DIMGRAY,
  },
})
