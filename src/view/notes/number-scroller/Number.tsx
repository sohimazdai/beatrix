import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, StyleSheet } from 'react-native';
import { COLOR } from '../../../constant/Color';

interface Props {
  isDecimal?: boolean;
  value: number;
  isSelected: boolean;
  onClick: (value) => void;
}

export default class Number extends React.Component<Props> {
  render() {
    const { value, onClick, isSelected, isDecimal } = this.props;

    const selectedTextStyle = { ...styles.text, ...styles.textSelected };
    const regularTextStyle = styles.text;
    const decimalTextStyle = styles.decimalText;

    const textStyle = isSelected
      ? isDecimal
        ? { ...selectedTextStyle, ...decimalTextStyle }
        : selectedTextStyle
      : isDecimal
        ? { ...regularTextStyle, ...decimalTextStyle }
        : regularTextStyle;

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
          style={textStyle}
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
    borderColor: COLOR.PRIMARY,
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
    backgroundColor: COLOR.PRIMARY,
    color: COLOR.WHITE,
  },
  decimalText: {
    width: 40,
    fontSize: 15,
  },
})
