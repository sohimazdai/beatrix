import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR } from '../../../../constant/Color';
import { SheduleHeader } from './SheduleHeader';

type Range = {
  from: number,
  to: number,
  value: number,
}

interface Props {
  hours: number[]
};

export class SheduleShort extends React.Component<Props> {
  render() {
    const { hours } = this.props;

    const ranges = getRanges(hours);
    return (
      <>
        <SheduleHeader />
        <View style={styles.shedule}>
          {ranges.map((range: Range) => {
            if (range.value) {
              return (
                <View style={styles.sheduleRow}>
                  <Text style={styles.text}>{`${range.from < 10 ? '0' + range.from : range.from
                    }:00 - ${range.to}:00`}</Text>
                  <Text style={styles.text}>{range.value}</Text>
                </View>
              );
            }
          })}
        </View>
      </>
    );
  }
}

function getRanges(hours: number[]): Range[] {
  let ranges: Range[] = []

  hours.forEach((hour, from) => {
    if (ranges.length && hours[from - 1] === hour) {
      ranges[ranges.length - 1].to = from + 1;
      return;
    }

    ranges.push({ from, to: from + 1, value: hour })
  })

  return ranges;
}

const styles = StyleSheet.create({
  shedule: {
    marginTop: 8,
  },
  sheduleRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 17,
  }
});
