
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { INoteListNote } from '../../../model/INoteList';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import { createNoteListChangeNoteByIdAction } from '../../modules/noteList/NoteListActionCreator';
import { appAnalytics } from '../../../app/Analytics';
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { createAddNotePendingNoteList } from '../../modules/pending-note-list/PendingNoteList';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';

const ACTION_TYPE = 'UPDATE_NOTE_ACTION';

interface UpdateNoteAction {
    type: 'UPDATE_NOTE_ACTION',
    payload: {
        note: INoteListNote,
    }
}

export function createUpdateNoteAction(note: INoteListNote) {
    return batchActions([
        createUserChangeAction({
            loading: true,
            error: null,
        }),
        {
            type: ACTION_TYPE,
            payload: {
                note,
            }
        },
    ])
}

function* run({ payload }: UpdateNoteAction) {
    const state: IStorage = yield select(state => state);
    const userId = state.user.id;
    const oldNote = state.noteList && state.noteList[payload.note.id];
    const newNote = payload.note;

    try {
        yield put(createNoteListChangeNoteByIdAction(payload.note, userId));

        if (state.app.serverAvailable && state.app.networkConnected) {
            yield call(NoteApi.updateNote, payload.note, userId);
        } else {
            yield put(createAddNotePendingNoteList(payload.note.id, state.user.id));
        }

        appAnalytics.sendEventWithProps(
            appAnalytics.events.NOTE_UPDATED,
            {
                newNote,
                oldNote,
            }
        );

        yield put(createUserChangeAction({
            loading: false,
            error: null
        }));
    } catch (e) {
        handleErrorSilently(e, i18nGet('note_updating_error'));

        yield put(createAddNotePendingNoteList(payload.note.id, state.user.id));

        yield put(createUserChangeAction({
            loading: false,
            error: e.message
        }));
    }
};

export function* watchUpdateNote() {
    yield takeLatest(ACTION_TYPE, run);
};
