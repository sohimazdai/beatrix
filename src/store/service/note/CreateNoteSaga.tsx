import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { INoteListNote } from '../../../model/INoteList';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { createOneLevelMergePendingNoteList } from '../../modules/pending-note-list/PendingNoteList';
import { PendingOperationType } from '../../../model/IPendingNoteList';
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
        const networkState: NetInfoState = yield call(NetInfo.fetch);
        if (networkState.isConnected) {
            yield call(NoteApi.createNote, payload.note, userId);
        } else {
            // yield put(createOneLevelMergePendingNoteList({
            //     notes: {
            //         [payload.note.date]: {
            //             ...payload.note,
            //             userId: state.user.id,
            //             operation: PendingOperationType.CREATE
            //         }
            //     }
            // }));
        }
        yield put(createNoteListChangeNoteByIdAction(payload.note, userId));
    } catch (e) {
        alert(e.message);
        yield put(createUserChangeAction({
            loading: false,
            error: e
        }));
    }
};

export function* watchCreateNote() {
    yield takeLatest(ACTION_TYPE, createNote);
};
