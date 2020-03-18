
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';

const ACTION_TYPE = 'DELETE_NOTE_ACTION';

interface DeleteNoteAction {
    type: 'DELETE_NOTE_ACTION',
    payload: {
        date: number,
    }
}

export function createDeleteNoteAction(date: number): DeleteNoteAction {
    return {
        type: ACTION_TYPE,
        payload: {
            date,
        }
    }
}

function* run({ payload }: DeleteNoteAction) {
    try {
        yield put(createUserChangeAction({
            loading: true,
            error: null
        }));
        const state: IStorage = yield select(state => state);
        yield call(NoteApi.deleteNote, payload.date, state.user.id);
        yield put(createUserChangeAction({
            loading: false,
            error: null
        }));
    } catch (e) {
        alert(e.message);
        yield put(createUserChangeAction({
            loading: false,
            error: e
        }));
    }
};

export function* watchDeleteNote() {
    yield takeLatest(ACTION_TYPE, run);
};
