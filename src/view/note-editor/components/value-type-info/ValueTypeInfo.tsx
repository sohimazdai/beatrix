import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLOR } from '../../../../constant/Color';

interface Props {
  value?: string | number
  isTooltip?: boolean
};

export class ValueTypeInfo extends React.Component<Props> {
  renderTooltip() {
    return (
      <Text style={styles.plus}>
        +
      </Text>
    );
  }

  renderContent() {
    const { value, isTooltip } = this.props;

    if (!value) {
      return (
        <Text style={styles.emptyText}>
          -
        </Text>
      )
    }
    return isTooltip
      ? this.renderTooltip()
      : (
        <Text style={styles.valueText}>
          {value}
        </Text>
      );
  }

  render() {
    return (
      <View style={styles.content}>
        {this.renderContent()}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
  },
  emptyText: {
    color: COLOR.TEXT_DIMGRAY,
    fontSize: 19,
  },
  valueText: {
    color: COLOR.TEXT_BLACK,
    fontSize: 17,
  },
  plus: {
    color: COLOR.PRIMARY,
    fontSize: 15,
    lineHeight: 20,
  }
})
