
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import { createNoteListOneLevelDeepMerge } from '../../modules/noteList/NoteListActionCreator';
import { handleError } from '../../../app/ErrorHandler';

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
        if (state.app.serverAvailable) {
            const syncedNotes = yield call(NoteApi.syncNotes, notesToSync, userId);
            yield put(createNoteListOneLevelDeepMerge(syncedNotes.data));
        }
    } catch (e) {
        handleError(e, 'Ошибка синхронизации записей с сервера');
    }
};

export function* watchSyncNotes() {
    yield takeLatest(ACTION_TYPE, run);
};
