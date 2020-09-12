import React from 'react';
import { View, StyleSheet } from 'react-native';
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

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  clearSearch: () => void;
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
    const { navigation } = this.props;
    const { selectedPage } = this.state;

    return (
      <View>
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
        <Tabs selectedPage={FoodSection.SEARCH} />
        {selectedPage === FoodSection.SEARCH && <SearchContentConnected navigation={navigation} />}
        {selectedPage === FoodSection.HISTORY && <SearchContentConnected navigation={navigation} />}
        {selectedPage === FoodSection.FAVORITES && <SearchContentConnected navigation={navigation} />}
      </View>
    );
  }
}


export const FoodScreen = connect(
  null,
  (dispatch) => ({
    clearSearch: () => dispatch(createReplaceFood(FoodSection.SEARCH, {})),
  }),
)(FoodScreenComponent)

const styles = StyleSheet.create({
  barscanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '80%',
  }
})
