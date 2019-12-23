import { INoteList } from "./INoteList";
import { IModal } from "./IModal";
import { IUser } from "./IUser";

export interface IAppState {
    noteList: INoteList,
    modal: IModal,
    user: IUser
}
