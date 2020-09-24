import React from 'react';
import { KeyboardTypeOptions, Text, View, StyleSheet } from 'react-native';
import { BaseTextInput } from '../../../../component/input/BaseTextInput';
import { COLOR } from '../../../../constant/Color';
import { i18nGet } from '../../../../localisation/Translate';

interface Props {
  isFormWithError?: boolean
  isRequired?: boolean
  type?: KeyboardTypeOptions
  value?: string
  placeholder?: string
  onTextChange: (text: string) => void
  label: string
};

export class FoodCreationInput extends React.Component<Props> {
  get isErrored() {
    const { value, isFormWithError, isRequired } = this.props;

    return !value && isFormWithError && isRequired;
  }

  render() {
    const { label, onTextChange, placeholder, isRequired, type, value } = this.props;
    const { isErrored } = this;

    const placeholderText = isRequired
      ? `${placeholder ? placeholder + ' ' : ''}${i18nGet('required')}`
      : placeholder;

    const inputStyles = isErrored
      ? { ...styles.input, ...styles.inputErrored }
      : styles.input;

    const labelStyles = isErrored
      ? { ...styles.inputLabel, ...styles.inputLabelErrored }
      : styles.inputLabel;

    return (
      <View style={styles.wrap}>
        <Text style={labelStyles}>
          {label}
        </Text>
        <BaseTextInput
          style={inputStyles}
          keyboardType={type}
          onChangeText={onTextChange}
          placeholder={placeholderText}
          value={value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    marginTop: 16,
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
    minHeight: 50,
  },
  inputErrored: {
    borderColor: COLOR.RED_DARK,
  },
});
