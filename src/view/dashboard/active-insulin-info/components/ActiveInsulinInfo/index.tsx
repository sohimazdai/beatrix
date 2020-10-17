import React, { useState } from 'react';
import { connect } from 'react-redux';

import { IStorage } from '../../../../../model/IStorage';
import { INoteListByDay, INoteListNote } from '../../../../../model/INoteList';
import { DashboardCard } from '../../../../shared/components/DashboardCard';
import { selectNoteWithActiveInsulin } from '../../selectors/select-notes-with-active-insulin';
import { IUserDiabetesProperties } from '../../../../../model/IUserDiabetesProperties';
import { InsulinSettingsLink } from '../InsulinSettingsLink';
import ActiveInsulinCardHeader from '../ActiveInsulinCardHeader';
import { NavigationParams, NavigationState, NavigationScreenProp } from 'react-navigation';
import checkThatInsulinIsActive from '../ActiveInsulinCardContent/check-that-insulin-is-active';
import calculateActiveInsulinTime from '../ActiveInsulinCardContent/calculate-active-insulin-time';
import { i18nGet } from '../../../../../localisation/Translate';
import { convertFlatNoteListToNoteListByDay } from '../../../../../store/selector/NoteListSelector';
import { DateHelper } from '../../../../../utils/DateHelper';
import { selectActiveInsulinDuration } from '../../selectors/select-active-insulin-duration';
import { ActiveInsulinCardContent } from '../ActiveInsulinCardContent';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  activeInsulinNoteListByDay: INoteListByDay
  userDiabetesProperties: IUserDiabetesProperties
  lastNote?: INoteListNote,
  lastYesterdayNote?: INoteListNote,
  hoursOfinsulinDuration: number,
  oldestNoteTime: number
};

interface State {
  minutes?: number
  hours?: number
  intervalId?: NodeJS.Timeout
  now: Date
}

class ActiveInsulinInfo extends React.Component<Props, State> {
  state = {
    minutes: 0,
    hours: 0,
    intervalId: null,
    now: new Date(),
  };

  componentDidMount() {
    const { lastNote, lastYesterdayNote } = this.props;
    if (!checkThatInsulinIsActive(lastNote) && !checkThatInsulinIsActive(lastYesterdayNote)) {
      this.setInitialState();
      return;
    }

    this.timer();

    const intervalId = setInterval(this.timer, 60 * 1000);
    this.setState({ intervalId: intervalId });
  }

  componentDidUpdate(pP: Props) {
    const { lastNote, lastYesterdayNote } = this.props;

    if (
      (checkThatInsulinIsActive(lastNote) || checkThatInsulinIsActive(lastYesterdayNote)) &&
      (!checkThatInsulinIsActive(pP.lastNote) && !checkThatInsulinIsActive(pP.lastYesterdayNote))
    ) {
      clearInterval(this.state.intervalId);
      this.timer();

      const intervalId = setInterval(this.timer, 60 * 1000);
      this.setState({ intervalId: intervalId });
    }

    if (
      (!checkThatInsulinIsActive(lastNote) && !checkThatInsulinIsActive(lastYesterdayNote)) &&
      (checkThatInsulinIsActive(pP.lastNote) || checkThatInsulinIsActive(pP.lastYesterdayNote))
    ) {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: null });
      this.setInitialState();
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  timer = () => {
    const { lastNote, lastYesterdayNote, userDiabetesProperties } = this.props;
    const { shortInsulinType } = userDiabetesProperties;
    const noteToUpdate = lastNote || lastYesterdayNote;

    if (!checkThatInsulinIsActive(lastNote) && !checkThatInsulinIsActive(lastYesterdayNote)) {
      this.setInitialState();
      return;
    }

    const expiresIn = calculateActiveInsulinTime(noteToUpdate.date, shortInsulinType);

    this.setState({
      ...expiresIn,
      now: new Date(),
    });
  };

  setInitialState = () => {
    this.setState({
      minutes: 0,
      hours: 0,
    })
  }

  render() {
    const {
      oldestNoteTime, activeInsulinNoteListByDay, userDiabetesProperties, navigation,
      hoursOfinsulinDuration,
    } = this.props;
    const { minutes, hours, now } = this.state;

    if (!activeInsulinNoteListByDay) return null;

    if (!minutes && !hours) return null;

    const message = `${i18nGet('expires_in')} ~ ${hours}${i18nGet('hours_short')} ${minutes}${i18nGet('minutes_short')}`

    const initialHour = new Date(oldestNoteTime).getHours();

    // TODO: divided analytics
    return (
      <DashboardCard>
        {userDiabetesProperties.shortInsulinType
          ? <ActiveInsulinCardContent
            hoursOfinsulinDuration={hoursOfinsulinDuration}
            now={now}
            message={message}
            initialHour={initialHour}
          />
          : <>
            <ActiveInsulinCardHeader now={now} />
            <InsulinSettingsLink navigation={navigation} />
          </>
        }
      </DashboardCard>
    );
  }
}

export const ActiveInsulinInfoConnected = connect(
  (state: IStorage) => ({
    activeInsulinNoteListByDay: selectNoteWithActiveInsulin(state).noteListByDay,
    userDiabetesProperties: state.userDiabetesProperties,
    lastNote: Object.values(
      convertFlatNoteListToNoteListByDay(state)[DateHelper.today()] || {}
    )
      .filter(note => !!note.insulin)
      .sort((noteA, noteB) => noteB.date - noteA.date)[0],
    lastYesterdayNote: Object.values(
      convertFlatNoteListToNoteListByDay(state)[DateHelper.yesterday()] || {}
    )
      .filter(note => !!note.insulin)
      .sort((noteA, noteB) => noteB.date - noteA.date)[0],
    hoursOfinsulinDuration: selectActiveInsulinDuration(state),
    oldestNoteTime: selectNoteWithActiveInsulin(state).oldestNoteTime,
  })
)(ActiveInsulinInfo);
