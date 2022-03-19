import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { appAnalytics } from '../../../app/Analytics';
import { handleError } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { getOriginalLocale, i18nGet } from '../../../localisation/Translate';
import { ExportApi } from '../../../api/ExportApi';
import * as FileSystem from 'expo-file-system';
import { IUserDiabetesProperties, CarbsMeasuringType } from '../../../model/IUserDiabetesProperties';
import { Measures } from '../../../localisation/Measures';
import { selectAverage } from './selectors/select-average';
import { NoteValueType } from '../../../model/INoteList';
import { selectDailyAverage } from './selectors/select-daily-average';
import { selectTotalNotesCount } from './selectors/select-total-notes';
import Variables from '../../../app/Variables';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';
import { SortType } from '../../../model/IExport';

const ACTION_TYPE = "EXPORT_DATA_ACTION";

interface ExportDataAction {
  type: "EXPORT_DATA_ACTION";
  payload: {
    from: number;
    to: number;
    dateSort: SortType
  };
}

export function createExportDataAction(from: number, to: number, dateSort: SortType) {
  return batchActions([
    createUserChangeAction({
      exportLoading: true,
      error: null
    }),
    {
      type: ACTION_TYPE,
      payload: {
        from,
        to,
        dateSort,
      }
    }
  ])
}

function* run({ payload: { from, to, dateSort } }: ExportDataAction) {
  try {
    const state: IStorage = yield select(state => state);
    const userDiabetesProperties: IUserDiabetesProperties = state.userDiabetesProperties;

    if (!state.app.serverAvailable) {
      Alert.alert(i18nGet('active_network_needed'));

      yield put(
        createUserChangeAction({
          exportLoading: false,
          error: null
        })
      )

      return;
    }

    if (state.app.serverAvailable) {
      const stats = {
        averageGlucose: selectAverage(state, from, to, NoteValueType.GLUCOSE),
        dailyAverageBreadUnits: selectDailyAverage(state, from, to, NoteValueType.BREAD_UNITS),
        dailyAverageInsulin: selectDailyAverage(state, from, to, NoteValueType.SHORT_INSULIN),
        dailyAverageLongInsulin: selectDailyAverage(state, from, to, NoteValueType.LONG_INSULIN),
        totalNotes: selectTotalNotesCount(state, from, to),
      };

      const titles = {
        statisticsName: i18nGet('export_data_titles_statistics_name'),
        statisticsNameValue: i18nGet('export_data_titles_statistics_name_value'),
        averageGlucose: i18nGet('export_data_titles_average_glucose').replace(
          '%type%',
          i18nGet(Measures.getDefaultGlucoseMeasuringType(userDiabetesProperties.glycemiaMeasuringType))
        ),
        dailyAverageBreadUnits: i18nGet('export_data_titles_average_breadUnits').replace(
          '%type%',
          i18nGet(userDiabetesProperties.carbsMeasuringType + '_measuring')
        ).replace(
          '%weight_if_bu%',
          userDiabetesProperties.carbsMeasuringType === CarbsMeasuringType.BREAD_UNITS
            ? (
              '(' + Measures.getDefaultCarbsUnitWeightType(userDiabetesProperties.carbsUnitWeightType)
              + ' ' + i18nGet('carb_gram') + ')'
            ) : ''
        ),
        dailyAverageInsulin: i18nGet('export_data_titles_average_insulin'),
        dailyAverageLongInsulin: i18nGet('export_data_titles_average_long_insulin'),
        totalNotes: i18nGet('export_data_titles_average_total_notes'),
        dateFrom: i18nGet('export_data_titles_average_date_from'),
        dateTo: i18nGet('export_data_titles_average_date_to'),
        date: i18nGet('export_titles_date'),
        time: i18nGet('export_titles_time'),
        glucose: i18nGet('export_titles_glucose').replace(
          '%type%',
          i18nGet(Measures.getDefaultGlucoseMeasuringType(userDiabetesProperties.glycemiaMeasuringType))
        ),
        breadUnits: i18nGet('exports_titles_breadUnits').replace(
          '%type%',
          i18nGet(userDiabetesProperties.carbsMeasuringType + '_measuring')
        ).replace(
          '%weight_if_bu%',
          userDiabetesProperties.carbsMeasuringType === CarbsMeasuringType.BREAD_UNITS
            ? (
              '(' + Measures.getDefaultCarbsUnitWeightType(userDiabetesProperties.carbsUnitWeightType)
              + ' ' + i18nGet('gram') + ')'
            ) : ''
        ),
        insulin: i18nGet('exports_titles_insulin'),
        longInsulin: i18nGet('exports_titles_longInsulin'),
        comment: i18nGet('exports_titles_comment'),
      };

      const timezoneOffset = new Date().getTimezoneOffset();

      yield call(
        ExportApi.exportNotes,
        state.user.id,
        titles,
        from,
        to,
        stats,
        timezoneOffset,
        getOriginalLocale(),
        dateSort,
      );

      appAnalytics.sendEventWithProps(appAnalytics.events.EXPORT_DATA, stats);

      const result = yield call(
        FileSystem.downloadAsync,
        'http://' + Variables.apiUrl + `/export/download?userId=${state.user.id}&key=h4NIt1NS`,
        FileSystem.documentDirectory + 'Diabetes profile ' + new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getFullYear()) + '.xlsx',
      )

      yield call(
        Sharing.shareAsync,
        result.uri,
        {
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          dialogTitle: 'My diabetes data',
          UTI: 'com.microsoft.excel.xlsx',
        }
      );

      yield call(
        ExportApi.finishExport,
        state.user.id
      );

      yield put(
        createUserChangeAction({
          exportLoading: false,
          error: null
        })
      )
    }
  } catch (e) {
    handleError(e, i18nGet('export_error'));

    yield put(
      createUserChangeAction({
        exportLoading: false,
        error: e
      })
    );
  }
}

export function* watchExportData() {
  yield takeLatest(ACTION_TYPE, run);
}
