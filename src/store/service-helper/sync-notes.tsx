import { IStorage } from '../../model/IStorage';
import { NoteApi } from '../../api/NoteApi';
import { INoteList } from '../../model/INoteList';

export async function syncNotes(state: IStorage): Promise<INoteList> {
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

  const cond = state.app.serverAvailable && state.app.networkConnected;
  if (cond) {
    const response = await NoteApi.syncNotes(notesToSync, userId);
    const syncedNotes = response.data;
    return syncedNotes;
  }

  return {};
}
