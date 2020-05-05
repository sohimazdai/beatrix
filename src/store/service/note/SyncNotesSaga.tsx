
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import { createNoteListOneLevelDeepMerge } from '../../modules/noteList/NoteListActionCreator';
import { handleError } from '../../../app/ErrorHandler';
import { createClearPendingNoteListByUserId } from '../../modules/pending-note-list/PendingNoteList';

const ACTION_TYPE = 'SYNC_NOTES_ACTION';

export function createSyncNotesAction() {
    return {
        type: ACTION_TYPE
    }
}

function* run() {
    try {
        const state: IStorage = yield select(state => state);
        const userId = state.user.id;
        const noteList = state.noteList;

        let userPendingNotes = [];
        if (state.pendingNoteList.notes) {
            Object.values(state.pendingNoteList.notes)
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

        if (state.app.serverAvailable) {
            const response = yield call(NoteApi.syncNotes, notesToSync, userId);

            if (response.status === 200) {
                yield put(createNoteListOneLevelDeepMerge(response.data));
                yield put(createClearPendingNoteListByUserId(userId));
            }
        }
    } catch (e) {
        handleError(e, 'Ошибка синхронизации записей с сервера');
    }
};

export function* watchSyncNotes() {
    yield takeLatest(ACTION_TYPE, run);
};
