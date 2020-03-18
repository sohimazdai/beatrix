
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { INoteListNote } from '../../../model/INoteList';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';

const ACTION_TYPE = 'UPDATE_NOTE_ACTION';

interface UpdateNoteAction {
    type: 'UPDATE_NOTE_ACTION',
    payload: {
        note: INoteListNote,
        prevDate?: number
    }
}

export function createUpdateNoteAction(note: INoteListNote, prevDate?: number): UpdateNoteAction {
    return {
        type: ACTION_TYPE,
        payload: {
            note,
            prevDate
        }
    }
}

function* run({ payload }: UpdateNoteAction) {
    try {
        yield put(createUserChangeAction({
            loading: true,
            error: null
        }));
        const state: IStorage = yield select(state => state);
        yield call(NoteApi.updateNote, payload.note, state.user.id, payload.prevDate);
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

export function* watchUpdateNote() {
    yield takeLatest(ACTION_TYPE, run);
};
