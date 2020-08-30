import React from 'react';
import { connect } from 'react-redux';

import { View } from 'react-native';
import { ITagList } from '../../model/ITagList';
import { IStorage } from '../../model/IStorage';
import { BlockHat } from '../../component/hat/BlockHat';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';
import { i18nGet } from '../../localisation/Translate';

interface Props {
  tagList: ITagList
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

class TagEditorComp extends React.Component<Props> {
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

  render() {
    return (
      <View>
        <BlockHat
          onBackPress={this.onBack}
          title={i18nGet('tag_editor')}
        />
      </View>
    );
  }
}

export const TagEditor = connect(
  (state: IStorage) => ({
    tagList: state.tagList
  })
)(TagEditorComp);
