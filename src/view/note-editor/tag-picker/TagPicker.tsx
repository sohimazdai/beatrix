import React from 'react';
import { connect } from 'react-redux';

import { View, Text, StyleSheet } from 'react-native';
import { IStorage } from '../../../model/IStorage';
import { ITagList, ITag, ITagListTags } from '../../../model/ITagList';
import { StyledButton, StyledButtonType } from '../../../component/button/StyledButton';
import { i18nGet } from '../../../localisation/Translate';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { NavigatorEntities } from '../../../navigator/modules/NavigatorEntities';
import { Tag } from './Tag';
import { COLOR } from '../../../constant/Color';

interface Props {
  tagList: ITagList,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

interface State {
  selectedTags: number[]
}

class Picker extends React.Component<Props, State> {
  state = {
    selectedTags: [],
  }

  goToTagListEditor = () => {
    const { navigation } = this.props;

    navigation.navigate(NavigatorEntities.NOTE_EDITOR) //TODO: add real screen
  }

  render() {
    const { tagList } = this.props;
    const tags: ITagListTags = tagList.tags;

    if (Object.values(tags).length === 0) {
      return (
        <View style={styles.tagPicker}>
          <Text>
            {i18nGet('there_are_no_tags')}
          </Text>
          <View>
            <StyledButton
              label={i18nGet('create_tags')}
              onPress={this.goToTagListEditor}
              style={StyledButtonType.PRIMARY}
            />
          </View>
        </View>
      )
    }

    return (
      <View style={styles.tagPicker}>
        <View style={styles.tagCollection}>
          {Object.values(tags).map((tag: ITag) => <Tag key={tag.id} tag={tag} />)}
        </View>
      </View>
    );
  }
}

export const TagPicker = connect(
  (state: IStorage, ownProps) => ({
    tagList: state.tagList,
    ...ownProps
  })
)(Picker);

const styles = StyleSheet.create({
  tagPicker: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    paddingTop: 40,
    backgroundColor: COLOR.WHITE,
  },
  tagCollection: {
    maxWidth: '100%',
  }
})
