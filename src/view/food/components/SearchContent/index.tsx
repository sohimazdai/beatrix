import React from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet } from 'react-native';
import { IFoodList } from '../../../../model/IFood';
import { BaseTextInput } from '../../../../component/input/BaseTextInput';
import { i18nGet } from '../../../../localisation/Translate';
import { IStorage } from '../../../../model/IStorage';
import { createSearchProductByKeyAction } from '../../../../store/service/barcode/SearchProductByKeySaga';
import { FoodList } from '../FoodList';
import { FoodSection } from '../../../../store/modules/food/food';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { NavigatorEntities } from '../../../../navigator/modules/NavigatorEntities';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  loading: boolean
  onType: (text: string) => void
  searchList: IFoodList
};

class SearchContent extends React.Component<Props> {
  goToFoodCard = (foodId: string) => {
    const { navigation, searchList } = this.props;
    navigation.navigate(
      NavigatorEntities.FOOD_CARD,
      {
        selectedFoodPage: FoodSection.SEARCH,
        foodItem: searchList[foodId],
      },
    );
  };

  render() {
    const { onType } = this.props;

    return (
      <View>
        <View style={styles.inputView}>
          <BaseTextInput
            placeholder={i18nGet('type_food')}
            onChangeText={onType}
            defaultValue={''}
          />
        </View>
        <ScrollView>
          <FoodList section={FoodSection.SEARCH} goToFoodCard={this.goToFoodCard} />
        </ScrollView>
      </View>
    );
  }
}

export const SearchContentConnected = connect(
  (state: IStorage) => ({
    loading: state.food.loading,
    searchList: state.food.search,
  }),
  (dispatch) => ({
    onType: (text: string) => dispatch(createSearchProductByKeyAction(text)),
  })
)(SearchContent);

const styles = StyleSheet.create({
  inputView: {
    margin: 16,
    height: 52,
  }
})
