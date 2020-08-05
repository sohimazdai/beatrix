import React from 'react';

import { StyleSheet, View } from 'react-native';
import { ClocsIconTooltipedConnected } from '../../../../component/icon/tooltiped/ClocsIconTooltiped';
import { GlycemiaIconConnected } from '../../../../component/icon/tooltiped/GlycemiaIcon';
import { BreadUnitsIconConnected } from '../../../../component/icon/tooltiped/BreadUnitsIcon';
import { ShortInsulinIconConnected } from '../../../../component/icon/tooltiped/ShortInsulinIcon';
import { LongInsulinIconConnected } from '../../../../component/icon/tooltiped/LongInsulinIcon';

export function HorizontalIconBar() {
  return (
    <View style={styles.iconBarView}>
      <ClocsIconTooltipedConnected style={styles.iconBarIcon} />
      <GlycemiaIconConnected style={styles.iconBarIcon} />
      <BreadUnitsIconConnected style={styles.iconBarIcon} />
      <ShortInsulinIconConnected style={styles.iconBarIcon} />
      <LongInsulinIconConnected style={styles.iconBarIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconBarView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  iconBarIcon: {
    flex: 1,
    height: 30,
    width: 30,
  },
})
