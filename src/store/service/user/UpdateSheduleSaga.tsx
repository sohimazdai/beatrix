import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { UserApi } from "../../../api/UserApi";
import { IStorage } from "../../../model/IStorage";
import { createOneLevelMergeUserPropertiesShedule } from "../../modules/user-properties-shedule/UserPropertiesShedule";
import { IUserPropertiesShedule } from "../../../model/IUserPropertiesShedule";
import { appAnalytics } from '../../../app/Analytics';
import { handleError } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';

const ACTION_TYPE = "UPDATE_SHEDULE_ACTION";

interface UpdateUserSheduleAction {
    type: "UPDATE_SHEDULE_ACTION";
    payload: {
        shedule: IUserPropertiesShedule;
    };
}

export function createUpdateUserSheduleAction(shedule: IUserPropertiesShedule) {
    return batchActions([
        createUserChangeAction({
            loading: true,
            error: null
        }),
        {
            type: ACTION_TYPE,
            payload: {
                shedule
            }
        }
    ])
}

function* run({ payload }: UpdateUserSheduleAction) {
    try {
        yield put(
            createOneLevelMergeUserPropertiesShedule(payload.shedule)
        );

        console.log('🤖🤖🤖🤖 pl', payload.shedule);

        const state: IStorage = yield select(state => state);
        if (state.app.serverAvailable) {
            yield call(
                UserApi.updateShedule,
                state.user.id,
                state.userPropertiesShedule
            );
        }

        appAnalytics.sendEvent(appAnalytics.events.SHEDULE_UPDATED);

        yield put(
            createUserChangeAction({
                loading: false,
                error: null
            })
        );
    } catch (e) {
        handleError(e, i18nGet('shedule_sync_error'));
        yield put(
            createUserChangeAction({
                loading: false,
                error: e
            })
        );
    }
}

export function* watchUpdateUserShedule() {
    yield takeLatest(ACTION_TYPE, run);
}
