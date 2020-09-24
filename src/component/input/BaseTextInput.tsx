import React, { useRef, RefObject } from 'react';
import { View, StyleSheet, Text, TextInputProperties } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { COLOR } from '../../constant/Color';

interface Props extends TextInputProperties {
  referal?: RefObject<TextInput>
};

export function BaseTextInput(props: Props) {
  const { referal } = props;

  const style = {
    ...styles.textInput,
    ...(props as any).style
  }
  return (
    <TextInput
      ref={referal}
      allowFontScaling={false}
      maxLength={30}
      {...props}
      style={style}
      clearButtonMode={'always'}
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
