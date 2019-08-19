import { INoteList } from "../../../model/INoteList";
import { NoteListActionType } from "./NoteListActionType";
import { NoteListChangeNoteByIdAction, NoteListDeleteNoteByIdAction } from "./NoteListAction";

export function noteListReducer(
  noteList: INoteList = {},
  action: NoteListChangeNoteByIdAction,
  // action: NoteListDeleteNoteByIdAction
): INoteList {
  switch (action.type) {
    case NoteListActionType.CHANGE_NOTE_BY_ID: {

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
    };

    // case NoteListActionType.DELETE_NOTE_BY_ID: {

      
    //   return {}
  // }

    default:
      return noteList;
  }
}
