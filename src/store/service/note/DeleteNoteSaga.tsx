
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import { createOneLevelMergePendingNoteList } from '../../modules/pending-note-list/PendingNoteList';
import { createDeleteNoteInNoteListById } from '../../modules/noteList/NoteListActionCreator';
import { appAnalytics } from '../../../app/Analytics';

const ACTION_TYPE = 'DELETE_NOTE_ACTION';

interface DeleteNoteAction {
    type: 'DELETE_NOTE_ACTION',
    payload: {
        id: string,
    }
}

export function createDeleteNoteAction(id: string): DeleteNoteAction {
    return {
        type: ACTION_TYPE,
        payload: {
            id
        }
    }
}

function* run({ payload }: DeleteNoteAction) {
    try {
        const state: IStorage = yield select(state => state);

        yield put(createDeleteNoteInNoteListById(payload.id));

        if (state.app.serverAvailable) {
            yield call(NoteApi.deleteNote, payload.id, state.user.id);
        } else {
            yield put(createOneLevelMergePendingNoteList({
                notes: {
                    [payload.id]: {
                        id: payload.id,
                        userId: state.user.id
                    }
                }
            }));
        }

        appAnalytics.sendEvent(appAnalytics.events.NOTE_DELETED);

        yield put(createUserChangeAction({
            loading: false,
            error: null
        }));
    } catch (e) {
        alert(e.message);
    }
};

export function* watchDeleteNote() {
    yield takeLatest(ACTION_TYPE, run);
};
