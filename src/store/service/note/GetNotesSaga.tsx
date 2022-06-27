import { put, call, select, takeLeading } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { NoteApi } from '../../../api/NoteApi';
import { createNoteListOneLevelDeepMerge } from '../../modules/noteList/NoteListActionCreator';
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';
import { IStorage } from '../../../model/IStorage';
import { IUser } from '../../../model/IUser';
import { createChangeInteractive } from '../../modules/interactive/interactive';
import createMap from '../../../utils/create-map';
import { INoteList } from '../../../model/INoteList';
import { appAnalytics } from '../../../app/Analytics';

const DEFAULT_LIMIT = 2000;

const ACTION_TYPE = 'GET_NOTES_ACTION';

export function createGetNotesAction(
    startDate?: number,
    endDate?: number,
) {
    return batchActions([
        createUserChangeAction({
            loading: true,
            error: null,
        }),
        createChangeInteractive({ isNotesLoading: true }),
        {
            type: ACTION_TYPE,
            payload: {
                startDate,
                endDate,
            }
        },
    ])
}

function* run() {
    const user: IUser = yield select((state: IStorage) => state.user);
    const currentOffset = user.noteListCurrentOffset || 0;
    const currentSize = user.noteListSize;

    try {
        const {
            data: { notes, noteListSize, offset },
        } = yield call(
            NoteApi.getNotes,
            user.id,
            {
                offset: currentOffset,
                limit: DEFAULT_LIMIT,
            },
        );

        const noteList = createMap<INoteList>(notes);

        const newOffset = offset > noteListSize ? noteListSize : offset;

        appAnalytics.sendEventWithProps(
            appAnalytics.events.NOTES_GOT,
            {
                notesCount: newOffset - currentOffset,
                noteListSize,
            },
        );

        yield put(
            batchActions([
                createNoteListOneLevelDeepMerge(noteList),
                createUserChangeAction({
                    noteListSize,
                    noteListCurrentOffset: newOffset,
                    loading: false,
                    error: null,
                }),
                createChangeInteractive({ isNotesLoading: false }),
            ]),
        );
    } catch (e) {
        handleErrorSilently(e, i18nGet('notes_deleting_error'));

        yield put(createChangeInteractive({ isNotesLoading: false }));
        yield put(createUserChangeAction({
            loading: false,
            error: e.message
        }));
    }
};

export function* watchGetNotes() {
    yield takeLeading(ACTION_TYPE, run);
};
