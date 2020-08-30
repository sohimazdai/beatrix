import React from 'react';
import { connect } from 'react-redux';

import { View, Text, StyleSheet } from 'react-native';
import { IStorage } from '../../../../model/IStorage';
import { ITagList, ITag } from '../../../../model/ITagList';
import { i18nGet } from '../../../../localisation/Translate';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { NavigatorEntities } from '../../../../navigator/modules/NavigatorEntities';
import { COLOR } from '../../../../constant/Color';
import { constructTagRows } from '../../modules/construct-tag-rows';
import { TagPickerEntities } from '../../entities/TagPickerEntities';
import { TagRow } from './TagRow';
import { TagPickerEmpty } from './TagPickerEmpty';
import { TagList } from './TagLIst';
import { StyledButton } from '../../../../component/button/StyledButton';

interface Props {
  tagList: ITagList,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  selectedTags: number[]
  onTagPress: (tagId: number) => void;
  icon?: JSX.Element;
  viewerOfSelected?: boolean // показывает выбранные
  width?: number
};

class Picker extends React.Component<Props> {
  goToTagListEditor = () => {
    const { navigation } = this.props;

    navigation.navigate(NavigatorEntities.TAG_EDITOR)
  }

  get unselectedTags() {
    const { selectedTags, tagList: { tags } } = this.props;
    const newTagList = { ...tags };

    selectedTags.forEach((tagId: number) => delete newTagList[tagId]);

    return newTagList;
  }

  get selectedTags() {
    const { selectedTags, tagList: { tags } } = this.props;
    const newTagList = {};

    selectedTags.forEach((tagId: number) => {
      newTagList[tagId] = tags[tagId]
    });

    return newTagList;
  }

  render() {
    const { tagList, onTagPress, icon, viewerOfSelected, width } = this.props;
    const tagsToShow = viewerOfSelected
      ? this.selectedTags
      : this.unselectedTags;

    const toShowTagRows = constructTagRows(
      tagsToShow,
      width,
      TagPickerEntities.containerPadding
    );

    if (Object.values(tagList.tags).length === 0 && !viewerOfSelected) {
      return <TagPickerEmpty onPress={this.goToTagListEditor} />
    }

    if (viewerOfSelected) {
      return <TagList
        toShowTagRows={toShowTagRows}
        icon={icon}
        onTagPress={onTagPress}
      />
    }

    return (
      <View style={styles.tagPicker}>
        <Text style={styles.header}>
          {i18nGet('tags')}
        </Text>
        <View style={styles.tagCollection}>
          {toShowTagRows.length > 0
            ? toShowTagRows.map((tagRow: ITag[]) => (
              <TagRow
                key={tagRow[0].id}
                tags={tagRow}
                onTagPress={onTagPress}
                icon={icon}
              />
            )) : (
              <Text style={styles.noMoreTags}>
                {i18nGet('tags_run_out')}
              </Text>
            )}
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
    backgroundColor: COLOR.WHITE,
  },
  header: {
    width: '100%',
    textAlign: 'center',
    paddingHorizontal: 32,
    marginTop: 20,
    fontSize: 19,
    lineHeight: 20,
    fontWeight: "bold",
    color: COLOR.TEXT_DARK_GRAY
  },
  noMoreTags: {
    marginTop: 16,
    fontSize: 16,
  },
  tagCollection: {
    maxWidth: '100%',
    paddingTop: 16,
  }
})
