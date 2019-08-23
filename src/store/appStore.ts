import { combineReducers, createStore, applyMiddleware } from "redux";
import { noteListReducer } from "./modules/noteList/NoteListReducer";
import { modalReducer } from "./modules/modal/ModalListReducer";

const logger = store => next => action => {
    console.log(action.type);
    const result = next(action);
    console.log('next state', store.getState());
    return result
}

export const appStore = createStore(combineReducers({
    noteList: noteListReducer,
    modal: modalReducer
}), applyMiddleware(logger))
