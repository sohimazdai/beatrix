import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { i18nGet } from '../../../../localisation/Translate';
import { IShedule } from '../../../../model/IShedule';
import { SheduleHeader } from './SheduleHeader';
import { SheduleSelectableList } from './SheduleSelectableList';
import { SheduleShort } from './SheduleShort';

interface Props {
  hours: number[]
  isEditing: boolean
  selectedHours: number[]
  onSelectItem: (index: number) => void
  onSelectAll: () => void
};

export class SheduleListMarshal extends React.Component<Props> {
  render() {
    const { hours, isEditing, selectedHours, onSelectItem, onSelectAll } = this.props;

    if (!hours) {
      return <Text style={styles.emptyShedule}>{i18nGet('shedule_not_made')}</Text>
    }

    if (isEditing) {
      return (
        <SheduleSelectableList
          hours={hours}
          selectedHours={selectedHours}
          onSelectItem={onSelectItem}
          onSelectAll={onSelectAll}
        />
      );
    }

    return <SheduleShort hours={hours} />;
  }
}

const styles = StyleSheet.create({
  emptyShedule: {
    width: '100%',
    textAlign: 'center',
    fontSize: 19,
    paddingHorizontal: 32,
    paddingVertical: 16,
  }
})
