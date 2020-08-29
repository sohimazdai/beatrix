import { INoteList } from "./INoteList";
import { IModal } from "./IModal";
import { IUser } from "./IUser";
import { IApp } from "./IApp";
import { IInteractive } from "./IInteractive";
import { IUserDiabetesProperties } from "./IUserDiabetesProperties";
import { IUserPropertiesShedule } from "./IUserPropertiesShedule";
import { IPendingNoteList } from './IPendingNoteList';
import { ITagList } from './ITagList';

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
}
