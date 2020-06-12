
import { put, call, takeLatest, select, actionChannel } from 'redux-saga/effects';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import { createNoteListOneLevelDeepMerge } from '../../modules/noteList/NoteListActionCreator';
import { handleError } from '../../../app/ErrorHandler';
import { createClearPendingNoteListByUserId } from '../../modules/pending-note-list/PendingNoteList';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';

const ACTION_TYPE = 'SYNC_NOTES_ACTION';

export enum SyncReasonType {
    JUST = "just",
    SEND_PENDING = "send_pending",
}

export function createSyncNotesAction(reason?: string) {
    return batchActions([
        createUserChangeAction({
            syncLoading: true,
            error: null,
        }),
        {
            type: ACTION_TYPE,
            payload: {
                reason: reason || SyncReasonType.JUST
            }
        },
    ])
}

function* run(action) {
    try {
        const state: IStorage = yield select(state => state);
        const userId = state.user.id;
        const noteList = state.noteList;

        let userPendingNotes = [];
        if (state.pendingNoteList && state.pendingNoteList.notes) {
            userPendingNotes = Object.values(state.pendingNoteList.notes)
                .filter(note => note.userId === userId);
        }
        const notesToSync = userPendingNotes.reduce((notes, next) => {
            if (next.id) {
                return [
                    ...notes,
                    noteList[next.id]
                        ? noteList[next.id]
                        : {
                            id: next.id,
                            reason: 'delete'
                        }
                ];
            }
            return notes;
        }, [])

        const cond = action.payload.reason === SyncReasonType.SEND_PENDING
            ? state.app.serverAvailable && state.app.networkConnected && notesToSync.length
            : state.app.serverAvailable && state.app.networkConnected

        if (cond) {
            const response = yield call(NoteApi.syncNotes, notesToSync, userId);

            if (response.status === 200) {
                yield put(
                    batchActions([
                        createNoteListOneLevelDeepMerge(response.data),
                        createClearPendingNoteListByUserId(userId),
                    ])
                )
            }
        }

        yield put(createUserChangeAction({
            syncLoading: false,
            error: null
        }));
    } catch (e) {
        handleError(e, i18nGet('notes_sync_error'));

        yield put(createUserChangeAction({
            syncLoading: false,
            error: e.message
        }));
    }
};

export function* watchSyncNotes() {
    yield takeLatest(ACTION_TYPE, run);
};
