import { put, call, takeLatest, select } from 'redux-saga/effects';
import { INoteListNote } from '../../../model/INoteList';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import { createOneLevelMergePendingNoteList } from '../../modules/pending-note-list/PendingNoteList';
import { createNoteListChangeNoteByIdAction } from '../../modules/noteList/NoteListActionCreator';

const ACTION_TYPE = 'CREATE_NOTE_ACTION';

interface CreateNoteAction {
    type: 'CREATE_NOTE_ACTION',
    payload: {
        note: INoteListNote
    }
}

export function createCreateNoteAction(note: INoteListNote): CreateNoteAction {
    return {
        type: ACTION_TYPE,
        payload: {
            note
        }
    }
}

function* createNote({ payload }: CreateNoteAction) {
    try {
        const state: IStorage = yield select(state => state);
        const userId = state.user.id;

        if (state.app.serverAvailable) {
            yield call(NoteApi.createNote, payload.note, userId);
        } else {
            yield put(createOneLevelMergePendingNoteList({
                notes: {
                    [payload.note.id]: {
                        id: payload.note.id,
                        userId: state.user.id,
                    }
                }
            }));
        }
        yield put(createNoteListChangeNoteByIdAction(payload.note, userId));
    } catch (e) {
        alert(e.message);
    }
};

export function* watchCreateNote() {
    yield takeLatest(ACTION_TYPE, createNote);
};
