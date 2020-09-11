import React from 'react';
import { View, Text } from 'react-native';
import { Hat } from '../../component/hat/Hat';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';
import { i18nGet } from '../../localisation/Translate';
import { StyledButton, StyledButtonType } from '../../component/button/StyledButton';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { FoodApi } from '../../api/FoodApi';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  onBreadSearch: () => void
};

class FoodScreenComponent extends React.Component<Props> {
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

  async auth() {
    const res = await FoodApi.auth();
    console.log('🤖🤖🤖🤖 auth res', res);
  }

  async onBreadSearch() {
    const res = await FoodApi.searchBread();
    console.log('🤖🤖🤖🤖 res', res);
  }

  render() {
    const { onBreadSearch } = this.props;

    return (
      <View>
        <Hat
          onBackPress={this.onBack}
          title={i18nGet('food')}
        />
        <Text>
          this is food screen
          ta daaaa
        </Text>
        <StyledButton
          style={StyledButtonType.PRIMARY}
          label="auth"
          onPress={this.auth}
        />
        <StyledButton
          style={StyledButtonType.PRIMARY}
          label="найти хлеп"
          onPress={this.onBreadSearch}
        />
      </View>
    );
  }
}


export const FoodScreen = connect(
  (state: IStorage) => ({

  }),
  (dispatch) => ({
    onBreadSearch: () => dispatch({ type: 'search_bread' })
  })
)(FoodScreenComponent)
