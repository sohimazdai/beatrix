
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { INoteListNote } from '../../../model/INoteList';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { createOneLevelMergePendingNoteList, createDeletePendingNoteById } from '../../modules/pending-note-list/PendingNoteList';
import { createNoteListChangeNoteByIdAction, createDeleteNoteInNoteListById } from '../../modules/noteList/NoteListActionCreator';
import { appAnalytics } from '../../../app/Analytics';
import { handleError } from '../../../app/ErrorHandler';

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
            yield put(createOneLevelMergePendingNoteList({
                notes: {
                    [payload.note.id]: {
                        id: payload.note.id,
                        userId: state.user.id
                    }
                }
            }));
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
