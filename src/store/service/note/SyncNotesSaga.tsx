
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import { createNoteListOneLevelDeepMerge } from '../../modules/noteList/NoteListActionCreator';

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
        const notesToSync = Object.values(state.noteList).filter(note => note.userId === userId);
        console.log('notesToSync', notesToSync)
        if (state.app.serverAvailable) {
            const syncedNotes = yield call(NoteApi.syncNotes, notesToSync, userId);
            yield put(createNoteListOneLevelDeepMerge(syncedNotes.data));
        }
    } catch (e) {
        alert(e.message);
    }
};

export function* watchSyncNotes() {
    yield takeLatest(ACTION_TYPE, run);
};
