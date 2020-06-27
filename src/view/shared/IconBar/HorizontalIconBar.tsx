import React from 'react';

import { StyleSheet, View } from 'react-native';
import { RoundClocksIcon } from '../../../component/icon/RoundClocksIcon';
import { GlucometerIcon } from '../../../component/icon/value-icons/GlucometerIcon';
import { VegetablesIcon } from '../../../component/icon/value-icons/VegetablesIcon';
import { ShortSyringeIcon } from '../../../component/icon/value-icons/ShortSyringeIcon';
import { LongSyringeIcon } from '../../../component/icon/value-icons/LongSyringeIcon';

export function HorizontalIconBar() {
  return (
      <View style={styles.iconBarView}>
        <RoundClocksIcon style={styles.iconBarIcon} />
        <GlucometerIcon style={styles.iconBarIcon} />
        <VegetablesIcon style={styles.iconBarIcon} />
        <ShortSyringeIcon style={styles.iconBarIcon} />
        <LongSyringeIcon style={styles.iconBarIcon} />
      </View>
  );
}

const styles = StyleSheet.create({
  iconBarView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconBarIcon: {
    flex: 1,
    height: 30
  },
})
