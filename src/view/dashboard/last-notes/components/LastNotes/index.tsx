import React from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Text } from 'react-native';

import { Color } from '../../../../../constant/Color';
import { i18nGet } from '../../../../../localisation/Translate';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IStorage } from '../../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../../store/selector/NoteListSelector';
import { DateHelper } from '../../../../../utils/DateHelper';
import { INoteList, INoteListByDay, INoteListNote } from '../../../../../model/INoteList';
import { Note } from '../../../../shared/Note/Note';
import { HorizontalIconBar } from '../../../../shared/IconBar/HorizontalIconBar';
import { createChangeInteractive } from '../../../../../store/modules/interactive/interactive';
import { DashboardCard } from '../../../../shared/DashboardCard';
import { NotesIcon } from '../../../../../component/icon/NotesIcon';
import { selectRecentNoteListByDay } from '../../selectors/select-recent-note-list-by-day';

interface Props {
  recentNoteListByDay: INoteListByDay
  onNotesPress: () => void;
  selectNoteToEdit: (noteId: string) => void;
};

class LastNotes extends React.Component<Props> {
  renderCards() {
    const { recentNoteListByDay } = this.props;
    let isNeedToRenderDate = true;
    const daysToRender: string[] = Object.keys(recentNoteListByDay);

    if (daysToRender.length === 1 && Number(daysToRender[0]) === DateHelper.today()) {
      isNeedToRenderDate = false;
    }

    return daysToRender.map(day => {
      return (
        <View key={day}>
          {isNeedToRenderDate && this.renderDate(parseInt(day))}
          {this.renderCard(this.props.recentNoteListByDay[day])}
        </View>
      )
    })
  }

  renderCard(dayNotes: INoteList) {
    const notes: INoteListNote[] = Object.values(dayNotes).sort((a, b) => {
      return b.date - a.date;
    });

    return (
      <View>
        {notes.map(note => {
          return (
            <Note
              key={note.id}
              note={note}
              onPress={() => this.props.selectNoteToEdit(note.id)}
            />
          );
        })}
      </View>
    );
  }

  renderDate(day: number) {
    const today = DateHelper.today();
    const yesterday = DateHelper.yesterday();
    let displayingDate = "";
    if (day === today) {
      displayingDate =
        `${i18nGet('today')}, ` +
        `${new Date(day).getDate()} ${DateHelper.getMonthStringPossesive(
          new Date(day).getMonth()
        )}`;
    } else if (day === yesterday) {
      displayingDate =
        `${i18nGet('yesterday')}, ` +
        `${new Date(day).getDate()} ${DateHelper.getMonthStringPossesive(
          new Date(day).getMonth()
        )}`;
    } else {
      displayingDate = `${new Date(day).getDate()} ${DateHelper.getMonthStringPossesive(
        new Date(day).getMonth()
      )}`;
    }
    return (
      <View>
        <Text style={styles.dateTitle}>{displayingDate}</Text>
      </View>
    );
  }

  render() {
    const { selectNoteToEdit, onNotesPress, recentNoteListByDay } = this.props;
    let isNoteListEmpty = false;
    let notesToRender = [];

    if (!Object.values(recentNoteListByDay).length) isNoteListEmpty = true;
    else notesToRender = Object.values(recentNoteListByDay).slice(-4).sort(
      (noteA, noteB) => noteB.date - noteA.date
    );

    return (
      <DashboardCard>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle}>
            {i18nGet('last_notes')}
          </Text>
          <TouchableOpacity onPress={onNotesPress}>
            <NotesIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.cardContent}>
          {isNoteListEmpty
            ? (
              <Text style={styles.emptyListText}>
                {i18nGet('no_recent_notes_today')}
              </Text>
            )
            : (
              <>
                <View style={styles.iconBarWrap}>
                  <HorizontalIconBar />
                </View>
                {this.renderCards()}
              </>
            )}
        </View>
      </DashboardCard>
    );
  }
}

export const LastNotesConnected = connect(
  (state: IStorage) => ({
    recentNoteListByDay: selectRecentNoteListByDay(state),
  }),
  (dispatch) => ({
    selectNoteToEdit: (noteId: string) => dispatch(
      createChangeInteractive({
        editingNoteId: noteId,
        creatingNoteMode: true
      })
    ),
  })
)(LastNotes);

const styles = StyleSheet.create({
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 19,
    color: Color.TEXT_DARK_GRAY,
    fontWeight: '500',
  },
  cardContent: {
    paddingTop: 16,
  },
  iconBarWrap: {
    marginBottom: 8,
  },
  dateTitle: {
    fontSize: 15,
    color: Color.TEXT_DARK_GRAY,
    paddingVertical: 8,
    paddingBottom: 4,
  },
  emptyListText: {
    fontSize: 16,
    color: Color.TEXT_DARK_GRAY,
    fontWeight: '500',
  },
})
