import { INoteList } from "../../../model/INoteList";
import { NoteListActionType } from "./NoteListActionType";
import { NoteListChangeNoteByIdAction, NoteListDeleteNoteByIdAction, NoteListOneLevelDeepMerge } from "./NoteListAction";

export function noteListReducer(
  noteList: INoteList = {},
  action: NoteListChangeNoteByIdAction | NoteListDeleteNoteByIdAction | NoteListOneLevelDeepMerge,
): INoteList {
  switch (action.type) {
    case NoteListActionType.CHANGE_NOTE_BY_ID:
      const noteId = action.payload.generatedNoteId ?
        action.payload.generatedNoteId :
        action.payload.note.id
      return {
        ...noteList,
        [noteId]: {
          ...action.payload.note,
          id: noteId,
          userId: action.payload.userId
        }
      }


    case NoteListActionType.DELETE_NOTE_BY_ID:
      const newNoteList = noteList;
      delete newNoteList[action.payload.noteId];
      return {
        ...newNoteList
      }

    case NoteListActionType.ONE_LEVEL_DEEP_MERGE:
      return action.payload.noteList;
    default:
      return noteList;
  }
}
