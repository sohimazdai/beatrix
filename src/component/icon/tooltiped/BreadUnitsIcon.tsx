import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { i18nGet } from '../../../localisation/Translate';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { IUserDiabetesProperties, CarbsMeasuringType } from '../../../model/IUserDiabetesProperties';
import Tooltip from '../../tooltip/Tooltip';
import { Color } from '../../../constant/Color';
import { appAnalytics } from '../../../app/Analytics';
import { VegetablesIcon } from '../value-icons/VegetablesIcon';
import { Measures } from '../../../localisation/Measures';

interface Props {
  style: any
  userDiabetesProperties: IUserDiabetesProperties
}

const BreadUnitsIconComponent = (props: Props) => {
  const { userDiabetesProperties } = props;

  const isBreadUnitsMeasuring = Measures.getDefaultCarbsMeasuringType(
    userDiabetesProperties.carbsMeasuringType
  ) === CarbsMeasuringType.BREAD_UNITS;
  const carbsUnitWeight = Measures.getDefaultCarbsUnitWeightType(userDiabetesProperties.carbsUnitWeightType);

  const text = i18nGet('breadunits_icon_tooltip')
    .replace('%type%', i18nGet(userDiabetesProperties.carbsMeasuringType + '_long'))
    .replace('%for_bu%', isBreadUnitsMeasuring ? i18nGet('one_bread_unit_contents') : '')
    .replace('%number%', isBreadUnitsMeasuring ? carbsUnitWeight + '' : '');

  return (
    <Tooltip
      analyticsKeyOnOpen="breadUnits"
      actionType={'press'}
      popover={(
        <View>
          <Text style={styles.tooltipText}>
            {text}
          </Text>
        </View>
      )}
    >
      <VegetablesIcon {...props} />
    </Tooltip>
  )
}

export const BreadUnitsIconConnected = connect(
  (state: IStorage) => ({
    userDiabetesProperties: state.userDiabetesProperties
  })
)(BreadUnitsIconComponent)

const styles = StyleSheet.create({
  tooltipText: {
    color: Color.PRIMARY_WHITE,
    fontSize: 15,
    lineHeight: 20,
  }
})
