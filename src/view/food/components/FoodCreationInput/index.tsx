import React from 'react';
import { KeyboardTypeOptions, Text, View, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TextInputFocusEventData } from 'react-native';
import { NativeViewGestureHandlerStateChangeEvent } from 'react-native-gesture-handler';
import { BaseTextInput } from '../../../../component/input/BaseTextInput';
import { COLOR } from '../../../../constant/Color';
import { SHADOW_OPTIONS } from '../../../../constant/ShadowOptions';
import { i18nGet } from '../../../../localisation/Translate';

interface Props {
  isFormWithError?: boolean
  isRequired?: boolean
  type?: KeyboardTypeOptions
  value?: string | number
  placeholder?: string
  label: string
  autoFocus?: boolean
  withoutMarginTop?: boolean
  highlighted?: boolean
  disabled?: boolean
  onTextChange: (text: string) => void
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void
};

export class FoodCreationInput extends React.Component<Props> {
  get isErrored() {
    const { value, isFormWithError, isRequired } = this.props;

    return !value && isFormWithError && isRequired;
  }

  render() {
    const {
      label, placeholder, type, value,
      isRequired, disabled, withoutMarginTop, highlighted, autoFocus,
      onTextChange, onFocus,
    } = this.props;
    const { isErrored } = this;

    const placeholderText = isRequired
      ? `${placeholder ? placeholder + ' ' : ''}${i18nGet('required')}`
      : placeholder;

    let inputStyles = isErrored
      ? { ...styles.input, ...styles.inputErrored }
      : styles.input;

    inputStyles = highlighted
      ? { ...inputStyles, ...styles.inputHighlighted }
      : inputStyles;

    inputStyles = disabled
      ? { ...inputStyles, ...styles.inputDisabled }
      : inputStyles;

    const labelStyles = isErrored
      ? { ...styles.inputLabel, ...styles.inputLabelErrored }
      : styles.inputLabel;

    const wrapStyles = withoutMarginTop
      ? { ...styles.wrap, ...{ marginTop: 0 } }
      : styles.wrap;

    const stringedValue = String(value);

    return (
      <View style={wrapStyles} >
        <Text style={labelStyles}>
          {label}
        </Text>
        <BaseTextInput
          style={inputStyles}
          keyboardType={type}
          onChangeText={onTextChange}
          placeholder={placeholderText}
          value={stringedValue}
          autoFocus={autoFocus}
          onFocus={onFocus}
          disabled={disabled}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    marginTop: 16,
    height: 74,
  },
  inputLabel: {
    fontSize: 15,
    color: COLOR.TEXT_DIMGRAY,
    marginBottom: 4,
  },
  inputLabelErrored: {
    color: COLOR.RED_DARK,
  },
  input: {
    height: 50,
    minHeight: 50,
    backgroundColor: COLOR.PRIMARY_WHITE,
  },
  inputErrored: {
    borderColor: COLOR.RED_DARK,
  },
  inputHighlighted: {
    borderColor: COLOR.BLUE,
    ...SHADOW_OPTIONS,
  },
  inputDisabled: {
    backgroundColor: COLOR.DISABLED
  }
});
