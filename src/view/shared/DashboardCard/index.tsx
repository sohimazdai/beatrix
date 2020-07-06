import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Color } from '../../../constant/Color';
import { shadowOptions } from '../../../constant/ShadowOptions';

interface Props {
  children?: any;
  withRightMargin?: boolean
  withTopMargin?: boolean
};

export class DashboardCard extends React.Component<Props> {
  render() {
    const { children, withRightMargin, withTopMargin } = this.props;

    return (
      <View style={{
        ...styles.card,
        marginRight: withRightMargin ? 8 : 0,
        marginTop: withTopMargin ? 8 : 0,
      }}>
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
