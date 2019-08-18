import { INoteList } from "../../../model/INoteList";
import { NoteListActionType } from "./NoteListActionType";
import { NoteListChangeNoteByIdAction } from "./NoteListAction";

export function noteListReducer(
  noteList: INoteList = {},
  action: NoteListChangeNoteByIdAction
): INoteList {
  switch (action.type) {
    case NoteListActionType.CHANGE_NOTE_BY_ID:
      
      if(noteList[action.payload.date] === action.payload.date){
        return {
          ...noteList,
          [action.payload.date]: action.payload
        }
      } else {
        return {
            ...noteList,
            [action.payload.date]: action.payload
        }
      }

      
    default:
      return noteList;
  }
}
