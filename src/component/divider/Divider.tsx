import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLOR } from '../../constant/Color';

export const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLOR.TEXT_DIMGRAY
  }
})
