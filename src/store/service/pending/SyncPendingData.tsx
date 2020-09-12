import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleError } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';
import { TagApi } from '../../../api/TagApi';
import { createReplacePending, createChangePending } from '../../modules/pending/pending';
import { createChangeTagList } from '../../modules/tag-list/tagList';

const ACTION_TYPE = "SYNC_PENDING_DATA_ACTION";

let tagListPending = false;

export function createSyncPendingDataAction() {
  return batchActions([
    createUserChangeAction({
      loading: true,
      error: null
    }),
    { type: ACTION_TYPE },
  ])
}

function* run() {
  try {
    const state: IStorage = yield select(state => state);

    if (state.app.serverAvailable && !tagListPending) {
      tagListPending = true;

      if (state.pending.tagList) {
        yield call(TagApi.syncTags, state.user.id, state.tagList.tags);
      }

      yield put(createReplacePending({}));
    }

    yield put(
      batchActions([
        createUserChangeAction({
          loading: false,
          error: null,
        }),
        createChangePending({
          loading: false,
          error: null,
        }),
      ])
    );
    tagListPending = false;
  } catch (e) {
    handleError(e, i18nGet('sync_error'));
    yield put(
      batchActions([
        createUserChangeAction({
          loading: false,
          error: e,
        }),
        createChangePending({
          loading: false,
          error: e,
        }),
      ])
    );
    tagListPending = false;
  }
}

export function* watchSyncPendingData() {
  yield takeLatest(ACTION_TYPE, run);
}
