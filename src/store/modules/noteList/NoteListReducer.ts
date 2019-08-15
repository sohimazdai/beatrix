import { INoteList } from "../../../model/INoteList";
import { NoteListActionType } from "./NoteListActionType";
import { NoteListChangeNoteByIdAction } from "./NoteListAction";

export function noteListReducer(
  noteList: INoteList = {},
  action: NoteListChangeNoteByIdAction
): INoteList {
  switch (action.type) {
    case NoteListActionType.CHANGE_NOTE_BY_ID:
      return {
          ...noteList,
          [action.payload.date]: action.payload
      }
    default:
      return noteList;
  }
}
