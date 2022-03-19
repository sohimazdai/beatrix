import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Checkbox } from '../../../../component/checkbox/Checkbox';
import { COLOR } from '../../../../constant/Color';
import { i18nGet } from '../../../../localisation/Translate';
import { SheduleSelectableItem } from './SheduleSelectableItem';

interface Props {
  hours: number[],
  selectedHours: number[]
  onSelectItem: (index: number) => void
  onSelectAll: () => void
};

export class SheduleSelectableList extends React.Component<Props> {
  render() {
    const { hours, selectedHours, onSelectItem, onSelectAll } = this.props;

    return (
      <View style={styles.shedules}>
        <View>
          <View style={styles.row}>
            <Text style={styles.time}>{i18nGet('shedule_time')}</Text>
            <Text style={styles.text}>{i18nGet('shedule_value')}</Text>
            <Checkbox isChecked={selectedHours.length === 24} onCheck={onSelectAll} withoutMargin />
          </View>
          <View style={styles.shedule}>
            {hours.slice(0, 12).map((hour, index) => (
              <SheduleSelectableItem
                key={`${hour}-${index}-firstColumn`}
                hourValue={hour}
                hourIndex={index}
                isSelected={selectedHours.find(sh => sh === index) >= 0}
                onCheck={() => onSelectItem(index)}
              />
            ))}
          </View>
        </View>
        <View>
          <View style={styles.row}>
            <Text style={styles.time}>{i18nGet('shedule_time')}</Text>
            <Text style={styles.text}>{i18nGet('shedule_value')}</Text>
            <Checkbox isChecked={selectedHours.length === 24} onCheck={onSelectAll} withoutMargin />
          </View>
          <View style={styles.shedule}>
            {hours.slice(12).map((hour, index) => (
              <SheduleSelectableItem
                key={`${hour}-${index + 12}-secondColumn`}
                hourValue={hour}
                hourIndex={index + 12}
                isSelected={selectedHours.find(sh => sh === index + 12) >= 0}
                onCheck={() => onSelectItem(index + 12)}
              />
            ))}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shedules: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  shedule: {
    flexDirection: 'column',
  },
  row: {
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingRight: 8,
  },
  valuesRow: {
    flexDirection: 'row',
  },
  checkbox: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  time: {
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
  checkboxLabel: {
    fontSize: 16,
    marginRight: 4,
  },
})
