import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, StyleSheet } from 'react-native';
import { Color } from '../../../constant/Color';

interface Props {
  value: number;
  isSelected: boolean;
  onClick: (value) => void;
}

export default class Number extends React.Component<Props> {
  render() {
    const { value, onClick, isSelected } = this.props;

    return (
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          isSelected
            ? onClick(0)
            : onClick(value)
        }}
      >
        <Text
          style={
            isSelected
              ? { ...styles.text, ...styles.textSelected }
              : styles.text
          }
        >
          {value}
        </Text>
      </TouchableOpacity >
    )
  }
}

const styles = StyleSheet.create({
  touchable: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Color.PRIMARY,
  },
  text: {
    width: 70,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 22,
  },
  textSelected: {
    backgroundColor: Color.PRIMARY,
    color: Color.WHITE,
  }
})
