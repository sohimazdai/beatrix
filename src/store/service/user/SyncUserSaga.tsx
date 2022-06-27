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
import { createNoteListReplace } from '../../modules/noteList/NoteListActionCreator';
import { createClearPendingNoteListByUserId } from '../../modules/pending-note-list/PendingNoteList';
import { syncNotes } from '../../service-helper/sync-notes';
import { INoteList } from '../../../model/INoteList';
import { appAnalytics } from '../../../app/Analytics';
import { createReplaceTagList } from '../../modules/tag-list/tagList';
import { ITagListTags } from '../../../model/ITagList';
import { createGetFavoritesProductsAction } from '../food/GetFavoritesProductsSaga';
import { createTags } from '../../service-helper/create-tags';
import { createChangePending } from '../../modules/pending/pending';
import { Alert } from 'react-native';
import { ISheduleList } from '../../../model/IShedule';
import { createMergeShedule } from '../../modules/shedule/shedule';

const ACTION_TYPE = 'SYNC_USER_ACTION';

export interface SyncUserOptions {
    syncByHand: boolean
}

interface SyncUserAction {
    type: 'SYNC_USER_ACTION',
    payload: {
        user: IUser
    }
}

export function createSyncUserAction(user: IUser, options?: SyncUserOptions) {
    return batchActions([
        createUserChangeAction({
            syncLoading: true,
            error: null
        }),
        {
            type: ACTION_TYPE,
            payload: {
                user,
                options,
            },
        },
    ])
}

function* syncUser({ payload }: SyncUserAction) {
    try {
        const state: IStorage = yield select(state => state);
        const userId = state.user.id;

        if (!state.app.serverAvailable) {
            yield put(createUserChangeAction({
                syncLoading: false,
                error: null,
            }));

            throw Error('server is unavailable');
        }

        const userData: {
            data: {
                properties: IUserDiabetesProperties,
                //deprecated блять а почему депрекейтед-то? я ж не помню
                shedule: IUserPropertiesShedule,
                shedules: ISheduleList,
                isNeedToShowOnboarding: boolean,
                tagList: ITagListTags,
                registeredOn: Date
            }
        } = yield call(UserApi.syncUser, payload.user);

        const properties: IUserDiabetesProperties = userData.data.properties;
        //deprecated
        const shedule: IUserPropertiesShedule = userData.data.shedule || {};
        const shedules: ISheduleList = userData.data.shedules || {};
        const isNeedToShowOnboarding: boolean = userData.data.isNeedToShowOnboarding || false;
        const tags: ITagListTags = Object.values(userData.data.tagList).length
            ? userData.data.tagList
            : isNeedToShowOnboarding
                ? createTags()
                : {};
        const registeredOn: Date = userData.data.registeredOn;

        yield put(batchActions([
            createReplaceTagList({ tags }),
            createChangePending({ tagList: true }),
        ]));

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
                createMergeShedule(shedules),
                createUserChangeAction({
                    isNeedToShowOnboarding: userData.data.isNeedToShowOnboarding,
                    registeredOn,
                }),
            ]),
        );

        // SYNC NOTES
        const { notes, noteListSize, offset } = yield call(syncNotes, state);

        yield put(
            batchActions([
                createNoteListReplace(notes),
                createUserChangeAction({ noteListSize, noteListCurrentOffset: offset }),
                createClearPendingNoteListByUserId(userId),
            ]),
        );

        // SYNC DIABETES PROPERTIES, SHEDULE(s), ONBOARDING, TAG_LIST
        const result = yield call(
            UserApi.syncUserProperties,
            userId,
            newProperties,
            [],
            //deprecated
            shedule,
            shedules,
        );

        yield put(
            batchActions([
                createChangeUserPropertiesShedule(result.data.shedule),
                createUserChangeAction({ isNeedToShowOnboarding }),
            ]),
        );

        // SYNC FAVORITES FOOD
        yield put(createGetFavoritesProductsAction());

        Alert.alert(
            i18nGet('synced_successfully'),
            null,
            [
                { text: i18nGet('sync_end_cool') }
            ]
        );

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
