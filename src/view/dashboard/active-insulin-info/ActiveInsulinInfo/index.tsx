import React from 'react';
import { connect } from 'react-redux';

import { Text, StyleSheet } from 'react-native';
import { IStorage } from '../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../store/selector/NoteListSelector';
import { DateHelper } from '../../../../utils/DateHelper';
import { INoteListNote } from '../../../../model/INoteList';
import { DashboardCard } from '../../../shared/DashboardCard';
import { i18nGet } from '../../../../localisation/Translate';
import { Color } from '../../../../constant/Color';
import calculateActiveInsulinTime from './calculate-active-insulin-time';
import checkThatInsulinIsActive from './check-that-insulin-is-active';

interface Props {
  lastNote?: INoteListNote,
  lastYesterdayNote?: INoteListNote,
};

interface State {
  minutes?: number
  hours?: number
  intervalId?: NodeJS.Timeout
}

class ActiveInsulinInfo extends React.Component<Props, State> {
  state = {
    minutes: 0,
    hours: 0,
    intervalId: null,
  };

  componentDidMount() {
    this.timer();

    var intervalId = setInterval(this.timer, 60 * 1000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  timer = () => {
    const { lastNote, lastYesterdayNote } = this.props;

    if (!checkThatInsulinIsActive(lastNote) && !checkThatInsulinIsActive(lastYesterdayNote)) {
      this.setState({
        minutes: 0,
        hours: 0,
      })
      return;
    }

    const expiresIn = calculateActiveInsulinTime(lastNote.date || lastYesterdayNote.date);

    this.setState({
      ...expiresIn,
    });
  };

  render() {
    const { minutes, hours } = this.state;

    if (!minutes && !hours) {
      return null;
    }

    const message = `${i18nGet('expires_in')} ~ ${hours}${i18nGet('hours_short')} ${minutes}${i18nGet('minutes_short')}`

    return (
      <DashboardCard>
        <Text style={styles.cardTitle}>
          {i18nGet('rest_active_insulin')}
        </Text>
        <Text style={styles.cardText}>
          {message}
        </Text>
      </DashboardCard>
    );
  }
}

export const ActiveInsulinInfoConnected = connect(
  (state: IStorage) => ({
    lastNote: Object.values(
      convertFlatNoteListToNoteListByDay(state)[DateHelper.today()] || {}
    )
      .sort((noteA, noteB) => noteB.date - noteA.date)[0],
    lastYesterdayNote: Object.values(
      convertFlatNoteListToNoteListByDay(state)[DateHelper.yesterday()] || {}
    )
      .sort((noteA, noteB) => noteB.date - noteA.date)[0],
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
