import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Checkbox } from '../../../../component/checkbox/Checkbox';
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
      <View>
        <View style={styles.row}>
          <View style={styles.valuesRow}>
            <Text style={styles.time}>{i18nGet('shedule_time')}</Text>
            <Text style={styles.text}>{i18nGet('shedule_value')}</Text>
          </View>
          <View style={styles.checkbox}>
            <Text style={styles.checkboxLabel}>
              {i18nGet('shedule_item_selected')}
            </Text>
            <Checkbox isChecked={selectedHours.length === 24} onCheck={onSelectAll} withoutMargin />
          </View>
        </View>
        {hours.map((hour, index) => (
          <SheduleSelectableItem
            hourValue={hour}
            hourIndex={index}
            isSelected={selectedHours.find(sh => sh === index) >= 0}
            onCheck={() => onSelectItem(index)}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  valuesRow: {
    flexDirection: 'row',
  },
  checkbox: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  time: {
    width: 85,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
  checkboxLabel: {
    fontSize: 16,
    marginRight: 4,
  }
})
