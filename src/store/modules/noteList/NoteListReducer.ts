import { INoteList } from "../../../model/INoteList";
import { NoteListActionType } from "./NoteListActionType";
import { NoteListChangeNoteByIdAction } from "./NoteListAction";

export function noteListReducer(
  noteList: INoteList = { test: "hola mundo!" },
  action: NoteListChangeNoteByIdAction
) {
  switch (action.type) {
    case NoteListActionType.CHANGE_NOTE_BY_ID:
      return {
        ...noteList,
        [action.payload.id]: action.payload
      };
    default:
      return noteList;
  }
}
