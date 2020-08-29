import { combineReducers } from 'redux';
import { appReducer } from './modules/app/app';
import { noteListReducer } from './modules/noteList/NoteListReducer';
import { modalReducer } from './modules/modal/ModalListReducer';
import { userReducer } from './modules/user/UserReducer';
import { interactiveReducer } from './modules/interactive/interactive';
import { userDiabetesPropertiesReducer } from './modules/user-diabetes-properties/UserDiabetesPropertiesReducer';
import { userPropertiesSheduleReducer } from './modules/user-properties-shedule/UserPropertiesShedule';
import { pendingNoteListReducer } from './modules/pending-note-list/PendingNoteList';
import { tagListReducer } from './modules/tag-list/tagList';

export const rootReducer = combineReducers({
    app: appReducer,
    noteList: noteListReducer,
    modal: modalReducer,
    user: userReducer,
    interactive: interactiveReducer,
    userDiabetesProperties: userDiabetesPropertiesReducer,
    userPropertiesShedule: userPropertiesSheduleReducer,
    pendingNoteList: pendingNoteListReducer,
    tagList: tagListReducer,
});
