import React from 'react';

import { View, StyleSheet, Text } from 'react-native';
import Tooltip from '../../../../../component/tooltip/Tooltip';
import { InfoIcon } from '../../../../../component/icon/InfoIcon';

import { COLOR } from '../../../../../constant/Color';
import { i18nGet } from '../../../../../localisation/Translate';
import { ActiveInsulinCounterConnected } from '../ActiveInsulinCounter';

interface Props {
  now: Date
}
export default function ActiveInsulinCardHeader(props: Props) {
  const { now } = props;

  return (
    <View style={styles.header}>
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
          <InfoIcon roundFill={COLOR.PRIMARY} textColor={COLOR.PRIMARY_WHITE} />
        </Tooltip>
      </View>
      <ActiveInsulinCounterConnected now={now} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  tooltipedHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 19,
    lineHeight: 22,
    color: COLOR.CRIMSON_RED,
    fontWeight: '500',
  },
  tooltipText: {
    color: COLOR.PRIMARY_WHITE,
    fontSize: 15,
    lineHeight: 20,
  },
})
