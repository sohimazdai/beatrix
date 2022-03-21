import React, { RefObject } from 'react';
import { View, StyleSheet, KeyboardTypeOptions, TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { COLOR } from '../../constant/Color';
import { StyledButton, StyledButtonType } from '../button/StyledButton';
import { CrossIcon } from '../icon/CrossIcon';

interface Props extends TextInputProps {
  referal?: RefObject<TextInput>
  disabled?: boolean
  type?: KeyboardTypeOptions
  clearable?: boolean
  onClear?: (currentValue) => void
};

export function BaseTextInput(props: Props) {
  const { referal, disabled, type, value, clearable, onClear } = props;

  const style = {
    ...styles.textInput,
    ...(props as any).style,
    ...(disabled ? styles.disabled : {}),
    fontSize: 16,
  }

  const alteredValue = type === 'decimal-pad'
    ? value.replace(/,/g, '.')
    : value

  return (
    <View style={styles.textInputContainer}>
      <TextInput
        ref={referal}
        allowFontScaling={false}
        editable={!disabled}
        {...props}
        value={alteredValue}
        style={style}
      />
      {clearable && (
        <View style={styles.crossIcon}>
          <StyledButton
            icon={<CrossIcon width={12} height={12} />}
            style={StyledButtonType.EMPTY}
            onPress={() => onClear(value)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLOR.PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: COLOR.DISABLED,
  },
  crossIcon: {
    position: 'absolute',
    alignSelf: 'center',
    right: 12,
  },
})
