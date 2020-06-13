
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import { createAddNotePendingNoteList, createDeleteNoteFromPendingNoteList } from '../../modules/pending-note-list/PendingNoteList';
import { createDeleteNoteInNoteListById } from '../../modules/noteList/NoteListActionCreator';
import { appAnalytics } from '../../../app/Analytics';
import { handleError } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';

const ACTION_TYPE = 'DELETE_NOTE_ACTION';

interface DeleteNoteAction {
    type: 'DELETE_NOTE_ACTION',
    payload: {
        id: string,
    }
}

export function createDeleteNoteAction(id: string) {
    return batchActions([
        createUserChangeAction({
            loading: true,
            error: null,
        }),
        {
            type: ACTION_TYPE,
            payload: {
                id
            }
        },
    ])
}

function* run({ payload }: DeleteNoteAction) {
    try {
        const state: IStorage = yield select(state => state);
        const noteToDelete = state.noteList[payload.id];
        const noteFromPendingList = state.pendingNoteList.notes[payload.id];

        yield put(createDeleteNoteInNoteListById(payload.id));

        if (state.app.serverAvailable && state.app.networkConnected) {
            yield call(NoteApi.deleteNote, payload.id, state.user.id);
            if (noteFromPendingList) {
                yield put(createDeleteNoteFromPendingNoteList(payload.id, state.user.id));
            }
        } else {
            if (noteToDelete) {
                yield put(createAddNotePendingNoteList(payload.id, state.user.id));
            } else {
                yield put(createDeleteNoteFromPendingNoteList(payload.id, state.user.id));
            }
        }

        appAnalytics.sendEvent(appAnalytics.events.NOTE_DELETED);

        yield put(createUserChangeAction({
            loading: false,
            error: null
        }));
    } catch (e) {
        handleError(e, i18nGet('notes_deleting_error'));

        yield put(createUserChangeAction({
            loading: false,
            error: e.message
        }));
    }
};

export function* watchDeleteNote() {
    yield takeLatest(ACTION_TYPE, run);
};
