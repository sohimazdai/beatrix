import React, { Dispatch, RefObject } from 'react';
import { View, StyleSheet, LayoutChangeEvent, LayoutRectangle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { IShedule } from '../../../../model/IShedule';
import { IStorage } from '../../../../model/IStorage';
import { SheduleKeyType } from '../../../../model/IUserPropertiesShedule';
import { createChangeSheduleAction } from '../../../../store/service/shedule/ChangeSheduleSaga';
import { selectSheduleHours } from './selectors/select-shedule-hours';
import { SheduleButtonBlock } from './SheduleButtonBlock';
import { SheduleListMarshal } from './SheduleListMarshal';
import { SheduleNumberScroller } from './SheduleNumberScroller';

interface OwnProps {
  scrollViewRef: RefObject<ScrollView>
  sheduleType: SheduleKeyType
}

interface Props {
  scrollViewRef: RefObject<ScrollView>
  hours: number[]
  sheduleType: SheduleKeyType
  replaceShedule: (shedule: IShedule) => void
};

interface State {
  hours: number[]
  selectedHours: number[]
  isValueEditing: boolean
  isSheduleEditing: boolean
  layout: LayoutRectangle | null
}

class Comp extends React.Component<Props, State> {
  state = {
    selectedHours: [] as number[],
    hours: this.props.hours,
    isValueEditing: false,
    isSheduleEditing: false,
    layout: null,
  }

  setSheduleIsEditing = () => {
    const { hours } = this.state;

    if (!hours) {
      this.setState({
        hours: new Array(24).fill(0),
        isSheduleEditing: true,
      });

      return
    };

    this.setState({ isSheduleEditing: true })
  };

  handleSelectItem = (index: number) => {
    const { selectedHours } = this.state;

    if (selectedHours.find(hour => hour === index) >= 0) {
      this.setState({ selectedHours: selectedHours.filter(hour => hour !== index) });
      return;
    }

    this.setState({ selectedHours: [...this.state.selectedHours, index] })
  }

  handleSelectAll = () => {
    const { selectedHours } = this.state;
    const newSelectedHours = [];

    if (selectedHours.length === 24) {
      this.setState({ selectedHours: newSelectedHours });
      return;
    }

    for (let i = 0; i < 24; i++) {
      newSelectedHours.push(i);
    }

    this.setState({ selectedHours: newSelectedHours })
  }

  setSheduleIsNotEditing = () => { this.setState({ isSheduleEditing: false }) };

  openPicker = () => { this.setState({ isValueEditing: true }) };

  handleBackToOriginShedule = () => {
    this.setState({
      isSheduleEditing: false,
      hours: this.props.hours,
    })
  }

  handleAcceptValue = (value: number) => {
    const { selectedHours, hours } = this.state;

    const newHours = [...hours];

    selectedHours.forEach((sH) => {
      newHours[sH] = value;
    })

    this.setState({
      hours: newHours,
      selectedHours: [],
      isValueEditing: false,
    })
  }

  handleBackToInitValue = () => {
    this.setState({
      selectedHours: [],
      isValueEditing: false,
    });
  }

  handleSave = async () => {
    const { replaceShedule, sheduleType, scrollViewRef } = this.props;
    const { hours, layout } = this.state;

    replaceShedule({ hours, type: sheduleType });

    await this.setState({
      isValueEditing: false,
      isSheduleEditing: false,
      selectedHours: [],
    });

    scrollViewRef.current.scrollTo({ y: (layout as LayoutRectangle).y });
  }

  render() {
    const { hours: propHours } = this.props;
    const { hours, isSheduleEditing, selectedHours, isValueEditing } = this.state;

    return (
      <>
        <View
          style={styles.container}
          onLayout={({ nativeEvent }) => { this.setState({ layout: nativeEvent.layout }) }}
        >
          <SheduleListMarshal
            onSelectItem={this.handleSelectItem}
            onSelectAll={this.handleSelectAll}
            selectedHours={selectedHours}
            hours={hours}
            isEditing={isSheduleEditing}
          />
          {!isValueEditing && <SheduleButtonBlock
            propHours={propHours}
            hours={hours}
            isEditing={isSheduleEditing}
            onSave={this.handleSave}
            onStartChangeShedule={this.setSheduleIsEditing}
            onBack={this.handleBackToOriginShedule}
            onSetValueClick={this.openPicker}
            selectedHours={selectedHours}
          />}
          {isValueEditing && (
            <SheduleNumberScroller
              onAccept={this.handleAcceptValue}
              onBack={this.handleBackToInitValue}
            />
          )}
        </View>
      </>
    );
  }
}

export const Shedule = connect(
  (state: IStorage, ownProps: OwnProps) => ({
    hours: selectSheduleHours(state, ownProps.sheduleType),
  }),
  (dispatch: Dispatch<Action>) => ({
    replaceShedule: (shedule: IShedule) => dispatch(createChangeSheduleAction(shedule)),
  })
)(Comp)

const styles = StyleSheet.create({
  container: {
    width: 260,
    alignSelf: 'center',
    paddingVertical: 8,
  },
  emptyShedule: {
    width: '100%',
    textAlign: 'center',
    fontSize: 19,
    paddingHorizontal: 32,
    paddingVertical: 16,
  }
})
