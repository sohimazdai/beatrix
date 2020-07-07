import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { appAnalytics } from '../../../app/Analytics';
import { handleError } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';
import { ExportApi } from '../../../api/ExportApi';
import * as FileSystem from 'expo-file-system';

const ACTION_TYPE = "EXPORT_DATA_ACTION";

interface ExportDataAction {
  type: "EXPORT_DATA_ACTION";
  payload: {
    from?: number;
    to?: number;
  };
}

export function createExportDataAction(from?: number, to?: number) {
  return batchActions([
    createUserChangeAction({
      loading: true,
      error: null
    }),
    {
      type: ACTION_TYPE,
      payload: {
        from,
        to,
      }
    }
  ])
}

function* run({ payload: { from, to } }: ExportDataAction) {
  try {
    const state: IStorage = yield select(state => state);
    if (state.app.serverAvailable) {
      const titles = {
        date: i18nGet('export_titles_date'),
        time: i18nGet('export_titles_time'),
        glucose: i18nGet('export_titles_glucose'),
        breadUnits: i18nGet('exports_titles_breadUnits'),
        insulin: i18nGet('exports_titles_insulin'),
        longInsulin: i18nGet('exports_titles_longInsulin'),
        comment: i18nGet('exports_titles_comment'),
      };

      yield call(
        ExportApi.exportNotes,
        state.user.id,
        titles,
        from,
        to,
      );
    }

    appAnalytics.sendEvent(appAnalytics.events.EXPORT_DATA);

    // FileSystem.downloadAsync();

    yield put(
      createUserChangeAction({
        loading: false,
        error: null
      })
    )
  } catch (e) {
    handleError(e, i18nGet('export_error'));
    yield put(
      createUserChangeAction({
        loading: false,
        error: e
      })
    );
  }
}

export function* watchExportData() {
  yield takeLatest(ACTION_TYPE, run);
}
