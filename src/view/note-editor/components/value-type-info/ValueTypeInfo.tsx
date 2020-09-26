import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Tooltip from '../../../../component/tooltip/Tooltip';
import { MagnifierIcon } from '../../../../component/icon/MagnifierIcon';
import { COLOR } from '../../../../constant/Color';

interface Props {
  value?: string | number
  isTooltip?: boolean
};

export class ValueTypeInfo extends React.Component<Props> {
  render() {
    return (
      <View style={styles.content}>
        {this.renderContent()}
      </View>
    )
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

  renderTooltip() {
    const { value } = this.props;

    return (
      <Tooltip
        popover={(
          <Text style={styles.tooltipText}>
            {value}
          </Text>
        )}
        actionType="press"
        analyticsKeyOnOpen={'magnifier'}
      >
        <MagnifierIcon />
      </Tooltip>
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
  tooltipText: {
    color: COLOR.PRIMARY_WHITE,
    fontSize: 15,
    lineHeight: 20,
  }
})
