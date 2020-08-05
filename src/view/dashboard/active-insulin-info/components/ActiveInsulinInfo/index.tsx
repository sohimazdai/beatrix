import React from 'react';
import { connect } from 'react-redux';

import { Text, StyleSheet } from 'react-native';
import { IStorage } from '../../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../../store/selector/NoteListSelector';
import { DateHelper } from '../../../../../utils/DateHelper';
import { INoteListNote, INoteListByDay } from '../../../../../model/INoteList';
import { DashboardCard } from '../../../../shared/components/DashboardCard';
import { i18nGet } from '../../../../../localisation/Translate';
import { Color } from '../../../../../constant/Color';
import calculateActiveInsulinTime from './calculate-active-insulin-time';
import checkThatInsulinIsActive from './check-that-insulin-is-active';
import { ActiveInsulinChartConnected } from '../InsulinChart';
import { selectActiveInsulinDuration } from '../../selectors/select-active-insulin-duration';
import { OXTimeTitles } from '../OXTimeTitles';
import { selectNoteWithActiveInsulin } from '../../selectors/select-notes-with-active-insulin';
import { ActiveInsulinCounterConnected } from '../ActiveInsulinCounter';

interface Props {
  lastNote?: INoteListNote,
  lastYesterdayNote?: INoteListNote,
  hoursOfinsulinDuration: number,
  oldestNoteTime: number
  activeInsulinNoteListByDay: INoteListByDay
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
    const { lastNote, lastYesterdayNote } = this.props;
    const noteToUpdate = lastNote || lastYesterdayNote;

    if (!checkThatInsulinIsActive(lastNote) && !checkThatInsulinIsActive(lastYesterdayNote)) {
      this.setInitialState();
      return;
    }

    const expiresIn = calculateActiveInsulinTime(noteToUpdate.date);

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
    const { oldestNoteTime, activeInsulinNoteListByDay } = this.props;
    const { minutes, hours, now } = this.state;

    if (!activeInsulinNoteListByDay) return null;

    if (!minutes && !hours) return null;

    const message = `${i18nGet('expires_in')} ~ ${hours}${i18nGet('hours_short')} ${minutes}${i18nGet('minutes_short')}`

    const initialHour = new Date(oldestNoteTime).getHours();

    return (
      <DashboardCard>
        <Text style={styles.cardTitle}>
          {i18nGet('rest_active_insulin')}
        </Text>
        <ActiveInsulinChartConnected />
        <OXTimeTitles
          hoursOfinsulinDuration={this.props.hoursOfinsulinDuration}
          initialHour={initialHour}
        />
        <Text style={styles.cardText}>
          {message}
        </Text>
        <ActiveInsulinCounterConnected now={now} />
      </DashboardCard>
    );
  }
}

export const ActiveInsulinInfoConnected = connect(
  (state: IStorage) => ({
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
    activeInsulinNoteListByDay: selectNoteWithActiveInsulin(state).noteListByDay,
  })
)(ActiveInsulinInfo);

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 16,
    color: Color.CRIMSON_RED,
    fontWeight: '500',
  },
  cardText: {
    paddingTop: 8,
    fontSize: 14,
    color: Color.TEXT_BLACK,
  }
})
