import React from 'react';
import { IUserDiabetesProperties } from '../model/IUserDiabetesProperties';
import { connect } from 'react-redux';
import { IStorage } from '../model/IStorage';
import { createUserDiabetesPropertiesChangeAction } from '../store/modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator';

interface Props {
  userDiabetesProperties: IUserDiabetesProperties;

  updateUserDiabetesProperties: (prevProperties: IUserDiabetesProperties) => void;
}

interface State {
  prevProperties?: IUserDiabetesProperties
}

class Component extends React.Component<Props, State> {
  state = {
    prevProperties: this.props.userDiabetesProperties
  };

  componentDidUpdate(pP: Props) {
    const { updateUserDiabetesProperties, userDiabetesProperties } = this.props;
    const { glycemiaMeasuringType, carbsMeasuringType, carbsUnitWeightType } = userDiabetesProperties;
    const {
      glycemiaMeasuringType: prevGlycemiaMeasuringType,
      carbsMeasuringType: prevCarbsMeasuringType,
      carbsUnitWeightType: prevCarbsUnitWeightType
    } = pP.userDiabetesProperties;
    const {
      glycemiaMeasuringType: stateGlycemiaMeasuringType,
      carbsMeasuringType: stateCarbsMeasuringType,
      carbsUnitWeightType: stateCarbsUnitWeightType
    } = this.state.prevProperties;

    if (
      stateGlycemiaMeasuringType !== glycemiaMeasuringType ||
      stateCarbsMeasuringType !== carbsMeasuringType ||
      stateCarbsUnitWeightType !== carbsUnitWeightType
    ) {
      if (
        glycemiaMeasuringType !== prevGlycemiaMeasuringType ||
        carbsMeasuringType !== prevCarbsMeasuringType ||
        carbsUnitWeightType !== prevCarbsUnitWeightType
      ) {
        updateUserDiabetesProperties(pP.userDiabetesProperties);
        this.setState({ prevProperties: pP.userDiabetesProperties })
      }
    }
  }

  render() {
    return null;
  }
}

export const UserPropertiesChangesWatcher = connect(
  (state: IStorage) => ({
    userDiabetesProperties: state.userDiabetesProperties,
  }),
  (dispatch) => ({
    updateUserDiabetesProperties: (prevProperties: IUserDiabetesProperties) => {
      dispatch(createUserDiabetesPropertiesChangeAction(prevProperties))
    },
  })
)(Component);
