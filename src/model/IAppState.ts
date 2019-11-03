import { INoteList } from "./INoteList";
import { IModal } from "./IModal";

export interface IAppState {
    noteList: INoteList,
    modal: IModal
}
