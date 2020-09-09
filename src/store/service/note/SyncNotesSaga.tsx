
import { put, call, takeLatest, select, actionChannel } from 'redux-saga/effects';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import { createNoteListOneLevelDeepMerge } from '../../modules/noteList/NoteListActionCreator';
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { createClearPendingNoteListByUserId } from '../../modules/pending-note-list/PendingNoteList';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';
import { appAnalytics } from '../../../app/Analytics';

const ACTION_TYPE = 'SYNC_NOTES_ACTION';

export enum SyncReasonType {
    JUST = "just",
    SEND_PENDING = "send_pending",
}

interface Payload {
    noLoading?: boolean,
    reason?: SyncReasonType
}

interface Action {
    type: 'SYNC_NOTES_ACTION',
    payload: Payload
}

export function createSyncNotesAction(payload?: Payload) {
    if (!payload) payload = {};
    const { reason, noLoading } = payload;

    const actions: any[] = [
        {
            type: ACTION_TYPE,
            payload: {
                noLoading,
                reason: reason || SyncReasonType.JUST
            }
        },
    ];

    if (!noLoading) {
        actions.push(
            createUserChangeAction({
                loading: true,
                error: null,
            })
        )
    }

    return batchActions(actions);
}

function* run(action: Action) {
    try {
        const { noLoading, reason } = action.payload;

        const state: IStorage = yield select(state => state);
        const userId = state.user.id;
        const noteList = state.noteList;

        let userPendingNotes = [];

        if (state.pendingNoteList && state.pendingNoteList.notes) {
            userPendingNotes = Object.values(state.pendingNoteList.notes)
                .filter(note => note.userId === userId);
        };

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
        }, []);

        const cond = reason === SyncReasonType.SEND_PENDING
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

            appAnalytics.sendEvent(appAnalytics.events.NOTES_SYNCED);
        }

        if (!noLoading) {
            yield put(createUserChangeAction({
                loading: false,
                error: null
            }));
        }
    } catch (e) {
        handleErrorSilently(e, i18nGet('notes_sync_error'));

        yield put(createUserChangeAction({
            loading: false,
            error: e.message
        }));
    }
};

export function* watchSyncNotes() {
    yield takeLatest(ACTION_TYPE, run);
};
