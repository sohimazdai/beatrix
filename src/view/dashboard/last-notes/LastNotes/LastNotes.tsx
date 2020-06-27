import React from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Text } from 'react-native';

import { Color } from '../../../../constant/Color';
import { shadowOptions } from '../../../../constant/ShadowOptions';
import { i18nGet } from '../../../../localisation/Translate';
import { NotesIcon } from '../../../../component/icon/NotesIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IStorage } from '../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../store/selector/NoteListSelector';
import { DateHelper } from '../../../../utils/DateHelper';
import { INoteList } from '../../../../model/INoteList';
import { Note } from '../../../shared/Note/Note';
import { HorizontalIconBar } from '../../../shared/IconBar/HorizontalIconBar';
import { createChangeInteractive } from '../../../../store/modules/interactive/interactive';
import { DashboardCard } from '../../../shared/DashboardCard';

interface Props {
  noteListToday: INoteList
  onNotesPress: () => void;
  selectNoteToEdit: (noteId: string) => void;
};

class LastNotes extends React.Component<Props> {
  render() {
    const { selectNoteToEdit, onNotesPress, noteListToday } = this.props;
    let isNoteListEmpty = false;
    let notesToRender = [];

    if (!noteListToday) isNoteListEmpty = true;
    else notesToRender = Object.values(noteListToday).slice(-4).sort(
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
                {notesToRender.map(note => (
                  <Note
                    key={note.id}
                    note={note}
                    onPress={() => selectNoteToEdit(note.id)}
                  />
                ))}
              </>
            )}
        </View>
      </DashboardCard>
    );
  }
}

export const LastNotesConnected = connect(
  (state: IStorage) => ({
    noteListToday: convertFlatNoteListToNoteListByDay(state)[DateHelper.today()],
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
  emptyListText: {
    fontSize: 16,
    color: Color.TEXT_DARK_GRAY,
    fontWeight: '500',
  },
})
