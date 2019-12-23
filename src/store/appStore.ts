import { combineReducers, createStore, applyMiddleware } from "redux";
import { noteListReducer } from "./modules/noteList/NoteListReducer";
import { modalReducer } from "./modules/modal/ModalListReducer";
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import { AsyncStorage } from "react-native";
import { userReducer } from "./modules/user/UserReducer";

const logger = store => next => action => {
    console.log("DISPATCHING", action.type);
    const result = next(action);
    return result
}

const rootReducer = combineReducers({
    noteList: noteListReducer,
    modal: modalReducer,
    user: userReducer
});

const persistConfig: PersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['modal']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const appStore = createStore(
    persistedReducer,
    applyMiddleware(logger)
)

export const persistor = persistStore(appStore);
