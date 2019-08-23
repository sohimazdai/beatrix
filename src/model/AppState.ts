import { INoteList } from "./INoteList";
import { IModal } from "./IModal";

export interface AppState {
    noteList: INoteList,
    modal: IModal
}
