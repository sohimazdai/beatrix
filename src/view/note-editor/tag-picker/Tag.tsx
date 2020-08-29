import React from 'react';
import { ITag } from '../../../model/ITagList';
import { View, StyleSheet, Text } from 'react-native';

interface Props {
  tag: ITag
}

export function Tag(props: Props) {
  const { name, bgColor, color } = props.tag;

  const textStyle = {
    ...styles.text,
    color,
    backgroundColor: bgColor,
  }

  return (
      <Text style={textStyle}>
        {name}
      </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    margin: 8,
    marginBottom: 0,
    padding: 4,
    fontSize: 16,
  }
})
