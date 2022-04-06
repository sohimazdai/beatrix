import { combineReducers, Reducer } from 'redux';
import { appReducer } from './modules/app/app';
import { noteListReducer } from './modules/noteList/NoteListReducer';
import { modalReducer } from './modules/modal/ModalListReducer';
import { userReducer } from './modules/user/UserReducer';
import { interactiveReducer } from './modules/interactive/interactive';
import { userDiabetesPropertiesReducer } from './modules/user-diabetes-properties/UserDiabetesPropertiesReducer';
import { userPropertiesSheduleReducer } from './modules/user-properties-shedule/UserPropertiesShedule';
import { pendingNoteListReducer } from './modules/pending-note-list/PendingNoteList';
import { tagListReducer } from './modules/tag-list/tagList';
import { noteFilterReducer } from './modules/note-filter/noteFilter';
import { IStorage } from '../model/IStorage';
import { pendingReducer } from './modules/pending/pending';
import { foodReducer } from './modules/food/food';
import { sheduleReducer } from './modules/shedule/shedule';
import { popupListReducer } from './modules/popup-list/popup-list';
import { notificationsReducer } from './modules/notifications';

export const rootReducer: Reducer<IStorage> = combineReducers({
    app: appReducer,
    noteList: noteListReducer,
    modal: modalReducer,
    user: userReducer,
    interactive: interactiveReducer,
    userDiabetesProperties: userDiabetesPropertiesReducer,
    userPropertiesShedule: userPropertiesSheduleReducer,
    pendingNoteList: pendingNoteListReducer,
    tagList: tagListReducer,
    noteFilter: noteFilterReducer,
    pending: pendingReducer,
    food: foodReducer,
    shedule: sheduleReducer,
    popupList: popupListReducer,
    notifications: notificationsReducer,
});
