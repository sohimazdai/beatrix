import { INoteList } from "./INoteList";
import { IModal } from "./IModal";
import { IUser } from "./IUser";
import { IApp } from "./IApp";
import { IInteractive } from "./IInteractive";

export interface IStorage {
    app: IApp,
    noteList: INoteList,
    modal: IModal,
    user: IUser,
    interactive: IInteractive
}
