import React from 'react';
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
import { TagPicker } from '../../view/note-editor/components/tag-picker/TagPicker';
import { randomizeBGandFontColor } from '../../utils/RandomizeColor';
import { ScrollView } from 'react-native-gesture-handler';
import { batchActions } from 'redux-batched-actions';
import { createChangePending } from '../../store/modules/pending/pending';
import { appAnalytics } from '../../app/Analytics';

interface Props {
  tagList: ITagList
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  onAddTag: (tag: ITag) => void
  onRemoveTag: (tagId: number, successCallback: () => void) => void
};

interface State {
  tagName: string,
  tagIdToEdit: number,
}

class TagEditorComp extends React.Component<Props, State> {
  state: State = {
    tagName: '',
    tagIdToEdit: null,
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

    if (!tagList.tags) return [];

    return Object.keys(tagList.tags);
  }

  onCreateTag = () => {
    const { onAddTag } = this.props;
    const { tagName } = this.state;


    appAnalytics.sendEventWithProps(appAnalytics.events.ADD_TAG_TO_NOTE, {
      name: tagName
    });

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

  onDeleteTag = (tagId: number) => {
    const { tagList, onRemoveTag } = this.props;

    const tagName = tagList.tags[tagId].name;

    const cb = () => appAnalytics.sendEventWithProps(appAnalytics.events.DELETE_TAG, {
      name: tagName
    });

    onRemoveTag(tagId, cb)
  }

  render() {
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
          <ScrollView style={styles.tagPickerView}>
            <TagPicker
              viewerOfSelected
              onTagPress={this.onDeleteTag}
              selectedTags={this.tagListTagsIds}
            />
          </ScrollView>
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
    onAddTag: (tag: ITag) => {
      dispatch(batchActions([
        createAddTag(tag),
        createChangePending({ tagList: true })
      ]));
    },
    onRemoveTag: (tagId: number, successCallback: () => void) => {
      Alert.alert(
        i18nGet('you_want_to_delete_tag'),
        i18nGet('you_wont_use_this_tag_anymore_for_filtering_notes'),
        [
          {
            text: i18nGet('delete'),
            onPress: () => {
              dispatch(batchActions([
                createRemoveTag(tagId),
                createChangePending({ tagList: true })
              ]));
              successCallback();
            },
            style: "destructive",
          },
          { text: i18nGet('cancel'), style: 'cancel' }
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
