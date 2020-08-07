import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { UserApi } from "../../../api/UserApi";
import { IStorage } from "../../../model/IStorage";
import { appAnalytics } from '../../../app/Analytics';
import { handleError } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { Alert } from 'react-native';
import { createNoteListOneLevelDeepMerge } from '../../modules/noteList/NoteListActionCreator';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';
import { createUserDiabetesPropertiesChangeAction } from '../../modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator';
import { createChangeUserPropertiesShedule } from '../../modules/user-properties-shedule/UserPropertiesShedule';
import { i18nGet } from '../../../localisation/Translate';
import { INoteList } from '../../../model/INoteList';
import { syncNotes } from '../../service-helper/sync-notes';
import { createClearPendingNoteListByUserId } from '../../modules/pending-note-list/PendingNoteList';

const ACTION_TYPE = "UPDATE_USER_DIABETES_PROPERTIES";

export function createUpdateUserDiabetesPropertiesAction(newProperties: IUserDiabetesProperties) {
  return batchActions([
    {
      type: ACTION_TYPE,
      payload: {
        newProperties
      }
    }
  ])
}

function* run(action) {
  try {
    const state: IStorage = yield select(state => state);
    const userId = state.user.id;
    const userDiabetesProperties: IUserDiabetesProperties = {
      ...state.userDiabetesProperties,
      ...action.payload.newProperties,
    };

    if (!state.app.networkConnected) {
      Alert.alert(i18nGet('active_network_needed'));
    };

    if (state.app.networkConnected) {
      if (!state.app.serverAvailable) {
        appAnalytics.sendEvent(appAnalytics.events.SERVER_IS_NOT_AVAILABLE);
        Alert.alert(i18nGet('server_is_not_available_try_to_restart_app'));
      }
    }

    if (state.app.serverAvailable) {
      yield put(createUserChangeAction({
        syncLoading: true,
        error: null,
      }));

      //SYNC NOTES
      const syncedNotes: INoteList = yield call(syncNotes, state);
      yield put(
        batchActions([
          createNoteListOneLevelDeepMerge(syncedNotes),
          createClearPendingNoteListByUserId(userId),
        ])
      )
      //END SYNC NOTES

      const idsToConvert = Object.values(syncedNotes)
        .filter(note => note.userId === userId)
        .map(note => note.id);

      const result = yield call(
        UserApi.syncUserProperties,
        userId,
        userDiabetesProperties,
        idsToConvert,
        state.userPropertiesShedule,
      );

      yield put(createNoteListOneLevelDeepMerge(result.data.notes));
      yield put(createChangeUserPropertiesShedule(result.data.shedule));
      yield put(createUserDiabetesPropertiesChangeAction(userDiabetesProperties));
      yield put(
        createUserChangeAction({
          syncLoading: false,
          error: null,
        })
      );

      appAnalytics.sendEventWithProps(appAnalytics.events.USER_DIABETES_PROPERTIES_UPDATED,
        userDiabetesProperties
      );
      appAnalytics.setUserProperties(userDiabetesProperties);
    }
  } catch (e) {
    handleError(e, i18nGet('user_properties_changing_error'));
    yield put(
      createUserChangeAction({
        syncLoading: false,
        error: e
      })
    );
  }
}

export function* watchUpdateUserDiabetesProperties() {
  yield takeLatest(ACTION_TYPE, run);
}
