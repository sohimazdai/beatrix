import React, { ReactNode } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLOR } from '../../constant/Color';

interface Props {
  leftSlot?: ReactNode
  rightSlot?: ReactNode
  title?: string
  paddingHorizontal?: number
}

export function PopupHeader(props: Props) {
  const { leftSlot, rightSlot, title, paddingHorizontal } = props;

  const headerStyle = {
    ...styles.headerView,
    paddingHorizontal
  };

  return (
    <View style={headerStyle}>
      <View style={styles.sideSlot}>
        {leftSlot}
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <View style={styles.sideSlot}>
        {rightSlot}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideSlot: {
    minWidth: 30,
    minHeight: 30,
  },
  title: {
    flex: 1,
    fontSize: 19,
    color: COLOR.TEXT_DARK_GRAY,
    textAlign: 'center',
  }
})
