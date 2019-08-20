import { INoteList } from "../../../model/INoteList";
import { NoteListActionType } from "./NoteListActionType";
import { NoteListChangeNoteByIdAction, NoteListDeleteNoteByIdAction } from "./NoteListAction";

export function noteListReducer(
  noteList: INoteList = {},
  action: NoteListChangeNoteByIdAction | NoteListDeleteNoteByIdAction,
): INoteList {
  switch (action.type) {
    case NoteListActionType.CHANGE_NOTE_BY_ID: {
      return {
        ...noteList,
        [action.payload.date]: action.payload
      }
    };

    case NoteListActionType.DELETE_NOTE_BY_ID: {
      const nextNoteList = { ...noteList };
      delete nextNoteList[action.payload];
      return {
        ...nextNoteList
      }
    }

    default:
      return noteList;
  }
}
