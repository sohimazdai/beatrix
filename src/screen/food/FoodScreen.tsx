import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';
import { i18nGet } from '../../localisation/Translate';
import { StyledButton, StyledButtonType, IconPositionType } from '../../component/button/StyledButton';
import { connect } from 'react-redux';
import Tabs from '../../view/food/components/Tabs';
import { FoodSection, createReplaceFood } from '../../store/modules/food/food';
import { SearchContentConnected } from '../../view/food/components/SearchContent';
import { BlockHat } from '../../component/hat/BlockHat';
import { ScanBarcodeIcon } from '../../component/icon/ScanBarcodeIcon';
import { COLOR } from '../../constant/Color';
import { HistoryContentConnected } from '../../view/food/components/HistoryContent';
import { FavoritesContentConnected } from '../../view/food/components/FavoritesContent';
import { IStorage } from '../../model/IStorage';
import { IFood } from '../../model/IFood';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  clearSearch: () => void;
  food: IFood
};

interface State {
  selectedPage: FoodSection
}

class FoodScreenComponent extends React.Component<Props, State> {
  state = {
    selectedPage: this.props.navigation.getParam('selectedFoodPage') || FoodSection.SEARCH
  };

  componentWillUnmount() {
    const { clearSearch } = this.props;

    clearSearch();
  }

  goToFoodCard = (foodId: string, section: FoodSection) => {
    const { navigation, food } = this.props;

    navigation.navigate(
      NavigatorEntities.FOOD_CARD,
      {
        selectedFoodPage: FoodSection.HISTORY,
        foodItem: food[section][foodId],
      },
    );
  }

  goToFoodCardCreation = () => {
    const { navigation } = this.props;

    navigation.navigate(
      NavigatorEntities.FOOD_CARD_CREATION,
      {
        selectedFoodPage: FoodSection.HISTORY,
      },
    );
  }

  onBack = () => {
    const { navigation } = this.props;

    const backPage =
      navigation &&
      navigation.state &&
      navigation.state.params &&
      navigation.state.params.backPage ||
      NavigatorEntities.NOTE_EDITOR;

    navigation.navigate(backPage);
  };

  navigateToBarcodeScanningScreen = () => {
    const { navigation } = this.props;

    navigation.navigate(NavigatorEntities.BARCODE_SCANNING)
  }

  render() {
    const { selectedPage } = this.state;

    return (
      <View style={styles.screen}>
        <BlockHat
          onBackPress={this.onBack}
          title={i18nGet('food')}
          rightSideSlot={<StyledButton
            icon={<ScanBarcodeIcon width={30} height={30} fill={COLOR.PRIMARY_WHITE} />}
            style={StyledButtonType.EMPTY}
            onPress={this.navigateToBarcodeScanningScreen}
            iconPosition={IconPositionType.LEFT}
            withoutPadding
          />}
        />
        <Tabs
          selectedPage={selectedPage}
          onPageSelect={(section) => this.setState({ selectedPage: section })}
        />
        {this.renderAppropriateContent()}
      </View>
    );
  }

  renderAppropriateContent() {
    const { selectedPage } = this.state;

    switch (selectedPage) {
      case FoodSection.SEARCH:
        return <SearchContentConnected
          goToFoodCard={(foodId) => this.goToFoodCard(foodId, FoodSection.SEARCH)}
        />;
      case FoodSection.HISTORY:
        return <HistoryContentConnected
          goToFoodCard={(foodId) => this.goToFoodCard(foodId, FoodSection.HISTORY)}
        />;
      case FoodSection.FAVORITES:
        return <FavoritesContentConnected
          goToFoodCard={(foodId) => this.goToFoodCard(foodId, FoodSection.FAVORITES)}
          goToFoodCardCreation={this.goToFoodCardCreation}
        />;

    }
  }
}


export const FoodScreen = connect(
  (state: IStorage) => ({
    food: state.food,
  }),
  (dispatch) => ({
    clearSearch: () => dispatch(createReplaceFood(FoodSection.SEARCH, {})),
  }),
)(FoodScreenComponent);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
