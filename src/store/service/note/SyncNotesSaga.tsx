
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { IStorage } from '../../../model/IStorage';
import { NoteApi } from '../../../api/NoteApi';
import { createNoteListOneLevelDeepMerge, createNoteListReplace } from '../../modules/noteList/NoteListActionCreator';
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { createClearPendingNoteListByUserId } from '../../modules/pending-note-list/PendingNoteList';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';
import { appAnalytics } from '../../../app/Analytics';
import { createChangeInteractive } from '../../modules/interactive/interactive';
import createMap from '../../../utils/create-map';
import { INoteListNote } from '../../../model/INoteList';

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

export function createSyncNotesAction(payload: Payload = {}) {

    const { reason, noLoading } = payload;

    const actions: any[] = [
        {
            type: ACTION_TYPE,
            payload: {
                noLoading,
                reason: reason || SyncReasonType.JUST
            }
        },
        createChangeInteractive({ isNotesLoading: true }),
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
            const {
                data: { notes, noteListSize, offset },
                status,
            } = yield call(NoteApi.syncNotesV2, notesToSync, userId);

            const notesList = createMap<INoteListNote>(notes);

            if (status === 200) {
                yield put(
                    batchActions([
                        createNoteListReplace(notesList),
                        createUserChangeAction({ noteListSize, noteListCurrentOffset: offset }),
                        createClearPendingNoteListByUserId(userId),
                    ])
                )
            }

            appAnalytics.sendEvent(appAnalytics.events.NOTES_SYNCED);
        }

        yield put(createChangeInteractive({ isNotesLoading: false }));

        if (!noLoading) {
            yield put(createUserChangeAction({
                loading: false,
                error: null
            }));
        }
    } catch (e) {
        handleErrorSilently(e, i18nGet('notes_sync_error'));

        yield put(createChangeInteractive({ isNotesLoading: false }));
        yield put(createUserChangeAction({
            loading: false,
            error: e.message
        }));
    }
};

export function* watchSyncNotes() {
    yield takeLatest(ACTION_TYPE, run);
};
