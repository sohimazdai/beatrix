import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { i18nGet } from '../../../../localisation/Translate';

export class SheduleHeader extends React.Component {
  render() {
    return (
      <View style={styles.titleRow}>
        <Text style={styles.text}>{i18nGet('shedule_range_period')}</Text>
        <Text style={styles.text}>{i18nGet('shedule_value')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleRow: {
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  }
});
