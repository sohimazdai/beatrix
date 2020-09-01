import React from 'react';
import { ITag } from '../../../../model/ITagList';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  tag: ITag
  icon: JSX.Element
  onPress?: () => void
  isFirst?: boolean
}

export function Tag(props: Props) {
  const { tag: { name, bgColor, color }, onPress, isFirst } = props;

  const textStyle = {
    ...styles.text,
    color,
  }

  const viewStyle = {
    ...styles.view,
    backgroundColor: bgColor,
    marginLeft: isFirst ? 0 : 4,
  }

  return (
    <View style={viewStyle}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
      >
        <Text style={textStyle}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    margin: 4,
    marginBottom: 0,
    borderRadius: 100,
  },
  touchable: {
    padding: 8,
  },
  text: {
    fontSize: 14,
  },
  sign: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
  }
})
