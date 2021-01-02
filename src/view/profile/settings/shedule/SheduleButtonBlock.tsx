import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import { i18nGet } from '../../../../localisation/Translate';

interface Props {
  selectedHours: number[]
  propHours: number[]
  hours: number[]
  isEditing: boolean
  onSave: () => void
  onStartChangeShedule: () => void
  onBack: () => void
  onSetValueClick: () => void
};

export class SheduleButtonBlock extends React.Component<Props> {
  get propHoursAreDifferentToStateHours(): boolean {
    const { hours, propHours = [] } = this.props;

    return hours.some((h: number, index: number) => h !== propHours[index]);
  }

  render() {
    const {
      selectedHours,
      hours,
      isEditing,
      onStartChangeShedule,
      onSetValueClick,
      onBack,
      onSave,
    } = this.props;

    if (!(hours && hours.length) && !isEditing) {
      return (
        <View style={styles.buttonsBlock}>
          <StyledButton
            style={StyledButtonType.PRIMARY}
            onPress={onStartChangeShedule}
            label={i18nGet('make_a_schedule')}
          />
        </View >
      )
    }

    if (hours && hours.length && !isEditing) {
      return (
        <View style={styles.buttonsBlock}>
          <StyledButton
            style={StyledButtonType.PRIMARY}
            onPress={onStartChangeShedule}
            label={i18nGet('change_schedule')}
          />
        </View >
      )
    }

    return (
      <View style={styles.buttonsBlock}>
        <StyledButton
          fluid
          style={StyledButtonType.OUTLINE}
          onPress={onSetValueClick}
          label={i18nGet('change_shedule_value')}
          disabled={selectedHours.length === 0}
        />
        <View style={styles.buttonsRow}>
          <StyledButton
            style={StyledButtonType.DELETE}
            onPress={onBack}
            label={i18nGet('cancel')}
          />
          <View style={styles.space} />
          <StyledButton
            fluid
            style={StyledButtonType.PRIMARY}
            onPress={onSave}
            label={i18nGet('save')}
            disabled={!this.propHoursAreDifferentToStateHours}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonsBlock: {
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonsRow: {
    marginTop: 8,
    flexDirection: 'row',
  },
  space: {
    width: 8,
  }
})
