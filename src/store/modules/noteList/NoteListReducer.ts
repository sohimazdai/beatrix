import { INoteList } from "../../../model/INoteList";
import { NoteListActionType } from "./NoteListActionType";
import { NoteListChangeNoteByIdAction } from "./NoteListAction";
import { NoteListToArraySelector } from "../../selector/NoteListToArraySelector";

export function noteListReducer(
  noteList: INoteList = {},
  action: NoteListChangeNoteByIdAction
): INoteList {
  switch (action.type) {
    case NoteListActionType.CHANGE_NOTE_BY_ID:
      const date = new Date(
        new Date(action.payload.date).getFullYear(),
        new Date(action.payload.date).getMonth(),
        new Date(action.payload.date).getDate()
      ).getTime();
      return {
        ...noteList,
        [date]: {
          ...noteList[date],
          [action.payload.date]: action.payload
        }
      };
    default:
      return noteList;
  }
}
