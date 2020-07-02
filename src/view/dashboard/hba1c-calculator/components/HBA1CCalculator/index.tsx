import React from 'react';
import { connect } from 'react-redux';

import { Text, Button, StyleSheet, View } from 'react-native';
import { DashboardCard } from '../../../../shared/DashboardCard';
import { i18nGet } from '../../../../../localisation/Translate';
import { Color } from '../../../../../constant/Color';
import Tooltip from '../../../../../component/tooltip/Tooltip';
import { Loader } from '../../../../../component/loader/Loader';
import { IStorage } from '../../../../../model/IStorage';
import { selectHBA1C } from '../../selectors/select-hba1c';
import { InfoIcon } from '../../../../../component/icon/InfoIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { appAnalytics } from '../../../../../app/Analytics';

interface Props {
  hba1c: number,
  days: number
};

interface State {
  isCalculating: boolean
  calculated: boolean
}

class HBA1CCalculator extends React.Component<Props, State> {
  state = {
    isCalculating: false,
    calculated: false,
  }

  handleCalculate = () => {
    appAnalytics.sendEventWithProps(
      appAnalytics.events.HBA1C_CALCULATED,
      {
        hba1c: this.props.hba1c,
        days: this.props.days,
      }
    );

    this.setState({ isCalculating: true, calculated: false });

    setTimeout(() => this.setState({
      isCalculating: false, calculated: true
    }), 3000);
  }

  render() {
    const { isCalculating, calculated } = this.state;
    const { days, hba1c } = this.props;

    const calculationAttention = days < 20
      ? 'too_little_data_for_advanced_analys'
      : '';

    return hba1c
      ? (
        <DashboardCard>
          <View style={styles.cardTitleView}>
            <Text style={styles.cardTitle}>
              {i18nGet('your_hba1c')}
            </Text>
            <Tooltip
              actionType="press"
              popover={(
                <Text style={styles.tooltipText}>
                  {i18nGet('glycated_hemoglobin')}
                </Text>
              )}
            >
              <InfoIcon roundFill={Color.PRIMARY_LIGHT} textColor={Color.PRIMARY_WHITE} />
            </Tooltip>
            <View style={styles.cardTitleLoader}>
              <Loader isManaged isManagedLoading={isCalculating} />
            </View>
            {calculated && (
              <Text style={styles.cardTitleValue}>
                {hba1c + '%'}
              </Text>
            )}
          </View>
          <View style={styles.cardContent}>
            <View>
              {calculated && (
                <>
                  <Text style={styles.contentText}>
                    {i18nGet('calculated_days') + ': ' + days}
                  </Text>
                  {!!calculationAttention && (
                    <Text style={styles.contentText}>
                      {i18nGet(calculationAttention)}
                    </Text>
                  )}
                </>
              )}
              {!calculated && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.handleCalculate}
                >
                  <Text style={styles.buttonText}>
                    {i18nGet('calculate')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </DashboardCard>
      ) : null;
  }
}

export const HBA1CCalculatorConnected = connect(
  (state: IStorage) => ({
    ...selectHBA1C(state),
  })
)(HBA1CCalculator);

const styles = StyleSheet.create({
  cardTitleView: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  cardTitle: {
    fontSize: 19,
    color: Color.TEXT_DARK_GRAY,
    fontWeight: '500',
  },
  cardTitleValue: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 25,
    color: Color.BLUE,
    fontWeight: '500',
  },
  cardTitleLoader: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
  },
  tooltipText: {
    color: Color.PRIMARY_WHITE,
    fontSize: 15,
    lineHeight: 20,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 8,
    alignItems: 'center',
  },
  contentText: {
    fontSize: 16,
    color: Color.TEXT_DARK_GRAY,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Color.PRIMARY,
  },
  buttonText: {
    fontSize: 17,
    color: Color.PRIMARY_WHITE,
  },
})
