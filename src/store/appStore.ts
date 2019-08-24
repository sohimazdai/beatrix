import { combineReducers, createStore, applyMiddleware } from "redux";
import { noteListReducer } from "./modules/noteList/NoteListReducer";
import { modalReducer } from "./modules/modal/ModalListReducer";
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from "react-native";

const logger = store => next => action => {
    console.log(action.type);
    const result = next(action);
    console.log('next state', store.getState());
    return result
}

const rootReducer = combineReducers({
    noteList: noteListReducer,
    modal: modalReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    noteList: [
        'noteListReducer',
    ],
    ///////////////////////////////////// ??? modal will be on config?
    // modal: [
    //     'modalReducer',
    // ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const appStore = createStore(
    persistedReducer,
    applyMiddleware(logger)
)

export const persistor = persistStore(appStore);