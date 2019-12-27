import { combineReducers, createStore, applyMiddleware } from "redux";
import { noteListReducer } from "./modules/noteList/NoteListReducer";
import { modalReducer } from "./modules/modal/ModalListReducer";
import { persistStore, persistReducer, PersistConfig, createTransform } from 'redux-persist';
import { AsyncStorage } from "react-native";
import { userReducer } from "./modules/user/UserReducer";
import { appReducer } from "./modules/app/app";

const logger = store => next => action => {
    console.log("DISPATCHING", action.type);
    const result = next(action);
    return result
}

const rootReducer = combineReducers({
    app: appReducer,
    noteList: noteListReducer,
    modal: modalReducer,
    user: userReducer
});

const persistConfig: PersistConfig = {
    key: 'root',
    blacklist: [
        'error',
        'loading',
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
    persistedReducer,
    applyMiddleware(logger)
)

export const persistor = persistStore(appStore);

