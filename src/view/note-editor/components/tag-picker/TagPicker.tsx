import React from 'react';
import { connect } from 'react-redux';

import { Text, StyleSheet } from 'react-native';
import { IStorage } from '../../../../model/IStorage';
import { ITagList } from '../../../../model/ITagList';
import { constructTagRows } from '../../modules/construct-tag-rows';
import { TagPickerEntities } from '../../entities/TagPickerEntities';
import { TagList } from './TagLIst';
import { i18nGet } from '../../../../localisation/Translate';

interface Props {
  tagList: ITagList,
  selectedTags: string[]
  onTagPress: (tagId: number) => void;
  icon?: JSX.Element;
  viewerOfSelected?: boolean // показывает выбранные
  width?: number
  padding?: number
};

class Picker extends React.Component<Props> {
  get unselectedTags() {
    const { selectedTags, tagList: { tags } } = this.props;
    const newTagList = { ...tags };

    selectedTags && selectedTags.forEach((tagId: string) => delete newTagList[tagId]);

    return newTagList;
  }

  get selectedTags() {
    const { selectedTags, tagList: { tags } } = this.props;
    const newTagList = {};

    selectedTags && selectedTags.forEach((tagId: string) => {
      newTagList[tagId] = tags[tagId]
    });

    return newTagList;
  }

  render() {
    const { onTagPress, icon, viewerOfSelected, width, padding } = this.props;
    const tagsToShow = viewerOfSelected
      ? this.selectedTags
      : this.unselectedTags;

    const pad = padding
      ? TagPickerEntities.containerPadding + padding
      : TagPickerEntities.containerPadding;

    const toShowTagRows = constructTagRows(
      tagsToShow,
      width,
      pad
    );

    if (!viewerOfSelected && toShowTagRows.length === 0) {
      return (
        <Text style={styles.noMoreTags}>
          {i18nGet('tags_run_out')}
        </Text>
      )
    }

    return (
      <TagList
        toShowTagRows={toShowTagRows}
        icon={icon}
        onTagPress={onTagPress}
      />
    )
  }
}

export const TagPicker = connect(
  (state: IStorage, ownProps) => ({
    tagList: state.tagList,
    ...ownProps
  })
)(Picker);

const styles = StyleSheet.create({
  noMoreTags: {
    marginTop: 16,
    fontSize: 16,
  },
  tagCollection: {
    maxWidth: '100%',
    paddingTop: 16,
  }
})
