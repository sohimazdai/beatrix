import { INoteList } from "./INoteList";
import { IModal } from "./IModal";
import { IUser } from "./IUser";
import { IApp } from "./IApp";
import { IInteractive } from "./IInteractive";
import { IUserDiabetesProperties } from "./IUserDiabetesProperties";
import { IUserPropertiesShedule } from "./IUserPropertiesShedule";
import { IPendingNoteList } from './IPendingNoteList';
import { ITagList } from './ITagList';
import { INoteFilter } from './INoteFilter';
import { IPending } from './IPending';
import { IFood } from './IFood';
import { ISheduleList } from './IShedule';
import { IPopupList } from './IPopupList';
import { INotificationsList } from "./INotification";

export interface IStorage {
    app?: IApp,
    noteList?: INoteList,
    modal?: IModal,
    user?: IUser,
    interactive?: IInteractive,
    userDiabetesProperties?: IUserDiabetesProperties,
    userPropertiesShedule?: IUserPropertiesShedule,
    pendingNoteList?: IPendingNoteList
    tagList?: ITagList
    noteFilter?: INoteFilter
    pending?: IPending
    food?: IFood
    shedule: ISheduleList
    popupList: IPopupList
    notifications: INotificationsList
}
