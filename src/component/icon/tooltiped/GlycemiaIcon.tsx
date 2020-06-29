import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { i18nGet } from '../../../localisation/Translate';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';
import { GlucometerIcon } from '../value-icons/GlucometerIcon';
import Tooltip from '../../tooltip/Tooltip';
import { Measures } from '../../../localisation/Measures';
import { Color } from '../../../constant/Color';
import { appAnalytics } from '../../../app/Analytics';

interface Props {
  style: any
  userDiabetesProperties: IUserDiabetesProperties
}

const GlucometerIconComponent = (props: Props) => {
  const { userDiabetesProperties } = props;

  const text = i18nGet('glucose_icon_tooltip')
    .replace('%measure%', i18nGet(userDiabetesProperties.glycemiaMeasuringType))
    .replace('%measure%', i18nGet(userDiabetesProperties.glycemiaMeasuringType))
    .replace('%target%', userDiabetesProperties.targetGlycemia + '')
    .replace(
      '%min%',
      Measures.getCriticalGlycemia(userDiabetesProperties.glycemiaMeasuringType).min + ''
    )
    .replace(
      '%max%',
      Measures.getCriticalGlycemia(userDiabetesProperties.glycemiaMeasuringType).max + ''
    )
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
      <GlucometerIcon {...props.style} />
    </Tooltip>
  )
}

export const GlycemiaIconConnected = connect(
  (state: IStorage) => ({
    userDiabetesProperties: state.userDiabetesProperties
  })
)(GlucometerIconComponent)

const styles = StyleSheet.create({
  tooltipText: {
    color: Color.PRIMARY_WHITE,
    fontSize: 15,
    lineHeight: 20,
  }
})
