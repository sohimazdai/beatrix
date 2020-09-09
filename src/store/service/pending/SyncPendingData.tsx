import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleError } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';
import { TagApi } from '../../../api/TagApi';
import { createReplacePending } from '../../modules/pending/pending';
import { createChangeTagList } from '../../modules/tag-list/tagList';

const ACTION_TYPE = "SYNC_PENDING_DATA_ACTION";

export function createSyncPendingDataAction() {
  return batchActions([
    createUserChangeAction({
      loading: true,
      error: null
    }),
    { type: ACTION_TYPE }
  ])
}

function* run() {
  try {
    const state: IStorage = yield select(state => state);

    if (state.app.serverAvailable) {
      if (state.pending.tagList) {
        const tagList = yield call(TagApi.syncTags, state.user.id, state.tagList.tags);

        yield put(createChangeTagList(tagList));
      }

      yield put(createReplacePending({}));
    }

    yield put(
      createUserChangeAction({
        loading: false,
        error: null,
      })
    );
  } catch (e) {
    handleError(e, i18nGet('sync_error'));
    yield put(
      createUserChangeAction({
        loading: false,
        error: e,
      })
    );
  }
}

export function* watchSyncPendingData() {
  yield takeLatest(ACTION_TYPE, run);
}
