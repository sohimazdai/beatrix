import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieColors } from '../../entities';
import { i18nGet } from '../../../../../localisation/Translate';

interface Props {
  value: number
  title: string
  isPercent: boolean
};

export function PieLegendItem(props: Props) {
  const { value, title, isPercent } = props;

  return (
    <View style={styles.legendItem}>
      <View style={{ ...styles.thumbnail, backgroundColor: PieColors[title] }} />
      <Text style={styles.text}>
        {`${Math.round(value)}${isPercent ? '%' : ''}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  legendItem: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 20,
  },
  thumbnail: {
    margin: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 19,
    fontSize: 16,
  }
})
