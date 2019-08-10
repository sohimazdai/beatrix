import { combineReducers, createStore } from "redux";
import { noteListReducer } from "./modules/noteList/NoteListReducer";


export const appStore = createStore(combineReducers({
    noteList: noteListReducer
}))
