import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
      <TouchableOpacity style={styles.row} onPress={() => onCheck(hourIndex)}>
        <Text style={styles.time}>{hourIndex < 10 ? '0' + hourIndex : hourIndex}:00</Text>
        <Text style={styles.text}>{hourValue}</Text>
        <Checkbox onCheck={() => onCheck(hourIndex)} isChecked={isSelected} withoutMargin />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    width: 150,
    marginTop: 4,
    flexDirection: 'row',
    padding: 8,
    backgroundColor: COLOR.BLUE_BASE,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  time: {
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
})
