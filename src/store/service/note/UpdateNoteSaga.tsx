
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { INoteListNote } from '../../../model/INoteList';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import { createNoteListChangeNoteByIdAction } from '../../modules/noteList/NoteListActionCreator';
import { appAnalytics } from '../../../app/Analytics';
import { handleError } from '../../../app/ErrorHandler';
import { createAddNotePendingNoteList } from '../../modules/pending-note-list/PendingNoteList';

const ACTION_TYPE = 'UPDATE_NOTE_ACTION';

interface UpdateNoteAction {
    type: 'UPDATE_NOTE_ACTION',
    payload: {
        note: INoteListNote,
    }
}

export function createUpdateNoteAction(note: INoteListNote): UpdateNoteAction {
    return {
        type: ACTION_TYPE,
        payload: {
            note,
        }
    }
}

function* run({ payload }: UpdateNoteAction) {
    try {
        const state: IStorage = yield select(state => state);
        const userId = state.user.id;

        yield put(createNoteListChangeNoteByIdAction(payload.note, userId));

        if (state.app.serverAvailable) {
            yield call(NoteApi.updateNote, payload.note, userId);
        } else {
            yield put(createAddNotePendingNoteList(payload.note.id, state.user.id));
        }

        appAnalytics.sendEventWithProps(
            appAnalytics.events.NOTE_UPDATED,
            payload.note
        );
        
    } catch (e) {
        handleError(e, 'Ошибка обновления записи на сервере');
    }
};

export function* watchUpdateNote() {
    yield takeLatest(ACTION_TYPE, run);
};
