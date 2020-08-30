import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ITag } from '../../../../model/ITagList';
import { Tag } from './Tag';

interface Props {
  tags: ITag[]
  icon: JSX.Element
  onTagPress: (tagId: number) => void
};

export function TagRow(props: Props) {
  const { tags, onTagPress, icon } = props;

  return (
    <View style={styles.row}>
      {tags.map((tag: ITag, index: number) => (
        <Tag
          key={tag.id}
          tag={tag}
          onPress={() => onTagPress(tag.id)}
          icon={icon}
          isFirst={index === 0}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
})
