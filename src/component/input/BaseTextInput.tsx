import React, { useRef, RefObject } from 'react';
import { View, StyleSheet, TextInputProperties, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { COLOR } from '../../constant/Color';

interface Props extends TextInputProperties {
  referal?: RefObject<TextInput>
};

export function BaseTextInput(props: Props) {
  const { referal } = props;

  return (
    <TextInput
      ref={referal}
      style={styles.textInput}
      allowFontScaling={false}
      maxLength={30}
      {...props}
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
