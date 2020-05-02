import { put, call, takeLatest, select } from 'redux-saga/effects';
import { INoteListNote } from '../../../model/INoteList';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import { createAddNotePendingNoteList } from '../../modules/pending-note-list/PendingNoteList';
import { createNoteListChangeNoteByIdAction } from '../../modules/noteList/NoteListActionCreator';
import { v1 as uuidv1 } from 'uuid';
import { appAnalytics } from '../../../app/Analytics';
import { handleError } from '../../../app/ErrorHandler';

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
        const noteId = uuidv1();

        yield put(createNoteListChangeNoteByIdAction(payload.note, userId, noteId));

        if (state.app.serverAvailable) {
            yield call(
                NoteApi.createNote,
                {
                    ...payload.note,
                    id: noteId
                },
                userId);
        } else {
            yield put(createAddNotePendingNoteList(payload.note.id, state.user.id));
        }

        appAnalytics.sendEventWithProps(
            appAnalytics.events.NOTE_CREATED,
            payload.note
        );

    } catch (e) {
        handleError(e, 'Ошибка сохранения записи на сервер');
    }
};

export function* watchCreateNote() {
    yield takeLatest(ACTION_TYPE, createNote);
};
