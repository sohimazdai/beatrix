import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TagRow } from './TagRow';
import { ITag } from '../../../../model/ITagList';

interface Props {
  toShowTagRows: ITag[][];
  onTagPress: (noteId: number) => void;
  icon?: JSX.Element
}

export function TagList(props: Props) {
  const { icon, toShowTagRows, onTagPress } = props;

  if (toShowTagRows.length === 0) return null;

  return (
    <View style={styles.tagList}>
      <View style={styles.tagCollection}>
        {toShowTagRows.map((tagRow: ITag[]) => (
          <TagRow
            key={tagRow[0].id}
            tags={tagRow}
            onTagPress={onTagPress}
            icon={icon}
          />
        ))}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  tagList: {
    display: 'flex',
    flexDirection: 'column',
  },
  tagCollection: {
    maxWidth: '100%',
    paddingTop: 0,
  }
})
