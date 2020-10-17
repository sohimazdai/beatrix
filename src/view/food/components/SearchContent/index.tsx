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
import { StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import { CrossIcon } from '../../../../component/icon/CrossIcon';
import { IApp } from '../../../../model/IApp';
import { NetworkIssue } from '../../../shared/components/NetworkIssue';

interface Props {
  app: IApp
  searchFood: IFoodList
  loading: boolean
  food: IFood,
  onType: (text: string) => void
  goToFoodCard: (foodId: string) => void
  goToFoodCardCreation: () => void
  clearSearch: () => void
};

function SearchContent(props: Props) {
  const { onType, goToFoodCard, food, clearSearch, goToFoodCardCreation, app } = props;
  const [typed, setTyped] = React.useState('');

  const sortFunction = (foods: IFoodListItem[]) => sortSearchResult(typed, foods);

  useEffect(
    () => {
      !typed && clearSearch();
    }, [typed]
  );

  const type = (text: string) => {
    setTyped(text);
    !!text && onType(text);
    if (!text) clearSearch();
  }

  return (
    <View style={styles.view}>
      <View style={styles.inputView}>
        <BaseTextInput
          placeholder={i18nGet('type_food')}
          onChangeText={type}
          value={typed}
          defaultValue={''}
          clearButtonMode={"while-editing"}
          disabled={!app.serverAvailable}
        />
        {!!typed && <View style={styles.crossIcon}>
          <StyledButton
            icon={<CrossIcon width={12} height={12} />}
            style={StyledButtonType.EMPTY}
            onPress={() => setTyped('')}
          />
        </View>}
      </View>
      {
        !!typed
          ? !food.loading && (!Object.values(food.search) || Object.values(food.search).length === 0)
            ? <>
              <Text style={styles.text}>{i18nGet('food_search_tips_2')}</Text>
              <View style={styles.styledButton}>
                <StyledButton
                  style={StyledButtonType.PRIMARY}
                  label={i18nGet('add_food')}
                  onPress={goToFoodCardCreation}
                />
              </View>
            </>
            : (
              <>
                <FoodList
                  sortFunction={sortFunction}
                  section={FoodSection.SEARCH}
                  goToFoodCard={goToFoodCard}
                  cutTo={20}
                />
                {food.loading && <View style={styles.loadingView}>
                  <Loader isManaged isManagedLoading={food.loading} />
                </View>}
              </>
            )
          : <Text style={styles.text}>{i18nGet('food_search_tips_1')}</Text>
      }
      <NetworkIssue />
    </View>
  );
}

export const SearchContentConnected = connect(
  (state: IStorage) => ({
    searchFood: state.food.search,
    loading: state.user.loading,
    food: state.food,
    app: state.app,
  }),
  (dispatch) => ({
    onType: (text: string) => dispatch(createSearchProductsAction(text)),
    clearSearch: () => dispatch(createReplaceFood(FoodSection.SEARCH, {}))
  })
)(SearchContent);

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    flex: 1,
  },
  inputView: {
    position: 'relative',
    padding: 16,
    height: 84,
    backgroundColor: COLOR.PRIMARY_WHITE,
    ...SHADOW_OPTIONS,
    elevation: 2,
  },
  crossIcon: {
    position: 'absolute',
    right: 24,
    display: 'flex',
    height: 84,
    justifyContent: 'center',
  },
  text: {
    padding: 16,
    fontSize: 17,
    color: COLOR.TEXT_DARK_GRAY,
    textAlign: 'center',
  },
  styledButton: {
    width: 200,
    alignSelf: 'center',
  },
  loadingView: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListButton: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})
