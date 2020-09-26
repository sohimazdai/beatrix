import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Text } from 'react-native';
import { BaseTextInput } from '../../../../component/input/BaseTextInput';
import { i18nGet } from '../../../../localisation/Translate';
import { FoodList } from '../FoodList';
import { FoodSection, createReplaceFood } from '../../../../store/modules/food/food';
import { SHADOW_OPTIONS } from '../../../../constant/ShadowOptions';
import { COLOR } from '../../../../constant/Color';
import { createSearchProductsAction } from '../../../../store/service/food/SearchProductsSaga';
import { IStorage } from '../../../../model/IStorage';
import { IFoodList } from '../../../../model/IFood';
import { IconPositionType, StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import { AddNoteIcon } from '../../../../component/icon/AddNoteIcon';

interface Props {
  searchFood: IFoodList
  loading: boolean
  onType: (text: string) => void
  goToFoodCard: (foodId: string) => void
  goToFoodCardCreation: () => void
};

function SearchContent(props: Props) {
  const { onType, goToFoodCard, searchFood, goToFoodCardCreation, loading } = props;
  const [typed, setTyped] = React.useState('');
  const [searched, setSearched] = React.useState(false);

  const isListEmpty = Object.values(searchFood).length === 0;

  useEffect(() => {
    !loading && !!typed && setTimeout(() => {
      !loading && setSearched(true)
    }, 1000);
    loading && setSearched(false)
  }, [loading])

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
          clearButtonMode={"while-editing"}
        />
      </View>
      {
        !!typed 
        ? <FoodList section={FoodSection.SEARCH} goToFoodCard={goToFoodCard} />
        : <Text style={styles.text}>{i18nGet('food_search_tips_1')}</Text>
          // ? isListEmpty && searched
          //   ? (
          //     <View style={styles.emptyListButton}>
          //       <StyledButton
          //         style={StyledButtonType.PRIMARY}
          //         onPress={goToFoodCardCreation}
          //         label={i18nGet('create_food_card')}
          //         icon={<AddNoteIcon width={25} height={25} fill={COLOR.PRIMARY_WHITE} />}
          //         iconPosition={IconPositionType.RIGHT}
          //       />
          //       <Text style={styles.text}>{i18nGet('food_search_tips_add')}</Text>
          //     </View>
          //   ) : <FoodList section={FoodSection.SEARCH} goToFoodCard={goToFoodCard} />
          // : <Text style={styles.text}>{i18nGet('food_search_tips_1')}</Text>
      }
    </View>
  );
}

export const SearchContentConnected = connect(
  (state: IStorage) => ({
    searchFood: state.food.search,
    loading: state.user.loading,
  }),
  (dispatch) => ({
    onType: (text: string) => dispatch(createSearchProductsAction(text)),
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
    fontSize: 17,
    color: COLOR.TEXT_DARK_GRAY,
  },
  emptyListButton: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
})
