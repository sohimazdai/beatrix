import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { i18nGet } from '../../../localisation/Translate';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';
import Tooltip from '../../tooltip/Tooltip';
import { Measures } from '../../../localisation/Measures';
import { Color } from '../../../constant/Color';
import { appAnalytics } from '../../../app/Analytics';
import { LongSyringeIcon } from '../value-icons/LongSyringeIcon';

interface Props {
  style: any
  userDiabetesProperties: IUserDiabetesProperties
}

const LongInsulinIconComponent = (props: Props) => {
  const text = i18nGet('long_insulin_icon_tooltip');

  return (
    <Tooltip
      onOpen={() => appAnalytics.sendEventWithProps(
        appAnalytics.events.TOOLTIP_SHOWN, { tooltipName: 'glycemiaType' }
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
      <LongSyringeIcon {...props} />
    </Tooltip>
  )
}

export const LongInsulinIconConnected = connect(
  (state: IStorage) => ({
    userDiabetesProperties: state.userDiabetesProperties
  })
)(LongInsulinIconComponent)

const styles = StyleSheet.create({
  tooltipText: {
    color: Color.PRIMARY_WHITE,
    fontSize: 15,
    lineHeight: 20,
  }
})
