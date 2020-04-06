
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { INoteListNote } from '../../../model/INoteList';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { createOneLevelMergePendingNoteList, createDeletePendingNoteById } from '../../modules/pending-note-list/PendingNoteList';
import { PendingOperationType } from '../../../model/IPendingNoteList';
import { createNoteListChangeNoteByIdAction, createDeleteNoteInNoteListById } from '../../modules/noteList/NoteListActionCreator';

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
        // yield put(createDeleteNoteInNoteListById(payload.prevId));
        const state: IStorage = yield select(state => state);
        const userId = state.user.id;
        const networkState: NetInfoState = yield call(NetInfo.fetch);
        if (networkState.isConnected) {
            yield call(NoteApi.updateNote, payload.note, userId);
        } else {
            // yield put(createOneLevelMergePendingNoteList({
            //     notes: {
            //         [payload.note.date]: {
            //             ...payload.note,
            //             userId: state.user.id,
            //             operation: PendingOperationType.UPDATE
            //         }
            //     }
            // }));
        }
        yield put(createNoteListChangeNoteByIdAction(payload.note, userId));
    } catch (e) {
        alert(e.message);
    }
};

export function* watchUpdateNote() {
    yield takeLatest(ACTION_TYPE, run);
};