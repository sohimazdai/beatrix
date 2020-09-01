import React, { RefObject } from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Alert } from 'react-native';
import { ITagList, ITag } from '../../model/ITagList';
import { IStorage } from '../../model/IStorage';
import { BlockHat } from '../../component/hat/BlockHat';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';
import { i18nGet } from '../../localisation/Translate';
import { BaseTextInput } from '../../component/input/BaseTextInput';
import { StyledButton, StyledButtonType } from '../../component/button/StyledButton';
import { createAddTag, createRemoveTag } from '../../store/modules/tag-list/tagList';
import { TagList } from '../../view/note-editor/components/tag-picker/TagLIst';
import { TagPicker } from '../../view/note-editor/components/tag-picker/TagPicker';
import { TextInput } from 'react-native-gesture-handler';
import { randomizeBGandFontColor } from '../../utils/RandomizeColor';

interface Props {
  tagList: ITagList
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  onAddTag: (tag: ITag) => void
  onRemoveTag: (tagId: number) => void
};

interface State {
  tagName: string,
}

class TagEditorComp extends React.Component<Props, State> {
  state: State = {
    tagName: '',
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

  get tagListTagsIds() {
    const { tagList } = this.props;

    return Object.values(tagList.tags).map((tag: ITag) => tag.id);
  }

  onCreateTag = () => {
    const { onAddTag } = this.props;
    const { tagName } = this.state;

    const colors = randomizeBGandFontColor();

    const newTag: ITag = {
      name: tagName,
      id: 0,
      ...colors
    }

    onAddTag(newTag);
    this.setState({
      tagName: '',
    });
  }

  render() {
    const { onRemoveTag, navigation } = this.props;
    const { tagName } = this.state;

    return (
      <View>
        <BlockHat
          onBackPress={this.onBack}
          title={i18nGet('tag_editor')}
        />
        <View style={styles.content}>
          <View style={styles.inputBlock}>
            <BaseTextInput
              placeholder={i18nGet('enter_tag')}
              onChangeText={(text) => this.setState({ tagName: text })}
              defaultValue={tagName}
            />
            <StyledButton
              marginLeft
              onPress={this.onCreateTag}
              style={StyledButtonType.PRIMARY}
              label={i18nGet('create')}
              disabled={!tagName}
            />
          </View>
          <View style={styles.tagPickerView}>
            <TagPicker
              viewerOfSelected
              onTagPress={onRemoveTag}
              navigation={navigation}
              selectedTags={this.tagListTagsIds}
            />
          </View>
        </View>
      </View>
    );
  }
}

export const TagEditor = connect(
  (state: IStorage) => ({
    tagList: state.tagList
  }),
  (dispatch) => ({
    onAddTag: (tag: ITag) => dispatch(createAddTag(tag)),
    onRemoveTag: (tagId: number) => {
      Alert.alert(
        i18nGet('you_want_to_delete_tag'),
        i18nGet('you_wont_use_this_tag_anymore_for_filtering_notes'),
        [
          {
            text: i18nGet('delete'),
            onPress: () => dispatch(createRemoveTag(tagId)),
            style: "destructive"
          },
          { text: i18nGet('cancel'), onPress: () => { }, style: 'cancel' }
        ]
      );
    },
  })
)(TagEditorComp);

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  inputBlock: {
    display: 'flex',
    flexDirection: 'row',
  },
  tagPickerView: {
    width: '100%',
    marginTop: 12,
  },
})
