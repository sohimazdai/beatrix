import { put, call, takeLatest, select } from 'redux-saga/effects';
import { INoteListNote } from '../../../model/INoteList';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import { createAddNotePendingNoteList } from '../../modules/pending-note-list/PendingNoteList';
import { createNoteListChangeNoteByIdAction } from '../../modules/noteList/NoteListActionCreator';
import { v1 as uuidv1 } from 'uuid';
import { appAnalytics } from '../../../app/Analytics';
import { handleError } from '../../../app/ErrorHandler';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';

const ACTION_TYPE = 'CREATE_NOTE_ACTION';

interface CreateNoteAction {
    type: 'CREATE_NOTE_ACTION',
    payload: {
        note: INoteListNote
    }
}

export function createCreateNoteAction(note: INoteListNote) {
    return batchActions([
        createUserChangeAction({
            loading: true,
            error: null,
        }),
        {
            type: ACTION_TYPE,
            payload: {
                note
            }
        },
    ])
}

function* createNote({ payload }: CreateNoteAction) {
    try {

        const state: IStorage = yield select(state => state);
        const noteWithoutId = payload.note;
        const userId = state.user.id;
        const noteId = uuidv1();

        yield put(createNoteListChangeNoteByIdAction(noteWithoutId, userId, noteId));

        if (state.app.serverAvailable && state.app.networkConnected) {
            yield call(
                NoteApi.createNote,
                {
                    ...noteWithoutId,
                    id: noteId
                },
                userId);
        } else {
            yield put(createAddNotePendingNoteList(noteId, state.user.id));
        }

        appAnalytics.sendEventWithProps(
            appAnalytics.events.NOTE_CREATED,
            noteWithoutId
        );

        yield put(createUserChangeAction({
            loading: false,
            error: null,
        }));
    } catch (e) {
        handleError(e, i18nGet('notes_creating_error'));

        yield put(createUserChangeAction({
            loading: false,
            error: e.message
        }));
    }
};

export function* watchCreateNote() {
    yield takeLatest(ACTION_TYPE, createNote);
};
