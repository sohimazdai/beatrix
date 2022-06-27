import { IStorage } from '../../model/IStorage';
import { NoteApi } from '../../api/NoteApi';
import { INoteList, INoteListNote } from '../../model/INoteList';

import createMap from '../../utils/create-map';

type SyncNotesResponse = {
  notes: INoteList,
  noteListSize: number,
  offset: number,
}

export async function syncNotes(state: IStorage): Promise<SyncNotesResponse> {
  const userId = state.user.id;
  const noteList = state.noteList;

  let userPendingNotes = [];
  if (state.pendingNoteList && state.pendingNoteList.notes) {
    userPendingNotes = Object.values(state.pendingNoteList.notes)
      .filter(note => note.userId === userId);
  }
  const notesToSync = userPendingNotes.reduce((notes, next) => {
    if (next.id) {
      return [
        ...notes,
        noteList[next.id]
          ? noteList[next.id]
          : {
            id: next.id,
            reason: 'delete'
          }
      ];
    }
    return notes;
  }, [])

  const isFetchingAvailable = state.app.serverAvailable && state.app.networkConnected;

  if (isFetchingAvailable) {
    const { data: { notes, noteListSize, offset } } = await NoteApi.syncNotesV2(notesToSync, userId);

    const notesList = createMap<INoteListNote>(notes);

    return { notes: notesList, noteListSize, offset };
  }

  return { notes: {}, noteListSize: undefined, offset: 0 };
}
