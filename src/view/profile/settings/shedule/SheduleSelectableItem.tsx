import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Checkbox } from '../../../../component/checkbox/Checkbox';
import { COLOR } from '../../../../constant/Color';

interface Props {
  hourValue: number,
  hourIndex: number,
  isSelected: boolean,
  onCheck: (hourIndex: number) => void
};

export class SheduleSelectableItem extends React.Component<Props> {
  render() {
    const { hourValue, hourIndex, isSelected, onCheck } = this.props;

    return (
      <View style={styles.row}>
        <View style={styles.timeValue}>
          <Text style={styles.time}>{hourIndex < 10 ? '0' + hourIndex : hourIndex}:00</Text>
          <Text style={styles.text}>{hourValue}</Text>
        </View>
        <Checkbox onCheck={() => onCheck(hourIndex)} isChecked={isSelected} withoutMargin />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: COLOR.BLUE_BASE,
    alignItems: 'center',
    borderRadius: 5,
  },
  timeValue: {
    flexDirection: 'row',
  },
  time: {
    width: 85,
    fontSize: 17,
  },
  text: {
    fontSize: 17,
  },
})
