import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { i18nGet } from '../../../localisation/Translate';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';
import Tooltip from '../../tooltip/Tooltip';
import { Color } from '../../../constant/Color';
import { appAnalytics } from '../../../app/Analytics';
import { ShortSyringeIcon } from '../value-icons/ShortSyringeIcon';

interface Props {
  style: any
  userDiabetesProperties: IUserDiabetesProperties
}

const ShortInsulinIconComponent = (props: Props) => {
  const text = i18nGet('short_insulin_icon_tooltip');

  return (
    <Tooltip
      onOpen={() => appAnalytics.sendEventWithProps(
        appAnalytics.events.TOOLTIP_SHOWN, { tooltipName: 'shortInsulin' }
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
      <ShortSyringeIcon {...props} />
    </Tooltip>
  )
}

export const ShortInsulinIconConnected = connect(
  (state: IStorage) => ({
    userDiabetesProperties: state.userDiabetesProperties
  })
)(ShortInsulinIconComponent)

const styles = StyleSheet.create({
  tooltipText: {
    color: Color.PRIMARY_WHITE,
    fontSize: 15,
    lineHeight: 20,
  }
})
