import React from 'react';
import { connect } from 'react-redux';

import { Text, StyleSheet } from 'react-native';
import { IStorage } from '../../../../../model/IStorage';
import { selectActiveInsulinValue } from '../../selectors/select-active-insulin-value';
import { COLOR } from '../../../../../constant/Color';

interface Props {
  activeInsulinValue: number
};

export class ActiveInsulinCounter extends React.Component<Props> {
  render() {
    const { activeInsulinValue } = this.props;

    const roundedValue = activeInsulinValue.toFixed(1);

    return (
      <Text style={styles.text}>
        {roundedValue}
      </Text>
    );
  }
}

export const ActiveInsulinCounterConnected = connect(
  (state: IStorage, ownProps: { now: Date }) => ({
    activeInsulinValue: selectActiveInsulinValue(state, ownProps.now),
  })
)(ActiveInsulinCounter);


const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: COLOR.BLUE,
    fontWeight: '500',
  }
})
