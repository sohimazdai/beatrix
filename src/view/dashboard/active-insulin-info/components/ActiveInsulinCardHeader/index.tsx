import React from 'react';

import { View, StyleSheet, Text } from 'react-native';
import Tooltip from '../../../../../component/tooltip/Tooltip';
import { InfoIcon } from '../../../../../component/icon/InfoIcon';

import { Color } from '../../../../../constant/Color';
import { i18nGet } from '../../../../../localisation/Translate';

export default function ActiveInsulinCardHeader() {
  return (
    <View style={styles.tooltipedHeader}>
      <Text style={styles.cardTitle}>
        {i18nGet('rest_active_insulin')}
      </Text>
      <Tooltip
        analyticsKeyOnOpen={'activeInsulinInfo'}
        actionType='press'
        popover={(
          <Text style={styles.tooltipText}>
            {i18nGet('active_insulin_counter_description')}
          </Text>
        )}
      >
        <InfoIcon roundFill={Color.PRIMARY} textColor={Color.PRIMARY_WHITE} />
      </Tooltip>
    </View>
  )
}

const styles = StyleSheet.create({
  tooltipedHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardTitle: {
    fontSize: 16,
    color: Color.CRIMSON_RED,
    fontWeight: '500',
  },
  tooltipText: {
    color: Color.PRIMARY_WHITE,
    fontSize: 15,
    lineHeight: 20,
  },
})
