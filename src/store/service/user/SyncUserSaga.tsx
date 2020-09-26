import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { UserApi } from '../../../api/UserApi';
import { IUser } from '../../../model/IUser';
import { IStorage } from '../../../model/IStorage';
import { createChangeUserPropertiesShedule } from '../../modules/user-properties-shedule/UserPropertiesShedule';
import { createUserDiabetesPropertiesChangeAction } from '../../modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator';
import { handleError } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';
import { IUserPropertiesShedule } from '../../../model/IUserPropertiesShedule';
import { Measures } from '../../../localisation/Measures';
import { createNoteListOneLevelDeepMerge } from '../../modules/noteList/NoteListActionCreator';
import { createClearPendingNoteListByUserId } from '../../modules/pending-note-list/PendingNoteList';
import { syncNotes } from '../../service-helper/sync-notes';
import { INoteList } from '../../../model/INoteList';
import { appAnalytics } from '../../../app/Analytics';
import { createChangeTagList, createMergeTags } from '../../modules/tag-list/tagList';
import { ITagListTags } from '../../../model/ITagList';
import { createGetFoodItemByIdAction } from '../food/GetFoodItemById';
import { createGetFavoritesProductsAction } from '../food/GetFavoritesProductsSaga';

const ACTION_TYPE = 'SYNC_USER_ACTION';

interface SyncUserAction {
    type: 'SYNC_USER_ACTION',
    payload: {
        user: IUser
    }
}

export function createSyncUserAction(user: IUser) {
    return batchActions([
        createUserChangeAction({
            syncLoading: true,
            error: null
        }),
        {
            type: ACTION_TYPE,
            payload: {
                user
            }
        },
    ])
}

function* syncUser({ payload }: SyncUserAction) {
    try {
        const state: IStorage = yield select(state => state);
        const userId = state.user.id;

        if (state.app.serverAvailable) {
            const userData: {
                data: {
                    properties: IUserDiabetesProperties,
                    shedule: IUserPropertiesShedule,
                    isNeedToShowOnboarding: boolean,
                    tagList: ITagListTags
                }
            } = yield call(UserApi.syncUser, payload.user);

            const properties: IUserDiabetesProperties = userData.data.properties;
            const shedule: IUserPropertiesShedule = userData.data.shedule || {};
            const isNeedToShowOnboarding: boolean = userData.data.isNeedToShowOnboarding || false;
            const tags: ITagListTags = userData.data.tagList || {};

            if (!properties.glycemiaMeasuringType) {
                properties.glycemiaMeasuringType = Measures.getDefaultGlucoseMeasuringType(
                    state.userDiabetesProperties.glycemiaMeasuringType
                );
            }
            if (!properties.carbsMeasuringType) {
                properties.carbsMeasuringType = Measures.getDefaultCarbsMeasuringType(
                    state.userDiabetesProperties.carbsMeasuringType
                );
            }
            if (!properties.carbsUnitWeightType) {
                properties.carbsUnitWeightType = Measures.getDefaultCarbsUnitWeightType(
                    state.userDiabetesProperties.carbsUnitWeightType
                );
            }
            if (!properties.targetGlycemia) {
                properties.targetGlycemia = Measures.getNormalGlycemia(
                    Measures.getDefaultGlucoseMeasuringType(
                        state.userDiabetesProperties.glycemiaMeasuringType
                    )
                );
            }

            const newProperties: IUserDiabetesProperties = {
                ...state.userDiabetesProperties,
                ...properties,
            };

            yield put(
                batchActions([
                    createUserDiabetesPropertiesChangeAction(newProperties),
                    createChangeUserPropertiesShedule(shedule),
                    createUserChangeAction({
                        isNeedToShowOnboarding: userData.data.isNeedToShowOnboarding
                    }),
                    createMergeTags(tags),
                ])
            );

            // SYNC NOTES
            const syncedNotes: INoteList = yield call(syncNotes, state);
            yield put(
                batchActions([
                    createNoteListOneLevelDeepMerge(syncedNotes),
                    createClearPendingNoteListByUserId(userId),
                ])
            )

            // SYNC DIABETES PROPERTIES, SHEDULE, ONBOARDING, TAG_LIST
            const result = yield call(
                UserApi.syncUserProperties,
                userId,
                newProperties,
                [],
                shedule,
            );

            yield put(
                batchActions([
                    createNoteListOneLevelDeepMerge(result.data.notes),
                    createChangeUserPropertiesShedule(result.data.shedule),
                    createUserChangeAction({ isNeedToShowOnboarding }),
                ])
            );

            // SYNC FAVORITES FOOD
            yield put(createGetFavoritesProductsAction());
        }

        appAnalytics.sendEvent(appAnalytics.events.USER_SYNCED);

        yield put(createUserChangeAction({
            syncLoading: false,
            error: null,
        }));
    } catch (e) {
        handleError(e, i18nGet('user_sync_error'));
        yield put(createUserChangeAction({
            syncLoading: false,
            error: e,
            isNeedToShowOnboarding: false,
        }));
    }
};

export function* watchSyncUser() {
    yield takeLatest(ACTION_TYPE, syncUser);
};
