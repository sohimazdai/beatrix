import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { render } from 'react-dom';
import { PieColors } from '../../entities';
import { i18nGet } from '../../../../../localisation/Translate';
import { COLOR } from '../../../../../constant/Color';

interface Props {
  title: string
  isFirst?: boolean
};

const VALUES = {
  hypoglycemia_count: 'hypoglycemia_count',
  hyperglycemia_count: 'hyperglycemia_count',
  normalglycemia_count: 'normalglycemia_count',
}

export class PieToolTipItem extends React.Component<Props> {
  render() {
    const { title, isFirst } = this.props;

    return (
      <View style={{ ...styles.legendItem, marginTop: isFirst ? 0 : 8 }}>
        <View style={{ ...styles.thumbnail, backgroundColor: PieColors[title] }} />
        <Text style={styles.text}>
          {i18nGet(VALUES[title])}
        </Text>
      </View>
    )
  }
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
    lineHeight: 20,
    fontSize: 15,
    color: COLOR.PRIMARY_WHITE,
  }
})
