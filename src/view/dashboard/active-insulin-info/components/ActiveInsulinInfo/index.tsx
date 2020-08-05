import React from 'react';
import { connect } from 'react-redux';

import { IStorage } from '../../../../../model/IStorage';
import { INoteListByDay } from '../../../../../model/INoteList';
import { DashboardCard } from '../../../../shared/components/DashboardCard';
import { selectNoteWithActiveInsulin } from '../../selectors/select-notes-with-active-insulin';
import { IUserDiabetesProperties } from '../../../../../model/IUserDiabetesProperties';
import { InsulinSettingsLink } from '../InsulinSettingsLink';
import ActiveInsulinCardHeader from '../ActiveInsulinCardHeader';
import { ActiveInsulinCardContentConnected } from '../ActiveInsulinCardContent';
import { NavigationParams, NavigationState, NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  activeInsulinNoteListByDay: INoteListByDay
  userDiabetesProperties: IUserDiabetesProperties
};

function ActiveInsulinInfo(props: Props) {

  const { activeInsulinNoteListByDay, userDiabetesProperties, navigation } = props;

  if (!activeInsulinNoteListByDay) return null;

  return (
    <DashboardCard>
      <ActiveInsulinCardHeader />
      {userDiabetesProperties.shortInsulinType
        ? <ActiveInsulinCardContentConnected />
        : <InsulinSettingsLink navigation={navigation} />
      }
    </DashboardCard>
  );
}

export const ActiveInsulinInfoConnected = connect(
  (state: IStorage) => ({
    activeInsulinNoteListByDay: selectNoteWithActiveInsulin(state).noteListByDay,
    userDiabetesProperties: state.userDiabetesProperties,
  })
)(ActiveInsulinInfo);
