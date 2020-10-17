import React, { useRef, RefObject } from 'react';
import { View, StyleSheet, Text, TextInputProperties, KeyboardTypeOptions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { COLOR } from '../../constant/Color';

interface Props extends TextInputProperties {
  referal?: RefObject<TextInput>
  disabled?: boolean
  type?: KeyboardTypeOptions
};

export function BaseTextInput(props: Props) {
  const { referal, disabled, type, value } = props;

  const style = {
    ...styles.textInput,
    ...(props as any).style,
    fontSize: 16,
  }

  const alteredValue = type === 'decimal-pad'
    ? value.replace(/,/g, '.')
    : value

  return (
    <TextInput
      ref={referal}
      allowFontScaling={false}
      editable={!disabled}
      {...props}
      value={alteredValue}
      style={style}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLOR.PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
  }
})
