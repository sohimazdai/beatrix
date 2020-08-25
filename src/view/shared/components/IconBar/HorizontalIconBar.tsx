import React from 'react';

import { StyleSheet, View } from 'react-native';
import { ClocsIconTooltipedConnected } from '../../../../component/icon/tooltiped/ClocsIconTooltiped';
import { GlycemiaIconConnected } from '../../../../component/icon/tooltiped/GlycemiaIcon';
import { BreadUnitsIconConnected } from '../../../../component/icon/tooltiped/BreadUnitsIcon';
import { ShortInsulinIconConnected } from '../../../../component/icon/tooltiped/ShortInsulinIcon';
import { LongInsulinIconConnected } from '../../../../component/icon/tooltiped/LongInsulinIcon';

interface Props {
  isBig?: boolean
}

export function HorizontalIconBar(props: Props) {
  const { isBig } = props;

  const iconStyle = isBig
    ? { ...styles.iconBarIcon, ...styles.iconBarIconBig }
    : styles.iconBarIcon;

  return (
    <View style={styles.iconBarView}>
      <View style={styles.iconWrap}>
        <ClocsIconTooltipedConnected style={iconStyle} />
      </View>
      <View style={styles.iconWrap}>
        <GlycemiaIconConnected style={iconStyle} />
      </View>
      <View style={styles.iconWrap}>
        <BreadUnitsIconConnected style={iconStyle} />
      </View>
      <View style={styles.iconWrap}>
        <ShortInsulinIconConnected style={iconStyle} />
      </View>
      <View style={styles.iconWrap}>
        <LongInsulinIconConnected style={iconStyle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBarView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  iconWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBarIcon: {
    height: 30,
    width: 30,
  },
  iconBarIconBig: {
    height: 35,
    width: 35,
    marginVertical: 16,
  },
})
