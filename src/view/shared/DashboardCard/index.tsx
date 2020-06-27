import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from '../../../constant/Color';
import { shadowOptions } from '../../../constant/ShadowOptions';

interface Props {
  children?: any;
};

export class DashboardCard extends React.Component<Props> {
  render() {
    const { children } = this.props;

    return (
      <View style={styles.card}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: Color.PRIMARY_WHITE,
    borderRadius: 10,
    marginBottom: 8,
    ...shadowOptions,
  },

})
