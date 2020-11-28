import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLOR } from '../../../../constant/Color';
import { SHADOW_OPTIONS } from '../../../../constant/ShadowOptions';

interface Props {
  children?: any;
  withTopMargin?: boolean
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
    position: 'relative',
    overflow: 'visible',
    padding: 16,
    backgroundColor: COLOR.PRIMARY_WHITE,
    borderRadius: 10,
    marginVertical: 4,
    ...SHADOW_OPTIONS,
  },
})
