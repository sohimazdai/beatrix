import React from 'react';
import { KeyboardTypeOptions, Text, View, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TextInputFocusEventData } from 'react-native';
import { NativeViewGestureHandlerStateChangeEvent, TextInput } from 'react-native-gesture-handler';
import { BaseTextInput } from '../../../../component/input/BaseTextInput';
import { COLOR } from '../../../../constant/Color';
import { SHADOW_OPTIONS } from '../../../../constant/ShadowOptions';
import { i18nGet } from '../../../../localisation/Translate';

interface Props {
  isFormWithError?: boolean
  isRequired?: boolean
  type?: KeyboardTypeOptions
  value?: string | number
  defaultValue?: string | number
  placeholder?: string
  label: string
  autoFocus?: boolean
  withoutMarginTop?: boolean
  disabled?: boolean
  onTextChange: (text: string) => void
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void
};

interface State {
  focused: boolean,
}

export class FoodCreationInput extends React.Component<Props, State> {
  state = { focused: false, }

  get isErrored() {
    const { value, isFormWithError, isRequired } = this.props;

    return !value && isFormWithError && isRequired;
  }

  onFocus = (e) => {
    const { onFocus } = this.props;

    this.setState({ focused: true });
    onFocus && onFocus(e);
  }

  onBlur = () => {
    this.setState({ focused: false })
  }

  render() {
    const {
      label, placeholder, type, value, defaultValue,
      isRequired, disabled, withoutMarginTop, autoFocus,
      onTextChange,
    } = this.props;
    const { focused } = this.state;
    const { isErrored } = this;

    const placeholderText = isRequired
      ? `${placeholder ? placeholder + ' ' : ''}${i18nGet('required')}`
      : placeholder;

    let inputStyles = isErrored
      ? { ...styles.input, ...styles.inputErrored }
      : styles.input;

    inputStyles = focused
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
    const stringedDefaultValue = String(value);

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
          {...(stringedValue ? { value: stringedValue } : {})}
          {...(stringedDefaultValue ? { defaultValue: stringedDefaultValue } : {})}
          autoFocus={autoFocus}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
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
