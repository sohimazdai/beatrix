import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { appAnalytics } from '../../../app/Analytics';
import { handleError } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';
import { createUserDiabetesPropertiesChangeAction } from '../../modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator';
import { OnboardingApi } from '../../../api/OnboardingApi';

const ACTION_TYPE = "COMPLETE_ONBOARDING_ACTION";

interface CompleteOnboardingAction {
    type: "COMPLETE_ONBOARDING_ACTION";
    payload: {
        diabetesProperties?: IUserDiabetesProperties;
    };
}

export function createCompleteOnboardingAction(diabetesProperties: IUserDiabetesProperties) {
    return batchActions([
        createUserChangeAction({
            loading: true,
            error: null
        }),
        {
            type: ACTION_TYPE,
            payload: {
                diabetesProperties
            }
        }
    ])
}

function* run({ payload: { diabetesProperties } }: CompleteOnboardingAction) {
    try {
        yield put(
            createUserDiabetesPropertiesChangeAction(diabetesProperties)
        );

        const state: IStorage = yield select(state => state);
        if (state.app.serverAvailable) {
            yield call(
                OnboardingApi.completeOnboarding,
                state.user.id,
                diabetesProperties,
            );
        }

        appAnalytics.sendEventWithProps(
            appAnalytics.events.ONBOARDING_COMPLETED,
            diabetesProperties || { skipped: true }
        );

        yield put(
            createUserChangeAction({
                loading: false,
                error: null,
                isNeedToShowOnboarding: false,
            })
        );
    } catch (e) {
        handleError(e, i18nGet('onboarding_complete_error'));
        yield put(
            createUserChangeAction({
                loading: false,
                error: e,
                isNeedToShowOnboarding: false,
            })
        );
    }
}

export function* watchCompleteOnboarding() {
    yield takeLatest(ACTION_TYPE, run);
}
