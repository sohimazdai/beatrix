import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLOR } from '../../constant/Color';

interface Props {
  isChecked?: boolean
  label?: string
  onCheck?: () => void
  withoutMargin?: boolean
}

export const Checkbox = (props: Props) => {
  const { label, onCheck, isChecked, withoutMargin } = props;

  const checkboxStyles = isChecked
    ? { ...styles.checkbox, ...styles.checkboxActive }
    : styles.checkbox;

  const touchableStyles = withoutMargin
    ? styles.touchableContainer
    : { ...styles.touchableContainer, marginBottom: 8, marginRight: 8, paddingRight: 16 };

  return (
    <TouchableOpacity onPress={onCheck} style={touchableStyles}>
      <View style={checkboxStyles} />
      {label && <Text style={styles.checkboxText}>
        {label}
      </Text>}
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkbox: {
    width: 12,
    height: 12,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: COLOR.TEXT_DARK_GRAY,
    backgroundColor: COLOR.PRIMARY_WHITE,
    padding: 8,
  },
  checkboxActive: {
    backgroundColor: COLOR.GREEN,
    borderColor: COLOR.GREEN_DARK,
  },
  checkboxText: {
    marginLeft: 12,
    fontSize: 16,
    flexGrow: 1,
  },
})
