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
import { IFood, IFoodList, IFoodListItem } from '../../../../model/IFood';
import { Loader } from '../../../../component/loader/Loader';
import { sortSearchResult } from '../../../../store/service-helper/sort-search-result';

interface Props {
  searchFood: IFoodList
  loading: boolean
  food: IFood,
  onType: (text: string) => void
  goToFoodCard: (foodId: string) => void
  goToFoodCardCreation: () => void
  clearSearch: () => void
};

function SearchContent(props: Props) {
  const { onType, goToFoodCard, food, clearSearch } = props;
  const [typed, setTyped] = React.useState('');

  const sortFunction = (foods: IFoodListItem[]) => sortSearchResult(typed, foods);

  useEffect(
    () => {
      !typed && clearSearch();
    }, [typed]
  );

  return (
    <View style={styles.view}>
      <View style={styles.inputView}>
        <BaseTextInput
          placeholder={i18nGet('type_food')}
          onChangeText={(text: string) => {
            setTyped(text);
            if (!text) clearSearch();
            !!text && onType(text);
          }}
          defaultValue={''}
          clearButtonMode={"while-editing"}
        />
      </View>
      {
        !!typed
          ? (
            <>
              <FoodList
                sortFunction={sortFunction}
                section={FoodSection.SEARCH}
                goToFoodCard={goToFoodCard}
              />
              {food.loading && <View style={styles.loadingView}>
                <Loader isManaged isManagedLoading={food.loading} />
              </View>}
            </>
          ) : <Text style={styles.text}>{i18nGet('food_search_tips_1')}</Text>
      }
    </View>
  );
}

export const SearchContentConnected = connect(
  (state: IStorage) => ({
    searchFood: state.food.search,
    loading: state.user.loading,
    food: state.food,
  }),
  (dispatch) => ({
    onType: (text: string) => dispatch(createSearchProductsAction(text)),
    clearSearch: () => dispatch(createReplaceFood(FoodSection.SEARCH, {}))
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
  loadingView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyListButton: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})
