import { combineReducers, createStore, applyMiddleware } from "redux";
import { noteListReducer } from "./modules/noteList/NoteListReducer";
import { modalReducer } from "./modules/modal/ModalListReducer";
import { persistStore, persistReducer, PersistConfig, createTransform } from 'redux-persist';
import { AsyncStorage } from "react-native";
import { userReducer } from "./modules/user/UserReducer";
import { appReducer } from "./modules/app/app";
import { interactiveReducer } from "./modules/interactive/interactive";
import { userDiabetesPropertiesReducer } from "./modules/user-diabetes-properties/UserDiabetesPropertiesReducer";
import { enableBatching } from 'redux-batched-actions';
import { userPropertiesSheduleReducer } from "./modules/user-properties-shedule/UserPropertiesShedule";

const logger = store => next => action => {
    console.log("DISPATCHING", action.type);
    const result = next(action);
    return result
}

const rootReducer = combineReducers({
    app: appReducer,
    noteList: noteListReducer,
    modal: modalReducer,
    user: userReducer,
    interactive: interactiveReducer,
    userDiabetesProperties: userDiabetesPropertiesReducer,
    userPropertiesShedule: userPropertiesSheduleReducer,
});

const persistConfig: PersistConfig = {
    key: 'root',
    blacklist: [
        'modal',
        'interactive'
    ],
    storage: AsyncStorage,
    transforms: [
        createTransform(
            inboundState => inboundState,
            outboundState => {
                Object.keys(outboundState).map(key => {
                    if (outboundState[key].loading) outboundState[key].loading = false;
                    if (outboundState[key].error) outboundState[key].error = null;
                })
                return outboundState;
            }
        )
    ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const appStore = createStore(
    enableBatching(persistedReducer),
    applyMiddleware(logger)
)

export const persistor = persistStore(appStore);

