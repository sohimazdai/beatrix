import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { i18nGet } from '../../../localisation/Translate';
import { connect } from 'react-redux';
import Tooltip from '../../tooltip/Tooltip';
import { Color } from '../../../constant/Color';
import { appAnalytics } from '../../../app/Analytics';
import { RoundClocksIcon } from '../RoundClocksIcon';

interface Props {
  style: any
}

const ClocsIconTooltipedComponent = (props: Props) => {
  const text = i18nGet('note_date_and_time');

  return (
    <Tooltip
      onOpen={() => appAnalytics.sendEventWithProps(
        appAnalytics.events.TOOLTIP_SHOWN, { tooltipName: 'clocks' }
      )}
      actionType={'press'}
      popover={(
        <View>
          <Text style={styles.tooltipText}>
            {text}
          </Text>
        </View>
      )}
    >
      <RoundClocksIcon {...props} />
    </Tooltip>
  )
}

export const ClocsIconTooltipedConnected = connect()(ClocsIconTooltipedComponent)

const styles = StyleSheet.create({
  tooltipText: {
    color: Color.PRIMARY_WHITE,
    fontSize: 15,
    lineHeight: 20,
  }
})
